/**
 * Small, generic aggregation helpers shared by the analysis modules. Each is
 * pure and deterministic; ordering ties resolve to the first input item.
 */

const compareStrings = (a, b) => (a < b ? -1 : a > b ? 1 : 0);

/**
 * @template T
 * @param {T[]} items
 * @param {(item: T) => number} selector
 * @returns {number}
 */
export function sumBy(items, selector) {
  return items.reduce((total, item) => total + selector(item), 0);
}

/**
 * The item with the greatest selected value, or null when empty. On a tie the
 * earliest item in input order wins.
 *
 * @template T
 * @param {T[]} items
 * @param {(item: T) => number | string} selector
 * @returns {T | null}
 */
export function maxBy(items, selector) {
  let best = null;
  let bestValue;
  for (const item of items) {
    const value = selector(item);
    if (best === null || value > bestValue) {
      best = item;
      bestValue = value;
    }
  }
  return best;
}

/**
 * The item with the smallest selected value, or null when empty. On a tie the
 * earliest item in input order wins.
 *
 * @template T
 * @param {T[]} items
 * @param {(item: T) => number | string} selector
 * @returns {T | null}
 */
export function minBy(items, selector) {
  let best = null;
  let bestValue;
  for (const item of items) {
    const value = selector(item);
    if (best === null || value < bestValue) {
      best = item;
      bestValue = value;
    }
  }
  return best;
}

/**
 * Count how often each value appears.
 *
 * @param {string[]} values
 * @returns {Record<string, number>}
 */
export function countValues(values) {
  const counts = {};
  for (const value of values) {
    counts[value] = (counts[value] ?? 0) + 1;
  }
  return counts;
}

/**
 * Rank a frequency map into entries ordered by count (desc) then name (asc).
 *
 * @param {Record<string, number>} frequency
 * @returns {import('../../types/analysis.js').RankedCount[]}
 */
export function rankCounts(frequency) {
  return Object.entries(frequency)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || compareStrings(a.name, b.name));
}
