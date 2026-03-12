/**
 * DevStart — assets/js/landing.js
 * Scripts exclusivos da página de vendas (index.html)
 */

'use strict';

/* ── Navbar: encolhe ao rolar ───────────────────────────── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ── Scroll Reveal ──────────────────────────────────────── */
function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach((el) => observer.observe(el));
}

/* ── FAQ Accordion ──────────────────────────────────────── */
function initFaq() {
  const faqList = document.getElementById('faqList');
  if (!faqList) return;

  faqList.addEventListener('click', (e) => {
    const btn = e.target.closest('.faq__question');
    if (!btn) return;

    const item   = btn.closest('.faq__item');
    const answer = item.querySelector('.faq__answer');
    const isOpen = btn.getAttribute('aria-expanded') === 'true';

    // Fecha todos
    faqList.querySelectorAll('.faq__question').forEach((q) => {
      q.setAttribute('aria-expanded', 'false');
      q.closest('.faq__item').querySelector('.faq__answer').hidden = true;
    });

    // Abre o clicado (se estava fechado)
    if (!isOpen) {
      btn.setAttribute('aria-expanded', 'true');
      answer.hidden = false;
    }
  });
}

/* ── Smooth scroll para âncoras internas ────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id     = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ── Init ───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initReveal();
  initFaq();
  initSmoothScroll();
});
