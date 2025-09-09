<p align="center">
  <img src="assets/ngm-logo.png" alt="NickgenomToken Logo" width="120"/>
</p>

# NickgenomToken (NGM) — BEP‑20 on BNB Smart Chain

[![Compile](https://github.com/EndiHariadi43/NickgenomToken/actions/workflows/compile.yml/badge.svg?branch=main)](https://github.com/EndiHariadi43/NickgenomToken/actions/workflows/compile.yml)
[![Solidity CI](https://github.com/EndiHariadi43/NickgenomToken/actions/workflows/solidity.yml/badge.svg?branch=main)](https://github.com/EndiHariadi43/NickgenomToken/actions/workflows/solidity.yml)
[![Verify on BscScan (Workflow)](https://github.com/EndiHariadi43/NickgenomToken/actions/workflows/verify.yml/badge.svg?branch=main)](https://github.com/EndiHariadi43/NickgenomToken/actions/workflows/verify.yml)
[![Test](https://github.com/EndiHariadi43/NickgenomToken/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/EndiHariadi43/NickgenomToken/actions/workflows/test.yml)
[![Verified on BscScan](https://img.shields.io/badge/BscScan-Verified-brightgreen?logo=binance&logoColor=white)](https://bscscan.com/address/0x0353aD4cAD5548de4230E36d86ed5536a0bACA16#code)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)
[![Build with Remix](https://img.shields.io/badge/Build-Remix-blue?logo=ethereum)](https://remix.ethereum.org)
[![BNB Chain](https://img.shields.io/badge/Chain-BNB_SmartChain-yellow?logo=binance)](https://www.bnbchain.org)
[![Telegram](https://img.shields.io/badge/Telegram-Join%20Group-26A5E4?logo=telegram&logoColor=white)](https://t.me/NGM_token)

---

**NickgenomToken (NGM)** is a **BEP‑20 token on BNB Smart Chain** designed as an *AI‑native token*: fast, secure, transparent, and friendly to the broader Web3 ecosystem.

> The contract is **verified on BscScan**. Links and technical details are provided below for easy integration.

---

## 🔑 Key Features
- **Fixed Supply** — 1,000,000,000,000 NGM (18 decimals), no additional mint.  
- **100% Ownership at Launch** — full initial supply held by deployer.  
- **Burnable** — supports `burn` / `burnFrom` to enable long‑term scarcity.  
- **EIP‑2612 Permit** — gasless approvals for modern DeFi & dApp integrations.  
- **No Tax / No Blacklist / No Limits** — not a honeypot; free transfers.  

---

## 🚀 Vision
NGM aims to bridge **AI, Blockchain, and Meme‑driven communities** by:
- Enabling AI‑centric dApps (trading assistants, AI research funding, data exchange).  
- Fostering an open ecosystem for builders on BNB Smart Chain.  
- Ensuring full on‑chain transparency with a contract that’s **✅ verified on BscScan**.

---

## 📌 Contract Information
- **Name**: Nickgenom  
- **Symbol**: NGM  
- **Decimals**: 18  
- **Total Supply**: 1,000,000,000,000 NGM (fixed)  
- **Network**: BNB Smart Chain (Mainnet, Chain ID 56)  

**Contract Address**
```
0x0353aD4cAD5548de4230E36d86ed5536a0bACA16
```

🔗 **BscScan Links**
- [Source Code & Read Contract](https://bscscan.com/address/0x0353aD4cAD5548de4230E36d86ed5536a0bACA16#code)  
- [Transactions](https://bscscan.com/address/0x0353aD4cAD5548de4230E36d86ed5536a0bACA16)

---

## 📚 Guides
- [Whitepaper](./docs/Whitepaper.md)  
- [API Reference](./docs/API.md)  
- [Developer Guide](./docs/DEV_GUIDE.md)  
- [Factory User Guide](./docs/FACTORY_GUIDE.md)

---

## 📦 Deploy Your Own Token
Anyone can create their own ERC-20 token using the official **NickgenomFactory** contract on BNB Smart Chain.  
See: [Factory User Guide](./docs/FACTORY_GUIDE.md)  

- **Factory Address (Mainnet):** `0x0878d35501e9d5a31fbf6531fcddd23efea0e053`  
- [View on BscScan](https://bscscan.com/address/0x0878d35501e9d5a31fbf6531fcddd23efea0e053#code)  

Tokens deployed via the factory are simple `ERC20` contracts (burnable, Ownable) and **not the official NGM**.  
This feature is intended as a **public mini-launchpad** for experimentation and community projects.

---

## 🧭 Add to Your Wallet
1. Open **MetaMask** or **TrustWallet**  
2. Select **BNB Smart Chain (BEP‑20)**  
3. **Import Token** → paste the contract address above  
4. Symbol & decimals should auto‑fill → **Add Custom Token** ✅

---

## 🛠️ Development

### Prerequisites
- Node.js **18 LTS** (tested on 18.19.0)  
  ✅ Officially supported by workflows & CI  
- Node.js **20/22** (tested on 22.11.0)  
  ⚠️ Works locally, but may cause warnings in Hardhat plugins
- npm **10+**
- Hardhat & Toolbox (preconfigured in this repo)

### Install
```bash
npm install
```

### Compile & Test
```bash
npm run compile
npm test
```

### Deploy (examples)
```bash
npm run deploy:bsc       # deploy to BSC mainnet
npm run deploy:bsctest   # deploy to BSC testnet
```

### Verify on BscScan
Use the **Verify on BscScan** workflow from the **Actions** tab (contract address is pulled from Secrets).  
Or run manually:
```bash
npx hardhat verify --network bsc 0x0353aD4cAD5548de4230E36d86ed5536a0bACA16   --contract "contracts/token/NickgenomPermit.sol:NickgenomPermit"
# If your constructor has arguments:
# --constructor-args scripts/args.js
```

---

## 🤝 Contributing
Contributions are welcome! Please fork, create a branch, and open a PR.  
For ideas and bugs, open an **Issue**.

---

## 🔐 Security & Disclaimer
- No hidden functions, taxes, or blacklists in the contract.  
- No third‑party audit yet—use at your own responsibility.  
- This is not financial advice.

---

## 👥 Contact
- **Founder & Maintainer**: Endi Hariadi  
- **Telegram**: [@NGM_token](https://t.me/NGM_token)

---

## 🔒 Official Contract

> **ONLY this address is official for Nickgenom (NGM):**  
> `0x0353aD4cAD5548dE4230E36d86ed5536a0bACA16`  
> BscScan: https://bscscan.com/address/0x0353aD4cAD5548dE4230E36d86ed5536a0bACA16

Any other address—even if it uses the same name/symbol/logo—is **NOT** Nickgenom (NGM).

### Impersonation Notice
- NGM is open-source; third parties may deploy **different** contracts from similar code.
- Those deployments are **not affiliated** with the Nickgenom team unless explicitly stated here.
- Always verify the **checksum** address above and cross-check on BscScan.

---

## Official Address

- **Nickgenom (NGM) – BNB Smart Chain (Mainnet):**  
  `0x0353aD4cAD5548dE4230E36d86ed5536a0bACA16`  
  BscScan: https://bscscan.com/address/0x0353aD4cAD5548dE4230E36d86ed5536a0bACA16

Only the address above is official. Any other address is unrelated.

## Impersonation & Phishing

- Beware of tokens/contracts using similar names or symbols.
- Confirm links only from our official channels (README, Whitepaper, website, Telegram/X).
- Never share seed phrases or private keys. The Nickgenom team will **never** ask for them.

## Reporting

If you discover a security issue or impersonation attempt, please open a confidential report via:
- GitHub Security Advisories (Private)  
- Telegram: @NGM_token (DM admins only)  
Include transaction hashes, addresses, and steps to reproduce if relevant.

---

## Brand & Trademark Policy (Non-Code)

- The **Nickgenom** name, **NGM** ticker, and official **logos** are brand assets.
- Using the brand to imply endorsement/affiliation is **prohibited** without written permission.
- Fork/clone of the **code** is allowed under MIT (see LICENSE), but must **not** claim to be the official Nickgenom (NGM) unless authorized.

---

## 📄 License
This project is licensed under the **MIT** license — see [LICENSE](./LICENSE).

> **Note:** Scripts in this repository cannot modify the already-deployed, verified Nickgenom (NGM) contract.  
> Any “deploy” command creates a **new** contract at a **different** address.  
> The **only** official NGM contract is listed above.
