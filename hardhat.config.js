require('dotenv/config');
require('@nomicfoundation/hardhat-verify');
require('@nomicfoundation/hardhat-toolbox');
const { BSCSCAN_API_KEY, BSC_RPC_URL, BSC_TESTNET_RPC_URL } = process.env;

module.exports = {
  solidity: {
    version: '0.8.20',
    settings: {
      optimizer: { 
        enabled: true,
        runs: 200 
      },
      evmVersion: 'london',
    },
  },
  networks: {
    bsc: {
      url: BSC_RPC_URL || 'https://bsc-dataseed.binance.org',
      chainId: 56,
      gasPrice: 5 * 10**9, // 5 Gwei
      gas: 2000000,
    },
    bscTestnet: {
      url: BSC_TESTNET_RPC_URL || 'https://data-seed-prebsc-1-s1.binance.org:8545',
      chainId: 97,
    },
  },
  etherscan: { 
    apiKey: BSCSCAN_API_KEY 
  },
  sourcify: { 
    enabled: true 
  },
  plugins: ['solidity-coverage'],
};