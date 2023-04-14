import { ethers } from "hardhat";

async function main() {

  const FavoriteNumber = await ethers.getContractFactory("FavoriteNumber");
  const favoriteNumber = await FavoriteNumber.deploy();

  await favoriteNumber.deployed();

  console.log(
    `FavoriteNumber contract has been deployed to ${favoriteNumber.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
