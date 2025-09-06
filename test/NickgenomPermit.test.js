const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NickgenomPermit", function () {
  let ngm;
  let owner;
  let addr1;
  let addr2;
  
  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    
    const NickgenomPermit = await ethers.getContractFactory("NickgenomPermit");
    ngm = await NickgenomPermit.deploy();
  });
  
  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await ngm.owner()).to.equal(owner.address);
    });
    
    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await ngm.balanceOf(owner.address);
      expect(await ngm.totalSupply()).to.equal(ownerBalance);
    });
    
    it("Should have correct name and symbol", async function () {
      expect(await ngm.name()).to.equal("Nickgenom");
      expect(await ngm.symbol()).to.equal("NGM");
    });
  });
  
  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      // Transfer 50 tokens from owner to addr1
      await ngm.transfer(addr1.address, 50);
      const addr1Balance = await ngm.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50);
      
      // Transfer 50 tokens from addr1 to addr2
      await ngm.connect(addr1).transfer(addr2.address, 50);
      const addr2Balance = await ngm.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
      expect(await ngm.balanceOf(addr1.address)).to.equal(0);
    });
    
    it("Should fail if sender doesn't have enough tokens", async function () {
      const initialOwnerBalance = await ngm.balanceOf(owner.address);
      
      // Try to send 1 token from addr1 (0 tokens) to owner
      await expect(
        ngm.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWith("ERC20: insufficient balance");
      
      // Owner balance shouldn't have changed
      expect(await ngm.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });
  });
  
  describe("Burning", function () {
    it("Should burn tokens from owner", async function () {
      const initialSupply = await ngm.totalSupply();
      const initialOwnerBalance = await ngm.balanceOf(owner.address);
      
      // Burn 100 tokens
      await ngm.burn(100);
      
      // Check balances
      expect(await ngm.totalSupply()).to.equal(initialSupply - 100n);
      expect(await ngm.balanceOf(owner.address)).to.equal(initialOwnerBalance - 100n);
    });
  });
  
  describe("Rescue Functions", function () {
    it("Should rescue ERC20 tokens", async function () {
      // Deploy a mock ERC20 token
      const MockToken = await ethers.getContractFactory("MockERC20");
      const mockToken = await MockToken.deploy("Mock", "MCK");
      
      // Transfer mock tokens to the NGM contract
      await mockToken.transfer(await ngm.getAddress(), 100);
      
      // Rescue the tokens
      await ngm.rescueERC20(await mockToken.getAddress(), 100);
      
      // Check that the owner received the tokens
      expect(await mockToken.balanceOf(owner.address)).to.equal(100);
    });
    
    it("Should rescue BNB", async function () {
      // Send BNB to the contract
      await owner.sendTransaction({
        to: await ngm.getAddress(),
        value: ethers.parseEther("1.0")
      });
      
      // Rescue the BNB
      await ngm.rescueBNB(ethers.parseEther("1.0"));
      
      // Check that the contract balance is 0
      expect(await ethers.provider.getBalance(await ngm.getAddress())).to.equal(0);
    });
  });
});