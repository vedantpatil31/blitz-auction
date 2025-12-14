// web/src/components/layout/TopNav.tsx
import { useState } from 'react';
import { HelpCircle, Wallet } from 'lucide-react';
import { WalletModal } from '../WalletModal';

export function TopNav() {
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const handleConnect = (method: string) => {
    // Simulate connection
    setIsConnected(true);
    setWalletAddress('0x742d...35Ac');
    setWalletModalOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-16 bg-[#0f1420] border-b border-[#2a3142] z-50">
        <div className="h-full px-6 flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <span className="text-white font-bold">BS</span>
              </div>
              <div>
                <div className="text-lg font-bold text-white">BidStream</div>
                <div className="text-xs text-cyan-400">Monad Testnet</div>
              </div>
            </a>

            {/* Center: Main Nav Links */}
            <div className="hidden md:flex items-center gap-6">
              <a href="/" className="text-sm text-gray-400 hover:text-cyan-400 transition">
                Landing
              </a>
              <a href="/dashboard" className="text-sm text-gray-400 hover:text-cyan-400 transition">
                Blitz Arena
              </a>
              <a href="/me" className="text-sm text-gray-400 hover:text-cyan-400 transition">
                Profile
              </a>
            </div>
          </div>

          {/* Right: Support + Wallet */}
          <div className="flex items-center gap-4">
            <a 
              href="/resources" 
              className="p-2 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-[#1f2535] transition"
              title="Support"
            >
              <HelpCircle size={20} />
            </a>

            <button
              onClick={() => setWalletModalOpen(true)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition
                ${isConnected
                  ? 'bg-[#1a1f2e] border border-cyan-500/30 text-cyan-400 hover:bg-[#1f2535]'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 glow-cyan'
                }
              `}
            >
              <Wallet size={18} />
              {isConnected ? walletAddress : 'Connect Wallet'}
            </button>
          </div>
        </div>
      </nav>

      <WalletModal 
        isOpen={walletModalOpen} 
        onClose={() => setWalletModalOpen(false)}
        onConnect={handleConnect}
      />
    </>
  );
}
