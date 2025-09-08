// test/NickgenomFactory.test.cjs
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NickgenomFactory", function () {
  let factory, owner, user, feeCollector;

  beforeEach(async function () {
    [owner, user, feeCollector] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory("NickgenomFactory");
    factory = await Factory.deploy(feeCollector.address);
    await factory.waitForDeployment();
  });

  it("sets feeCollector & default fee", async function () {
    expect(await factory.feeCollector()).to.equal(feeCollector.address);
    expect(await factory.deployFeeWei()).to.equal(ethers.parseEther("0.01"));
  });

  it("only owner can set deploy fee", async function () {
    await expect(factory.connect(user).setDeployFee(123n)).to.be.reverted;
    await factory.connect(feeCollector).setDeployFee(ethers.parseEther("0.02"));
    expect(await factory.deployFeeWei()).to.equal(ethers.parseEther("0.02"));
  });

  it("deploys a token, mints supply to receiver, and sends fee", async function () {
    const fee = await factory.deployFeeWei();
    const initial = ethers.parseUnits("1000", 18);

    const tx = await factory.connect(user).deployToken(
      "MyToken", "MTK", initial, user.address, { value: fee }
    );
    const rcpt = await tx.wait();

    const iface = (await ethers.getContractFactory("NickgenomFactory")).interface;
    let tokenAddress = null;
    for (const log of rcpt.logs) {
      try {
        const parsed = iface.parseLog(log);
        if (parsed && parsed.name === "TokenDeployed") {
          tokenAddress = parsed.args[0];
          break;
        }
      } catch {}
    }
    expect(tokenAddress).to.not.equal(null);
    expect(ethers.isAddress(tokenAddress)).to.equal(true);

    const SimpleERC20 = await ethers.getContractFactory("SimpleERC20");
    const token = SimpleERC20.attach(tokenAddress);
    expect(await token.totalSupply()).to.equal(initial);
    expect(await token.balanceOf(user.address)).to.equal(initial);

    const before = await ethers.provider.getBalance(feeCollector.address);
    await factory.connect(user).deployToken("T2", "T2", initial, user.address, { value: fee });
    const after = await ethers.provider.getBalance(feeCollector.address);
    expect(after - before).to.equal(fee);
  });
});
