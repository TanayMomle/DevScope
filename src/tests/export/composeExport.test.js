import { describe, expect, it } from 'vitest';
import { composeExport } from '../../services/export/composeExport.js';
import { makeAnalysis, makeDashboardModel } from '../fixtures.js';

const model = makeDashboardModel({ analysis: makeAnalysis({ username: 'octocat' }) });

describe('composeExport', () => {
  it('routes JSON with the right filename and mime type', () => {
    const result = composeExport(model, 'json');
    expect(result).toMatchObject({ filename: 'devscope-octocat.json', mimeType: 'application/json' });
    expect(() => JSON.parse(result.content)).not.toThrow();
  });

  it('routes CSV', () => {
    const result = composeExport(model, 'csv');
    expect(result).toMatchObject({ filename: 'devscope-octocat.csv', mimeType: 'text/csv' });
    expect(result.content).toContain('Metric,Value');
  });

  it('routes HTML', () => {
    const result = composeExport(model, 'html');
    expect(result).toMatchObject({ filename: 'devscope-octocat.html', mimeType: 'text/html' });
    expect(result.content).toContain('<!doctype html>');
  });

  it('is deterministic across formats', () => {
    for (const format of ['json', 'csv', 'html']) {
      expect(composeExport(model, format).content).toBe(composeExport(model, format).content);
    }
  });
});
