# Windelia International — Company Profile Site

Situs company profile untuk **PT Windelia International Solutions**, ditempatkan
di folder terpisah dari situs Tour Dua China (yang tetap berada di root repo ini).
Folder ini didesain sebagai **document root terpisah** untuk domain
`windeliainternational.com` (Hostinger addon domain / subdomain terpisah).

## Struktur

```
windelia-international/
├── index.html                      # Beranda
├── about.html                      # Tentang Kami
├── services.html                   # Ringkasan 4 layanan
├── services/
│   ├── sourcing-product.html
│   ├── tour-travel.html            # Ringkasan + link ke tourduachina.id
│   ├── medical-tour.html
│   └── education-agency.html
├── contact.html
├── faq.html
├── 404.html
├── css/ (style.css, components.css, responsive.css)
├── js/main.js
├── images/logo-placeholder.svg
├── llms.txt, robots.txt, sitemap.xml, .htaccess
```

## Checklist Sebelum Go-Live

Data berikut masih berupa **placeholder** dan tersebar di banyak file
(cari string di bawah ini di seluruh folder untuk menemukan semuanya):

| Placeholder | Keterangan | Lokasi |
|---|---|---|
| `62xxxxxxxxxxx` | Nomor WhatsApp resmi (format 62, tanpa `+`) | Semua halaman (tombol WA, footer) + `js/main.js` |
| `[NOMOR WHATSAPP]` | Tampilan nomor WhatsApp | Footer, contact.html, JSON-LD |
| `[ALAMAT KANTOR]`, `[KOTA]`, `[PROVINSI]`, `[KODE POS]` | Alamat kantor lengkap | index, about, contact, JSON-LD |
| `[NOMOR NIB]` | Nomor Induk Berusaha / legalitas | about.html, footer semua halaman |
| `[TAHUN BERDIRI]` | Tahun berdiri perusahaan | about.html JSON-LD |
| `[HANDLE_INSTAGRAM]`, `[HANDLE_LINKEDIN]` | Handle media sosial resmi | index.html, footer |
| `info@windeliainternational.com` | Email — pastikan mailbox ini aktif, atau ganti | Semua halaman |
| `images/logo-placeholder.svg` | Logo placeholder — ganti dengan logo resmi (`logo.png`) | Semua halaman (favicon + nav) |
| Testimoni `[Nama Klien]` | Ganti dengan testimoni klien nyata (dengan izin) | index.html |
| `[Google Maps Embed]` | Ganti dengan embed peta lokasi kantor | contact.html |

## Deployment ke Hostinger

1. Di hPanel Hostinger, tambahkan `windeliainternational.com` sebagai domain
   (addon domain atau domain utama akun ini).
2. Arahkan document root domain tersebut ke folder `windelia-international/`
   ini (upload isi folder ini ke `public_html` domain tersebut — bukan folder
   `windelia-international` itu sendiri, tapi **isinya**).
3. Pastikan `.htaccess` ikut terupload (file tersembunyi).
4. Setelah lengkapi checklist di atas, submit `sitemap.xml` ke Google Search
   Console.

## Relasi dengan Tour Dua China

Divisi Tour & Travel (`services/tour-travel.html`) sengaja dibuat ringkas dan
mengarahkan pengunjung ke situs penuh **Tour Dua China** (`tourduachina.id`,
yang datanya tetap utuh di root repo ini) untuk melihat paket tour dan booking.
