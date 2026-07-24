const API_BASE_URL = 'https://api.github.com';

/**
 * Build the URL for a user's public profile.
 * @param {string} username
 * @returns {string}
 */
export function getUser(username) {
  return `${API_BASE_URL}/users/${encodeURIComponent(username)}`;
}

/**
 * Build the URL for a user's public repositories.
 * @param {string} username
 * @returns {string}
 */
export function getRepositories(username) {
  return `${API_BASE_URL}/users/${encodeURIComponent(username)}/repos`;
}

/**
 * Build the URL for a single repository.
 * @param {string} owner
 * @param {string} repo
 * @returns {string}
 */
export function getRepository(owner, repo) {
  return `${API_BASE_URL}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`;
}
