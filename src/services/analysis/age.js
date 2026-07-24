import { maxBy, minBy, sumBy } from './aggregate.js';
import { toNotable } from './notable.js';

const MS_PER_DAY = 1000 * 60 * 60 * 24;

/**
 * Oldest and newest repositories by creation date, plus the average age in
 * whole days relative to `now`.
 *
 * @param {import('../../types/github.js').Repository[]} repositories
 * @param {Date} now
 */
export function calculateRepositoryAge(repositories, now) {
  const oldest = minBy(repositories, (repository) => repository.createdAt);
  const newest = maxBy(repositories, (repository) => repository.createdAt);

  const averageAgeDays =
    repositories.length === 0
      ? 0
      : Math.round(
          sumBy(repositories, (repository) => now.getTime() - new Date(repository.createdAt).getTime()) /
            repositories.length /
            MS_PER_DAY,
        );

  return {
    oldest: oldest ? toNotable(oldest) : null,
    newest: newest ? toNotable(newest) : null,
    averageAgeDays,
  };
}

/**
 * The most recent push across repositories. Repositories that have never been
 * pushed to (null pushedAt) are ignored.
 *
 * @param {import('../../types/github.js').Repository[]} repositories
 */
export function calculateActivity(repositories) {
  const pushed = repositories.filter((repository) => repository.pushedAt);
  const mostRecent = maxBy(pushed, (repository) => repository.pushedAt);

  return {
    lastActivityAt: mostRecent ? mostRecent.pushedAt : null,
    repository: mostRecent ? toNotable(mostRecent) : null,
  };
}
