// web/src/pages/collections.tsx
import { useState, useEffect } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { TopBar } from '../components/layout/TopBar';
import { useSidebar } from '../contexts/SidebarContext';
import { Layers, TrendingUp } from 'lucide-react';

export default function CollectionsPage() {
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

  const collections = [
    { id: 1, name: 'Cosmic Genesis', items: 1247, volume: '456.8 MON', floor: '12.5 MON', change: '+25%', emoji: '🌌' },
    { id: 2, name: 'Neon Visions', items: 892, volume: '342.1 MON', floor: '8.7 MON', change: '+18%', emoji: '🎨' },
    { id: 3, name: 'Quantum Collection', items: 2156, volume: '678.3 MON', floor: '15.2 MON', change: '+31%', emoji: '⚡' },
    { id: 4, name: 'Stellar Series', items: 567, volume: '234.9 MON', floor: '9.3 MON', change: '+12%', emoji: '🚀' },
    { id: 5, name: 'Digital Horizons', items: 1432, volume: '389.7 MON', floor: '6.8 MON', change: '+8%', emoji: '🌅' },
    { id: 6, name: 'Cyber Metropolis', items: 1789, volume: '567.2 MON', floor: '11.2 MON', change: '+22%', emoji: '🏙️' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <TopBar />
      <Sidebar />
      <main className={`transition-all duration-300 ease-in-out pt-14 ${
        collapsed ? 'ml-16' : 'ml-56'
      }`}>
        <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">NFT Collections</h1>
          <p className="text-gray-400 text-lg">Top performing collections on Monad</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                <Layers size={24} className="text-white" />
              </div>
              <span className="text-sm text-green-400 font-semibold">+15%</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">247</div>
            <div className="text-sm text-gray-400">Total Collections</div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm text-green-400 font-semibold">+28%</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">3,456 MON</div>
            <div className="text-sm text-gray-400">Total Volume</div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <span className="text-sm text-green-400 font-semibold">+34%</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">8,234</div>
            <div className="text-sm text-gray-400">Total Owners</div>
          </div>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <div key={collection.id} className="premium-card card-hover p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 via-cyan-500/20 to-amber-500/20 flex items-center justify-center text-3xl border border-white/10 shadow-lg">
                  {collection.emoji}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">{collection.name}</h3>
                  <p className="text-sm text-gray-400">{collection.items} items</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-3 rounded-xl">
                  <p className="text-xs text-gray-500 mb-1">Floor Price</p>
                  <p className="text-lg font-bold gradient-text">{collection.floor}</p>
                </div>
                <div className="glass-card p-3 rounded-xl">
                  <p className="text-xs text-gray-500 mb-1">Volume</p>
                  <p className="text-lg font-bold text-white">{collection.volume}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-2 text-green-400 text-sm font-semibold">
                  <TrendingUp size={16} />
                  {collection.change}
                </div>
                <button className="btn-secondary text-sm px-4 py-2">
                  View Collection
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="btn-3d">
            Load More Collections
          </button>
        </div>
        </div>
      </main>
    </div>
  );
}
