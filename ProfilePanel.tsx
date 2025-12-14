// web/src/components/ProfilePanel.tsx
import { useAccount } from 'wagmi';
import { formatEth } from '../utils/formatting';

export function ProfilePanel() {
  const { address, isConnected } = useAccount();

  // Mock data - in real app, this would come from analytics API
  const profileData = {
    totalVolume: '127.45',
    auctionsJoined: 23,
    winRate: 0.65,
    activeAgents: 3,
    totalAgentBudget: '45.2',
  };

  if (!isConnected || !address) {
    return (
      <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
        <div className="text-center text-slate-400">
          <div className="text-2xl mb-2">👤</div>
          <p className="text-sm">Connect your wallet to view your trading profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
      <h3 className="text-lg font-medium text-slate-100 mb-4">Profile</h3>

      <div className="space-y-4">
        <div>
          <label className="text-xs text-slate-500 uppercase tracking-wide">Wallet Address</label>
          <p className="text-sm text-slate-300 font-mono mt-1">
            {address.slice(0, 6)}...{address.slice(-4)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-slate-500 uppercase tracking-wide">Total Volume</label>
            <p className="text-lg font-semibold text-cyan-400 mt-1">
              {profileData.totalVolume} MON
            </p>
          </div>
          <div>
            <label className="text-xs text-slate-500 uppercase tracking-wide">Auctions Joined</label>
            <p className="text-lg font-semibold text-slate-100 mt-1">
              {profileData.auctionsJoined}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-slate-500 uppercase tracking-wide">Win Rate</label>
            <p className="text-lg font-semibold text-emerald-400 mt-1">
              {(profileData.winRate * 100).toFixed(0)}%
            </p>
          </div>
          <div>
            <label className="text-xs text-slate-500 uppercase tracking-wide">Active Agents</label>
            <p className="text-lg font-semibold text-violet-400 mt-1">
              {profileData.activeAgents}
            </p>
          </div>
        </div>

        <div>
          <label className="text-xs text-slate-500 uppercase tracking-wide">Total Agent Budget</label>
          <p className="text-sm text-slate-300 mt-1">
            {profileData.totalAgentBudget} MON allocated
          </p>
        </div>
      </div>
    </div>
  );
}