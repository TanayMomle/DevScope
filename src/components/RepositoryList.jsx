import { GitFork, Star } from 'lucide-react';

const updatedFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

function RepositoryCard({ repository }) {
  return (
    <article className="flex h-full flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-5">
      <h3 className="font-semibold text-white">
        <a
          href={repository.htmlUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded hover:text-brand-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          {repository.name}
        </a>
      </h3>

      {repository.description && <p className="text-sm text-slate-400">{repository.description}</p>}

      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
        {repository.language && <span className="text-slate-300">{repository.language}</span>}
        <span className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5" aria-hidden="true" />
          {repository.stargazersCount}
        </span>
        <span className="flex items-center gap-1">
          <GitFork className="h-3.5 w-3.5" aria-hidden="true" />
          {repository.forksCount}
        </span>
        <span>Updated {updatedFormatter.format(new Date(repository.updatedAt))}</span>
      </div>
    </article>
  );
}

export default function RepositoryList({ repositories }) {
  if (repositories.length === 0) {
    return <p className="text-slate-400">This user has no public repositories.</p>;
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {repositories.map((repository) => (
        <li key={repository.id}>
          <RepositoryCard repository={repository} />
        </li>
      ))}
    </ul>
  );
}
