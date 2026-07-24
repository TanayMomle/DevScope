// Lightweight Recharts stand-ins for jsdom tests. Real charts are verified in
// the browser; here we only need the surrounding structure to render, without
// SVG sizing (ResizeObserver) or axis labels that collide with card text.

const Passthrough = ({ children }) => <div>{children}</div>;
const Empty = () => null;

export const ResponsiveContainer = Passthrough;
export const PieChart = Passthrough;
export const BarChart = Passthrough;
export const AreaChart = Passthrough;
export const Pie = Empty;
export const Bar = Empty;
export const Area = Empty;
export const Cell = Empty;
export const XAxis = Empty;
export const YAxis = Empty;
export const CartesianGrid = Empty;
export const Tooltip = Empty;
