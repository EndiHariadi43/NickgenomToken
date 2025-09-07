# NickgenomToken (NGM) — BEP-20 on BNB Smart Chain

[![Solidity CI](https://github.com/EndiHariadi43/NickgenomToken/actions/workflows/solidity.yml/badge.svg)](https://github.com/EndiHariadi43/NickgenomToken/actions/workflows/solidity.yml)
[![Verify Workflow](https://github.com/EndiHariadi43/NickgenomToken/actions/workflows/verify.yml/badge.svg)](https://github.com/EndiHariadi43/NickgenomToken/actions/workflows/verify.yml)
[![Verified on BscScan](https://img.shields.io/badge/BscScan-Verified-brightgreen?logo=binance&logoColor=white)](https://bscscan.com/address/0x0353aD4cAD5548de4230E36d86ed5536a0bACA16#code)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)
[![Build with Remix](https://img.shields.io/badge/Build-Remix-blue?logo=ethereum)](https://remix.ethereum.org)
[![BNB Chain](https://img.shields.io/badge/Chain-BNB_SmartChain-yellow?logo=binance)](https://www.bnbchain.org)
[![Telegram](https://img.shields.io/badge/Telegram-Join%20Group-26A5E4?logo=telegram&logoColor=white)](https://t.me/NGM_token)

---

**NickgenomToken (NGM)** adalah aset kripto **BEP-20 di BNB Smart Chain** yang dirancang sebagai *AI-native token*: cepat, aman, transparan, dan ramah ekosistem Web3.

> Kontrak **sudah diverifikasi** di BscScan dan tersedia di bawah untuk kemudahan integrasi.

---

## 🔑 Fitur Utama
- **Fixed Supply** — 1.000.000.000.000 NGM (18 desimal), tanpa mint tambahan.  
- **100% Ownership** — seluruh pasokan awal dipegang deployer saat peluncuran.  
- **Burnable** — dukungan `burn` / `burnFrom` untuk menciptakan kelangkaan.  
- **EIP-2612 Permit** — *gasless approvals* → memudahkan integrasi DeFi & dApps AI.  
- **No Tax / No Blacklist / No Limits** — bukan honeypot, transfer bebas.  

---

## 🚀 Visi
Menjadi **jembatan antara AI, Blockchain, dan Komunitas Meme**:
- Integrasi ke dApps berbasis AI (trading assistant, research funding, data exchange).  
- Ekosistem terbuka untuk komunitas yang ingin membangun aplikasi AI di BSC.  
- Transparansi penuh—kontrak **✅ sudah diverifikasi di BscScan**.

---

## 📌 Informasi Kontrak
- **Name**: Nickgenom  
- **Symbol**: NGM  
- **Decimals**: 18  
- **Total Supply**: 1,000,000,000,000 NGM (fixed)  
- **Network**: BNB Smart Chain (Mainnet, Chain ID 56)  

**Contract Address**:
```
0x0353aD4cAD5548de4230E36d86ed5536a0bACA16
```

🔗 **BscScan Links**
- [Source Code & Read Contract](https://bscscan.com/address/0x0353aD4cAD5548de4230E36d86ed5536a0bACA16#code)  
- [Transactions](https://bscscan.com/address/0x0353aD4cAD5548de4230E36d86ed5536a0bACA16)

---

## 🧭 Tambahkan ke Wallet
1. Buka **MetaMask / TrustWallet**  
2. Pilih **BNB Smart Chain (BEP-20)**  
3. **Import Token** → tempel alamat kontrak di atas  
4. Simbol & desimal akan terisi otomatis → **Add Custom Token** ✅

---

## 🛠️ Pengembangan

### Persyaratan
- Node.js 20+, npm
- Hardhat & Toolbox (sudah dikonfigurasi di repo)

### Install
```bash
npm install
```

### Compile & Test
```bash
npm run compile
npm test
```

### Deploy (contoh)
```bash
npm run deploy:bsc       # ke mainnet BSC
npm run deploy:bsctest   # ke testnet BSC
```

### Verifikasi di BscScan
Gunakan workflow **Verify on BscScan** dari tab **Actions** (alamat kontrak diambil otomatis dari Secrets).  
Atau jalankan manual:
```bash
npx hardhat verify --network bsc 0x0353aD4cAD5548de4230E36d86ed5536a0bACA16   --contract "contracts/token/NickgenomPermit.sol:NickgenomPermit"
# Jika constructor punya argumen:
# --constructor-args scripts/args.js
```

---

## 🤝 Kontribusi
Kontribusi terbuka! Silakan fork, buat branch, dan ajukan PR.  
Untuk bug/ide, buka **Issues**.

---

## 🔐 Keamanan & Disclaimer
- Kontrak **tanpa** fungsi tersembunyi, pajak, atau blacklist.  
- Belum melalui audit pihak ketiga; gunakan dengan tanggung jawab sendiri.  
- Ini bukan nasihat keuangan.

---

## 👥 Kontak
- **Founder & Maintainer**: Endi Hariadi  
- **Telegram**: [@NGM_token](https://t.me/NGM_token)

---

## 📄 Lisensi
Proyek dilisensikan di bawah **MIT** — lihat [LICENSE](./LICENSE).
