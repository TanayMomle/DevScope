import { useState } from 'react';
import { Search } from 'lucide-react';
import { cn } from '../utils/cn.js';

export default function ProfileSearch({ onSubmit, loading }) {
  const [username, setUsername] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = username.trim();

    if (!trimmed) {
      setValidationError('Enter a GitHub username to continue.');
      return;
    }

    setValidationError('');
    onSubmit(trimmed);
  };

  return (
    <form role="search" onSubmit={handleSubmit} className="flex flex-col gap-2" noValidate>
      <label htmlFor="github-username" className="text-sm font-medium text-slate-300">
        GitHub username
      </label>

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="github-username"
          name="username"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="e.g. octocat"
          autoComplete="off"
          autoCapitalize="none"
          spellCheck="false"
          aria-invalid={validationError ? true : undefined}
          aria-describedby={validationError ? 'github-username-error' : undefined}
          className={cn(
            'w-full rounded-xl border bg-white/5 px-4 py-2.5 text-white placeholder:text-slate-400',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
            validationError ? 'border-red-500/60' : 'border-white/10',
          )}
        />

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 font-medium text-white transition hover:bg-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Search className="h-4 w-4" aria-hidden="true" />
          Analyze Profile
        </button>
      </div>

      {validationError && (
        <p id="github-username-error" role="alert" className="text-sm text-red-400">
          {validationError}
        </p>
      )}
    </form>
  );
}
