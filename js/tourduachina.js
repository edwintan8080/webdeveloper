/**
 * Homepage hero customization.
 * Loads the original site bundle from tourduachina-core.js after applying
 * the ski hero image and readability overrides.
 */
(function () {
  'use strict';

  const style = document.createElement('style');
  style.setAttribute('data-home-hero-ski', 'true');
  style.textContent = `
    .hero {
      justify-content: flex-start !important;
      background:
        linear-gradient(90deg, rgba(15,24,31,.76) 0%, rgba(15,24,31,.52) 42%, rgba(15,24,31,.16) 70%, rgba(15,24,31,.08) 100%),
        url('/images/hero-ski-china.jpg') center center / cover no-repeat !important;
    }
    .hero::before {
      background: linear-gradient(180deg, rgba(0,0,0,.06), rgba(0,0,0,.18)) !important;
    }
    .hero__decoration { display: none !important; }
    .hero__content {
      text-align: left !important;
      max-width: 720px !important;
      margin-left: max(24px, calc((100vw - 1200px) / 2 + 24px)) !important;
      margin-right: 24px !important;
    }
    .hero__badge {
      color: #fff !important;
      background: rgba(255,255,255,.14) !important;
      border-color: rgba(255,255,255,.30) !important;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }
    .hero__title,
    .hero__title span {
      color: #fff !important;
      text-shadow: 0 4px 24px rgba(0,0,0,.38);
    }
    .hero__subtitle {
      color: rgba(255,255,255,.9) !important;
      margin-left: 0 !important;
      margin-right: 0 !important;
      text-shadow: 0 2px 12px rgba(0,0,0,.28);
    }
    .hero__cta-group,
    .hero__stats { justify-content: flex-start !important; }
    .hero__cta-group .btn--outline {
      color: #fff !important;
      border-color: rgba(255,255,255,.82) !important;
      background: rgba(0,0,0,.14) !important;
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
    }
    .hero__cta-group .btn--outline:hover {
      background: #fff !important;
      color: #25313A !important;
    }
    .hero__stats { border-top-color: rgba(255,255,255,.28) !important; }
    .hero__stat-value { color: #fff !important; }
    .hero__stat-label { color: rgba(255,255,255,.78) !important; }

    @media (max-width: 768px) {
      .hero {
        justify-content: center !important;
        background-position: 62% center !important;
      }
      .hero__content {
        text-align: center !important;
        margin-left: 0 !important;
        margin-right: 0 !important;
        padding-left: 20px !important;
        padding-right: 20px !important;
      }
      .hero__subtitle {
        margin-left: auto !important;
        margin-right: auto !important;
      }
      .hero__cta-group,
      .hero__stats { justify-content: center !important; }
    }
  `;
  document.head.appendChild(style);

  const current = document.currentScript;
  const base = current && current.src ? new URL('.', current.src) : new URL('/js/', window.location.href);
  const core = document.createElement('script');
  core.src = new URL('tourduachina-core.js', base).href;
  core.async = false;
  document.head.appendChild(core);
})();
