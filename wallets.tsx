// web/src/pages/settings/wallets.tsx
import { TopNav } from '../../components/layout/TopNav';
import { Sidebar } from '../../components/layout/Sidebar';
import { MainContent } from '../../components/layout/MainContent';
import { Wallet, Plus, Trash2 } from 'lucide-react';
import { useAccount, useDisconnect } from 'wagmi';
import { useState } from 'react';
import { WalletModal } from '../../components/WalletModal';

export default function WalletsSettingsPage() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [walletModalOpen, setWalletModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0e1a]">
      <TopNav />
      <Sidebar />
      <MainContent>
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <Wallet size={24} className="text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Linked Wallets</h1>
              <p className="text-gray-400">Manage your connected wallets</p>
            </div>
          </div>

          <div className="glass-card p-8 space-y-6">
            {isConnected ? (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#1a1f2e] border border-[#2a3142]">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Primary Wallet</div>
                      <div className="font-mono text-white">{address}</div>
                      <div className="text-xs text-green-400 mt-1">✓ Currently connected</div>
                    </div>
                    <button
                      onClick={() => disconnect()}
                      className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition"
                      title="Disconnect"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Wallet size={48} className="text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 mb-4">No wallets connected</p>
                <button
                  onClick={() => setWalletModalOpen(true)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:from-cyan-600 hover:to-blue-700 transition"
                >
                  Connect Wallet
                </button>
              </div>
            )}
          </div>
        </div>
      </MainContent>

      <WalletModal isOpen={walletModalOpen} onClose={() => setWalletModalOpen(false)} />
    </div>
  );
}
