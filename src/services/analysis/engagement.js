import { maxBy, sumBy } from './aggregate.js';
import { toNotable } from './notable.js';

/**
 * Total stars and the single most starred repository.
 * @param {import('../../types/github.js').Repository[]} repositories
 */
export function calculateStars(repositories) {
  const mostStarred = maxBy(repositories, (repository) => repository.stargazersCount);
  return {
    total: sumBy(repositories, (repository) => repository.stargazersCount),
    mostStarred: mostStarred ? toNotable(mostStarred) : null,
  };
}

/**
 * Total forks and the single most forked repository.
 * @param {import('../../types/github.js').Repository[]} repositories
 */
export function calculateForks(repositories) {
  const mostForked = maxBy(repositories, (repository) => repository.forksCount);
  return {
    total: sumBy(repositories, (repository) => repository.forksCount),
    mostForked: mostForked ? toNotable(mostForked) : null,
  };
}

/**
 * Total watchers across repositories.
 * @param {import('../../types/github.js').Repository[]} repositories
 * @returns {number}
 */
export function calculateWatchers(repositories) {
  return sumBy(repositories, (repository) => repository.watchersCount);
}

/**
 * Total open issues across repositories.
 * @param {import('../../types/github.js').Repository[]} repositories
 * @returns {number}
 */
export function calculateOpenIssues(repositories) {
  return sumBy(repositories, (repository) => repository.openIssuesCount);
}
