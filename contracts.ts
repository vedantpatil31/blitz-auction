import AuctionHouseAbi from './AuctionHouse.abi.json';

// Demo-safe: hardcode placeholder address to avoid undefined env issues
export const AUCTION_HOUSE_ADDRESS =
  '0x0000000000000000000000000000000000000000' as const;

export const auctionHouseContract = {
  address: AUCTION_HOUSE_ADDRESS,
  abi: AuctionHouseAbi,
} as const;