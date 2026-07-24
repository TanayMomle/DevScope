import { useState } from 'react';
import { motion } from 'framer-motion';
import { Telescope } from 'lucide-react';
import ProfileSearch from './components/ProfileSearch.jsx';
import ProfileCard from './components/ProfileCard.jsx';
import RepositorySection from './components/RepositorySection.jsx';
import ErrorState from './components/ErrorState.jsx';
import LoadingState from './components/LoadingState.jsx';
import { useGitHubProfile } from './hooks/useGitHubProfile.js';
import { APP_NAME, APP_TAGLINE } from './config/app.js';

export default function App() {
  const [username, setUsername] = useState('');
  const { profile, repositories } = useGitHubProfile(username);

  return (
    <main className="min-h-dvh px-4 py-12 sm:py-16">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-10">
        <header className="flex flex-col items-center gap-3 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600/10 text-brand-400 ring-1 ring-brand-500/30">
            <Telescope className="h-6 w-6" aria-hidden="true" />
          </span>
          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{APP_NAME}</h1>
          <p className="text-slate-400">{APP_TAGLINE}</p>
        </header>

        <ProfileSearch onSubmit={setUsername} loading={profile.status === 'loading'} />

        {profile.status === 'loading' && <LoadingState label="Analyzing profile…" />}

        {profile.status === 'error' && <ErrorState error={profile.error} />}

        {profile.status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="flex flex-col gap-8"
          >
            <ProfileCard user={profile.data} />
            <RepositorySection
              status={repositories.status}
              error={repositories.error}
              repositories={repositories.data ?? []}
            />
          </motion.div>
        )}
      </div>
    </main>
  );
}
