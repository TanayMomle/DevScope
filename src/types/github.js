/**
 * Normalized GitHub domain types returned by the service layer. These describe
 * the shapes the rest of the application consumes, independent of the raw REST
 * payloads.
 */

/**
 * @typedef {Object} RepositoryOwner
 * @property {string} login
 * @property {number} id
 * @property {string} type
 * @property {string} avatarUrl
 * @property {string} htmlUrl
 */

/**
 * @typedef {Object} GitHubUser
 * @property {string} login
 * @property {number} id
 * @property {string | null} name
 * @property {string} avatarUrl
 * @property {string} htmlUrl
 * @property {string | null} bio
 * @property {string | null} company
 * @property {string | null} location
 * @property {string | null} blog
 * @property {number} followers
 * @property {number} following
 * @property {number} publicRepos
 * @property {number} publicGists
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef {Object} Repository
 * @property {number} id
 * @property {string} name
 * @property {string} fullName
 * @property {string | null} description
 * @property {string} htmlUrl
 * @property {string | null} homepage
 * @property {string | null} language
 * @property {string[]} topics
 * @property {string | null} license
 * @property {number} stargazersCount
 * @property {number} forksCount
 * @property {number} watchersCount
 * @property {number} openIssuesCount
 * @property {number} size
 * @property {boolean} fork
 * @property {boolean} archived
 * @property {string} defaultBranch
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {string | null} pushedAt
 * @property {RepositoryOwner} owner
 */

export {};
