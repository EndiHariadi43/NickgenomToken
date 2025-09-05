require("@nomicfoundation/hardhat-verify");
require("dotenv").config();

const maybeAccounts = process.env.PRIVATE_KEY
  ? [process.env.PRIVATE_KEY]
  : undefined; // <-- kalau tidak ada PRIVATE_KEY, jangan set accounts

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: { enabled: false, runs: 200 },
      evmVersion: "london",
      viaIR: false,
    },
  },
  networks: {
    bsc: {
      url: "https://bsc-dataseed.binance.org",
      chainId: 56,
      accounts: maybeAccounts, // <-- aman jika undefined
    },
    bscTestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      accounts: maybeAccounts,
    },
  },
  etherscan: {
    apiKey: {
      bsc: process.env.BSCSCAN_API_KEY,
      bscTestnet: process.env.BSCSCAN_API_KEY,
    },
  },
  sourcify: { enabled: false }, // hanya untuk hilangkan pesan info
};
