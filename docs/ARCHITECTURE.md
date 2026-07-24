# Architecture

This document describes how DevScope is organized and the conventions the
codebase follows. It is intended to keep the project legible as it grows.

## Principles

- **Deterministic by design.** All analytics, scoring, and recommendations are
  produced by explicit rules. Given the same input, DevScope always returns the
  same output.
- **Clear layering.** Data access, analysis, and presentation are kept separate
  so each can be reasoned about and tested in isolation.
- **Minimal surface area.** Prefer small, focused modules and dependency-free
  helpers over broad abstractions.

## Layers

```text
GitHub API  ->  api/  ->  services/  ->  hooks/ + state/  ->  components/ + pages/
```

- **`api/`** — Thin client for the GitHub REST API. Responsible only for
  fetching and returning raw data.
- **`services/`** — Pure functions that transform raw API data into analytics,
  health scores, and recommendations. No React, no side effects.
- **`hooks/` and `state/`** — Bridge services and data fetching (TanStack Query)
  into React, exposing ready-to-render values to the UI.
- **`components/` and `pages/`** — Presentation. `pages/` compose route-level
  views; `components/` are split into `common`, `dashboard`, and `layout`.

## Supporting modules

- **`config/`** — Application constants and configuration.
- **`theme/`** — Design tokens shared with Tailwind's theme.
- **`types/`** — Shared JSDoc type definitions for domain data.
- **`utils/`** — Small, reusable, dependency-free helpers.

## Testing

Tests live in `src/tests/` and run on Vitest with the jsdom environment and
Testing Library. Service-layer logic is the primary target for unit tests
because it is pure and deterministic.

## Conventions

- JavaScript with JSDoc annotations for shared data shapes.
- Functional React components and hooks.
- Tailwind utility classes for styling, with shared tokens in `theme/`.
- ESLint enforces baseline code quality; keep the tree warning-free.
