/**
 * Tourduachina.id — Schema Markup (JSON-LD)
 * Dynamic structured data injection for AI SEO
 */

(function() {
  'use strict';

  const DOMAIN = 'https://tourduachina.id';

  // ============================================
  // BASE SCHEMAS (loaded on every page)
  // ============================================

  // TravelAgency Schema
  const travelAgency = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Tourduachina.id",
    "alternateName": "Tourdua China",
    "description": "Spesialis private tour ke China untuk wisatawan Indonesia. Pemandu berbahasa Indonesia, visa assistance, harga transparan.",
    "url": DOMAIN,
    "logo": `${DOMAIN}/images/logo.png`,
    "image": `${DOMAIN}/images/og-image.jpg`,
    "telephone": "+62-812-3456-7890",
    "email": "tourduachina@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Beijing",
      "addressRegion": "Beijing",
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-8.6500",
      "longitude": "115.2167"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "priceRange": "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "500",
      "bestRating": "5"
    },
    "areaServed": {
      "@type": "Country",
      "name": "China"
    },
    "serviceType": ["Private Tour", "Custom Itinerary", "Visa Assistance", "Airport Transfer"],
    "sameAs": [
      "https://instagram.com/tourduachina.id"
    ]
  };

  // Organization Schema
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Tourduachina.id",
    "url": DOMAIN,
    "logo": `${DOMAIN}/images/logo.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+62-812-3456-7890",
      "contactType": "customer service",
      "availableLanguage": ["Indonesian", "Mandarin"]
    }
  };

  // Website Schema
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Tourduachina.id",
    "url": DOMAIN,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${DOMAIN}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  // ============================================
  // PAGE-SPECIFIC SCHEMAS
  // ============================================

  // Tour Packages Data
  const tourPackages = [
    {
      "@type": "TouristTrip",
      "name": "Beijing Heritage Tour",
      "description": "Jelajahi warisan budaya Beijing: Tembok Besar, Forbidden City, Temple of Heaven. 5 hari 4 malam dengan pemandu Indonesia.",
      "touristType": "Cultural",
      "provider": { "@type": "TravelAgency", "name": "Tourduachina.id" },
      "offers": {
        "@type": "Offer",
        "price": "8500000",
        "priceCurrency": "IDR",
        "availability": "https://schema.org/InStock",
        "url": `${DOMAIN}/tours/beijing-heritage`
      },
      "itinerary": {
        "@type": "ItemList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Day 1: Arrival & Tiananmen Square" },
          { "@type": "ListItem", "position": 2, "name": "Day 2: Forbidden City & Temple of Heaven" },
          { "@type": "ListItem", "position": 3, "name": "Day 3: Great Wall of China" },
          { "@type": "ListItem", "position": 4, "name": "Day 4: Summer Palace & Local Markets" },
          { "@type": "ListItem", "position": 5, "name": "Day 5: Departure" }
        ]
      },
      "image": `${DOMAIN}/images/tours/beijing.jpg`,
      "url": `${DOMAIN}/tours/beijing-heritage`
    },
    {
      "@type": "TouristTrip",
      "name": "Shanghai Modern Tour",
      "description": "Rasakan kemewahan Shanghai modern: The Bund, Yu Garden, Nanjing Road. 4 hari 3 malam.",
      "touristType": "Leisure",
      "provider": { "@type": "TravelAgency", "name": "Tourduachina.id" },
      "offers": {
        "@type": "Offer",
        "price": "7200000",
        "priceCurrency": "IDR",
        "availability": "https://schema.org/InStock"
      },
      "image": `${DOMAIN}/images/tours/shanghai.jpg`,
      "url": `${DOMAIN}/tours/shanghai-modern`
    },
    {
      "@type": "TouristTrip",
      "name": "Xi'an Ancient Tour",
      "description": "Temukan keajaiban kuno Xi'an: Terracotta Warriors, Muslim Quarter, City Wall. 4 hari 3 malam.",
      "touristType": "Cultural",
      "provider": { "@type": "TravelAgency", "name": "Tourduachina.id" },
      "offers": {
        "@type": "Offer",
        "price": "6800000",
        "priceCurrency": "IDR",
        "availability": "https://schema.org/InStock"
      },
      "image": `${DOMAIN}/images/tours/xian.jpg`,
      "url": `${DOMAIN}/tours/xian-ancient`
    },
    {
      "@type": "TouristTrip",
      "name": "Chengdu Panda Tour",
      "description": "Kunjungi Panda Base dan nikmati kuliner Sichuan di Chengdu. 4 hari 3 malam.",
      "touristType": "Nature",
      "provider": { "@type": "TravelAgency", "name": "Tourduachina.id" },
      "offers": {
        "@type": "Offer",
        "price": "7500000",
        "priceCurrency": "IDR",
        "availability": "https://schema.org/InStock"
      },
      "image": `${DOMAIN}/images/tours/chengdu.jpg`,
      "url": `${DOMAIN}/tours/chengdu-panda`
    },
    {
      "@type": "TouristTrip",
      "name": "Guilin Nature Tour",
      "description": "Pesona alam Guilin: Li River Cruise, Yangshuo, Reed Flute Cave. 5 hari 4 malam.",
      "touristType": "Nature",
      "provider": { "@type": "TravelAgency", "name": "Tourduachina.id" },
      "offers": {
        "@type": "Offer",
        "price": "9000000",
        "priceCurrency": "IDR",
        "availability": "https://schema.org/InStock"
      },
      "image": `${DOMAIN}/images/tours/guilin.jpg`,
      "url": `${DOMAIN}/tours/guilin-nature`
    },
    {
      "@type": "TouristTrip",
      "name": "Zhangjiajie Adventure Tour",
      "description": "Petualangan di Avatar Mountains dan Glass Bridge Zhangjiajie. 5 hari 4 malam.",
      "touristType": "Adventure",
      "provider": { "@type": "TravelAgency", "name": "Tourduachina.id" },
      "offers": {
        "@type": "Offer",
        "price": "10500000",
        "priceCurrency": "IDR",
        "availability": "https://schema.org/InStock"
      },
      "image": `${DOMAIN}/images/tours/zhangjiajie.jpg`,
      "url": `${DOMAIN}/tours/zhangjiajie-adventure`
    },
    {
      "@type": "TouristTrip",
      "name": "China Golden Route",
      "description": "Jelajahi 3 kota ikonik China: Beijing, Xi'an, Shanghai dalam satu perjalanan. 8 hari 7 malam.",
      "touristType": "Multi-City",
      "provider": { "@type": "TravelAgency", "name": "Tourduachina.id" },
      "offers": {
        "@type": "Offer",
        "price": "15000000",
        "priceCurrency": "IDR",
        "availability": "https://schema.org/InStock"
      },
      "image": `${DOMAIN}/images/tours/golden-route.jpg`,
      "url": `${DOMAIN}/tours/golden-route`
    }
  ];

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Apakah paket tour termasuk tiket pesawat?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tidak, paket tour kami tidak termasuk tiket pesawat. Kami fokus pada layanan di China: akomodasi, transportasi lokal, pemandu, dan tiket masuk destinasi."
        }
      },
      {
        "@type": "Question",
        "name": "Bagaimana proses pembuatan visa China?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Kami menyediakan layanan visa assistance. Anda cukup menyiapkan dokumen, dan tim kami akan membantu proses pengajuan visa China dari awal hingga selesai."
        }
      },
      {
        "@type": "Question",
        "name": "Berapa minimal peserta untuk private tour?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Minimal 1 orang. Private tour berarti hanya grup Anda, bukan rombongan besar."
        }
      },
      {
        "@type": "Question",
        "name": "Apakah ada pemandu berbahasa Indonesia?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ya, semua pemandu kami fasih berbahasa Indonesia dan Mandarin. Komunikasi lancar tanpa barrier bahasa."
        }
      },
      {
        "@type": "Question",
        "name": "Kapan waktu terbaik mengunjungi China?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "China bisa dikunjungi sepanjang tahun. Musim semi (Maret-Mei) dan gugur (September-November) adalah waktu paling nyaman."
        }
      },
      {
        "@type": "Question",
        "name": "Apakah aman berwisata ke China?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sangat aman. China memiliki tingkat kriminalitas sangat rendah, terutama di kota-kota besar."
        }
      },
      {
        "@type": "Question",
        "name": "Bagaimana sistem pembayaran di China?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "China mayoritas cashless menggunakan Alipay atau WeChat Pay. Tim kami akan membantu Anda setup sebelum berangkat."
        }
      },
      {
        "@type": "Question",
        "name": "Apakah bisa custom itinerary?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tentu! Itinerary bisa disesuaikan 100% dengan keinginan Anda."
        }
      }
    ]
  };

  // Breadcrumb Schema
  function getBreadcrumbSchema(items) {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
      }))
    };
  }

  // ============================================
  // INJECT SCHEMA FUNCTION
  // ============================================
  function injectSchema(schema) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  // ============================================
  // PAGE DETECTION & INJECTION
  // ============================================
  function initSchemas() {
    const path = window.location.pathname;
    const isHomepage = path === '/' || path === '/index.html';

    // Always inject base schemas
    injectSchema(travelAgency);
    injectSchema(organization);
    injectSchema(website);

    // Homepage-specific
    if (isHomepage) {
      injectSchema({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Paket Tour China",
        "description": "Daftar paket private tour ke China dari Tourduachina.id",
        "numberOfItems": tourPackages.length,
        "itemListElement": tourPackages.map((tour, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": tour
        }))
      });
      injectSchema(faqSchema);
      injectSchema(getBreadcrumbSchema([
        { name: "Home", url: DOMAIN }
      ]));
    }

    // Tours page
    if (path.includes('tours')) {
      injectSchema({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Paket Tour China",
        "itemListElement": tourPackages.map((tour, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": tour
        }))
      });
      injectSchema(getBreadcrumbSchema([
        { name: "Home", url: DOMAIN },
        { name: "Paket Tour", url: `${DOMAIN}/tours` }
      ]));
    }

    // Tour detail page
    if (path.includes('tour-detail')) {
      // Find matching tour or use Beijing as default
      const tourData = tourPackages[0]; // Beijing Heritage
      injectSchema(tourData);
      injectSchema(getBreadcrumbSchema([
        { name: "Home", url: DOMAIN },
        { name: "Paket Tour", url: `${DOMAIN}/tours` },
        { name: tourData.name, url: `${DOMAIN}${path}` }
      ]));
    }

    // About page
    if (path.includes('about')) {
      injectSchema(getBreadcrumbSchema([
        { name: "Home", url: DOMAIN },
        { name: "Tentang Kami", url: `${DOMAIN}/about` }
      ]));
    }

    // Contact page
    if (path.includes('contact')) {
      injectSchema({
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Kontak Tourduachina.id",
        "url": `${DOMAIN}/contact`
      });
      injectSchema(getBreadcrumbSchema([
        { name: "Home", url: DOMAIN },
        { name: "Kontak", url: `${DOMAIN}/contact` }
      ]));
    }

    // FAQ page
    if (path.includes('faq')) {
      injectSchema(faqSchema);
      injectSchema(getBreadcrumbSchema([
        { name: "Home", url: DOMAIN },
        { name: "FAQ", url: `${DOMAIN}/faq` }
      ]));
    }

    // Blog page
    if (path.includes('blog')) {
      injectSchema({
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "Blog Tourduachina.id",
        "description": "Tips dan panduan wisata ke China untuk wisatawan Indonesia",
        "url": `${DOMAIN}/blog`
      });
      injectSchema(getBreadcrumbSchema([
        { name: "Home", url: DOMAIN },
        { name: "Blog", url: `${DOMAIN}/blog` }
      ]));
    }

    console.log('✅ Schema markup injected');
  }

  // ============================================
  // INITIALIZE
  // ============================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSchemas);
  } else {
    initSchemas();
  }

})();
