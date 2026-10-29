/**
 * Tourduachina.id — Tombol bahasa EN/ID (client-side)
 * Version: 1.0.0 · 2026-10-29
 *
 * Cara kerja
 *  - Sumber halaman tetap Bahasa Indonesia (default, dan yang dibaca/diindeks Google).
 *  - Klik tombol EN/ID menukar teks (text node + atribut placeholder/aria-label/title/alt) memakai DICT di bawah.
 *  - Pilihan disimpan di localStorage ("t2c_lang"). ?lang=en atau ?lang=id pada URL mengalahkan pilihan tersimpan
 *    (berguna untuk link di bio Instagram, mis. https://tourduachina.id/?lang=en).
 *  - Teks yang tidak ada di DICT dibiarkan apa adanya (tetap Indonesia). Saat menambah/mengubah teks Indonesia
 *    di index.html, tambahkan/ubah pasangannya di DICT (kunci = teks Indonesia persis seperti di halaman,
 *    spasi/enter berlebih diabaikan).
 *  - Pesan WhatsApp: label field berbahasa Indonesia TIDAK diubah (format baku yang dibaca tim T2C).
 *    Pada mode EN ditambahkan satu baris di akhir pesan agar tim membalas dalam bahasa Inggris.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 't2c_lang';
  var WA_NOTE_EN = '\n\n(Language: English \u2014 please reply in English.)';
  var TITLE_ID = "Tourduachina.id — Private Tour ke China Tanpa Ribet";
  var DESC_ID = "Private tour ke China untuk wisatawan Indonesia. Pemandu berbahasa Indonesia, visa assistance, harga transparan. Beijing, Shanghai, Xi'an, Chengdu & lainnya.";
  var DICT = {
  "Paket Tour": "Tour Packages",
  "Layanan": "Services",
  "Tentang": "About",
  "Kontak": "Contact",
  "Chat Kami": "Chat With Us",
  "🇨🇳 Spesialis Private Tour ke China": "🇨🇳 China Private Tour Specialist",
  "Private Tour ke China,": "Private Tours to China,",
  "Tanpa Ribet": "Hassle-Free",
  "Jelajahi Tembok Besar, Kota Terlarang, Panda Chengdu, dan keajaiban China lainnya. Tour private, pemandu Indonesia, harga transparan.": "Explore the Great Wall, the Forbidden City, Chengdu's pandas and more of China's wonders. Private tours, Indonesian-speaking guides, transparent pricing.",
  "Mulai Petualangan →": "Start Your Adventure →",
  "Lihat Paket Tour": "View Tour Packages",
  "Destinasi China": "China Destinations",
  "Wisatawan Puas": "Happy Travelers",
  "Tahun Pengalaman": "Years of Experience",
  "✨ Tentang Kami": "✨ About Us",
  "Partner Travel Terpercaya untuk": "Trusted Travel Partner for Your",
  "Petualangan China": "China Adventure",
  "Anda": "",
  "Tourduachina.id hadir dari pengalaman pribadi founder yang kesulitan traveling ke China. Kami memahami tantangan bahasa, budaya, dan logistik yang dihadapi wisatawan Indonesia. Itulah mengapa kami membangun layanan private tour yang benar-benar memikirkan kenyamanan Anda.": "Tourduachina.id was born from the founder's own struggles traveling to China. We understand the language, cultural and logistical challenges Indonesian travelers face. That is why we built a private tour service that truly puts your comfort first.",
  "Pemandu lokal berbahasa Indonesia & Mandarin": "Local guides who speak Indonesian & Mandarin",
  "Itinerary custom sesuai keinginan Anda": "Custom itinerary tailored to your wishes",
  "Bantuan proses visa China dari awal": "Help with the China visa process from the very start",
  "Harga transparan tanpa hidden cost": "Transparent pricing, no hidden costs",
  "Konsultasi Gratis →": "Free Consultation →",
  "Pilih": "Choose Your",
  "Petualangan": "Adventure",
  "Setiap paket dirancang untuk pengalaman terbaik. Semua bisa dicustom sesuai keinginan Anda.": "Every package is designed for the best experience. Everything can be customized to your wishes.",
  "Populer": "Popular",
  "5 Hari 4 Malam • Tembok Besar, Forbidden City": "5 Days 4 Nights • Great Wall, Forbidden City",
  "4 Hari 3 Malam • The Bund, Yu Garden": "4 Days 3 Nights • The Bund, Yu Garden",
  "4 Hari 3 Malam • Terracotta Warriors": "4 Days 3 Nights • Terracotta Warriors",
  "4 Hari 3 Malam • Panda Base, Jinli Street": "4 Days 3 Nights • Panda Base, Jinli Street",
  "5 Hari 4 Malam • Li River, Yangshuo": "5 Days 4 Nights • Li River, Yangshuo",
  "5 Hari 4 Malam • Avatar Mountains": "5 Days 4 Nights • Avatar Mountains",
  "8 Hari 7 Malam • Beijing-Xi'an-Shanghai": "8 Days 7 Nights • Beijing-Xi'an-Shanghai",
  "Hubungi Kami": "Contact Us",
  "Hubungi Kami →": "Contact Us →",
  "Pesan": "Book",
  "Buat itinerary sesuai keinginan Anda": "Build an itinerary your way",
  "Kenapa Pilih Kami": "Why Choose Us",
  "Tour Private,": "Private Tours,",
  "Pengalaman Maksimal": "Maximum Experience",
  "Kami bukan tour rombongan besar. Hanya Anda, keluarga, dan pemandu pribadi.": "We are not a big group tour. Just you, your family and a private guide.",
  "Bukan rombongan besar. Hanya keluarga atau grup Anda sendiri. Jadwal fleksibel sesuai keinginan.": "No big tour groups. Just your own family or group. Flexible schedule, your way.",
  "Pemandu Indonesia": "Indonesian Guides",
  "Pemandu fasih bahasa Indonesia & Mandarin. Komunikasi lancar, tanpa barrier bahasa.": "Guides fluent in Indonesian & Mandarin. Smooth communication, no language barrier.",
  "Kami bantu proses visa China dari awal. Anda cukup siapkan dokumen, sisanya kami urus.": "We help with the China visa process from the start. Just prepare your documents and we'll handle the rest.",
  "Harga Transparan": "Transparent Pricing",
  "No hidden cost. Semua biaya tercantum jelas di awal. Tidak ada kejutan di akhir perjalanan.": "No hidden costs. All costs are clearly stated upfront. No surprises at the end of your trip.",
  "Layanan Kami": "Our Services",
  "Semua yang Anda Butuhkan,": "Everything You Need,",
  "Kami Siapkan": "We Take Care of It",
  "Dari perencanaan hingga kepulangan, kami handle semua detailnya.": "From planning to your return home, we handle every detail.",
  "Rencana perjalanan detail yang disesuaikan dengan minat, budget, dan gaya traveling Anda.": "A detailed travel plan tailored to your interests, budget and travel style.",
  "Mobil pribadi dengan supir untuk kenyamanan maksimal. Pilih dari sedan hingga van.": "Private car with a driver for maximum comfort. Choose from a sedan to a van.",
  "Bantuan pengurusan visa China. Proses mudah, tanpa perlu ke visa center sendiri.": "Help with your China visa. An easy process, with no need to go to the visa center yourself.",
  "Tetap terkoneksi selama di China. WiFi portable tanpa perlu VPN untuk akses WhatsApp & Instagram.": "Stay connected in China. Portable WiFi with no VPN needed to access WhatsApp & Instagram.",
  "Abadikan momen terbaik dengan fotografer profesional di destinasi ikonik China.": "Capture your best moments with a professional photographer at China's iconic destinations.",
  "Penjemputan dan pengantaran bandara. Tidak perlu bingung cari transportasi sendiri.": "Airport pick-up and drop-off. No need to figure out transportation on your own.",
  "Destinasi": "Destinations",
  "Mau ke": "Where Do You Want",
  "Mana": "to Go",
  "Dulu?": "First?",
  "Dari tembok kuno hingga pegunungan megah, China punya semuanya.": "From ancient walls to majestic mountains, China has it all.",
  "Ibu Kota China": "China's Capital",
  "Kota Modern": "Modern City",
  "Kota Kuno": "Ancient City",
  "Kota Panda": "Panda City",
  "Sungai & Pegunungan": "Rivers & Mountains",
  "Testimoni": "Testimonials",
  "Cerita dari": "Stories from",
  "Wisatawan": "Our Travelers",
  "Kami": "",
  "Dengarkan langsung pengalaman mereka yang sudah merasakan private tour bersama kami.": "Hear directly from those who have experienced a private tour with us.",
  "\"Pertama kali ke China, tapi semuanya berjalan lancar berkat Tourduachina.id! Pemandu sangat helpful, sabar, dan tahu banget tempat-tempat bagus. Highly recommended!\"": "\"My first time in China, and everything went smoothly thanks to Tourduachina.id! The guide was very helpful, patient, and really knew all the great places. Highly recommended!\"",
  "\"Anak-anak senang banget lihat panda di Chengdu! Private tour bikin kami fleksibel atur jadwal. Ga perlu buru-buru kayak rombongan besar. Worth every rupiah!\"": "\"The kids loved seeing the pandas in Chengdu! A private tour let us set our own schedule. No need to rush like in a big group. Worth every rupiah!\"",
  "\"Zhangjiajie luar biasa indah! Tim Tourduachina.id sangat profesional dari awal planning sampai akhir trip. Visa juga dibantu, jadi ga ribet sama sekali.\"": "\"Zhangjiajie is incredibly beautiful! The Tourduachina.id team was very professional from the start of planning to the end of the trip. They helped with the visa too, so it was no hassle at all.\"",
  "Budi & Keluarga": "Budi & Family",
  "Pertanyaan yang": "Frequently",
  "Sering Ditanyakan": "Asked Questions",
  "Apakah paket tour termasuk tiket pesawat?": "Do the tour packages include flight tickets?",
  "Tidak, paket tour kami tidak termasuk tiket pesawat. Kami fokus pada layanan di China: akomodasi, transportasi lokal, pemandu, dan tiket masuk destinasi. Ini memberi Anda fleksibilitas untuk memilih maskapai dan jadwal penerbangan sendiri.": "No, our tour packages do not include flight tickets. We focus on our services in China: accommodation, local transportation, guides, and entrance tickets. This gives you the flexibility to choose your own airline and flight schedule.",
  "Bagaimana proses pembuatan visa China?": "How does the China visa process work?",
  "Kami menyediakan layanan visa assistance. Anda cukup menyiapkan dokumen yang diperlukan (paspor, foto, dll), dan tim kami akan membantu proses pengajuan visa China dari awal hingga selesai. Proses biasanya memakan waktu 4-7 hari kerja.": "We provide visa assistance. You only need to prepare the required documents (passport, photo, etc.), and our team will help with the China visa application from start to finish. The process usually takes 4–7 working days.",
  "Berapa minimal peserta untuk private tour?": "What is the minimum number of participants for a private tour?",
  "Minimal 1 orang! Private tour berarti hanya grup Anda — bisa solo traveler, berdua dengan pasangan, keluarga, atau grup teman. Tidak akan digabung dengan rombongan lain.": "Just 1 person! A private tour means it is only your group — you can be a solo traveler, a couple, a family, or a group of friends. You will not be merged with other groups.",
  "Apakah ada pemandu berbahasa Indonesia?": "Are there Indonesian-speaking guides?",
  "Ya, semua pemandu kami fasih berbahasa Indonesia dan Mandarin. Komunikasi lancar tanpa barrier bahasa. Pemandu juga akan membantu Anda di restoran, toko, dan tempat-tempat yang tidak berbahasa Inggris.": "Yes, all of our guides are fluent in Indonesian and Mandarin. Communication is smooth with no language barrier. Guides will also help you at restaurants, shops, and places where English is not spoken.",
  "Kapan waktu terbaik mengunjungi China?": "When is the best time to visit China?",
  "China bisa dikunjungi sepanjang tahun! Musim semi (Maret-Mei) dan gugur (September-November) adalah waktu paling nyaman. Setiap destinasi punya waktu terbaiknya sendiri. Konsultasikan dengan kami untuk rekomendasi sesuai destinasi pilihan Anda.": "China can be visited all year round! Spring (March–May) and autumn (September–November) are the most comfortable seasons. Each destination has its own best time. Consult us for recommendations based on your chosen destination.",
  "Apakah aman berwisata ke China?": "Is it safe to travel in China?",
  "Sangat aman. China memiliki tingkat kriminalitas sangat rendah, terutama di kota-kota besar. CCTV ada di mana-mana. Dengan pemandu lokal yang menemani, Anda akan merasa lebih nyaman dan terlindungi selama perjalanan.": "Very safe. China has a very low crime rate, especially in big cities. CCTV is everywhere. With a local guide accompanying you, you will feel more comfortable and protected throughout your trip.",
  "Bagaimana sistem pembayaran di China?": "How do payments work in China?",
  "China mayoritas cashless menggunakan Alipay atau WeChat Pay. Tim kami akan membantu Anda setup sebelum berangkat. Tunai juga masih diterima di banyak tempat, tapi beberapa toko sering tidak punya kembalian kecil.": "China is mostly cashless, using Alipay or WeChat Pay. Our team will help you set it up before departure. Cash is still accepted in many places, but some shops often don't have small change.",
  "Apakah bisa custom itinerary?": "Can I customize my itinerary?",
  "Tentu! Itinerary bisa disesuaikan 100% dengan keinginan Anda. Mau tambah destinasi, ubah jadwal, skip tempat tertentu, semua bisa diatur. Itulah kelebihan private tour — Anda yang tentukan.": "Of course! The itinerary can be 100% customized to your wishes. Want to add destinations, change the schedule, or skip certain places? Everything can be arranged. That's the advantage of a private tour — you decide.",
  "Mulai Rencanakan": "Start Planning Your",
  "Trip China": "China Trip",
  "Isi form di samping atau hubungi kami langsung via WhatsApp. Tim kami akan merespons dalam 1 jam pada jam kerja.": "Fill out the form or contact us directly via WhatsApp. Our team will respond within 1 hour during working hours.",
  "Lokasi": "Location",
  "Jam Operasional": "Operating Hours",
  "Senin-Sabtu, 09:00-18:00 (GMT+8)": "Monday–Saturday, 09:00–18:00 (GMT+8)",
  "Rencanakan Trip China Anda": "Plan Your China Trip",
  "Isi form di bawah, tim kami akan merespons dalam 1 jam": "Fill in the form below and our team will respond within 1 hour",
  "Kirim": "Send",
  "Nama Lengkap *": "Full Name *",
  "Selanjutnya": "Next",
  "Pilih destinasi": "Select a destination",
  "🏛️ Beijing — Tembok Besar & Kota Terlarang": "🏛️ Beijing — Great Wall & Forbidden City",
  "⚔️ Xi'an — Tentara Terracotta": "⚔️ Xi'an — Terracotta Army",
  "🐼 Chengdu — Panda & Kuliner Sichuan": "🐼 Chengdu — Pandas & Sichuan Cuisine",
  "🏔️ Guilin — Pemandangan Karst": "🏔️ Guilin — Karst Landscapes",
  "🌄 Zhangjiajie — Gunung Avatar": "🌄 Zhangjiajie — Avatar Mountains",
  "✨ China Golden Route (Multi-Kota)": "✨ China Golden Route (Multi-City)",
  "🎨 Custom Trip Sesuai Keinginan": "🎨 Custom Trip, Your Way",
  "Destinasi Minat *": "Destination of Interest *",
  "Jumlah Orang *": "Number of Travelers *",
  "Tanggal Rencana": "Planned Date",
  "Pilih durasi": "Select a duration",
  "3 Hari 2 Malam": "3 Days 2 Nights",
  "4 Hari 3 Malam": "4 Days 3 Nights",
  "5 Hari 4 Malam": "5 Days 4 Nights",
  "7 Hari 6 Malam": "7 Days 6 Nights",
  "Custom Durasi": "Custom Duration",
  "Durasi Trip": "Trip Duration",
  "Pesan / Request Khusus": "Message / Special Requests",
  "Kembali": "Back",
  "Kirim & Dapatkan Penawaran": "Send & Get a Quote",
  "Data Anda Aman": "Your Data Is Safe",
  "Respon 1 Jam": "1-Hour Response",
  "Konsultasi Gratis": "Free Consultation",
  "Spesialis private tour ke China untuk wisatawan Indonesia. Pemandu berbahasa Indonesia, visa assistance, harga transparan.": "Private tour specialist for China, for Indonesian travelers. Indonesian-speaking guides, visa assistance, transparent pricing.",
  "🕐 Sen-Sab 09:00-18:00 (GMT+8)": "🕐 Mon–Sat 09:00–18:00 (GMT+8)",
  "Halo! 👋 Isi form singkat ini, kami akan langsung balas via WhatsApp.": "Hello! 👋 Fill in this short form and we'll reply right away via WhatsApp.",
  "Wisatawan berjalan di kawasan perkotaan": "Travelers walking through an urban district",
  "Wisatawan berfoto bersama maskot harimau": "Travelers posing with a tiger mascot",
  "Wisatawan menikmati hidangan di restoran": "Travelers enjoying a meal at a restaurant",
  "Wisatawan berfoto di jalan wisata": "Travelers taking photos on a tourist street",
  "Kode negara": "Country code",
  "Tutup": "Close",
  "Nama Anda *": "Your name *",
  "Nomor WhatsApp *": "WhatsApp number *",
  "Destinasi (mis. Beijing, Shanghai)": "Destination (e.g. Beijing, Shanghai)",
  "Pesan / pertanyaan Anda": "Your message / question",
  "1 Hari (Day Tour)": "1 Day (Day Tour)",
  "2 Hari 1 Malam": "2 Days 1 Night",
  "8 Hari 7 Malam": "8 Days 7 Nights",
  "Mohon isi nama dan nomor WhatsApp Anda": "Please enter your name and WhatsApp number",
  "Mohon isi nama dan WhatsApp Anda": "Please enter your name and WhatsApp number",
  "Mohon lengkapi destinasi dan jumlah orang": "Please select a destination and enter the number of travelers",
  "Pesan dikirim ke WhatsApp! Silakan cek tab baru.": "Message sent to WhatsApp! Please check the new tab.",
  "Destinasi dipilih": "Destination selected",
  "Tourduachina.id — Private Tour ke China Tanpa Ribet": "Tourduachina.id — Private Tours to China, Hassle-Free",
  "Private tour ke China untuk wisatawan Indonesia. Pemandu berbahasa Indonesia, visa assistance, harga transparan. Beijing, Shanghai, Xi'an, Chengdu & lainnya.": "Private tours to China for Indonesian travelers. Indonesian-speaking guides, visa assistance, transparent pricing. Beijing, Shanghai, Xi'an, Chengdu & more."
};
  var ATTRS = ['placeholder', 'aria-label', 'title', 'alt'];
  var SKIP = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, TEMPLATE: 1 };

  var lang = 'id';
  var touched = new Map(); // text node -> nilai asli (Indonesia)

  function has(k) { return Object.prototype.hasOwnProperty.call(DICT, k); }
  function norm(s) { return String(s).replace(/\s+/g, ' ').trim(); }
  function tr(s) { var k = norm(s); return (lang === 'en' && has(k)) ? DICT[k] : s; }

  function textNodes() {
    var out = [];
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentNode;
        if (!p || SKIP[p.nodeName]) return NodeFilter.FILTER_REJECT;
        return n.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    var n;
    while ((n = w.nextNode())) out.push(n);
    return out;
  }

  function attrsToEnglish() {
    ATTRS.forEach(function (attr) {
      var store = 'data-i18n-' + attr;
      document.querySelectorAll('[' + attr + ']').forEach(function (el) {
        var orig = el.hasAttribute(store) ? el.getAttribute(store) : el.getAttribute(attr);
        var key = norm(orig);
        if (!has(key)) return;
        if (!el.hasAttribute(store)) el.setAttribute(store, orig);
        el.setAttribute(attr, DICT[key]);
      });
    });
  }

  function attrsToIndonesian() {
    ATTRS.forEach(function (attr) {
      var store = 'data-i18n-' + attr;
      document.querySelectorAll('[' + store + ']').forEach(function (el) {
        el.setAttribute(attr, el.getAttribute(store));
        el.removeAttribute(store);
      });
    });
  }

  function toEnglish() {
    textNodes().forEach(function (node) {
      var orig = touched.has(node) ? touched.get(node) : node.nodeValue;
      var key = norm(orig);
      if (!has(key)) return;
      if (!touched.has(node)) touched.set(node, orig);
      var lead = orig.match(/^\s*/)[0];
      var trail = orig.match(/\s*$/)[0];
      node.nodeValue = lead + DICT[key] + trail;
    });
    attrsToEnglish();
  }

  function toIndonesian() {
    touched.forEach(function (orig, node) { node.nodeValue = orig; });
    touched.clear();
    attrsToIndonesian();
  }

  function setMeta(en) {
    var m = document.querySelector('meta[name="description"]');
    if (m && DESC_ID) m.setAttribute('content', en && has(DESC_ID) ? DICT[DESC_ID] : DESC_ID);
    if (TITLE_ID) document.title = en && has(TITLE_ID) ? DICT[TITLE_ID] : TITLE_ID;
  }

  // Link wa.me yang membawa teks siap-kirim: tambahkan catatan bahasa pada mode EN
  function waLinks(en) {
    document.querySelectorAll('a[href*="wa.me"]').forEach(function (a) {
      var store = 'data-href-id';
      if (en) {
        var href = a.hasAttribute(store) ? a.getAttribute(store) : a.getAttribute('href');
        if (href.indexOf('?text=') === -1) return;
        if (!a.hasAttribute(store)) a.setAttribute(store, href);
        a.setAttribute('href', href + encodeURIComponent(WA_NOTE_EN));
      } else if (a.hasAttribute(store)) {
        a.setAttribute('href', a.getAttribute(store));
        a.removeAttribute(store);
      }
    });
  }

  function updateButtons() {
    document.querySelectorAll('.header__lang').forEach(function (b) {
      if (lang === 'en') {
        b.textContent = 'ID';
        b.setAttribute('aria-label', 'Ganti ke Bahasa Indonesia');
        b.setAttribute('lang', 'id');
      } else {
        b.textContent = 'EN';
        b.setAttribute('aria-label', 'Switch to English');
        b.setAttribute('lang', 'en');
      }
    });
  }

  function persist(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (e) { /* mode privat: abaikan */ }
  }

  function stripLangParam() {
    try {
      var u = new URL(window.location.href);
      if (u.searchParams.has('lang')) {
        u.searchParams.delete('lang');
        window.history.replaceState(null, '', u.pathname + u.search + u.hash);
      }
    } catch (e) { /* abaikan */ }
  }

  function setLang(next, opts) {
    opts = opts || {};
    if (next !== 'en' && next !== 'id') return;
    if (next !== lang) {
      lang = next;
      if (lang === 'en') { toEnglish(); } else { toIndonesian(); }
      document.documentElement.setAttribute('lang', lang);
      setMeta(lang === 'en');
      waLinks(lang === 'en');
    }
    updateButtons();
    if (!opts.silent) {
      persist(lang);
      stripLangParam();
      if (window.Tourduachina && typeof window.Tourduachina.trackEvent === 'function') {
        window.Tourduachina.trackEvent('language_switch', { language: lang });
      }
    }
    try { document.dispatchEvent(new CustomEvent('t2c:langchange', { detail: { lang: lang } })); } catch (e) { /* abaikan */ }
  }

  function initialChoice() {
    try {
      var m = /[?&]lang=(en|id)\b/i.exec(window.location.search);
      if (m) return { lang: m[1].toLowerCase(), source: 'url' };
    } catch (e) { /* abaikan */ }
    try {
      var s = window.localStorage.getItem(STORAGE_KEY);
      if (s === 'en' || s === 'id') return { lang: s, source: 'storage' };
    } catch (e) { /* abaikan */ }
    return { lang: 'id', source: 'default' };
  }

  function init() {
    // Delegasi event: tombol tetap berfungsi walau di-render ulang
    document.addEventListener('click', function (e) {
      var b = e.target && e.target.closest ? e.target.closest('.header__lang') : null;
      if (!b) return;
      e.preventDefault();
      setLang(lang === 'en' ? 'id' : 'en');
    });

    var c = initialChoice();
    if (c.source === 'url') persist(c.lang);
    if (c.lang === 'en') { setLang('en', { silent: true }); } else { updateButtons(); }
  }

  window.T2C_I18N = {
    tr: tr,
    waNote: function () { return lang === 'en' ? WA_NOTE_EN : ''; },
    getLang: function () { return lang; },
    setLang: function (l) { setLang(l); }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
