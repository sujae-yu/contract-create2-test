import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import '@nomicfoundation/hardhat-ethers';
import '@openzeppelin/hardhat-upgrades';
import dotenv from 'dotenv';

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    xpla_testnet: {
      url: process.env.XPLA_TESTNET_ENDPOINT,
      accounts: [process.env.PRIVATE_KEY ?? ""] 
    },
    bsc_testnet: {
      url: process.env.BSC_TESTNET_ENDPOINT,
      accounts: [process.env.PRIVATE_KEY ?? ""] 
    },
    xpl_localnet: {
      url: process.env.XPLA_LOCAL_ENDPOINT,
      accounts: [process.env.PRIVATE_KEY ?? ""]
    },
  }
};

export default config;
