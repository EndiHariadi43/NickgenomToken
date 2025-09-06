const hre = require("hardhat");

async function main() {
  const contractAddress = process.env.CONTRACT_ADDRESS;
  if (!contractAddress) {
    console.error("Please set CONTRACT_ADDRESS in .env");
    process.exit(1);
  }

  const [signer] = await hre.ethers.getSigners();
  
  const NickgenomPermit = await hre.ethers.getContractFactory("NickgenomPermit");
  const ngm = NickgenomPermit.attach(contractAddress);
  
  console.log("Interacting with NickgenomPermit at", contractAddress);
  
  // Get token info
  const name = await ngm.name();
  const symbol = await ngm.symbol();
  const totalSupply = await ngm.totalSupply();
  
  console.log(`Name: ${name}`);
  console.log(`Symbol: ${symbol}`);
  console.log(`Total Supply: ${totalSupply.toString()}`);
  
  // Get balance of signer
  const balance = await ngm.balanceOf(signer.address);
  console.log(`Your balance: ${balance.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });