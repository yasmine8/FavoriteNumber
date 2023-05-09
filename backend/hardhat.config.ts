import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config();

const API_KEY = process.env.RPC_URL || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY  || "";

const config: HardhatUserConfig = {
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {
      chainId: 1337 // We set 1337 to make interacting with MetaMask simpler
    },
    sepolia :{
      url: API_KEY,
      accounts: [PRIVATE_KEY]
    }
  },
  solidity: "0.8.18",
};

export default config;
