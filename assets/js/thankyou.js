/**
 * DevStart — assets/js/thankyou.js
 * Scripts da página de agradecimento (thankyou.html)
 */

'use strict';

/* ── Confetes ───────────────────────────────────────────── */
function lançarConfetes() {
  const wrap = document.getElementById('confetti');
  if (!wrap) return;

  const cores = [
    '#00e5a0', '#4fc3f7', '#ff6b35',
    '#c084fc', '#fbbf24', '#34d399', '#ffffff'
  ];

  const total = 90;

  for (let i = 0; i < total; i++) {
    const el = document.createElement('span');
    el.className = 'confetti-piece';

    const cor    = cores[Math.floor(Math.random() * cores.length)];
    const left   = Math.random() * 100;
    const delay  = Math.random() * 3;
    const dur    = 2.5 + Math.random() * 2.5;
    const size   = 6 + Math.random() * 8;
    const shape  = Math.random() > .5 ? '50%' : '2px';

    el.style.cssText = `
      left: ${left}%;
      background: ${cor};
      border-radius: ${shape};
      width: ${size}px;
      height: ${size}px;
      animation-duration: ${dur}s;
      animation-delay: ${delay}s;
    `;

    wrap.appendChild(el);

    // Remove após terminar
    el.addEventListener('animationend', () => el.remove());
  }
}

/* ── Nome do aluno (vindo da URL ou padrão) ─────────────── */
function saudarAluno() {
  const el = document.getElementById('nomeAluno');
  if (!el) return;

  // Tenta pegar o nome da URL: ?nome=João
  const params = new URLSearchParams(window.location.search);
  const nome   = params.get('nome');

  if (nome) {
    el.textContent = decodeURIComponent(nome);
  }
}

/* ── Reveal de entrada ──────────────────────────────────── */
function initReveal() {
  document.querySelectorAll('.reveal-in').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';

    requestAnimationFrame(() => {
      el.style.transition = 'opacity .6s ease, transform .6s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  });
}

/* ── Init ───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  lançarConfetes();
  saudarAluno();
  initReveal();
});
