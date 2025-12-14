// web/src/components/WalletConnectButton.tsx
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useState } from 'react';

export function WalletConnectButton() {
  const { address, isConnected } = useAccount();
  const { connectors, connect, isLoading } = useConnect();
  const { disconnect } = useDisconnect();
  const [isDisconnecting, setIsDisconnecting] = useState(false);

  const handleDisconnect = async () => {
    setIsDisconnecting(true);
    // Optimistically update UI
    setTimeout(() => {
      disconnect();
      setIsDisconnecting(false);
    }, 150); // Small delay for smooth animation
  };

  if (isConnected && !isDisconnecting) {
    return (
      <div className="flex items-center gap-2">
        <span className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 border border-slate-700 text-cyan-400">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </span>
        <button
          onClick={handleDisconnect}
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 border border-slate-700 text-slate-200 hover:border-red-400 hover:text-red-400 transition-all duration-200"
        >
          Disconnect
        </button>
      </div>
    );
  }

  if (isDisconnecting) {
    return (
      <div className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 border border-slate-700 text-slate-400">
        Disconnecting...
      </div>
    );
  }

  const primary = connectors[0];

  return (
    <button
      onClick={() => primary && connect({ connector: primary })}
      disabled={isLoading}
      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-cyan-400 text-slate-950 hover:bg-cyan-300 disabled:opacity-60 transition-all duration-200 shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_25px_rgba(34,211,238,0.6)]"
    >
      {isLoading ? 'Connecting…' : 'Connect Wallet'}
    </button>
  );
}