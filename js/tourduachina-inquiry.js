/**
 * Tourduachina.id — jembatan form inquiry → backend email.
 *
 * Modul ini mengirim SALINAN data form (booking-form & popup wa-float-form)
 * ke /api/inquiry.php agar inquiry masuk ke mailbox hello@tourduachina.id.
 * Alur WhatsApp yang ada TIDAK diubah: tombol tetap membuka wa.me seperti
 * biasa (fallback pelanggan), email dikirim diam-diam di latar belakang.
 *
 * Catatan teknis:
 * - Listener memakai fase capture pada document sehingga selalu membaca
 *   nilai form SEBELUM handler lain mereset form — urutan pemuatan script
 *   tidak berpengaruh.
 * - Payload yang sama tidak dikirim dua kali dalam 60 detik (double-click,
 *   Enter + klik). Server juga membatasi laju per-IP.
 * - Kolom honeypot "website" disuntikkan ke kedua form; bot yang mengisinya
 *   dibuang diam-diam oleh server.
 */
(function () {
  'use strict';

  var ENDPOINT = '/api/inquiry.php';
  var RESEND_WINDOW_MS = 5000; // cukup untuk menyerap double-click / Enter+klik; tetap mengizinkan retry
  var sent = {}; // hash payload -> timestamp

  function field(id) {
    var el = document.getElementById(id);
    return el ? String(el.value || '').trim() : '';
  }

  function payloadHash(p) {
    return [p.form, p.name, p.whatsapp, p.email, p.destination, p.pax, p.date, p.duration, p.message].join('|');
  }

  function send(payload, formEl) {
    try {
      var key = payloadHash(payload);
      var now = Date.now();
      if (sent[key] && now - sent[key] < RESEND_WINDOW_MS) return;
      sent[key] = now;

      var hp = formEl ? formEl.querySelector('input[name="website"]') : null;
      payload.website = hp ? String(hp.value || '') : '';

      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
        credentials: 'same-origin'
      }).catch(function () {
        // Gagal kirim salinan email tidak mengganggu pelanggan: jalur WhatsApp tetap jalan.
        // Hapus penanda dedup agar submit ulang identik dalam jendela pendek tetap terkirim.
        delete sent[key];
      });
    } catch (e) {
      // diam — jangan pernah ganggu UX form
    }
  }

  function bookingPayload() {
    var cc = field('country-code') || '+62';
    var num = field('whatsapp').replace(/^0+/, '');
    return {
      form: 'booking',
      name: field('name'),
      country_code: cc,
      whatsapp: num ? cc + num : '',
      email: field('email'),
      destination: field('destination'),
      pax: field('pax'),
      date: field('date'),
      duration: field('duration'),
      message: field('message')
    };
  }

  function floatPayload() {
    var cc = field('waf-cc') || '+62';
    var num = field('waf-phone').replace(/^0+/, '');
    return {
      form: 'wa_float',
      name: field('waf-name'),
      country_code: cc,
      whatsapp: num ? cc + num : '',
      email: '',
      destination: field('waf-dest'),
      pax: '',
      date: '',
      duration: '',
      message: field('waf-msg')
    };
  }

  function injectHoneypot(form) {
    if (!form || form.querySelector('input[name="website"]')) return;
    var input = document.createElement('input');
    input.type = 'text';
    input.name = 'website';
    input.value = '';
    input.autocomplete = 'off';
    input.tabIndex = -1;
    input.setAttribute('aria-hidden', 'true');
    input.style.cssText = 'position:absolute;left:-9999px;top:-9999px;opacity:0;height:0;width:0;';
    form.appendChild(input);
  }

  function init() {
    var booking = document.getElementById('booking-form');
    var floatForm = document.getElementById('wa-float-form');
    injectHoneypot(booking);
    injectHoneypot(floatForm);

    // Fase capture: baca nilai form sebelum handler lain (mis. reset) berjalan.
    document.addEventListener('submit', function (e) {
      var form = e.target;
      if (!form || !form.id) return;
      if (form.id === 'booking-form') {
        // Cermin validasi core.js: nama + WhatsApp + destinasi + pax wajib.
        var p = bookingPayload();
        if (p.name && p.whatsapp && p.destination && p.pax) send(p, booking);
      } else if (form.id === 'wa-float-form') {
        // Cermin validasi waSendChat: nama + nomor wajib.
        var q = floatPayload();
        if (q.name && q.whatsapp) send(q, floatForm);
      }
    }, true);

    // Tombol "Chat via WhatsApp" pada popup (type=button, tidak memicu submit).
    document.addEventListener('click', function (e) {
      var btn = e.target && e.target.closest ? e.target.closest('.wa-form__submit') : null;
      if (!btn) return;
      var q = floatPayload();
      if (q.name && q.whatsapp) send(q, floatForm);
    }, true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
