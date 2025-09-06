const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Rescue", function () {
  let rescue;
  let owner;
  let addr1;
  
  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    
    const Rescue = await ethers.getContractFactory("Rescue");
    rescue = await Rescue.deploy();
  });
  
  describe("ERC20 Rescue", function () {
    it("Should rescue ERC20 tokens", async function () {
      // Deploy a mock ERC20 token
      const MockToken = await ethers.getContractFactory("MockERC20");
      const mockToken = await MockToken.deploy("Mock", "MCK");
      
      // Transfer mock tokens to the Rescue contract
      await mockToken.transfer(await rescue.getAddress(), 100);
      
      // Rescue the tokens
      await rescue.rescueERC20(await mockToken.getAddress(), 100);
      
      // Check that the owner received the tokens
      expect(await mockToken.balanceOf(owner.address)).to.equal(100);
    });
    
    it("Should fail with zero address", async function () {
      await expect(
        rescue.rescueERC20(ethers.ZeroAddress, 100)
      ).to.be.revertedWith("ZeroAddress()");
    });
    
    it("Should fail with zero amount", async function () {
      const MockToken = await ethers.getContractFactory("MockERC20");
      const mockToken = await MockToken.deploy("Mock", "MCK");
      
      await expect(
        rescue.rescueERC20(await mockToken.getAddress(), 0)
      ).to.be.revertedWith("InvalidAmount()");
    });
  });
  
  describe("BNB Rescue", function () {
    it("Should rescue BNB", async function () {
      // Send BNB to the contract
      await owner.sendTransaction({
        to: await rescue.getAddress(),
        value: ethers.parseEther("1.0")
      });
      
      // Rescue the BNB
      await rescue.rescueBNB(ethers.parseEther("1.0"));
      
      // Check that the contract balance is 0
      expect(await ethers.provider.getBalance(await rescue.getAddress())).to.equal(0);
    });
    
    it("Should fail with zero amount", async function () {
      await expect(
        rescue.rescueBNB(0)
      ).to.be.revertedWith("InvalidAmount()");
    });
    
    it("Should fail with insufficient balance", async function () {
      await expect(
        rescue.rescueBNB(ethers.parseEther("1.0"))
      ).to.be.revertedWith("InvalidAmount()");
    });
  });
});