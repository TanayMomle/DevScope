import { describe, expect, it } from 'vitest';
import { getRepositories, getRepository, getUser } from '../api/endpoints.js';

describe('endpoints', () => {
  it('builds the user URL', () => {
    expect(getUser('octocat')).toBe('https://api.github.com/users/octocat');
  });

  it('builds a paginated repositories URL', () => {
    expect(getRepositories('octocat')).toBe(
      'https://api.github.com/users/octocat/repos?per_page=100&page=1',
    );
    expect(getRepositories('octocat', { page: 3, perPage: 50 })).toBe(
      'https://api.github.com/users/octocat/repos?per_page=50&page=3',
    );
  });

  it('builds the single repository URL', () => {
    expect(getRepository('octocat', 'Hello-World')).toBe(
      'https://api.github.com/repos/octocat/Hello-World',
    );
  });

  it('encodes path segments', () => {
    expect(getUser('a b')).toBe('https://api.github.com/users/a%20b');
    expect(getRepository('own er', 're/po')).toBe('https://api.github.com/repos/own%20er/re%2Fpo');
  });
});
