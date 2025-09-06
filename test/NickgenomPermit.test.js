// test/NickgenPermit.test.js (Fixed Import)
import pkg from "hardhat";
const { ethers } = pkg;
import { expect } from "chai";

describe("NickgenomPermit", function () {
  let ngm;
  let owner;
  let addr1;
  let addr2;
  
  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    
    const NickgenomPermit = await ethers.getContractFactory("NickgenomPermit");
    ngm = await NickgenomPermit.deploy();
    await ngm.waitForDeployment();
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
  });
});