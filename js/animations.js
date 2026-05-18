/* ============================================================
   JP Careers — animations.js
   Intersection Observer | Counter | Parallax | Typing Effect
   ============================================================ */

(function () {
  'use strict';

  /* ─── Intersection Observer — Fade/Slide Animations ─── */
  function initScrollAnimations() {
    const animatedEls = document.querySelectorAll(
      '.fade-up, .fade-in, .slide-left, .slide-right, .scale-in'
    );

    if (!animatedEls.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    animatedEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ─── Staggered Card Animations ─── */
  function initStaggeredCards() {
    const groups = document.querySelectorAll('[data-stagger]');
    groups.forEach(function (group) {
      const cards = group.children;
      Array.from(cards).forEach(function (card, i) {
        card.classList.add('fade-up');
        card.style.transitionDelay = (i * 0.1) + 's';
      });
    });

    // Re-run scroll animations to pick up staggered cards
    initScrollAnimations();
  }

  /* ─── Counter Animation ─── */
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const duration = 2000;
    const startTime = performance.now();

    function easeOutExpo(t) {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);
      const current = Math.round(eased * target);
      el.textContent = prefix + current.toLocaleString('en-IN') + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach(function (counter) {
      counterObserver.observe(counter);
    });
  }

  /* ─── Parallax — Hero Section (performance-safe) ─── */
  function initParallax() {
    const hero = document.querySelector('[data-parallax]');
    if (!hero) return;

    // Only apply on non-mobile devices
    if (window.innerWidth < 768) return;

    let lastScrollY = 0;
    let ticking = false;

    function updateParallax() {
      const scrollY = window.scrollY;
      const orbs = hero.querySelectorAll('.orb');
      orbs.forEach(function (orb, i) {
        const speed = 0.08 + i * 0.04;
        orb.style.transform = 'translateY(' + (scrollY * speed) + 'px)';
      });
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      lastScrollY = window.scrollY;
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
  }

  /* ─── Typing Effect ─── */
  function initTypingEffect() {
    const el = document.querySelector('[data-typing]');
    if (!el) return;

    const phrases = el.getAttribute('data-typing').split('|');
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingTimer;

    function type() {
      const currentPhrase = phrases[phraseIndex % phrases.length];

      if (isDeleting) {
        charIndex--;
      } else {
        charIndex++;
      }

      el.textContent = currentPhrase.substring(0, charIndex);

      let delay = isDeleting ? 60 : 100;

      if (!isDeleting && charIndex === currentPhrase.length) {
        delay = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex++;
        delay = 400;
      }

      typingTimer = setTimeout(type, delay);
    }

    // Start after a short delay
    setTimeout(type, 800);
  }

  /* ─── Card Glow on Mouse Move ─── */
  function initCardGlow() {
    const cards = document.querySelectorAll('.service-card, .country-card, .testimonial-card');

    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', x + '%');
        card.style.setProperty('--mouse-y', y + '%');
      });
    });
  }

  /* ─── Carousel Auto-scroll (Testimonials) ─── */
  function initCarousel() {
    const carousel = document.querySelector('[data-carousel]');
    if (!carousel) return;

    const track = carousel.querySelector('[data-carousel-track]');
    if (!track) return;

    let scrollPos = 0;
    let direction = 1;
    let paused = false;

    carousel.addEventListener('mouseenter', () => { paused = true; });
    carousel.addEventListener('mouseleave', () => { paused = false; });

    function autoScroll() {
      if (!paused) {
        scrollPos += direction * 0.5;
        const maxScroll = track.scrollWidth - track.offsetWidth;
        if (scrollPos >= maxScroll) {
          direction = -1;
        } else if (scrollPos <= 0) {
          direction = 1;
        }
        track.scrollLeft = scrollPos;
      }
      requestAnimationFrame(autoScroll);
    }

    requestAnimationFrame(autoScroll);
  }

  /* ─── Number separator animation for hero stats ─── */
  function initStatCards() {
    const statNums = document.querySelectorAll('.stat-number[data-value]');
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const val = el.getAttribute('data-value');
          // Just reveal with a scale animation
          el.style.animation = 'none';
          el.offsetHeight; // trigger reflow
          el.style.animation = '';
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statNums.forEach(function (el) { observer.observe(el); });
  }

  /* ─── Init All ─── */
  function init() {
    initScrollAnimations();
    initStaggeredCards();
    initCounters();
    initParallax();
    initTypingEffect();
    initCardGlow();
    initCarousel();
    initStatCards();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
