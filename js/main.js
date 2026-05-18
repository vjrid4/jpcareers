/* ============================================================
   JP Careers — main.js
   Navbar | Mobile Menu | Dark Mode | Scroll | FAQ | Popups
   ============================================================ */

(function () {
  'use strict';

  /* ─── Scroll Progress Bar ─── */
  const progressBar = document.getElementById('scroll-progress');
  function updateProgress() {
    if (!progressBar) return;
    const doc = document.documentElement;
    const scrolled = doc.scrollTop || document.body.scrollTop;
    const total = doc.scrollHeight - doc.clientHeight;
    progressBar.style.width = total > 0 ? (scrolled / total) * 100 + '%' : '0%';
  }

  /* ─── Sticky Navbar ─── */
  const navbar = document.getElementById('navbar');
  function updateNavbar() {
    if (!navbar) return;
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  /* ─── Active Nav Link ─── */
  function setActiveNavLink() {
    const links = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    links.forEach(link => {
      const href = link.getAttribute('href')?.split('/').pop() || '';
      if (href === currentPath || (currentPath === '' && href === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  /* ─── Mobile Menu ─── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuClose = document.getElementById('menu-close');
  const mobileOverlay = document.getElementById('mobile-overlay');

  function openMenu() {
    mobileMenu?.classList.add('open');
    mobileOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
    hamburger?.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    mobileMenu?.classList.remove('open');
    mobileOverlay?.classList.remove('active');
    document.body.style.overflow = '';
    hamburger?.setAttribute('aria-expanded', 'false');
  }

  hamburger?.addEventListener('click', openMenu);
  menuClose?.addEventListener('click', closeMenu);
  mobileOverlay?.addEventListener('click', closeMenu);

  // Close menu on mobile link click
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  /* ─── Dark / Light Mode Toggle ─── */
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  function applyTheme(isLight) {
    if (isLight) {
      html.classList.add('light-mode');
      themeToggle?.setAttribute('aria-label', 'Switch to dark mode');
    } else {
      html.classList.remove('light-mode');
      themeToggle?.setAttribute('aria-label', 'Switch to light mode');
    }
    try { localStorage.setItem('jp-theme', isLight ? 'light' : 'dark'); } catch (e) {}
  }

  function initTheme() {
    let saved = 'dark';
    try { saved = localStorage.getItem('jp-theme') || 'dark'; } catch (e) {}
    applyTheme(saved === 'light');
  }

  themeToggle?.addEventListener('click', () => {
    const isLight = html.classList.contains('light-mode');
    applyTheme(!isLight);
  });

  initTheme();

  /* ─── Smooth Scroll for Anchor Links ─── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ─── FAQ Accordion ─── */
  function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      question?.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // Close all
        faqItems.forEach(i => i.classList.remove('open'));
        // Toggle current
        if (!isOpen) item.classList.add('open');
      });
    });
  }

  /* ─── Consultation Popup ─── */
  const consultPopup = document.getElementById('consult-popup');
  let consultShown = false;

  function showConsultPopup() {
    if (consultShown || !consultPopup) return;
    try {
      if (sessionStorage.getItem('jp-consult-shown')) return;
    } catch (e) {}
    consultShown = true;
    consultPopup.classList.add('active');
    try { sessionStorage.setItem('jp-consult-shown', '1'); } catch (e) {}
  }

  // Show after 30s
  setTimeout(showConsultPopup, 30000);

  // Exit intent (desktop)
  document.addEventListener('mouseleave', function (e) {
    if (e.clientY < 10) showConsultPopup();
  });

  // Close buttons
  document.querySelectorAll('.popup-close, .modal-close').forEach(btn => {
    btn.addEventListener('click', function () {
      const modal = this.closest('.modal-overlay');
      if (modal) modal.classList.remove('active');
    });
  });

  // Close on overlay click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', function (e) {
      if (e.target === this) this.classList.remove('active');
    });
  });

  /* ─── Newsletter Popup ─── */
  const newsletterPopup = document.getElementById('newsletter-popup');
  let newsletterShown = false;

  function showNewsletterPopup() {
    if (newsletterShown || !newsletterPopup) return;
    try {
      if (sessionStorage.getItem('jp-newsletter-shown')) return;
    } catch (e) {}
    newsletterShown = true;
    newsletterPopup.classList.add('active');
    try { sessionStorage.setItem('jp-newsletter-shown', '1'); } catch (e) {}
  }

  setTimeout(showNewsletterPopup, 60000);

  /* ─── WhatsApp Button Visibility ─── */
  const waBtn = document.getElementById('whatsapp-btn');
  function updateWABtn() {
    if (!waBtn) return;
    waBtn.style.opacity = window.scrollY > 200 ? '1' : '0';
    waBtn.style.pointerEvents = window.scrollY > 200 ? 'all' : 'none';
  }
  if (waBtn) {
    waBtn.style.transition = 'opacity 0.4s ease, transform 0.3s ease, box-shadow 0.3s ease';
    waBtn.style.opacity = '0';
    waBtn.style.pointerEvents = 'none';
  }

  /* ─── Scroll Event Handler ─── */
  let ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        updateProgress();
        updateNavbar();
        updateWABtn();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  /* ─── Init on DOM Ready ─── */
  document.addEventListener('DOMContentLoaded', function () {
    updateNavbar();
    updateProgress();
    updateWABtn();
    setActiveNavLink();
    initFAQ();
  });

  // Also call immediately in case DOM already loaded
  if (document.readyState !== 'loading') {
    updateNavbar();
    setActiveNavLink();
    initFAQ();
  }

})();
