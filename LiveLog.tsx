// web/src/components/LiveLog.tsx
import { AuctionLogItem } from '../types/auctions';

type LiveLogProps = {
  items: AuctionLogItem[];
};

export function LiveLog({ items }: LiveLogProps) {
  return (
    <div className="rounded-2xl bg-slate-950/80 border border-slate-800 mt-6">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
        <div>
          <p className="text-xs font-medium text-slate-200">Auction Log</p>
          <p className="text-[11px] text-slate-500">
            Real-time stream of manual and agent bids
          </p>
        </div>
      </div>
      <div className="max-h-64 overflow-y-auto text-[11px] font-mono">
        {items.length === 0 ? (
          <div className="px-4 py-6 text-slate-500 text-center">
            No events yet. Place a bid to start the stream.
          </div>
        ) : (
          <ul className="divide-y divide-slate-900/80">
            {items.map((e, i) => (
              <li
                key={i}
                className="px-4 py-2 flex items-center justify-between hover:bg-slate-900/60 transition"
              >
                <span className="text-slate-500">{e.time}</span>
                <span className="text-slate-300">
                  {e.auctionLabel} {e.agentName ? `· ${e.agentName}` : ''}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] ${
                    e.type === 'auto'
                      ? 'bg-emerald-400/10 text-emerald-300 border border-emerald-400/40'
                      : 'bg-sky-400/10 text-sky-300 border border-sky-400/40'
                  }`}
                >
                  {e.type === 'auto' ? 'AutoBid' : 'Manual'}
                </span>
                <span className="text-cyan-300">{e.amount} MON</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}