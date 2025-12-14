# BidStream Architecture

## System Overview

BidStream is a comprehensive auction platform built on Monad that demonstrates parallel execution through real infrastructure. The system consists of on-chain smart contracts, off-chain analytics, and a real-time web dashboard.

## Data Flow Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   User/Agent    │───▶│ AuctionHouse     │───▶│     Events      │
│                 │    │ Contract         │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │                        │
                                ▼                        ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Indexer       │◀───│   SQLite DB      │───▶│  Analytics API  │
│                 │    │                  │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                                       │
                                                       ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│ React Dashboard │◀───│   WebSocket      │◀───│   Real-time     │
│                 │    │   Polling        │    │   Updates       │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## State Isolation for Parallelism

### Storage Layout
Each auction uses completely isolated storage keys:

```solidity
mapping(uint256 => Auction) public auctions;
mapping(uint256 => mapping(address => AutoBidConfig)) public autoBidConfigs;
mapping(address => PortfolioCap) public portfolioCaps;
```

### Why This Enables Parallelism
- **No Cross-Auction Conflicts**: `auctions[1]` and `auctions[2]` are independent storage slots
- **Isolated Agent State**: Agent configs are scoped to specific auctions
- **User-Level Constraints**: Portfolio caps are global but don't conflict with auction state
- **Zero Shared State**: No global counters or shared mappings that could cause conflicts

### Monad Parallel Execution
When two auctions receive bids in the same block:
1. Monad's optimistic parallel execution processes both transactions simultaneously
2. Each transaction only touches its auction's isolated storage
3. No conflicts occur because storage keys don't overlap
4. Both auctions update in the same block, proving parallelism

## Contract Security

### Reentrancy Protection
All state-changing functions use OpenZeppelin's `nonReentrant` modifier:
- `placeBid()` - Prevents reentrancy during ETH transfers
- `settleAuction()` - Protects settlement logic
- `setAutoBid()` - Guards escrow operations

### Emergency Controls
- **Global Pause**: Owner can pause all contract functions
- **Auction Pause**: Owner can immediately end specific auctions
- **Input Validation**: Comprehensive checks on all parameters

### Access Control
- Owner-only emergency functions
- User-controlled agent configurations
- Transparent fee structure (2.5% platform fee)

## Agent Economy Design

### On-Chain Configuration
```solidity
struct AutoBidConfig {
    uint128 maxBudget;    // Total escrowed funds
    uint128 usedBudget;   // Currently tied up
    uint128 increment;    // Bid step size
    uint128 minDelta;     // Minimum improvement
    bool active;          // Enable/disable
}
```

### Off-Chain Execution
Agents run externally and monitor on-chain state:
1. Poll for new bids on configured auctions
2. Calculate optimal bid based on strategy
3. Submit transaction if within budget and constraints
4. Track performance for leaderboard

### Safety Mechanisms
- **Escrow System**: Funds locked on-chain before bidding
- **Budget Caps**: Prevents over-bidding
- **Portfolio Limits**: Cross-auction budget constraints
- **Refund Logic**: Unused escrow returned after auction

## Analytics Pipeline

### Data Ingestion
The indexer continuously monitors:
- New blocks and transactions
- Auction contract events
- Bid placements and settlements
- Agent activity patterns

### Metrics Calculated
- Auctions updated per block
- Bid distribution (manual vs agent)
- Block utilization efficiency
- Agent performance statistics

### API Endpoints
- `/metrics/summary` - Rolling averages
- `/metrics/recent-blocks` - Per-block data
- `/auctions/:id/timeline` - Auction history

## Integration Guide

### Creating Auctions Programmatically
```solidity
IAuctionHouse auctionHouse = IAuctionHouse(AUCTION_HOUSE_ADDRESS);

uint256 auctionId = auctionHouse.createAuction(
    nftContract,
    tokenId,
    1 ether,        // startPrice
    5 ether,        // reservePrice
    1 hours,        // duration
    AuctionType.Standard,
    0               // batchInterval
);
```

### Monitoring Auctions
```javascript
// Listen for events
auctionHouse.on('BidPlaced', (auctionId, bidder, amount, isAuto) => {
    console.log(`Bid: ${amount} on auction ${auctionId}`);
});

// Query auction state
const auction = await auctionHouse.auctions(auctionId);
```

### Agent Integration
```javascript
// Set agent config
await auctionHouse.setAutoBid(auctionId, {
    maxBudget: ethers.parseEther('10'),
    increment: ethers.parseEther('0.1'),
    minDelta: ethers.parseEther('0.05')
}, { value: ethers.parseEther('10') });
```

## Performance Considerations

### Block Time Optimization
- Designed for Monad's ~400ms block time
- Anti-sniping rules prevent micro-second races
- Batch auctions align with block intervals

### Gas Efficiency
- Minimal storage operations per bid
- Efficient event logging
- Optimized struct layouts

### Scalability
- Isolated state enables horizontal scaling
- No global state bottlenecks
- Parallel execution reduces effective latency