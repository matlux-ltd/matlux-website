---
title: "Game of Life: small rules, unexpected worlds"
description: "An interactive Clojure and ClojureScript experiment. Explore famous patterns, change cells as they evolve, and write the rules yourself."
date: 2026-09-27T12:00:00+01:00
author: "Mathieu Gauthron"
playground: "game-of-life"
---

Conway’s Game of Life starts with a grid of living and dead cells. Each generation follows the same small set of rules, yet the results range from steady shapes to moving spaceships and machines that keep producing new patterns.

Launch the playground above to explore it. You can change the starting pattern, edit individual cells while the simulation runs, and replace Conway’s rule with your own ClojureScript function.

## Four rules, one next generation

Every cell has eight neighbours. Under Conway’s rules:

- A living cell with fewer than two living neighbours dies.
- A living cell with two or three living neighbours survives.
- A living cell with more than three living neighbours dies.
- A dead cell with exactly three living neighbours becomes alive.

All cells make this transition together, using the previous generation’s board. In the editor, the rule is simply:

```clojure
(fn [alive? neighbours]
  (or (= neighbours 3)
      (and alive? (= neighbours 2))))
```

The function returns `true` for a living cell in the next generation and `false` for a dead one.

## Three experiments to start with

**Watch a rhythm.** Choose Pulsar, then press Step a few times. Its shape returns every three generations. Pentadecathlon takes fifteen. Try toggling one cell to see whether the rhythm survives.

**Interrupt a machine.** Choose Gosper glider gun and press Play. It emits a glider every thirty generations. Click cells in the stream or in the gun itself, then watch the consequences. Reset board restores the seed.

**Wait for a surprise.** Choose Diehard. Its seven cells undergo a series of transformations before disappearing at generation 130 under Conway’s rules with dead edges. Acorn also starts with seven cells but produces a much longer, more complex evolution.

This playground uses a finite 60 × 60 board. Dead edges and wraparound behave differently; moving patterns and long-lived patterns will eventually interact with those boundaries. The descriptions assume the standard Conway rule.

## Change the rules

Try this function to freeze every cell in its current state:

```clojure
(fn [alive? _] alive?)
```

Click Apply rule, then Play or Step. You can still click or tap cells to turn them on and off. Keyboard users can focus the board, move with the arrow keys, and toggle a cell with Enter or Space.

Applying a rule pauses playback and keeps the board. Invalid code leaves the previous rule intact. Restore Conway returns to the standard rule; Reset board returns to the selected starting pattern. The editor supports `cljs.core` and local helper definitions, with no additional library loading or DOM access. Rules should be pure functions of their two inputs.

## One engine, two runtimes

The original project dates from 2016. The modern version shares its engine, rules, and patterns through `.cljc` files, which compile for both JVM Clojure and browser ClojureScript. The desktop application draws with Quil; this page’s playground draws on a browser canvas.

The engine takes a board state and returns the next state. The browser holds the current board and sends it to a Web Worker for each generation. Editing a cell invalidates any calculation based on the old board, so a late result cannot overwrite the edit.

The worker also bundles ClojureScript’s self-hosted compiler, `cljs.js`. Your edited rule compiles and runs locally in the browser. A worker that takes too long can be stopped while preserving the last board. Experiments live in memory and are not saved when the page reloads.

[Explore the source and run the JVM version on GitHub](https://github.com/matlux/game-of-life).

For more about turning a state transition into a sequence, see [Unfold and Anamorphisms in Modern Clojure](/insights/anamorphisms-in-clojure/).
