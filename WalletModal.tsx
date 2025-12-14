// web/src/components/WalletModal.tsx
import { X, Wallet2 } from 'lucide-react';
import { useConnect } from 'wagmi';
import { useState, useEffect } from 'react';
// import { initWeb3Auth, loginWithEmail, loginWithSocial } from '../utils/web3auth';
import { useToast } from '../contexts/ToastContext';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect?: (method: string) => void;
}

export function WalletModal({ isOpen, onClose, onConnect }: WalletModalProps) {
  const { connectors, connect, isLoading } = useConnect();
  const { addToast } = useToast();
  const [connectingId, setConnectingId] = useState<string | null>(null);
  const [web3AuthReady, setWeb3AuthReady] = useState(false);

  useEffect(() => {
    // Temporarily disabled until Web3Auth packages finish installing
    // if (isOpen) {
    //   initWeb3Auth().then(() => setWeb3AuthReady(true)).catch(console.error);
    // }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConnect = async (connector: any) => {
    try {
      setConnectingId(connector.id);
      await connect({ connector });
      onConnect?.(connector.id);
      onClose();
    } catch (error) {
      console.error('Connection failed:', error);
      addToast({
        type: 'error',
        title: 'Connection Failed',
        message: 'Failed to connect wallet. Please try again.',
      });
    } finally {
      setConnectingId(null);
    }
  };

  const handleWeb3AuthLogin = async (type: 'email' | 'apple' | 'google') => {
    // Temporarily disabled until Web3Auth packages finish installing
    addToast({
      type: 'info',
      title: 'Coming Soon',
      message: 'Social login is being configured. Please use wallet connection for now.',
    });
    /*
    try {
      setConnectingId(type);
      if (type === 'email') {
        await loginWithEmail();
      } else {
        await loginWithSocial(type);
      }
      addToast({
        type: 'success',
        title: 'Connected',
        message: `Successfully connected with ${type}`,
      });
      onClose();
    } catch (error) {
      console.error('Web3Auth login failed:', error);
      addToast({
        type: 'error',
        title: 'Login Failed',
        message: `Failed to connect with ${type}. Please try again.`,
      });
    } finally {
      setConnectingId(null);
    }
    */
  };

  const getConnectorIcon = (id: string) => {
    if (id.includes('metaMask') || id.includes('injected')) return '🦊';
    if (id.includes('walletConnect')) return '🔗';
    if (id.includes('coinbase')) return '🔷';
    return '👛';
  };

  const getConnectorName = (name: string, id: string) => {
    if (id.includes('metaMask')) return 'MetaMask';
    if (id.includes('walletConnect')) return 'WalletConnect';
    if (id.includes('coinbase')) return 'Coinbase Wallet';
    return name;
  };

  const getConnectorDescription = (id: string) => {
    if (id.includes('metaMask') || id.includes('injected')) return 'Connect with MetaMask browser extension';
    if (id.includes('walletConnect')) return '700+ wallets supported';
    if (id.includes('coinbase')) return 'Coinbase Wallet app & extension';
    return 'Connect your wallet';
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-4">
        <div className="glass-card p-6 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <Wallet2 size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Connect Wallet</h2>
                <p className="text-xs text-gray-400">Choose your preferred method</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#1f2535] transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Wallet Options */}
          <div className="space-y-3">
            {/* Web3 Wallet Connectors */}
            {connectors.map((connector) => (
              <button
                key={connector.id}
                onClick={() => handleConnect(connector)}
                disabled={isLoading || connectingId === connector.id}
                className="w-full p-4 rounded-xl bg-[#1a1f2e] border border-[#2a3142] hover:border-cyan-500/50 hover:bg-[#1f2535] transition group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{getConnectorIcon(connector.id)}</div>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-semibold text-white group-hover:text-cyan-400 transition">
                      {getConnectorName(connector.name, connector.id)}
                    </div>
                    <div className="text-xs text-gray-400">
                      {getConnectorDescription(connector.id)}
                    </div>
                  </div>
                  {connectingId === connector.id ? (
                    <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <div className="opacity-0 group-hover:opacity-100 transition">
                      <div className="w-6 h-6 rounded-full border-2 border-cyan-400 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-cyan-400" />
                      </div>
                    </div>
                  )}
                </div>
              </button>
            ))}

            {/* Divider */}
            <div className="flex items-center gap-3 py-2">
              <div className="flex-1 h-px bg-[#2a3142]"></div>
              <span className="text-xs text-gray-500">or continue with</span>
              <div className="flex-1 h-px bg-[#2a3142]"></div>
            </div>

            {/* Social Login Options */}
            <button
              onClick={() => handleWeb3AuthLogin('email')}
              disabled={!web3AuthReady || connectingId === 'email'}
              className="w-full p-4 rounded-xl bg-[#1a1f2e] border border-[#2a3142] hover:border-cyan-500/50 hover:bg-[#1f2535] transition group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl">📧</div>
                <div className="flex-1 text-left">
                  <div className="text-sm font-semibold text-white group-hover:text-cyan-400 transition">
                    Continue with Email
                  </div>
                  <div className="text-xs text-gray-400">
                    Sign in with your email address
                  </div>
                </div>
                {connectingId === 'email' ? (
                  <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <div className="opacity-0 group-hover:opacity-100 transition">
                    <div className="w-6 h-6 rounded-full border-2 border-cyan-400 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-cyan-400" />
                    </div>
                  </div>
                )}
              </div>
            </button>

            <button
              onClick={() => handleWeb3AuthLogin('apple')}
              disabled={!web3AuthReady || connectingId === 'apple'}
              className="w-full p-4 rounded-xl bg-[#1a1f2e] border border-[#2a3142] hover:border-cyan-500/50 hover:bg-[#1f2535] transition group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl"></div>
                <div className="flex-1 text-left">
                  <div className="text-sm font-semibold text-white group-hover:text-cyan-400 transition">
                    Continue with Apple ID
                  </div>
                  <div className="text-xs text-gray-400">
                    Sign in with Apple
                  </div>
                </div>
                {connectingId === 'apple' ? (
                  <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <div className="opacity-0 group-hover:opacity-100 transition">
                    <div className="w-6 h-6 rounded-full border-2 border-cyan-400 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-cyan-400" />
                    </div>
                  </div>
                )}
              </div>
            </button>

            <button
              onClick={() => handleWeb3AuthLogin('google')}
              disabled={!web3AuthReady || connectingId === 'google'}
              className="w-full p-4 rounded-xl bg-[#1a1f2e] border border-[#2a3142] hover:border-cyan-500/50 hover:bg-[#1f2535] transition group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl">🔍</div>
                <div className="flex-1 text-left">
                  <div className="text-sm font-semibold text-white group-hover:text-cyan-400 transition">
                    Continue with Google
                  </div>
                  <div className="text-xs text-gray-400">
                    Sign in with Google account
                  </div>
                </div>
                {connectingId === 'google' ? (
                  <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <div className="opacity-0 group-hover:opacity-100 transition">
                    <div className="w-6 h-6 rounded-full border-2 border-cyan-400 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-cyan-400" />
                    </div>
                  </div>
                )}
              </div>
            </button>
          </div>

          {/* Footer Info */}
          <div className="mt-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <p className="text-xs text-blue-300 text-center">
              <span className="font-semibold">All methods lead to the same BidStream profile.</span>
              <br />
              Your trading history and settings sync across all connected wallets.
            </p>
          </div>

          {/* Terms */}
          <p className="mt-4 text-xs text-center text-gray-500">
            By connecting, you agree to BidStream's{' '}
            <a href="/terms" className="text-cyan-400 hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="/privacy" className="text-cyan-400 hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}
