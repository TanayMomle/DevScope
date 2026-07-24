# Architecture

DevScope is built incrementally. Directories are introduced only when a phase
adds real code to them, so the tree always reflects what exists today rather
than what might exist later. This document records the conventions and the
target layering the project is being built toward.

## Principles

- **Deterministic by design.** All analytics, scoring, and recommendations come
  from explicit rules. The same input always yields the same output.
- **Clear layering.** Data access, analysis, and presentation stay separate so
  each can be reasoned about and tested in isolation.
- **Minimal surface area.** Prefer small, focused modules over broad
  abstractions; introduce an abstraction only once real duplication exists.

## Target layering

Data flows in one direction, from the GitHub API to the screen:

```text
GitHub API  ->  api  ->  services  ->  hooks + state  ->  components + pages
```

- **api** — a thin client over the GitHub REST API; fetches and returns raw data.
- **services** — pure functions that turn raw data into analytics, scores, and
  recommendations. No React, no side effects.
- **hooks + state** — bridge services and data fetching into React, exposing
  ready-to-render values to the UI.
- **components + pages** — presentation only; no business logic.

## Testing

Tests live in `src/tests/` and run on Vitest with the jsdom environment and
Testing Library. The pure service layer is the primary target for unit tests.

## Conventions

- Functional React components and hooks.
- Tailwind utility classes for styling, with shared design tokens in `src/theme`.
- JSDoc annotations for shared data shapes.
- ESLint enforces baseline quality; keep the tree warning-free.
