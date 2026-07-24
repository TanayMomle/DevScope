/**
 * Build a normalized Repository for tests. Override only the fields under test;
 * everything else gets a deterministic default.
 *
 * @param {Partial<import('../types/github.js').Repository>} [overrides]
 * @returns {import('../types/github.js').Repository}
 */
export function makeRepository(overrides = {}) {
  return {
    id: 1,
    name: 'repo',
    fullName: 'octocat/repo',
    description: null,
    htmlUrl: 'https://github.com/octocat/repo',
    homepage: null,
    language: null,
    topics: [],
    license: null,
    stargazersCount: 0,
    forksCount: 0,
    watchersCount: 0,
    openIssuesCount: 0,
    size: 0,
    fork: false,
    archived: false,
    visibility: 'public',
    defaultBranch: 'main',
    createdAt: '2020-01-01T00:00:00Z',
    updatedAt: '2020-01-01T00:00:00Z',
    pushedAt: '2020-01-01T00:00:00Z',
    owner: { login: 'octocat', id: 1, type: 'User', avatarUrl: '', htmlUrl: '' },
    ...overrides,
  };
}

/**
 * Build a normalized GitHubUser for tests.
 *
 * @param {Partial<import('../types/github.js').GitHubUser>} [overrides]
 * @returns {import('../types/github.js').GitHubUser}
 */
export function makeUser(overrides = {}) {
  return {
    login: 'octocat',
    id: 1,
    name: 'The Octocat',
    avatarUrl: 'https://avatars.githubusercontent.com/u/1?v=4',
    htmlUrl: 'https://github.com/octocat',
    bio: null,
    company: null,
    location: null,
    blog: null,
    followers: 0,
    following: 0,
    publicRepos: 0,
    publicGists: 0,
    createdAt: '2011-01-25T18:44:36Z',
    updatedAt: '2020-01-01T00:00:00Z',
    ...overrides,
  };
}

/**
 * Build an AnalysisResult for scoring tests. The default is a strong portfolio
 * that triggers no deductions; override the sections a test needs to change.
 *
 * @param {Partial<import('../types/analysis.js').AnalysisResult>} [overrides]
 * @returns {import('../types/analysis.js').AnalysisResult}
 */
export function makeAnalysis(overrides = {}) {
  return {
    username: 'octocat',
    counts: { total: 10, original: 10, forked: 0, archived: 0, visibility: { public: 10, private: 0 } },
    stars: { total: 100, mostStarred: null },
    forks: { total: 5, mostForked: null },
    watchers: 100,
    openIssues: 3,
    languages: {
      distribution: { JavaScript: 4, Python: 3, Go: 3 },
      top: [
        { name: 'JavaScript', count: 4 },
        { name: 'Go', count: 3 },
        { name: 'Python', count: 3 },
      ],
    },
    topics: { frequency: { cli: 2, web: 3 }, top: [{ name: 'web', count: 3 }, { name: 'cli', count: 2 }] },
    licenses: { frequency: { MIT: 8 }, unlicensed: 2 },
    age: { oldest: null, newest: null, averageAgeDays: 500 },
    activity: { lastActivityAt: '2025-12-01T00:00:00Z', repository: null },
    timeline: [
      { year: 2019, count: 3 },
      { year: 2020, count: 4 },
      { year: 2021, count: 3 },
    ],
    sizes: { total: 1000, average: 100, largest: null, smallest: null },
    ...overrides,
  };
}

/**
 * Build a PortfolioScore for dashboard tests. The default is a perfect score;
 * override individual categories or the overall value as needed.
 *
 * @param {Partial<import('../types/scoring.js').PortfolioScore>} [overrides]
 * @returns {import('../types/scoring.js').PortfolioScore}
 */
export function makeScore(overrides = {}) {
  const category = (label) => ({ label, value: 20, max: 20, deductions: [] });
  return {
    overallScore: 100,
    repositoryScore: category('Repository Portfolio'),
    activityScore: category('Activity & Recency'),
    languageScore: category('Language Diversity'),
    qualityScore: category('Quality Signals'),
    maintainabilityScore: category('Maintainability'),
    ...overrides,
  };
}
