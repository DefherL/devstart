/* ============================================================
   DevStart — assets/js/admin.js
   Lógica completa do painel administrativo (admin.html)
   ============================================================ */

import { auth, API_URL }                          from './firebase.js';
import { onAuthStateChanged, signOut }            from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getFirestore, doc, getDoc }              from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const API = API_URL;
const db  = getFirestore();
let token    = null;
let dashData = null;

// ── Auth Guard — verifica role direto no Firestore ──────────────────────────
onAuthStateChanged(auth, async (user) => {
  if (!user) { window.location.href = 'index.html'; return; }
  token = await user.getIdToken();

  // Verificar role direto no Firestore (sem depender do backend)
  const userDoc = await getDoc(doc(db, 'users', user.uid)).catch(() => null);
  const userData = userDoc?.data();

  if (!userData || userData.role !== 'admin') {
    window.location.href = 'app.html';
    return;
  }

  document.getElementById('sidebar-username').textContent = userData.displayName || userData.username || user.email;
  loadDashboard();
});

// ── Navegação de views ─────────────────────────────────────────────────────
window.showView = function (v) {
  document.querySelectorAll('.admin-view').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  document.getElementById('view-' + v).classList.add('active');
  document.getElementById('nav-' + v).classList.add('active');

  if (v === 'quizzes') loadQuizAnalysis();
  if (v === 'invites') loadInvites();
};

// ── Dashboard ──────────────────────────────────────────────────────────────
async function loadDashboard() {
  try {
    const r = await fetch(`${API}/admin/dashboard`, {
      headers: { Authorization: 'Bearer ' + token }
    });
    dashData = await r.json();
    renderOverview(dashData);
    renderStudents(dashData.students);
    renderStuck(dashData.students);
  } catch (err) {
    console.error('[Admin] Erro ao carregar dashboard:', err);
  }
}

// ── Overview ───────────────────────────────────────────────────────────────
function renderOverview({ stats, students }) {
  setValue('s-total',    stats.totalStudents);
  setValue('s-active',   stats.active);
  setValue('s-stuck',    stats.stuck);
  setValue('s-abandoned',stats.abandoned);
  setValue('s-avgprog',  stats.avgProgress + '%');
  setValue('s-avgquiz',  stats.avgQuiz !== null ? stats.avgQuiz + '%' : '—');

  // Popularidade dos módulos
  document.getElementById('module-popularity').innerHTML =
    stats.modulePopularity.map((m, i) => `
      <div style="background:var(--bg3);border:1px solid var(--border);border-radius:10px;
                  padding:.75rem 1.25rem;display:flex;align-items:center;gap:.75rem;">
        <span style="font-family:var(--font-display);font-weight:800;font-size:1.1rem;color:var(--accent)">#${i + 1}</span>
        <div>
          <div style="font-size:.875rem;font-weight:600">${m.title}</div>
          <div style="font-size:.75rem;color:var(--text2)">${m.count} aluno(s)</div>
        </div>
      </div>`).join('');

  // Ranking top 10
  document.getElementById('ranking-body').innerHTML =
    students.slice(0, 10).map((s, i) => `
      <tr class="row-click" onclick="openStudent('${s.uid}')">
        <td><span class="mono text-muted">${i + 1}</span></td>
        <td>
          <div class="font-bold">${s.username}</div>
          <div class="text-xs text-muted">${s.email}</div>
        </td>
        <td><span class="tag">${s.course || '—'}</span></td>
        <td>
          <div class="flex items-center gap-3">
            <div class="mini-bar"><div class="mini-fill" style="width:${s.overallProgress}%"></div></div>
            <span class="mono text-xs">${s.overallProgress}%</span>
          </div>
        </td>
        <td><span class="mono text-sm" style="color:${quizColor(s.quizAverage)}">${s.quizAverage !== null ? s.quizAverage + '%' : '—'}</span></td>
        <td>${statusBadge(s.status)}</td>
      </tr>`).join('');
}

// ── Tabela de Alunos ───────────────────────────────────────────────────────
function renderStudents(students) {
  window._students = students;
  renderStudentsTable(students);
}

function renderStudentsTable(students) {
  document.getElementById('students-body').innerHTML =
    students.map(s => `
      <tr class="row-click" onclick="openStudent('${s.uid}')">
        <td>
          <div class="font-bold">${s.username}</div>
          <div class="text-xs text-muted">${s.email}</div>
        </td>
        <td><span class="tag">${s.course || '—'}</span></td>
        <td>
          <div class="flex items-center gap-3">
            <div class="mini-bar"><div class="mini-fill" style="width:${s.overallProgress}%"></div></div>
            <span class="mono text-xs">${s.overallProgress}%</span>
          </div>
        </td>
        <td><span class="text-sm text-muted">${formatDate(s.lastActive)}</span></td>
        <td><span class="mono text-sm" style="color:${quizColor(s.quizAverage)}">${s.quizAverage !== null ? s.quizAverage + '%' : '—'}</span></td>
        <td>${statusBadge(s.status)}</td>
      </tr>`).join('');
}

window.filterStudents = function (q) {
  if (!window._students) return;
  const q2 = q.toLowerCase();
  renderStudentsTable(window._students.filter(s =>
    s.username.toLowerCase().includes(q2) || s.email.toLowerCase().includes(q2)
  ));
};

// ── Travados ───────────────────────────────────────────────────────────────
function renderStuck(students) {
  const stuck = students.filter(s => ['stuck','inactive','abandoned'].includes(s.status));
  document.getElementById('stuck-count').textContent = `${stuck.length} aluno(s)`;
  document.getElementById('stuck-body').innerHTML =
    stuck.length === 0
      ? '<tr><td colspan="5" style="text-align:center;padding:2rem;color:var(--text3)">✅ Nenhum aluno travado!</td></tr>'
      : stuck.map(s => {
          const mod = s.stuckModules?.[0] ||
            Object.values(s.moduleBreakdown || {}).find(m => m.completed > 0 && m.percentage < 100);
          return `
            <tr class="row-click" onclick="openStudent('${s.uid}')">
              <td><div class="font-bold">${s.username}</div><div class="text-xs text-muted">${s.email}</div></td>
              <td><div class="text-sm">${mod?.title || '—'}</div></td>
              <td>${mod ? `<div class="flex items-center gap-2">
                <div class="mini-bar"><div class="mini-fill" style="width:${mod.percentage}%;background:var(--warn)"></div></div>
                <span class="mono text-xs">${mod.percentage}%</span></div>` : '—'}</td>
              <td><span class="mono" style="color:${s.daysSinceActive >= 14 ? 'var(--error)' : 'var(--warn)'}">${s.daysSinceActive}d</span></td>
              <td>${statusBadge(s.status)}</td>
            </tr>`;
        }).join('');
}

// ── Modal do Aluno ─────────────────────────────────────────────────────────
window.openStudent = async function (uid) {
  const overlay = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  content.innerHTML = '<div class="text-center text-muted" style="padding:2rem">Carregando...</div>';
  overlay.classList.add('open');

  try {
    const r = await fetch(`${API}/admin/student/${uid}`, {
      headers: { Authorization: 'Bearer ' + token }
    });
    const { user, progress, weeklyVelocity } = await r.json();

    const MODS   = { logica:'Lógica', html:'HTML', css:'CSS', js:'JavaScript', ai:'IA com Claude' };
    const TOTALS = { logica:12, html:10, css:12, js:14, ai:8 };
    const COLORS = { logica:'#9b59b6', html:'#e44d26', css:'#264de4', js:'#f7df1e', ai:'#00e5a0' };

    content.innerHTML = `
      <div class="modal-header">
        <div>
          <div style="font-size:1.4rem;font-weight:800;font-family:var(--font-display)">${user.displayName}</div>
          <div class="text-muted text-sm">${user.email} · <span class="tag">${user.course}</span></div>
        </div>
        <button class="modal-close" onclick="closeModal()">✕</button>
      </div>

      <div class="flex gap-4" style="flex-wrap:wrap;margin-bottom:1.5rem;">
        ${metaInfo('Velocidade', `${weeklyVelocity} cap/sem`, 'var(--accent)')}
        ${metaInfo('Último acesso', formatDate(user.lastActiveAt))}
        ${metaInfo('Membro desde', formatDate(user.createdAt))}
        ${metaInfo('Progresso geral', user.overallProgress !== undefined ? user.overallProgress + '%' : '—', 'var(--accent)')}
      </div>

      <div class="text-xs text-muted font-bold" style="text-transform:uppercase;letter-spacing:.06em;margin-bottom:.75rem">Progresso por módulo</div>
      <div class="mod-grid">
        ${Object.entries(MODS).map(([id, title]) => {
          const mp     = progress[id] || {};
          const done   = (mp.chaptersCompleted || []).length;
          const total  = TOTALS[id] || 0;
          const pct    = Math.round((done / total) * 100);
          const scores = mp.quizScores || {};
          const qVals  = Object.values(scores);
          const qAvg   = qVals.length ? Math.round(qVals.reduce((s, q) => s + q.percentage, 0) / qVals.length) : null;
          const isStuck = done > 0 && pct < 100;
          return `
            <div class="mod-card">
              <div class="mod-card-title">${title}</div>
              <div class="mod-card-pct" style="color:${COLORS[id]}">${pct}%</div>
              <div class="mod-card-bar"><div class="mod-card-fill" style="width:${pct}%;background:${COLORS[id]}"></div></div>
              <div class="text-xs text-muted">${done}/${total} capítulos</div>
              ${qAvg !== null ? `<div class="text-xs text-muted mt-1">Quiz: <span style="color:${quizColor(qAvg)}">${qAvg}%</span></div>` : ''}
              ${isStuck ? '<div class="mod-stuck-alert">⚠️ Em andamento — verificar dificuldade</div>' : ''}
            </div>`;
        }).join('')}
      </div>`;
  } catch {
    content.innerHTML = '<div style="color:var(--error);padding:1rem">Erro ao carregar dados do aluno.</div>';
  }
};

window.closeModal = function () {
  document.getElementById('modal-overlay').classList.remove('open');
};

window.closeModalOnOverlay = function (e) {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
};

// ── Quiz Analysis ──────────────────────────────────────────────────────────
async function loadQuizAnalysis() {
  try {
    const r    = await fetch(`${API}/admin/quiz-analysis`, { headers: { Authorization: 'Bearer ' + token } });
    const data = await r.json();
    const el   = document.getElementById('quiz-analysis-list');

    if (!data.length) {
      el.innerHTML = '<div class="text-center text-muted" style="padding:2rem">Nenhum dado de quiz ainda.</div>';
      return;
    }

    el.innerHTML = data.map(q => {
      const c = quizColor(q.avgPercentage);
      return `
        <div class="quiz-row">
          <div class="quiz-pct" style="color:${c}">${q.avgPercentage}%</div>
          <div style="flex:1">
            <div class="text-sm font-bold">${q.moduleId.toUpperCase()} — Quiz ${q.quizId}</div>
            <div class="text-xs text-muted">${q.attempts} tentativa(s)</div>
          </div>
          <div class="mini-bar" style="width:160px"><div class="mini-fill" style="width:${q.avgPercentage}%;background:${c}"></div></div>
        </div>`;
    }).join('');
  } catch {}
}

// ── Convites ───────────────────────────────────────────────────────────────
async function loadInvites() {
  try {
    const r     = await fetch(`${API}/auth/invites`, { headers: { Authorization: 'Bearer ' + token } });
    const codes = await r.json();
    const el    = document.getElementById('all-codes');

    el.innerHTML = codes.length === 0
      ? '<div class="text-muted text-sm">Nenhum código gerado ainda.</div>'
      : codes.map(c => {
          const exp       = c.expiresAt?._seconds ? new Date(c.expiresAt._seconds * 1000) : null;
          const isExpired = exp && exp < new Date();
          const daysLeft  = exp ? Math.ceil((exp - new Date()) / 86400000) : null;
          return `
            <div class="code-chip ${c.used ? 'used' : isExpired ? 'expired' : ''}"
                 onclick="${!c.used && !isExpired ? `copyCode('${c.code}')` : ''}"
                 title="${c.used ? 'Usado' : isExpired ? 'Expirado' : 'Clique para copiar'}">
              <span>${c.code}</span>
              ${c.used       ? '<span class="text-xs text-muted">✓ usado</span>'          : ''}
              ${isExpired    ? '<span class="text-xs" style="color:var(--error)">expirou</span>' : ''}
              ${!c.used && !isExpired && daysLeft !== null ? `<span class="text-xs text-muted">${daysLeft}d</span>` : ''}
            </div>`;
        }).join('');
  } catch {}
}

window.generateInvites = async function () {
  const qty  = parseInt(document.getElementById('invite-qty').value)  || 5;
  const days = parseInt(document.getElementById('invite-days').value) || 7;
  try {
    const r      = await fetch(`${API}/auth/invites`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
      body: JSON.stringify({ quantity: qty, expiresInDays: days }),
    });
    const { codes } = await r.json();
    document.getElementById('new-codes').innerHTML =
      codes.map(c => `
        <div class="code-chip" onclick="copyCode('${c.code}')" style="border-color:var(--accent)">
          <span style="color:var(--accent)">${c.code}</span>
          <span class="text-xs text-muted">${days}d</span>
        </div>`).join('');
    loadInvites();
  } catch {}
};

window.copyCode = function (code) {
  navigator.clipboard.writeText(code).then(() => alert(`✅ Código ${code} copiado!`));
};

// ── Logout ─────────────────────────────────────────────────────────────────
window.doLogout = async function () {
  await signOut(auth);
  window.location.href = 'index.html';
};

// ── Helpers ────────────────────────────────────────────────────────────────
function setValue(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

function quizColor(pct) {
  if (pct === null || pct === undefined) return 'var(--text2)';
  return pct >= 70 ? 'var(--accent)' : pct >= 50 ? 'var(--warn)' : 'var(--error)';
}

function statusBadge(status) {
  const map = {
    active:    ['badge-active',    '✅ Ativo'],
    stuck:     ['badge-stuck',     '⚠️ Travado'],
    inactive:  ['badge-inactive',  '💤 Inativo'],
    abandoned: ['badge-abandoned', '❌ Abandonou'],
    completed: ['badge-completed', '🏆 Concluído'],
  };
  const [cls, label] = map[status] || ['badge-inactive', '—'];
  return `<span class="badge ${cls}">${label}</span>`;
}

function formatDate(iso) {
  if (!iso) return '—';
  const isoStr = typeof iso === 'object' && iso._seconds
    ? new Date(iso._seconds * 1000).toISOString()
    : iso;
  const d    = new Date(isoStr);
  const diff = Math.floor((Date.now() - d) / 86400000);
  if (diff === 0) return 'Hoje';
  if (diff === 1) return 'Ontem';
  if (diff < 7)  return `${diff} dias atrás`;
  return d.toLocaleDateString('pt-BR');
}

function metaInfo(label, value, color = 'var(--text)') {
  return `
    <div>
      <div class="text-xs text-muted" style="text-transform:uppercase;letter-spacing:.08em;margin-bottom:.2rem">${label}</div>
      <div style="font-family:var(--font-code);font-size:1rem;font-weight:700;color:${color}">${value}</div>
    </div>`;
}