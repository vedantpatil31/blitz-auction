# BidStream – Monad Blitz Auction House

**What this is**: A comprehensive Monad-native auction platform demonstrating parallel execution through real infrastructure, agent economy, and advanced market design. Positioned as a reference implementation for Monad's parallel EVM capabilities.

**How it works**: Two independent auctions (A and B) running simultaneously with manual bids, automated agents, and real-time analytics proving Monad's parallel execution through isolated storage keys.

## Market Design

### Auction Formats
- **Standard English Auction**: Traditional ascending price auction with start price, reserve price, and end time. Highest bid at close wins if reserve is met.
- **Blitz Frequent Batch Auction**: Inspired by Budish-Cramton-Shim frequent batch auctions for HFT. Bids in discrete 1-2 second slices are cleared at uniform price, reducing speed-based arms races and aligning with low-latency block times.

### Fairness Features
- **Anti-Sniping Rule**: Auctions extend by 10 seconds (max 5 extensions) if a bid is placed in the last 10 seconds, preventing last-second sniping without infinite delays.
- **Transparent Reserves**: Clear indication of reserve status (met/not met). Funds refunded if reserve not met at settlement.

### Cross-Auction Portfolio Constraints
- **Portfolio-Capped Bidding**: Users can set a global budget cap across multiple auctions, ensuring they never overcommit. Prevents overbidding in correlated auctions.

### Agent Economy
- **On-chain Agent Configs**: Clean escrow system with `maxBudget`, `usedBudget`, `increment`, `minDelta`
- **Off-chain Runners**: Transparent agent scripts anyone can run and modify
- **Performance Tracking**: Leaderboard for agent wins, volume, and ROI
- **Strategy Sharing**: Framework for copy-trading agent configurations

## Parallelism & Architecture

BidStream demonstrates Monad's optimistic parallel execution through real-time analytics:

- **State Design**: Each auction at `auctions[auctionId]` creates isolated storage keys
- **Conflict-Free**: Transactions on different `auctionId`s run in parallel with zero conflicts
- **Live Metrics**: Analytics API tracks auctions updated per block, proving parallelism
- **Dashboard**: Real-time charts show multiple auctions settling in same blocks

When demoing, watch the Parallelism Dashboard - blocks where both Auction A and B update simultaneously prove Monad's parallel execution in action.

## How to Run

### Prerequisites
- Node.js 18+
- Foundry
- Access to Monad testnet (RPC endpoint)

### Quick Start
```bash
# Install dependencies
npm install
cd web && npm install
cd ../contracts && forge install

# Deploy contracts to Monad testnet
npm run deploy

# Start the web dashboard
npm run dev:web

# Optional: Run analytics infrastructure
npx ts-node scripts/indexer.ts &
npx ts-node scripts/analytics-api.ts &
```

### Demo Steps
1. **Deploy Contracts**: `npm run deploy` (requires MONAD_RPC and PRIVATE_KEY)
2. **Start Frontend**: `npm run dev:web` → Open http://localhost:3000
3. **Connect Wallet**: Place manual bids and observe real-time updates
4. **Run Agents**: `node contracts/script/DemoAgents.js` for automated bidding
5. **Monitor Parallelism**: Watch analytics dashboard for parallel execution metrics

## Development

### Contract Development
```bash
cd contracts
forge test                    # Run tests
forge build                   # Compile contracts
forge script script/Deploy.s.sol --rpc-url $MONAD_RPC_URL --private-key $PRIVATE_KEY --broadcast
```

### Frontend Development
```bash
cd web
npm run dev                   # Start dev server
npm run build                 # Build for production
```

### Scripts
- `scripts/indexer.ts`: On-chain data ingestion to SQLite
- `scripts/analytics-api.ts`: REST API serving metrics
- `scripts/agent-runner.ts`: Off-chain agent execution

## Security & Testing

### Contract Security
- **Reentrancy Protection**: OpenZeppelin's ReentrancyGuard on all state-changing functions
- **Emergency Pause**: Owner can pause all auctions or specific auctions
- **Input Validation**: Comprehensive checks on prices, durations, and parameters
- **Access Control**: Owner-only emergency functions

### Test Coverage
```bash
cd contracts
forge test                    # Run all tests
forge test --match testFuzz   # Run fuzz tests
```

Tests include:
- Normal auction flow (create → bid → settle)
- Anti-sniping edge cases and extension limits
- Agent escrow budget management and refunds
- Portfolio cap enforcement
- Emergency pause functionality
- Fuzz tests on bid amounts and auction parameters

## Architecture

### Data Flow
```
User/Agent → AuctionHouse Contract → Events
    ↓
Indexer → SQLite Database → Analytics API
    ↓
React Dashboard ← WebSocket/Polling ← Analytics API
```

### State Isolation
Each auction uses independent storage slots:
- `auctions[auctionId]` - Auction data
- `autoBidConfigs[auctionId][bidder]` - Agent configs
- `portfolioCaps[user]` - Cross-auction budgets

This design enables zero-conflict parallel execution on Monad.

## API Reference

### Analytics API
- `GET /metrics/summary` - Rolling averages and totals
- `GET /metrics/recent-blocks` - Per-block auction metrics
- `GET /auctions/:id/timeline` - Auction event timeline

### Contract Interface
See `web/src/utils/AuctionHouse.abi.json` for complete ABI.

## Contributing

This is a reference implementation for Monad's parallel EVM. Contributions welcome for:
- Additional auction formats
- Enhanced agent strategies
- Improved analytics and monitoring
- Integration with other Monad protocols

## License

MIT

# Terminal 2: Serve analytics API
npx ts-node scripts/analytics-api.ts
```

API endpoints:
- `GET /metrics/summary` - Rolling averages and totals
- `GET /metrics/recent-blocks` - Per-block metrics
- `GET /auctions/:id/timeline` - Auction event timeline

## How to run

1. Install deps

```
pnpm install
cd web && pnpm install
```

2. Deploy contracts (Monad Testnet)

```
cd contracts
forge test
forge script script/Deploy.s.sol:Deploy --rpc-url $MONAD_RPC_URL --private-key $PRIVATE_KEY --broadcast
```

3. Update web env

Set `NEXT_PUBLIC_AUCTION_HOUSE_ADDRESS` in `web/.env.local`.

4. Start frontend

```
cd web
pnpm dev
```
- Real-time event polling for live updates
- Wagmi + RainbowKit for wallet integration
- Dashboard with auction cards, live log, and performance metrics
- Dark/glass theme with Tailwind CSS

### Off-chain Components
- Demo agents in JavaScript to generate bid traffic
- Setup scripts for easy deployment

## Demo Steps

1. **Install Dependencies**
   ```bash
   npm install
   cd web && npm install
   cd ../contracts && forge install
   ```

2. **Deploy Contracts to Monad Testnet**
   ```bash
   npm run deploy
   ```
   Ensure `MONAD_RPC` and `PRIVATE_KEY` environment variables are set.

3. **Start Demo Agents**
   ```bash
   node contracts/script/DemoAgents.js
   ```
   This launches multiple agents competing in auctions.

4. **Launch Web Dashboard**
   ```bash
   npm run dev:web
   ```
   Open http://localhost:3000/dashboard to view live auctions.

5. **Monitor and Interact**
   - Connect wallet to place manual bids
   - Observe real-time updates and metrics
   - Watch auto-bidding in action

## Requirements
- Node.js 18+
- Foundry
- Access to Monad testnet (RPC endpoint)
- Wallet with testnet MON tokens

## Development Scripts
- `npm run dev:contracts`: Build contracts
- `npm run test:contracts`: Run tests
- `npm run dev:web`: Start web dev server