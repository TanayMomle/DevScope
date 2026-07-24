import { Loader2 } from 'lucide-react';

export default function LoadingState({ label }) {
  return (
    <div role="status" className="flex items-center justify-center gap-3 text-slate-300">
      <Loader2 className="h-5 w-5 animate-spin text-brand-400" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
