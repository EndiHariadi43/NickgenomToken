const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NickgenomFactory", function () {
  let Factory, factory, owner, user, feeCollector;

  beforeEach(async function () {
    [owner, user, feeCollector] = await ethers.getSigners();

    Factory = await ethers.getContractFactory("NickgenomFactory");
    factory = await Factory.deploy(feeCollector.address);
    await factory.waitForDeployment();
  });

  it("sets feeCollector correctly", async function () {
    expect(await factory.feeCollector()).to.equal(feeCollector.address);
    expect(await factory.deployFeeWei()).to.equal(ethers.parseEther("0.01"));
  });

  it("only owner can set deploy fee", async function () {
    await expect(factory.connect(user).setDeployFee(123n))
      .to.be.reverted; // OwnableUnauthorizedAccount in OZ v5

    await factory.connect(feeCollector).setDeployFee(ethers.parseEther("0.02"));
    expect(await factory.deployFeeWei()).to.equal(ethers.parseEther("0.02"));
  });

  it("deploys a new token and transfers the fee", async function () {
    const fee = await factory.deployFeeWei();
    const initialSupply = ethers.parseUnits("1000", 18);

    const tx = await factory.connect(user).deployToken(
      "MyToken",
      "MTK",
      initialSupply,
      user.address,
      { value: fee }
    );
    const receipt = await tx.wait();

    // Extract TokenDeployed event (works without chai-matchers plugin)
    let tokenAddress = null;
    const iface = (await ethers.getContractFactory("NickgenomFactory")).interface;
    for (const log of receipt.logs) {
      try {
        const parsed = iface.parseLog(log);
        if (parsed && parsed.name === "TokenDeployed") {
          tokenAddress = parsed.args[0];
          break;
        }
      } catch (_) { /* not a factory log */ }
    }
    expect(tokenAddress, "TokenDeployed not found").to.not.equal(null);
    expect(tokenAddress).to.be.properAddress;

    // Attach ERC20 and check balances/supply
    const SimpleERC20 = await ethers.getContractFactory("SimpleERC20");
    const token = SimpleERC20.attach(tokenAddress);

    expect(await token.totalSupply()).to.equal(initialSupply);
    expect(await token.balanceOf(user.address)).to.equal(initialSupply);

    // Fee goes to feeCollector
    const before = await ethers.provider.getBalance(feeCollector.address);
    await factory.connect(user).deployToken("T2", "T2", initialSupply, user.address, { value: fee });
    const after = await ethers.provider.getBalance(feeCollector.address);
    expect(after - before).to.equal(fee);
  });
});
