import { describe, expect, it } from 'vitest';
import { scoreRepository } from '../../services/scoring/repository.js';

const ids = (result) => result.deductions.map((deduction) => deduction.id);

describe('scoreRepository', () => {
  it('penalizes too few repositories at the boundary', () => {
    expect(ids(scoreRepository({ counts: { total: 5, original: 5, forked: 0 } }))).not.toContain(
      'FEW_REPOSITORIES',
    );
    expect(ids(scoreRepository({ counts: { total: 4, original: 4, forked: 0 } }))).toContain(
      'FEW_REPOSITORIES',
    );
  });

  it('penalizes a fork-only portfolio', () => {
    const result = scoreRepository({ counts: { total: 6, original: 0, forked: 6 } });
    expect(ids(result)).toContain('NO_ORIGINAL_REPOSITORIES');
    expect(ids(result)).toContain('EXCESSIVE_FORKS');
  });

  it('penalizes excessive forks at the boundary', () => {
    expect(ids(scoreRepository({ counts: { total: 10, original: 5, forked: 5 } }))).not.toContain(
      'EXCESSIVE_FORKS',
    );
    expect(ids(scoreRepository({ counts: { total: 10, original: 4, forked: 6 } }))).toContain(
      'EXCESSIVE_FORKS',
    );
  });

  it('gives a healthy collection no deductions', () => {
    const result = scoreRepository({ counts: { total: 10, original: 10, forked: 0 } });
    expect(result.deductions).toEqual([]);
    expect(result.value).toBe(20);
  });
});
