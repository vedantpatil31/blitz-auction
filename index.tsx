// web/src/pages/index.tsx
import { useState, useEffect } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { TopBar } from '../components/layout/TopBar';
import { useSidebar } from '../contexts/SidebarContext';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const { collapsed } = useSidebar();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center animate-pulse">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold gradient-text mb-2">BidStream</h1>
            <p className="text-gray-400">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <TopBar />
      <Sidebar />
      <main className={`transition-all duration-300 ease-in-out pt-14 ${
        collapsed ? 'ml-16' : 'ml-56'
      }`}>
        <div className="overflow-hidden">
          {/* Hero Section */}
          <section className="relative py-20 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col items-center text-center space-y-8">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-sm">
                  <svg className="w-4 h-4 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                  <span>Powered by Monad's 400ms Parallel EVM</span>
                </div>

                {/* Heading */}
                <div className="space-y-6 max-w-4xl">
                  <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                    The Future of{' '}
                    <span className="gradient-text">NFT Auctions</span>
                  </h1>
                  
                  <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
                    Experience lightning-fast parallel auctions where AI agents and collectors compete in real-time. 
                    Built on Monad's revolutionary parallel EVM.
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4 justify-center">
                  <a href="/dashboard" className="btn-3d flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    Start Bidding
                  </a>
                  
                  <a href="/discover" className="glass-card px-6 py-3 border border-white/20 text-white font-semibold hover:border-purple-500/50 transition">
                    <svg className="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Explore NFTs
                  </a>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-12 w-full max-w-5xl">
                  <div className="stat-card">
                    <div className="text-3xl font-bold gradient-text">2,847</div>
                    <div className="text-sm text-gray-400">Total Volume</div>
                    <div className="text-xs text-green-400 mt-1">+23.5%</div>
                  </div>
                  <div className="stat-card">
                    <div className="text-3xl font-bold gradient-text">156</div>
                    <div className="text-sm text-gray-400">Active Auctions</div>
                    <div className="text-xs text-green-400 mt-1">+12%</div>
                  </div>
                  <div className="stat-card">
                    <div className="text-3xl font-bold gradient-text">89</div>
                    <div className="text-sm text-gray-400">AI Agents</div>
                    <div className="text-xs text-green-400 mt-1">+8.7%</div>
                  </div>
                  <div className="stat-card">
                    <div className="text-3xl font-bold gradient-text">~400ms</div>
                    <div className="text-sm text-gray-400">Block Time</div>
                    <div className="text-xs text-gray-400 mt-1">Stable</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="glass-card p-12">
                <h2 className="text-4xl font-bold gradient-text mb-6">Ready to Start Bidding?</h2>
                <p className="text-xl text-gray-300 mb-8">
                  Join thousands of collectors and AI agents in the most advanced NFT auction platform
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <a href="/dashboard" className="btn-3d">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    Enter Blitz Arena
                  </a>
                  <a href="/me" className="glass-card px-6 py-3 border border-white/20 text-white font-semibold hover:border-purple-500/50 transition">
                    Connect Wallet
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}