import { getRepositories, getRepository, getUser } from '../api/endpoints.js';
import { requestJson } from '../api/githubClient.js';

/**
 * @typedef {import('../types/github.js').GitHubUser} GitHubUser
 * @typedef {import('../types/github.js').Repository} Repository
 * @typedef {import('../types/github.js').RepositoryOwner} RepositoryOwner
 */

/**
 * @param {Record<string, any>} raw
 * @returns {RepositoryOwner}
 */
function normalizeOwner(raw) {
  return {
    login: raw.login,
    id: raw.id,
    type: raw.type,
    avatarUrl: raw.avatar_url,
    htmlUrl: raw.html_url,
  };
}

/**
 * @param {Record<string, any>} raw
 * @returns {GitHubUser}
 */
function normalizeUser(raw) {
  return {
    login: raw.login,
    id: raw.id,
    name: raw.name,
    avatarUrl: raw.avatar_url,
    htmlUrl: raw.html_url,
    bio: raw.bio,
    company: raw.company,
    location: raw.location,
    blog: raw.blog,
    followers: raw.followers,
    following: raw.following,
    publicRepos: raw.public_repos,
    publicGists: raw.public_gists,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
  };
}

/**
 * @param {Record<string, any>} raw
 * @returns {Repository}
 */
function normalizeRepository(raw) {
  return {
    id: raw.id,
    name: raw.name,
    fullName: raw.full_name,
    description: raw.description,
    htmlUrl: raw.html_url,
    homepage: raw.homepage,
    language: raw.language,
    topics: raw.topics ?? [],
    license: raw.license ? raw.license.spdx_id : null,
    stargazersCount: raw.stargazers_count,
    forksCount: raw.forks_count,
    watchersCount: raw.watchers_count,
    openIssuesCount: raw.open_issues_count,
    size: raw.size,
    fork: raw.fork,
    archived: raw.archived,
    defaultBranch: raw.default_branch,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
    pushedAt: raw.pushed_at,
    owner: normalizeOwner(raw.owner),
  };
}

/**
 * Fetch and normalize a user's public profile.
 * @param {string} username
 * @returns {Promise<GitHubUser>}
 */
export async function fetchUser(username) {
  return normalizeUser(await requestJson(getUser(username)));
}

/**
 * Fetch and normalize a user's public repositories.
 * @param {string} username
 * @returns {Promise<Repository[]>}
 */
export async function fetchRepositories(username) {
  const repositories = await requestJson(getRepositories(username));
  return repositories.map(normalizeRepository);
}

/**
 * Fetch and normalize a single repository.
 * @param {string} owner
 * @param {string} repo
 * @returns {Promise<Repository>}
 */
export async function fetchRepository(owner, repo) {
  return normalizeRepository(await requestJson(getRepository(owner, repo)));
}
