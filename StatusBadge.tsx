// web/src/components/StatusBadge.tsx
type StatusBadgeProps = {
  status: 'active' | 'ending' | 'settled';
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const map = {
    active: {
      label: 'Active',
      className:
        'bg-emerald-400/10 border-emerald-400/40 text-emerald-300',
    },
    ending: {
      label: 'Ending Soon',
      className: 'bg-amber-400/10 border-amber-400/40 text-amber-300',
    },
    settled: {
      label: 'Settled',
      className: 'bg-slate-600/20 border-slate-500/60 text-slate-300',
    },
  }[status];

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] border ${map.className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {map.label}
    </span>
  );
}