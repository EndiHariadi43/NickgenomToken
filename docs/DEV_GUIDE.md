# NickgenomToken — Developer Guide

> **Audience:** kontributor internal.  
> **Catatan:** Jangan pernah membagikan private key atau kredensial rahasia di repositori publik.

---

## 1) Ikhtisar Teknis

- **Chain:** BNB Smart Chain (Mainnet, chainId 56)  
- **Standar Token:** BEP-20 (ERC-20 compatible)  
- **Fitur Kontrak:** `ERC20`, `ERC20Permit (EIP-2612)`, `ERC20Burnable`, `Ownable`  
- **Tooling:** Hardhat, OpenZeppelin, GitHub Actions

---

## 2) Prasyarat

- **Node.js** 22.x (teruji di 22.11.0)  
- **npm** 10.x  
- Ekstensi wallet (Binance Wallet / MetaMask) untuk interaksi on-chain  
- Akses RPC BSC (default public RPC ok)

Instal dependensi:

```bash
npm install
```

---

## 3) Struktur Repositori

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

**Catatan penting**
- Konfigurasi Hardhat berada di **`hardhat.config.cjs`** (CommonJS).
- Skrip siap pakai ada di folder **`scripts/`**.
- **`deploy.html`** + `scripts/deploy-with-browser.js` mendukung *browser-based deploy* memakai Binance Wallet/MetaMask (tanpa menyentuh private key di server/CI).

---

## 4) Lingkungan & Secrets

Buat file `.env` berdasarkan `.env.example` bila Anda ingin **men-deploy/verify via skrip Node**:

```env
# Contoh (opsional jika deploy pakai browser wallet)
BSC_RPC_URL=https://bsc-dataseed.binance.org
PRIVATE_KEY=0x....                   # HANYA untuk deploy via Node script (jangan commit!)
BSCSCAN_API_KEY=your_api_key         # HANYA untuk verifikasi ke BscScan
```

✅ **Local compile/test tidak membutuhkan** `PRIVATE_KEY` maupun `BSCSCAN_API_KEY`.  
🔐 Jika butuh otomatisasi CI: simpan `BSCSCAN_API_KEY` sebagai **GitHub Secret** (Settings → Secrets and variables → Actions).

---

## 5) Perintah Umum

### Compile
```bash
npx hardhat compile
```

### Test
```bash
npx hardhat test
# atau tes file tertentu:
npx hardhat test test/NickgenomPermit.test.js
```

### Node lokal (opsional)
```bash
npx hardhat node
```

---

## 6) Deploy

Anda punya **dua opsi**:

### Opsi A — *Browser-based deploy* (tanpa PRIVATE_KEY di .env)
1. Buka file **`deploy.html`** di browser (cukup *double-click*).
2. Pastikan Binance Wallet / MetaMask terhubung ke **BNB Smart Chain (Mainnet)**.
3. Ikuti instruksi pada halaman untuk memanggil `scripts/deploy-with-browser.js`.
4. Konfirmasi transaksi di wallet.

Keuntungan: tidak ada private key yang disimpan di repo/CI.  
Kekurangan: dijalankan manual dari browser.

---

### Opsi B — *Node script deploy* (butuh PRIVATE_KEY di `.env`)
1. Pastikan `.env` berisi `BSC_RPC_URL` dan `PRIVATE_KEY`.
2. Jalankan:
   ```bash
   node scripts/deploy.js --network bsc
   ```
3. Simpan alamat kontrak yang muncul di konsol.

> **Keamanan:** Jangan pernah commit file `.env` atau membagikan private key.

---

## 7) Verifikasi Kode di BscScan (opsional)

### Via CLI (butuh `BSCSCAN_API_KEY`)
```bash
node scripts/verify.js --network bsc --address 0xYourDeployedAddress
# atau langsung:
npx hardhat verify --network bsc 0xYourDeployedAddress   --contract "contracts/token/NickgenomPermit.sol:NickgenomPermit"
```

### Via GitHub Actions
- Workflow: **`verify.yml`**
- Simpan `BSCSCAN_API_KEY` di GitHub Secrets.  
- Jalankan dari tab **Actions**.

> Kontributor **tanpa** `BSCSCAN_API_KEY` tetap bisa compile & test; cukup *skip* verifikasi.

---

## 8) Interaksi Kontrak

Gunakan skrip `scripts/interact.js` (contoh: baca total supply, panggil burn, dst):

```bash
node scripts/interact.js --network bsc --address 0xYourDeployedAddress --method totalSupply
```

Atau gunakan *Read/Write Contract* di BscScan untuk alamat kontrak yang telah diverifikasi.

---

## 9) Standar Kode & Layout

- Kontrak berada di `contracts/token` (implementasi) dan `contracts/interfaces` (antarmuka).
- Gunakan OpenZeppelin v5 untuk primitive `ERC20`, `Permit`, `Burnable`, `Ownable`.
- Selalu aktifkan optimizer sesuai konfigurasi di `hardhat.config.cjs` sebelum produksi.

---

## 10) CI/CD

- **compile.yml / solidity.yml / test.yml**  
  - Build & test otomatis pada setiap push/PR.
- **verify.yml**  
  - Verifikasi ke BscScan (manual/dispatch) – membutuhkan `BSCSCAN_API_KEY`.

> Lihat tab **Actions** untuk memicu workflow secara manual.

---

## 11) Kontribusi

1. Fork → buat branch fitur/bugfix → commit kecil dan jelas.  
2. Pastikan `npx hardhat compile` dan `npx hardhat test` **lulus** sebelum PR.  
3. PR yang menyentuh kontrak harus menyertakan ringkasan perubahan dan alasan desain.

---

## 12) Keamanan

- Tidak ada pajak, blacklist, atau fungsi tersembunyi.  
- Hindari menyimpan private key di komputer bersama.  
- Jika terjadi insiden, baca `docs/SECURITY.md` dan kirim laporan tanggung jawab.

---

## 13) Tautan Penting

- **README:** `./README.md`  
- **API:** `./docs/API.md`  
- **Whitepaper:** `./docs/Whitepaper.md`  
- **Security:** `./docs/SECURITY.md`

---

**© NickgenomToken.**  
Dokumen ini untuk keperluan pengembangan internal dan dapat berubah sewaktu-waktu.
