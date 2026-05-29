/* ===================================================
   TF's apps — Main JavaScript
   =================================================== */

(function () {
  'use strict';

  /* ---- Header scroll effect ---- */
  const header = document.getElementById('site-header');
  function onScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- Hamburger menu ---- */
  const hamburger = document.getElementById('hamburger-btn');
  const nav = document.querySelector('.header-nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });
    // Close nav on link click (mobile)
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- Scroll reveal ---- */
  const revealEls = document.querySelectorAll('.reveal');
  const cardEls   = document.querySelectorAll('.reveal-card');

  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  const cardObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, index) {
      if (entry.isIntersecting) {
        setTimeout(function () {
          entry.target.classList.add('visible');
        }, (entry.target.dataset.delay || 0) * 80);
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  revealEls.forEach(function (el) { revealObserver.observe(el); });
  cardEls.forEach(function (el, i) {
    el.dataset.delay = i % 4; // stagger within groups of 4
    cardObserver.observe(el);
  });

  /* ---- Smooth active nav highlight ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.header-nav a[href^="#"]');

  const sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(function (link) {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + id) {
            link.style.color = 'var(--sky)';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(function (sec) { sectionObserver.observe(sec); });

})();
