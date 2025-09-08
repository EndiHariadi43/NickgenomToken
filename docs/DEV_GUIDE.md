# NickgenomToken — Developer Guide

> **Audience:** internal contributors.  
> **Note:** Never share private keys or secrets in public repositories.

---

## 1) Technical Overview

- **Chain:** BNB Smart Chain (Mainnet, chainId 56)  
- **Token Standard:** BEP-20 (ERC-20 compatible)  
- **Contract Features:** `ERC20`, `ERC20Permit (EIP-2612)`, `ERC20Burnable`, `Ownable`  
- **Tooling:** Hardhat, OpenZeppelin, GitHub Actions

---

## 2) Requirements

- **Node.js** 22.x (tested on 22.11.0)  
- **npm** 10.x  
- Wallet extension (Binance Wallet / MetaMask) for on-chain interaction  
- BSC RPC access (default public RPC is fine)

Install dependencies:

```bash
npm install
```

---

## 3) Repository Structure

```
NickgenomToken/
├── .github/workflows/
│   ├── compile.yml
│   ├── solidity.yml
│   ├── test.yml
│   └── verify.yml
│
├── assets/
│   ├── logo.png
│   ├── ngm-logo.png
│   └── ngm-logo.svg
│
├── contracts/
│   ├── interfaces/
│   │   └── IRescue.sol
│   └── token/
│       ├── INickgenomPermit.sol
│       └── NickgenomPermit.sol
│
├── docs/
│   ├── API.md
│   ├── DEV_GUIDE.md
│   ├── SECURITY.md
│   └── Whitepaper.md
│
├── scripts/
│   ├── deploy-with-browser.js
│   ├── deploy.js
│   ├── interact.js
│   └── verify.js
│
├── test/
│   ├── MockERC20.sol
│   └── NickgenomPermit.test.js
│
├── utils/
│   ├── constants.js
│   └── helpers.js
│
├── .env.example
├── .gitignore
├── .npmrc
├── LICENSE
├── README.md
├── deploy.html
├── hardhat.config.cjs
├── package-lock.json
└── package.json
```

**Notes**
- Hardhat configuration is in **`hardhat.config.cjs`** (CommonJS).
- Ready-to-use scripts are in **`scripts/`**.
- **`deploy.html`** + `scripts/deploy-with-browser.js` support *browser-based deploy* using Binance Wallet/MetaMask (no private key exposure on server/CI).

---

## 4) Environment & Secrets

Create a `.env` file based on `.env.example` if you want to **deploy/verify via Node scripts**:

```env
# Example (optional if deploying with browser wallet)
BSC_RPC_URL=https://bsc-dataseed.binance.org
PRIVATE_KEY=0x....                   # ONLY for Node script deploy (never commit!)
BSCSCAN_API_KEY=your_api_key         # ONLY for BscScan verification
```

✅ **Local compile/test do not require** `PRIVATE_KEY` or `BSCSCAN_API_KEY`.  
🔐 For CI automation: save `BSCSCAN_API_KEY` as a **GitHub Secret** (Settings → Secrets and variables → Actions).

---

## 5) Common Commands

### Compile
```bash
npx hardhat compile
```

### Test
```bash
npx hardhat test
# or test a specific file:
npx hardhat test test/NickgenomPermit.test.js
```

### Local node (optional)
```bash
npx hardhat node
```

---

## 6) Deployment

You have **two options**:

### Option A — *Browser-based deploy* (no PRIVATE_KEY in .env)
1. Open **`deploy.html`** in a browser (just double-click).  
2. Ensure Binance Wallet / MetaMask is connected to **BNB Smart Chain (Mainnet)**.  
3. Follow on-page instructions to call `scripts/deploy-with-browser.js`.  
4. Confirm the transaction in your wallet.

Pros: no private key stored in repo/CI.  
Cons: must be run manually from browser.

---

### Option B — *Node script deploy* (requires PRIVATE_KEY in `.env`)
1. Ensure `.env` contains `BSC_RPC_URL` and `PRIVATE_KEY`.  
2. Run:  
   ```bash
   node scripts/deploy.js --network bsc
   ```  
3. Save the deployed contract address from the console output.

> **Security:** Never commit `.env` or expose private keys.

---

## 7) Verify Source Code on BscScan (optional)

### Via CLI (requires `BSCSCAN_API_KEY`)
```bash
node scripts/verify.js --network bsc --address 0xYourDeployedAddress
# or directly:
npx hardhat verify --network bsc 0xYourDeployedAddress   --contract "contracts/token/NickgenomPermit.sol:NickgenomPermit"
```

### Via GitHub Actions
- Workflow: **`verify.yml`**  
- Store `BSCSCAN_API_KEY` in GitHub Secrets.  
- Trigger manually from the **Actions** tab.

> Contributors **without** `BSCSCAN_API_KEY` can still compile & test; just skip verification.

---

## 8) Contract Interaction

Use the `scripts/interact.js` script (example: read total supply, call burn, etc):

```bash
node scripts/interact.js --network bsc --address 0xYourDeployedAddress --method totalSupply
```

Or use *Read/Write Contract* on BscScan for verified contract addresses.

---

## 9) Code Standards & Layout

- Contracts are in `contracts/token` (implementations) and `contracts/interfaces` (interfaces).  
- Use OpenZeppelin v5 for `ERC20`, `Permit`, `Burnable`, `Ownable`.  
- Always enable optimizer as per `hardhat.config.cjs` before production.

---

## 10) CI/CD

- **compile.yml / solidity.yml / test.yml**  
  - Automatic build & test on every push/PR.  
- **verify.yml**  
  - Verification on BscScan (manual/dispatch) – requires `BSCSCAN_API_KEY`.  

> See **Actions** tab to trigger workflows manually.

---

## 11) Contributing

1. Fork → create feature/bugfix branch → make clear, small commits.  
2. Ensure `npx hardhat compile` and `npx hardhat test` **pass** before PR.  
3. PRs touching contracts must include a change summary and design rationale.

---

## 12) Security

- No taxes, blacklists, or hidden functions.  
- Avoid storing private keys on shared machines.  
- If an incident occurs, see `docs/SECURITY.md` and file a responsible disclosure.

---

## 13) Key References

- **README:** `./README.md`  
- **API:** `./docs/API.md`  
- **Whitepaper:** `./docs/Whitepaper.md`  
- **Security:** `./docs/SECURITY.md`

---

**© NickgenomToken.**  
This document is for internal development purposes and may change over time.
