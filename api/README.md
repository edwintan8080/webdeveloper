# Backend inquiry form → email (tourduachina.id)

Backend kecil untuk menerima submit form inquiry di website dan
meneruskannya sebagai **email internal** ke `hello@tourduachina.id`.
Tidak ada email yang pernah dikirim ke pelanggan dari jalur ini.

## Berkas

| Berkas | Fungsi |
|---|---|
| `inquiry.php` | Endpoint publik: `POST /api/inquiry.php` (JSON atau form). |
| `lib/inquiry-lib.php` | Validasi, anti-spam, penyusunan email, transport pengiriman. |
| `config.sample.php` | Contoh konfigurasi (salin, jangan isi di sini). |
| `vendor/phpmailer/` | PHPMailer v6.12.0 (LGPL-2.1), dipakai untuk transport SMTP. |

## Alur data

```
Form (booking-form / popup wa-float-form)
  → js/tourduachina-inquiry.js (fetch POST, diam-diam, keepalive)
  → POST /api/inquiry.php (validasi + honeypot + pembatasan laju 5/jam/IP)
  → email teks polos ke hello@tourduachina.id
```

Alur WhatsApp tetap utuh (tombol tetap membuka `wa.me`); email adalah salinan
internal untuk diproses menjadi quotation.

## Keamanan (ringkas)

- **Penerima dikunci di kode**: selalu `hello@tourduachina.id`. Input pengunjung
  tidak dapat mengubah penerima, Cc/Bcc, From, Reply-To, Subject, atau header.
- **Tidak ada auto-reply / pengiriman ke pelanggan.** Email pelanggan hanya
  dicantumkan di badan email (opsi `reply_to_customer` = `Reply-To`, default mati).
- Anti header-injection: semua isian dibersihkan dari karakter kontrol dan
  dibatasi panjangnya.
- Honeypot `website` + pembatasan laju per-IP (default 5/jam) + pemeriksaan
  Origin + batas payload 32 KB.
- Kredensial SMTP TIDAK pernah ada di repo; lihat konfigurasi di bawah.

## Konfigurasi pengiriman

Dua transport:

1. **`mail`** (default, tanpa kredensial): PHP `mail()` bawaan hosting.
   Cukup untuk mulai; deliverabilitas mengikuti infrastruktur mail hosting.
2. **`smtp`** (disarankan untuk produksi): SMTP terautentikasi
   `smtp.hostinger.com:465` (TLS implisit) atau `:587` (STARTTLS) dengan
   akun mailbox `hello@tourduachina.id`, lewat PHPMailer.

Pilih transport dengan konfigurasi (salin `config.sample.php`):

- **Disarankan**: taruh di luar webroot —
  `~/domains/tourduachina.id/t2c_mail_config.php`
  (otomatis terbaca; tidak bisa diunduh publik).
- Alternatif: `api/config.local.php` + unggah manual (di-gitignore, tidak ikut
  deploy otomatis).
- Pengujian lokal: env `T2C_INQUIRY_CONFIG=/path/ke/berkas.php`.

Jika kredensial SMTP terisi, transport `smtp` dipakai otomatis (fallback ke
`mail` hanya bila SMTP gagal dan transport dipilih otomatis).

## Cara pengujian

### 1. Uji lokal (tanpa hosting) — bukti level "SMTP capture lokal"

Dari mesin dengan PHP CLI (test harness ada di
`/Volumes/Storage/T2C/IT/email_automation/`):

```sh
python3 smtp_capture.py            # terminal 1: SMTP capture di 127.0.0.1:2525
php test_inquiry_local.php         # terminal 2: kirim 6 skenario uji
```

Hasil yang diharapkan: skenario valid menghasilkan email tertangkap dengan
`To: hello@tourduachina.id`, subjek `[Web Inquiry][...]`, dan seluruh field;
honeypot tidak mengirim; isian tidak valid ditolak 422; kiriman ke-6 dari IP
sama ditolak 429; upaya header-injection tidak menambah header.

### 2. Uji pasca-deploy (butuh persetujuan merge/deploy)

1. Merge PR ke `main` (deploy FTPS otomatis) — **keputusan Edwin**.
2. Buka `https://tourduachina.id`, isi form inquiry uji dengan penanda
   `[TEST-IT]` di pesan, submit.
3. Buka `https://tourduachina.id/api/inquiry.php` dengan GET → harus 405
   (bukti endpoint hidup).
4. Periksa mailbox `hello@tourduachina.id` (via MCP read-only sales-manager):
   email inquiry uji harus masuk INBOX dalam ±1 menit. **Inbox receipt adalah
   bukti final** — penerimaan transport saja belum cukup.
5. Ulangi sekali dari popup WhatsApp (form kecil) untuk jalur `wa_float`.
6. Kirim balasan manual ke email pelanggan dari mailbox (manual, bukan otomatis).

### 3. Batas bukti yang sudah ada sekarang

- ✅ Logika handler + komposisi email + transport SMTP: diuji lokal (SMTP capture).
- ✅ Sintaks JS modul bridge: `node --check`.
- ⬜ Eksekusi PHP di hosting, deliverabilitas sesungguhnya, dan receipt inbox:
  **belum teruji** — menunggu persetujuan deploy Edwin.

## Pemeliharaan

- Naikkan parameter `?v=` pada `js/tourduachina-inquiry.js` di `index.html`
  setiap kali modul diubah (cache busting).
- Update PHPMailer: ganti tiga berkas di `vendor/phpmailer/` dari rilis resmi
  (lihat `vendor/phpmailer/README.md`).
- Log kegagalan pengiriman ada di error log PHP hosting
  (`t2c_inquiry: ...`).
