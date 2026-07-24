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
    avatarUrl: '',
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
