import { describe, expect, it } from 'vitest';
import { exportCsv } from '../../services/export/csvExport.js';
import { makeAnalysis, makeDashboardModel, makeScore } from '../fixtures.js';

describe('exportCsv', () => {
  it('emits a Metric,Value table with headline metrics', () => {
    const model = makeDashboardModel({
      analysis: makeAnalysis({ username: 'octocat' }),
      score: makeScore({ overallScore: 74 }),
    });

    const lines = exportCsv(model).split('\n');

    expect(lines[0]).toBe('Metric,Value');
    expect(lines).toContain('Username,octocat');
    expect(lines).toContain('Overall Score,74');
    expect(lines).toContain('Total Repositories,10');
  });

  it('emits raw numbers without thousands separators', () => {
    const model = makeDashboardModel({
      analysis: makeAnalysis({ stars: { total: 165790, mostStarred: null } }),
    });

    expect(exportCsv(model)).toContain('Total Stars,165790');
  });

  it('escapes values that contain commas', () => {
    const model = makeDashboardModel({ analysis: makeAnalysis({ username: 'a,b' }) });

    expect(exportCsv(model)).toContain('Username,"a,b"');
  });

  it('is deterministic', () => {
    const model = makeDashboardModel();
    expect(exportCsv(model)).toBe(exportCsv(model));
  });
});
