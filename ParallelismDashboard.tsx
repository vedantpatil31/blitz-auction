// web/src/components/ParallelismDashboard.tsx
import { useState, useEffect } from 'react';

type BlockMetrics = {
  number: number;
  timestamp: number;
  transactionCount: number;
  auctionsUpdated: number;
  bidsInBlock: number;
  agentBids: number;
  manualBids: number;
};

type SummaryMetrics = {
  totalBlocks: number;
  avgBidsPerBlock: number;
  avgAuctionsPerBlock: number;
  totalBids: number;
  totalAgentBids: number;
  totalManualBids: number;
  agentShare: number;
  manualShare: number;
  lastUpdated: number;
};

export function ParallelismDashboard() {
  const [recentBlocks, setRecentBlocks] = useState<BlockMetrics[]>([]);
  const [summary, setSummary] = useState<SummaryMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMetrics();
    // Refresh every 30 seconds
    const interval = setInterval(fetchMetrics, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchMetrics = async () => {
    try {
      setError(null);
      const [blocksRes, summaryRes] = await Promise.all([
        fetch('http://localhost:3001/metrics/recent-blocks?limit=10'),
        fetch('http://localhost:3001/metrics/summary'),
      ]);

      const blocksOk = blocksRes.ok;
      const summaryOk = summaryRes.ok;

      if (blocksOk) {
        const blocks = await blocksRes.json();
        setRecentBlocks(blocks);
      }

      if (summaryOk) {
        const summaryData = await summaryRes.json();
        setSummary(summaryData);
      }

      // If neither API is available, show error
      if (!blocksOk && !summaryOk) {
        throw new Error('Analytics API unavailable');
      }
    } catch (error) {
      console.error('Error fetching metrics:', error);
      setError('Live metrics temporarily unavailable; on-chain execution unaffected.');
      // Use mock data for demo
      setRecentBlocks(getMockBlocks());
      setSummary(getMockSummary());
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl bg-slate-950/70 border border-slate-800 p-4">
        <p className="text-slate-400">Loading parallelism metrics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl bg-slate-950/70 border border-slate-800 p-4">
        <div className="flex items-center gap-2 text-amber-400">
          <span className="text-lg">⚠️</span>
          <p className="text-sm">{error}</p>
        </div>
        <p className="text-xs text-slate-500 mt-2">
          Showing demo data. Real metrics will appear when analytics are connected.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard
          label="Avg Bids/Block"
          value={summary?.avgBidsPerBlock.toFixed(1) || '0.0'}
          unit=""
        />
        <MetricCard
          label="Avg Auctions/Block"
          value={summary?.avgAuctionsPerBlock.toFixed(1) || '0.0'}
          unit=""
        />
        <MetricCard
          label="Agent Bid Share"
          value={summary?.agentShare.toFixed(1) || '0.0'}
          unit="%"
        />
        <MetricCard
          label="Total Blocks"
          value={summary?.totalBlocks.toString() || '0'}
          unit=""
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Auctions per Block Chart */}
        <div className="rounded-2xl bg-slate-950/70 border border-slate-800 p-4">
          <h3 className="text-sm font-medium text-slate-200 mb-3">Auctions Updated per Block</h3>
          <div className="space-y-2">
            {recentBlocks.slice(0, 8).map((block) => (
              <div key={block.number} className="flex items-center gap-3">
                <span className="text-xs text-slate-500 w-16">#{block.number % 10000}</span>
                <div className="flex-1 bg-slate-800 rounded-full h-2">
                  <div
                    className="bg-cyan-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((block.auctionsUpdated / 3) * 100, 100)}%` }}
                  />
                </div>
                <span className="text-xs text-slate-400 w-6">{block.auctionsUpdated}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-3">
            Shows parallel execution: multiple auctions updating in same blocks
          </p>
        </div>

        {/* Bid Distribution */}
        <div className="rounded-2xl bg-slate-950/70 border border-slate-800 p-4">
          <h3 className="text-sm font-medium text-slate-200 mb-3">Manual vs Agent Bids</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-300">Manual Bids</span>
              <span className="text-sm text-sky-300">{summary?.manualShare.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-3">
              <div
                className="bg-sky-500 h-3 rounded-full"
                style={{ width: `${summary?.manualShare || 0}%` }}
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-300">Agent Bids</span>
              <span className="text-sm text-emerald-300">{summary?.agentShare.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-3">
              <div
                className="bg-emerald-500 h-3 rounded-full"
                style={{ width: `${summary?.agentShare || 0}%` }}
              />
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            Agent economy activity vs manual participation
          </p>
        </div>
      </div>

      {/* Technical Details */}
      <div className="rounded-2xl bg-slate-950/70 border border-slate-800 p-4">
        <h3 className="text-sm font-medium text-slate-200 mb-2">Monad Parallel Execution</h3>
        <p className="text-xs text-slate-400 mb-3">
          BidStream demonstrates Monad's optimistic parallel execution where independent auctions
          update in the same blocks without conflicts. Each auction lives at isolated storage keys,
          maximizing parallelism.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <h4 className="font-medium text-slate-300 mb-1">State Layout</h4>
            <ul className="text-slate-500 space-y-1">
              <li>• auctions[auctionId] - Isolated per auction</li>
              <li>• autoBidConfigs[auctionId][user] - Per-auction agents</li>
              <li>• No global mutable counters</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-slate-300 mb-1">Conflict Resolution</h4>
            <ul className="text-slate-500 space-y-1">
              <li>• Transactions on different auctionIds are independent</li>
              <li>• Monad's scheduler runs them in parallel</li>
              <li>• Only conflicts if same storage key modified</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="rounded-xl bg-slate-900/50 border border-slate-800 p-3">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-lg font-semibold text-cyan-300">
        {value}{unit}
      </p>
    </div>
  );
}

function getMockBlocks(): BlockMetrics[] {
  const blocks = [];
  for (let i = 0; i < 10; i++) {
    blocks.push({
      number: 1000000 + i,
      timestamp: Date.now() - (i * 4000),
      transactionCount: Math.floor(Math.random() * 50) + 10,
      auctionsUpdated: Math.random() > 0.3 ? Math.floor(Math.random() * 3) + 1 : 0,
      bidsInBlock: Math.random() > 0.3 ? Math.floor(Math.random() * 5) + 1 : 0,
      agentBids: Math.random() > 0.5 ? Math.floor(Math.random() * 3) : 0,
      manualBids: Math.random() > 0.5 ? Math.floor(Math.random() * 3) : 0,
    });
  }
  return blocks.reverse();
}

function getMockSummary(): SummaryMetrics {
  return {
    totalBlocks: 50,
    avgBidsPerBlock: 2.3,
    avgAuctionsPerBlock: 1.8,
    totalBids: 115,
    totalAgentBids: 69,
    totalManualBids: 46,
    agentShare: 60.0,
    manualShare: 40.0,
    lastUpdated: Date.now(),
  };
}