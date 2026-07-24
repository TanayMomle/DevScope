import { useCallback, useState } from 'react';
import { fetchRepositories, fetchUser } from '../services/githubService.js';

/**
 * Drive a single GitHub profile lookup: take a username, fetch the profile and
 * repositories through the service layer, and expose the resulting state.
 *
 * @returns {{
 *   status: 'idle' | 'loading' | 'success' | 'error',
 *   profile: import('../types/github.js').GitHubUser | null,
 *   repositories: import('../types/github.js').Repository[],
 *   error: Error | null,
 *   analyze: (username: string) => Promise<void>,
 * }}
 */
export function useGitHubProfile() {
  const [status, setStatus] = useState('idle');
  const [profile, setProfile] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [error, setError] = useState(null);

  const analyze = useCallback(async (username) => {
    setStatus('loading');
    setError(null);

    try {
      const [user, repos] = await Promise.all([fetchUser(username), fetchRepositories(username)]);
      setProfile(user);
      setRepositories(repos);
      setStatus('success');
    } catch (requestError) {
      setProfile(null);
      setRepositories([]);
      setError(requestError);
      setStatus('error');
    }
  }, []);

  return { status, profile, repositories, error, analyze };
}
