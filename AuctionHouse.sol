// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AuctionHouse is ReentrancyGuard, Pausable, Ownable {
    enum AuctionType { Standard, Blitz }

    struct Auction {
        address seller;
        address nftContract;
        uint96 tokenId;
        uint128 startPrice;
        uint128 reservePrice;
        uint64 startTime;
        uint64 endTime;
        address highestBidder;
        uint128 highestBid;
        bool settled;
        bool isAutoBid;
        AuctionType auctionType;
        uint32 batchInterval; // seconds, 0 for Standard
    }

    struct AutoBidConfig {
        uint128 maxBudget;    // total escrowed funds agent can use
        uint128 usedBudget;   // currently tied up in winning bids
        uint128 increment;    // step per bid
        uint128 minDelta;     // min improvement vs current highest
        bool    active;
    }

    struct PortfolioCap {
        uint128 maxBudget;
        uint128 used;
    }

    mapping(uint256 => Auction) public auctions;
    mapping(uint256 => mapping(address => AutoBidConfig)) public autoBidConfigs;
    mapping(address => PortfolioCap) public portfolioCaps;

    uint256 public auctionCounter;
    uint256 public constant MIN_BID_INCREMENT = 0.01 ether;
    uint256 public constant PLATFORM_FEE_BPS = 250; // 2.5%
    uint256 public constant ANTI_SNIPING_BUFFER = 10; // seconds
    uint256 public constant MAX_EXTENSIONS = 5;

    event AuctionCreated(
        uint256 indexed auctionId,
        address indexed seller,
        uint256 tokenId,
        uint128 startPrice,
        uint64 endTime
    );
    event BidPlaced(
        uint256 indexed auctionId,
        address indexed bidder,
        uint128 amount,
        bool isAuto
    );
    event AutoBidSet(
        uint256 indexed auctionId,
        address indexed bidder,
        uint128 maxBid,
        uint128 increment
    );
    event AuctionSettled(
        uint256 indexed auctionId,
        address winner,
        uint128 finalPrice
    );
    event AuctionCancelled(uint256 indexed auctionId);
    event AuctionExtended(uint256 indexed auctionId, uint64 newEndTime);
    event PortfolioCapSet(address indexed user, uint128 maxBudget);

    error InvalidAuction();
    error AuctionEnded();
    error BidTooLow();
    error NotSeller();
    error AlreadySettled();
    error AuctionNotEnded();
    error InsufficientEscrow();
    error PortfolioCapExceeded();
    error AuctionPaused();
    error InvalidDuration();
    error InvalidPrice();

    // Emergency pause functions
    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function pauseAuction(uint256 auctionId) external onlyOwner {
        Auction storage auction = auctions[auctionId];
        if (auction.endTime == 0) revert InvalidAuction();
        auction.endTime = uint64(block.timestamp); // End immediately
        emit AuctionCancelled(auctionId);
    }

    // Create single auction
    function createAuction(
        address nftContract,
        uint256 tokenId,
        uint128 startPrice,
        uint128 reservePrice,
        uint64 duration,
        AuctionType auctionType,
        uint32 batchInterval
    ) external whenNotPaused returns (uint256) {
        // Input validation
        if (duration < 300 || duration > 30 days) revert InvalidDuration();
        if (startPrice == 0 || startPrice >= type(uint128).max / 2) revert InvalidPrice();
        if (reservePrice < startPrice) revert InvalidPrice();
        if (auctionType == AuctionType.Blitz && batchInterval < 60) revert InvalidDuration();

        uint256 auctionId = ++auctionCounter;

        auctions[auctionId] = Auction({
            seller: msg.sender,
            nftContract: nftContract,
            tokenId: uint96(tokenId),
            startPrice: startPrice,
            reservePrice: reservePrice,
            startTime: uint64(block.timestamp),
            endTime: uint64(block.timestamp + duration),
            highestBidder: address(0),
            highestBid: 0,
            settled: false,
            isAutoBid: false,
            auctionType: auctionType,
            batchInterval: batchInterval
        });

        emit AuctionCreated(
            auctionId,
            msg.sender,
            tokenId,
            startPrice,
            uint64(block.timestamp + duration)
        );

        return auctionId;
    }

    // Batch create (gas-friendlier inline loop)
    function createAuctionBatch(
        address[] calldata nftContracts,
        uint256[] calldata tokenIds,
        uint128[] calldata startPrices,
        uint128[] calldata reservePrices,
        uint64 duration,
        AuctionType auctionType,
        uint32 batchInterval
    ) external returns (uint256[] memory) {
        uint256 len = nftContracts.length;
        require(
            len == tokenIds.length &&
                len == startPrices.length &&
                len == reservePrices.length,
            "Length mismatch"
        );

        uint256[] memory ids = new uint256[](len);

        for (uint256 i = 0; i < len; i++) {
            uint256 auctionId = ++auctionCounter;

            auctions[auctionId] = Auction({
                seller: msg.sender,
                nftContract: nftContracts[i],
                tokenId: uint96(tokenIds[i]),
                startPrice: startPrices[i],
                reservePrice: reservePrices[i],
                startTime: uint64(block.timestamp),
                endTime: uint64(block.timestamp + duration),
                highestBidder: address(0),
                highestBid: 0,
                settled: false,
                isAutoBid: false,
                auctionType: auctionType,
                batchInterval: batchInterval
            });

            emit AuctionCreated(
                auctionId,
                msg.sender,
                tokenIds[i],
                startPrices[i],
                uint64(block.timestamp + duration)
            );

            ids[i] = auctionId;
        }

        return ids;
    }

    // Manual bid with ETH
    function placeBid(uint256 auctionId) external payable whenNotPaused nonReentrant {
        Auction storage auction = auctions[auctionId];

        if (auction.seller == address(0)) revert InvalidAuction();
        if (block.timestamp >= auction.endTime) revert AuctionEnded();

        uint128 minBid = auction.highestBid > 0
            ? auction.highestBid + uint128(MIN_BID_INCREMENT)
            : auction.startPrice;

        if (msg.value < minBid) revert BidTooLow();

        // Check portfolio cap
        PortfolioCap storage cap = portfolioCaps[msg.sender];
        uint128 previousBid = 0;
        if (auction.highestBidder == msg.sender) {
            previousBid = auction.highestBid;
        }
        uint128 netIncrease = uint128(msg.value) - previousBid;
        if (cap.maxBudget > 0 && cap.used + netIncrease > cap.maxBudget) {
            revert PortfolioCapExceeded();
        }

        // Anti-sniping: extend if bid in last buffer
        uint64 originalEndTime = auction.endTime;
        if (block.timestamp > auction.endTime - ANTI_SNIPING_BUFFER) {
            uint64 maxEndTime = auction.startTime + uint64(auction.endTime - auction.startTime + MAX_EXTENSIONS * ANTI_SNIPING_BUFFER);
            auction.endTime = uint64(block.timestamp + ANTI_SNIPING_BUFFER);
            if (auction.endTime > maxEndTime) {
                auction.endTime = maxEndTime;
            }
            if (auction.endTime != originalEndTime) {
                emit AuctionExtended(auctionId, auction.endTime);
            }
        }

        // Refund previous highest bidder
        if (auction.highestBidder != address(0)) {
            payable(auction.highestBidder).transfer(auction.highestBid);
            // Adjust portfolio used for previous bidder
            PortfolioCap storage prevCap = portfolioCaps[auction.highestBidder];
            if (prevCap.maxBudget > 0) {
                prevCap.used -= auction.highestBid;
            }
        }

        auction.highestBidder = msg.sender;
        auction.highestBid = uint128(msg.value);
        auction.isAutoBid = false;

        // Update portfolio used
        if (cap.maxBudget > 0) {
            cap.used += netIncrease;
        }

        emit BidPlaced(auctionId, msg.sender, uint128(msg.value), false);

        _processAutoBids(auctionId);
    }

    // Set portfolio cap
    function setPortfolioCap(uint128 maxBudget) external {
        PortfolioCap storage cap = portfolioCaps[msg.sender];
        // If reducing cap, check if current used exceeds new max
        if (maxBudget < cap.used) {
            revert PortfolioCapExceeded();
        }
        cap.maxBudget = maxBudget;
        emit PortfolioCapSet(msg.sender, maxBudget);
    }
    // Set auto-bid config
    function setAutoBid(
        uint256 auctionId,
        uint128 maxBudget,
        uint128 increment,
        uint128 minDelta
    ) external payable {
        if (msg.value < maxBudget) revert InsufficientEscrow();

        Auction storage auction = auctions[auctionId];
        if (auction.seller == address(0)) revert InvalidAuction();
        if (block.timestamp >= auction.endTime) revert AuctionEnded();

        AutoBidConfig storage cfg = autoBidConfigs[auctionId][msg.sender];
        // If overwriting, handle old escrow
        if (cfg.active && cfg.maxBudget > 0) {
            // Refund unused portion
            uint128 unused = cfg.maxBudget - cfg.usedBudget;
            if (unused > 0) {
                payable(msg.sender).transfer(unused);
            }
        }
        cfg.maxBudget = maxBudget;
        cfg.usedBudget = 0;
        cfg.increment = increment;
        cfg.minDelta = minDelta;
        cfg.active = true;

        emit AutoBidSet(auctionId, msg.sender, maxBudget, increment);
    }

    // Disable auto-bid and withdraw unused escrow
    function disableAutoBid(uint256 auctionId) external {
        AutoBidConfig storage cfg = autoBidConfigs[auctionId][msg.sender];
        if (!cfg.active) return;

        cfg.active = false;
        uint128 unused = cfg.maxBudget - cfg.usedBudget;
        if (unused > 0) {
            payable(msg.sender).transfer(unused);
        }
        cfg.usedBudget = 0; // Reset for safety
    }

    // Step auto-bid for a specific agent (anyone can call)
    function stepAutoBid(uint256 auctionId, address agent) external {
        Auction storage auction = auctions[auctionId];
        if (auction.seller == address(0) || block.timestamp >= auction.endTime) return;

        AutoBidConfig storage cfg = autoBidConfigs[auctionId][agent];
        if (!cfg.active) return;

        uint128 currentHighest = auction.highestBid;
        uint128 targetBid = currentHighest + cfg.increment;
        if (targetBid - currentHighest < cfg.minDelta) {
            targetBid = currentHighest + cfg.minDelta;
        }

        uint128 available = cfg.maxBudget - cfg.usedBudget;
        if (targetBid > available) return; // Not enough budget

        // Check if this would be a winning bid
        if (targetBid > currentHighest) {
            // Simulate placing the bid (in real implementation, this would call placeBid)
            // For now, just update state
            auction.highestBidder = agent;
            auction.highestBid = targetBid;
            auction.isAutoBid = true;
            cfg.usedBudget += targetBid;

            emit BidPlaced(auctionId, agent, targetBid, true);
        }
    }

    // Withdraw unused escrow after auction settles
    function withdrawUnusedEscrow(uint256 auctionId) external {
        Auction storage auction = auctions[auctionId];
        if (!auction.settled) revert AuctionNotEnded();

        AutoBidConfig storage cfg = autoBidConfigs[auctionId][msg.sender];
        if (!cfg.active) return;

        uint128 unused = cfg.maxBudget - cfg.usedBudget;
        if (unused > 0) {
            cfg.usedBudget = cfg.maxBudget; // Mark as withdrawn
            payable(msg.sender).transfer(unused);
        }
    }

    // Internal: basic, fair-ish auto-bid loop
    function _processAutoBids(uint256 auctionId) internal {
        Auction storage auction = auctions[auctionId];
        if (auction.seller == address(0)) return;
        if (block.timestamp >= auction.endTime) return;

        // Simple loop with guard to avoid infinite iteration
        // For demo: small numbers of auto-bidders per auction.
        bool bidPlaced = true;
        uint256 safetyCounter = 0;

        while (bidPlaced && safetyCounter < 32) {
            bidPlaced = false;
            safetyCounter++;

            // NOTE: For demo simplicity, iterate over a fixed small set of known agents off-chain
            // and call a public function like stepAutoBid(auctionId, agentAddress)
            // Instead of scanning mapping. Here, we only show pattern; real selection can be done off-chain.
            // To keep this contract simple and parallel-friendly, we won't implement a full search.
            break;
        }
    }

    function settleAuction(uint256 auctionId) external whenNotPaused nonReentrant {
        Auction storage auction = auctions[auctionId];

        if (auction.seller == address(0)) revert InvalidAuction();
        if (block.timestamp < auction.endTime) revert AuctionNotEnded();
        if (auction.settled) revert AlreadySettled();

        auction.settled = true;

        if (
            auction.highestBidder != address(0) &&
            auction.highestBid >= auction.reservePrice
        ) {
            uint256 fee = (auction.highestBid * PLATFORM_FEE_BPS) / 10000;
            uint256 sellerAmount = auction.highestBid - fee;

            payable(auction.seller).transfer(sellerAmount);

            emit AuctionSettled(
                auctionId,
                auction.highestBidder,
                auction.highestBid
            );
        } else {
            if (auction.highestBidder != address(0)) {
                payable(auction.highestBidder).transfer(auction.highestBid);
                // Adjust portfolio used
                PortfolioCap storage bidderCap = portfolioCaps[auction.highestBidder];
                if (bidderCap.maxBudget > 0) {
                    bidderCap.used -= auction.highestBid;
                }
            }
            emit AuctionCancelled(auctionId);
        }

        // NOTE: For a production version, unused auto-bid escrow should be withdrawable
        // via a dedicated withdraw function. For a time-limited hackathon demo,
        // consider modeling agents as off-chain (DemoAgents.js) instead.
    }

    // Simple views for frontend

    function getAuction(
        uint256 auctionId
    ) external view returns (Auction memory) {
        return auctions[auctionId];
    }

    function getActiveAuctions()
        external
        view
        returns (uint256[] memory)
    {
        uint256 count;
        for (uint256 i = 1; i <= auctionCounter; i++) {
            Auction storage a = auctions[i];
            if (!a.settled && block.timestamp < a.endTime) {
                count++;
            }
        }

        uint256[] memory active = new uint256[](count);
        uint256 idx;
        for (uint256 i = 1; i <= auctionCounter; i++) {
            Auction storage a2 = auctions[i];
            if (!a2.settled && block.timestamp < a2.endTime) {
                active[idx++] = i;
            }
        }
        return active;
    }
}
