# DevScope

**Deep GitHub Intelligence for Developers**

DevScope analyzes any public GitHub profile and turns it into professional
portfolio insights — repository analytics, technology breakdowns, health
reports, and actionable recommendations. Every insight is produced by
transparent, deterministic rules, so results stay consistent and explainable.

## Overview

Point DevScope at a GitHub username and it builds a structured picture of that
developer's public work: how active they are, what they build, which languages
and technologies show up across their repositories, and where their portfolio
could be stronger. The goal is a clear, shareable read on a developer's public
footprint — no guesswork, no opaque scoring.

## Features

- **Profile analytics** — activity, contribution patterns, and portfolio summary.
- **Repository insights** — per-repository metrics such as stars, forks, and recency.
- **Technology breakdown** — languages and tooling aggregated across repositories.
- **Health reports** — a rules-based read on the overall strength of a profile.
- **Actionable recommendations** — concrete, deterministic suggestions for improvement.

## Technology stack

| Area          | Choice                          |
| ------------- | ------------------------------- |
| Framework     | React                           |
| Build tool    | Vite                            |
| Language      | JavaScript                      |
| Styling       | Tailwind CSS                    |
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
```

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
    ├── config/          # Application configuration and constants
    ├── styles/          # Global styles and Tailwind entry
    ├── tests/           # Test setup and suites
    ├── theme/           # Design tokens
    ├── utils/           # Small, dependency-free helpers
    ├── App.jsx          # Application shell
    └── main.jsx         # Entry point
```

## Roadmap

- Profile search and retrieval
- Repository analytics dashboard
- Language and technology breakdown
- Profile health report and scoring
- Deterministic, actionable recommendations
- Shareable and exportable reports

Additional libraries are introduced alongside the features that need them —
React Router for routing, TanStack React Query for data fetching, and Recharts
for charts.

## License

Released under the [MIT License](LICENSE).
