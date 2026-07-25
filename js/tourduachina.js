/**
 * Tourduachina.id — Complete JavaScript
 * Version: 1.0.0
 * Last Updated: 2025-06-26
 * 
 * Includes:
 * - Main functionality (menu, scroll, accordion, filter, form, animations)
 * - Schema markup (JSON-LD) for AI SEO
 * - Analytics & event tracking (GA4)
 * 
 * Usage: <script src="js/tourduachina.js" defer></script>
 */

(function() {
  'use strict';

  // ============================================
  // CONFIGURATION
  // ============================================
  const CONFIG = {
    DOMAIN: 'https://tourduachina.id',
    WHATSAPP_NUMBER: '8615811252101',
    GA_MEASUREMENT_ID: 'G-XXXXXXXXXX', // TODO: Ganti dengan GA4 Measurement ID Anda
    COMPANY_NAME: 'Tourduachina.id',
    COMPANY_EMAIL: 'tourduachina@gmail.com',
    INSTAGRAM: 'https://instagram.com/tourduachina.id',
  };

  // ============================================
  // PART 1: MAIN FUNCTIONALITY
  // ============================================

  /**
   * Mobile Menu Toggle
   */
  function initMobileMenu() {
    const hamburger = document.querySelector('.header__hamburger');
    const mobileNav = document.querySelector('.mobile-nav');

    if (!hamburger || !mobileNav) return;

    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
        mobileNav.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /**
   * Sticky Header
   */
  function initStickyHeader() {
    const header = document.querySelector('.header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      header.classList.toggle('header--scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  /**
   * Smooth Scroll
   */
  function initSmoothScroll() {
    const header = document.querySelector('.header');

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const headerHeight = header ? header.offsetHeight : 0;
          const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  /**
   * FAQ Accordion
   */
  function initFAQAccordion() {
    document.querySelectorAll('.faq-item__question').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const isActive = item.classList.contains('active');

        // Close all others
        document.querySelectorAll('.faq-item').forEach(i => {
          if (i !== item) i.classList.remove('active');
        });

        // Toggle current
        item.classList.toggle('active', !isActive);
        btn.setAttribute('aria-expanded', !isActive);
      });
    });
  }

  /**
   * Fade-in on Scroll
   */
  function initFadeAnimations() {
    const fadeEls = document.querySelectorAll('.fade-in');
    
    if (!('IntersectionObserver' in window) || fadeEls.length === 0) {
      fadeEls.forEach(el => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    }, { 
      threshold: 0.1, 
      rootMargin: '0px 0px -50px 0px' 
    });

    fadeEls.forEach(el => observer.observe(el));
  }

  /**
   * Tour Package Filter
   */
  function initTourFilter() {
    const filterButtons = document.querySelectorAll('[data-filter]');
    const tourCards = document.querySelectorAll('[data-category]');

    if (filterButtons.length === 0 || tourCards.length === 0) return;

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        tourCards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = '';
            setTimeout(() => card.classList.add('visible'), 50);
          } else {
            card.classList.remove('visible');
            setTimeout(() => card.style.display = 'none', 300);
          }
        });
      });
    });
  }

  /**
   * Tour Package Sort
   */
  function initTourSort() {
    const sortSelect = document.querySelector('[data-sort]');
    const tourGrid = document.querySelector('.packages__grid');

    if (!sortSelect || !tourGrid) return;

    sortSelect.addEventListener('change', () => {
      const sortValue = sortSelect.value;
      const cards = Array.from(tourGrid.children);

      cards.sort((a, b) => {
        const priceA = parseInt(a.dataset.price || 0);
        const priceB = parseInt(b.dataset.price || 0);
        const ratingA = parseFloat(a.dataset.rating || 0);
        const ratingB = parseFloat(b.dataset.rating || 0);

        switch(sortValue) {
          case 'price-low': return priceA - priceB;
          case 'price-high': return priceB - priceA;
          case 'rating': return ratingB - ratingA;
          default: return 0;
        }
      });

      cards.forEach(card => tourGrid.appendChild(card));
    });
  }

  /**
   * Booking Form Submission — WhatsApp + Email
   */
  /**
   * Multi-step Form Navigation
   */
  let currentStep = 1;

  window.nextStep = function(step) {
    // Validate current step
    if (currentStep === 1) {
      const name = document.getElementById('name').value;
      const whatsapp = document.getElementById('whatsapp').value;
      if (!name || !whatsapp) {
        showNotification('Mohon isi nama dan WhatsApp Anda', 'error');
        return;
      }
    }

    // Hide current step
    document.getElementById(`step-${currentStep}`).classList.remove('active');
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('completed');

    // Show next step
    currentStep = step;
    document.getElementById(`step-${currentStep}`).classList.add('active');
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('active');

    // Update step line
    updateStepLines();
  };

  window.prevStep = function(step) {
    // Hide current step
    document.getElementById(`step-${currentStep}`).classList.remove('active');
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');

    // Show previous step
    currentStep = step;
    document.getElementById(`step-${currentStep}`).classList.add('active');
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('completed');
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('active');

    // Update step line
    updateStepLines();
  };

  function updateStepLines() {
    const lines = document.querySelectorAll('.form-step__line');
    lines.forEach((line, index) => {
      if (index < currentStep - 1) {
        line.style.background = 'var(--color-jade)';
      } else {
        line.style.background = 'var(--gray-200)';
      }
    });
  }

  /**
   * Booking Form Handler
   */
  function initBookingForm() {
    const bookingForm = document.getElementById('booking-form');
    if (!bookingForm) return;

    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const formData = new FormData(this);
      const name = formData.get('name') || '';
      const countryCode = formData.get('country-code') || '+62';
      const whatsappNumber = formData.get('whatsapp') || '';
      const whatsapp = whatsappNumber ? countryCode + whatsappNumber : '';
      const email = formData.get('email') || '-';
      const destination = formData.get('destination') || '-';
      const pax = formData.get('pax') || '-';
      const date = formData.get('date') || '-';
      const duration = formData.get('duration') || '-';
      const message = formData.get('message') || '-';

      // Validate
      if (!name || !whatsapp || !destination || !pax) {
        showNotification('Mohon lengkapi field yang wajib diisi (*)', 'error');
        return;
      }

      // Build message content
      const messageLines = 
        `Halo Tourduachina.id! 👋\n\n` +
        `Saya ingin booking tour:\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `👤 Nama: ${name}\n` +
        `📱 WhatsApp: ${whatsapp}\n` +
        `📧 Email: ${email}\n` +
        `🌏 Destinasi: ${destination}\n` +
        `👥 Jumlah Orang: ${pax}\n` +
        `📅 Tanggal: ${date}\n` +
        `⏱️ Durasi: ${duration}\n` +
        `💬 Pesan: ${message}\n` +
        `━━━━━━━━━━━━━━━━━━\n\n` +
        `Mohon info harga dan detailnya ya! Terima kasih 🙏`;

      // Track
      trackEvent('form_submit', {
        form_name: 'booking',
        destination: destination,
        pax: pax
      });

      // 1. Open WhatsApp
      const waMessage = encodeURIComponent(messageLines);
      window.open(`https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${waMessage}`, '_blank');

      // 2. Send Email via mailto
      const emailSubject = encodeURIComponent(`Booking Tour: ${destination} - ${name}`);
      const emailBody = encodeURIComponent(messageLines);
      window.open(`mailto:${CONFIG.COMPANY_EMAIL}?subject=${emailSubject}&body=${emailBody}`, '_blank');

      showNotification('Mengirim ke WhatsApp & Email...', 'success');
      this.reset();

      // Reset form steps to step 1
      currentStep = 1;
      document.querySelectorAll('.form-section').forEach(s => s.classList.remove('active'));
      document.getElementById('step-1').classList.add('active');
      document.querySelectorAll('.form-step').forEach(s => {
        s.classList.remove('active', 'completed');
      });
      document.querySelector('.form-step[data-step="1"]').classList.add('active');
      updateStepLines();
    });
  }

  /**
   * Notification System
   */
  function showNotification(message, type = 'info') {
    document.querySelectorAll('.notification').forEach(n => n.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
      <span>${message}</span>
      <button class="notification__close" aria-label="Close">&times;</button>
    `;

    notification.style.cssText = `
      position: fixed;
      top: 90px;
      right: 24px;
      z-index: 10000;
      padding: 16px 24px;
      border-radius: 12px;
      font-family: var(--font-body);
      font-size: 14px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 12px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.15);
      animation: slideIn 0.3s ease;
      background: ${type === 'success' ? '#10B981' : type === 'error' ? '#C22423' : '#41484D'};
      color: white;
    `;

    document.body.appendChild(notification);

    notification.querySelector('.notification__close').addEventListener('click', () => {
      notification.remove();
    });

    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
      }
    }, 3000);
  }

  /**
   * Add notification animations CSS
   */
  function addNotificationStyles() {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Back to Top Button
   */
  function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /**
   * Lazy Loading Images
   */
  function initLazyLoading() {
    if (!('IntersectionObserver' in window)) return;

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
            img.removeAttribute('data-srcset');
          }
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  /**
   * Counter Animation
   */
  function animateCounter(element, target, isDecimal, suffix, duration = 2000) {
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
        element.textContent = (isDecimal ? target.toFixed(1) : Math.floor(target)) + suffix;
        return;
      }
      element.textContent = isDecimal
        ? current.toFixed(1) + suffix
        : Math.floor(current).toLocaleString() + suffix;
    }, 16);
  }

  function initCounterAnimation() {
    const statsSection = document.querySelector('.hero__stats');
    if (!statsSection || !('IntersectionObserver' in window)) return;

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statValues = entry.target.querySelectorAll('.hero__stat-value');
          statValues.forEach(el => {
            const raw = el.textContent.trim();
            const isDecimal = raw.includes('.');
            const number = isDecimal ? parseFloat(raw) : parseInt(raw.replace(/[^0-9]/g, ''), 10);
            const suffix = raw.replace(/[0-9.]/g, '');
            if (number && !el.dataset.animated) {
              el.dataset.animated = 'true';
              animateCounter(el, number, isDecimal, suffix);
            }
          });
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
  }

  // ============================================
  // PART 2: SCHEMA MARKUP (JSON-LD)
  // ============================================

  function injectSchema(schema) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  function initSchemaMarkup() {
    const { DOMAIN, COMPANY_NAME, COMPANY_EMAIL, WHATSAPP_NUMBER } = CONFIG;

    // TravelAgency Schema
    injectSchema({
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      "name": COMPANY_NAME,
      "alternateName": "Tourdua China",
      "description": "Spesialis private tour ke China untuk wisatawan Indonesia. Pemandu berbahasa Indonesia, visa assistance, harga transparan.",
      "url": DOMAIN,
      "logo": `${DOMAIN}/images/logo.png`,
      "image": `${DOMAIN}/images/og-image.jpg`,
      "telephone": `+${WHATSAPP_NUMBER}`,
      "email": COMPANY_EMAIL,
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
      "openingHoursSpecification": [{
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "18:00"
      }],
      "priceRange": "$$",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "500",
        "bestRating": "5"
      },
      "areaServed": { "@type": "Country", "name": "China" },
      "serviceType": ["Private Tour", "Custom Itinerary", "Visa Assistance", "Airport Transfer"],
      "sameAs": ["https://instagram.com/tourduachina.id"]
    });

    // Organization Schema
    injectSchema({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": COMPANY_NAME,
      "url": DOMAIN,
      "logo": `${DOMAIN}/images/logo.png`,
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": `+${WHATSAPP_NUMBER}`,
        "contactType": "customer service",
        "availableLanguage": ["Indonesian", "Mandarin"]
      }
    });

    // Website Schema
    injectSchema({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": COMPANY_NAME,
      "url": DOMAIN,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${DOMAIN}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    });

    // Tour Packages
    const tourPackages = [
      { name: "Beijing Heritage Tour", price: "8500000", duration: "5D4N", type: "Cultural", desc: "Tembok Besar, Forbidden City, Temple of Heaven" },
      { name: "Shanghai Modern Tour", price: "7200000", duration: "4D3N", type: "Leisure", desc: "The Bund, Yu Garden, Nanjing Road" },
      { name: "Xi'an Ancient Tour", price: "6800000", duration: "4D3N", type: "Cultural", desc: "Terracotta Warriors, Muslim Quarter" },
      { name: "Chengdu Panda Tour", price: "7500000", duration: "4D3N", type: "Nature", desc: "Panda Base, Jinli Street" },
      { name: "Guilin Nature Tour", price: "9000000", duration: "5D4N", type: "Nature", desc: "Li River, Yangshuo" },
      { name: "Zhangjiajie Adventure", price: "10500000", duration: "5D4N", type: "Adventure", desc: "Avatar Mountains, Glass Bridge" },
      { name: "China Golden Route", price: "15000000", duration: "8D7N", type: "Multi-City", desc: "Beijing-Xi'an-Shanghai" }
    ];

    injectSchema({
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Paket Tour China",
      "description": "Daftar paket private tour ke China dari Tourduachina.id",
      "numberOfItems": tourPackages.length,
      "itemListElement": tourPackages.map((tour, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "TouristTrip",
          "name": tour.name,
          "description": tour.desc,
          "touristType": tour.type,
          "provider": { "@type": "TravelAgency", "name": COMPANY_NAME },
          "offers": {
            "@type": "Offer",

            "availability": "https://schema.org/InStock"
          }
        }
      }))
    });

    // FAQ Schema
    injectSchema({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "Apakah paket tour termasuk tiket pesawat?", "acceptedAnswer": { "@type": "Answer", "text": "Tidak, paket tour kami tidak termasuk tiket pesawat. Kami fokus pada layanan di China: akomodasi, transportasi lokal, pemandu, dan tiket masuk destinasi." }},
        { "@type": "Question", "name": "Bagaimana proses pembuatan visa China?", "acceptedAnswer": { "@type": "Answer", "text": "Kami menyediakan layanan visa assistance. Anda cukup menyiapkan dokumen, dan tim kami akan membantu proses pengajuan visa China dari awal hingga selesai." }},
        { "@type": "Question", "name": "Berapa minimal peserta untuk private tour?", "acceptedAnswer": { "@type": "Answer", "text": "Minimal 1 orang. Private tour berarti hanya grup Anda, bukan rombongan besar." }},
        { "@type": "Question", "name": "Apakah ada pemandu berbahasa Indonesia?", "acceptedAnswer": { "@type": "Answer", "text": "Ya, semua pemandu kami fasih berbahasa Indonesia dan Mandarin. Komunikasi lancar tanpa barrier bahasa." }},
        { "@type": "Question", "name": "Kapan waktu terbaik mengunjungi China?", "acceptedAnswer": { "@type": "Answer", "text": "China bisa dikunjungi sepanjang tahun. Musim semi (Maret-Mei) dan gugur (September-November) adalah waktu paling nyaman." }},
        { "@type": "Question", "name": "Apakah aman berwisata ke China?", "acceptedAnswer": { "@type": "Answer", "text": "Sangat aman. China memiliki tingkat kriminalitas sangat rendah, terutama di kota-kota besar." }},
        { "@type": "Question", "name": "Bagaimana sistem pembayaran di China?", "acceptedAnswer": { "@type": "Answer", "text": "China mayoritas cashless menggunakan Alipay atau WeChat Pay. Tim kami akan membantu Anda setup sebelum berangkat." }},
        { "@type": "Question", "name": "Apakah bisa custom itinerary?", "acceptedAnswer": { "@type": "Answer", "text": "Tentu! Itinerary bisa disesuaikan 100% dengan keinginan Anda." }}
      ]
    });

    // Breadcrumb Schema
    injectSchema({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "url": DOMAIN }]
    });

    console.log('✅ Schema markup injected');
  }

  // ============================================
  // PART 3: ANALYTICS & TRACKING
  // ============================================

  /**
   * Initialize GA4
   */
  function initGA4() {
    const { GA_MEASUREMENT_ID } = CONFIG;
    
    if (GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
      console.warn('⚠️ GA4 Measurement ID belum dikonfigurasi. Edit CONFIG.GA_MEASUREMENT_ID di tourduachina.js');
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
      send_page_view: true
    });

    console.log('✅ GA4 initialized:', GA_MEASUREMENT_ID);
  }

  /**
   * Track custom event
   */
  function trackEvent(eventName, params = {}) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }
    console.log('📊 Event:', eventName, params);
  }

  /**
   * Track tour view
   */
  function trackTourView(tourName, price) {
    trackEvent('view_item', {
      currency: 'IDR',
      value: price,
      items: [{
        item_name: tourName,
        item_category: 'Tour Package',
        price: price,
        currency: 'IDR'
      }]
    });
  }

  /**
   * Track CTA click
   */
  function trackCTAClick(ctaText, ctaLocation) {
    trackEvent('cta_click', {
      cta_text: ctaText,
      cta_location: ctaLocation,
      page_path: window.location.pathname
    });
  }

  /**
   * Track WhatsApp click
   */
  function trackWhatsAppClick(source) {
    trackEvent('whatsapp_click', {
      source: source,
      page_path: window.location.pathname
    });
  }

  /**
   * Track form submission
   */
  function trackFormSubmit(formName, formData = {}) {
    trackEvent('form_submit', {
      form_name: formName,
      ...formData
    });
  }

  /**
   * Track scroll depth
   */
  function trackScrollDepth(percentage) {
    trackEvent('scroll_depth', {
      percent_scrolled: percentage,
      page_path: window.location.pathname
    });
  }

  /**
   * Setup auto-tracking
   */
  function setupAutoTracking() {
    // CTA buttons
    document.querySelectorAll('.btn, .package-card__cta, .header__cta, .form-submit').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.textContent.trim();
        const section = btn.closest('section')?.id || (btn.closest('header') ? 'header' : 'unknown');
        trackCTAClick(text, section);
      });
    });

    // WhatsApp links
    document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]').forEach(link => {
      link.addEventListener('click', () => {
        const isFloating = link.classList.contains('whatsapp-float');
        const isHeader = link.classList.contains('header__cta');
        trackWhatsAppClick(isFloating ? 'floating' : isHeader ? 'header' : 'link');
      });
    });

    // Form submissions
    document.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', () => {
        const formName = form.id || form.name || 'unknown';
        const destination = form.querySelector('[name="destination"]')?.value;
        const pax = form.querySelector('[name="pax"]')?.value;
        trackFormSubmit(formName, { destination, pax });
      });
    });

    // Tour cards
    document.querySelectorAll('.package-card').forEach(card => {
      card.addEventListener('click', () => {
        const name = card.querySelector('.package-card__name')?.textContent;
        const priceText = card.querySelector('.package-card__price strong')?.textContent;
        const price = parseInt(priceText?.replace(/[^0-9]/g, '') || 0);
        if (name) trackTourView(name, price);
      });
    });

    // Scroll depth
    const scrollThresholds = [25, 50, 75, 100];
    const trackedThresholds = new Set();

    window.addEventListener('scroll', () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      scrollThresholds.forEach(threshold => {
        if (scrollPercent >= threshold && !trackedThresholds.has(threshold)) {
          trackedThresholds.add(threshold);
          trackScrollDepth(threshold);
        }
      });
    }, { passive: true });

    // Outbound links
    document.querySelectorAll('a[href^="http"]').forEach(link => {
      if (!link.href.includes(window.location.hostname)) {
        link.addEventListener('click', () => {
          trackEvent('click', {
            link_url: link.href,
            link_text: link.textContent.trim(),
            outbound: true
          });
        });
      }
    });

    console.log('✅ Auto-tracking enabled');
  }

  /**
   * Track Core Web Vitals
   */
  function trackWebVitals() {
    if (!('PerformanceObserver' in window)) return;

    // LCP
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        trackEvent('web_vital', {
          metric_name: 'LCP',
          metric_value: Math.round(lastEntry.startTime),
          metric_rating: lastEntry.startTime < 2500 ? 'good' : lastEntry.startTime < 4000 ? 'needs-improvement' : 'poor'
        });
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch(e) {}

    // CLS
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach(entry => {
          if (!entry.hadRecentInput) clsValue += entry.value;
        });
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });

      window.addEventListener('beforeunload', () => {
        trackEvent('web_vital', {
          metric_name: 'CLS',
          metric_value: Math.round(clsValue * 1000) / 1000,
          metric_rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs-improvement' : 'poor'
        });
      });
    } catch(e) {}

    // FID
    try {
      const fidObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach(entry => {
          trackEvent('web_vital', {
            metric_name: 'FID',
            metric_value: Math.round(entry.processingStart - entry.startTime),
            metric_rating: (entry.processingStart - entry.startTime) < 100 ? 'good' : (entry.processingStart - entry.startTime) < 300 ? 'needs-improvement' : 'poor'
          });
        });
      });
      fidObserver.observe({ type: 'first-input', buffered: true });
    } catch(e) {}
  }

  /**
   * Track page load performance
   */
  function trackPerformance() {
    if (!('performance' in window)) return;

    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        if (perfData) {
          trackEvent('page_load_time', {
            load_time: Math.round(perfData.loadEventEnd - perfData.fetchStart),
            dom_interactive: Math.round(perfData.domInteractive - perfData.fetchStart),
            page_path: window.location.pathname
          });
        }
      }, 0);
    });
  }

  // ============================================
  // GLOBAL API (accessible from HTML)
  // ============================================
  window.Tourduachina = {
    trackEvent,
    trackTourView,
    trackCTAClick,
    trackWhatsAppClick,
    trackFormSubmit,
    showNotification
  };

  // ============================================
  // INITIALIZATION
  // ============================================
  function initFooterYear() {
    const el = document.getElementById('footer-year');
    if (el) el.textContent = new Date().getFullYear();
  }

  function init() {
    // Main functionality
    addNotificationStyles();
    initMobileMenu();
    initStickyHeader();
    initSmoothScroll();
    initFAQAccordion();
    initFadeAnimations();
    initTourFilter();
    initTourSort();
    initBookingForm();
    initBackToTop();
    initLazyLoading();
    initCounterAnimation();
    initFooterYear();

    // Schema markup
    initSchemaMarkup();

    // Analytics
    initGA4();
    setupAutoTracking();
    trackPerformance();
    trackWebVitals();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
