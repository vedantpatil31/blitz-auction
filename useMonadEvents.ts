// web/src/hooks/useMonadEvents.ts
import { useState } from 'react';
import { AuctionLogItem } from '../types/auctions';

type AddBidOptions = {
  type?: 'manual' | 'auto';
  agentName?: string;
};

// Pure front-end log generator for demo safety.
// Provides a stable API and never throws.
export function useMonadEvents() {
  const [items, setItems] = useState<AuctionLogItem[]>([]);

  function addManualBid(
    auctionId: number,
    amount: string,
    options: AddBidOptions = { type: 'manual' }
  ) {
    const now = new Date();
    const time = now.toTimeString().slice(0, 8);

    const entry: AuctionLogItem = {
      time,
      auctionLabel: auctionId === 1 ? 'A' : 'B',
      type: options.type ?? 'manual',
      amount,
      agentName: options.agentName,
    };

    // Always succeed, never throw
    setItems((prev) => [entry, ...prev].slice(0, 100));
  }

  return { items, addManualBid };
}