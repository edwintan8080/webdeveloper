/**
 * Tourduachina.id — Main JavaScript
 * Core functionality: menu, scroll, accordion, filter, form, animations
 */

(function() {
  'use strict';

  // ============================================
  // MOBILE MENU
  // ============================================
  const hamburger = document.querySelector('.header__hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
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

  // ============================================
  // STICKY HEADER
  // ============================================
  const header = document.querySelector('.header');
  let lastScroll = 0;

  if (header) {
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      header.classList.toggle('header--scrolled', currentScroll > 50);
      lastScroll = currentScroll;
    }, { passive: true });
  }

  // ============================================
  // SMOOTH SCROLL
  // ============================================
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

  // ============================================
  // FAQ ACCORDION
  // ============================================
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

  // ============================================
  // FADE-IN ON SCROLL (IntersectionObserver)
  // ============================================
  const fadeEls = document.querySelectorAll('.fade-in');
  
  if ('IntersectionObserver' in window && fadeEls.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Stagger animation
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
  } else {
    // Fallback: show all immediately
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  // ============================================
  // TOUR PACKAGE FILTER (if on tours page)
  // ============================================
  const filterButtons = document.querySelectorAll('[data-filter]');
  const tourCards = document.querySelectorAll('[data-category]');

  if (filterButtons.length > 0 && tourCards.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        // Update active button
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter cards
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

  // ============================================
  // TOUR PACKAGE SORT (if on tours page)
  // ============================================
  const sortSelect = document.querySelector('[data-sort]');
  const tourGrid = document.querySelector('.packages__grid');

  if (sortSelect && tourGrid) {
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

  // ============================================
  // BOOKING FORM SUBMISSION
  // ============================================
  const bookingForm = document.getElementById('booking-form');

  if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const formData = new FormData(this);
      const name = formData.get('name') || '';
      const whatsapp = formData.get('whatsapp') || '';
      const email = formData.get('email') || '-';
      const destination = formData.get('destination') || '-';
      const pax = formData.get('pax') || '-';
      const date = formData.get('date') || '-';
      const duration = formData.get('duration') || '-';
      const message = formData.get('message') || '-';

      // Validate required fields
      if (!name || !whatsapp || !destination || !pax) {
        showNotification('Mohon lengkapi field yang wajib diisi (*)', 'error');
        return;
      }

      // Build WhatsApp message
      const waMessage = encodeURIComponent(
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
        `Mohon info harga dan detailnya ya! Terima kasih 🙏`
      );

      // Track form submission
      if (typeof trackEvent === 'function') {
        trackEvent('form_submit', {
          form_name: 'booking',
          destination: destination,
          pax: pax
        });
      }

      // Open WhatsApp
      window.open(`https://wa.me/6281234567890?text=${waMessage}`, '_blank');

      // Show success message
      showNotification('Redirecting ke WhatsApp...', 'success');

      // Reset form
      this.reset();
    });
  }

  // ============================================
  // NOTIFICATION SYSTEM
  // ============================================
  function showNotification(message, type = 'info') {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
      <span>${message}</span>
      <button class="notification__close" aria-label="Close">&times;</button>
    `;

    // Add styles
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

    // Close button
    notification.querySelector('.notification__close').addEventListener('click', () => {
      notification.remove();
    });

    // Auto remove after 3 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
      }
    }, 3000);
  }

  // Add notification animations
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

  // ============================================
  // BACK TO TOP BUTTON
  // ============================================
  const backToTop = document.querySelector('.back-to-top');

  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ============================================
  // LAZY LOADING IMAGES
  // ============================================
  if ('IntersectionObserver' in window) {
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

  // ============================================
  // COUNTER ANIMATION (Stats)
  // ============================================
  function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current).toLocaleString();
    }, 16);
  }

  // Observe stats section
  const statsSection = document.querySelector('.hero__stats');
  if (statsSection && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statValues = entry.target.querySelectorAll('.hero__stat-value');
          statValues.forEach(el => {
            const text = el.textContent;
            const number = parseInt(text.replace(/[^0-9]/g, ''));
            if (number && !el.dataset.animated) {
              el.dataset.animated = 'true';
              const suffix = text.replace(/[0-9]/g, '');
              animateCounter(el, number);
              setTimeout(() => {
                el.textContent = number + suffix;
              }, 2100);
            }
          });
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
  }

  // ============================================
  // INITIALIZE
  // ============================================
  console.log('✅ Tourduachina.id — Main JS loaded');

})();
