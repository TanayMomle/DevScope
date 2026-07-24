/**
 * Repositories created per year, ascending, with gap years filled with zero so
 * the timeline is continuous. Years are taken in UTC for determinism.
 *
 * @param {import('../../types/github.js').Repository[]} repositories
 * @returns {{ year: number, count: number }[]}
 */
export function calculateTimeline(repositories) {
  if (repositories.length === 0) {
    return [];
  }

  const counts = new Map();
  let earliest = Infinity;
  let latest = -Infinity;

  for (const repository of repositories) {
    const year = new Date(repository.createdAt).getUTCFullYear();
    counts.set(year, (counts.get(year) ?? 0) + 1);
    if (year < earliest) earliest = year;
    if (year > latest) latest = year;
  }

  const timeline = [];
  for (let year = earliest; year <= latest; year += 1) {
    timeline.push({ year, count: counts.get(year) ?? 0 });
  }
  return timeline;
}
