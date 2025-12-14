// web/src/pages/autobid.tsx
import { useState } from 'react';
import { TopNav } from '../components/layout/TopNav';
import { Sidebar } from '../components/layout/Sidebar';
import { Bot, Zap, TrendingUp, Pause, Edit, Plus } from 'lucide-react';
import { CreateStrategyModal, StrategyData } from '../components/CreateStrategyModal';

interface Strategy {
  id: number;
  name: string;
  tier: string;
  scope: string;
  budget: { used: number; total: number };
  increment: string;
  minDelta: string;
  wins: number;
  bids: number;
  roi: string;
  status: 'active' | 'paused';
}

const initialStrategies: Strategy[] = [
  {
    id: 1,
    name: 'AggressiveBot-1',
    tier: 'Elite',
    scope: 'Auction #1',
    budget: { used: 7.45, total: 10.0 },
    increment: '0.1 MON',
    minDelta: '0.05 MON',
    wins: 12,
    bids: 45,
    roi: '+23.4%',
    status: 'active'
  },
  {
    id: 2,
    name: 'ConservativeAI-Pro',
    tier: 'Pro',
    scope: 'Global Portfolio',
    budget: { used: 3.20, total: 15.0 },
    increment: '0.05 MON',
    minDelta: '0.02 MON',
    wins: 8,
    bids: 32,
    roi: '+18.7%',
    status: 'active'
  },
  {
    id: 3,
    name: 'SniperPro',
    tier: 'Elite',
    scope: 'Auctions #1-5',
    budget: { used: 5.80, total: 8.0 },
    increment: '0.02 MON',
    minDelta: '0.01 MON',
    wins: 6,
    bids: 18,
    roi: '+15.2%',
    status: 'paused'
  }
];

export default function AutoBidPage() {
  const [strategies, setStrategies] = useState<Strategy[]>(initialStrategies);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCreateStrategy = (data: StrategyData) => {
    const newStrategy: Strategy = {
      id: strategies.length + 1,
      name: data.name,
      tier: data.tier,
      scope: data.scope,
      budget: { used: 0, total: parseFloat(data.maxBudget) },
      increment: `${data.increment} MON`,
      minDelta: `${data.minDelta} MON`,
      wins: 0,
      bids: 0,
      roi: '+0.0%',
      status: 'active'
    };
    setStrategies([...strategies, newStrategy]);
  };

  const toggleStrategyStatus = (id: number) => {
    setStrategies(strategies.map(s => 
      s.id === id 
        ? { ...s, status: s.status === 'active' ? 'paused' : 'active' }
        : s
    ));
  };

  const activeStrategies = strategies.filter(s => s.status === 'active').length;
  const totalWins = strategies.reduce((sum, s) => sum + s.wins, 0);
  const totalBids = strategies.reduce((sum, s) => sum + s.bids, 0);
  const avgROI = strategies.length > 0
    ? (strategies.reduce((sum, s) => sum + parseFloat(s.roi), 0) / strategies.length).toFixed(1)
    : '0.0';

  return (
    <div className="min-h-screen bg-[#0a0e1a]">
      <TopNav />
      <Sidebar />
      
      <main className="ml-64 pt-16 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">AutoBid Strategies</h1>
              <p className="text-gray-400">Manage your autonomous bidding agents</p>
            </div>
            <button 
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:from-cyan-600 hover:to-blue-700 transition shadow-lg shadow-cyan-500/30"
            >
              <Plus size={20} />
              Create New Strategy
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                <Bot size={20} className="text-cyan-400" />
              </div>
              <div className="text-sm text-gray-400">Active Agents</div>
            </div>
            <div className="text-3xl font-bold text-white">{activeStrategies}</div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <TrendingUp size={20} className="text-green-400" />
              </div>
              <div className="text-sm text-gray-400">Total Wins</div>
            </div>
            <div className="text-3xl font-bold text-white">{totalWins}</div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Zap size={20} className="text-purple-400" />
              </div>
              <div className="text-sm text-gray-400">Total Bids</div>
            </div>
            <div className="text-3xl font-bold text-white">{totalBids}</div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <TrendingUp size={20} className="text-blue-400" />
              </div>
              <div className="text-sm text-gray-400">Avg ROI</div>
            </div>
            <div className="text-3xl font-bold text-green-400">+{avgROI}%</div>
          </div>
        </div>

        {/* Strategy Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {strategies.map((strategy) => (
            <div key={strategy.id} className="glass-card p-6 space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-white">{strategy.name}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs">
                      {strategy.tier}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{strategy.scope}</p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  strategy.status === 'active' 
                    ? 'bg-green-500/20 border border-green-500/30 text-green-300'
                    : 'bg-gray-500/20 border border-gray-500/30 text-gray-300'
                }`}>
                  {strategy.status === 'active' ? 'Active' : 'Paused'}
                </div>
              </div>

              {/* Budget */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Budget</span>
                  <span className="text-sm font-semibold text-cyan-400">
                    {strategy.budget.used.toFixed(2)} / {strategy.budget.total.toFixed(1)} MON
                  </span>
                </div>
                <div className="h-2 bg-[#141824] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-600"
                    style={{ width: `${(strategy.budget.used / strategy.budget.total) * 100}%` }}
                  />
                </div>
              </div>

              {/* Parameters */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Increment</div>
                  <div className="text-sm font-semibold text-white">{strategy.increment}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Min Delta</div>
                  <div className="text-sm font-semibold text-white">{strategy.minDelta}</div>
                </div>
              </div>

              {/* Performance */}
              <div className="pt-4 border-t border-[#2a3142]">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-cyan-400">{strategy.wins}</div>
                    <div className="text-xs text-gray-500">Wins</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{strategy.bids}</div>
                    <div className="text-xs text-gray-500">Bids</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400">{strategy.roi}</div>
                    <div className="text-xs text-gray-500">ROI</div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#1a1f2e] border border-cyan-500/30 text-cyan-400 hover:bg-[#1f2535] hover:border-cyan-500/50 transition text-sm font-medium">
                  <Edit size={16} />
                  Edit
                </button>
                <button 
                  onClick={() => toggleStrategyStatus(strategy.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#1a1f2e] border border-[#2a3142] text-gray-400 hover:bg-[#1f2535] hover:text-white transition text-sm font-medium"
                >
                  <Pause size={16} />
                  {strategy.status === 'active' ? 'Pause' : 'Resume'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <CreateStrategyModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreateStrategy}
      />
    </div>
  );
}
