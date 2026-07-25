import { Suspense, lazy } from 'react';
import { formatNumber } from '../utils/format.js';
import ScoreCard from './ScoreCard.jsx';
import CategoryCard from './CategoryCard.jsx';
import SummaryCard from './SummaryCard.jsx';
import RepositoryHighlights from './RepositoryHighlights.jsx';
import RecommendationCard from './RecommendationCard.jsx';
import ExportMenu from './ExportMenu.jsx';
import LoadingState from './LoadingState.jsx';

// Recharts is heavy; load the chart section only when a dashboard is shown.
const DashboardCharts = lazy(() => import('./charts/DashboardCharts.jsx'));

/**
 * The dashboard: a thin presentation of the analysis and score. It arranges
 * pre-computed values into cards and never calculates metrics itself.
 *
 * @param {{ model: import('../types/dashboard.js').DashboardModel }} props
 */
export default function Dashboard({ model }) {
  const { analysis, score, topDeductions, recommendations } = model;

  const categories = [
    score.repositoryScore,
    score.activityScore,
    score.languageScore,
    score.qualityScore,
    score.maintainabilityScore,
  ];
  const overallMax = categories.reduce((sum, category) => sum + category.max, 0);

  const repositoryItems = [
    { label: 'Total', value: analysis.counts.total },
    { label: 'Original', value: analysis.counts.original },
    { label: 'Forked', value: analysis.counts.forked },
    { label: 'Archived', value: analysis.counts.archived },
    { label: 'Public', value: analysis.counts.visibility.public },
  ];

  const statisticsItems = [
    { label: 'Stars', value: formatNumber(analysis.stars.total) },
    { label: 'Forks', value: formatNumber(analysis.forks.total) },
    { label: 'Watchers', value: formatNumber(analysis.watchers) },
    { label: 'Open issues', value: formatNumber(analysis.openIssues) },
    { label: 'Total size (KB)', value: formatNumber(analysis.sizes.total) },
    { label: 'Average size (KB)', value: formatNumber(analysis.sizes.average) },
    { label: 'Average age (days)', value: formatNumber(analysis.age.averageAgeDays) },
  ];

  const languageItems = analysis.languages.top.map((entry) => ({
    label: entry.name,
    value: entry.count,
  }));
  const topicItems = analysis.topics.top.map((entry) => ({ label: entry.name, value: entry.count }));
  const licenseItems = [
    ...Object.entries(analysis.licenses.frequency).map(([name, count]) => ({ label: name, value: count })),
    { label: 'Unlicensed', value: analysis.licenses.unlicensed },
  ];
  const deductionItems = topDeductions.map((deduction) => ({
    label: deduction.description,
    value: `-${deduction.penalty}`,
  }));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end">
        <ExportMenu model={model} />
      </div>

      <ScoreCard score={score.overallScore} max={overallMax} />

      <section aria-labelledby="breakdown-heading" className="flex flex-col gap-4">
        <h2
          id="breakdown-heading"
          className="text-sm font-medium uppercase tracking-wide text-slate-400"
        >
          Score Breakdown
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.label} breakdown={category} />
          ))}
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <SummaryCard title="Repository Summary" items={repositoryItems} />
        <SummaryCard title="Repository Statistics" items={statisticsItems} />
        <SummaryCard title="Languages" items={languageItems} />
        <SummaryCard title="Topics" items={topicItems} />
        <SummaryCard title="Licenses" items={licenseItems} />
        <SummaryCard title="Top Deductions" items={deductionItems} />
      </div>

      <RepositoryHighlights analysis={analysis} />

      <Suspense fallback={<LoadingState label="Loading charts…" />}>
        <DashboardCharts analysis={analysis} />
      </Suspense>

      <section aria-labelledby="recommendations-heading" className="flex flex-col gap-4">
        <h2
          id="recommendations-heading"
          className="text-sm font-medium uppercase tracking-wide text-slate-400"
        >
          Recommendations
        </h2>
        {recommendations.length === 0 ? (
          <p className="text-sm text-slate-400">
            No recommendations — your portfolio is in great shape.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {recommendations.map((recommendation) => (
              <RecommendationCard key={recommendation.id} recommendation={recommendation} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
