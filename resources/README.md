# Documentation

## 🔐 Mekanisme Login

### 1. Simulasi Login dengan Dummy Credential

Aplikasi menyediakan fitur login sederhana untuk keperluan simulasi, demo, atau evaluasi.

* **Credential Dummy**

  * Informasi login dapat diakses dengan mengklik teks **"Here"** yang berada di bawah form login.
  * Tindakan tersebut akan memunculkan pop-up berisi data login yang dapat langsung digunakan.
  * Credential juga tersedia di file dokumentasi `README.md`.

---

### 2. Middleware Login dengan React Context

Fitur login dikelola menggunakan React Context untuk memastikan akses hanya diberikan kepada pengguna yang telah terautentikasi.

#### Struktur Context

```ts
const AuthContext = createContext<AuthContextType>({
  auth: { email: "", isAuthenticated: false },
  setAuth: () => {},
});
```

* Nilai awal `auth` diambil dari `localStorage` jika tersedia, atau diset ke status tidak login.
* Setiap perubahan pada status auth akan disimpan kembali ke `localStorage`.

#### Penyedia Konteks

```tsx
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>(() => {
    const saved = localStorage.getItem("auth");
    return saved ? JSON.parse(saved) : { email: "", isAuthenticated: false };
  });

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
```

---

### 3. Middleware Proteksi Halaman

Rute-rute tertentu hanya dapat diakses jika pengguna sudah login. Proteksi dilakukan melalui middleware berikut:

```tsx
export const AuthMiddleware = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/login");
    }
  }, [auth.isAuthenticated, navigate]);

  return <Outlet />;
};
```

Jika pengguna belum login (`isAuthenticated === false`), maka akan otomatis diarahkan ke halaman login (`/login`).

---

### 4. Struktur Routing

```tsx
const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/login", element: <LoginPage /> },
  {
    path: "/",
    element: <AuthMiddleware />,
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          { path: "/home", element: <HomePage /> },
          { path: "/quiz", element: <QuizPage /> },
          { path: "/results/:id", element: <ResultsPage /> },
          { path: "/history", element: <HistoryPage /> },
          { path: "/settings", element: <SettingsPage /> },
        ],
      },
    ],
  },
]);
```

Semua halaman di dalam `AuthMiddleware` akan dicek status login-nya sebelum diakses.

---

### 5. Konfigurasi

Seluruh konfigurasi umum (termasuk credential, pengaturan UI, dan lainnya) dapat disesuaikan melalui file:

```sh
└── 📁src/lib/config.ts
```

---

## 📦 Sumber Data & Manajemen State

### 1. Sumber Soal Kuis

Semua soal dalam aplikasi ini bersumber dari **[Open Trivia Database (opentdb.com)](https://opentdb.com/)**, yang menyediakan kumpulan soal pilihan ganda dari berbagai kategori dan tingkat kesulitan.

#### Endpoint yang Digunakan

Aplikasi memanfaatkan tiga fungsi utama untuk mengambil data kuis:

```ts
// Mengambil kuis acak tanpa filter
getRandomQuiz(amount: number = 10)

// Mengambil kuis berdasarkan kategori tertentu
getQuizByCategory(category: number, amount: number = DEFAULT_QUESTIONS)

// Mengambil kuis berdasarkan opsi lengkap (kategori, jumlah, dan tingkat kesulitan)
getQuiz(options: QuizOptionsState)
```

Semua fungsi di atas menggunakan metode `fetch` untuk mengambil data dari endpoint API:

```sh
https://opentdb.com/api.php
```

Data yang diterima sudah dalam format JSON dan digunakan langsung dalam sistem kuis.

---

### 2. Manajemen State Global

Seluruh state aplikasi dikelola menggunakan **Zustand**, dengan pendekatan berikut:

* ✅ **Immutable update**
  Dibungkus dengan `immer()` agar update state bersifat immutable tanpa perlu menyalin objek secara manual.

* 💾 **Persistent storage**
  Beberapa state disimpan secara permanen menggunakan `persist()`, sehingga tetap tersimpan meskipun browser ditutup.

* 🧪 **Devtools integration**
  Mendukung [Zustand Devtools](https://github.com/pmndrs/zustand#middleware-devtools) untuk memantau perubahan state dan alur data aplikasi saat pengembangan.

#### Contoh Konfigurasi Store (gambaran umum)

```ts
const useQuizStore = create<QuizState>()(
  devtools(
    persist(
      immer((set) => ({
        questions: [],
        options: DEFAULT_OPTIONS,
        setOptions: (options) => set((state) => {
          state.options = options;
        }),
        setQuestions: (questions) => set((state) => {
          state.questions = questions;
        }),
        // ... fungsi lain
      })),
      { name: "quiz-storage" }
    )
  )
);
```

---

### 3. Keunggulan Pendekatan Ini

* **Modular & scalable**
  Setiap bagian state (kuis, jawaban, hasil, dll.) dikelola dalam store masing-masing dengan struktur yang terpisah namun konsisten.

* **Optimisasi performa**
  Dengan persistensi lokal dan pembaruan yang efisien, pengguna dapat melanjutkan kuis bahkan setelah reload halaman.

* **Integrasi realtime development**
  Devtools memudahkan debugging dan pengujian tanpa perlu banyak logging manual.

---

## Mekanisme Kuis

### 1. Pemilihan Kuis

Sebelum memulai kuis, pengguna dapat menyesuaikan beberapa pengaturan berikut:

* **Kategori Soal**
  Pengguna dapat memilih kategori dari berbagai opsi yang tersedia.
  *Default: General Knowledge*

* **Tingkat Kesulitan**
  Tersedia tiga tingkat kesulitan: *easy*, *medium*, dan *hard*.
  *Default: Easy*

* **Jumlah Soal**
  Pengguna dapat menentukan jumlah soal yang akan dikerjakan.
  *Default: 10 soal*

---

### 2. Mekanisme Pengerjaan

* **Satu Soal per Halaman**
  Setiap soal ditampilkan satu per satu. Setelah jawaban dipilih, sistem akan secara otomatis menampilkan soal berikutnya.

* **Timer Aktif Sepanjang Kuis**
  Waktu pengerjaan kuis dihitung secara total berdasarkan rumus: `jumlah soal × 5 detik`.
  Contoh: 10 soal = 50 detik total waktu.

* **Tidak Dapat Dijeda**
  Timer tidak dapat dihentikan sementara. Namun, jika tab atau browser ditutup, kuis masih dapat dilanjutkan selama waktu belum habis.

---

### 3. Timeout dan Melanjutkan Kuis

* **Lanjut Setelah Tab Ditutup**
  Status kuis disimpan secara otomatis di *localStorage*. Pengguna dapat melanjutkan pengerjaan kapan saja selama waktu tersisa masih ada.

* **Berakhir Otomatis saat Waktu Habis**
  Ketika waktu habis, kuis akan berhenti secara otomatis dan hasil langsung ditampilkan.
  *Soal yang belum dijawab akan ditandai sebagai "Timeout".*

---

### 4. Hasil dan Riwayat Kuis

* **Halaman Hasil (Results)**
  Setelah kuis selesai, sistem akan menampilkan rekapitulasi yang mencakup:

  * Total Soal
  * Jumlah Jawaban Benar
  * Jumlah Jawaban Salah
  * Jumlah Soal yang Timeout
  * Daftar Soal dan Jawaban Benar

* **Halaman Riwayat (History)**
  Seluruh riwayat kuis yang pernah dikerjakan tersimpan dan dapat diakses kembali kapan saja.

---
  Link Pengumpulan
[docs.google.com/forms](https://docs.google.com/forms/d/e/1FAIpQLSfbURyjv7HMBDXqTsZebXWn2kWPXDd1zV6aKQcndT5POMujqw/viewform)
