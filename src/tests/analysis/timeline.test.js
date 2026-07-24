import { describe, expect, it } from 'vitest';
import { calculateTimeline } from '../../services/analysis/timeline.js';
import { makeRepository } from '../fixtures.js';

describe('calculateTimeline', () => {
  it('returns an empty timeline for no repositories', () => {
    expect(calculateTimeline([])).toEqual([]);
  });

  it('handles a single repository', () => {
    expect(calculateTimeline([makeRepository({ createdAt: '2020-06-01T00:00:00Z' })])).toEqual([
      { year: 2020, count: 1 },
    ]);
  });

  it('counts repositories per creation year and fills gap years with zero', () => {
    const repositories = [
      makeRepository({ id: 1, createdAt: '2019-05-01T00:00:00Z' }),
      makeRepository({ id: 2, createdAt: '2019-08-01T00:00:00Z' }),
      makeRepository({ id: 3, createdAt: '2022-01-01T00:00:00Z' }),
    ];

    expect(calculateTimeline(repositories)).toEqual([
      { year: 2019, count: 2 },
      { year: 2020, count: 0 },
      { year: 2021, count: 0 },
      { year: 2022, count: 1 },
    ]);
  });
});
