import { countValues, rankCounts } from './aggregate.js';

/**
 * How often each topic appears across all repositories.
 *
 * @param {import('../../types/github.js').Repository[]} repositories
 */
export function calculateTopics(repositories) {
  const frequency = countValues(repositories.flatMap((repository) => repository.topics ?? []));

  return { frequency, top: rankCounts(frequency) };
}
