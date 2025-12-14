// web/src/pages/swap.tsx
import { useState, useEffect } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { TopBar } from '../components/layout/TopBar';
import { useSidebar } from '../contexts/SidebarContext';
import { ArrowDownUp, Settings } from 'lucide-react';

export default function SwapPage() {
  const [mounted, setMounted] = useState(false);
  const { collapsed } = useSidebar();
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [fromToken, setFromToken] = useState('MON');
  const [toToken, setToToken] = useState('USDC');
  const [slippage, setSlippage] = useState('0.5');

  const tokens = [
    { symbol: 'MON', name: 'Monad', balance: '1,234.56', icon: '💎' },
    { symbol: 'USDC', name: 'USD Coin', balance: '5,432.10', icon: '🌟' },
    { symbol: 'WETH', name: 'Wrapped Ether', balance: '2.45', icon: '⚡' },
    { symbol: 'WBTC', name: 'Wrapped Bitcoin', balance: '0.15', icon: '₿' },
  ];

  const recentSwaps = [
    { from: 'MON', to: 'USDC', amount: '100', value: '$245', time: '2m ago' },
    { from: 'WETH', to: 'MON', amount: '0.5', value: '$1,117', time: '5m ago' },
    { from: 'USDC', to: 'WBTC', amount: '1000', value: '$1,000', time: '8m ago' },
  ];

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
      <TopBar />
      <Sidebar />
      <main className={`transition-all duration-300 ease-in-out pt-14 ${
        collapsed ? 'ml-16' : 'ml-56'
      }`}>
        <div className="p-6 max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold gradient-text mb-2">Token Swap</h1>
            <p className="text-gray-400">Exchange tokens instantly with low fees</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Swap Card */}
            <div className="lg:col-span-2">
              <div className="premium-card p-6">
                {/* Slippage Settings */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white">Swap Tokens</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">Slippage:</span>
                    <select 
                      value={slippage} 
                      onChange={(e) => setSlippage(e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-sm text-white focus:border-cyan-500/50 focus:outline-none"
                    >
                      <option value="0.1">0.1%</option>
                      <option value="0.5">0.5%</option>
                      <option value="1.0">1.0%</option>
                      <option value="3.0">3.0%</option>
                    </select>
                  </div>
                </div>

                {/* From Token */}
                <div className="glass-card p-4 border border-white/10 mb-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">From</span>
                    <span className="text-sm text-gray-400">Balance: {tokens.find(t => t.symbol === fromToken)?.balance || '0.00'}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <input 
                      type="text" 
                      placeholder="0.0" 
                      value={fromAmount}
                      onChange={(e) => setFromAmount(e.target.value)}
                      className="bg-transparent text-3xl font-bold text-white outline-none flex-1 placeholder:text-gray-600"
                    />
                    <select
                      value={fromToken}
                      onChange={(e) => setFromToken(e.target.value)}
                      className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white font-semibold focus:border-cyan-500/50 focus:outline-none flex items-center gap-2"
                    >
                      {tokens.map(token => (
                        <option key={token.symbol} value={token.symbol}>
                          {token.icon} {token.symbol}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="text-sm text-gray-500 mt-2">≈ ${fromAmount && !isNaN(parseFloat(fromAmount)) ? (parseFloat(fromAmount) * 2.45).toFixed(2) : '0.00'}</div>
                </div>

                {/* Swap Button */}
                <div className="flex justify-center -my-3 relative z-10">
                  <button className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-cyan-500/50">
                    <ArrowDownUp size={20} className="text-white" />
                  </button>
                </div>

                {/* To Token */}
                <div className="glass-card p-4 border border-white/10 mt-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">To</span>
                    <span className="text-sm text-gray-400">Balance: {tokens.find(t => t.symbol === toToken)?.balance || '0.00'}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <input 
                      type="text" 
                      placeholder="0.0" 
                      value={toAmount}
                      onChange={(e) => setToAmount(e.target.value)}
                      className="bg-transparent text-3xl font-bold text-white outline-none flex-1 placeholder:text-gray-600"
                    />
                    <select
                      value={toToken}
                      onChange={(e) => setToToken(e.target.value)}
                      className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white font-semibold focus:border-cyan-500/50 focus:outline-none"
                    >
                      {tokens.map(token => (
                        <option key={token.symbol} value={token.symbol}>
                          {token.icon} {token.symbol}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="text-sm text-gray-500 mt-2">≈ ${toAmount && !isNaN(parseFloat(toAmount)) ? (parseFloat(toAmount) * 1.00).toFixed(2) : '0.00'}</div>
                </div>

                {/* Swap Details */}
                <div className="mt-6 space-y-3 p-4 glass-card rounded-xl border border-white/5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Exchange Rate</span>
                    <span className="text-white font-semibold">1 MON = 2.45 USDC</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Price Impact</span>
                    <span className="text-green-400 font-semibold">{'<'}0.01%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Network Fee</span>
                    <span className="text-white font-semibold">~0.002 MON</span>
                  </div>
                  <div className="section-divider my-3"></div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Minimum Received</span>
                    <span className="text-white font-bold">{toAmount && !isNaN(parseFloat(toAmount)) ? (parseFloat(toAmount) * 0.995).toFixed(2) : '0.00'} USDC</span>
                  </div>
                </div>

                {/* Swap Button */}
                <button className="btn-3d w-full text-lg mt-6">
                  Swap Tokens
                </button>
              </div>
            </div>

            {/* Recent Swaps Sidebar */}
            <div className="space-y-6">
              {/* Your Tokens */}
              <div className="premium-card p-5">
                <h3 className="text-lg font-bold text-white mb-4">Your Tokens</h3>
                <div className="space-y-3">
                  {tokens.map(token => (
                    <div key={token.symbol} className="flex items-center justify-between p-3 glass-card rounded-xl hover:bg-white/5 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{token.icon}</span>
                        <div>
                          <div className="text-white font-semibold text-sm">{token.symbol}</div>
                          <div className="text-gray-400 text-xs">{token.name}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-bold text-sm">{token.balance}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="premium-card p-5">
                <h3 className="text-lg font-bold text-white mb-4">Recent Swaps</h3>
                <div className="space-y-3">
                  {recentSwaps.map((swap, idx) => (
                    <div key={idx} className="p-3 glass-card rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-white font-semibold">{swap.from}</span>
                          <ArrowDownUp size={12} className="text-gray-500" />
                          <span className="text-white font-semibold">{swap.to}</span>
                        </div>
                        <span className="text-xs text-gray-500">{swap.time}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">{swap.amount} {swap.from}</span>
                        <span className="text-cyan-400 font-semibold">{swap.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
