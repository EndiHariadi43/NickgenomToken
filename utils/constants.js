const { ethers } = require("hardhat");

module.exports = {
  TOKEN_NAME: "Nickgenom",
  TOKEN_SYMBOL: "NGM",
  TOTAL_SUPPLY: ethers.parseEther("1000000000000"), // 1 triliun NGM
  ZERO_ADDRESS: "0x0000000000000000000000000000000000000000",
};