import { describe, expect, it } from 'vitest';
import { calculateActivity, calculateRepositoryAge } from '../../services/analysis/age.js';
import { makeRepository } from '../fixtures.js';

const NOW = new Date('2026-01-01T00:00:00Z');

describe('calculateRepositoryAge', () => {
  it('handles no repositories', () => {
    expect(calculateRepositoryAge([], NOW)).toEqual({
      oldest: null,
      newest: null,
      averageAgeDays: 0,
    });
  });

  it('finds the oldest and newest repositories and the average age', () => {
    const repositories = [
      makeRepository({ id: 1, name: 'old', createdAt: '2020-01-01T00:00:00Z' }),
      makeRepository({ id: 2, name: 'new', createdAt: '2024-01-01T00:00:00Z' }),
    ];
    const result = calculateRepositoryAge(repositories, NOW);

    expect(result.oldest.name).toBe('old');
    expect(result.newest.name).toBe('new');
    // (2192 days + 731 days) / 2, rounded.
    expect(result.averageAgeDays).toBe(1462);
  });
});

describe('calculateActivity', () => {
  it('reports no activity when nothing has been pushed', () => {
    const repositories = [makeRepository({ id: 1, pushedAt: null })];

    expect(calculateActivity(repositories)).toEqual({ lastActivityAt: null, repository: null });
  });

  it('finds the most recently pushed repository', () => {
    const repositories = [
      makeRepository({ id: 1, name: 'stale', pushedAt: '2021-06-01T00:00:00Z' }),
      makeRepository({ id: 2, name: 'fresh', pushedAt: '2025-06-01T00:00:00Z' }),
      makeRepository({ id: 3, name: 'never', pushedAt: null }),
    ];
    const result = calculateActivity(repositories);

    expect(result.lastActivityAt).toBe('2025-06-01T00:00:00Z');
    expect(result.repository.name).toBe('fresh');
  });
});
