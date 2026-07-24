import { countValues } from './aggregate.js';

/**
 * How often each license appears, plus the number of repositories that declare
 * no license.
 *
 * @param {import('../../types/github.js').Repository[]} repositories
 */
export function calculateLicenses(repositories) {
  const licensed = repositories.map((repository) => repository.license).filter(Boolean);

  return {
    frequency: countValues(licensed),
    unlicensed: repositories.length - licensed.length,
  };
}
