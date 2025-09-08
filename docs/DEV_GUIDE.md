# NickgenomToken — Developer Guide

This document is **for internal contributors only**.  
Do **NOT** share private keys or secrets in public repositories.

---

## 📦 Requirements
- Node.js 20+
- npm 10+
- Hardhat ^2.22
- OpenZeppelin contracts ^5.4

Install dependencies:
```bash
npm install
```

---

## ⚙️ Development
- Contracts are in `contracts/`
- Use Hardhat for compilation and testing:
```bash
npx hardhat compile
npx hardhat test
```

---

## 🔑 Secrets
- Never commit `PRIVATE_KEY` or `.env`.
- Use **GitHub Secrets** for workflow automation (e.g. `BSCSCAN_API_KEY`).
- Binance Wallet / MetaMask is used for deployment; **no private keys** are stored here.

---

## 🛠️ Workflows
- **Solidity CI** → compiles contracts on every push.  
- **Verify on BscScan** → auto-verify contract source (requires `BSCSCAN_API_KEY` secret).  
- **Roadmap Auto Check** → updates roadmap progress in `README.md` and `Whitepaper.md`.  

Run workflow manually from GitHub **Actions** tab if needed.

---

## 📂 Repo Structure
```
NickgenomToken/
├── contracts/          # Solidity smart contracts
├── docs/               # Whitepaper, API.md, DEV_GUIDE.md
├── .github/workflows/  # CI/CD workflows
├── package.json
└── hardhat.config.js
```

---

⚠️ Reminder:  
- Only share `README.md`, `Whitepaper.md`, and `API.md` with the public.  
- This `DEV_GUIDE.md` is strictly for internal development and should not contain sensitive data.
