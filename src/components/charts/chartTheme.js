import { surface } from '../../theme/tokens.js';
import { formatNumber } from '../../utils/format.js';

/** Categorical palette for chart series, tuned for the dark theme. */
export const CHART_COLORS = [
  '#3b82f6',
  '#22d3ee',
  '#a78bfa',
  '#f472b6',
  '#f59e0b',
  '#34d399',
  '#fb7185',
  '#facc15',
];

export const AXIS_COLOR = '#64748b';
export const GRID_COLOR = 'rgba(255, 255, 255, 0.08)';

/** Shared dark-theme styling and value formatting for chart tooltips. */
export const tooltipProps = {
  contentStyle: {
    background: surface,
    border: '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: '0.5rem',
  },
  itemStyle: { color: '#e2e8f0' },
  labelStyle: { color: '#94a3b8', marginBottom: '0.25rem' },
  formatter: (value) => formatNumber(value),
};
