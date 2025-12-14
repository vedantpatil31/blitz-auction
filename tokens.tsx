// web/src/pages/tokens.tsx
import { useState, useEffect } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { TopBar } from '../components/layout/TopBar';
import { useSidebar } from '../contexts/SidebarContext';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function TokensPage() {
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

  const tokens = [
    { symbol: 'MON', name: 'Monad', price: '$2.45', change: '+12.5%', up: true, volume: '$1.2M', marketCap: '$245M', image: 'https://cryptologos.cc/logos/ethereum-eth-logo.png', emoji: '💎' },
    { symbol: 'USDC', name: 'USD Coin', price: '$1.00', change: '+0.01%', up: true, volume: '$890K', marketCap: '$32B', image: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png', emoji: '🌟' },
    { symbol: 'WETH', name: 'Wrapped Ether', price: '$2,234', change: '+5.2%', up: true, volume: '$2.1M', marketCap: '$6.7B', image: 'https://cryptologos.cc/logos/ethereum-eth-logo.png', emoji: '⚡' },
    { symbol: 'BTC', name: 'Bitcoin', price: '$43,250', change: '-2.3%', up: false, volume: '$3.5M', marketCap: '$7.2B', image: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png', emoji: '₿' },
    { symbol: 'SOL', name: 'Solana', price: '$98.50', change: '+8.7%', up: true, volume: '$1.8M', marketCap: '$7.9B', image: 'https://cryptologos.cc/logos/solana-sol-logo.png', emoji: '☀️' },
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
            <h1 className="text-3xl font-bold gradient-text mb-2">Tokens</h1>
            <p className="text-gray-400">Track token prices and trading volume on Monad</p>
          </div>

          <div className="premium-card overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-5 text-gray-400 font-semibold text-sm uppercase tracking-wider">Token</th>
                  <th className="text-right p-5 text-gray-400 font-semibold text-sm uppercase tracking-wider">Price</th>
                  <th className="text-right p-5 text-gray-400 font-semibold text-sm uppercase tracking-wider">24h Change</th>
                  <th className="text-right p-5 text-gray-400 font-semibold text-sm uppercase tracking-wider">Volume</th>
                  <th className="text-right p-5 text-gray-400 font-semibold text-sm uppercase tracking-wider">Market Cap</th>
                  <th className="text-right p-5 text-gray-400 font-semibold text-sm uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody>
                {tokens.map((token) => (
                  <tr key={token.symbol} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                          <img 
                            src={token.image} 
                            alt={token.symbol}
                            className="w-6 h-6 object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%2322d3ee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"%3E%3Ccircle cx="12" cy="12" r="10"%3E%3C/circle%3E%3Cline x1="12" y1="8" x2="12" y2="12"%3E%3C/line%3E%3Cline x1="12" y1="16" x2="12.01" y2="16"%3E%3C/line%3E%3C/svg%3E';
                            }}
                          />
                        </div>
                        <div>
                          <div className="text-white font-bold text-base">{token.symbol}</div>
                          <div className="text-sm text-gray-400">{token.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-5 text-right text-white font-bold text-base">{token.price}</td>
                    <td className="p-5 text-right">
                      <div className={`flex items-center justify-end gap-1.5 ${token.up ? 'text-green-400' : 'text-red-400'}`}>
                        {token.up ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                        <span className="font-bold">{token.change}</span>
                      </div>
                    </td>
                    <td className="p-5 text-right text-gray-300 font-semibold">{token.volume}</td>
                    <td className="p-5 text-right text-gray-300 font-semibold">{token.marketCap}</td>
                    <td className="p-5 text-right">
                      <button className="btn-secondary text-sm px-5 py-2.5">Trade</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
