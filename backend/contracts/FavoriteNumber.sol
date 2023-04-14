// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract FavoriteNumber is Ownable{
    
    uint private myNumber ;
    
    //constructor(uint _x){
    //    myNumber = _x;
    //}

    function setNumber(uint _x) external onlyOwner {
        myNumber = _x;
    }

    function getNumber() external view onlyOwner()  returns (uint) {

        return myNumber;
    }
    receive() external payable {
       // Wallets[msg.sender] += msg.value;
    }
    fallback() external payable {

    }
}
