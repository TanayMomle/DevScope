import { describe, expect, it } from 'vitest';
import { toNotable } from '../../services/analysis/notable.js';
import { makeRepository } from '../fixtures.js';

describe('toNotable', () => {
  it('projects a repository to its identifying and metric fields', () => {
    const repository = makeRepository({
      id: 42,
      name: 'Hello-World',
      fullName: 'octocat/Hello-World',
      htmlUrl: 'https://github.com/octocat/Hello-World',
      stargazersCount: 9,
      forksCount: 4,
      size: 128,
      createdAt: '2019-01-01T00:00:00Z',
      pushedAt: '2024-01-01T00:00:00Z',
    });

    expect(toNotable(repository)).toEqual({
      id: 42,
      name: 'Hello-World',
      fullName: 'octocat/Hello-World',
      htmlUrl: 'https://github.com/octocat/Hello-World',
      stargazersCount: 9,
      forksCount: 4,
      size: 128,
      createdAt: '2019-01-01T00:00:00Z',
      pushedAt: '2024-01-01T00:00:00Z',
    });
  });
});
