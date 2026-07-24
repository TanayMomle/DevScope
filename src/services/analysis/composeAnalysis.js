import { calculateCounts } from './counts.js';
import { calculateLanguages } from './languages.js';
import { calculateTopics } from './topics.js';
import { calculateLicenses } from './licenses.js';
import { calculateForks, calculateOpenIssues, calculateStars, calculateWatchers } from './engagement.js';
import { calculateActivity, calculateRepositoryAge } from './age.js';
import { calculateSizes } from './sizes.js';
import { deepFreeze } from '../../utils/deepFreeze.js';

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
