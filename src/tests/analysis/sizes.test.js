import { describe, expect, it } from 'vitest';
import { calculateSizes } from '../../services/analysis/sizes.js';
import { makeRepository } from '../fixtures.js';

describe('calculateSizes', () => {
  it('handles no repositories', () => {
    expect(calculateSizes([])).toEqual({ total: 0, average: 0, largest: null, smallest: null });
  });

  it('computes total, average, largest and smallest', () => {
    const repositories = [
      makeRepository({ id: 1, name: 'small', size: 100 }),
      makeRepository({ id: 2, name: 'big', size: 500 }),
      makeRepository({ id: 3, name: 'mid', size: 300 }),
    ];
    const result = calculateSizes(repositories);

    expect(result.total).toBe(900);
    expect(result.average).toBe(300);
    expect(result.largest.name).toBe('big');
    expect(result.smallest.name).toBe('small');
  });
});
