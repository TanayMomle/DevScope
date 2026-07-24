import { countValues, rankCounts } from './aggregate.js';

/**
 * Language distribution across repositories. Repositories with no detected
 * language are excluded rather than counted under a placeholder.
 *
 * @param {import('../../types/github.js').Repository[]} repositories
 */
export function calculateLanguages(repositories) {
  const distribution = countValues(repositories.map((repository) => repository.language).filter(Boolean));

  return { distribution, top: rankCounts(distribution) };
}
