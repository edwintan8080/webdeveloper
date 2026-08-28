# Webdev Bot Prompt — tourduachina.id Fixes

## Context
- Repo: `/opt/data/tour-travel-website` (GitHub: edwintan8080/webdeveloper)
- Deploy: Push to `main` branch → GitHub Actions → FTP to Hostinger
- Structure: `index.html` (Indonesian), `en/index.html` (English), `images/`, `js/`
- After ALL changes: commit to `master`, then merge to `main` and push

---

## TASK 1: Fix Sitemap.xml

**File:** `sitemap.xml`

**Current problem:** 
- `lastmod` is `2025-06-26` (outdated)
- No `/en/` URL
- Uses anchor links (`#packages`) which Google doesn't crawl as separate URLs

**Replace entire file with:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://tourduachina.id/</loc>
    <lastmod>2026-08-28</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://tourduachina.id/en/</loc>
    <lastmod>2026-08-28</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>
```

---

## TASK 2: Fix Hreflang Tags

### File: `index.html` (Indonesian version)

**Find this block (around line 28-31):**
```html
  <!-- Hreflang -->
  <link rel="alternate" hreflang="id" href="https://tourduachina.id/">
  <link rel="alternate" hreflang="en" href="https://tourduachina.id/en/">
  <link rel="alternate" hreflang="x-default" href="https://tourduachina.id/">
```

**Verify it exists. If missing, add after canonical tag:**
```html
  <!-- Hreflang -->
  <link rel="alternate" hreflang="id" href="https://tourduachina.id/">
  <link rel="alternate" hreflang="en" href="https://tourduachina.id/en/">
  <link rel="alternate" hreflang="x-default" href="https://tourduachina.id/">
```

### File: `en/index.html` (English version)

**Find and verify this block exists (around line 28-31):**
```html
  <!-- Hreflang -->
  <link rel="alternate" hreflang="id" href="https://tourduachina.id/">
  <link rel="alternate" hreflang="en" href="https://tourduachina.id/en/">
  <link rel="alternate" hreflang="x-default" href="https://tourduachina.id/">
```

---

## TASK 3: Fix OG Image (Create Placeholder)

**Current problem:** `images/og-image.jpg` returns 404

**Action:** Create `images/og-image.svg` (SVG is lighter and works for OG)

**Create file:** `images/og-image.svg`
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#FAF6EF"/>
  <rect x="0" y="0" width="1200" height="8" fill="#C4282B"/>
  <rect x="0" y="622" width="1200" height="8" fill="#B8874D"/>
  <text x="600" y="280" font-family="Arial, sans-serif" font-size="72" font-weight="bold" fill="#25313A" text-anchor="middle">Tourduachina.id</text>
  <text x="600" y="360" font-family="Arial, sans-serif" font-size="32" fill="#6F6A63" text-anchor="middle">Private Tours to China — Hassle-Free</text>
  <text x="600" y="430" font-family="Arial, sans-serif" font-size="24" fill="#B8874D" text-anchor="middle">English &amp; Indonesian Speaking Guides</text>
  <text x="600" y="500" font-family="Arial, sans-serif" font-size="20" fill="#6F6A63" text-anchor="middle">Beijing • Shanghai • Xi'an • Chengdu • Zhangjiajie</text>
</svg>
```

**Then update BOTH `index.html` and `en/index.html`:**

Find:
```html
<meta property="og:image" content="https://tourduachina.id/images/og-image.jpg">
```

Replace with:
```html
<meta property="og:image" content="https://tourduachina.id/images/og-image.svg">
```

Also find:
```html
<meta name="twitter:image" content="">
```
If it exists, update to:
```html
<meta name="twitter:image" content="https://tourduachina.id/images/og-image.svg">
```

If `twitter:image` doesn't exist, add after `twitter:description`:
```html
<meta name="twitter:image" content="https://tourduachina.id/images/og-image.svg">
```

---

## TASK 4: Update Footer Year

### File: `index.html`

**Find:**
```html
© <span id="footer-year">2025</span> Tourduachina.id. All rights reserved.
```

**Replace with:**
```html
© <span id="footer-year">2026</span> Tourduachina.id. All rights reserved.
```

### File: `en/index.html`

**Same fix** — find and replace `2025` with `2026` in footer.

**Also add auto-update script before `</body>` in BOTH files (if not already present):**

Find the existing inline script block that starts with `// Multi-step Form Navigation` and add BEFORE it:

```html
  <script>
    // Auto-update footer year
    document.addEventListener('DOMContentLoaded', function() {
      var yearEl = document.getElementById('footer-year');
      if (yearEl) yearEl.textContent = new Date().getFullYear();
    });
  </script>
```

---

## TASK 5: Add Review Schema for Testimonials

### File: `index.html`

**Find the closing `</script>` of the last TourPackage schema (around line 136), and ADD AFTER IT:**

```html
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Tourduachina.id",
    "url": "https://tourduachina.id",
    "review": [
      {
        "@type": "Review",
        "author": {"@type": "Person", "name": "Rina Wijaya"},
        "reviewRating": {"@type": "Rating", "ratingValue": "5"},
        "reviewBody": "Pertama kali ke China, tapi semuanya berjalan lancar berkat Tourduachina.id! Pemandu sangat helpful, sabar, dan tahu banget tempat-tempat bagus. Highly recommended!"
      },
      {
        "@type": "Review",
        "author": {"@type": "Person", "name": "Budi & Keluarga"},
        "reviewRating": {"@type": "Rating", "ratingValue": "5"},
        "reviewBody": "Anak-anak senang banget lihat panda di Chengdu! Private tour bikin kami fleksibel atur jadwal. Worth every rupiah!"
      },
      {
        "@type": "Review",
        "author": {"@type": "Person", "name": "Maya Sari"},
        "reviewRating": {"@type": "Rating", "ratingValue": "5"},
        "reviewBody": "Zhangjiajie luar biasa indah! Tim Tourduachina.id sangat profesional dari awal planning sampai akhir trip."
      }
    ]
  }
  </script>
```

### File: `en/index.html`

**Same location, ADD AFTER IT (English version):**

```html
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Tourduachina.id",
    "url": "https://tourduachina.id/en/",
    "review": [
      {
        "@type": "Review",
        "author": {"@type": "Person", "name": "Rina Wijaya"},
        "reviewRating": {"@type": "Rating", "ratingValue": "5"},
        "reviewBody": "First time in China, but everything went smoothly thanks to Tourduachina.id! The guide was incredibly helpful, patient, and knew all the best spots. Highly recommended!"
      },
      {
        "@type": "Review",
        "author": {"@type": "Person", "name": "Budi & Family"},
        "reviewRating": {"@type": "Rating", "ratingValue": "5"},
        "reviewBody": "The kids were so happy to see pandas in Chengdu! The private tour let us flexibly manage our schedule. Worth every penny!"
      },
      {
        "@type": "Review",
        "author": {"@type": "Person", "name": "Maya Sari"},
        "reviewRating": {"@type": "Rating", "ratingValue": "5"},
        "reviewBody": "Zhangjiajie was absolutely stunning! The Tourduachina.id team was professional from planning to the end of the trip."
      }
    ]
  }
  </script>
```

---

## TASK 6: Add Breadcrumb Schema

### File: `index.html`

**Add after the Review schema (from Task 5):**

```html
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://tourduachina.id/"},
      {"@type": "ListItem", "position": 2, "name": "Tour Packages", "item": "https://tourduachina.id/#packages"},
      {"@type": "ListItem", "position": 3, "name": "Services", "item": "https://tourduachina.id/#services"},
      {"@type": "ListItem", "position": 4, "name": "Contact", "item": "https://tourduachina.id/#contact"}
    ]
  }
  </script>
```

### File: `en/index.html`

**Same, but with English URLs:**

```html
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://tourduachina.id/en/"},
      {"@type": "ListItem", "position": 2, "name": "Tour Packages", "item": "https://tourduachina.id/en/#packages"},
      {"@type": "ListItem", "position": 3, "name": "Services", "item": "https://tourduachina.id/en/#services"},
      {"@type": "ListItem", "position": 4, "name": "Contact", "item": "https://tourduachina.id/en/#contact"}
    ]
  }
  </script>
```

---

## TASK 7: Add FAQPage Schema to English Version

### File: `en/index.html`

**Find the existing FAQPage schema (around line 75-90). If it exists, verify it's in English. If it's still in Indonesian, replace the entire FAQPage script block with:**

```html
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {"@type": "Question", "name": "Are flight tickets included in the tour package?", "acceptedAnswer": {"@type": "Answer", "text": "No, our tour packages do not include flight tickets. We focus on services in China: accommodation, local transport, guides, and destination entrance tickets."}},
      {"@type": "Question", "name": "How does the China visa process work?", "acceptedAnswer": {"@type": "Answer", "text": "We provide visa assistance services. You just prepare the documents, and our team will help with the entire China visa application process from start to finish."}},
      {"@type": "Question", "name": "What is the minimum number of participants for a private tour?", "acceptedAnswer": {"@type": "Answer", "text": "Minimum 1 person. Private tour means only your group, not a large tour group."}},
      {"@type": "Question", "name": "Are there Indonesian-speaking guides?", "acceptedAnswer": {"@type": "Answer", "text": "Yes, all our guides are fluent in Indonesian and Mandarin. Smooth communication with no language barrier."}},
      {"@type": "Question", "name": "When is the best time to visit China?", "acceptedAnswer": {"@type": "Answer", "text": "China can be visited year-round. Spring (March-May) and autumn (September-November) are the most comfortable seasons."}},
      {"@type": "Question", "name": "Is it safe to travel to China?", "acceptedAnswer": {"@type": "Answer", "text": "Very safe. China has an extremely low crime rate, especially in major cities. CCTV is everywhere."}},
      {"@type": "Question", "name": "How does the payment system work in China?", "acceptedAnswer": {"@type": "Answer", "text": "China is mostly cashless using Alipay or WeChat Pay. Our team will help you set up before departure."}},
      {"@type": "Question", "name": "Can I customize my itinerary?", "acceptedAnswer": {"@type": "Answer", "text": "Absolutely! The itinerary can be 100% customized to your preferences. Add destinations, change schedules, everything is flexible."}}
    ]
  }
  </script>
```

---

## TASK 8: Add GA4 Placeholder (Structure Only)

### BOTH files: `index.html` and `en/index.html`

**Add before `</head>`:**

```html
  <!-- Google Analytics 4 (replace G-XXXXXXXXXX with actual ID) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>
```

**NOTE:** Edwin needs to replace `G-XXXXXXXXXX` with his actual GA4 measurement ID.

---

## TASK 9: Separate CSS to External File

### Step 1: Create `css/style.css`

**Extract ALL content between `<style>` and `</style>` tags from `index.html` (approximately lines 77-1595) and save to `css/style.css`.**

### Step 2: Update BOTH `index.html` and `en/index.html`

**Find:**
```html
  <style>
    /* ============================================
       CSS CUSTOM PROPERTIES
```

**Replace the ENTIRE `<style>...</style>` block with:**
```html
  <link rel="stylesheet" href="/css/style.css">
```

**For `en/index.html`, use the same path:**
```html
  <link rel="stylesheet" href="/css/style.css">
```

---

## TASK 10: Final Verification

After all changes, run these checks:

```bash
# 1. Verify no Indonesian in English version
grep -c 'Kenapa\|Pilih Kami\|Testimonialsals\|berbahasa\|wisatawan\|Pemandu\|Harga Transparan' en/index.html
# Expected: 0

# 2. Verify OG image exists
curl -sL -o /dev/null -w "%{http_code}" https://tourduachina.id/images/og-image.svg
# Expected: 200

# 3. Verify sitemap has /en/
curl -sL https://tourduachina.id/sitemap.xml | grep -c 'en/'
# Expected: 1

# 4. Verify CSS loads
curl -sL -o /dev/null -w "%{http_code}" https://tourduachina.id/css/style.css
# Expected: 200

# 5. Verify JS loads from /en/
curl -sL -o /dev/null -w "%{http_code}" https://tourduachina.id/en/js/tourduachina.js
# Expected: 200
```

---

## COMMIT & DEPLOY

After ALL tasks are complete:

```bash
cd /opt/data/tour-travel-website
git add -A
git commit -m "fix: SEO, schema, sitemap, OG image, CSS separation, analytics placeholder

- Updated sitemap with /en/ URL and current date
- Verified hreflang tags on both versions
- Created OG image placeholder (SVG)
- Updated footer year to 2026 with auto-update script
- Added Review schema for testimonials
- Added BreadcrumbList schema
- Added FAQPage schema to English version
- Added GA4 placeholder (needs real measurement ID)
- Separated CSS to external file (/css/style.css)
- All paths use absolute URLs for /en/ compatibility"

git push origin master
git checkout main
git merge master --no-edit
git push origin main
git checkout master
```

---

## WHAT EDWIN NEEDS TO DO MANUALLY

1. **Upload real OG image** (1200x630px JPG) to replace the SVG placeholder
2. **Get GA4 measurement ID** from Google Analytics and replace `G-XXXXXXXXXX`
3. **Upload real destination photos** (Beijing, Shanghai, Xi'an, Chengdu, Guilin, Zhangjiajie)
4. **Get Meta Pixel ID** from Facebook Business Manager (optional)
