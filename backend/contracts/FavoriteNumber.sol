// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
//import "@openzeppelin/upgrades/contracts/Initializable.sol";

// Import ownable from OpenZeppelin contracts
//import "@openzeppelin/contracts-ethereum-package/contracts/ownership/Ownable.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

contract FavoriteNumber is Ownable {
    
    uint private myNumber ;
    // function initialize(address sender) public initializer {
    //     Ownable.initialize(sender);
    // }
    //constructor(uint _x){
    //    myNumber = _x;
    //}

    function setNumber(uint _x) external onlyOwner  {
        myNumber = _x;
    }

    function getNumber() external view   returns (uint) {

        return myNumber;
    }
    
    receive() external payable {
       // Wallets[msg.sender] += msg.value;
    }
    fallback() external payable {

    }
}
