const PRIORITY_STYLES = {
  High: 'bg-red-500/15 text-red-300 ring-red-500/30',
  Medium: 'bg-amber-500/15 text-amber-300 ring-amber-500/30',
  Low: 'bg-slate-500/15 text-slate-300 ring-slate-500/30',
};

/**
 * @param {{ recommendation: import('../types/recommendations.js').Recommendation }} props
 */
export default function RecommendationCard({ recommendation }) {
  return (
    <article className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-medium text-white">{recommendation.title}</h3>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ${PRIORITY_STYLES[recommendation.priority]}`}
        >
          {recommendation.priority}
        </span>
      </div>

      <p className="text-xs uppercase tracking-wide text-slate-400">
        {recommendation.category} · +{recommendation.improvementEstimate} pts
      </p>

      <p className="text-sm text-slate-300">{recommendation.description}</p>
      <p className="text-xs text-slate-400">{recommendation.evidence}</p>

      <ul className="flex list-disc flex-col gap-1 pl-5 text-sm text-slate-300">
        {recommendation.actionItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}
