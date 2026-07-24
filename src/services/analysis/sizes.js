import { maxBy, minBy, sumBy } from './aggregate.js';
import { toNotable } from './notable.js';

/**
 * Repository size statistics in kilobytes: total, average (whole KB), and the
 * largest and smallest repositories.
 *
 * @param {import('../../types/github.js').Repository[]} repositories
 */
export function calculateSizes(repositories) {
  const total = sumBy(repositories, (repository) => repository.size);
  const largest = maxBy(repositories, (repository) => repository.size);
  const smallest = minBy(repositories, (repository) => repository.size);

  return {
    total,
    average: repositories.length === 0 ? 0 : Math.round(total / repositories.length),
    largest: largest ? toNotable(largest) : null,
    smallest: smallest ? toNotable(smallest) : null,
  };
}
