require("@nomicfoundation/hardhat-verify");

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: { optimizer: { enabled: true, runs: 200 } },
  },
  networks: {
    bsc: { url: "https://bsc-dataseed.binance.org" },
    bscTestnet: { url: "https://data-seed-prebsc-1-s1.bnbchain.org:8545" },
  },
  etherscan: {
    apiKey: {
      bsc: process.env.BSCSCAN_API_KEY,
      bscTestnet: process.env.BSCSCAN_API_KEY,
    },
    customChains: [
      { network: "bsc", chainId: 56,
        urls: { apiURL: "https://api.bscscan.com/api", browserURL: "https://bscscan.com" } },
      { network: "bscTestnet", chainId: 97,
        urls: { apiURL: "https://api-testnet.bscscan.com/api", browserURL: "https://testnet.bscscan.com" } }
    ],
  },
};
