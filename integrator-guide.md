# Integrator Guide

This guide shows how other contracts and systems can integrate with BidStream's auction infrastructure.

## Contract Integration

### Basic Auction Creation

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./interfaces/IAuctionHouse.sol";

contract NFTMarketplace {
    IAuctionHouse public auctionHouse;

    constructor(address _auctionHouse) {
        auctionHouse = IAuctionHouse(_auctionHouse);
    }

    function createAuction(
        address nftContract,
        uint256 tokenId,
        uint128 startPrice,
        uint128 reservePrice,
        uint64 duration
    ) external returns (uint256) {
        // Transfer NFT to auction house
        IERC721(nftContract).transferFrom(msg.sender, address(auctionHouse), tokenId);

        // Create auction
        return auctionHouse.createAuction(
            nftContract,
            tokenId,
            startPrice,
            reservePrice,
            duration,
            IAuctionHouse.AuctionType.Standard,
            0
        );
    }
}
```

### Advanced Integration with Agents

```solidity
contract AdvancedMarketplace {
    IAuctionHouse public auctionHouse;

    function createAuctionWithAgents(
        address nftContract,
        uint256 tokenId,
        uint128 startPrice,
        uint128 reservePrice,
        uint64 duration,
        address[] calldata agents,
        uint128[] calldata budgets
    ) external returns (uint256) {
        require(agents.length == budgets.length, "Mismatched arrays");

        // Transfer NFT
        IERC721(nftContract).transferFrom(msg.sender, address(auctionHouse), tokenId);

        // Create auction
        uint256 auctionId = auctionHouse.createAuction(
            nftContract,
            tokenId,
            startPrice,
            reservePrice,
            duration,
            IAuctionHouse.AuctionType.Standard,
            0
        );

        // Configure agents
        for (uint i = 0; i < agents.length; i++) {
            // Note: Agents would need to approve and fund themselves
            // This is just for illustration
        }

        return auctionId;
    }
}
```

## Frontend Integration

### Wagmi/React Integration

```typescript
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { AUCTION_HOUSE_ABI } from './abis';

function CreateAuctionButton() {
    const { config } = usePrepareContractWrite({
        address: AUCTION_HOUSE_ADDRESS,
        abi: AUCTION_HOUSE_ABI,
        functionName: 'createAuction',
        args: [
            nftContract,
            tokenId,
            startPrice,
            reservePrice,
            duration,
            0, // Standard auction
            0  // No batch interval
        ]
    });

    const { write } = useContractWrite(config);

    return (
        <button onClick={() => write?.()}>
            Create Auction
        </button>
    );
}
```

### Real-time Auction Monitoring

```typescript
import { useContractEvent } from 'wagmi';

function AuctionMonitor({ auctionId }: { auctionId: number }) {
    useContractEvent({
        address: AUCTION_HOUSE_ADDRESS,
        abi: AUCTION_HOUSE_ABI,
        eventName: 'BidPlaced',
        listener: (events) => {
            events.forEach((event) => {
                if (event.args.auctionId === auctionId) {
                    console.log('New bid:', event.args);
                    // Update UI
                }
            });
        }
    });

    // Component JSX
}
```

## Agent Development

### Basic Agent Structure

```typescript
import { ethers } from 'ethers';

class AuctionAgent {
    private provider: ethers.Provider;
    private signer: ethers.Signer;
    private auctionHouse: ethers.Contract;

    constructor(rpcUrl: string, privateKey: string, auctionHouseAddress: string) {
        this.provider = new ethers.JsonRpcProvider(rpcUrl);
        this.signer = new ethers.Wallet(privateKey, this.provider);
        this.auctionHouse = new ethers.Contract(auctionHouseAddress, AUCTION_HOUSE_ABI, this.signer);
    }

    async monitorAuction(auctionId: number) {
        // Listen for bid events
        this.auctionHouse.on('BidPlaced', async (eventAuctionId, bidder, amount, isAuto) => {
            if (eventAuctionId === auctionId && !isAuto) {
                await this.evaluateBid(auctionId, amount);
            }
        });
    }

    private async evaluateBid(auctionId: number, currentBid: bigint) {
        // Agent strategy logic here
        const myBid = currentBid + ethers.parseEther('0.1');

        // Check if within budget and constraints
        if (await this.shouldBid(auctionId, myBid)) {
            await this.placeBid(auctionId, myBid);
        }
    }

    private async shouldBid(auctionId: number, bidAmount: bigint): Promise<boolean> {
        // Check agent config, budget, etc.
        const config = await this.auctionHouse.autoBidConfigs(auctionId, await this.signer.getAddress());
        return bidAmount <= config.maxBudget - config.usedBudget;
    }

    private async placeBid(auctionId: number, amount: bigint) {
        const tx = await this.auctionHouse.placeBid(auctionId, { value: amount });
        await tx.wait();
    }
}
```

### Advanced Agent Strategies

```typescript
class SniperAgent extends AuctionAgent {
    private readonly SNIPE_TIME = 30; // seconds before end

    async evaluateBid(auctionId: number, currentBid: bigint) {
        const auction = await this.auctionHouse.auctions(auctionId);
        const timeLeft = auction.endTime - Math.floor(Date.now() / 1000);

        if (timeLeft <= this.SNIPE_TIME) {
            // Snipe with minimal increment
            const snipeBid = currentBid + ethers.parseEther('0.01');
            if (await this.shouldBid(auctionId, snipeBid)) {
                await this.placeBid(auctionId, snipeBid);
            }
        }
    }
}

class ConservativeAgent extends AuctionAgent {
    private readonly MAX_INCREMENT = 0.05; // 5% max increase

    async evaluateBid(auctionId: number, currentBid: bigint) {
        const increment = currentBid * BigInt(Math.floor(this.MAX_INCREMENT * 100)) / 100n;
        const myBid = currentBid + increment;

        if (await this.shouldBid(auctionId, myBid)) {
            await this.placeBid(auctionId, myBid);
        }
    }
}
```

## Analytics Integration

### Fetching Metrics

```typescript
const API_BASE = 'http://localhost:3001';

async function getAuctionMetrics(auctionId: number) {
    const response = await fetch(`${API_BASE}/auctions/${auctionId}/timeline`);
    return response.json();
}

async function getParallelismMetrics() {
    const response = await fetch(`${API_BASE}/metrics/recent-blocks`);
    const data = await response.json();

    // Analyze parallelism
    const parallelBlocks = data.filter(block =>
        block.auctionsUpdated > 1
    );

    return {
        totalBlocks: data.length,
        parallelBlocks: parallelBlocks.length,
        parallelismRatio: parallelBlocks.length / data.length
    };
}
```

### Custom Analytics Dashboard

```typescript
import { useEffect, useState } from 'react';

function ParallelismChart() {
    const [metrics, setMetrics] = useState(null);

    useEffect(() => {
        const fetchMetrics = async () => {
            const data = await getParallelismMetrics();
            setMetrics(data);
        };

        fetchMetrics();
        const interval = setInterval(fetchMetrics, 5000); // Update every 5s

        return () => clearInterval(interval);
    }, []);

    if (!metrics) return <div>Loading...</div>;

    return (
        <div>
            <h3>Parallel Execution Metrics</h3>
            <p>Parallelism Ratio: {(metrics.parallelismRatio * 100).toFixed(1)}%</p>
            <p>Blocks with multiple auctions: {metrics.parallelBlocks}/{metrics.totalBlocks}</p>
        </div>
    );
}
```

## Error Handling

### Contract Errors

```typescript
try {
    const tx = await auctionHouse.placeBid(auctionId, { value: bidAmount });
    await tx.wait();
} catch (error) {
    if (error.message.includes('BidTooLow')) {
        console.error('Bid amount too low');
    } else if (error.message.includes('AuctionEnded')) {
        console.error('Auction has ended');
    } else if (error.message.includes('PortfolioCapExceeded')) {
        console.error('Portfolio cap exceeded');
    } else {
        console.error('Unknown error:', error);
    }
}
```

### Network Errors

```typescript
async function retryOperation(operation: () => Promise<any>, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await operation();
        } catch (error) {
            if (i === maxRetries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        }
    }
}
```

## Best Practices

### Gas Optimization
- Batch operations when possible
- Use appropriate data types
- Minimize storage writes

### Security
- Always validate inputs
- Use reentrancy guards
- Implement proper access controls

### Performance
- Monitor gas usage
- Optimize event logging
- Use efficient data structures

### Testing
- Test all error conditions
- Fuzz test critical functions
- Integration test with mainnet fork