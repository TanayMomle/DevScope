import { exportJson } from './jsonExport.js';
import { exportCsv } from './csvExport.js';
import { exportHtml } from './htmlExport.js';

const EXPORTERS = {
  json: { mimeType: 'application/json', build: exportJson },
  csv: { mimeType: 'text/csv', build: exportCsv },
  html: { mimeType: 'text/html', build: exportHtml },
};

/**
 * Produce a downloadable/printable artifact for the given format from the
 * dashboard model. Deterministic; performs no I/O.
 *
 * @param {import('../../types/dashboard.js').DashboardModel} model
 * @param {'json' | 'csv' | 'html'} format
 * @returns {{ filename: string, mimeType: string, content: string }}
 */
export function composeExport(model, format) {
  const exporter = EXPORTERS[format];

  return {
    filename: `devscope-${model.analysis.username}.${format}`,
    mimeType: exporter.mimeType,
    content: exporter.build(model),
  };
}
