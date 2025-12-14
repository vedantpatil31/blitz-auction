// web/src/components/Metrics.tsx
type MetricsProps = {
  bidsPerBlock: number;
  auctionsPerBlock: number;
  activeAgents: number;
  agentBids: number;
  manualBids: number;
};

export function Metrics({ bidsPerBlock, auctionsPerBlock, activeAgents, agentBids, manualBids }: MetricsProps) {
  return (
    <section
      id="metrics"
      className="rounded-2xl bg-slate-950/70 border border-slate-800 p-4 flex flex-col gap-3"
    >
      <p className="text-xs font-medium text-slate-200">Parallelism Metrics</p>
      <p className="text-[11px] text-slate-500">
        Approximate throughput from recent blocks on Monad Testnet
      </p>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-1">
        <MetricPill label="Bids / Block" value={bidsPerBlock.toString()} accent="cyan" />
        <MetricPill label="Auctions / Block" value={auctionsPerBlock.toString()} accent="violet" />
        <MetricPill label="Active Agents" value={activeAgents.toString()} accent="emerald" />
        <MetricPill label="Agent Bids" value={agentBids.toString()} accent="emerald" />
        <MetricPill label="Manual Bids" value={manualBids.toString()} accent="sky" />
      </div>
    </section>
  );
}

function MetricPill({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: 'cyan' | 'violet' | 'emerald';
}) {
  const colorMap = {
    cyan: 'from-cyan-400/80 to-sky-400/80',
    violet: 'from-violet-400/80 to-fuchsia-400/80',
    emerald: 'from-emerald-400/80 to-lime-400/80',
  };

  return (
    <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-3 flex flex-col gap-1">
      <span className="text-[10px] text-slate-400">{label}</span>
      <span className="text-lg font-semibold text-slate-50">{value}</span>
      <div className={`h-1 rounded-full bg-gradient-to-r ${colorMap[accent]}`} />
    </div>
  );
}