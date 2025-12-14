// web/src/pages/me.tsx
import { useState, useEffect } from 'react';

export default function ProfilePage() {
  const [mounted, setMounted] = useState(false);

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

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-0 border-b border-white/10 rounded-none backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <a href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold gradient-text">BidStream</h1>
                  <p className="text-xs text-gray-400">Profile</p>
                </div>
              </a>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="/discover" className="text-gray-300 hover:text-white transition">Discover</a>
              <a href="/collections" className="text-gray-300 hover:text-white transition">Collections</a>
              <a href="/dashboard" className="text-gray-300 hover:text-white transition">Arena</a>
              <a href="/me" className="text-purple-400 font-semibold">Profile</a>
            </div>

            <a href="/dashboard" className="btn-3d">
              Enter Arena
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Connect Wallet Prompt */}
          <div className="glass-card p-12 text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border-2 border-cyan-500/30 flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">
              Connect Your Wallet
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              Connect your wallet to view and manage your NFT collection and auction history
            </p>
            <button className="btn-3d">
              Connect Wallet
            </button>

            <div className="mt-12 pt-8 border-t border-[#2a3142]">
              <p className="text-sm text-gray-500 mb-4">Supported wallets:</p>
              <div className="flex justify-center gap-4 flex-wrap">
                <div className="px-4 py-2 rounded-lg bg-[#1a1f2e] border border-[#2a3142] text-gray-400 text-sm">
                  🦊 MetaMask
                </div>
                <div className="px-4 py-2 rounded-lg bg-[#1a1f2e] border border-[#2a3142] text-gray-400 text-sm">
                  🔗 WalletConnect
                </div>
                <div className="px-4 py-2 rounded-lg bg-[#1a1f2e] border border-[#2a3142] text-gray-400 text-sm">
                  🔷 Coinbase Wallet
                </div>
                <div className="px-4 py-2 rounded-lg bg-[#1a1f2e] border border-[#2a3142] text-gray-400 text-sm">
                  📧 Email Login
                </div>
              </div>
            </div>
          </div>

          {/* Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="glass-card p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Portfolio Tracking</h3>
              <p className="text-gray-400 text-sm">Track your NFT collection value and auction performance</p>
            </div>

            <div className="glass-card p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">AI Agent Management</h3>
              <p className="text-gray-400 text-sm">Configure and monitor your automated bidding strategies</p>
            </div>

            <div className="glass-card p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Auction History</h3>
              <p className="text-gray-400 text-sm">View detailed history of all your bidding activity</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}