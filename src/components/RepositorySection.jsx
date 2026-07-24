import ErrorState from './ErrorState.jsx';
import LoadingState from './LoadingState.jsx';
import RepositoryList from './RepositoryList.jsx';

/**
 * The repositories area, with its own loading and error states so it can fail
 * independently of the profile (partial success).
 */
export default function RepositorySection({ status, error, repositories }) {
  return (
    <section aria-labelledby="repositories-heading" className="flex flex-col gap-4">
      <h2 id="repositories-heading" className="text-lg font-semibold text-white">
        Repositories
      </h2>

      {status === 'loading' && <LoadingState label="Loading repositories…" />}
      {status === 'error' && <ErrorState error={error} />}
      {status === 'success' && <RepositoryList repositories={repositories} />}
    </section>
  );
}
