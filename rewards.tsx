// web/src/pages/rewards.tsx
import { useState, useEffect } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { TopBar } from '../components/layout/TopBar';
import { useSidebar } from '../contexts/SidebarContext';
import { Gift, Trophy, Star, Zap, Clock } from 'lucide-react';

export default function RewardsPage() {
  const [mounted, setMounted] = useState(false);
  const { collapsed } = useSidebar();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  const userStats = {
    points: 1247,
    level: 12,
    nextLevel: 1500,
    rank: 'Diamond Collector',
    badges: 8
  };

  const rewards = [
    { id: 1, title: 'Daily Login Bonus', description: 'Login for 7 consecutive days', points: 100, emoji: '📅', progress: 5, total: 7, claimable: false },
    { id: 2, title: 'First Bid Victory', description: 'Win your first auction', points: 500, emoji: '🏆', progress: 1, total: 1, claimable: true },
    { id: 3, title: 'Volume Trader', description: 'Trade 1000 MON volume', points: 250, emoji: '💰', progress: 678, total: 1000, claimable: false },
    { id: 4, title: 'Collection Master', description: 'Collect 10 NFTs', points: 300, emoji: '🎨', progress: 7, total: 10, claimable: false },
    { id: 5, title: 'Speed Bidder', description: 'Win 3 auctions in under 1 hour', points: 400, emoji: '⚡', progress: 2, total: 3, claimable: false },
    { id: 6, title: 'Community Champion', description: 'Refer 5 friends', points: 750, emoji: '👥', progress: 3, total: 5, claimable: false },
  ];

  const leaderboard = [
    { rank: 1, user: 'AI_Collector_Pro', points: 15847, badge: '👑' },
    { rank: 2, user: 'CryptoWhale', points: 14235, badge: '🥈' },
    { rank: 3, user: 'NFTHunter', points: 12678, badge: '🥉' },
    { rank: 4, user: 'MetaCollector', points: 11234, badge: '⭐' },
    { rank: 5, user: 'You', points: 1247, badge: '💎' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <TopBar />
      <Sidebar />
      <main className={`transition-all duration-300 ease-in-out pt-14 ${
        collapsed ? 'ml-16' : 'ml-56'
      }`}>
        <div className="p-6 max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold gradient-text mb-2">Rewards & Achievements</h1>
            <p className="text-gray-400">Earn points and unlock exclusive benefits</p>
          </div>

          {/* User Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="premium-card p-6 card-hover">
              <div className="flex items-center gap-3 mb-3">
                <div className="icon-container-cyan">
                  <Star size={24} className="text-cyan-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Total Points</div>
                  <div className="text-2xl font-bold gradient-text">{userStats.points.toLocaleString()}</div>
                </div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full" style={{width: `${(userStats.points / userStats.nextLevel) * 100}%`}}></div>
              </div>
              <div className="text-xs text-gray-500 mt-2">{userStats.nextLevel - userStats.points} to Level {userStats.level + 1}</div>
            </div>

            <div className="premium-card p-6 card-hover">
              <div className="flex items-center gap-3">
                <div className="icon-container-purple">
                  <Trophy size={24} className="text-purple-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Level</div>
                  <div className="text-2xl font-bold text-white">{userStats.level}</div>
                </div>
              </div>
            </div>

            <div className="premium-card p-6 card-hover">
              <div className="flex items-center gap-3">
                <div className="icon-container-green">
                  <Zap size={24} className="text-green-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Rank</div>
                  <div className="text-lg font-bold gradient-text-purple">{userStats.rank}</div>
                </div>
              </div>
            </div>

            <div className="premium-card p-6 card-hover">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-orange-500/20 to-amber-500/20 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
                  <Gift size={24} className="text-orange-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Badges Earned</div>
                  <div className="text-2xl font-bold text-white">{userStats.badges}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Rewards List */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-white mb-4">Available Challenges</h2>
              <div className="space-y-4">
                {rewards.map(reward => (
                  <div key={reward.id} className="premium-card p-5 card-hover">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 via-cyan-500/20 to-blue-500/20 flex items-center justify-center text-3xl">
                          {reward.emoji}
                        </div>
                        <div>
                          <h3 className="text-white font-bold">{reward.title}</h3>
                          <p className="text-sm text-gray-400">{reward.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <Star size={16} className="text-cyan-400" />
                          <span className="text-lg font-bold gradient-text">+{reward.points}</span>
                        </div>
                        {reward.claimable && (
                          <button className="btn-gradient-green text-sm px-4 py-1 mt-2">
                            Claim
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full" style={{width: `${(reward.progress / reward.total) * 100}%`}}></div>
                      </div>
                      <span className="text-sm text-gray-400">{reward.progress}/{reward.total}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Leaderboard */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Leaderboard</h2>
              <div className="premium-card p-5">
                <div className="space-y-3">
                  {leaderboard.map(entry => (
                    <div key={entry.rank} className={`flex items-center justify-between p-3 rounded-xl ${
                      entry.user === 'You' ? 'bg-cyan-500/10 border border-cyan-500/30' : 'bg-white/5'
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-bold text-white">
                          #{entry.rank}
                        </div>
                        <span className="text-2xl">{entry.badge}</span>
                        <div>
                          <div className={`font-semibold ${entry.user === 'You' ? 'text-cyan-400' : 'text-white'}`}>
                            {entry.user}
                          </div>
                          <div className="text-xs text-gray-500">{entry.points.toLocaleString()} pts</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
