// web/src/types/auctions.ts

export type AuctionType = 'Standard' | 'Blitz';

export type AuctionView = {
  id: number;
  seller: string;
  startPrice: bigint;
  reservePrice: bigint;
  highestBid: bigint;
  endTime: bigint;
  auctionType: AuctionType;
  batchInterval: number;
};

export type AuctionLogItem = {
  time: string;
  auctionLabel: string;
  type: 'manual' | 'auto';
  amount: string;
  agentName?: string;
};