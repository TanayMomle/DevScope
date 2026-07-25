import { Download, Printer } from 'lucide-react';
import { composeExport } from '../services/export/composeExport.js';

const buttonClass =
  'inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-200 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface';

function downloadFile({ filename, mimeType, content }) {
  const url = URL.createObjectURL(new Blob([content], { type: mimeType }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function printReport(content) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;
  printWindow.document.write(content);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}

/**
 * @param {{ model: import('../types/dashboard.js').DashboardModel }} props
 */
export default function ExportMenu({ model }) {
  return (
    <div role="group" aria-label="Export" className="flex flex-wrap items-center gap-2">
      <span className="text-xs uppercase tracking-wide text-slate-500">Export</span>
      <button type="button" className={buttonClass} onClick={() => downloadFile(composeExport(model, 'json'))}>
        <Download className="h-4 w-4" aria-hidden="true" />
        JSON
      </button>
      <button type="button" className={buttonClass} onClick={() => downloadFile(composeExport(model, 'csv'))}>
        <Download className="h-4 w-4" aria-hidden="true" />
        CSV
      </button>
      <button type="button" className={buttonClass} onClick={() => printReport(composeExport(model, 'html').content)}>
        <Printer className="h-4 w-4" aria-hidden="true" />
        Print
      </button>
    </div>
  );
}
