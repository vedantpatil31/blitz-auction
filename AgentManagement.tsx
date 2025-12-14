// web/src/components/AgentManagement.tsx
type AgentConfig = {
  id: number;
  name: string;
  type: 'auction' | 'global';
  auctionId?: number;
  maxBudget: string;
  usedBudget: string;
  increment: string;
  minDelta: string;
  lastActive: Date;
  performance: {
    wins: number;
    totalBids: number;
    roi: number;
  };
};

export function AgentManagement() {
  // Mock data - in real app, this would come from analytics API
  const agents: AgentConfig[] = [
    {
      id: 1,
      name: 'AggressiveBot-1',
      type: 'auction',
      auctionId: 1,
      maxBudget: '10.0',
      usedBudget: '7.45',
      increment: '0.05',
      minDelta: '0.02',
      lastActive: new Date(Date.now() - 30 * 60 * 1000), // 30 min ago
      performance: { wins: 12, totalBids: 45, roi: 23.4 },
    },
    {
      id: 2,
      name: 'ConservativeAI',
      type: 'global',
      maxBudget: '25.0',
      usedBudget: '12.3',
      increment: '0.02',
      minDelta: '0.01',
      lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      performance: { wins: 8, totalBids: 32, roi: 18.7 },
    },
    {
      id: 3,
      name: 'SniperPro',
      type: 'auction',
      auctionId: 2,
      maxBudget: '15.0',
      usedBudget: '8.9',
      increment: '0.10',
      minDelta: '0.05',
      lastActive: new Date(Date.now() - 15 * 60 * 1000), // 15 min ago
      performance: { wins: 6, totalBids: 28, roi: 15.2 },
    },
  ];

  const getPerformanceBadge = (roi: number) => {
    if (roi >= 20) return { label: 'Elite', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' };
    if (roi >= 15) return { label: 'Pro', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' };
    if (roi >= 10) return { label: 'Solid', color: 'bg-green-500/20 text-green-300 border-green-500/30' };
    return { label: 'Rookie', color: 'bg-slate-500/20 text-slate-300 border-slate-500/30' };
  };

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
      <h3 className="text-lg font-medium text-slate-100 mb-4">My Agents</h3>

      <div className="space-y-4">
        {agents.map((agent) => {
          const badge = getPerformanceBadge(agent.performance.roi);
          const budgetUsedPercent = (parseFloat(agent.usedBudget) / parseFloat(agent.maxBudget)) * 100;

          return (
            <div key={agent.id} className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-slate-200">{agent.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${badge.color}`}>
                      {badge.label}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500">
                    {agent.type === 'auction' ? `Auction #${agent.auctionId}` : 'Global Portfolio'}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500">Last Active</div>
                  <div className="text-xs text-slate-400">
                    {agent.lastActive.toLocaleTimeString()}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                <div>
                  <label className="text-xs text-slate-500 uppercase tracking-wide">Budget</label>
                  <p className="text-sm text-slate-300 mt-1">
                    {agent.usedBudget}/{agent.maxBudget} MON
                  </p>
                  <div className="w-full bg-slate-700 rounded-full h-1 mt-1">
                    <div
                      className="bg-cyan-400 h-1 rounded-full"
                      style={{ width: `${budgetUsedPercent}%` }}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-slate-500 uppercase tracking-wide">Increment</label>
                  <p className="text-sm text-slate-300 mt-1">{agent.increment} MON</p>
                </div>
                <div>
                  <label className="text-xs text-slate-500 uppercase tracking-wide">Min Delta</label>
                  <p className="text-sm text-slate-300 mt-1">{agent.minDelta} MON</p>
                </div>
                <div>
                  <label className="text-xs text-slate-500 uppercase tracking-wide">Performance</label>
                  <p className="text-sm text-slate-300 mt-1">
                    {agent.performance.wins}W / {agent.performance.totalBids}B
                  </p>
                  <p className="text-xs text-emerald-400">+{agent.performance.roi}% ROI</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="text-xs px-3 py-1 rounded bg-slate-700 hover:bg-slate-600 text-slate-300 transition">
                  Edit Config
                </button>
                <button className="text-xs px-3 py-1 rounded bg-slate-700 hover:bg-slate-600 text-slate-300 transition">
                  Pause Agent
                </button>
                <button className="text-xs px-3 py-1 rounded bg-red-900/50 hover:bg-red-900/70 text-red-300 transition">
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-700">
        <button className="w-full py-2 px-4 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-100 text-sm font-medium transition">
          + Create New Agent
        </button>
      </div>
    </div>
  );
}