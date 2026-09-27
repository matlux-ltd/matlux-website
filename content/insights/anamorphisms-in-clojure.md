---
title: "Unfold and Anamorphisms in Modern Clojure"
description: "A practical look at generating sequences from state, comparing Haskell's unfoldr with Clojure's iterate, lazy-seq, and iteration."
date: 2014-05-04T09:15:25+01:00
revised: 2026-09-27
lastmod: 2026-09-27T12:00:00+01:00
author: "Mathieu Gauthron"
aliases:
  - "/blog/2014/05/04/anamorphic-adventure-in-clojure/"
---

This article began with a simple question: where is Clojure's `unfold` function?

The question led into anamorphisms, Haskell's `unfoldr`, and several ways to express the same pattern with Clojure's sequence functions. The language has moved on since the original article was published in 2014: Clojure 1.11 added `iteration`, which now belongs in any modern comparison.

The central problem has not changed. We have a state, a function that can produce a value and a new state, and a termination condition. We want to turn that process into a sequence without mixing the mechanics of traversal into the business logic.

## Why unfold?

Most developers encounter folds early. A fold consumes a structure and reduces it to a result:

```clojure
(reduce + [1 2 3 4])
;; => 10
```

An unfold works in the other direction. It starts with a seed and repeatedly expands that state into values:

```text
seed -> [value, next-seed] -> [value, next-seed] -> ... -> stop
```

This pattern appears in more practical places than the terminology might suggest:

- following pagination tokens from an API;
- reading batches until a cursor is exhausted;
- traversing a state machine;
- generating digits from an integer;
- walking a tree or graph from an initial node;
- polling a process until it reaches a terminal state.

Anamorphism is the general structural idea. `unfold` is the familiar list-producing form of it.

## The Haskell shape

Haskell exposes the operation as [`Data.List.unfoldr`](https://hackage.haskell.org/package/base/docs/Data-List.html#v:unfoldr):

```haskell
unfoldr :: (b -> Maybe (a, b)) -> b -> [a]
```

The step function receives state of type `b`. It returns either:

- `Just (value, nextState)` to emit a value and continue; or
- `Nothing` to terminate.

A small implementation makes the control flow explicit:

```haskell
unfoldr step seed =
  case step seed of
    Just (value, nextSeed) -> value : unfoldr step nextSeed
    Nothing                -> []
```

The useful property is the separation between the value being produced and the state required for the next step. They can be the same type, but they do not have to be.

## Expressing unfold in Clojure

Clojure has always provided the primitives needed to express this pattern. The most appropriate option depends on whether the produced value and continuation state are identical, whether the source is pure, and how directly the code should communicate termination.

### `iterate` when value and state are the same

`iterate` applies a function repeatedly and returns every intermediate state:

```clojure
(take 6 (iterate inc 0))
;; => (0 1 2 3 4 5)
```

Its conceptual signature is:

```haskell
iterate :: (a -> a) -> a -> [a]
```

This is excellent when each state is also the value we want to expose. It becomes less direct when a step needs to return one value while carrying different continuation data.

For example, `iterate` can generate Fibonacci state pairs, with `map first` selecting the public value:

```clojure
(->> [0 1]
     (iterate (fn [[a b]] [b (+ a b)]))
     (map first)
     (take 10))
;; => (0 1 1 2 3 5 8 13 21 34)
```

That is concise, although the caller must know that each pair is both state and output structure.

### A direct lazy implementation

The closest translation of Haskell's `unfoldr` uses `lazy-seq`. Instead of a `Maybe` value, the step function follows the usual Clojure convention of returning `nil` to indicate that no next value exists:

```clojure
(defn unfold [step seed]
  (lazy-seq
    (when-let [[value next-seed] (step seed)]
      (cons value (unfold step next-seed)))))
```

The contract is deliberately small:

```text
step :: seed -> [value next-seed] | nil
```

The recursive call sits inside `lazy-seq`, so values are produced on demand. The implementation mirrors the Haskell version closely and makes the termination rule visible.

It is worth keeping the usual lazy-sequence caveats in mind. Side effects occur when the sequence is realised, not when it is defined, and consuming the same lazy sequence from multiple places can make operational behaviour harder to reason about.

### Building unfold from `iterate`

The same contract can be layered on top of `iterate`:

```clojure
(defn unfold-via-iterate [step seed]
  (->> (step seed)
       (iterate (fn [[_ next-seed]]
                  (step next-seed)))
       (take-while some?)
       (map first)))
```

Each element held by `iterate` is `[value next-seed]`. `take-while` stops before the first `nil`, and `map first` exposes only the generated values.

This version is compact and demonstrates that `iterate` is expressive enough to model unfold. The direct `lazy-seq` version is usually easier to explain, while the `iterate` version is useful when a pipeline of standard sequence operations is preferable.

## Clojure's modern `iteration` function

Clojure 1.11 introduced [`clojure.core/iteration`](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/iteration). It repeatedly calls a step function with a continuation token and separates three decisions:

- `:somef` decides whether the returned result should be accepted;
- `:vf` extracts the value to emit;
- `:kf` extracts the continuation token for the next call.

That makes it a close practical relative of unfold, particularly for paginated and batched APIs:

```clojure
(def pages
  {"a" {:items [1 2 3] :next-page "b"}
   "b" {:items [4 5 6] :next-page nil}})

(->> (iteration pages
                :initk "a"
                :vf :items
                :kf :next-page)
     (mapcat identity))
;; => (1 2 3 4 5 6)
```

Here, the map acts as the step function. The result is included while it is non-`nil`, `:items` selects the emitted value, and `:next-page` selects the next continuation key. A `nil` continuation terminates the process.

`iteration` is both `Seqable` and reducible. It also explicitly accommodates step functions that are impure or non-repeatable, which is important when the next page comes from a remote service rather than an immutable map.

It is not a reason to discard `iterate` or a small custom `unfold`. Each communicates a slightly different contract:

- use `iterate` for repeated pure transformation where state is the value;
- use a direct `unfold` when a small `[value next-state]` abstraction is clearest;
- use `iteration` for continuation-driven processes, especially batched or external sources.

## Worked example: integer to binary digits

To compare the approaches, consider a function that turns a non-negative integer into its binary digits.

For a positive integer, each step emits the remainder modulo two and continues with the quotient. Those digits arrive least-significant first, so the final sequence is reversed.

### Using the direct unfold

```clojure
(defn binary-step [n]
  (when (pos? n)
    [(mod n 2) (quot n 2)]))

(defn to-binary [n]
  (if (zero? n)
    [0]
    (->> (unfold binary-step n)
         reverse
         vec)))

(to-binary 16)
;; => [1 0 0 0 0]

(to-binary 42)
;; => [1 0 1 0 1 0]
```

The special case for zero is intentional. A generic unfold stops immediately when its initial step returns `nil`, but the conventional binary representation of zero contains one digit.

### Using `iteration`

The same process can use a result map to separate the emitted digit from the continuation:

```clojure
(defn to-binary-with-iteration [n]
  (if (zero? n)
    [0]
    (->> (iteration
           (fn [state]
             (when (pos? state)
               {:digit (mod state 2)
                :next  (quot state 2)}))
           :initk n
           :vf :digit
           :kf :next)
         reverse
         vec)))

(to-binary-with-iteration 42)
;; => [1 0 1 0 1 0]
```

This is more configuration than the custom two-argument `unfold`, but the roles are explicit and the same form scales naturally to richer API responses.

## Choosing the abstraction

The terminology is less important than making the state transition contract obvious.

If a sequence is simply repeated application of one pure function, `iterate` is hard to improve upon. If the generated value and next state differ, an unfold-shaped function can make the algorithm clearer. If the state is a cursor into an external system, `iteration` provides a standard abstraction with explicit value and continuation extraction.

The broader lesson is that functional patterns are useful when they clarify a real boundary. Anamorphism gives us a name for building a structure from state. Clojure gives us several pragmatic ways to implement it without requiring every codebase to adopt the terminology.

## Acknowledgement

The original 2014 article benefited from discussions with Nathan Matthews, including the `iterate`-based implementation. This revision retains that central exploration while updating the examples and accounting for `clojure.core/iteration`.
