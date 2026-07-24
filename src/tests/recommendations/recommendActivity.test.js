import { describe, expect, it } from 'vitest';
import { recommendActivity } from '../../services/recommendations/recommendActivity.js';
import { makeAnalysis, makeScore } from '../fixtures.js';

const scoreWith = (deductions) =>
  makeScore({ activityScore: { label: 'Activity & Recency', value: 0, max: 20, deductions } });

describe('recommendActivity', () => {
  it('recommends starting activity when nothing has been pushed', () => {
    const score = scoreWith([{ id: 'NO_ACTIVITY', category: 'activity', penalty: 20 }]);

    const [recommendation] = recommendActivity(makeAnalysis(), score);

    expect(recommendation).toMatchObject({ id: 'NO_ACTIVITY', priority: 'High', improvementEstimate: 20 });
    expect(recommendation.evidence).toMatch(/recorded pushes/i);
  });

  it('cites the last activity date for stale portfolios', () => {
    const analysis = makeAnalysis({
      activity: { lastActivityAt: '2022-03-01T00:00:00Z', repository: null },
    });
    const score = scoreWith([{ id: 'STALE_ACTIVITY', category: 'activity', penalty: 10 }]);

    const [recommendation] = recommendActivity(analysis, score);

    expect(recommendation.priority).toBe('Medium');
    expect(recommendation.evidence).toContain('2022');
  });
});
