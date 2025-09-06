const { ethers } = require("hardhat");

async function getContractFactory(contractName) {
  return await ethers.getContractFactory(contractName);
}

async function deployContract(contractName, ...args) {
  const Factory = await getContractFactory(contractName);
  const contract = await Factory.deploy(...args);
  await contract.waitForDeployment();
  return contract;
}

async function getContractAt(contractName, address) {
  const Factory = await getContractFactory(contractName);
  return Factory.attach(address);
}

module.exports = {
  getContractFactory,
  deployContract,
  getContractAt,
};