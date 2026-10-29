<?php
/**
 * Contoh konfigurasi backend inquiry — SALIN berkas ini, jangan isi di sini.
 *
 * Cara pakai (pilih satu):
 *  A. Disarankan: salin ke LUAR webroot, mis. ~/domains/tourduachina.id/t2c_mail_config.php
 *     (otomatis terbaca oleh api/lib/inquiry-lib.php; tidak bisa diunduh publik).
 *  B. Salin ke api/config.local.php lalu unggah manual ke server
 *     (berkas ini di-gitignore, jadi TIDAK ikut deploy otomatis).
 *  C. Untuk pengujian lokal: set env T2C_INQUIRY_CONFIG=/path/ke/berkas.php.
 *
 * Penerima email SELALU hello@tourduachina.id — dikunci di kode, tidak bisa
 * diubah dari sini. Kredensial di bawah hanya boleh disimpan di server,
 * JANGAN pernah ditempel di chat, issue, atau commit.
 */
return array(
    'from' => 'hello@tourduachina.id',
    'from_name' => 'Tourduachina.id Web',
    // true = pelanggan yang mengisi email akan jadi Reply-To (masih TIDAK ada
    // email otomatis ke pelanggan). Default false = email pelanggan hanya di badan.
    'reply_to_customer' => false,
    // 'transport' => 'mail', // PHP mail() bawaan hosting (default bila kredensial kosong)
    // 'transport' => 'smtp', // SMTP terautentikasi (otomatis dipakai bila kredensial terisi)
    'smtp' => array(
        'host' => 'smtp.hostinger.com',
        'port' => 465,
        'secure' => 'ssl', // 'ssl' = TLS implisit (465); 'tls' = STARTTLS (587)
        'user' => 'hello@tourduachina.id',
        'pass' => 'ISI-KATA-SANDI-MAILBOX-DI-SERVER',
    ),
    'rate_limit_per_hour' => 5,
);
