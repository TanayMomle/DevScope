import { formatDate, formatNumber } from '../utils/format.js';

export default function RepositoryHighlights({ analysis }) {
  const highlights = [
    analysis.stars.mostStarred && {
      key: 'most-starred',
      label: 'Most starred',
      repository: analysis.stars.mostStarred,
      detail: `${formatNumber(analysis.stars.mostStarred.stargazersCount)} stars`,
    },
    analysis.forks.mostForked && {
      key: 'most-forked',
      label: 'Most forked',
      repository: analysis.forks.mostForked,
      detail: `${formatNumber(analysis.forks.mostForked.forksCount)} forks`,
    },
    analysis.sizes.largest && {
      key: 'largest',
      label: 'Largest',
      repository: analysis.sizes.largest,
      detail: `${formatNumber(analysis.sizes.largest.size)} KB`,
    },
    analysis.age.newest && {
      key: 'newest',
      label: 'Newest',
      repository: analysis.age.newest,
      detail: `Created ${formatDate(analysis.age.newest.createdAt)}`,
    },
    analysis.age.oldest && {
      key: 'oldest',
      label: 'Oldest',
      repository: analysis.age.oldest,
      detail: `Created ${formatDate(analysis.age.oldest.createdAt)}`,
    },
    analysis.activity.repository && {
      key: 'active',
      label: 'Most recently active',
      repository: analysis.activity.repository,
      detail: `Pushed ${formatDate(analysis.activity.repository.pushedAt)}`,
    },
  ].filter(Boolean);

  return (
    <section
      aria-labelledby="highlights-heading"
      className="rounded-2xl border border-white/10 bg-white/5 p-6"
    >
      <h2
        id="highlights-heading"
        className="text-sm font-medium uppercase tracking-wide text-slate-400"
      >
        Notable Repositories
      </h2>
      {highlights.length === 0 ? (
        <p className="mt-3 text-sm text-slate-400">No repositories to highlight.</p>
      ) : (
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {highlights.map((highlight) => (
            <li key={highlight.key} className="flex flex-col rounded-lg bg-white/5 p-3">
              <span className="text-xs uppercase tracking-wide text-slate-400">
                {highlight.label}
              </span>
              <a
                href={highlight.repository.htmlUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-1 rounded font-medium text-white hover:text-brand-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                {highlight.repository.name}
              </a>
              <span className="text-xs text-slate-400">{highlight.detail}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
