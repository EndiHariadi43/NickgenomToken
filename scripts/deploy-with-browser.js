// scripts/deploy-with-browser.js
const hre = require("hardhat");

async function main() {
  console.log("Deploying NGM Token via Binance Wallet...");

  // Periksa apakah ada provider (Binance Wallet/MetaMask)
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error("Binance Wallet not found. Please run this script in a browser environment.");
  }

  // Request account access
  await window.ethereum.request({ method: 'eth_requestAccounts' });

  // Gunakan provider dari browser
  const provider = new hre.ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  console.log("Deployer address:", await signer.getAddress());

  // Get contract factory
  const NickgenomPermit = await hre.ethers.getContractFactory("NickgenomPermit");

  // Deploy contract
  const ngm = await NickgenomPermit.connect(signer).deploy();
  await ngm.waitForDeployment();

  const address = await ngm.getAddress();
  console.log(`NickgenomPermit deployed to: ${address}`);

  // Simpan alamat untuk verifikasi
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