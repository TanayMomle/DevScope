# DevScope

**Deep GitHub Intelligence for Developers**
plaese change the variable value there is some issue with it causes a bug that restarts the function

DevScope analyzes any public GitHub profile and turns it into a portfolio
report: a headline score, category breakdown, repository analytics, charts,
and actionable recommendations. Every insight is produced by transparent,
deterministic rules — no AI, no opaque scoring — so results stay consistent
and explainable.

## Overview

Enter a GitHub username and DevScope fetches the profile and every public
repository, then runs a deterministic pipeline entirely in the browser:

```text
GitHub API → analysis → scoring → recommendations → dashboard
```

The dashboard shows an overall portfolio score (0–100) and five category
scores, repository and engagement summaries, language/topic/license
breakdowns, notable repositories, visualizations, and prioritized
recommendations. The whole report can be exported.

## Features

- **Portfolio score** — an overall 0–100 score with a per-category breakdown
  (repository, activity, language, quality, maintainability) and the exact
  deductions behind it.
- **Repository analytics** — totals, engagement (stars/forks/watchers/issues),
  size and age statistics, and notable repositories.
- **Breakdowns** — language distribution, topic frequency, and license usage.
- **Visualizations** — language and license pies, a creation-timeline area
  chart, and stars-vs-forks / topic bar charts.
- **Recommendations** — prioritized, evidence-backed suggestions, each with an
  estimated score gain and concrete action items.
- **Export & share** — download the report as JSON or CSV, or print it via the
  browser's print dialog.

## Technology stack

| Area          | Choice                          |
| ------------- | ------------------------------- |
| Framework     | React                           |
| Build tool    | Vite                            |
| Language      | JavaScript                      |
| Styling       | Tailwind CSS                    |
| Data fetching | TanStack React Query            |
| Charts        | Recharts                        |
| Animation     | Framer Motion                   |
| Icons         | Lucide React                    |
| Testing       | Vitest + Testing Library        |
| Linting       | ESLint                          |

## Getting started

### Prerequisites

- Node.js `>= 20`
- npm `>= 10`

### Installation

```bash
git clone <repository-url>
cd devscope
npm install
npm run dev
```

DevScope talks directly to GitHub's public REST API from the browser; no API
key or backend is required. Unauthenticated requests are subject to GitHub's
rate limit (60 requests/hour per IP).

## Development

| Script                  | Description                              |
| ----------------------- | ---------------------------------------- |
| `npm run dev`           | Start the Vite dev server.               |
| `npm run build`         | Produce a production build in `dist/`.   |
| `npm run preview`       | Preview the production build locally.    |
| `npm run lint`          | Run ESLint across the project.           |
| `npm run test`          | Run the test suite once.                 |
| `npm run test:watch`    | Run tests in watch mode.                 |
| `npm run test:coverage` | Run tests and generate a coverage report.|

## Project structure

```text
devscope/
├── .github/workflows/   # Continuous integration
├── docs/                # Project documentation
├── public/              # Static assets served as-is
└── src/
    ├── api/             # GitHub REST client, endpoints, typed errors
    ├── components/      # Presentational UI, including charts/
    ├── config/          # Application constants
    ├── hooks/           # React Query data + analysis wiring
    ├── services/        # Pure engines: analysis, scoring, recommendations, export
    ├── state/           # React Query client configuration
    ├── styles/          # Global styles and Tailwind entry
    ├── tests/           # Test setup and suites
    ├── theme/           # Design tokens
    ├── types/           # Shared JSDoc type definitions
    ├── utils/           # Small, dependency-free helpers
    ├── App.jsx          # Application shell
    └── main.jsx         # Entry point
```

## Architecture

The data and analysis engines are pure and framework-agnostic; the UI is a thin
presentation layer that never computes metrics itself. See
[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for details.

## License

Released under the [MIT License](LICENSE).
