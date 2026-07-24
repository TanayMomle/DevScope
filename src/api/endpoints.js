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
 * Build the URL for a single page of a user's public repositories.
 * @param {string} username
 * @param {{ page?: number, perPage?: number }} [options]
 * @returns {string}
 */
export function getRepositories(username, { page = 1, perPage = 100 } = {}) {
  const query = new URLSearchParams({ per_page: String(perPage), page: String(page) });
  return `${API_BASE_URL}/users/${encodeURIComponent(username)}/repos?${query}`;
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
