const { ethers } = require('ethers');

// Configuration
const RPC_URL = process.env.MONAD_RPC || 'https://testnet.monad.xyz';
const CONTRACT_ADDRESS = process.env.AUCTION_HOUSE_ADDRESS; // Set after deployment
const PRIVATE_KEYS = [
    process.env.PRIVATE_KEY_1,
    process.env.PRIVATE_KEY_2,
    process.env.PRIVATE_KEY_3,
    // Add more for multiple agents
];

const AUCTION_ABI = [
    "function createAuction(uint256,uint256) external",
    "function placeBid(uint256) external payable",
    "function getAuction(uint256) view returns (tuple(address,uint256,uint256,uint256,bool,uint256))",
    "event BidPlaced(uint256 indexed,address indexed,uint256)"
];

async function runDemoAgents() {
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, AUCTION_ABI, provider);

    // Create an auction
    const signer = new ethers.Wallet(PRIVATE_KEYS[0], provider);
    const contractWithSigner = contract.connect(signer);
    const tx = await contractWithSigner.createAuction(ethers.utils.parseEther('1'), 300); // 1 ETH reserve, 5 min
    await tx.wait();
    console.log('Auction created');

    // Simulate competing bids
    for (let i = 0; i < PRIVATE_KEYS.length; i++) {
        const wallet = new ethers.Wallet(PRIVATE_KEYS[i], provider);
        const contractAgent = contract.connect(wallet);

        setInterval(async () => {
            try {
                const auction = await contract.getAuction(1);
                const currentBid = auction[2]; // highestBid
                const newBid = currentBid.add(ethers.utils.parseEther('0.1'));
                const tx = await contractAgent.placeBid(1, { value: newBid });
                await tx.wait();
                console.log(`Agent ${i} bid ${ethers.utils.formatEther(newBid)} ETH`);
            } catch (e) {
                // Ignore errors (e.g., bid too low)
            }
        }, 1000 + Math.random() * 2000); // Random interval
    }
}

runDemoAgents().catch(console.error);