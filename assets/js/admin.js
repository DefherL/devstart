/* ============================================================
   DevStart — assets/js/admin.js
   Dados direto do Firestore — sem backend
   ============================================================ */

import { auth }                                   from './firebase.js';
import { onAuthStateChanged, signOut }            from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getFirestore, doc, getDoc,
         collection, getDocs, setDoc,
         serverTimestamp }                        from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const db = getFirestore();

const MODS   = { logica:'Lógica de Prog.', html:'HTML', css:'CSS', js:'JavaScript', ai:'IA com Claude' };
const TOTALS = { logica:12, html:10, css:12, js:14, ai:8 };
const COLORS = { logica:'#9b59b6', html:'#e44d26', css:'#264de4', js:'#f7df1e', ai:'#00e5a0' };

let allStudents = [];

// ── Auth Guard ─────────────────────────────────────────────────────────────
onAuthStateChanged(auth, async (user) => {
  if (!user) { window.location.href = 'login.html'; return; }

  const userDoc  = await getDoc(doc(db, 'users', user.uid)).catch(() => null);
  const userData = userDoc?.data();
  if (!userData || userData.role !== 'admin') { window.location.href = 'app.html'; return; }

  document.getElementById('sidebar-username').textContent = userData.username || user.email;
  loadDashboard();
});

// ── Navegação ──────────────────────────────────────────────────────────────
window.showView = function (v) {
  document.querySelectorAll('.admin-view').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  document.getElementById('view-' + v)?.classList.add('active');
  document.getElementById('nav-' + v)?.classList.add('active');
  if (v === 'quizzes') renderQuizView();
  if (v === 'invites') loadInvites();
};

// ── Carregar todos os alunos do Firestore ──────────────────────────────────
async function loadDashboard() {
  try {
    const usersSnap    = await getDocs(collection(db, 'users'));
    const progressSnap = await getDocs(collection(db, 'progress'));

    const progressMap = {};
    progressSnap.forEach(d => { progressMap[d.id] = d.data(); });

    allStudents = [];
    usersSnap.forEach(d => {
      const u = d.data();
      if (u.role === 'admin') return;
      const prog = progressMap[d.id] || {};
      const student = buildStudent(d.id, u, prog);
      allStudents.push(student);
    });

    renderOverview(allStudents);
    renderStudentsTable(allStudents);
    renderStuck(allStudents);
  } catch (err) {
    console.error('[Admin] Erro ao carregar:', err);
  }
}

function buildStudent(uid, u, prog) {
  let totalDone = 0, totalChaps = 0, quizScores = [], modBreakdown = {};

  Object.entries(TOTALS).forEach(([id, total]) => {
    const mp   = prog[id] || {};
    const done = (mp.chaptersCompleted || []).length;
    totalDone  += done;
    totalChaps += total;
    const scores = mp.quizScores || {};
    Object.values(scores).forEach(s => {
      const pct = s.total ? Math.round((s.score / s.total) * 100) : 0;
      quizScores.push(pct);
    });
    modBreakdown[id] = { title: MODS[id], done, total, percentage: Math.round((done/total)*100) };
  });

  const overallProgress = totalChaps ? Math.round((totalDone / totalChaps) * 100) : 0;
  const quizAverage     = quizScores.length ? Math.round(quizScores.reduce((a,b)=>a+b,0)/quizScores.length) : null;

  const lastActive = u.lastActiveAt || u.createdAt || null;
  const daysSince  = lastActive?._seconds
    ? Math.floor((Date.now() - lastActive._seconds*1000) / 86400000)
    : 999;

  let status = 'active';
  if (overallProgress === 100) status = 'completed';
  else if (daysSince >= 30)    status = 'abandoned';
  else if (daysSince >= 7)     status = 'stuck';
  else if (daysSince >= 3)     status = 'inactive';

  return { uid, username: u.username||u.displayName||'—', email: u.email||'—',
           course: u.curso||u.course||'—', overallProgress, quizAverage,
           status, daysSinceActive: daysSince, lastActive, modBreakdown };
}

// ── Overview ───────────────────────────────────────────────────────────────
function renderOverview(students) {
  const total     = students.length;
  const active    = students.filter(s => s.status === 'active').length;
  const stuck     = students.filter(s => s.status === 'stuck').length;
  const abandoned = students.filter(s => ['abandoned','inactive'].includes(s.status)).length;
  const avgProg   = total ? Math.round(students.reduce((s,u)=>s+u.overallProgress,0)/total) : 0;
  const withQuiz  = students.filter(s => s.quizAverage !== null);
  const avgQuiz   = withQuiz.length ? Math.round(withQuiz.reduce((s,u)=>s+u.quizAverage,0)/withQuiz.length) : null;

  setValue('s-total',    total);
  setValue('s-active',   active);
  setValue('s-stuck',    stuck);
  setValue('s-abandoned',abandoned);
  setValue('s-avgprog',  avgProg + '%');
  setValue('s-avgquiz',  avgQuiz !== null ? avgQuiz + '%' : '—');

  // Módulos mais acessados
  const modCount = {};
  Object.keys(MODS).forEach(id => { modCount[id] = 0; });
  students.forEach(s => {
    Object.entries(s.modBreakdown||{}).forEach(([id, m]) => {
      if (m.done > 0) modCount[id]++;
    });
  });
  const sorted = Object.entries(modCount).sort((a,b) => b[1]-a[1]);
  document.getElementById('module-popularity').innerHTML = sorted.map(([id, count], i) => `
    <div style="background:var(--bg3);border:1px solid var(--border);border-radius:10px;
                padding:.75rem 1.25rem;display:flex;align-items:center;gap:.75rem;">
      <span style="font-family:var(--font-display);font-weight:800;font-size:1.1rem;color:${COLORS[id]}">#${i+1}</span>
      <div>
        <div style="font-size:.875rem;font-weight:600">${MODS[id]}</div>
        <div style="font-size:.75rem;color:var(--text2)">${count} aluno(s)</div>
      </div>
    </div>`).join('');

  // Ranking
  const sorted2 = [...students].sort((a,b) => b.overallProgress - a.overallProgress);
  document.getElementById('ranking-body').innerHTML = sorted2.slice(0,10).map((s,i) => `
    <tr class="row-click" onclick="openStudent('${s.uid}')">
      <td><span class="mono text-muted">${i+1}</span></td>
      <td><div class="font-bold">${s.username}</div><div class="text-xs text-muted">${s.email}</div></td>
      <td><span class="tag">${s.course}</span></td>
      <td>
        <div class="flex items-center gap-3">
          <div class="mini-bar"><div class="mini-fill" style="width:${s.overallProgress}%"></div></div>
          <span class="mono text-xs">${s.overallProgress}%</span>
        </div>
      </td>
      <td><span class="mono text-sm" style="color:${quizColor(s.quizAverage)}">${s.quizAverage !== null ? s.quizAverage+'%' : '—'}</span></td>
      <td>${statusBadge(s.status)}</td>
    </tr>`).join('');
}

// ── Tabela Alunos ──────────────────────────────────────────────────────────
function renderStudentsTable(students) {
  document.getElementById('students-body').innerHTML = students.length === 0
    ? '<tr><td colspan="6" style="text-align:center;padding:2rem;color:var(--text3)">Nenhum aluno cadastrado ainda.</td></tr>'
    : students.map(s => `
      <tr class="row-click" onclick="openStudent('${s.uid}')">
        <td><div class="font-bold">${s.username}</div><div class="text-xs text-muted">${s.email}</div></td>
        <td><span class="tag">${s.course}</span></td>
        <td>
          <div class="flex items-center gap-3">
            <div class="mini-bar"><div class="mini-fill" style="width:${s.overallProgress}%"></div></div>
            <span class="mono text-xs">${s.overallProgress}%</span>
          </div>
        </td>
        <td><span class="text-sm text-muted">${formatDate(s.lastActive)}</span></td>
        <td><span class="mono text-sm" style="color:${quizColor(s.quizAverage)}">${s.quizAverage !== null ? s.quizAverage+'%' : '—'}</span></td>
        <td>${statusBadge(s.status)}</td>
      </tr>`).join('');
}

window.filterStudents = function (q) {
  const q2 = q.toLowerCase();
  renderStudentsTable(allStudents.filter(s =>
    s.username.toLowerCase().includes(q2) || s.email.toLowerCase().includes(q2)
  ));
};

// ── Travados ───────────────────────────────────────────────────────────────
function renderStuck(students) {
  const stuck = students.filter(s => ['stuck','inactive','abandoned'].includes(s.status));
  setValue('stuck-count', `${stuck.length} aluno(s)`);
  document.getElementById('stuck-body').innerHTML = stuck.length === 0
    ? '<tr><td colspan="5" style="text-align:center;padding:2rem;color:var(--text3)">✅ Nenhum aluno travado!</td></tr>'
    : stuck.map(s => {
        const mod = Object.values(s.modBreakdown||{}).find(m => m.done > 0 && m.percentage < 100);
        return `
          <tr class="row-click" onclick="openStudent('${s.uid}')">
            <td><div class="font-bold">${s.username}</div><div class="text-xs text-muted">${s.email}</div></td>
            <td>${mod?.title || '—'}</td>
            <td>${mod ? `<div class="flex items-center gap-2">
              <div class="mini-bar"><div class="mini-fill" style="width:${mod.percentage}%;background:var(--warn)"></div></div>
              <span class="mono text-xs">${mod.percentage}%</span></div>` : '—'}</td>
            <td><span class="mono" style="color:${s.daysSinceActive >= 14 ? 'var(--error)' : 'var(--warn)'}">${s.daysSinceActive}d</span></td>
            <td>${statusBadge(s.status)}</td>
          </tr>`;
      }).join('');
}

// ── Modal Aluno ────────────────────────────────────────────────────────────
window.openStudent = async function (uid) {
  const overlay = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  content.innerHTML = '<div class="text-center text-muted" style="padding:2rem">⏳ Carregando...</div>';
  overlay.classList.add('open');

  const s = allStudents.find(s => s.uid === uid);
  if (!s) { content.innerHTML = '<div style="color:var(--error);padding:1rem">Aluno não encontrado.</div>'; return; }

  content.innerHTML = `
    <div class="modal-header">
      <div>
        <div style="font-size:1.4rem;font-weight:800;font-family:var(--font-display)">${s.username}</div>
        <div class="text-muted text-sm">${s.email} · <span class="tag">${s.course}</span></div>
      </div>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div class="flex gap-4" style="flex-wrap:wrap;margin-bottom:1.5rem;">
      ${metaInfo('Progresso geral', s.overallProgress + '%', 'var(--accent)')}
      ${metaInfo('Quiz médio', s.quizAverage !== null ? s.quizAverage + '%' : '—', quizColor(s.quizAverage))}
      ${metaInfo('Último acesso', formatDate(s.lastActive))}
      ${metaInfo('Status', s.status)}
    </div>
    <div class="text-xs text-muted font-bold" style="text-transform:uppercase;letter-spacing:.06em;margin-bottom:.75rem">Progresso por módulo</div>
    <div class="mod-grid">
      ${Object.entries(s.modBreakdown||{}).map(([id, m]) => `
        <div class="mod-card">
          <div class="mod-card-title">${m.title}</div>
          <div class="mod-card-pct" style="color:${COLORS[id]}">${m.percentage}%</div>
          <div class="mod-card-bar"><div class="mod-card-fill" style="width:${m.percentage}%;background:${COLORS[id]}"></div></div>
          <div class="text-xs text-muted">${m.done}/${m.total} capítulos</div>
        </div>`).join('')}
    </div>`;
};

window.closeModal = function () { document.getElementById('modal-overlay').classList.remove('open'); };
window.closeModalOnOverlay = function (e) { if (e.target === document.getElementById('modal-overlay')) closeModal(); };

// ── Quiz Analysis ──────────────────────────────────────────────────────────
function renderQuizView() {
  const el = document.getElementById('quiz-analysis-list');
  const quizMap = {};

  allStudents.forEach(s => {
    Object.entries(s.modBreakdown||{}).forEach(([modId]) => {
      // Simplificado: mostra progresso de quiz por módulo
    });
  });

  if (!allStudents.length) {
    el.innerHTML = '<div class="text-center text-muted" style="padding:2rem">Nenhum dado de quiz ainda.</div>';
    return;
  }

  const modStats = Object.keys(MODS).map(id => {
    const scores = [];
    allStudents.forEach(s => {
      // quiz average per module não está no buildStudent, mostra overall
      if (s.quizAverage !== null) scores.push(s.quizAverage);
    });
    const avg = scores.length ? Math.round(scores.reduce((a,b)=>a+b,0)/scores.length) : null;
    return { id, title: MODS[id], avg, attempts: allStudents.filter(s => (s.modBreakdown[id]?.done||0) > 0).length };
  });

  el.innerHTML = modStats.map(q => {
    const c = quizColor(q.avg);
    return `
      <div class="quiz-row">
        <div class="quiz-pct" style="color:${c}">${q.avg !== null ? q.avg+'%' : '—'}</div>
        <div style="flex:1">
          <div class="text-sm font-bold">${q.title}</div>
          <div class="text-xs text-muted">${q.attempts} aluno(s) acessaram</div>
        </div>
        <div class="mini-bar" style="width:160px">
          <div class="mini-fill" style="width:${q.avg||0}%;background:${c}"></div>
        </div>
      </div>`;
  }).join('');
}

// ── Convites — direto no Firestore ─────────────────────────────────────────
async function loadInvites() {
  try {
    const snap = await getDocs(collection(db, 'inviteCodes'));
    const codes = [];
    snap.forEach(d => codes.push({ code: d.id, ...d.data() }));
    renderCodes(codes);
  } catch(e) {
    console.error('Erro ao carregar convites:', e);
  }
}

function renderCodes(codes) {
  const el = document.getElementById('all-codes');
  el.innerHTML = codes.length === 0
    ? '<div class="text-muted text-sm">Nenhum código gerado ainda.</div>'
    : codes.map(c => {
        const exp       = c.expiresAt?._seconds ? new Date(c.expiresAt._seconds*1000) : null;
        const isExpired = exp && exp < new Date();
        const daysLeft  = exp ? Math.ceil((exp-new Date())/86400000) : null;
        return `
          <div class="code-chip ${c.used?'used':isExpired?'expired':''}"
               onclick="${!c.used&&!isExpired?`copyCode('${c.code}')`:''}"
               title="${c.used?'Usado':isExpired?'Expirado':'Clique para copiar'}">
            <span>${c.code}</span>
            ${c.used?'<span class="text-xs text-muted">✓ usado</span>':''}
            ${isExpired?'<span class="text-xs" style="color:var(--error)">expirou</span>':''}
            ${!c.used&&!isExpired&&daysLeft!==null?`<span class="text-xs text-muted">${daysLeft}d</span>`:''}
          </div>`;
      }).join('');
}

window.generateInvites = async function () {
  const qty  = parseInt(document.getElementById('invite-qty').value)  || 5;
  const days = parseInt(document.getElementById('invite-days').value) || 7;
  const newCodes = [];

  try {
    for (let i = 0; i < qty; i++) {
      const code = 'DS' + Math.random().toString(36).slice(2,8).toUpperCase();
      const exp  = new Date(Date.now() + days * 86400000);
      await setDoc(doc(db, 'inviteCodes', code), {
        used: false, usedBy: '', usedAt: '',
        expiresAt: { _seconds: Math.floor(exp.getTime()/1000) },
        createdAt: serverTimestamp(),
      });
      newCodes.push({ code, days });
    }

    document.getElementById('new-codes').innerHTML = newCodes.map(c => `
      <div class="code-chip" onclick="copyCode('${c.code}')" style="border-color:var(--accent)">
        <span style="color:var(--accent)">${c.code}</span>
        <span class="text-xs text-muted">${c.days}d</span>
      </div>`).join('');

    loadInvites();
  } catch(e) {
    console.error('Erro ao gerar convites:', e);
    alert('Erro ao gerar convites. Verifique as permissões do Firestore.');
  }
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
function setValue(id, val) { const el = document.getElementById(id); if (el) el.textContent = val; }

function quizColor(pct) {
  if (pct===null||pct===undefined) return 'var(--text2)';
  return pct>=70?'var(--accent)':pct>=50?'var(--warn)':'var(--error)';
}

function statusBadge(status) {
  const map = {
    active:    ['badge-active',    '✅ Ativo'],
    stuck:     ['badge-stuck',     '⚠️ Travado'],
    inactive:  ['badge-inactive',  '💤 Inativo'],
    abandoned: ['badge-abandoned', '❌ Abandonou'],
    completed: ['badge-completed', '🏆 Concluído'],
  };
  const [cls, label] = map[status] || ['badge-inactive','—'];
  return `<span class="badge ${cls}">${label}</span>`;
}

function formatDate(d) {
  if (!d) return '—';
  const ts = d?._seconds ? new Date(d._seconds*1000) : new Date(d);
  if (isNaN(ts)) return '—';
  const diff = Math.floor((Date.now()-ts)/86400000);
  if (diff===0) return 'Hoje';
  if (diff===1) return 'Ontem';
  if (diff<7)  return `${diff} dias atrás`;
  return ts.toLocaleDateString('pt-BR');
}

function metaInfo(label, value, color='var(--text)') {
  return `<div>
    <div class="text-xs text-muted" style="text-transform:uppercase;letter-spacing:.08em;margin-bottom:.2rem">${label}</div>
    <div style="font-family:var(--font-code);font-size:1rem;font-weight:700;color:${color}">${value}</div>
  </div>`;
}