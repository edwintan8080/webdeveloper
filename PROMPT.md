# Prompt untuk Claude Code — Build Tour & Travel Website

## Cara Menggunakan

1. Buka terminal
2. Masuk ke folder project: `cd tour-travel-website`
3. Jalankan: `claude -p "prompt di bawah ini"`
4. Atau jalankan secara interaktif: `claude` lalu paste prompt

---

## PROMPT UTAMA

```
Baca CLAUDE.md di folder ini untuk context lengkap project.

Buatkan website tour & travel lengkap dan production-ready dengan struktur berikut:

## 1. File Structure
Buat semua file ini:
- index.html (landing page utama)
- tours.html (daftar paket tour)
- tour-detail.html (template detail tour)
- about.html (tentang perusahaan)
- contact.html (kontak + form)
- blog.html (listing blog)
- faq.html (FAQ lengkap)
- css/style.css (styles utama)
- css/components.css (komponen reusable)
- css/responsive.css (mobile breakpoints)
- js/main.js (fungsionalitas utama)
- js/schema.js (dynamic schema injection)
- js/analytics.js (GA4 tracking)
- llms.txt (AI crawler instructions)
- llms-full.txt (full content untuk AI)
- robots.txt (traditional + AI bots)
- sitemap.xml (XML sitemap)
- .htaccess (Hostinger Apache config)
- 404.html (error page)

## 2. Design Requirements
- Warm, premium travel aesthetic (Airbnb-inspired)
- Colors: Primary #0066FF, Accent #FF6B35, Dark #1A1A2E
- Fonts: Plus Jakarta Sans (headings), Inter (body) dari Google Fonts
- Mobile-first responsive design
- Card-based tour listings
- Smooth animations (respect prefers-reduced-motion)
- WhatsApp floating button (kanan bawah)

## 3. AI SEO (KRITICAL)
Setiap halaman HARUS punya:
- JSON-LD Schema markup (TravelAgency, TouristTrip, FAQPage, Review, LocalBusiness)
- Meta tags lengkap (title, description, OG tags, Twitter cards)
- Semantic HTML (header, main, article, section, aside, footer)
- Breadcrumb navigation dengan schema
- FAQ section dengan schema markup
- First paragraph yang langsung menjawab (AI suka mengutip ini)

## 4. Content (Bahasa Indonesia)
Isi dengan konten realistis untuk travel agency di Indonesia:
- Nama: [Akan diganti user]
- Lokasi: Bali, Indonesia
- Destinasi: Bali, Lombok, Komodo, Raja Ampat, Yogyakarta, Bromo
- Paket tour: 3D2N, 4D3N, 5D4N dengan harga dalam IDR
- Testimoni dari "wisatawan" (gunakan nama Indonesia)
- Blog posts tentang tips travel

## 5. Performance
- LCP < 2.5s, INP < 200ms, CLS < 0.1
- Lazy loading pada semua gambar
- Critical CSS inlined di <head>
- Font display: swap
- Preload fonts critical
- Minifikasi CSS/JS (tapi tetap readable di source)

## 6. .htaccess untuk Hostinger
Buat config untuk:
- Gzip compression
- Browser caching (1 tahun untuk assets)
- Security headers (CSP, X-Frame-Options, dll)
- HTTPS redirect
- Custom 404 page
- URL rewriting untuk clean URLs

## 7. LLMs.txt
Buat file llms.txt dengan format:
- Company overview (1 paragraf)
- Services list
- Popular tours dengan harga
- Contact info
- Key facts (license, customer count, dll)
- Links ke halaman penting

## 8. robots.txt
Izinkan crawler berikut:
- Googlebot, Googlebot-Image
- GPTBot (OpenAI)
- ChatGPT-User
- CCBot (Common Crawl)
- Anthropic-ai (Claude)
- PerplexityBot
- Bytespider (TikTok)
- SemrushBot

## 9. Accessibility
- WCAG 2.1 AA
- Alt text semua gambar
- Keyboard navigation
- Focus visible states
- Skip to content link
- Color contrast > 4.5:1
- ARIA labels pada interactive elements

## 10. Final Checklist
Setelah selesai, verifikasi:
- [ ] Semua file ada dan lengkap
- [ ] HTML valid (tidak ada error syntax)
- [ ] Schema markup valid JSON-LD
- [ ] Responsive di mobile, tablet, desktop
- [ ] Semua link berfungsi
- [ ] Form contact berfungsi (mailto: atau action ke email service)
- [ ] WhatsApp link berfungsi
- [ ] Loading cepat (tidak ada resource berlebihan)

Buat semua file dengan konten lengkap, bukan placeholder. 
Setiap halaman harus punya minimal 500 kata konten yang SEO-friendly.
Gunakan Bahasa Indonesia untuk semua konten utama.
```

---

## PROMPT TAMBAHAN (Setelah Website Jadi)

### Untuk Generate Images
```
Buatkan prompt untuk image generation yang bisa digunakan untuk:
1. Hero image website tour & travel (landscape, 1920x1080)
2. 6 foto destinasi (Bali, Lombok, Komodo, Raja Ampat, Yogyakarta, Bromo)
3. Logo placeholder
4. Background pattern

Format setiap prompt dalam satu blok kode yang bisa langsung di-copy.
```

### Untuk Customization
```
Ubah website ini dengan detail berikut:
- Nama perusahaan: [NAMA_ANDA]
- Telepon/WhatsApp: [NOMOR_WA]
- Email: [EMAIL]
- Alamat: [ALAMAT_LENGKAP]
- Instagram: [HANDLE_IG]
- Facebook: [HANDLE_FB]
- TikTok: [HANDLE_TT]

Update semua schema markup, konten, dan contact info sesuai data di atas.
```

### Untuk Deploy ke Hostinger
```
Buatkan panduan langkah-langkah deploy website ini ke Hostinger:
1. Cara upload via File Manager
2. Cara setup domain
3. Cara enable SSL
4. Cara submit sitemap ke Google Search Console
5. Cara verifikasi site di Google Search Console
6. Cara submit llms.txt ke AI search engines

Format sebagai checklist yang bisa diikuti step-by-step.
```

---

## Tips Menggunakan Claude Code

1. **Jalankan secara bertahap** jika prompt terlalu panjang:
   - Tahap 1: "Buat index.html dan css/style.css"
   - Tahap 2: "Buat tours.html dan tour-detail.html"
   - Tahap 3: "Buat about.html, contact.html, faq.html"
   - Tahap 4: "Buat js/main.js dan js/schema.js"
   - Tahap 5: "Buat llms.txt, robots.txt, sitemap.xml, .htaccess"

2. **Gunakan --max-turns** untuk kontrol:
   ```
   claude -p "prompt" --max-turns 30
   ```

3. **Monitor progress** di terminal:
   ```
   claude -p "prompt" --verbose
   ```

4. **Jika hasil kurang sempurna**, lanjutkan dengan:
   ```
   claude -p "Review dan perbaiki [file]. Pastikan schema markup valid dan konten lengkap."
   ```

5. **Untuk iterasi**, gunakan session yang sama:
   ```
   claude -c
   ```
   (melanjutkan conversation sebelumnya)
