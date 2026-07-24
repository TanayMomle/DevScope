import { describe, expect, it } from 'vitest';
import { countValues, maxBy, minBy, rankCounts, sumBy } from '../../services/analysis/aggregate.js';

describe('sumBy', () => {
  it('sums the selected values', () => {
    expect(sumBy([{ n: 1 }, { n: 2 }, { n: 3 }], (item) => item.n)).toBe(6);
  });

  it('returns 0 for an empty list', () => {
    expect(sumBy([], (item) => item.n)).toBe(0);
  });
});

describe('maxBy / minBy', () => {
  it('return null for an empty list', () => {
    expect(maxBy([], (item) => item.n)).toBeNull();
    expect(minBy([], (item) => item.n)).toBeNull();
  });

  it('pick the extreme item', () => {
    const items = [{ id: 'a', n: 1 }, { id: 'b', n: 5 }, { id: 'c', n: 3 }];
    expect(maxBy(items, (item) => item.n).id).toBe('b');
    expect(minBy(items, (item) => item.n).id).toBe('a');
  });

  it('break ties in favor of the earliest item', () => {
    const items = [{ id: 'a', n: 5 }, { id: 'b', n: 5 }];
    expect(maxBy(items, (item) => item.n).id).toBe('a');
    expect(minBy(items, (item) => item.n).id).toBe('a');
  });
});

describe('countValues', () => {
  it('counts occurrences', () => {
    expect(countValues(['js', 'js', 'ts'])).toEqual({ js: 2, ts: 1 });
  });

  it('returns an empty map for no values', () => {
    expect(countValues([])).toEqual({});
  });
});

describe('rankCounts', () => {
  it('orders by count desc, then name asc', () => {
    expect(rankCounts({ Python: 1, JavaScript: 3, Go: 1 })).toEqual([
      { name: 'JavaScript', count: 3 },
      { name: 'Go', count: 1 },
      { name: 'Python', count: 1 },
    ]);
  });
});
