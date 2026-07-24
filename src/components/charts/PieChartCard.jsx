import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import ChartCard from './ChartCard.jsx';
import { CHART_COLORS, tooltipProps } from './chartTheme.js';

/**
 * @param {{ title: string, description: string, data: { name: string, value: number }[] }} props
 */
export default function PieChartCard({ title, description, data }) {
  return (
    <ChartCard title={title} description={description} isEmpty={data.length === 0}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="45%"
            outerRadius="80%"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={CHART_COLORS[index % CHART_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip {...tooltipProps} />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
