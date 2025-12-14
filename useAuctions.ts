// web/src/hooks/useAuctions.ts
import { useState, useEffect } from 'react';
import type { AuctionView } from '../types/auctions';

export function useActiveAuctions() {
  const [auctions, setAuctions] = useState<AuctionView[]>([]);

  useEffect(() => {
    const now = Math.floor(Date.now() / 1000);
    setAuctions([
      {
        id: 1,
        seller: '0x0000000000000000000000000000000000000000',
        startPrice: BigInt(0.5e18),
        reservePrice: BigInt(1e18),
        highestBid: BigInt(1.24e18),
        endTime: BigInt(now + 60),
        auctionType: 'Standard',
        batchInterval: 0,
      },
      {
        id: 2,
        seller: '0x0000000000000000000000000000000000000000',
        startPrice: BigInt(0.2e18),
        reservePrice: BigInt(0.8e18),
        highestBid: BigInt(0.87e18),
        endTime: BigInt(now + 90),
        auctionType: 'Blitz',
        batchInterval: 1,
      },
    ]);
  }, []);

  return auctions;
}