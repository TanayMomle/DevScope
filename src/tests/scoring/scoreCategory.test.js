import { describe, expect, it } from 'vitest';
import { scoreCategory } from '../../services/scoring/scoreCategory.js';

describe('scoreCategory', () => {
  it('returns the full weight when there are no deductions', () => {
    const result = scoreCategory('repository', []);
    expect(result.value).toBe(result.max);
    expect(result.deductions).toEqual([]);
    expect(result.label).toBe('Repository Portfolio');
  });

  it('subtracts a resolved penalty from the max', () => {
    const result = scoreCategory('repository', ['FEW_REPOSITORIES']);
    expect(result.value).toBe(result.max - 10);
    expect(result.deductions[0]).toMatchObject({
      id: 'FEW_REPOSITORIES',
      category: 'repository',
      penalty: 10,
    });
  });

  it('never falls below zero', () => {
    const result = scoreCategory('repository', [
      'FEW_REPOSITORIES',
      'NO_ORIGINAL_REPOSITORIES',
      'EXCESSIVE_FORKS',
    ]);
    expect(result.value).toBe(0);
  });
});
