# NickgenomToken (NGM) — API Reference

This document describes how to interact with the **NickgenomToken (NGM)** smart contract deployed on **BNB Smart Chain Mainnet**.

---

## 📌 Contract Information
- **Network**: BNB Smart Chain (Mainnet, Chain ID 56)
- **Standard**: BEP-20 (ERC-20 compatible)
- **Token Name**: Nickgenom
- **Symbol**: NGM
- **Decimals**: 18
- **Total Supply**: 1,000,000,000,000 NGM (fixed supply)
- **Contract Address**:  
  ```
  0x0353aD4cAD5548de4230E36d86ed5536a0bACA16
  ```
- **Verified on BscScan**: [View on BscScan](https://bscscan.com/address/0x0353aD4cAD5548de4230E36d86ed5536a0bACA16#code)

---

## 🔑 Basic Functions (BEP-20 Standard)

| Function | Description | Example |
|----------|-------------|---------|
| `totalSupply()` | Returns total NGM supply. | `1000000000000 * 10^18` |
| `balanceOf(address)` | Returns token balance of an address. | `balanceOf(0xYourWallet)` |
| `transfer(address to, uint256 amount)` | Transfers tokens. | `transfer(0xRecipient, 1000e18)` |
| `approve(address spender, uint256 amount)` | Approves allowance for spender. | `approve(0xSpender, 500e18)` |
| `allowance(address owner, address spender)` | Checks allowance. | `allowance(0xOwner, 0xSpender)` |
| `transferFrom(address from, address to, uint256 amount)` | Transfers using allowance. | Used by DEXes, staking contracts. |

---

## 🔥 Extended Functions
NickgenomToken also includes:

| Function | Description |
|----------|-------------|
| `permit(...)` | EIP-2612 Permit (gasless approvals). |
| `burn(uint256 amount)` | Burns tokens from sender’s wallet. |
| `burnFrom(address account, uint256 amount)` | Burns tokens from another wallet (with allowance). |
| `rescueERC20(address token, uint256 amount)` | Owner-only: rescue other ERC20s mistakenly sent. |
| `rescueBNB(uint256 amount)` | Owner-only: rescue BNB mistakenly sent. |

---

## 🛠️ Integration Guide

You **do not need** any `PRIVATE_KEY` in this repo.  
To interact with NGM:

### 1. Using **Binance Wallet / MetaMask** in Browser
```javascript
// Injected provider (Binance Wallet / MetaMask)
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// NGM contract instance
const NGM = new ethers.Contract(
  "0x0353aD4cAD5548de4230E36d86ed5536a0bACA16",
  NGM_ABI,
  signer
);

// Example: transfer 100 NGM
await NGM.transfer("0xRecipientAddress", ethers.utils.parseUnits("100", 18));
```

### 2. Using **BscScan WriteContract**
1. Go to [NGM contract on BscScan](https://bscscan.com/address/0x0353aD4cAD5548de4230E36d86ed5536a0bACA16#writeContract).
2. Connect Binance Wallet / MetaMask.
3. Call functions like `transfer`, `approve`, `burn`.

### 3. Using **DEX (PancakeSwap)**
- Import contract address: `0x0353aD4cAD5548de4230E36d86ed5536a0bACA16`
- You can swap / provide liquidity directly on PancakeSwap.

---

## ⚠️ Notes
- This repository is for **documentation and automation (CI/CD)**.  
- Deployment is already completed on **BSC Mainnet**.  
- No `testnet` instructions are included since NGM only exists on Mainnet.  
- If you want to experiment, you may fork the repo and modify config to point at BSC Testnet.  

---

✅ With this, developers can integrate NGM directly using Binance Wallet / MetaMask without dealing with testnet or private keys.
