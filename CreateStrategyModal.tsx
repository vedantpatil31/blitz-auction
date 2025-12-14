// web/src/components/CreateStrategyModal.tsx
import { useState } from 'react';
import { X, Bot, TrendingUp } from 'lucide-react';

interface CreateStrategyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (strategy: StrategyData) => void;
}

export interface StrategyData {
  name: string;
  tier: 'Basic' | 'Pro' | 'Elite';
  scope: string;
  maxBudget: string;
  increment: string;
  minDelta: string;
}

export function CreateStrategyModal({ isOpen, onClose, onCreate }: CreateStrategyModalProps) {
  const [formData, setFormData] = useState<StrategyData>({
    name: '',
    tier: 'Pro',
    scope: 'Global Portfolio',
    maxBudget: '',
    increment: '',
    minDelta: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(formData);
    onClose();
    setFormData({
      name: '',
      tier: 'Pro',
      scope: 'Global Portfolio',
      maxBudget: '',
      increment: '',
      minDelta: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="glass-card p-8 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                <Bot size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Create AutoBid Strategy</h2>
                <p className="text-sm text-gray-400">Configure your automated bidding agent</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#1f2535] transition"
            >
              <X size={24} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Strategy Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Strategy Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., AggressiveBot-1"
                className="w-full px-4 py-3 rounded-xl bg-[#1a1f2e] border border-[#2a3142] text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition"
              />
            </div>

            {/* Tier Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Strategy Tier
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['Basic', 'Pro', 'Elite'] as const).map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setFormData({ ...formData, tier })}
                    className={`px-4 py-3 rounded-xl font-medium transition ${
                      formData.tier === tier
                        ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white'
                        : 'bg-[#1a1f2e] border border-[#2a3142] text-gray-400 hover:border-cyan-500/50'
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>

            {/* Scope */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Scope
              </label>
              <select
                value={formData.scope}
                onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#1a1f2e] border border-[#2a3142] text-white focus:border-cyan-500 focus:outline-none transition"
              >
                <option value="Global Portfolio">Global Portfolio</option>
                <option value="Auction #1">Auction #1</option>
                <option value="Auction #2">Auction #2</option>
                <option value="Auctions #1-5">Auctions #1-5</option>
              </select>
            </div>

            {/* Budget Parameters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Max Budget (MON) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.maxBudget}
                  onChange={(e) => setFormData({ ...formData, maxBudget: e.target.value })}
                  placeholder="10.00"
                  className="w-full px-4 py-3 rounded-xl bg-[#1a1f2e] border border-[#2a3142] text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Increment (MON) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.increment}
                  onChange={(e) => setFormData({ ...formData, increment: e.target.value })}
                  placeholder="0.1"
                  className="w-full px-4 py-3 rounded-xl bg-[#1a1f2e] border border-[#2a3142] text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Min Delta (MON) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.minDelta}
                  onChange={(e) => setFormData({ ...formData, minDelta: e.target.value })}
                  placeholder="0.05"
                  className="w-full px-4 py-3 rounded-xl bg-[#1a1f2e] border border-[#2a3142] text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition"
                />
              </div>
            </div>

            {/* Info Box */}
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <div className="flex items-start gap-3">
                <TrendingUp size={20} className="text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-300">
                  <p className="font-semibold mb-1">Strategy Tips:</p>
                  <ul className="list-disc list-inside space-y-1 text-blue-300/80">
                    <li>Higher increment = more aggressive bidding</li>
                    <li>Lower min delta = more responsive to competition</li>
                    <li>Elite tier strategies get priority execution</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 rounded-xl bg-[#1a1f2e] border border-[#2a3142] text-gray-400 font-semibold hover:bg-[#1f2535] hover:text-white transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:from-cyan-600 hover:to-blue-700 transition shadow-lg shadow-cyan-500/30"
              >
                Create Strategy
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
