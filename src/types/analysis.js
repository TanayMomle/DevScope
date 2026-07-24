/**
 * Types for the repository analysis engine. `AnalysisResult` is the single,
 * immutable value the UI reads; it never recomputes analytics itself.
 */

/**
 * A repository projected to the identifying and metric fields the analysis
 * references, keeping AnalysisResult self-contained.
 *
 * @typedef {Object} NotableRepository
 * @property {number} id
 * @property {string} name
 * @property {string} fullName
 * @property {string} htmlUrl
 * @property {number} stargazersCount
 * @property {number} forksCount
 * @property {number} size
 * @property {string} createdAt
 * @property {string | null} pushedAt
 */

/**
 * A single entry in a frequency ranking, ordered by count then name.
 *
 * @typedef {Object} RankedCount
 * @property {string} name
 * @property {number} count
 */

/**
 * @typedef {Object} AnalysisResult
 * @property {string} username
 * @property {{ total: number, original: number, forked: number, archived: number, visibility: { public: number, private: number } }} counts
 * @property {{ total: number, mostStarred: NotableRepository | null }} stars
 * @property {{ total: number, mostForked: NotableRepository | null }} forks
 * @property {number} watchers
 * @property {number} openIssues
 * @property {{ distribution: Record<string, number>, top: RankedCount[] }} languages
 * @property {{ frequency: Record<string, number>, top: RankedCount[] }} topics
 * @property {{ frequency: Record<string, number>, unlicensed: number }} licenses
 * @property {{ oldest: NotableRepository | null, newest: NotableRepository | null, averageAgeDays: number }} age
 * @property {{ lastActivityAt: string | null, repository: NotableRepository | null }} activity
 * @property {{ year: number, count: number }[]} timeline
 * @property {{ total: number, average: number, largest: NotableRepository | null, smallest: NotableRepository | null }} sizes
 */

export {};
