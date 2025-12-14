// web/src/components/UserHistory.tsx
import { formatEth } from '../utils/formatting';

type AuctionHistoryItem = {
  id: number;
  name: string;
  role: 'seller' | 'bidder';
  status: 'won' | 'lost' | 'active' | 'settled';
  finalPrice?: string;
  pnl?: number;
  endTime: Date;
};

export function UserHistory() {
  // Mock data - in real app, this would come from analytics API
  const historyItems: AuctionHistoryItem[] = [
    {
      id: 1,
      name: 'Cool NFT',
      role: 'bidder',
      status: 'won',
      finalPrice: '2.45',
      pnl: 1.23,
      endTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
    {
      id: 2,
      name: 'Rare Comic',
      role: 'bidder',
      status: 'lost',
      finalPrice: '1.87',
      pnl: -0.45,
      endTime: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    },
    {
      id: 3,
      name: 'Digital Art #42',
      role: 'seller',
      status: 'settled',
      finalPrice: '3.21',
      pnl: 2.89,
      endTime: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    },
    {
      id: 4,
      name: 'Vintage Watch',
      role: 'bidder',
      status: 'active',
      endTime: new Date(Date.now() + 30 * 60 * 1000), // 30 min from now
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'won': return 'text-emerald-400';
      case 'lost': return 'text-red-400';
      case 'active': return 'text-cyan-400';
      case 'settled': return 'text-slate-400';
      default: return 'text-slate-400';
    }
  };

  const getRoleColor = (role: string) => {
    return role === 'seller' ? 'text-blue-400' : 'text-orange-400';
  };

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
      <h3 className="text-lg font-medium text-slate-100 mb-4">Recent Auctions</h3>

      <div className="space-y-3">
        {historyItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-slate-200">{item.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full bg-slate-700 ${getRoleColor(item.role)}`}>
                  {item.role}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full bg-slate-700 ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
              </div>
              <div className="text-xs text-slate-500">
                Ended {item.endTime.toLocaleString()}
              </div>
            </div>

            <div className="text-right">
              {item.finalPrice && (
                <div className="text-sm font-medium text-slate-200">
                  {item.finalPrice} MON
                </div>
              )}
              {item.pnl !== undefined && (
                <div className={`text-xs ${item.pnl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {item.pnl >= 0 ? '+' : ''}{item.pnl.toFixed(2)} MON
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {historyItems.length === 0 && (
        <div className="text-center py-8 text-slate-400">
          <div className="text-2xl mb-2">📊</div>
          <p className="text-sm">No auction history yet</p>
          <p className="text-xs">Join auctions to see your activity here</p>
        </div>
      )}
    </div>
  );
}