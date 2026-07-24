import { describe, expect, it } from 'vitest';
import { recommendQuality } from '../../services/recommendations/recommendQuality.js';
import { makeAnalysis, makeScore } from '../fixtures.js';

const scoreWith = (deductions) =>
  makeScore({ qualityScore: { label: 'Quality Signals', value: 0, max: 20, deductions } });

describe('recommendQuality', () => {
  it('maps zero stars and missing topics to recommendations', () => {
    const score = scoreWith([
      { id: 'ZERO_STARS', category: 'quality', penalty: 10 },
      { id: 'NO_TOPICS', category: 'quality', penalty: 8 },
    ]);

    const recommendations = recommendQuality(makeAnalysis(), score);

    expect(recommendations.map((recommendation) => recommendation.id)).toEqual([
      'ZERO_STARS',
      'NO_TOPICS',
    ]);
    expect(recommendations[0].priority).toBe('Low');
    expect(recommendations[1].priority).toBe('Medium');
  });
});
