# Documentation

## 🧠 Cara Kerja Kuis

### 1. Pemilihan Kuis

Sebelum memulai kuis, kamu dapat menyesuaikan pengaturan berikut:

* **Kategori Soal**
  Pilih kategori favoritmu dari berbagai pilihan yang tersedia.
  *Default: General Knowledge*

* **Tingkat Kesulitan**
  Pilih antara *easy*, *medium*, atau *hard* sesuai dengan keinginan.
  *Default: Easy*

* **Jumlah Soal**
  Tentukan jumlah soal yang ingin kamu kerjakan.
  *Default: 10 soal*

---

### 2. Mekanisme Pengerjaan Kuis

* **Satu Soal per Halaman**
  Kuis akan menampilkan satu soal pada satu waktu. Setelah memilih jawaban, kamu langsung diarahkan ke soal berikutnya secara otomatis.

* **Timer Aktif Sepanjang Kuis**
  Waktu kuis dihitung secara total, yaitu `jumlah soal × 5 detik`.
  Contoh: 10 soal berarti 50 detik total waktu.

* **Tidak Bisa Dijeda**
  Timer tidak bisa di-pause. Namun, jika kamu menutup browser atau tab, kamu masih bisa melanjutkan selama waktu belum habis.

---

### 3. Mekanisme Timeout & Resume

* **Melanjutkan Kuis Setelah Menutup Tab**
  Kuis secara otomatis disimpan ke *localStorage*. Selama waktu masih tersisa, kamu bisa melanjutkan kapan saja.

* **Kuis Otomatis Berakhir Saat Waktu Habis**
  Jika waktu habis, kuis akan berhenti dan langsung menampilkan hasil.
  *Jawaban yang belum dijawab akan ditandai sebagai "Timeout".*

---

### 4. Hasil & Rekapitulasi Kuis

* **Halaman Hasil Kuis (Results)**
  Setelah menyelesaikan kuis, kamu akan melihat rekap hasil pengerjaan, termasuk:

  * Total Soal
  * Jumlah Jawaban Benar
  * Jumlah Jawaban Salah
  * Jumlah Soal yang Timeout
  * Daftar Soal dan Jawaban Benar

* **Halaman Riwayat Kuis (History)**
  Semua kuis yang telah kamu kerjakan tersimpan di halaman History untuk dilihat kembali kapan saja.

---
