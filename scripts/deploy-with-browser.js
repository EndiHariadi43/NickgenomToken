// scripts/deploy-with-browser.js (ESM Format)
import hre from "hardhat";

async function main() {
  console.log("Deploying NGM Token via Binance Wallet...");

  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error("Binance Wallet not found. Please run this script in a browser environment.");
  }

  await window.ethereum.request({ method: 'eth_requestAccounts' });

  const provider = new hre.ethers.BrowserProvider(window.ethereum);
  const signer = provider.getSigner();

  console.log("Deployer address:", await signer.getAddress());

  const NickgenomPermit = await hre.ethers.getContractFactory("NickgenomPermit");
  const ngm = await NickgenomPermit.connect(signer).deploy();
  await ngm.waitForDeployment();

  const address = await ngm.getAddress();
  console.log(`NickgenomPermit deployed to: ${address}`);

  console.log("=== IMPORTANT ===");
  console.log("Save this address to GitHub Secrets:");
  console.log(address);
  console.log("================");

  return address;
}

main()
  .then((address) => {
    console.log("Deployment successful!");
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });