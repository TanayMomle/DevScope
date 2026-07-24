import { AlertCircle } from 'lucide-react';
import { GitHubErrorType } from '../api/errors.js';

const MESSAGES = {
  [GitHubErrorType.NOT_FOUND]: 'We could not find a GitHub user with that username.',
  [GitHubErrorType.RATE_LIMIT]:
    'GitHub’s rate limit has been reached. Please wait a little while and try again.',
  [GitHubErrorType.NETWORK]: 'We could not reach GitHub. Check your connection and try again.',
  [GitHubErrorType.TIMEOUT]: 'The request to GitHub timed out. Please try again.',
  [GitHubErrorType.INVALID_JSON]: 'GitHub returned an unexpected response. Please try again.',
  [GitHubErrorType.UNKNOWN]: 'Something went wrong while contacting GitHub. Please try again.',
};

export default function ErrorState({ error }) {
  const message = MESSAGES[error?.type] ?? MESSAGES[GitHubErrorType.UNKNOWN];

  return (
    <div
      role="alert"
      className="flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
    >
      <AlertCircle className="h-5 w-5 shrink-0 text-red-400" aria-hidden="true" />
      <p>{message}</p>
    </div>
  );
}
