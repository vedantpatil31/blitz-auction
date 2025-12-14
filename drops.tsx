// web/src/pages/drops.tsx
import { useState, useEffect } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { TopBar } from '../components/layout/TopBar';
import { useSidebar } from '../contexts/SidebarContext';
import { Clock, Users, Sparkles, AlertCircle } from 'lucide-react';

export default function DropsPage() {
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

  const drops = [
    { 
      id: 1, 
      name: 'Genesis Collection', 
      artist: 'DigitalVoid', 
      supply: 1000, 
      price: '5.0 MON', 
      status: 'live',
      emoji: '🌌',
      registered: 342,
      timeLeft: '2h 15m',
      description: 'First ever collection on Monad blockchain'
    },
    { 
      id: 2, 
      name: 'Neon Dreams Series', 
      artist: 'CyberArtist', 
      supply: 500, 
      price: '8.5 MON', 
      status: 'upcoming',
      emoji: '🎨',
      registered: 567,
      timeLeft: '6h 30m',
      description: 'Cyberpunk themed generative art'
    },
    { 
      id: 3, 
      name: 'Quantum Realm', 
      artist: 'MetaCreator', 
      supply: 777, 
      price: '12.0 MON', 
      status: 'upcoming',
      emoji: '⚡',
      registered: 891,
      timeLeft: '1d 4h',
      description: 'Abstract quantum physics inspired NFTs'
    },
    { 
      id: 4, 
      name: 'Stellar Voyage', 
      artist: 'SpaceArt', 
      supply: 300, 
      price: '15.5 MON', 
      status: 'upcoming',
      emoji: '🚀',
      registered: 234,
      timeLeft: '2d 12h',
      description: 'Space exploration themed collection'
    },
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
            <h1 className="text-3xl font-bold gradient-text mb-2">NFT Drops</h1>
            <p className="text-gray-400">Upcoming and live NFT collection launches</p>
          </div>

          {/* Live Drop Featured */}
          {drops.filter(d => d.status === 'live').map(drop => (
            <div key={drop.id} className="premium-card p-8 mb-8 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="badge-live animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-green-400"></span>
                  LIVE NOW
                </span>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  {/* NFT Preview */}
                  <div className="aspect-square bg-gradient-to-br from-purple-500/20 via-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mb-6">
                    <div className="text-9xl filter drop-shadow-2xl">{drop.emoji}</div>
                  </div>
                </div>

                <div className="flex flex-col justify-center space-y-6">
                  <div>
                    <h2 className="text-4xl font-bold gradient-text mb-2">{drop.name}</h2>
                    <p className="text-xl text-gray-400">by {drop.artist}</p>
                    <p className="text-gray-500 mt-4">{drop.description}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="glass-card p-4 rounded-xl">
                      <div className="text-sm text-gray-400 mb-1">Price</div>
                      <div className="text-xl font-bold gradient-text">{drop.price}</div>
                    </div>
                    <div className="glass-card p-4 rounded-xl">
                      <div className="text-sm text-gray-400 mb-1">Supply</div>
                      <div className="text-xl font-bold text-white">{drop.supply}</div>
                    </div>
                    <div className="glass-card p-4 rounded-xl">
                      <div className="text-sm text-gray-400 mb-1">Registered</div>
                      <div className="text-xl font-bold text-cyan-400">{drop.registered}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Clock size={20} className="text-orange-400" />
                    <div>
                      <div className="text-sm text-gray-400">Ends in</div>
                      <div className="text-2xl font-bold text-orange-400">{drop.timeLeft}</div>
                    </div>
                  </div>

                  <button className="btn-3d text-lg py-4">
                    <Sparkles size={20} className="inline mr-2" />
                    Mint Now
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Upcoming Drops Grid */}
          <h2 className="text-2xl font-bold text-white mb-6">Upcoming Drops</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {drops.filter(d => d.status === 'upcoming').map(drop => (
              <div key={drop.id} className="premium-card card-hover overflow-hidden">
                {/* Preview */}
                <div className="aspect-square bg-gradient-to-br from-purple-500/20 via-cyan-500/20 to-blue-500/20 flex items-center justify-center relative">
                  <div className="text-7xl filter drop-shadow-2xl">{drop.emoji}</div>
                  <div className="absolute top-3 right-3">
                    <span className="badge-warning text-xs px-2 py-1">Upcoming</span>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{drop.name}</h3>
                    <p className="text-sm text-gray-400">by {drop.artist}</p>
                  </div>

                  <p className="text-sm text-gray-500">{drop.description}</p>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="glass-card p-3 rounded-xl">
                      <div className="text-xs text-gray-500">Price</div>
                      <div className="text-base font-bold gradient-text">{drop.price}</div>
                    </div>
                    <div className="glass-card p-3 rounded-xl">
                      <div className="text-xs text-gray-500">Supply</div>
                      <div className="text-base font-bold text-white">{drop.supply}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Users size={14} />
                      <span>{drop.registered} registered</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-orange-400 font-semibold">
                      <Clock size={14} />
                      {drop.timeLeft}
                    </div>
                  </div>

                  <button className="btn-secondary w-full text-sm">
                    <AlertCircle size={16} className="inline mr-2" />
                    Set Reminder
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
