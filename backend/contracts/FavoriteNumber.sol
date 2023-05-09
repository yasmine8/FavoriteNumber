// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
//import "@openzeppelin/upgrades/contracts/Initializable.sol";

// Import ownable from OpenZeppelin contracts
//import "@openzeppelin/contracts-ethereum-package/contracts/ownership/Ownable.sol";


contract FavoriteNumber {
    
    uint private myNumber ;
    // function initialize(address sender) public initializer {
    //     Ownable.initialize(sender);
    // }
    //constructor(uint _x){
    //    myNumber = _x;
    //}

    function setNumber(uint _x) external  {
        myNumber = _x;
    }

    function getNumber() external view   returns (uint) {

        return myNumber;
    }
    function getOwner() external view returns (address) {
        return msg.sender;
    }
    receive() external payable {
       // Wallets[msg.sender] += msg.value;
    }
    fallback() external payable {

    }
}
