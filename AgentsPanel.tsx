// web/src/components/AgentsPanel.tsx
import { useState } from 'react';

type AgentConfig = {
  id: string;
  name: string;
  strategy: 'Conservative' | 'Standard' | 'Aggressive';
  maxBudget: string;
  increment: string;
  active: boolean;
  auctionId: number;
};

type AgentsPanelProps = {
  onAddAgent?: (config: Omit<AgentConfig, 'id'>) => void;
  onToggleAgent?: (id: string) => void;
};

export function AgentsPanel({ onAddAgent, onToggleAgent }: AgentsPanelProps) {
  const [agents, setAgents] = useState<AgentConfig[]>([
    {
      id: '1',
      name: 'Conservative-1',
      strategy: 'Conservative',
      maxBudget: '2.0',
      increment: '0.05',
      active: true,
      auctionId: 1,
    },
    {
      id: '2',
      name: 'Aggressive-2',
      strategy: 'Aggressive',
      maxBudget: '5.0',
      increment: '0.1',
      active: false,
      auctionId: 2,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newAgent, setNewAgent] = useState({
    name: '',
    strategy: 'Standard' as const,
    maxBudget: '',
    increment: '',
    auctionId: 1,
  });

  const handleAddAgent = () => {
    if (!newAgent.name || !newAgent.maxBudget || !newAgent.increment) return;

    const agent: AgentConfig = {
      id: Date.now().toString(),
      ...newAgent,
      active: true,
    };

    setAgents((prev) => [...prev, agent]);
    onAddAgent?.(newAgent);
    setNewAgent({ name: '', strategy: 'Standard', maxBudget: '', increment: '', auctionId: 1 });
    setShowModal(false);
  };

  const handleToggle = (id: string) => {
    setAgents((prev) =>
      prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a))
    );
    onToggleAgent?.(id);
  };

  return (
    <div className="rounded-2xl bg-slate-950/70 border border-slate-800 p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs font-medium text-slate-200">Agent Economy</p>
          <p className="text-[11px] text-slate-500">
            Manage your automated bidding agents
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs hover:bg-cyan-500/20 transition"
        >
          + New Agent
        </button>
      </div>

      <div className="space-y-3">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 border border-slate-800"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <div>
                <p className="text-sm font-medium text-slate-200">{agent.name}</p>
                <p className="text-xs text-slate-400">
                  {agent.strategy} · Auction {agent.auctionId} · Max {agent.maxBudget} MON
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  agent.active
                    ? 'bg-emerald-400/10 text-emerald-300 border border-emerald-400/30'
                    : 'bg-slate-600/20 text-slate-400 border border-slate-600/40'
                }`}
              >
                {agent.active ? 'Active' : 'Inactive'}
              </span>
              <button
                onClick={() => handleToggle(agent.id)}
                className="text-xs text-slate-400 hover:text-slate-200"
              >
                Toggle
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-slate-200 mb-4">New Agent</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Name</label>
                <input
                  type="text"
                  value={newAgent.name}
                  onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200"
                  placeholder="e.g., My Conservative Agent"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Strategy</label>
                <select
                  value={newAgent.strategy}
                  onChange={(e) => setNewAgent({ ...newAgent, strategy: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200"
                >
                  <option value="Conservative">Conservative</option>
                  <option value="Standard">Standard</option>
                  <option value="Aggressive">Aggressive</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Max Budget (MON)</label>
                <input
                  type="number"
                  step="0.1"
                  value={newAgent.maxBudget}
                  onChange={(e) => setNewAgent({ ...newAgent, maxBudget: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200"
                  placeholder="2.0"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Increment (MON)</label>
                <input
                  type="number"
                  step="0.01"
                  value={newAgent.increment}
                  onChange={(e) => setNewAgent({ ...newAgent, increment: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200"
                  placeholder="0.05"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Auction ID</label>
                <select
                  value={newAgent.auctionId}
                  onChange={(e) => setNewAgent({ ...newAgent, auctionId: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200"
                >
                  <option value={1}>Auction 1</option>
                  <option value={2}>Auction 2</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAgent}
                className="flex-1 px-4 py-2 bg-cyan-500 text-slate-950 rounded-lg hover:bg-cyan-400 transition"
              >
                Create Agent
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}