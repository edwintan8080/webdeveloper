/**
 * Tourduachina.id — Analytics & Event Tracking
 * Google Analytics 4 + Custom Event Tracking
 */

(function() {
  'use strict';

  // ============================================
  // GA4 CONFIGURATION
  // ============================================
  // Ganti dengan Measurement ID Anda dari Google Analytics
  const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // TODO: Ganti dengan ID asli

  // ============================================
  // GA4 INITIALIZATION
  // ============================================
  function initGA4() {
    // Load gtag.js
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

  // ============================================
  // EVENT TRACKING FUNCTIONS
  // ============================================

  /**
   * Track custom event
   * @param {string} eventName - Nama event
   * @param {object} params - Event parameters
   */
  function trackEvent(eventName, params = {}) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }
    console.log('📊 Event tracked:', eventName, params);
  }

  /**
   * Track page view
   * @param {string} pagePath - Page path
   * @param {string} pageTitle - Page title
   */
  function trackPageView(pagePath, pageTitle) {
    trackEvent('page_view', {
      page_path: pagePath,
      page_title: pageTitle
    });
  }

  /**
   * Track tour package view
   * @param {string} tourName - Nama paket tour
   * @param {number} price - Harga tour
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
   * Track CTA button click
   * @param {string} ctaText - Text pada button
   * @param {string} ctaLocation - Lokasi CTA (hero, package, dll)
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
   * @param {string} source - Sumber klik (floating, header, contact, form)
   */
  function trackWhatsAppClick(source) {
    trackEvent('whatsapp_click', {
      source: source,
      page_path: window.location.pathname
    });
  }

  /**
   * Track form submission
   * @param {string} formName - Nama form
   * @param {object} formData - Form data (tanpa data sensitif)
   */
  function trackFormSubmit(formName, formData = {}) {
    trackEvent('form_submit', {
      form_name: formName,
      ...formData
    });
  }

  /**
   * Track scroll depth
   * @param {number} percentage - Persentase scroll (25, 50, 75, 100)
   */
  function trackScrollDepth(percentage) {
    trackEvent('scroll_depth', {
      percent_scrolled: percentage,
      page_path: window.location.pathname
    });
  }

  /**
   * Track file download
   * @param {string} fileName - Nama file
   * @param {string} fileType - Tipe file (pdf, jpg, dll)
   */
  function trackDownload(fileName, fileType) {
    trackEvent('file_download', {
      file_name: fileName,
      file_extension: fileType,
      page_path: window.location.pathname
    });
  }

  // ============================================
  // AUTO-TRACKING SETUP
  // ============================================
  function setupAutoTracking() {

    // Track all CTA button clicks
    document.querySelectorAll('.btn, .package-card__cta, .header__cta, .form-submit').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.textContent.trim();
        const section = btn.closest('section')?.id || btn.closest('header') ? 'header' : 'unknown';
        trackCTAClick(text, section);
      });
    });

    // Track WhatsApp clicks
    document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]').forEach(link => {
      link.addEventListener('click', () => {
        const isFloating = link.classList.contains('whatsapp-float');
        const isHeader = link.classList.contains('header__cta');
        const source = isFloating ? 'floating' : isHeader ? 'header' : 'link';
        trackWhatsAppClick(source);
      });
    });

    // Track form submissions
    document.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', () => {
        const formName = form.id || form.name || 'unknown_form';
        const destination = form.querySelector('[name="destination"]')?.value;
        const pax = form.querySelector('[name="pax"]')?.value;
        trackFormSubmit(formName, { destination, pax });
      });
    });

    // Track tour card clicks
    document.querySelectorAll('.package-card').forEach(card => {
      card.addEventListener('click', () => {
        const name = card.querySelector('.package-card__name')?.textContent;
        const priceText = card.querySelector('.package-card__price strong')?.textContent;
        const price = parseInt(priceText?.replace(/[^0-9]/g, '') || 0);
        if (name) trackTourView(name, price);
      });
    });

    // Track scroll depth
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

    // Track outbound links
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

    // Track file downloads
    document.querySelectorAll('a[href$=".pdf"], a[href$=".doc"], a[href$=".docx"]').forEach(link => {
      link.addEventListener('click', () => {
        const fileName = link.href.split('/').pop();
        const fileType = fileName.split('.').pop();
        trackDownload(fileName, fileType);
      });
    });

    console.log('✅ Auto-tracking enabled');
  }

  // ============================================
  // PERFORMANCE METRICS
  // ============================================
  function trackPerformance() {
    if ('performance' in window) {
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
  }

  // ============================================
  // CORE WEB VITALS
  // ============================================
  function trackWebVitals() {
    // LCP (Largest Contentful Paint)
    if ('PerformanceObserver' in window) {
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

      // CLS (Cumulative Layout Shift)
      try {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach(entry => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
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

      // FID (First Input Delay)
      try {
        const fidObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach(entry => {
            trackEvent('web_vital', {
              metric_name: 'FID',
              metric_value: Math.round(entry.processingStart - entry.startTime),
              metric_rating: entry.processingStart - entry.startTime < 100 ? 'good' : entry.processingStart - entry.startTime < 300 ? 'needs-improvement' : 'poor'
            });
          });
        });
        fidObserver.observe({ type: 'first-input', buffered: true });
      } catch(e) {}
    }
  }

  // ============================================
  // MAKE FUNCTIONS GLOBALLY AVAILABLE
  // ============================================
  window.trackEvent = trackEvent;
  window.trackPageView = trackPageView;
  window.trackTourView = trackTourView;
  window.trackCTAClick = trackCTAClick;
  window.trackWhatsAppClick = trackWhatsAppClick;
  window.trackFormSubmit = trackFormSubmit;

  // ============================================
  // INITIALIZE
  // ============================================
  function init() {
    initGA4();
    setupAutoTracking();
    trackPerformance();
    trackWebVitals();
    console.log('✅ Tourduachina.id — Analytics loaded');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
