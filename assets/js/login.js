/**
 * DevStart — assets/js/login.js
 * Scripts da página de login/cadastro (login.html)
 * Gerencia: tema, tabs e força de senha
 * A lógica de autenticação fica em auth.js (Firebase)
 */

'use strict';

/* ── Tema ───────────────────────────────────────────────── */
function initTheme() {
  const html    = document.documentElement;
  const btn     = document.getElementById('themeBtn');
  const STORAGE = 'devstart-theme';

  const apply = (theme) => {
    html.setAttribute('data-theme', theme);
    if (btn) btn.textContent = theme === 'dark' ? '🌙' : '☀️';
    localStorage.setItem(STORAGE, theme);
  };

  // Aplica tema salvo ao carregar
  apply(localStorage.getItem(STORAGE) || 'dark');

  // Botão toggle
  if (btn) {
    btn.addEventListener('click', () => {
      apply(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  }
}

/* ── Tabs (Login / Cadastrar) ───────────────────────────── */
function initTabs() {
  const tabs = document.querySelectorAll('.auth-tab');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('aria-controls');
      const target   = document.getElementById(targetId);
      if (!target) return;

      // Desativa todos
      tabs.forEach((t) => {
        t.classList.remove('auth-tab--active');
        t.setAttribute('aria-selected', 'false');
        const panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) {
          panel.classList.remove('auth-form--active');
          panel.hidden = true;
        }
      });

      // Ativa o clicado
      tab.classList.add('auth-tab--active');
      tab.setAttribute('aria-selected', 'true');
      target.classList.add('auth-form--active');
      target.hidden = false;
    });
  });
}

/* ── Força da senha ─────────────────────────────────────── */
function initPasswordStrength() {
  const input = document.getElementById('reg-pw');
  const fill  = document.getElementById('pw-strength-fill');
  const label = document.getElementById('pw-strength-label');

  if (!input || !fill || !label) return;

  const levels = [
    { label: '—',        level: 0 },
    { label: 'Fraca',    level: 1 },
    { label: 'Razoável', level: 2 },
    { label: 'Boa',      level: 3 },
    { label: 'Forte 🔒', level: 4 },
  ];

  const calcStrength = (pw) => {
    if (!pw) return 0;
    let score = 0;
    if (pw.length >= 8)  score++;
    if (pw.length >= 12) score++;
    if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
    if (/\d/.test(pw))   score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return Math.min(4, score);
  };

  input.addEventListener('input', () => {
    const lvl = calcStrength(input.value);
    fill.setAttribute('data-level', lvl);
    label.textContent = levels[lvl].label;
  });
}

/* ── Init ───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTabs();
  initPasswordStrength();
});
