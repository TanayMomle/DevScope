import { useId } from 'react';

/**
 * Shared frame for a chart: a titled, described card that renders either the
 * chart (inside an accessible region) or an elegant empty state.
 */
export default function ChartCard({ title, description, isEmpty, children }) {
  const titleId = useId();
  const descriptionId = useId();

  return (
    <section
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      className="rounded-xl border border-white/10 bg-white/5 p-5"
    >
      <h3 id={titleId} className="font-medium text-white">
        {title}
      </h3>
      <p id={descriptionId} className="mt-1 text-xs text-slate-400">
        {description}
      </p>

      {isEmpty ? (
        <p className="mt-8 text-sm text-slate-500">No data to display.</p>
      ) : (
        <div role="img" aria-label={`${title}. ${description}`} className="mt-4 h-56 w-full">
          {children}
        </div>
      )}
    </section>
  );
}
