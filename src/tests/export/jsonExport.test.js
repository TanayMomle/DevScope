import { describe, expect, it } from 'vitest';
import { exportJson } from '../../services/export/jsonExport.js';
import { makeAnalysis, makeDashboardModel, makeScore } from '../fixtures.js';

describe('exportJson', () => {
  it('serializes the model to valid, structured JSON', () => {
    const model = makeDashboardModel({
      analysis: makeAnalysis({ username: 'octocat' }),
      score: makeScore({ overallScore: 82 }),
      recommendations: [{ id: 'NO_TOPICS', title: 'Add topics', priority: 'Medium' }],
    });

    const parsed = JSON.parse(exportJson(model));

    expect(parsed.username).toBe('octocat');
    expect(parsed.overallScore).toBe(82);
    expect(parsed.analysis.counts.total).toBe(10);
    expect(parsed.recommendations).toHaveLength(1);
  });

  it('is deterministic', () => {
    const model = makeDashboardModel();
    expect(exportJson(model)).toBe(exportJson(model));
  });

  it('handles an empty portfolio', () => {
    const model = makeDashboardModel({
      analysis: makeAnalysis({
        username: 'empty',
        counts: { total: 0, original: 0, forked: 0, archived: 0, visibility: { public: 0, private: 0 } },
        languages: { distribution: {}, top: [] },
      }),
      recommendations: [],
    });

    const parsed = JSON.parse(exportJson(model));
    expect(parsed.username).toBe('empty');
    expect(parsed.analysis.counts.total).toBe(0);
    expect(parsed.recommendations).toEqual([]);
  });
});
