<?php
/**
 * Tourduachina.id — endpoint inquiry form (POST /api/inquiry.php).
 *
 * Menerima data form inquiry dari website dan meneruskannya sebagai email
 * internal ke hello@tourduachina.id (lihat api/lib/inquiry-lib.php).
 * Tidak pernah mengirim email ke pelanggan.
 *
 * Respons JSON: {"ok": true|false, "error": string|null}
 */

require __DIR__ . '/lib/inquiry-lib.php';

header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');
header('Referrer-Policy: same-origin');

function t2c_inquiry_respond($status, $ok, $error)
{
    http_response_code($status);
    echo json_encode(array('ok' => $ok, 'error' => $error));
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    t2c_inquiry_respond(405, false, 'Gunakan POST.');
}

$contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($contentLength > 32768) {
    t2c_inquiry_respond(413, false, 'Payload terlalu besar.');
}

// Origin check longgar: browser mengirim Origin pada POST lintas-asal.
// Permintaan tanpa Origin (curl, klien lama) tetap diterima — dilindungi
// honeypot + pembatasan laju di pustaka.
$cfg = t2c_inquiry_config();
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
if ($origin !== '') {
    $host = parse_url($origin, PHP_URL_HOST);
    $allowed = $cfg['allowed_origins'];
    if (!is_string($host) || !in_array(strtolower($host), array_map('strtolower', $allowed), true)) {
        t2c_inquiry_respond(403, false, 'Origin tidak diizinkan.');
    }
}

$contentType = isset($_SERVER['CONTENT_TYPE']) ? strtolower($_SERVER['CONTENT_TYPE']) : '';
if (strpos($contentType, 'application/json') !== false) {
    $raw = file_get_contents('php://input');
    $input = json_decode($raw !== false ? $raw : '', true);
    if (!is_array($input)) {
        t2c_inquiry_respond(400, false, 'Payload tidak valid.');
    }
} else {
    $input = $_POST;
}

$result = t2c_inquiry_handle($input, array(
    'ip' => isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '',
    'ua' => isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '',
));

t2c_inquiry_respond($result['status'], $result['ok'], $result['error']);
