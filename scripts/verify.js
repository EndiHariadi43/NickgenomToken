// scripts/verify.js (ESM Format)
import hre from "hardhat";

async function main() {
  const contractAddress = process.env.CONTRACT_ADDRESS;
  if (!contractAddress) {
    console.error("Please set CONTRACT_ADDRESS in .env");
    process.exit(1);
  }

  console.log(`Verifying contract at ${contractAddress}...`);
  
  try {
    await hre.run("verify:verify", {
      address: contractAddress,
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