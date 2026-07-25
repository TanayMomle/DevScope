// Lightweight Recharts stand-ins for jsdom tests. Real charts are verified in
// the browser; here we only need the surrounding structure to render, without
// SVG sizing (ResizeObserver) or axis labels that collide with card text.

const Passthrough = ({ children }) => <div>{children}</div>;
// Chart roots render an <svg> so SVG children (defs, linearGradient, stop) are
// valid elements rather than unknown tags in a div context.
const SvgChart = ({ children }) => <svg>{children}</svg>;
const Empty = () => null;

export const ResponsiveContainer = Passthrough;
export const PieChart = SvgChart;
export const BarChart = SvgChart;
export const AreaChart = SvgChart;
export const Pie = Empty;
export const Bar = Empty;
export const Area = Empty;
export const Cell = Empty;
export const XAxis = Empty;
export const YAxis = Empty;
export const CartesianGrid = Empty;
export const Tooltip = Empty;
