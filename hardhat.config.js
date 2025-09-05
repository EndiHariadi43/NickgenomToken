require("@nomicfoundation/hardhat-verify");

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: { enabled: false, runs: 200 }, // sama: optimizer OFF
      viaIR: false,                              // default Remix
      evmVersion: "london",
      metadata: { bytecodeHash: "ipfs" }        // default Remix/solc
    }
  },
  networks: {
    bsc: { url: "https://bsc-dataseed.binance.org", accounts: [process.env.PRIVATE_KEY] },
    bscTestnet: { url: "https://data-seed-prebsc-1-s1.binance.org:8545", accounts: [process.env.PRIVATE_KEY] }
  },
  etherscan: {
    apiKey: {
      bsc: process.env.BSCSCAN_API_KEY,
      bscTestnet: process.env.BSCSCAN_API_KEY,
    }
  }
};
