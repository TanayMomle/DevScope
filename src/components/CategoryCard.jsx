export default function CategoryCard({ breakdown }) {
  const percent = Math.round((breakdown.value / breakdown.max) * 100);

  return (
    <article className="rounded-xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-medium text-white">{breakdown.label}</h3>
        <span className="text-sm text-slate-400">
          {breakdown.value}/{breakdown.max}
        </span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={breakdown.value}
        aria-valuemin={0}
        aria-valuemax={breakdown.max}
        aria-label={breakdown.label}
        className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10"
      >
        <div className="h-full rounded-full bg-brand-500" style={{ width: `${percent}%` }} />
      </div>
    </article>
  );
}
