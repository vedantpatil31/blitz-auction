// web/src/pages/settings/developer.tsx
import { useState, useEffect } from 'react';
import { TopNav } from '../../components/layout/TopNav';
import { Sidebar } from '../../components/layout/Sidebar';
import { MainContent } from '../../components/layout/MainContent';
import { Code, Copy, RefreshCw } from 'lucide-react';
import { useAccount } from 'wagmi';
import { useToast } from '../../contexts/ToastContext';

export default function DeveloperSettingsPage() {
  const { address } = useAccount();
  const { addToast } = useToast();
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    if (address) {
      const saved = localStorage.getItem(`dev_api_key_${address}`);
      if (saved) {
        setApiKey(saved);
      } else {
        generateNewKey();
      }
    }
  }, [address]);

  const generateNewKey = () => {
    const newKey = 'bsk_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setApiKey(newKey);
    if (address) {
      localStorage.setItem(`dev_api_key_${address}`, newKey);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
    addToast({
      type: 'success',
      title: 'Copied!',
      message: 'API key copied to clipboard',
    });
  };

  const regenerateKey = () => {
    if (confirm('Are you sure you want to regenerate your API key? This will invalidate your current key.')) {
      generateNewKey();
      addToast({
        type: 'info',
        title: 'Key Regenerated',
        message: 'Your new API key has been generated',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a]">
      <TopNav />
      <Sidebar />
      <MainContent>
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
              <Code size={24} className="text-green-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Developer Settings</h1>
              <p className="text-gray-400">API access and developer tools</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* API Key Section */}
            <div className="glass-card p-8">
              <h3 className="text-xl font-semibold text-white mb-4">API Key</h3>
              <p className="text-gray-400 text-sm mb-4">
                Use this API key to access BidStream programmatically
              </p>
              <div className="flex gap-3 mb-4">
                <input
                  type="text"
                  value={apiKey}
                  readOnly
                  className="flex-1 px-4 py-3 rounded-xl bg-[#1a1f2e] border border-[#2a3142] text-white font-mono text-sm"
                />
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-3 rounded-xl bg-[#1a1f2e] border border-[#2a3142] text-cyan-400 hover:bg-[#1f2535] transition"
                  title="Copy to clipboard"
                >
                  <Copy size={18} />
                </button>
                <button
                  onClick={regenerateKey}
                  className="px-4 py-3 rounded-xl bg-[#1a1f2e] border border-[#2a3142] text-orange-400 hover:bg-[#1f2535] transition"
                  title="Regenerate key"
                >
                  <RefreshCw size={18} />
                </button>
              </div>
              <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                <p className="text-sm text-yellow-300">
                  <strong>⚠️ Keep this key secret!</strong> Anyone with this key can perform actions on your behalf.
                </p>
              </div>
            </div>

            {/* API Documentation */}
            <div className="glass-card p-8">
              <h3 className="text-xl font-semibold text-white mb-4">API Documentation</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#1a1f2e] border border-[#2a3142]">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-cyan-400 font-mono text-sm">GET /api/auctions</code>
                    <span className="text-xs text-gray-500">List all auctions</span>
                  </div>
                  <p className="text-sm text-gray-400">Fetch all active auctions</p>
                </div>
                <div className="p-4 rounded-xl bg-[#1a1f2e] border border-[#2a3142]">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-cyan-400 font-mono text-sm">POST /api/bid</code>
                    <span className="text-xs text-gray-500">Place a bid</span>
                  </div>
                  <p className="text-sm text-gray-400">Submit a bid on an auction</p>
                </div>
                <div className="p-4 rounded-xl bg-[#1a1f2e] border border-[#2a3142]">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-cyan-400 font-mono text-sm">GET /api/profile</code>
                    <span className="text-xs text-gray-500">Get profile</span>
                  </div>
                  <p className="text-sm text-gray-400">Retrieve your profile data</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainContent>
    </div>
  );
}
