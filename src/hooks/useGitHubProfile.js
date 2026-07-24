import { useQuery } from '@tanstack/react-query';
import { fetchRepositories, fetchUser } from '../services/githubService.js';

/**
 * Reduce a React Query result to the small, framework-agnostic shape the UI
 * consumes, keeping React Query details out of the components.
 *
 * @param {import('@tanstack/react-query').UseQueryResult} query
 * @param {boolean} enabled
 * @returns {{ status: 'idle' | 'loading' | 'success' | 'error', data: unknown, error: Error | null }}
 */
function toQueryState(query, enabled) {
  if (!enabled) {
    return { status: 'idle', data: null, error: null };
  }
  if (query.isError) {
    return { status: 'error', data: null, error: query.error };
  }
  if (query.isSuccess) {
    return { status: 'success', data: query.data, error: null };
  }
  return { status: 'loading', data: null, error: null };
}

/**
 * Look up a GitHub profile and its repositories as two independent queries, so
 * the profile can succeed even if the repository collection fails.
 *
 * @param {string} username
 */
export function useGitHubProfile(username) {
  const enabled = Boolean(username);

  const profileQuery = useQuery({
    queryKey: ['github', 'profile', username],
    queryFn: ({ signal }) => fetchUser(username, { signal }),
    enabled,
  });

  const repositoriesQuery = useQuery({
    queryKey: ['github', 'repositories', username],
    queryFn: ({ signal }) => fetchRepositories(username, { signal }),
    enabled,
  });

  return {
    profile: toQueryState(profileQuery, enabled),
    repositories: toQueryState(repositoriesQuery, enabled),
  };
}
