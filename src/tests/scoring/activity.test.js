import { describe, expect, it } from 'vitest';
import { scoreActivity } from '../../services/scoring/activity.js';

const NOW = new Date('2026-01-01T00:00:00Z');
const ids = (result) => result.deductions.map((deduction) => deduction.id);

describe('scoreActivity', () => {
  it('penalizes a portfolio that has never been pushed to', () => {
    expect(ids(scoreActivity({ activity: { lastActivityAt: null } }, NOW))).toContain('NO_ACTIVITY');
  });

  it('does not penalize recent activity', () => {
    expect(
      scoreActivity({ activity: { lastActivityAt: '2025-12-01T00:00:00Z' } }, NOW).deductions,
    ).toEqual([]);
  });

  it('penalizes stale activity just past the threshold boundary', () => {
    // Exactly 365 days is still within the window.
    expect(
      ids(scoreActivity({ activity: { lastActivityAt: '2025-01-01T00:00:00Z' } }, NOW)),
    ).not.toContain('STALE_ACTIVITY');
    // 366 days is stale.
    expect(
      ids(scoreActivity({ activity: { lastActivityAt: '2024-12-31T00:00:00Z' } }, NOW)),
    ).toContain('STALE_ACTIVITY');
  });
});
