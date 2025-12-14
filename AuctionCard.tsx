// web/src/components/AuctionCard.tsx
import { useState, useEffect } from 'react';
import { StatusBadge } from './StatusBadge';
import { formatTimeLeft, formatEth } from '../utils/formatting';

type AuctionCardProps = {
  title: string;
  auctionId: number;
  highestBid: string;
  endTime: bigint;
  reservePrice: bigint;
  auctionType: 'Standard' | 'Blitz';
  batchInterval: number;
  isAgentHeavy?: boolean;
  status?: 'active' | 'ending' | 'settled';
  onPlaceBid?: () => void;
  onSetAutoBid?: () => void;
};

export function AuctionCard({
  title,
  auctionId,
  highestBid,
  endTime,
  reservePrice,
  auctionType,
  batchInterval,
  isAgentHeavy,
  status = 'active',
  onPlaceBid,
  onSetAutoBid,
}: AuctionCardProps) {
  const [timeLeft, setTimeLeft] = useState(formatTimeLeft(endTime));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(formatTimeLeft(endTime));
    }, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  const currentTime = Math.floor(Date.now() / 1000);
  const timeRemaining = Number(endTime) - currentTime;
  let dynamicStatus = status;
  if (timeRemaining <= 0) {
    dynamicStatus = 'settled';
  } else if (timeRemaining <= 10) {
    dynamicStatus = 'ending';
  } else {
    dynamicStatus = 'active';
  }

  return (
    <div className="rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-cyan-400/70 transition shadow-lg hover:shadow-cyan-500/20 p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-500">Auction #{auctionId}</p>
          <h3 className="text-sm font-semibold text-slate-100">{title}</h3>
          <p className="text-[10px] text-slate-400">
            Reserve: {formatEth(reservePrice)} MON · {Number(highestBid) >= Number(reservePrice) ? 'Met' : 'Not met yet'}
          </p>
          <p className="text-[10px] text-slate-500">
            Anti-sniping: +10s if bid in last 10s (max 5x)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`text-[10px] px-2 py-1 rounded-full border ${
              auctionType === 'Blitz'
                ? 'border-cyan-400/50 text-cyan-300 bg-cyan-400/5'
                : 'border-slate-400/50 text-slate-300 bg-slate-400/5'
            }`}
          >
            {auctionType === 'Blitz' ? `Blitz (${batchInterval}s)` : 'Standard'}
          </span>
          <StatusBadge status={dynamicStatus} />
          <span
            className={`text-[10px] px-2 py-1 rounded-full border ${
              isAgentHeavy
                ? 'border-emerald-400/50 text-emerald-300 bg-emerald-400/5'
                : 'border-sky-400/50 text-sky-300 bg-sky-400/5'
            }`}
          >
            {isAgentHeavy ? 'Agents Active' : 'Manual Focus'}
          </span>
        </div>
      </div>

      <div className="rounded-xl bg-slate-900/70 border border-slate-800 px-3 py-2 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[11px] text-slate-400">Highest Bid</span>
          <span className="text-xl font-semibold text-cyan-300">
            {highestBid} MON
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[11px] text-slate-400">Time Left</span>
          <span className="text-sm text-slate-100 font-medium">{timeLeft}</span>
        </div>
      </div>

      <div className="flex gap-2 mt-auto">
        <button
          onClick={onPlaceBid}
          className="flex-1 px-3 py-2 rounded-xl bg-cyan-400 text-slate-950 text-xs font-medium hover:bg-cyan-300 transition shadow-[0_0_20px_rgba(34,211,238,0.4)]"
        >
          Place Bid
        </button>
        <button
          onClick={onSetAutoBid}
          className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 hover:border-cyan-400 hover:text-cyan-200 transition"
        >
          Set Auto-Bid
        </button>
      </div>
    </div>
  );
}