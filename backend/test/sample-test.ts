import { expect } from "chai";
import { ethers } from "hardhat";

describe("Favorite Number Test", function () {
  
      it('should deploy the smart contract', async function(){

        this.contract = await ethers.getContractFactory("FavoriteNumber");
        this.deployedContract = await this.contract.deploy()
      })

});