import { describe, expect, it } from 'vitest';
import { scoreMaintainability } from '../../services/scoring/maintainability.js';

const ids = (result) => result.deductions.map((deduction) => deduction.id);

describe('scoreMaintainability', () => {
  it('penalizes heavy archival just past the boundary', () => {
    // 2 of 8 = 0.25, not greater than the threshold.
    expect(
      ids(scoreMaintainability({ counts: { total: 8, archived: 2 }, licenses: { unlicensed: 0 } })),
    ).not.toContain('ARCHIVED_REPOSITORIES');
    // 3 of 8 = 0.375 is over the threshold.
    expect(
      ids(scoreMaintainability({ counts: { total: 8, archived: 3 }, licenses: { unlicensed: 0 } })),
    ).toContain('ARCHIVED_REPOSITORIES');
  });

  it('penalizes missing licenses just past the boundary', () => {
    expect(
      ids(scoreMaintainability({ counts: { total: 10, archived: 0 }, licenses: { unlicensed: 5 } })),
    ).not.toContain('MISSING_LICENSES');
    expect(
      ids(scoreMaintainability({ counts: { total: 10, archived: 0 }, licenses: { unlicensed: 6 } })),
    ).toContain('MISSING_LICENSES');
  });

  it('gives a well-maintained portfolio no deductions', () => {
    const result = scoreMaintainability({
      counts: { total: 10, archived: 0 },
      licenses: { unlicensed: 0 },
    });
    expect(result.deductions).toEqual([]);
  });
});
