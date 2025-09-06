// scripts/deploy.js (ESM Format)
import hre from "hardhat";

async function main() {
  console.log("Deploying NickgenomPermit contract...");
  
  const NickgenomPermit = await hre.ethers.getContractFactory("NickgenomPermit");
  const ngm = await NickgenomPermit.deploy();
  await ngm.waitForDeployment();
  
  const address = await ngm.getAddress();
  console.log(`NickgenomPermit deployed to: ${address}`);
  
  console.log("Verifying contract on BscScan...");
  try {
    await hre.run("verify:verify", {
      address: address,
      contract: "contracts/token/NickgenomPermit.sol:NickgenomPermit",
      constructorArguments: [],
    });
    console.log("Contract verified successfully!");
  } catch (error) {
    console.error("Verification failed:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });