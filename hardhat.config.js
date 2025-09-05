require('dotenv').config();
require('@nomicfoundation/hardhat-verify');

try { require('dotenv').config(); } catch (e) {}
try { require('dotenv').config(); } catch (e) {}
const { BSCSCAN_API_KEY, PRIVATE_KEY, BSC_RPC_URL, BSC_TESTNET_RPC_URL } = process.env;

module.exports = {
  solidity: { version: "0.8.20", settings: { optimizer: { enabled: false, runs: 200 }, evmVersion: "london" } },
  networks: {
    bsc: {
      url: BSC_RPC_URL || "https://bsc-dataseed.binance.org",
      chainId: 56,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : []
    },
    bscTestnet: {
      url: BSC_TESTNET_RPC_URL || "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : []
    }
  },
  etherscan: {
    apiKey: {
      bsc: BSCSCAN_API_KEY,
      bscTestnet: BSCSCAN_API_KEY
    }
  },
  sourcify: { enabled: false }
};
