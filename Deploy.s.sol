// contracts/script/Deploy.s.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/AuctionHouse.sol";

contract Deploy is Script {
    function run() external {
        uint256 pk = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(pk);

        AuctionHouse auctionHouse = new AuctionHouse();

        console.log("AuctionHouse deployed at:", address(auctionHouse));

        vm.stopBroadcast();
    }
}