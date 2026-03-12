/* ============================================================
   DevStart — assets/js/app.js
   Lógica completa da plataforma de aulas (app.html)
   ============================================================ */

import { auth, API_URL }                from './firebase.js';
import { onAuthStateChanged, signOut }  from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getFirestore, doc, getDoc }    from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
const db = getFirestore();
import Security from './security.js';

// ── Lazy loading ───────────────────────────────────────────────────────────
const CONTENT_CACHE = {};
const CONTENT_MAP = {
  logica: () => import('./content-logica.js').then(m => m.LOGICA),
  html:   () => import('./content-html.js').then(m => m.HTML),
  css:    () => import('./content-css.js').then(m => m.CSS),
  js:     () => import('./content-js.js').then(m => m.JS),
  ai:     () => import('./content-ia.js').then(m => m.IA),
};

async function getChapterContent(modId, chapterId) {
  if (!CONTENT_CACHE[modId]) {
    CONTENT_CACHE[modId] = await CONTENT_MAP[modId]();
  }
  return CONTENT_CACHE[modId][chapterId];
}

const API = API_URL;

// ── Estado global ──────────────────────────────────────────────────────────
let currentUser  = null;
let userToken    = null;
let userProgress = {};          // { moduleId: { chaptersCompleted:[], quizScores:{} } }
let currentModule  = null;
let currentChapter = null;
let heartbeatTimer = null;

// ── Auth Guard ─────────────────────────────────────────────────────────────
onAuthStateChanged(auth, async (user) => {
  if (!user) { window.location.href = 'login.html'; return; }

  currentUser = user;
  userToken   = await user.getIdToken();

  // Buscar perfil do Firestore diretamente
  const userDoc  = await getDoc(doc(db, 'users', user.uid)).catch(() => null);
  const userData = userDoc?.data() || {};
  const isAdmin  = userData.role === 'admin';

  // Buscar progresso do Firestore
  const progressDoc = await getDoc(doc(db, 'progress', user.uid)).catch(() => null);
  userProgress = progressDoc?.exists() ? progressDoc.data() : {};

  // Tentar backend em segundo plano (não bloqueia se offline)
  apiFetch('/progress/me').then(p => { if (p) { userProgress = p; updateNavbarProgress(); } }).catch(() => {});

  // Atualizar lastActiveAt no Firestore
  const { setDoc: fsSet, serverTimestamp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
  fsSet(doc(db, 'users', user.uid), { lastActiveAt: serverTimestamp() }, { merge: true }).catch(() => {});

  renderNavbar(userData, isAdmin);
  renderSidebar();
  renderDashboard();
  updateNavbarProgress();
  startHeartbeat();
  Security.init({ detectDevTools: false, blockCopy: false, blockMenu: false });
});

// ── API helper ─────────────────────────────────────────────────────────────
async function apiFetch(path, options = {}) {
  try {
    const res = await fetch(API + path, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization:  'Bearer ' + userToken,
        ...(options.headers || {}),
      },
    });
    if (res.status === 401) { window.location.href = 'login.html'; return null; }
    return res.json().catch(() => null);
  } catch {
    // Backend offline — ignora silenciosamente
    return null;
  }
}

// ── Logout ─────────────────────────────────────────────────────────────────
window.doLogout = async () => {
  clearInterval(heartbeatTimer);
  await signOut(auth);
  window.location.href = 'index.html';
};

// ── Heartbeat ─────────────────────────────────────────────────────────────
function startHeartbeat() {
  // Atualiza lastActiveAt no Firestore a cada 2 minutos
  heartbeatTimer = setInterval(async () => {
    if (!currentUser) return;
    try {
      const { setDoc: fsSet, serverTimestamp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
      await fsSet(doc(db, 'users', currentUser.uid), { lastActiveAt: serverTimestamp() }, { merge: true });
    } catch {}
  }, 2 * 60 * 1000);
}

// ══════════════════════════════════════════════════════════════════════════
//  DADOS DOS MÓDULOS
// ══════════════════════════════════════════════════════════════════════════
const MODULES = {
  logica: {
    title: 'Lógica de Programação', icon: '🧠', color: '#9b59b6',
    desc: 'A base de tudo. Aprenda a pensar como um computador antes de escrever código.',
    tag: 'Módulo 00',
    chapters: [
      { id:'logica-01', title:'O que é lógica',                 desc:'Por que computadores precisam de lógica',           type:'chapter' },
      { id:'logica-02', title:'Algoritmos',                      desc:'O que são e como pensar em passos',                  type:'chapter' },
      { id:'logica-03', title:'Fluxogramas',                     desc:'Representando lógica visualmente',                  type:'chapter' },
      { id:'logica-04', title:'Variáveis e constantes',          desc:'Guardando e manipulando informações',               type:'chapter' },
      { id:'logica-05', title:'Tipos de dados',                  desc:'Números, texto, booleanos e mais',                  type:'chapter' },
      { id:'logica-06', title:'Operadores',                      desc:'Aritméticos, relacionais e lógicos',                type:'chapter' },
      { id:'logica-07', title:'Estruturas condicionais',         desc:'SE, SENÃO, SENÃO SE',                               type:'chapter' },
      { id:'logica-08', title:'Estruturas de repetição',         desc:'ENQUANTO, PARA, REPITA',                            type:'chapter' },
      { id:'logica-09', title:'Vetores e matrizes',              desc:'Listas e tabelas de dados',                         type:'chapter' },
      { id:'logica-10', title:'Funções e modularização',         desc:'Dividindo e reutilizando soluções',                 type:'chapter' },
      { id:'logica-11', title:'Pseudocódigo',                    desc:'Escrevendo lógica antes de codar',                  type:'chapter' },
      { id:'logica-12', title:'🏆 Desafio Final',               desc:'5 problemas de lógica em pseudocódigo',             type:'challenge' },
    ],
  },
  html: {
    title: 'HTML', icon: '🏗️', color: '#e44d26',
    desc: 'A espinha dorsal de toda página web. Estrutura, semântica e boas práticas.',
    tag: 'Módulo 01',
    chapters: [
      { id:'html-01', title:'Como a web funciona',               desc:'Cliente, servidor, HTTP e o navegador',             type:'chapter' },
      { id:'html-02', title:'O que é HTML',                      desc:'História, evolução e o HTML5',                      type:'chapter' },
      { id:'html-03', title:'Estrutura base de uma página',      desc:'DOCTYPE, html, head, meta, body',                   type:'chapter' },
      { id:'html-04', title:'Textos, títulos e formatação',      desc:'h1–h6, p, strong, em, br, hr',                      type:'chapter' },
      { id:'html-05', title:'Links, âncoras e navegação',        desc:'A tag <a>, href, target, links internos',           type:'chapter' },
      { id:'html-06', title:'Imagens, áudio e vídeo',            desc:'img, audio, video, atributos e acessibilidade',     type:'chapter' },
      { id:'html-07', title:'Listas e tabelas',                  desc:'ul, ol, dl, table com thead, tbody, colspan',       type:'chapter' },
      { id:'html-08', title:'Formulários completos',             desc:'input, select, radio, checkbox, validação nativa',  type:'chapter' },
      { id:'html-09', title:'HTML Semântico',                    desc:'header, nav, main, article, aside, footer',         type:'chapter' },
      { id:'html-10', title:'🏆 Desafio Final',                  desc:'Página de perfil completa e semântica',             type:'challenge' },
    ],
  },
  css: {
    title: 'CSS', icon: '🎨', color: '#264de4',
    desc: 'Transforme estrutura em beleza. Layouts, animações e design responsivo.',
    tag: 'Módulo 02',
    chapters: [
      { id:'css-01', title:'Como o CSS funciona',                desc:'Cascata, herança e especificidade',                  type:'chapter' },
      { id:'css-02', title:'Formas de aplicar CSS',              desc:'Inline, interno, externo',                          type:'chapter' },
      { id:'css-03', title:'Seletores completos',                desc:'Tipo, classe, id, atributo, pseudo-classes',        type:'chapter' },
      { id:'css-04', title:'Box Model + box-sizing',             desc:'margin, padding, border e o modelo de caixa',       type:'chapter' },
      { id:'css-05', title:'Cores, gradientes e variáveis',      desc:'hex, rgb, hsl, gradientes e --custom-properties',   type:'chapter' },
      { id:'css-06', title:'Tipografia completa',                desc:'font-family, @font-face, Google Fonts',             type:'chapter' },
      { id:'css-07', title:'Flexbox do zero ao avançado',        desc:'Eixos, alinhamento, wrap, grow, shrink',            type:'chapter' },
      { id:'css-08', title:'CSS Grid completo',                  desc:'template, áreas, auto-fit, minmax',                 type:'chapter' },
      { id:'css-09', title:'Posicionamento',                     desc:'static, relative, absolute, fixed, sticky',        type:'chapter' },
      { id:'css-10', title:'Transições e animações',             desc:'transition, @keyframes, animation',                 type:'chapter' },
      { id:'css-11', title:'Responsividade e Media Queries',     desc:'Mobile-first, breakpoints, viewport',              type:'chapter' },
      { id:'css-12', title:'🏆 Desafio Final',                   desc:'Landing page responsiva do DevStart',               type:'challenge' },
    ],
  },
  js: {
    title: 'JavaScript', icon: '⚡', color: '#f7df1e',
    desc: 'Dê vida às suas páginas. Lógica, DOM, eventos e APIs reais.',
    tag: 'Módulo 03',
    chapters: [
      { id:'js-01', title:'O que é JavaScript',                  desc:'História, onde roda, como incluir no HTML',         type:'chapter' },
      { id:'js-02', title:'Variáveis e tipos de dados',          desc:'var, let, const, tipos e coerção',                  type:'chapter' },
      { id:'js-03', title:'Operadores',                          desc:'Aritméticos, comparação, lógicos, ternário',        type:'chapter' },
      { id:'js-04', title:'Condicionais',                        desc:'if/else, else if, switch',                          type:'chapter' },
      { id:'js-05', title:'Loops',                               desc:'for, while, do while, for...of, for...in',          type:'chapter' },
      { id:'js-06', title:'Funções',                             desc:'Declaração, expressão, arrow function',             type:'chapter' },
      { id:'js-07', title:'Arrays e métodos',                    desc:'map, filter, reduce, forEach, find',                type:'chapter' },
      { id:'js-08', title:'Objetos e desestruturação',           desc:'Propriedades, métodos, spread e rest',              type:'chapter' },
      { id:'js-09', title:'DOM — manipulando elementos',         desc:'querySelector, createElement, innerHTML',           type:'chapter' },
      { id:'js-10', title:'Eventos',                             desc:'click, submit, keydown, delegação',                 type:'chapter' },
      { id:'js-11', title:'Formulários e validação',             desc:'Leitura de inputs e validação com JS',              type:'chapter' },
      { id:'js-12', title:'localStorage e sessionStorage',       desc:'Persistência de dados no navegador',                type:'chapter' },
      { id:'js-13', title:'Fetch API',                           desc:'Consumindo dados de uma API pública',               type:'chapter' },
      { id:'js-14', title:'🏆 Desafio Final',                    desc:'App de lista de tarefas com localStorage',          type:'challenge' },
    ],
  },
  ai: {
    title: 'IA com Claude', icon: '🤖', color: '#00e5a0',
    desc: 'Use IA como ferramenta profissional. Prompts, debugging e fluxo real.',
    tag: 'Módulo 04',
    chapters: [
      { id:'ai-01', title:'O que é IA generativa',               desc:'Como LLMs funcionam — de forma simples',            type:'chapter' },
      { id:'ai-02', title:'Anatomia de um bom prompt',           desc:'Contexto, instrução, formato e exemplo',            type:'chapter' },
      { id:'ai-03', title:'IA para aprender',                    desc:'Pedir explicações, analogias e exemplos',           type:'chapter' },
      { id:'ai-04', title:'IA para debugar',                     desc:'Como descrever um erro corretamente',               type:'chapter' },
      { id:'ai-05', title:'IA para codar',                       desc:'Pedir funcionalidades, refatorar código',           type:'chapter' },
      { id:'ai-06', title:'Engenharia de prompt avançada',       desc:'Personas, chain-of-thought, iteração',              type:'chapter' },
      { id:'ai-07', title:'Limites da IA',                       desc:'Quando não confiar e como verificar',               type:'chapter' },
      { id:'ai-08', title:'🏆 Desafio Final',                    desc:'Resolver um bug real usando IA',                    type:'challenge' },
    ],
  },
};

// ══════════════════════════════════════════════════════════════════════════
//  RENDER NAVBAR
// ══════════════════════════════════════════════════════════════════════════
function renderNavbar(me, isAdmin = false) {
  const name    = me?.displayName || me?.username || '?';
  const initial = name[0].toUpperCase();
  const email   = me?.email || '';

  // Navbar
  document.getElementById('navbar-avatar').textContent   = initial;
  document.getElementById('navbar-username').textContent = name;

  // Dropdown
  document.getElementById('pd-avatar').textContent = initial;
  document.getElementById('pd-name').textContent   = name;
  document.getElementById('pd-email').textContent  = email;

  // Mostrar opção admin se for admin
  if (isAdmin) {
    document.getElementById('pd-admin-item').style.display = 'block';
  }
}

window.toggleProfileDropdown = function () {
  const dd = document.getElementById('profile-dropdown');
  dd.classList.toggle('open');
};

window.closeProfileDropdown = function () {
  document.getElementById('profile-dropdown').classList.remove('open');
};

// Fechar dropdown ao clicar fora
document.addEventListener('click', (e) => {
  const wrap = document.getElementById('profile-dropdown-wrap');
  if (wrap && !wrap.contains(e.target)) closeProfileDropdown();
});

function updateNavbarProgress() {
  const total = Object.values(MODULES).reduce((s, m) => s + m.chapters.length, 0);
  const done  = Object.entries(MODULES).reduce((s, [id, m]) => {
    return s + Math.min((userProgress[id]?.chaptersCompleted || []).length, m.chapters.length);
  }, 0);
  const pct = Math.round((done / total) * 100);
  document.getElementById('navbar-progress-fill').style.width = pct + '%';
  document.getElementById('navbar-progress-pct').textContent  = pct + '%';
}

// ══════════════════════════════════════════════════════════════════════════
//  RENDER SIDEBAR
// ══════════════════════════════════════════════════════════════════════════
function renderSidebar() {
  const container = document.getElementById('sidebar-modules');
  container.innerHTML = Object.entries(MODULES).map(([id, mod]) => {
    const done  = (userProgress[id]?.chaptersCompleted || []).length;
    const total = mod.chapters.length;
    const pct   = Math.round((done / total) * 100);

    const chaptersHTML = mod.chapters.map(ch => {
      const isDone      = (userProgress[id]?.chaptersCompleted || []).includes(ch.id);
      const isChallenge = ch.type === 'challenge';
      return `
        <button class="sidebar-chapter-btn ${isDone ? 'done' : ''}"
                id="sbch-${ch.id}"
                onclick="openChapter('${id}','${ch.id}')">
          <div class="chapter-check ${isDone ? 'done' : isChallenge ? 'challenge' : ''}">
            ${isDone ? '✓' : isChallenge ? '★' : ''}
          </div>
          <span>${ch.title}</span>
        </button>`;
    }).join('');

    return `
      <div class="sidebar-module" id="sbmod-${id}">
        <button class="sidebar-module-btn" id="sbmodbtn-${id}"
                style="--mod-color:${mod.color}"
                onclick="toggleSidebarModule('${id}')">
          <span class="sidebar-module-icon">${mod.icon}</span>
          <div class="sidebar-module-info">
            <div class="sidebar-module-name">${mod.title}</div>
            <div class="sidebar-module-meta">${done}/${total} capítulos</div>
          </div>
          <span class="sidebar-module-arrow">▶</span>
        </button>
        <div class="sidebar-mod-bar">
          <div class="sidebar-mod-bar-fill"
               style="width:${pct}%;background:${mod.color}"></div>
        </div>
        <div class="sidebar-chapters" id="sbchaps-${id}">
          ${chaptersHTML}
        </div>
      </div>`;
  }).join('');
}

window.toggleSidebarModule = function (id) {
  const btn   = document.getElementById('sbmodbtn-' + id);
  const chaps = document.getElementById('sbchaps-' + id);
  const isOpen = chaps.classList.contains('open');
  // fecha todos
  document.querySelectorAll('.sidebar-chapters').forEach(el => el.classList.remove('open'));
  document.querySelectorAll('.sidebar-module-btn').forEach(el => el.classList.remove('open', 'active'));
  if (!isOpen) { chaps.classList.add('open'); btn.classList.add('open', 'active'); }
};

// Mobile sidebar toggle com overlay
window.toggleMobileSidebar = function () {
  const sidebar = document.getElementById('app-sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  const isOpen = sidebar.classList.toggle('open');
  if (overlay) overlay.classList.toggle('show', isOpen);
};

window.closeMobileSidebar = function () {
  document.getElementById('app-sidebar').classList.remove('open');
  const overlay = document.getElementById('sidebar-overlay');
  if (overlay) overlay.classList.remove('show');
};

// ══════════════════════════════════════════════════════════════════════════
//  RENDER DASHBOARD
// ══════════════════════════════════════════════════════════════════════════
function renderDashboard() {
  const container = document.getElementById('modules-grid');
  container.innerHTML = Object.entries(MODULES).map(([id, mod]) => {
    const done  = (userProgress[id]?.chaptersCompleted || []).length;
    const total = mod.chapters.length;
    const pct   = Math.round((done / total) * 100);

    return `
      <div class="module-card" style="--mod-color:${mod.color}"
           onclick="openModule('${id}')">
        <div class="module-card-icon">${mod.icon}</div>
        <div class="module-card-tag">${mod.tag}</div>
        <h3>${mod.title}</h3>
        <p>${mod.desc}</p>
        <div class="module-card-meta">
          <span>${total} capítulos</span>
          <span>·</span>
          <span>${done} concluídos</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill"
               style="width:${pct}%;background:${mod.color}"></div>
        </div>
      </div>`;
  }).join('');
}

// ══════════════════════════════════════════════════════════════════════════
//  NAVEGAÇÃO
// ══════════════════════════════════════════════════════════════════════════
window.openModule = function (modId) {
  // Abre o primeiro capítulo não concluído, ou o primeiro
  const mod  = MODULES[modId];
  const done = userProgress[modId]?.chaptersCompleted || [];
  const next = mod.chapters.find(ch => !done.includes(ch.id)) || mod.chapters[0];

  // Expande sidebar
  toggleSidebarModule(modId);
  openChapter(modId, next.id);
};

window.openChapter = async function (modId, chapterId) {
  // Mostrar marcador de texto
  const toolbar = document.getElementById('highlighter-toolbar');
  if (toolbar) toolbar.style.display = 'flex';
  currentModule  = modId;
  currentChapter = chapterId;

  // Atualiza sidebar highlights
  document.querySelectorAll('.sidebar-chapter-btn').forEach(b => b.classList.remove('active'));
  const sbBtn = document.getElementById('sbch-' + chapterId);
  if (sbBtn) sbBtn.classList.add('active');

  // Loading enquanto busca conteúdo
  const view = document.getElementById('chapter-view');
  view.classList.add('active');
  document.getElementById('dashboard').style.display = 'none';
  view.innerHTML = '<div style="padding:3rem;text-align:center;color:var(--text3);font-size:1.1rem">⏳ Carregando...</div>';

  const data = await getChapterContent(modId, chapterId);
  if (!data) { renderComingSoon(modId, chapterId); return; }
  renderChapter(modId, chapterId, data);

  // Fecha sidebar mobile
  document.getElementById('app-sidebar').classList.remove('open');
  const overlay = document.getElementById('sidebar-overlay');
  if (overlay) overlay.classList.remove('show');
};

// ── Voltar ao dashboard
window.goToDashboard = function () {
  // Esconder e desativar marcador
  const toolbar = document.getElementById('highlighter-toolbar');
  if (toolbar) toolbar.style.display = 'none';
  stopHighlighter();
  currentModule  = null;
  currentChapter = null;
  document.getElementById('dashboard').style.display   = 'block';
  document.getElementById('chapter-view').classList.remove('active');
  document.querySelectorAll('.sidebar-chapter-btn').forEach(b => b.classList.remove('active'));
};

// ══════════════════════════════════════════════════════════════════════════
//  RENDER CHAPTER
// ══════════════════════════════════════════════════════════════════════════
function renderChapter(modId, chapterId, data) {
  const mod     = MODULES[modId];
  const chInfo  = mod.chapters.find(c => c.id === chapterId);
  const isDone  = (userProgress[modId]?.chaptersCompleted || []).includes(chapterId);

  // Esconde dashboard
  document.getElementById('dashboard').style.display = 'none';
  const view = document.getElementById('chapter-view');
  view.classList.add('active');

  // ── Navegar capítulos anterior/próximo
  const allIds  = mod.chapters.map(c => c.id);
  const idx     = allIds.indexOf(chapterId);
  const prevId  = idx > 0 ? allIds[idx - 1] : null;
  const nextId  = idx < allIds.length - 1 ? allIds[idx + 1] : null;

  // ── Conteúdo HTML
  let html = `
    <!-- BREADCRUMB -->
    <div class="chapter-breadcrumb">
      <span onclick="goToDashboard()" style="cursor:pointer;color:var(--text2)">Início</span>
      <span class="breadcrumb-sep">›</span>
      <span class="breadcrumb-mod" style="color:${mod.color}">${mod.icon} ${mod.title}</span>
      <span class="breadcrumb-sep">›</span>
      <span class="breadcrumb-cur">${chInfo.title}</span>
    </div>

    <!-- HEADER -->
    <div class="chapter-header">
      <div class="chapter-module-tag" style="color:${mod.color}">${mod.title}</div>
      <div class="chapter-title">${data.title}</div>
      <div class="chapter-desc">${data.desc}</div>
    </div>

    <!-- CONTEÚDO -->
    <div class="protected-content">`;

  data.blocks.forEach(block => {
    if (block.type === 'text') {
      html += `
        <div class="content-block">
          <h3>${block.title}</h3>
          <p>${block.body}</p>
        </div>`;
    } else if (block.type === 'callout') {
      html += `<div class="callout">${block.body}</div>`;
    }
  });

  // ── Editor ao vivo
  html += `
    <div class="content-block">
      <h3>Editor ao vivo</h3>
      <p class="text-muted text-sm" style="margin-bottom:.75rem">
        Edite o código e clique em ▶ Executar para ver o resultado em tempo real.
      </p>
    </div>
    <div class="editor-wrap">
      <div class="editor-toolbar">
        <div class="editor-dots">
          <div class="editor-dot dot-r"></div>
          <div class="editor-dot dot-y"></div>
          <div class="editor-dot dot-g"></div>
        </div>
        <div class="editor-tabs">
          ${data.editor.tabs.map((tab, i) => `
            <button class="editor-tab ${i === 0 ? 'active' : ''}"
                    onclick="switchEditorTab(${i})">${tab}</button>`).join('')}
        </div>
        <button class="editor-run-btn" onclick="runCode()">▶ Executar</button>
      </div>
      <div class="editor-body">
        <div>
          ${data.editor.tabs.map((_, i) => `
            <div class="code-panel ${i === 0 ? 'active' : ''}" id="ep-${i}">
              <textarea class="code-textarea" id="ec-${i}"
                        spellcheck="false">${data.editor.code[i] || ''}</textarea>
            </div>`).join('')}
        </div>
        <div class="preview-panel">
          <div class="preview-label">
            <div class="preview-dot"></div> Resultado ao vivo
          </div>
          <iframe class="preview-frame" id="preview-frame"
                  sandbox="allow-scripts"></iframe>
        </div>
      </div>
    </div>`;

  // ── Quiz
  html += renderQuizHTML(data.quiz, chapterId);

  // ── Challenge
  html += renderChallengeHTML(data.challenge, chapterId, isDone);

  // ── Navegação entre capítulos
  html += `
    <div class="chapter-nav">
      <button class="btn btn-secondary btn-sm"
              onclick="${prevId ? `openChapter('${modId}','${prevId}')` : 'goToDashboard()'}">
        ← ${prevId ? 'Anterior' : 'Início'}
      </button>
      ${nextId
        ? `<button class="btn btn-primary btn-sm"
                  onclick="openChapter('${modId}','${nextId}')">
            Próximo →
          </button>`
        : `<button class="btn btn-primary btn-sm" onclick="goToDashboard()"
                  style="background:var(--accent2)">
            ✅ Módulo concluído! Ir ao início
          </button>`
      }
    </div>`;

  html += '</div>'; // /protected-content

  view.innerHTML = html;

  // Inicializar quiz diretamente (sem MutationObserver)
  if (data?.quiz?.length) {
    initQuiz(data.quiz, chapterId);
  }

  // Inicializar CodeMirror com syntax highlight
  setTimeout(() => {
    initCodeMirror();
    runCode();
  }, 80);
  // Restaurar tasks salvas
  restoreTasks(chapterId);
}

// ── Coming soon
function renderComingSoon(modId, chapterId) {
  const mod    = MODULES[modId];
  const chInfo = mod.chapters.find(c => c.id === chapterId);

  document.getElementById('dashboard').style.display = 'none';
  const view = document.getElementById('chapter-view');
  view.classList.add('active');

  view.innerHTML = `
    <div class="chapter-breadcrumb">
      <span onclick="goToDashboard()" style="cursor:pointer;color:var(--text2)">Início</span>
      <span class="breadcrumb-sep">›</span>
      <span class="breadcrumb-mod" style="color:${mod.color}">${mod.icon} ${mod.title}</span>
    </div>
    <div style="text-align:center;padding:4rem 2rem;">
      <div style="font-size:3rem;margin-bottom:1rem">📚</div>
      <div style="font-family:var(--font-display);font-size:1.4rem;font-weight:800;margin-bottom:.5rem">
        Em breve!
      </div>
      <div style="color:var(--text2);font-size:.95rem;max-width:400px;margin:0 auto 2rem">
        O capítulo <strong>${chInfo?.title}</strong> está sendo preparado.
      </div>
      <button class="btn btn-secondary" onclick="goToDashboard()">← Voltar ao início</button>
    </div>`;
}

// ══════════════════════════════════════════════════════════════════════════
//  EDITOR + CODEMIRROR
// ══════════════════════════════════════════════════════════════════════════
let activeEditorTab = 0;
const cmEditors = [];  // instâncias CodeMirror por tab

function initCodeMirror() {
  if (typeof CodeMirror === 'undefined') return;
  cmEditors.length = 0;
  document.querySelectorAll('.code-textarea').forEach((ta, i) => {
    const mode = detectMode(ta.value);
    const cm = CodeMirror.fromTextArea(ta, {
      mode,
      theme: 'default',
      lineNumbers: true,
      lineWrapping: false,
      autofocus: i === 0,
      indentUnit: 2,
      tabSize: 2,
      indentWithTabs: false,
      matchBrackets: true,
      styleActiveLine: true,
      extraKeys: { Tab: cm => cm.execCommand('indentMore') },
    });
    cm.on('change', () => { if (i === 0) runCode(); });
    cmEditors.push(cm);
  });
}

function detectMode(code) {
  if (code.includes('<!DOCTYPE') || code.includes('<html') || code.includes('<body')) return 'htmlmixed';
  if (code.includes('{') && code.includes(':') && !code.includes('function')) return 'css';
  if (code.includes('function') || code.includes('=>') || code.includes('const ')) return 'javascript';
  return 'javascript';
}

window.switchEditorTab = function (i) {
  activeEditorTab = i;
  document.querySelectorAll('.code-panel').forEach((p, j) => p.classList.toggle('active', i === j));
  document.querySelectorAll('.editor-tab').forEach((t, j) => t.classList.toggle('active', i === j));
  if (cmEditors[i]) setTimeout(() => cmEditors[i].refresh(), 10);
};

window.runCode = function () {
  const frame = document.getElementById('preview-frame');
  if (!frame) return;

  // Pega código do CodeMirror ou fallback para textarea
  let code = cmEditors[0] ? cmEditors[0].getValue() : (document.getElementById('ec-0')?.value || '');
  if (!code.includes('<html') && !code.includes('<!DOCTYPE')) {
    code = `<!DOCTYPE html><html><head><style>
      body{font-family:system-ui,sans-serif;padding:1rem;font-size:14px;line-height:1.6}
    </style></head><body>${code}</body></html>`;
  }
  frame.srcdoc = code;
};

// ══════════════════════════════════════════════════════════════════════════
//  QUIZ
// ══════════════════════════════════════════════════════════════════════════
let quizState = { current:0, answers:[], done:false };

function renderQuizHTML(questions, chapterId) {
  if (!questions?.length) return '';
  return `
    <div class="quiz-wrap" id="quiz-wrap">
      <div class="quiz-header">
        <div class="quiz-title">📝 Quiz do capítulo</div>
        <div class="quiz-counter" id="quiz-counter">1 / ${questions.length}</div>
      </div>
      <div id="quiz-body"></div>
    </div>`;
}

function initQuiz(questions, chapterId) {
  quizState = { current:0, answers:[], done:false, questions, chapterId };
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const { questions, current } = quizState;
  if (!questions || current >= questions.length) return;
  const q = questions[current];

  document.getElementById('quiz-counter').textContent = `${current + 1} / ${questions.length}`;
  document.getElementById('quiz-body').innerHTML = `
    <div class="quiz-question">${escapeHtml(q.q)}</div>
    <div class="quiz-options">
      ${q.opts.map((opt, i) => `
        <label class="quiz-option" id="qopt-${i}" onclick="selectOption(${i})">
          <input type="radio" name="qopt" value="${i}"/>
          <span>${escapeHtml(opt)}</span>
        </label>`).join('')}
    </div>
    <div class="quiz-feedback" id="quiz-feedback"></div>
    <div class="quiz-nav">
      <button class="btn btn-primary btn-sm" onclick="confirmAnswer()">
        Confirmar →
      </button>
    </div>`;
}

window.selectOption = function (i) {
  document.querySelectorAll('.quiz-option').forEach((el, j) =>
    el.classList.toggle('selected', i === j)
  );
  document.querySelectorAll('input[name="qopt"]')[i].checked = true;
};

window.confirmAnswer = function () {
  const { questions, current } = quizState;
  const q       = questions[current];
  const checked = document.querySelector('input[name="qopt"]:checked');
  if (!checked) return;

  const selected = parseInt(checked.value);
  const correct  = selected === q.correct;

  quizState.answers.push({ selected, correct });

  // Visual feedback
  document.querySelectorAll('.quiz-option').forEach((el, i) => {
    if (i === q.correct) el.classList.add('correct');
    else if (i === selected && !correct) el.classList.add('wrong');
  });
  document.querySelectorAll('input[name="qopt"]').forEach(i => i.disabled = true);

  const fb = document.getElementById('quiz-feedback');
  fb.className = `quiz-feedback show ${correct ? 'correct' : 'wrong'}`;
  fb.innerHTML = correct
    ? `✅ Correto! ${escapeHtml(q.explanation)}`
    : `❌ Incorreto. ${escapeHtml(q.explanation)}`;

  const isLast = current === questions.length - 1;
  document.querySelector('.quiz-nav').innerHTML = `
    <button class="btn btn-primary btn-sm" onclick="${isLast ? 'finishQuiz()' : 'nextQuestion()'}">
      ${isLast ? 'Ver resultado →' : 'Próxima →'}
    </button>`;
};

window.nextQuestion = function () {
  quizState.current++;
  renderQuizQuestion();
};

window.finishQuiz = async function () {
  const { questions, answers, chapterId } = quizState;
  const score = answers.filter(a => a.correct).length;
  const pct   = Math.round((score / questions.length) * 100);
  const color = pct >= 70 ? 'var(--accent)' : pct >= 50 ? 'var(--warn)' : 'var(--error)';

  document.getElementById('quiz-body').innerHTML = `
    <div class="quiz-result">
      <div class="quiz-score" style="color:${color}">${pct}%</div>
      <div class="quiz-result-label">
        ${score} de ${questions.length} corretas
        ${pct >= 70 ? '🎉 Ótimo desempenho!' : pct >= 50 ? '👍 Bom, mas pode melhorar!' : '📚 Revise o conteúdo e tente novamente.'}
      </div>
      ${pct < 70 ? `<button class="btn btn-secondary btn-sm" onclick="retryQuiz()">↩ Tentar novamente</button>` : ''}
    </div>`;

  // Salva quiz no Firestore diretamente
  try {
    const { doc: fsDoc, setDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
    const ref = fsDoc(db, 'progress', currentUser.uid);
    await setDoc(ref, {
      [currentModule]: { quizScores: { [chapterId]: { score, total: questions.length } } }
    }, { merge: true });
  } catch(e) { /* offline */ }
  apiFetch('/progress/quiz', { method:'POST', body: JSON.stringify({ moduleId: currentModule, quizId: chapterId+'-quiz', score, total: questions.length }) }).catch(() => {});
};

window.retryQuiz = function () {
  quizState.current = 0; quizState.answers = [];
  renderQuizQuestion();
};

// ══════════════════════════════════════════════════════════════════════════
//  CHALLENGE
// ══════════════════════════════════════════════════════════════════════════
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderChallengeHTML(challenge, chapterId, isDone) {
  if (!challenge) return '';
  const taskIds = challenge.tasks.map((_, i) => `task-${chapterId}-${i}`);
  return `
    <div class="challenge-box">
      <div class="challenge-label">🏆 Desafio do capítulo</div>
      <h3>${escapeHtml(challenge.title)}</h3>
      <p>${escapeHtml(challenge.desc)}</p>
      <ul class="challenge-tasks">
        ${challenge.tasks.map((t, i) => `
          <li class="challenge-task">
            <div class="task-checkbox" id="${taskIds[i]}"
                 onclick="toggleTask('${taskIds[i]}','${chapterId}')"></div>
            <span>${escapeHtml(t)}</span>
          </li>`).join('')}
      </ul>
      <button class="btn-complete" id="btn-complete-${chapterId}"
              onclick="completeChapter('${currentModule}','${chapterId}')"
              ${isDone ? '' : 'disabled'}>
        ${isDone ? '✅ Concluído!' : 'Marcar como concluído'}
      </button>
    </div>`;
}

window.toggleTask = function (taskId, chapterId) {
  const el = document.getElementById(taskId);
  el.classList.toggle('checked');
  el.textContent = el.classList.contains('checked') ? '✓' : '';

  const key  = 'tasks-' + chapterId;
  const prev = JSON.parse(localStorage.getItem(key) || '[]');
  const next = el.classList.contains('checked')
    ? [...new Set([...prev, taskId])]
    : prev.filter(id => id !== taskId);
  localStorage.setItem(key, JSON.stringify(next));

  // Verifica se todas as tasks estão marcadas
  // Usar checkboxes visíveis para verificar se todos estão marcados
  const allCheckboxes = document.querySelectorAll(`[id^="task-${chapterId}-"]`);
  const allDone = allCheckboxes.length > 0 && [...allCheckboxes].every(el => el.classList.contains('checked'));
  const btn = document.getElementById('btn-complete-' + chapterId);
  if (btn) btn.disabled = !allDone;
};

function restoreTasks(chapterId) {
  const saved = JSON.parse(localStorage.getItem('tasks-' + chapterId) || '[]');
  saved.forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.classList.add('checked'); el.textContent = '✓'; }
  });
  const allCheckboxes = document.querySelectorAll(`[id^="task-${chapterId}-"]`);
  const allDone = allCheckboxes.length > 0 && [...allCheckboxes].every(el => el.classList.contains('checked'));
  const btn = document.getElementById('btn-complete-' + chapterId);
  if (btn && allDone) btn.disabled = false;
}

window.completeChapter = async function (modId, chapterId) {
  // Salva no Firestore diretamente
  try {
    const { doc: fsDoc, setDoc, getDoc: fsGet, updateDoc, arrayUnion } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
    const ref = fsDoc(db, 'progress', currentUser.uid);
    await setDoc(ref, {
      [modId]: { chaptersCompleted: arrayUnion(chapterId) }
    }, { merge: true });
  } catch(e) { /* Firestore offline */ }
  // Tenta backend em segundo plano
  apiFetch('/progress/chapter', { method:'POST', body: JSON.stringify({ moduleId: modId, chapterId }) }).catch(() => {});

  // Atualiza estado local
  if (!userProgress[modId]) userProgress[modId] = { chaptersCompleted:[], quizScores:{} };
  if (!userProgress[modId].chaptersCompleted.includes(chapterId)) {
    userProgress[modId].chaptersCompleted.push(chapterId);
  }

  // Atualiza UI
  updateNavbarProgress();
  renderSidebar();
  renderDashboard();

  const btn = document.getElementById('btn-complete-' + chapterId);
  if (btn) { btn.textContent = '✅ Concluído!'; btn.disabled = true; }

  // Atualiza check na sidebar
  const sbBtn = document.getElementById('sbch-' + chapterId);
  if (sbBtn) sbBtn.classList.add('done');
  const check = sbBtn?.querySelector('.chapter-check');
  if (check) { check.classList.add('done'); check.textContent = '✓'; }
};

// ══════════════════════════════════════════════════════════════════════════
//  INICIALIZAR QUIZ APÓS RENDER DO CAPÍTULO
//  (chamado via MutationObserver, pois o quiz-wrap é injetado dinamicamente)
// ══════════════════════════════════════════════════════════════════════════
// Quiz é inicializado diretamente após renderChapter — sem MutationObserver
// (MutationObserver removido pois causava race condition com lazy loading)

// ══════════════════════════════════════════════════════════════════════════
//  SIDEBAR TOGGLE
// ══════════════════════════════════════════════════════════════════════════
let sidebarOpen = true;

window.toggleSidebar = function () {
  sidebarOpen = !sidebarOpen;
  const sidebar = document.getElementById('app-sidebar');
  const main    = document.querySelector('.app-main');
  const btn     = document.getElementById('sidebar-toggle-btn');

  sidebar.classList.toggle('collapsed', !sidebarOpen);
  btn.classList.toggle('collapsed', !sidebarOpen);
  main.style.marginLeft = sidebarOpen ? '290px' : '0';

  localStorage.setItem('ds_sidebar_open', sidebarOpen ? '1' : '0');
};

// Restaurar estado salvo
(function restoreSidebarState() {
  const saved = localStorage.getItem('ds_sidebar_open');
  if (saved === '0') {
    setTimeout(() => {
      sidebarOpen = true; // forçar toggle
      toggleSidebar();
    }, 100);
  }
})();

// ══════════════════════════════════════════════════════════════════════════
//  MARCADOR DE TEXTO (HIGHLIGHTER)
// ══════════════════════════════════════════════════════════════════════════
let highlighterActive = false;
let currentHighlightColor = 'yellow';
let highlighterMenuOpen = false;

window.toggleHighlighter = function () {
  highlighterMenuOpen = !highlighterMenuOpen;
  const colors = document.getElementById('highlighter-colors');
  const fab    = document.getElementById('highlighter-fab');
  colors.classList.toggle('open', highlighterMenuOpen);

  if (!highlighterMenuOpen && highlighterActive) {
    // Fechar menu mas manter ativo
  }
};

window.selectColor = function (color) {
  if (color === 'erase') {
    highlighterActive = true;
    currentHighlightColor = 'erase';
    document.body.classList.add('highlighter-active');
    document.getElementById('highlighter-fab').classList.add('active');
    document.getElementById('highlighter-colors').classList.remove('open');
    highlighterMenuOpen = false;
    document.querySelectorAll('.color-option').forEach(o => o.classList.remove('selected'));
    return;
  }

  currentHighlightColor = color;
  highlighterActive = true;
  document.body.classList.add('highlighter-active');
  document.getElementById('highlighter-fab').classList.add('active');
  document.getElementById('highlighter-colors').classList.remove('open');
  highlighterMenuOpen = false;

  document.querySelectorAll('.color-option').forEach(o => {
    o.classList.toggle('selected', o.dataset.color === color);
  });
};

// Aplicar marcação ao soltar seleção
document.addEventListener('mouseup', (e) => {
  if (!highlighterActive) return;
  if (e.target.closest('.highlighter-toolbar')) return;

  const selection = window.getSelection();
  if (!selection || selection.isCollapsed) return;

  const range = selection.getRangeAt(0);
  if (!range || range.collapsed) return;

  // Verifica se está dentro de conteúdo legível
  const container = range.commonAncestorContainer;
  const contentArea = document.querySelector('.chapter-view') || document.querySelector('.app-main');
  if (!contentArea || !contentArea.contains(container)) return;

  if (currentHighlightColor === 'erase') {
    // Remover highlights dentro da seleção
    const highlights = contentArea.querySelectorAll('.text-highlight');
    highlights.forEach(h => {
      if (selection.containsNode(h, true)) {
        const parent = h.parentNode;
        while (h.firstChild) parent.insertBefore(h.firstChild, h);
        parent.removeChild(h);
        parent.normalize();
      }
    });
    selection.removeAllRanges();
    saveHighlights();
    return;
  }

  try {
    const mark = document.createElement('mark');
    mark.className = 'text-highlight';
    mark.dataset.color = currentHighlightColor;
    mark.title = 'Clique duplo para remover';
    range.surroundContents(mark);
    selection.removeAllRanges();
    saveHighlights();
  } catch(e) {
    // Seleção atravessa múltiplos elementos — ignora
    selection.removeAllRanges();
  }
});

// Duplo clique para remover highlight
document.addEventListener('dblclick', (e) => {
  if (e.target.classList.contains('text-highlight')) {
    const parent = e.target.parentNode;
    while (e.target.firstChild) parent.insertBefore(e.target.firstChild, e.target);
    parent.removeChild(e.target);
    parent.normalize();
    saveHighlights();
  }
});

// Salvar e restaurar highlights no localStorage
function saveHighlights() {
  const key = 'ds_highlights_' + (currentChapter || 'global');
  const marks = [];
  document.querySelectorAll('.text-highlight').forEach(m => {
    marks.push({ color: m.dataset.color, text: m.textContent });
  });
  localStorage.setItem(key, JSON.stringify(marks));
}

// Desativar marcador ao clicar fora do menu
function stopHighlighter() {
  highlighterActive = false;
  currentHighlightColor = 'yellow';
  document.body.classList.remove('highlighter-active');
  document.getElementById('highlighter-fab').classList.remove('active');
  document.getElementById('highlighter-colors').classList.remove('open');
  highlighterMenuOpen = false;
  // Restaurar seleção da cor amarela
  document.querySelectorAll('.color-option').forEach(o => {
    o.classList.toggle('selected', o.dataset.color === 'yellow');
  });
}
window.stopHighlighter = stopHighlighter;

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') stopHighlighter();
});