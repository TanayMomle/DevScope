import PieChartCard from './PieChartCard.jsx';
import BarChartCard from './BarChartCard.jsx';
import AreaChartCard from './AreaChartCard.jsx';

/**
 * The visualization section. It reshapes already-computed analysis fields into
 * the { name, value } / { year, value } series the charts expect; it never
 * computes analytics.
 *
 * @param {{ analysis: import('../../types/analysis.js').AnalysisResult }} props
 */
export default function DashboardCharts({ analysis }) {
  const languageData = analysis.languages.top.map((entry) => ({
    name: entry.name,
    value: entry.count,
  }));
  const topicData = analysis.topics.top.map((entry) => ({ name: entry.name, value: entry.count }));
  const licenseData = [
    ...Object.entries(analysis.licenses.frequency).map(([name, value]) => ({ name, value })),
    ...(analysis.licenses.unlicensed > 0
      ? [{ name: 'Unlicensed', value: analysis.licenses.unlicensed }]
      : []),
  ];
  const engagementData =
    analysis.stars.total === 0 && analysis.forks.total === 0
      ? []
      : [
          { name: 'Stars', value: analysis.stars.total },
          { name: 'Forks', value: analysis.forks.total },
        ];
  const timelineData = analysis.timeline.map((entry) => ({ year: entry.year, value: entry.count }));

  return (
    <section aria-labelledby="charts-heading" className="flex flex-col gap-4">
      <h2
        id="charts-heading"
        className="text-sm font-medium uppercase tracking-wide text-slate-400"
      >
        Visualizations
      </h2>
      <div className="grid gap-4 lg:grid-cols-2">
        <PieChartCard
          title="Language Distribution"
          description="Repositories by primary language."
          data={languageData}
        />
        <AreaChartCard
          title="Repository Creation Timeline"
          description="Public repositories created per year."
          data={timelineData}
        />
        <BarChartCard
          title="Stars vs Forks"
          description="Total stars and forks across repositories."
          data={engagementData}
        />
        <BarChartCard
          title="Topic Frequency"
          description="How often each topic is used."
          data={topicData}
        />
        <PieChartCard
          title="License Distribution"
          description="Repositories by license."
          data={licenseData}
        />
      </div>
    </section>
  );
}
