import { describe, expect, it } from 'vitest';
import { calculateCounts } from '../../services/analysis/counts.js';
import { makeRepository } from '../fixtures.js';

describe('calculateCounts', () => {
  it('returns zeros for no repositories', () => {
    expect(calculateCounts([])).toEqual({
      total: 0,
      original: 0,
      forked: 0,
      archived: 0,
      visibility: { public: 0, private: 0 },
    });
  });

  it('separates original, forked and archived repositories', () => {
    const repositories = [
      makeRepository({ id: 1 }),
      makeRepository({ id: 2, fork: true }),
      makeRepository({ id: 3, archived: true }),
      makeRepository({ id: 4, fork: true, archived: true }),
    ];

    expect(calculateCounts(repositories)).toEqual({
      total: 4,
      original: 2,
      forked: 2,
      archived: 2,
      visibility: { public: 4, private: 0 },
    });
  });

  it('summarizes visibility', () => {
    const repositories = [
      makeRepository({ id: 1, visibility: 'public' }),
      makeRepository({ id: 2, visibility: 'private' }),
    ];

    expect(calculateCounts(repositories).visibility).toEqual({ public: 1, private: 1 });
  });
});
