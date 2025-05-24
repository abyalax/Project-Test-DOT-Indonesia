# 🛠️ Project Setup Guide

## 📦 Repository

**GitHub:** [abyalax/Project-Test-DOT-Indonesia](https://github.com/abyalax/Project-Test-DOT-Indonesia)

---

## ✅ Requirement

Sebelum memulai pengembangan atau menjalankan aplikasi, pastikan environment sudah memenuhi kebutuhan berikut:

* **Node.js** `>=18.x`
* **Package Manager:** `npm` atau `pnpm`
* **Vite** (sudah terintegrasi secara otomatis melalui `devDependencies`)
* **Modern browser** (untuk pengujian dan tampilan aplikasi)

---

## 🚀 Setup Development

1. **Clone repository**

   ```bash
   git clone https://github.com/abyalax/Project-Test-DOT-Indonesia.git
   cd Project-Test-DOT-Indonesia
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

   atau

   ```bash
   pnpm install
   ```

3. **Jalankan aplikasi**

   ```bash
   npm run dev
   ```

   Aplikasi akan berjalan di `http://localhost:5173/`

---

## 🧩 Struktur Folder

Berikut adalah struktur direktori utama dan deskripsinya:

```plaintext
📁 resources/          → Berisi dokumen pendukung
├─ documentation.md    → Dokumentasi semi teknis
├─ requirement.png     → Requierement dari DOT
├─ wireframe.excalidraw→ Wireframe desain halaman sederhana

📁 src/                → Folder utama kode aplikasi
├─ components/         → Komponen UI umum (reusable)
├─ context/            → Konteks global berbasis React Context API
│  └─ auth.tsx         → Manajemen otentikasi pengguna (AuthContext)
├─ hooks/              → Custom hooks lokal
│  ├─ use-countdown.ts → Hook untuk countdown timer kuis
│  └─ use-mobile.ts    → Deteksi tampilan mobile
├─ lib/                → Utilitas global dan konfigurasi
│  ├─ config.ts        → Konfigurasi default aplikasi (jumlah soal, dsb.)
│  └─ utils.ts         → Fungsi utilitas
├─ middlewares/        → Middleware untuk routing & otorisasi
│  └─ auth.tsx         → Middleware pengecekan autentikasi pengguna
├─ services/           → Layer komunikasi dengan API eksternal
│  └─ quiz.ts          → Service fetch kuis dari Open Trivia DB
├─ stores/             → State global menggunakan Zustand
│  ├─ use-history-quiz.ts   → Store untuk riwayat kuis
│  ├─ use-quiz-filter.ts    → Store untuk filter kuis
│  ├─ use-quiz-options.ts   → Store untuk opsi kuis
│  └─ use-quiz.ts           → Store utama untuk data kuis
├─ types/              → Definisi tipe TypeScript untuk berbagai entitas
│  ├─ quiz-history.ts
│  ├─ quiz-options.ts
│  └─ quiz-state.ts
├─ views/              → Halaman atau tampilan berdasarkan route
│  ├─ history/         → Halaman Riwayat Kuis
│  ├─ home/            → Halaman Beranda
│  ├─ login/           → Halaman Login
│  ├─ quiz/            → Halaman Kuis (index, idle)
│  ├─ results/         → Halaman Hasil Kuis (dinamis berdasarkan ID)
│  └─ settings/        → Halaman Pengaturan ( soon )
│  └─ landing-page.tsx → Halaman awal / landing
├─ App.tsx             → Root component
├─ index.css           → Gaya global
├─ main.tsx            → Entry point aplikasi (React + Vite)
├─ mock-data.ts        → Data dummy (jika diperlukan)
├─ routes.tsx          → Deklarasi semua route aplikasi
└─ vite-env.d.ts       → Deklarasi tipe lingkungan Vite
```

---

## 🔒 Login Credential (Simulasi)

Aplikasi ini menggunakan otentikasi sederhana berbasis **React Context** dan disimpan di **localStorage**.
Untuk keperluan demo/test, data login dummy bisa dilihat dengan mengklik tulisan berikut dibawah form login :

> `See Dummy Credential at "Here"`

📌 Jika diklik, akan muncul pop-up berisi:

```plaintext
Email: trivia@gmail.com
Password: trivia
```

Atau bisa dilihat langsung di dokumentasi README atau file konfigurasi:

```sh
└── src/lib/config.ts
```

---

## 🧱 Middleware & Auth

Seluruh route utama (`/home`, `/quiz`, `/results/:id`, dll.) dilindungi oleh middleware:

```tsx
middlewares/auth.tsx → <AuthMiddleware />
```

Jika `auth.isAuthenticated === false`, pengguna akan otomatis diarahkan ke halaman login (`/login`).

---

## 🗂️ State Management

Semua state global dikelola menggunakan:

* **Zustand** dengan wrapper:

  * `immer()` untuk immutable update
  * `persist()` untuk menyimpan state ke localStorage
  * `devtools()` untuk debug menggunakan Redux DevTools Extension

Store yang tersedia:

* `useQuizStore` – data kuis aktif
* `useQuizOptionsStore` – opsi pemilihan kuis
* `useHistoryQuizStore` – riwayat kuis
* `useQuizFilterStore` – filter tampilan riwayat

---
