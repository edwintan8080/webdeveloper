<?php
/**
 * Tourduachina.id — pustaka backend inquiry form → email.
 *
 * Tujuan: menerima data form inquiry (booking-form & wa-float-form) dan
 * meneruskannya SEBAGAI EMAIL INTERNAL ke mailbox hello@tourduachina.id.
 *
 * Keamanan (baca sebelum mengubah):
 *  - Penerima (To) DIKUNCI di kode: selalu hello@tourduachina.id. Tidak ada
 *    input pengunjung yang dapat mengubah penerima, Cc, Bcc, From, Reply-To,
 *    Subject, header tambahan, atau lampiran.
 *  - TIDAK ADA email yang dikirim ke alamat pelanggan. Email pelanggan hanya
 *    dicantumkan di badan email (opsi Reply-To ke pelanggan dimatikan secara
 *    default; lihat konfigurasi 'reply_to_customer').
 *  - Semua isian dibersihkan dari karakter kontrol (anti header-injection),
 *    dibatasi panjangnya, dan divalidasi.
 *  - Honeypot + pembatasan laju per-IP sebagai anti-spam dasar.
 *
 * Jalur pengiriman:
 *  - 'mail'  : PHP mail() bawaan hosting (default; tanpa kredensial).
 *  - 'smtp'  : SMTP terautentikasi via PHPMailer (api/vendor/phpmailer),
 *              kredensial di berkas konfigurasi di luar git/webroot.
 *
 * Berkas konfigurasi opsional (salinan dari api/config.sample.php):
 *  1. env T2C_INQUIRY_CONFIG (path absolut — untuk pengujian/operasional)
 *  2. api/config.local.php (deploy manual, di-gitignore)
 *  3. DOCUMENT_ROOT/../t2c_mail_config.php atau ../../../t2c_mail_config.php
 *     relatif berkas ini — keduanya di LUAR webroot (DISARANKAN; kredensial
 *     tidak boleh berada di dalam webroot yang bisa diunduh publik).
 */

/** Penerima yang dikunci. Tidak dapat dioverride lewat konfigurasi. */
const T2C_INQUIRY_TO = 'hello@tourduachina.id';

/**
 * Susun konfigurasi: nilai bawaan + override dari berkas konfigurasi pertama
 * yang ditemukan. Kunci 'to' diabaikan bila ada di override (dikunci di kode).
 */
function t2c_inquiry_config()
{
    static $config = null;
    if ($config !== null) {
        return $config;
    }

    $config = array(
        'from' => T2C_INQUIRY_TO,
        'from_name' => 'Tourduachina.id Web',
        'reply_to_customer' => false,
        'transport' => null, // null = otomatis: 'smtp' bila kredensial lengkap, selainnya 'mail'
        'smtp' => array(
            'host' => 'smtp.hostinger.com',
            'port' => 465,
            'secure' => 'ssl', // 'ssl' (TLS implisit) | 'tls' (STARTTLS) | '' (tanpa TLS; hanya untuk uji lokal)
            'user' => '',
            'pass' => '',
        ),
        'rate_limit_per_hour' => 5,
        'allowed_origins' => array('tourduachina.id', 'www.tourduachina.id'),
    );

    $candidates = array();
    $envPath = getenv('T2C_INQUIRY_CONFIG');
    if (is_string($envPath) && $envPath !== '') {
        $candidates[] = $envPath;
    }
    $candidates[] = __DIR__ . '/../config.local.php';
    // Di luar webroot (repo root = webroot pada deploy FTPS; jangan simpan
    // kredensial di dalamnya). __DIR__ = <webroot>/api/lib → naik 3 tingkat.
    $candidates[] = __DIR__ . '/../../../t2c_mail_config.php';
    if (!empty($_SERVER['DOCUMENT_ROOT'])) {
        $candidates[] = dirname($_SERVER['DOCUMENT_ROOT']) . '/t2c_mail_config.php';
    }

    foreach ($candidates as $path) {
        if (is_string($path) && is_file($path)) {
            $override = include $path;
            if (is_array($override)) {
                foreach ($override as $key => $value) {
                    if ($key === 'to') {
                        continue; // penerima dikunci di kode
                    }
                    if ($key === 'smtp' && is_array($value)) {
                        $config['smtp'] = array_merge($config['smtp'], $value);
                    } else {
                        $config[$key] = $value;
                    }
                }
            }
            break;
        }
    }

    return $config;
}

/**
 * Bersihkan satu nilai teks: buang karakter kontrol, rapikan, batasi panjang.
 */
function t2c_clean($value, $maxLen, $keepNewlines = false)
{
    $value = (string) $value;
    if ($keepNewlines) {
        $value = str_replace(array("\r\n", "\r"), "\n", $value);
        $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', '', $value);
    } else {
        $value = preg_replace('/[\x00-\x1F\x7F]/', ' ', $value);
        $value = preg_replace('/\s+/', ' ', $value);
    }
    $value = trim($value);
    if (function_exists('mb_substr')) {
        return mb_substr($value, 0, $maxLen, 'UTF-8');
    }
    return substr($value, 0, $maxLen);
}

/**
 * Subject aman satu baris untuk header email.
 * Teks murni ASCII dikirim apa adanya (mb_encode_mimeheader dapat mengubah
 * teks ASCII yang mengandung karakter seperti "_" menjadi encoded-word);
 * hanya teks non-ASCII yang di-MIME-encode.
 */
function t2c_subject($value)
{
    $value = t2c_clean($value, 120, false);
    if (preg_match('/[^\x20-\x7E]/', $value) !== 1) {
        return $value;
    }
    if (function_exists('mb_encode_mimeheader')) {
        return mb_encode_mimeheader($value, 'UTF-8', 'B', "\r\n", 0);
    }
    return preg_replace('/[^\x20-\x7E]/', '?', $value);
}

/**
 * Pembatasan laju sederhana per-IP: maksimum N pengiriman per jam.
 * Mengembalikan true bila diizinkan.
 */
function t2c_rate_limit_ok($ip, $limit)
{
    $dir = rtrim(sys_get_temp_dir(), '/') . '/t2c-inquiry-rl';
    if (!is_dir($dir)) {
        @mkdir($dir, 0700, true);
    }
    $file = $dir . '/' . sha1((string) $ip) . '.json';
    $now = time();
    $stamps = array();

    $fp = @fopen($file, 'c+');
    if ($fp === false) {
        return true; // gagal menulis: jangan blokir inquiry sah; andalkan lapisan lain
    }
    flock($fp, LOCK_EX);
    $raw = stream_get_contents($fp);
    if ($raw !== false && $raw !== '') {
        $decoded = json_decode($raw, true);
        if (is_array($decoded)) {
            $stamps = $decoded;
        }
    }
    $stamps = array_values(array_filter($stamps, function ($t) use ($now) {
        return is_int($t) && ($now - $t) < 3600;
    }));
    $allowed = count($stamps) < (int) $limit;
    if ($allowed) {
        $stamps[] = $now;
        ftruncate($fp, 0);
        rewind($fp);
        fwrite($fp, json_encode($stamps));
    }
    flock($fp, LOCK_UN);
    fclose($fp);
    return $allowed;
}

/**
 * Susun badan email internal (teks polos, UTF-8).
 */
function t2c_build_body(array $d, array $meta)
{
    $lines = array(
        'Inquiry baru dari website tourduachina.id',
        '=========================================',
        'Form         : ' . $d['form'],
        'Nama         : ' . $d['name'],
        'WhatsApp     : ' . $d['whatsapp'],
        'Email        : ' . ($d['email'] !== '' ? $d['email'] : '-'),
        'Destinasi    : ' . ($d['destination'] !== '' ? $d['destination'] : '-'),
        'Jumlah Orang : ' . ($d['pax'] !== '' ? $d['pax'] : '-'),
        'Tanggal      : ' . ($d['date'] !== '' ? $d['date'] : '-'),
        'Durasi       : ' . ($d['duration'] !== '' ? $d['duration'] : '-'),
        'Pesan        : ' . ($d['message'] !== '' ? $d['message'] : '-'),
        '',
        '-----------------------------------------',
        'Waktu server (UTC) : ' . $meta['time'],
        'IP                  : ' . $meta['ip'],
        'User-Agent          : ' . $meta['ua'],
        '',
        'Email ini dikirim otomatis dari form website. Balas ke alamat di',
        'field "Email" bila perlu menghubungi calon tamu (kirim manual,',
        'jangan otomatis).',
    );
    return implode("\n", $lines) . "\n";
}

/**
 * Kirim email lewat mail() bawaan PHP.
 */
function t2c_send_via_mail(array $cfg, $subject, $body, $replyTo)
{
    $from = t2c_clean($cfg['from'], 120, false);
    $fromName = t2c_clean($cfg['from_name'], 80, false);
    $headers = 'From: ' . $fromName . ' <' . $from . '>' . "\r\n"
        . 'MIME-Version: 1.0' . "\r\n"
        . 'Content-Type: text/plain; charset=UTF-8' . "\r\n"
        . 'Content-Transfer-Encoding: 8bit';
    if ($replyTo !== '') {
        $headers .= "\r\n" . 'Reply-To: ' . $replyTo;
    }
    return @mail(T2C_INQUIRY_TO, $subject, $body, $headers);
}

/**
 * Kirim email lewat SMTP terautentikasi (PHPMailer, di-vendor di api/vendor).
 */
function t2c_send_via_smtp(array $cfg, $subject, $body, $replyTo, $replyToName)
{
    $libDir = __DIR__ . '/../vendor/phpmailer';
    if (!is_file($libDir . '/PHPMailer.php')) {
        return false;
    }
    require_once $libDir . '/Exception.php';
    require_once $libDir . '/PHPMailer.php';
    require_once $libDir . '/SMTP.php';

    try {
        $mail = new \PHPMailer\PHPMailer\PHPMailer(true);
        $mail->CharSet = 'UTF-8';
        $mail->isHTML(false);
        $mail->setFrom(t2c_clean($cfg['from'], 120, false), t2c_clean($cfg['from_name'], 80, false));
        $mail->addAddress(T2C_INQUIRY_TO);
        if ($replyTo !== '') {
            $mail->addReplyTo($replyTo, $replyToName);
        }
        $mail->Subject = $subject;
        $mail->Body = $body;

        $smtp = $cfg['smtp'];
        $mail->isSMTP();
        $mail->Host = t2c_clean($smtp['host'], 120, false);
        $mail->Port = (int) $smtp['port'];
        $secure = strtolower((string) $smtp['secure']);
        if ($secure === 'ssl') {
            $mail->SMTPSecure = \PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS;
        } elseif ($secure === 'tls') {
            $mail->SMTPSecure = \PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
        } else {
            $mail->SMTPSecure = false;
        }
        if ($smtp['user'] !== '') {
            $mail->SMTPAuth = true;
            $mail->Username = (string) $smtp['user'];
            $mail->Password = (string) $smtp['pass'];
        }
        $mail->Timeout = 20;
        $mail->send();
        return true;
    } catch (\Exception $e) {
        // Jangan bocorkan detail SMTP ke respons publik; cukup catat di log server.
        error_log('t2c_inquiry SMTP failure: ' . $e->getMessage());
        return false;
    }
}

/**
 * Titik masuk utama: terima array isian, kirim email inquiry internal.
 *
 * Mengembalikan array: ok (bool), status (int), error (string|null),
 * transport (string|null), dropped (string|null).
 *
 * $opts: 'ip' (override IP untuk pengujian), 'ua' (override User-Agent).
 */
function t2c_inquiry_handle(array $input, array $opts = array())
{
    $cfg = t2c_inquiry_config();

    // Honeypot: bot yang mengisi kolom tersembunyi dijawab sukses palsu tanpa kirim.
    $honeypot = isset($input['website']) ? t2c_clean($input['website'], 200, false) : '';
    if ($honeypot !== '') {
        return array('ok' => true, 'status' => 200, 'error' => null, 'transport' => null, 'dropped' => 'honeypot');
    }

    $data = array(
        'form' => isset($input['form']) ? t2c_clean($input['form'], 20, false) : '',
        'name' => isset($input['name']) ? t2c_clean($input['name'], 120, false) : '',
        'whatsapp' => isset($input['whatsapp']) ? t2c_clean($input['whatsapp'], 25, false) : '',
        'country_code' => isset($input['country_code']) ? preg_replace('/[^0-9+]/', '', t2c_clean($input['country_code'], 8, false)) : '',
        'email' => isset($input['email']) ? t2c_clean($input['email'], 120, false) : '',
        'destination' => isset($input['destination']) ? t2c_clean($input['destination'], 120, false) : '',
        'pax' => isset($input['pax']) ? t2c_clean($input['pax'], 6, false) : '',
        'date' => isset($input['date']) ? t2c_clean($input['date'], 40, false) : '',
        'duration' => isset($input['duration']) ? t2c_clean($input['duration'], 60, false) : '',
        'message' => isset($input['message']) ? t2c_clean($input['message'], 2000, true) : '',
    );
    if (!in_array($data['form'], array('booking', 'wa_float'), true)) {
        $data['form'] = 'unknown';
    }

    // Normalisasi nomor WhatsApp (cermin perilaku JS): kode negara + nomor tanpa nol di depan.
    if ($data['country_code'] !== '' && strpos($data['whatsapp'], '+') !== 0) {
        $data['whatsapp'] = $data['country_code'] . ltrim($data['whatsapp'], '0');
    }

    // Validasi (cermin aturan di sisi JS: nama + WhatsApp wajib)
    if ($data['name'] === '' || $data['whatsapp'] === '') {
        return array('ok' => false, 'status' => 422, 'error' => 'Nama dan WhatsApp wajib diisi.', 'transport' => null, 'dropped' => null);
    }
    if (preg_match('/\d{5,}/', str_replace(array('-', ' '), '', $data['whatsapp'])) !== 1) {
        return array('ok' => false, 'status' => 422, 'error' => 'Nomor WhatsApp tidak valid.', 'transport' => null, 'dropped' => null);
    }
    if ($data['email'] !== '' && filter_var($data['email'], FILTER_VALIDATE_EMAIL) === false) {
        return array('ok' => false, 'status' => 422, 'error' => 'Format email tidak valid.', 'transport' => null, 'dropped' => null);
    }
    if ($data['pax'] !== '' && (ctype_digit($data['pax']) === false || (int) $data['pax'] < 1 || (int) $data['pax'] > 999)) {
        return array('ok' => false, 'status' => 422, 'error' => 'Jumlah orang tidak valid.', 'transport' => null, 'dropped' => null);
    }

    // Pembatasan laju per-IP
    $ip = isset($opts['ip']) ? (string) $opts['ip'] : (string) (isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : 'cli');
    if (!t2c_rate_limit_ok($ip, (int) $cfg['rate_limit_per_hour'])) {
        return array('ok' => false, 'status' => 429, 'error' => 'Terlalu banyak permintaan; coba lagi nanti.', 'transport' => null, 'dropped' => null);
    }

    $meta = array(
        'time' => gmdate('Y-m-d H:i:s'),
        'ip' => t2c_clean($ip, 45, false),
        'ua' => isset($opts['ua']) ? t2c_clean($opts['ua'], 200, false) : t2c_clean(isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '-', 200, false),
    );

    $subject = '[Web Inquiry][' . $data['form'] . '] ' . $data['name'] . ' - ' . ($data['destination'] !== '' ? $data['destination'] : '-');
    $subject = t2c_subject($subject);
    $body = t2c_build_body($data, $meta);

    // Reply-To hanya bila dikonfigurasi DAN pelanggan mengisi email yang valid.
    $replyTo = '';
    $replyToName = '';
    if (!empty($cfg['reply_to_customer']) && $data['email'] !== '') {
        $replyTo = $data['email'];
        $replyToName = $data['name'];
    }

    $transport = $cfg['transport'];
    if ($transport === null) {
        $smtpReady = ($cfg['smtp']['host'] !== '' && $cfg['smtp']['user'] !== '' && $cfg['smtp']['pass'] !== '');
        $transport = $smtpReady ? 'smtp' : 'mail';
    }

    $sent = false;
    if ($transport === 'smtp') {
        $sent = t2c_send_via_smtp($cfg, $subject, $body, $replyTo, $replyToName);
        if (!$sent && $cfg['transport'] === null) {
            // Fallback otomatis hanya bila transport dipilih otomatis.
            $transport = 'mail';
            $sent = t2c_send_via_mail($cfg, $subject, $body, $replyTo);
        }
    } else {
        $sent = t2c_send_via_mail($cfg, $subject, $body, $replyTo);
    }

    if (!$sent) {
        error_log('t2c_inquiry: pengiriman email inquiry gagal (form=' . $data['form'] . ')');
        return array('ok' => false, 'status' => 502, 'error' => 'Pengiriman gagal; silakan coba lagi atau chat via WhatsApp.', 'transport' => $transport, 'dropped' => null);
    }

    return array('ok' => true, 'status' => 200, 'error' => null, 'transport' => $transport, 'dropped' => null);
}
