import { describe, expect, it } from 'vitest';
import { recommendMaintainability } from '../../services/recommendations/recommendMaintainability.js';
import { makeAnalysis, makeScore } from '../fixtures.js';

const scoreWith = (deductions) =>
  makeScore({ maintainabilityScore: { label: 'Maintainability', value: 0, max: 20, deductions } });

describe('recommendMaintainability', () => {
  it('cites archived and unlicensed counts as evidence', () => {
    const analysis = makeAnalysis({
      counts: { total: 8, original: 8, forked: 0, archived: 4, visibility: { public: 8, private: 0 } },
      licenses: { frequency: {}, unlicensed: 6 },
    });
    const score = scoreWith([
      { id: 'ARCHIVED_REPOSITORIES', category: 'maintainability', penalty: 10 },
      { id: 'MISSING_LICENSES', category: 'maintainability', penalty: 8 },
    ]);

    const recommendations = recommendMaintainability(analysis, score);

    expect(recommendations[0].evidence).toBe('4 of 8 repositories are archived.');
    expect(recommendations[1].evidence).toBe('6 of 8 repositories have no license.');
  });
});
