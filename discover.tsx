// web/src/pages/discover.tsx
import { useState, useEffect } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { TopBar } from '../components/layout/TopBar';
import { useSidebar } from '../contexts/SidebarContext';
import { TrendingUp, Flame, Sparkles, Filter } from 'lucide-react';

export default function DiscoverPage() {
  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState('trending');
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

  const filters = [
    { id: 'trending', name: 'Trending', icon: TrendingUp },
    { id: 'hot', name: 'Hot', icon: Flame },
    { id: 'new', name: 'New', icon: Sparkles },
  ];

  const nfts = [
    { id: 1, name: 'Cosmic Genesis #001', artist: 'DigitalVoid', price: '12.5 MON', emoji: '🌌', rarity: 'Legendary', change: '+25%' },
    { id: 2, name: 'Neon Dreams', artist: 'CyberArtist', price: '8.7 MON', emoji: '🎨', rarity: 'Epic', change: '+18%' },
    { id: 3, name: 'Quantum Flux', artist: 'MetaCreator', price: '15.2 MON', emoji: '⚡', rarity: 'Mythic', change: '+31%' },
    { id: 4, name: 'Stellar Voyage', artist: 'SpaceArt', price: '9.3 MON', emoji: '🚀', rarity: 'Rare', change: '+12%' },
    { id: 5, name: 'Digital Sunset', artist: 'PixelMaster', price: '6.8 MON', emoji: '🌅', rarity: 'Epic', change: '+8%' },
    { id: 6, name: 'Cyber City', artist: 'FutureVision', price: '11.2 MON', emoji: '🏙️', rarity: 'Legendary', change: '+22%' },
    { id: 7, name: 'Crystal Dreams', artist: 'GemCraft', price: '7.5 MON', emoji: '💎', rarity: 'Rare', change: '+15%' },
    { id: 8, name: 'Ocean Depths', artist: 'WaterArt', price: '10.1 MON', emoji: '🌊', rarity: 'Epic', change: '+19%' },
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
          <h1 className="text-4xl font-bold gradient-text mb-2">Discover NFTs</h1>
          <p className="text-gray-400 text-lg">Explore the hottest NFT auctions on Monad</p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            {filters.map((filter) => {
              const Icon = filter.icon;
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                    activeFilter === filter.id
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/40'
                      : 'glass-card text-gray-400 hover:text-white border border-white/10'
                  }`}
                >
                  <Icon size={18} />
                  {filter.name}
                </button>
              );
            })}
          </div>
          <button className="glass-card px-4 py-2.5 rounded-xl flex items-center gap-2 text-gray-400 hover:text-white border border-white/10 ml-auto">
            <Filter size={18} />
            More Filters
          </button>
        </div>

        {/* NFT Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {nfts.map((nft) => (
            <div key={nft.id} className="nft-card card-hover">
              {/* Preview Area */}
              <div className="aspect-square bg-gradient-to-br from-purple-500/20 via-cyan-500/20 to-blue-500/20 flex items-center justify-center relative overflow-hidden">
                <div className="text-7xl filter drop-shadow-2xl">{nft.emoji}</div>
                <div className="absolute top-3 right-3">
                  <span className={`badge text-xs px-2 py-1 ${
                    nft.rarity === 'Mythic' ? 'badge-error' :
                    nft.rarity === 'Legendary' ? 'badge-warning' :
                    nft.rarity === 'Epic' ? 'badge-info' : 'badge-success'
                  }`}>{nft.rarity}</span>
                </div>
              </div>
              
              <div className="p-5 space-y-3">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{nft.name}</h3>
                  <p className="text-sm text-gray-400">by {nft.artist}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Current Bid</p>
                    <p className="text-xl font-bold gradient-text">{nft.price}</p>
                  </div>
                  <div className="flex items-center gap-1 text-green-400 text-sm font-semibold">
                    <TrendingUp size={14} />
                    {nft.change}
                  </div>
                </div>

                <button className="btn-3d w-full text-sm">
                  Place Bid
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="btn-3d">
            Load More NFTs
          </button>
        </div>
        </div>
      </main>
    </div>
  );
}
