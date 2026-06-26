# Prompt untuk Claude.ai — Tour & Travel Website

## Cara Pakai:
1. Buka https://claude.ai
2. Buat conversation baru
3. Copy SELURUH prompt di bawah (sampai garis "=== END ===")
4. Paste ke Claude.ai
5. Tunggu Claude generate semua file
6. Copy hasilnya, paste ke sini untuk saya review

---

## PROMPT MULAI DARI SINI ↓↓↓

Buatkan website tour & travel lengkap dan production-ready. Output semua kode dalam format code blocks yang bisa langsung di-copy dan disimpan sebagai file.

### INFORMASI BISNIS (PLACEHOLDER — AKAN DIGANTI NANTI):
- Nama: Paradise Travel Indonesia
- Lokasi: Bali, Indonesia
- WhatsApp: +62 812-3456-7890
- Email: hello@paradisetravel.id
- Instagram: @paradisetravel.id
- Destinasi: Bali, Lombok, Komodo, Raja Ampat, Yogyakarta, Bromo

### YANG HARUS DIBUAT:

Buatkan SEMUA file berikut dengan kode LENGKAP (bukan placeholder/skeleton):

---

#### FILE 1: index.html
Landing page utama dengan:
- Hero section dengan search bar (destinasi, tanggal, jumlah orang)
- Section "Paket Populer" (6 kartu tour)
- Section "Kenapa Pilih Kami" (4 keunggulan)
- Section "Testimoni" (3 review)
- Section "Destinasi Favorit" (6 gambar dengan overlay text)
- Section "FAQ" (5 pertanyaan umum)
- Section "CTA Booking"
- Footer lengkap (kontak, social media, links)
- WhatsApp floating button (kanan bawah, hijau)
- JSON-LD schema: TravelAgency + FAQPage
- Meta tags lengkap (SEO + OG + Twitter)
- Breadcrumb navigation

#### FILE 2: tours.html
Halaman listing paket tour:
- Filter bar (harga, durasi, destinasi)
- Grid 6 paket tour (card format)
- Setiap card: gambar, nama, durasi, harga, rating, CTA button
- Sortir: Populer, Harga Terendah, Harga Tertinggi, Rating
- JSON-LD schema: TouristTrip (array)
- FAQ section tentang booking

#### FILE 3: tour-detail.html
Template detail satu tour (Bali Adventure 3D2N):
- Hero image full-width
- Info bar: durasi, harga, rating, kapasitas
- Tab: Overview | Itinerary | Include/Exclude | Reviews
- Itinerary hari per hari (expandable)
- Include/Exclude list
- Gallery (6 foto)
- Sidebar: Booking form (nama, WA, tanggal, jumlah orang)
- Related tours (3 rekomendasi)
- JSON-LD schema: TouristTrip dengan itinerary
- FAQ section

#### FILE 4: about.html
Tentang perusahaan:
- Story/Mission section
- Tim section (4 anggota dengan foto placeholder)
- Statistik (500+ customers, 50+ destinasi, 8 tahun pengalaman, 4.8 rating)
- Sertifikasi & lisensi
- Google Maps embed
- JSON-LD schema: Organization + LocalBusiness

#### FILE 5: contact.html
Halaman kontak:
- Form: Nama, Email, WhatsApp, Destinasi Minat, Pesan
- Info kontak (alamat, telepon, email, jam operasional)
- Google Maps embed
- Social media links
- FAQ tentang kontak
- JSON-LD schema: ContactPage

#### FILE 6: blog.html
Blog listing:
- 4 artikel sample (tips travel Indonesia)
- Card format: gambar, judul, excerpt, tanggal, author
- Sidebar: Kategori, Artikel Populer
- JSON-LD schema: Blog + Article

#### FILE 7: faq.html
FAQ lengkap:
- Kategori: Umum, Booking, Pembayaran, Destinasi, Lainnya
- Accordion format (klik untuk buka)
- Minimal 15 pertanyaan
- Contact CTA di bawah
- JSON-LD schema: FAQPage

#### FILE 8: 404.html
Error page:
- Friendly message
- Search bar
- Link ke homepage
- Link ke halaman populer

---

### CSS FILES:

#### FILE 9: css/style.css
- CSS custom properties (colors, fonts, spacing)
- Reset/normalize
- Typography scale
- Utility classes
- Layout system (grid + flexbox)
- Animations (fade-in, slide-up, pulse)
- Respect prefers-reduced-motion

#### FILE 10: css/components.css
Komponen reusable:
- .btn (primary, secondary, outline, sizes)
- .card (tour card, blog card, testimonial)
- .badge (rating, durasi, harga)
- .nav (desktop + mobile hamburger)
- .hero
- .section-header
- .footer
- .floating-whatsapp
- .breadcrumb
- .tabs
- .accordion
- .form-group
- .filter-bar
- .stat-card
- .testimonial-card
- .destination-card

#### FILE 11: css/responsive.css
Breakpoints:
- Mobile: < 480px
- Tablet: 481px - 768px
- Desktop: 769px - 1024px
- Large: > 1025px

---

### JS FILES:

#### FILE 12: js/main.js
- Mobile menu toggle
- Smooth scroll
- Navbar sticky + shadow on scroll
- Lazy loading images (IntersectionObserver)
- Accordion/FAQ toggle
- Tab switching
- Form validation
- Filter tours
- Sort tours
- Back to top button
- WhatsApp button pulse animation
- Animasi fade-in saat scroll

#### FILE 13: js/schema.js
- Dynamic JSON-LD injection
- Schema untuk setiap halaman
- Breadcrumb schema
- Organization schema

#### FILE 14: js/analytics.js
- GA4 placeholder (ganti measurement ID)
- Event tracking: click CTA, form submit, WhatsApp click, tour view
- Scroll depth tracking

---

### SEO FILES:

#### FILE 15: llms.txt
Format llms.txt standar:
- Company overview (1 paragraf)
- Services list
- Popular tours dengan harga
- Contact info
- Key facts
- Links

#### FILE 16: robots.txt
Izinkan: Googlebot, GPTBot, ChatGPT-User, CCBot, anthropic-ai, PerplexityBot
Sitemap reference

#### FILE 17: sitemap.xml
Semua halaman dengan lastmod, changefreq, priority

#### FILE 18: .htaccess
Hostinger Apache config:
- Gzip compression
- Browser caching (1 tahun untuk images/fonts/css/js)
- Security headers
- HTTPS redirect
- Custom 404
- Clean URLs

---

### DESIGN SPECIFICATIONS:

**Warna:**
```css
--primary: #0066FF;
--primary-dark: #0052CC;
--accent: #FF6B35;
--accent-dark: #E55A2B;
--success: #10B981;
--dark: #1A1A2E;
--dark-light: #16213E;
--gray-100: #F8FAFC;
--gray-200: #E2E8F0;
--gray-300: #CBD5E1;
--gray-400: #94A3B8;
--gray-500: #64748B;
--gray-600: #475569;
--gray-700: #334155;
--gray-800: #1E293B;
--white: #FFFFFF;
```

**Font:**
- Headings: Plus Jakarta Sans (Google Fonts, weights: 600, 700, 800)
- Body: Inter (Google Fonts, weights: 400, 500, 600)

**Spacing:**
- Section padding: 80px top/bottom (mobile: 48px)
- Card padding: 24px
- Container max-width: 1200px

**Border radius:**
- Small: 8px
- Medium: 12px
- Large: 16px
- Full: 9999px

**Shadows:**
- Small: 0 1px 3px rgba(0,0,0,0.1)
- Medium: 0 4px 6px rgba(0,0,0,0.1)
- Large: 0 10px 25px rgba(0,0,0,0.1)

---

### KONTEN (Bahasa Indonesia):

**Hero:**
Judul: "Jelajahi Keindahan Indonesia Bersama Kami"
Subjudul: "Paket tour premium dengan pemandu lokal berpengalaman. Dari pantai eksotis hingga gunung megah, ciptakan momen tak terlupakan."

**Tours (6 paket):**
1. Bali Paradise Explorer 3D2N — IDR 1,500,000 — ⭐ 4.9
2. Lombok Hidden Gems 4D3N — IDR 2,800,000 — ⭐ 4.8
3. Komodo Adventure 5D4N — IDR 5,500,000 — ⭐ 4.9
4. Raja Ampat Diving 5D4N — IDR 8,000,000 — ⭐ 5.0
5. Yogyakarta Heritage 3D2N — IDR 1,200,000 — ⭐ 4.7
6. Bromo Sunrise Trek 2D1N — IDR 950,000 — ⭐ 4.8

**Kenapa Pilih Kami:**
1. Pemandu Lokal Bersertifikat
2. Harga Transparan Tanpa Hidden Cost
3. Custom Trip Sesuai Keinginan
4. Support 24/7 Selama Perjalanan

**Testimoni:**
1. "Perjalanan terbaik! Pemandu sangat ramah dan profesional." — Dewi S., Jakarta
2. "Bali tour dengan Paradise Travel bikin liburan jadi effortless." — Rizky M., Surabaya
3. "Worth every penny! Raja Ampat trip yang amazing." — Sarah L., Singapore

**FAQ (5 pertanyaan di homepage):**
1. Apa saja yang termasuk dalam paket tour?
2. Bagaimana cara booking tour?
3. Apakah bisa custom itinerary?
4. Berapa minimal peserta untuk private tour?
5. Apa kebijakan pembatalan?

---

### REQUIREMENTS TEKNIS:

1. **Semantic HTML5** — gunakan header, main, article, section, aside, nav, footer
2. **Accessibility** — alt text, ARIA labels, keyboard nav, focus states, skip-to-content
3. **Performance** — lazy load images, font-display swap, minimal JS
4. **Mobile-first** — responsive di semua breakpoint
5. **No external dependencies** — selain Google Fonts, tidak boleh ada CDN/external JS
6. **Relative paths** — semua link relative (./css/style.css, bukan https://domain.com/css/style.css)
7. **JSON-LD valid** — schema markup harus valid JSON
8. **Clean code** — well-commented, 4-space indent, BEM naming

### OUTPUT FORMAT:

Untuk setiap file, gunakan format ini:

```filename
[nama file lengkap, misal: index.html]
```

[code lengkap]

Pastikan setiap file LENGKAP dan bisa langsung di-save dan dijalankan. Jangan potong kode atau gunakan "... rest of code".

=== END ===
