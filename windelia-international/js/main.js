/**
 * Windelia International — main.js
 * Nav toggle, header shadow, FAQ accordion, contact form handling.
 */
(function () {
    'use strict';

    /* ---------- Mobile nav toggle ---------- */
    var navToggle = document.querySelector('.nav__toggle');
    var navMenu = document.querySelector('.nav__menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            var isOpen = navMenu.getAttribute('data-open') === 'true';
            navMenu.setAttribute('data-open', String(!isOpen));
            navToggle.setAttribute('aria-expanded', String(!isOpen));
        });

        navMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navMenu.setAttribute('data-open', 'false');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* ---------- Header shadow on scroll ---------- */
    var header = document.querySelector('.site-header');
    if (header) {
        var onScroll = function () {
            header.style.boxShadow = window.scrollY > 8 ? '0 4px 16px rgba(26,26,46,0.08)' : 'none';
        };
        document.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* ---------- FAQ Accordion ---------- */
    document.querySelectorAll('.accordion-item').forEach(function (item) {
        var trigger = item.querySelector('.accordion-trigger');
        var panel = item.querySelector('.accordion-panel');
        if (!trigger || !panel) return;

        if (item.getAttribute('data-open') === 'true') {
            panel.style.maxHeight = panel.scrollHeight + 'px';
        }

        trigger.addEventListener('click', function () {
            var isOpen = item.getAttribute('data-open') === 'true';
            item.setAttribute('data-open', String(!isOpen));
            trigger.setAttribute('aria-expanded', String(!isOpen));
            panel.style.maxHeight = !isOpen ? panel.scrollHeight + 'px' : '0px';
        });
    });

    /* ---------- Contact form → WhatsApp handoff ---------- */
    var contactForm = document.querySelector('#contact-form');
    var WHATSAPP_NUMBER = '62xxxxxxxxxxx'; // TODO: ganti dengan nomor WhatsApp resmi (format: 62 tanpa tanda +)

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var status = contactForm.querySelector('.form-status');
            var data = new FormData(contactForm);
            var name = (data.get('name') || '').toString().trim();
            var service = (data.get('service') || '').toString().trim();
            var message = (data.get('message') || '').toString().trim();

            if (!name || !message) {
                if (status) {
                    status.textContent = 'Mohon lengkapi nama dan pesan Anda.';
                    status.dataset.state = 'error';
                }
                return;
            }

            var text = 'Halo Windelia International, saya ' + name +
                (service ? ' tertarik dengan layanan ' + service : '') +
                '. ' + message;
            var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text);

            if (status) {
                status.textContent = 'Terima kasih! Anda akan diarahkan ke WhatsApp kami.';
                status.dataset.state = 'success';
            }
            window.open(url, '_blank', 'noopener');
            contactForm.reset();
        });
    }

    /* ---------- Current year in footer ---------- */
    document.querySelectorAll('[data-current-year]').forEach(function (el) {
        el.textContent = new Date().getFullYear();
    });
})();
