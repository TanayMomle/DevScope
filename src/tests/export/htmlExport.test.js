import { describe, expect, it } from 'vitest';
import { exportHtml } from '../../services/export/htmlExport.js';
import { makeAnalysis, makeDashboardModel, makeScore } from '../fixtures.js';

describe('exportHtml', () => {
  it('generates a self-contained HTML document with the report data', () => {
    const model = makeDashboardModel({
      analysis: makeAnalysis({ username: 'octocat' }),
      score: makeScore({ overallScore: 74 }),
      recommendations: [
        {
          id: 'NO_TOPICS',
          title: 'Add topics to repositories',
          description: 'None of your repositories declare topics.',
          priority: 'Medium',
          category: 'quality',
          evidence: 'None of your repositories declare topics.',
          improvementEstimate: 8,
          actionItems: ['Add descriptive topics.'],
        },
      ],
    });

    const html = exportHtml(model);

    expect(html.startsWith('<!doctype html>')).toBe(true);
    expect(html).toContain('DevScope Portfolio Report');
    expect(html).toContain('@octocat');
    expect(html).toContain('Add topics to repositories');
    expect(html).toContain('Recommendations');
  });

  it('escapes dynamic content', () => {
    const model = makeDashboardModel({ analysis: makeAnalysis({ username: '<script>' }) });

    const html = exportHtml(model);
    expect(html).toContain('&lt;script&gt;');
    expect(html).not.toContain('@<script>');
  });

  it('handles an empty portfolio without recommendations', () => {
    const model = makeDashboardModel({
      analysis: makeAnalysis({ languages: { distribution: {}, top: [] } }),
      recommendations: [],
    });

    const html = exportHtml(model);
    expect(html).toContain('great shape');
    expect(html.startsWith('<!doctype html>')).toBe(true);
  });

  it('is deterministic', () => {
    const model = makeDashboardModel();
    expect(exportHtml(model)).toBe(exportHtml(model));
  });
});
