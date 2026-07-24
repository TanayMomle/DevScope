import { motion } from 'framer-motion';
import { Telescope } from 'lucide-react';
import { APP_NAME, APP_TAGLINE } from './config/app.js';
import { cn } from './utils/cn.js';

/**
 * Application shell. Feature surfaces (profile search, dashboard, reports)
 * are introduced in later phases; for now this renders the product identity.
 */
export default function App() {
  return (
    <main
      className={cn(
        'flex min-h-dvh flex-col items-center justify-center',
        'gap-6 px-6 text-center',
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex flex-col items-center gap-5"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-600/10 text-brand-400 ring-1 ring-brand-500/30">
          <Telescope className="h-8 w-8" aria-hidden="true" />
        </span>

        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {APP_NAME}
          </h1>
          <p className="max-w-md text-balance text-slate-400">{APP_TAGLINE}</p>
        </div>
      </motion.div>
    </main>
  );
}
