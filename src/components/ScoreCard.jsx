export default function ScoreCard({ score, max }) {
  const percent = Math.round((score / max) * 100);

  return (
    <section
      aria-labelledby="score-heading"
      className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8"
    >
      <h2 id="score-heading" className="text-sm font-medium uppercase tracking-wide text-slate-400">
        Portfolio Score
      </h2>
      <p className="mt-2 flex items-baseline gap-2">
        <span className="text-5xl font-semibold text-white">{score}</span>
        <span className="text-lg text-slate-400">/ {max}</span>
      </p>
      <div
        role="progressbar"
        aria-valuenow={score}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label="Overall portfolio score"
        className="mt-4 h-2 overflow-hidden rounded-full bg-white/10"
      >
        <div className="h-full rounded-full bg-brand-500" style={{ width: `${percent}%` }} />
      </div>
    </section>
  );
}
