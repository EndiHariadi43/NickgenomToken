// hardhat.config.js
require('dotenv/config');                // cukup sekali, cara singkat
require('@nomicfoundation/hardhat-verify');

const { BSCSCAN_API_KEY, PRIVATE_KEY, BSC_RPC_URL, BSC_TESTNET_RPC_URL } = process.env;

module.exports = {
  solidity: {
    version: '0.8.20',
    settings: {
      optimizer: { enabled: false, runs: 200 },
      evmVersion: 'london',
    },
  },
  networks: {
    bsc: {
      url: BSC_RPC_URL || 'https://bsc-dataseed.binance.org',
      chainId: 56,
      // verifikasi TIDAK butuh key; biarkan undefined kalau tidak ada
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : undefined,
    },
    bscTestnet: {
      url: BSC_TESTNET_RPC_URL || 'https://data-seed-prebsc-1-s1.binance.org:8545',
      chainId: 97,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : undefined,
    },
  },
  // bentuk string berlaku untuk bsc & bscTestnet (lebih simpel)
  etherscan: { apiKey: BSCSCAN_API_KEY },
  sourcify: { enabled: false },
};
