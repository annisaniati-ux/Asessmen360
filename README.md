# Asesmen 360° — Pegadaian

Aplikasi web asesmen 360° (Atasan / Rekan Kerja / Bawahan) untuk Pegadaian. Frontend statis (`index.html`) + backend penyimpanan data lewat Vercel Serverless Function (`api/kv.js`) yang tersambung ke database Vercel KV.

## 1. Push ke GitHub

Dari folder ini, jalankan:

```bash
git init
git add .
git commit -m "Initial commit - Asesmen 360 Pegadaian"
```

Buat repo baru di https://github.com/new (jangan centang "Add README", biar tidak bentrok), lalu:

```bash
git remote add origin https://github.com/USERNAME/NAMA-REPO.git
git branch -M main
git push -u origin main
```

## 2. Deploy ke Vercel

1. Buka https://vercel.com/new, login/daftar (bisa pakai akun GitHub).
2. Pilih **Import Git Repository**, cari repo yang barusan di-push, klik **Import**.
3. Framework Preset biarkan **Other** (terdeteksi otomatis). Klik **Deploy**.
4. Tunggu build selesai — situs sudah live, tapi datanya **belum tersimpan** karena database belum disambungkan (lanjut ke langkah 3).

## 3. Sambungkan database (Vercel KV)

1. Di dashboard project Vercel, buka tab **Storage**.
2. Klik **Create Database** → pilih **KV** (atau **Upstash for Redis**, sama saja, keduanya kompatibel dengan `@vercel/kv`).
3. Ikuti wizard-nya (pilih region terdekat, mis. Singapore), lalu klik **Connect** ke project ini.
4. Vercel otomatis menambahkan environment variable yang dibutuhkan (`KV_REST_API_URL`, `KV_REST_API_TOKEN`, dst) — tidak perlu diisi manual.
5. Buka tab **Deployments**, klik deployment terakhir → menu **⋯** → **Redeploy**, supaya environment variable baru terbaca.

## 4. Selesai

Buka URL project Anda (`https://nama-project.vercel.app`). Data karyawan yang sudah tertanam di file ini akan otomatis termuat ke database saat pertama kali dibuka.

Kalau di halaman muncul banner kuning "Database belum tersambung" — berarti langkah 3 belum selesai atau belum redeploy.

## Mengubah kata sandi admin

Cari baris berikut di `index.html` dan ganti nilainya:

```js
const ADMIN_PASSWORD = 'Pegadaian2026';
```

**Catatan keamanan:** ini proteksi level front-end saja (kata sandinya ada di source code yang bisa dilihat siapa pun yang cukup teknis membuka developer tools). Cukup untuk mencegah orang iseng, tapi untuk data karyawan yang sensitif, pertimbangkan menambahkan autentikasi sungguhan (mis. Vercel Access / NextAuth) kalau ini akan dipakai jangka panjang secara luas.

## Struktur proyek

```
├── index.html       # seluruh UI + logika aplikasi (vanilla JS)
├── api/
│   └── kv.js         # serverless function: GET/POST/DELETE key-value ke Vercel KV
├── package.json       # dependency @vercel/kv
└── .gitignore
```

## Update data peserta di kemudian hari

Tidak perlu edit kode. Login sebagai admin di aplikasi (tombol "Saya admin / HR"), lalu:
- **Import dari Excel** untuk upload data massal (format sheet "Data Multirater" atau "olah data" seperti sebelumnya), atau
- **Tambah penugasan cepat** untuk menambah satu relasi penilai secara manual.

Semua tersimpan otomatis ke database Vercel KV begitu terhubung.
