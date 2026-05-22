/**
 * Swamp Mode — Header JavaScript
 * Handles: sticky header, mobile menu toggle, scroll lock, focus trap
 */

(function () {
  'use strict';

  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('mobile-menu-overlay');
  const htmlEl = document.documentElement;

  if (!header || !menuToggle || !mobileMenu || !overlay) return;

  let isMenuOpen = false;
  let lastScrollY = 0;

  /* ── Sticky Header ── */
  function handleScroll() {
    const scrollY = window.scrollY;

    if (scrollY > 20) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }

    lastScrollY = scrollY;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  /* ── Mobile Menu Toggle ── */
  function openMenu() {
    isMenuOpen = true;
    mobileMenu.classList.add('is-open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    overlay.classList.add('is-active');
    overlay.setAttribute('aria-hidden', 'false');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Cerrar menú');
    htmlEl.classList.add('scroll-locked');

    // Focus first link
    const firstLink = mobileMenu.querySelector('.mobile-menu__link');
    if (firstLink) {
      setTimeout(() => firstLink.focus(), 300);
    }
  }

  function closeMenu() {
    isMenuOpen = false;
    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('is-active');
    overlay.setAttribute('aria-hidden', 'true');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menú');
    htmlEl.classList.remove('scroll-locked');

    menuToggle.focus();
  }

  function toggleMenu() {
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  menuToggle.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', closeMenu);

  /* ── Keyboard: Escape to close ── */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isMenuOpen) {
      closeMenu();
    }
  });

  /* ── Focus Trap in Mobile Menu ── */
  mobileMenu.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;

    const focusableEls = mobileMenu.querySelectorAll(
      'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      }
    } else {
      if (document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }
  });

  /* ── Close menu on window resize past mobile breakpoint ── */
  const mql = window.matchMedia('(min-width: 768px)');
  mql.addEventListener('change', function (e) {
    if (e.matches && isMenuOpen) {
      closeMenu();
    }
  });

  /* ── Initialize ── */
  handleScroll();
})();
