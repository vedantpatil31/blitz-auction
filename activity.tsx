// web/src/pages/activity.tsx
import { useState, useEffect } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { TopBar } from '../components/layout/TopBar';
import { useSidebar } from '../contexts/SidebarContext';
import { TrendingUp, ShoppingBag, Gavel, ListPlus, Trophy } from 'lucide-react';

export default function ActivityPage() {
  const [mounted, setMounted] = useState(false);
  const { collapsed } = useSidebar();
  const [filter, setFilter] = useState('all');

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

  const activities = [
    { type: 'bid', user: 'AI_Collector_Pro', item: 'Cosmic Genesis #001', amount: '12.5 MON', time: '2m ago', emoji: '🌌' },
    { type: 'sale', user: 'CryptoWhale', item: 'Neon Dreams', amount: '8.7 MON', time: '5m ago', emoji: '🎨' },
    { type: 'bid', user: 'NFTHunter', item: 'Quantum Flux', amount: '15.2 MON', time: '8m ago', emoji: '⚡' },
    { type: 'listing', user: 'DigitalVoid', item: 'Stellar Voyage', amount: '9.3 MON', time: '12m ago', emoji: '🚀' },
    { type: 'bid', user: 'MetaCollector', item: 'Digital Sunset', amount: '6.8 MON', time: '15m ago', emoji: '🌅' },
    { type: 'sale', user: 'ProBidder', item: 'Cyber City Lights', amount: '11.2 MON', time: '18m ago', emoji: '🏙️' },
    { type: 'won', user: 'You', item: 'Abstract Dimensions', amount: '9.5 MON', time: '25m ago', emoji: '🎭' },
    { type: 'listing', user: 'ArtisticAI', item: 'Crystal Dreams', amount: '7.5 MON', time: '32m ago', emoji: '💎' },
    { type: 'bid', user: 'MegaBidBot', item: 'Ocean Depths', amount: '10.1 MON', time: '45m ago', emoji: '🌊' },
    { type: 'sale', user: 'NFTCollector88', item: 'Space Explorer', amount: '13.8 MON', time: '1h ago', emoji: '🛸' },
  ];

  const filters = [
    { id: 'all', name: 'All Activity' },
    { id: 'bids', name: 'Bids' },
    { id: 'sales', name: 'Sales' },
    { id: 'listings', name: 'Listings' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <TopBar />
      <Sidebar />
      <main className={`transition-all duration-300 ease-in-out pt-14 ${
        collapsed ? 'ml-16' : 'ml-56'
      }`}>
        <div className="p-6 max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold gradient-text mb-2">Activity Feed</h1>
            <p className="text-gray-400">Real-time marketplace activity on Monad</p>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3 mb-6">
            {filters.map(f => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-4 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                  filter === f.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/40'
                    : 'glass-card text-gray-400 hover:text-white border border-white/10'
                }`}
              >
                {f.name}
              </button>
            ))}
          </div>

          {/* Activity List */}
          <div className="premium-card overflow-hidden">
            <div className="divide-y divide-white/5">
              {activities.map((activity, idx) => (
                <div key={idx} className="flex items-center justify-between p-5 hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      activity.type === 'bid' ? 'icon-container-cyan' :
                      activity.type === 'sale' ? 'icon-container-green' :
                      activity.type === 'won' ? 'icon-container-purple' :
                      'bg-purple-500/20'
                    }`}>
                      {activity.type === 'bid' ? <Gavel size={20} className="text-cyan-400" /> :
                       activity.type === 'sale' ? <ShoppingBag size={20} className="text-green-400" /> :
                       activity.type === 'won' ? <Trophy size={20} className="text-purple-400" /> :
                       <ListPlus size={20} className="text-purple-400" />}
                    </div>
                    
                    {/* NFT Preview */}
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 via-cyan-500/20 to-blue-500/20 flex items-center justify-center text-2xl">
                      {activity.emoji}
                    </div>
                    
                    {/* Details */}
                    <div>
                      <div className="text-white font-semibold mb-1">
                        <span className={activity.user === 'You' ? 'text-cyan-400' : 'text-gray-300'}>{activity.user}</span>
                        <span className="text-gray-500 mx-2">
                          {activity.type === 'bid' ? 'placed a bid on' : 
                           activity.type === 'sale' ? 'purchased' : 
                           activity.type === 'won' ? 'won the auction for' :
                           'listed'}
                        </span>
                        <span className="text-white">{activity.item}</span>
                      </div>
                      <div className="text-sm text-gray-500">{activity.time}</div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xl font-bold gradient-text">{activity.amount}</div>
                    <div className="text-xs text-gray-500">≈ ${activity.amount && !isNaN(parseFloat(activity.amount)) ? (parseFloat(activity.amount) * 2.45).toFixed(2) : '0.00'}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <button className="btn-secondary px-8 py-3">
              Load More Activity
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
