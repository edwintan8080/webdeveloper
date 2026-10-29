# PHPMailer (vendored)

- Paket: PHPMailer v6.12.0 (https://github.com/PHPMailer/PHPMailer, lisensi LGPL-2.1 — lihat `LICENSE`).
- Berkas yang disalin dari `src/` rilis resmi: `PHPMailer.php`, `SMTP.php`, `Exception.php` (tanpa modifikasi).
- Dipakai hanya oleh `api/lib/inquiry-lib.php` untuk jalur transport SMTP terautentikasi.
- Kompabilitas: PHP 5.5–8.4. Jangan memakai Composer di repo ini (deploy FTPS polos).
- Update: ganti tiga berkas dari rilis baru resmi, naikkan catatan versi di sini, uji ulang dengan test harness SMTP lokal.
