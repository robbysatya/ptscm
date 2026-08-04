# PTSCM Website

Dokumentasi singkat untuk website PT Sarana Cahaya Makmur.

## Ringkasan

Aplikasi ini dibangun dengan Laravel 13 + Inertia.js (React) sebagai admin panel dan frontend publik. Sistem menggunakan Laravel Fortify untuk auth dan Laravel Wayfinder untuk tipe route yang terkelola.

## Teknologi

- PHP 8.5
- Laravel 13
- Inertia.js + React 19
- Vite + Tailwind CSS 4
- Laravel Fortify
- Laravel Wayfinder
- Pest untuk testing

## Struktur Utama

- `app/` - backend Laravel, model, controller, request, action
- `resources/js/` - frontend React / Inertia
  - `pages/` - halaman auth, admin, publik
  - `components/` - komponen UI dan layout
  - `layouts/` - layout auth / app
- `resources/views/app.blade.php` - template Inertia utama
- `public/assets/img/` - aset logo dan favicon

## Menjalankan Proyek

1. Install dependency PHP:
   ```bash
   composer install
   ```
2. Install dependency frontend:
   ```bash
   npm install
   ```
3. Salin file environment dan generate key:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
4. Jalankan migrasi (jika diperlukan):
   ```bash
   php artisan migrate
   ```
5. Jalankan server dev:
   ```bash
   npm run dev
   php artisan serve
   ```

> Jika menggunakan Sail atau container, sesuaikan perintah dengan environment Anda.

## Admin Panel

- URL admin biasanya di `/admin`
- Sidebar admin dan logo dikendalikan di `resources/js/components/app-sidebar.tsx` dan `resources/js/components/app-logo.tsx`
- Komponen `AppLogo` adalah tempat mengganti logo admin, termasuk dukungan tema dark/light.
- Menu admin mengandung Dashboard, Kategori, Produk, Berita, dan Pengguna.

## Halaman Login

- Form login berada di `resources/js/pages/auth/login.tsx`
- Layout login berada di:
  - `resources/js/layouts/auth/auth-simple-layout.tsx`
  - `resources/js/layouts/auth/auth-card-layout.tsx`
  - `resources/js/layouts/auth/auth-split-layout.tsx`
- Tema dan logo gelap/terang dikelola oleh hook `resources/js/hooks/use-appearance.tsx`.

## Ganti Logo dan Favicon

- Logo admin: `resources/js/components/app-logo.tsx`
- Logo publik: `resources/js/components/public/header.tsx`, `resources/js/components/public/footer.tsx`
- Favicon: `public/assets/img/favicon-ptscm.webp` dan `public/assets/img/favicon-ptscm-light.webp`
- Referensi favicon di `resources/views/app.blade.php`

## Gambar Produk dan Berita

- Produk dan berita disimpan di storage publik melalui `app/Actions/Media/StoreImageAction.php`
- Pastikan symlink storage dibuat jika belum:
  ```bash
  php artisan storage:link
  ```
- Komponen frontend menggunakan path `/storage/...` untuk menampilkan gambar yang diupload.

## Testing

- Jalankan test dengan:
  ```bash
  php artisan test --compact
  ```
- Pastikan `vendor/bin/pint` bisa dipakai untuk formatting:
  ```bash
  vendor/bin/pint --format agent
  ```

## Catatan Tambahan

- `package.json` berisi script `dev`, `build`, `lint`, dan `types:check`
- `composer.json` memakai script `setup`, `dev`, `test`, dan integrasi `boost`
- Jika logo tidak muncul, cek `resources/js/components/app-logo.tsx` dan aset pada `public/assets/img/`
- Untuk memperbaiki header aktif, logika path sudah disesuaikan di `resources/js/components/public/header.tsx`
