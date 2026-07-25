import { Building2, Calendar, Link as LinkIcon, MapPin } from 'lucide-react';

const joinedFormatter = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long' });

function ensureProtocol(url) {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

export default function ProfileCard({ user }) {
  const joined = joinedFormatter.format(new Date(user.createdAt));

  return (
    <article className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
      <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
        <img
          src={user.avatarUrl}
          alt={`${user.login} avatar`}
          width="96"
          height="96"
          loading="lazy"
          className="h-24 w-24 rounded-full ring-1 ring-white/10"
        />

        <div className="flex flex-col items-center gap-1 sm:items-start">
          <h2 className="text-xl font-semibold text-white">{user.name || user.login}</h2>
          <a
            href={user.htmlUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded text-brand-400 hover:text-brand-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            @{user.login}
          </a>
          {user.bio && (
            <p className="mt-2 max-w-prose text-center text-slate-300 sm:text-left">{user.bio}</p>
          )}
        </div>
      </div>

      <dl className="mt-6 grid grid-cols-3 gap-4 border-y border-white/10 py-4 text-center">
        <div>
          <dt className="text-xs uppercase tracking-wide text-slate-400">Followers</dt>
          <dd className="text-lg font-semibold text-white">{user.followers}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-slate-400">Following</dt>
          <dd className="text-lg font-semibold text-white">{user.following}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-slate-400">Repositories</dt>
          <dd className="text-lg font-semibold text-white">{user.publicRepos}</dd>
        </div>
      </dl>

      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-300">
        {user.company && (
          <li className="flex items-center gap-1.5">
            <Building2 className="h-4 w-4 text-slate-400" aria-hidden="true" />
            {user.company}
          </li>
        )}
        {user.location && (
          <li className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-slate-400" aria-hidden="true" />
            {user.location}
          </li>
        )}
        {user.blog && (
          <li className="flex items-center gap-1.5">
            <LinkIcon className="h-4 w-4 text-slate-400" aria-hidden="true" />
            <a
              href={ensureProtocol(user.blog)}
              target="_blank"
              rel="noreferrer"
              className="hover:text-brand-300"
            >
              {user.blog}
            </a>
          </li>
        )}
        <li className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4 text-slate-400" aria-hidden="true" />
          Joined {joined}
        </li>
      </ul>
    </article>
  );
}
