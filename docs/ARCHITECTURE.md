# Architecture

DevScope is a single-page React application with no backend. All data fetching,
analysis, scoring, recommendation, and export logic runs in the browser. This
document records the layering and conventions the codebase follows.

## Principles

- **Deterministic by design.** All analytics, scoring, and recommendations come
  from explicit rules. The same input always yields the same output.
- **Pure engines, thin UI.** The service layer is framework-agnostic and
  side-effect free; components only present pre-computed values.
- **Minimal surface area.** Prefer small, focused modules over broad
  abstractions; introduce an abstraction only once real duplication exists.

## Layering

Data flows in one direction, from the GitHub API to the screen:

```text
api  →  services  →  hooks + state  →  components
```

- **`api`** — a thin client over the GitHub REST API (timeout, cancellation,
  typed errors) plus endpoint builders. Fetches and returns raw data only.
- **`services`** — pure functions organized by concern: `githubService`
  (fetch + normalize, including pagination), `analysis` (repository analytics
  → frozen `AnalysisResult`), `scoring` (`PortfolioScore` from config-driven
  rules), `recommendations` (actionable items from deductions), and `export`
  (JSON/CSV/HTML serialization). No React, no side effects.
- **`hooks` + `state`** — `useGitHubProfile` bridges the service into React
  Query (retry, cancellation, partial success); `usePortfolioAnalysis` composes
  analysis, scoring, and recommendations into a single dashboard model.
  `state` holds the React Query client configuration.
- **`components`** — presentation only, no business logic. The heavy chart
  section is lazy-loaded so the initial bundle stays small.

## Testing

Tests live in `src/tests/` and run on Vitest with the jsdom environment and
Testing Library. The pure service layer is exhaustively unit-tested with fixed,
deterministic fixtures; Recharts is stubbed in tests and verified in the
browser.

## Conventions

- Functional React components and hooks.
- Tailwind utility classes for styling, with shared design tokens in `src/theme`.
- JSDoc annotations for shared data shapes (`src/types`).
- Engine outputs are deeply frozen to guarantee immutability.
- ESLint enforces baseline quality; keep the tree warning-free.
