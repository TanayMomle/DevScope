import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchRepositories, fetchUser } from '../services/githubService.js';

const jsonResponse = (body) =>
  new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });

afterEach(() => {
  vi.unstubAllGlobals();
});

const rawUser = {
  login: 'octocat',
  id: 1,
  node_id: 'MDQ6VXNlcjE=',
  name: 'The Octocat',
  avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
  html_url: 'https://github.com/octocat',
  bio: null,
  company: '@github',
  location: 'San Francisco',
  blog: 'https://github.blog',
  followers: 100,
  following: 5,
  public_repos: 8,
  public_gists: 2,
  created_at: '2011-01-25T18:44:36Z',
  updated_at: '2024-05-01T00:00:00Z',
};

const rawRepo = {
  id: 1296269,
  name: 'Hello-World',
  full_name: 'octocat/Hello-World',
  description: 'My first repository on GitHub!',
  html_url: 'https://github.com/octocat/Hello-World',
  homepage: 'https://example.com',
  language: 'JavaScript',
  topics: ['octocat', 'demo'],
  license: { key: 'mit', name: 'MIT License', spdx_id: 'MIT' },
  stargazers_count: 80,
  forks_count: 9,
  watchers_count: 80,
  open_issues_count: 3,
  size: 108,
  fork: false,
  archived: false,
  visibility: 'public',
  default_branch: 'main',
  created_at: '2011-01-26T19:01:12Z',
  updated_at: '2024-05-01T00:00:00Z',
  pushed_at: '2024-04-30T00:00:00Z',
  owner: {
    login: 'octocat',
    id: 1,
    type: 'User',
    avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
    html_url: 'https://github.com/octocat',
  },
};

describe('fetchUser', () => {
  it('maps the raw user payload to a normalized user', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => jsonResponse(rawUser)));

    await expect(fetchUser('octocat')).resolves.toEqual({
      login: 'octocat',
      id: 1,
      name: 'The Octocat',
      avatarUrl: 'https://avatars.githubusercontent.com/u/1?v=4',
      htmlUrl: 'https://github.com/octocat',
      bio: null,
      company: '@github',
      location: 'San Francisco',
      blog: 'https://github.blog',
      followers: 100,
      following: 5,
      publicRepos: 8,
      publicGists: 2,
      createdAt: '2011-01-25T18:44:36Z',
      updatedAt: '2024-05-01T00:00:00Z',
    });
  });
});

describe('fetchRepositories', () => {
  it('normalizes a single page of repositories', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => jsonResponse([rawRepo])));

    const repositories = await fetchRepositories('octocat');

    expect(repositories).toHaveLength(1);
    expect(repositories[0]).toEqual({
      id: 1296269,
      name: 'Hello-World',
      fullName: 'octocat/Hello-World',
      description: 'My first repository on GitHub!',
      htmlUrl: 'https://github.com/octocat/Hello-World',
      homepage: 'https://example.com',
      language: 'JavaScript',
      topics: ['octocat', 'demo'],
      license: 'MIT',
      stargazersCount: 80,
      forksCount: 9,
      watchersCount: 80,
      openIssuesCount: 3,
      size: 108,
      fork: false,
      archived: false,
      visibility: 'public',
      defaultBranch: 'main',
      createdAt: '2011-01-26T19:01:12Z',
      updatedAt: '2024-05-01T00:00:00Z',
      pushedAt: '2024-04-30T00:00:00Z',
      owner: {
        login: 'octocat',
        id: 1,
        type: 'User',
        avatarUrl: 'https://avatars.githubusercontent.com/u/1?v=4',
        htmlUrl: 'https://github.com/octocat',
      },
    });
  });

  it('collects every page in order until a short page is returned', async () => {
    const firstPage = Array.from({ length: 100 }, (_, index) => ({
      ...rawRepo,
      id: index + 1,
      name: `repo-${index + 1}`,
    }));
    const secondPage = [{ ...rawRepo, id: 101, name: 'repo-101' }];
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse(firstPage))
      .mockResolvedValueOnce(jsonResponse(secondPage));
    vi.stubGlobal('fetch', fetchMock);

    const repositories = await fetchRepositories('octocat');

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[0][0]).toContain('page=1');
    expect(fetchMock.mock.calls[1][0]).toContain('page=2');
    expect(repositories).toHaveLength(101);
    expect(repositories[0].name).toBe('repo-1');
    expect(repositories[100].name).toBe('repo-101');
  });

  it('returns an empty list when the first page is empty', async () => {
    const fetchMock = vi.fn(async () => jsonResponse([]));
    vi.stubGlobal('fetch', fetchMock);

    await expect(fetchRepositories('octocat')).resolves.toEqual([]);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('defaults missing topics and license to safe values', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => jsonResponse([{ ...rawRepo, topics: undefined, license: null }])),
    );

    const [repository] = await fetchRepositories('octocat');

    expect(repository.topics).toEqual([]);
    expect(repository.license).toBeNull();
  });
});
