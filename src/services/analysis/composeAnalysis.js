import { calculateCounts } from './counts.js';
import { calculateLanguages } from './languages.js';
import { calculateTopics } from './topics.js';
import { calculateLicenses } from './licenses.js';
import { calculateForks, calculateOpenIssues, calculateStars, calculateWatchers } from './engagement.js';
import { calculateActivity, calculateRepositoryAge } from './age.js';
import { calculateSizes } from './sizes.js';

/**
 * Recursively freeze a value the engine created. Every value passed here is
 * built from projections and primitives, never the caller's input objects, so
 * freezing has no side effects on the arguments.
 *
 * @template T
 * @param {T} value
 * @returns {T}
 */
function deepFreeze(value) {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.values(value).forEach(deepFreeze);
    Object.freeze(value);
  }
  return value;
}

/**
 * Compose the complete, immutable analysis of a user's public repositories.
 *
 * @param {import('../../types/github.js').GitHubUser} user
 * @param {import('../../types/github.js').Repository[]} repositories
 * @param {{ now?: Date }} [options] - `now` is injectable so results are testable.
 * @returns {import('../../types/analysis.js').AnalysisResult}
 */
export function composeAnalysis(user, repositories, { now = new Date() } = {}) {
  return deepFreeze({
    username: user.login,
    counts: calculateCounts(repositories),
    stars: calculateStars(repositories),
    forks: calculateForks(repositories),
    watchers: calculateWatchers(repositories),
    openIssues: calculateOpenIssues(repositories),
    languages: calculateLanguages(repositories),
    topics: calculateTopics(repositories),
    licenses: calculateLicenses(repositories),
    age: calculateRepositoryAge(repositories, now),
    activity: calculateActivity(repositories),
    sizes: calculateSizes(repositories),
  });
}
