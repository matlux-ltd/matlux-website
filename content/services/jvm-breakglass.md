---
title: "JVM Breakglass"
layout: "jvm-breakglass"
description: "A Matlux open-source Java/Clojure library for controlled live JVM inspection, Spring bean introspection, and JMX-managed nREPL diagnostics."

hero:
  eyebrow: "Open-source JVM diagnostics"
  title: "JVM Breakglass"
  headline: "Controlled live inspection for JVM applications."
  subtitle: "A Matlux Java/Clojure library that embeds a local nREPL endpoint inside an application, so experienced engineers can inspect registered objects, Spring beans, and diagnostic expressions from the running JVM."
  primary_button:
    text: "Discuss a JVM integration"
    url: "/contact/"
  secondary_button:
    text: "View source on GitHub"
    url: "https://github.com/matlux/jvm-breakglass"

banner:
  src: "/images/jvm-breakglass-banner.webp"
  alt: "JVM Breakglass emergency cabinet banner showing a REPL, JVM runtime, and coffee cup"
  width: 1400
  height: 608

what_it_enables:
  title: "What It Enables"
  intro: "JVM Breakglass is for controlled engineering situations where ordinary logs, metrics, and dashboards do not answer the question quickly enough. The host application integrates the library first; it is not an external attach-to-any-JVM product."
  items:
    - title: "Inspect registered live objects"
      description: "Expose selected objects to the embedded REPL and inspect their fields, methods, and current runtime state."
    - title: "Explore Spring beans"
      description: "Use the Spring integration to resolve application beans and inspect the objects behind a running service."
    - title: "Evaluate diagnostic expressions"
      description: "Run Clojure expressions inside the JVM process for targeted investigation by trusted engineers."
    - title: "Control access through JMX"
      description: "Keep the listener stopped by default, then start, stop, and inspect it through the JVM management surface."

why_it_matters:
  title: "Why It Matters"
  items:
    - "Useful when a live backend problem depends on runtime state that is hard to reproduce outside the process."
    - "Gives senior engineers a controlled inspection path for Java, Clojure, and Spring services."
    - "Keeps the diagnostic surface explicit: applications choose when to include it and what objects to register."
    - "Demonstrates Matlux experience with JVM internals, backend troubleshooting, and pragmatic operational tooling."

technical_shape:
  title: "Technical Shape"
  intro: "The library is intentionally small and direct. It sits inside the application, exposes a loopback-only nREPL listener, and provides helper namespaces for inspecting Java objects and Spring beans."
  items:
    - title: "Runtime integration"
      description: "Java applications can instantiate NreplServer directly; Spring applications can wire NreplServerSpring as a bean."
    - title: "Local REPL endpoint"
      description: "The nREPL listener binds to 127.0.0.1 and can be reached locally or through an explicit SSH tunnel."
    - title: "JMX lifecycle"
      description: "A management bean exposes port, started state, start, and stop operations for operational control."
    - title: "Current release"
      description: "Version 0.1.0 is published on Clojars with a Java 8 baseline and tests covering socket, Spring, and JMX flows across modern JDKs."

integration:
  title: "Integration Snapshot"
  intro: "The Maven coordinate is deliberately simple. A typical integration decides whether the listener starts automatically, which objects are exposed, and how the JMX controls fit into the operating model."
  dependency: "<dependency>\n  <groupId>net.matlux</groupId>\n  <artifactId>jvm-breakglass</artifactId>\n  <version>0.1.0</version>\n</dependency>"
  note: "Because the REPL executes with application privileges and has no built-in authentication, it should only be enabled deliberately, kept local or tunnelled, and never exposed publicly."

use_cases:
  title: "Suitable Use Cases"
  items:
    - "Backend incident investigation"
    - "JVM and Spring state inspection"
    - "Controlled production-support tooling"
    - "Legacy Java/Clojure system diagnostics"
    - "Custom observability and troubleshooting workflows"

resources:
  title: "Project Resources"
  items:
    - text: "GitHub repository"
      url: "https://github.com/matlux/jvm-breakglass"
      description: "Source code, README, and implementation details."
    - text: "Clojars package"
      url: "https://clojars.org/net.matlux/jvm-breakglass"
      description: "Published Maven artifact coordinates."
    - text: "cljdoc documentation"
      url: "https://cljdoc.org/d/net.matlux/jvm-breakglass/0.1.0"
      description: "Generated API documentation for version 0.1.0."

related_note:
  eyebrow: "Related technical note"
  title: "Unfold and Anamorphisms in Modern Clojure"
  description: "A practical comparison of sequence generation with unfoldr, iterate, lazy-seq, and Clojure's newer iteration function."
  url: "/insights/anamorphisms-in-clojure/"
  link_text: "Read the technical note"

caveat:
  title: "Operational Framing"
  content: "JVM Breakglass is an open-source diagnostic library, not a hosted SaaS platform or generic monitoring product. It is powerful because it runs inside the application process, which means it must be handled as privileged engineering tooling with clear access controls and operating procedures."

cta:
  title: "Need a controlled way to inspect a complex JVM system?"
  content: "Matlux can help design the integration, operational guardrails, and backend troubleshooting workflow around this kind of live diagnostic capability."
  primary_button:
    text: "Discuss a JVM integration"
    url: "/contact/"
  secondary_button:
    text: "View source on GitHub"
    url: "https://github.com/matlux/jvm-breakglass"
---
