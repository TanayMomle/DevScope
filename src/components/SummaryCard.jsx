export default function SummaryCard({ title, items }) {
  return (
    <article className="rounded-xl border border-white/10 bg-white/5 p-5">
      <h2 className="text-sm font-medium uppercase tracking-wide text-slate-400">{title}</h2>
      {items.length === 0 ? (
        <p className="mt-3 text-sm text-slate-400">None</p>
      ) : (
        <dl className="mt-3 flex flex-col gap-2">
          {items.map((item) => (
            <div key={item.label} className="flex items-center justify-between gap-4 text-sm">
              <dt className="text-slate-400">{item.label}</dt>
              <dd className="font-medium text-white">{item.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </article>
  );
}
