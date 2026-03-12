/* ============================================================
   DevStart — assets/js/auth.js
   Autenticação 100% via Firebase — sem backend
   ============================================================ */

import { auth }                                from './firebase.js';
import { getFirestore, doc, getDoc, setDoc,
         updateDoc, serverTimestamp }          from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { signInWithEmailAndPassword,
         createUserWithEmailAndPassword,
         onAuthStateChanged, signOut }         from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

const db = getFirestore();

// ── Redirect se já logado ──────────────────────────────────────────────────
onAuthStateChanged(auth, async (user) => {
  if (!user) return;
  // Só redireciona se estiver na página de login
  if (!window.location.pathname.includes('login')) return;
  try {
    const userDoc  = await getDoc(doc(db, 'users', user.uid)).catch(() => null);
    const userData = userDoc?.data() || {};
    window.location.href = userData.role === 'admin' ? 'admin.html' : 'app.html';
  } catch {
    window.location.href = 'app.html';
  }
});

// ── Switch de abas ─────────────────────────────────────────────────────────
window.switchTab = function (tab) {
  document.querySelectorAll('.auth-tab').forEach((b, i) =>
    b.classList.toggle('active', (i === 0 && tab === 'login') || (i === 1 && tab === 'register'))
  );
  document.getElementById('form-login').classList.toggle('active', tab === 'login');
  document.getElementById('form-register').classList.toggle('active', tab === 'register');
};

// ── Utilitários de alerta ──────────────────────────────────────────────────
function showAlert(id, msg, type = 'error') {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = msg;
  el.className = `alert alert-${type} show`;
}
function hideAlert(id) {
  const el = document.getElementById(id);
  if (el) el.className = 'alert';
}

// ── Força da senha ─────────────────────────────────────────────────────────
window.checkStrength = function (pw) {
  let score = 0;
  if (pw.length >= 8)            score++;
  if (pw.length >= 12)           score++;
  if (/[A-Z]/.test(pw))         score++;
  if (/[0-9]/.test(pw))         score++;
  if (/[^A-Za-z0-9]/.test(pw))  score++;

  const idx    = Math.max(0, Math.min(score - 1, 4));
  const colors = ['#ff4d4d','#ff4d4d','#f5a623','#00e5a0','#00e5a0'];
  const labels = ['Muito fraca','Fraca','Média','Forte','Muito forte'];
  const pcts   = [20, 40, 60, 80, 100];

  const fill  = document.getElementById('pw-strength-fill');
  const label = document.getElementById('pw-strength-label');
  if (fill)  { fill.style.width = pcts[idx] + '%'; fill.style.background = colors[idx]; }
  if (label) { label.textContent = labels[idx]; label.style.color = colors[idx]; }
};

// ── Mensagens de erro Firebase ─────────────────────────────────────────────
function firebaseError(code) {
  const map = {
    'auth/invalid-email':          'E-mail inválido.',
    'auth/user-not-found':         'E-mail ou senha incorretos.',
    'auth/wrong-password':         'E-mail ou senha incorretos.',
    'auth/invalid-credential':     'E-mail ou senha incorretos.',
    'auth/too-many-requests':      'Muitas tentativas. Aguarde alguns minutos.',
    'auth/email-already-in-use':   'Este e-mail já está cadastrado.',
    'auth/weak-password':          'Senha muito fraca. Use pelo menos 8 caracteres.',
    'auth/network-request-failed': 'Erro de conexão. Verifique sua internet.',
  };
  return map[code] || 'Erro inesperado. Tente novamente.';
}

// ── LOGIN ──────────────────────────────────────────────────────────────────
window.handleLogin = async function (e) {
  if (e) e.preventDefault();
  hideAlert('login-alert');

  const email = document.getElementById('login-email')?.value.trim();
  const pw    = document.getElementById('login-pw')?.value;
  const btn   = document.getElementById('login-btn');

  if (!email || !pw) { showAlert('login-alert', 'Preencha todos os campos.'); return; }

  btn.disabled    = true;
  btn.textContent = 'Entrando...';

  try {
    const cred     = await signInWithEmailAndPassword(auth, email, pw);
    const userDoc  = await getDoc(doc(db, 'users', cred.user.uid)).catch(() => null);
    const userData = userDoc?.data() || {};

    // Atualizar último acesso
    await setDoc(doc(db, 'users', cred.user.uid), {
      lastActiveAt: serverTimestamp()
    }, { merge: true }).catch(() => {});

    showAlert('login-alert', `Bem-vindo, ${userData.username || 'Dev'}! 🚀`, 'success');
    setTimeout(() => {
      window.location.href = userData.role === 'admin' ? 'admin.html' : 'app.html';
    }, 800);

  } catch (err) {
    showAlert('login-alert', firebaseError(err.code));
    btn.disabled    = false;
    btn.textContent = 'Entrar →';
  }
};

// ── CADASTRO ───────────────────────────────────────────────────────────────
window.handleRegister = async function (e) {
  if (e) e.preventDefault();
  hideAlert('reg-alert');

  const username   = document.getElementById('reg-username')?.value.trim();
  const course     = document.getElementById('reg-course')?.value;
  const email      = document.getElementById('reg-email')?.value.trim();
  const password   = document.getElementById('reg-pw')?.value;
  const inviteCode = document.getElementById('reg-invite')?.value.trim().toUpperCase();
  const btn        = document.getElementById('reg-btn');

  if (!username || !course || !email || !password || !inviteCode) {
    showAlert('reg-alert', 'Preencha todos os campos.'); return;
  }
  if (password.length < 8) {
    showAlert('reg-alert', 'A senha precisa ter no mínimo 8 caracteres.'); return;
  }

  btn.disabled    = true;
  btn.textContent = 'Criando conta...';

  try {
    // 1. Validar código de convite
    const codeDoc = await getDoc(doc(db, 'inviteCodes', inviteCode));
    if (!codeDoc.exists()) {
      showAlert('reg-alert', 'Código de convite inválido.');
      btn.disabled = false; btn.textContent = 'Criar conta →'; return;
    }
    const codeData = codeDoc.data();
    if (codeData.used) {
      showAlert('reg-alert', 'Este código já foi utilizado.');
      btn.disabled = false; btn.textContent = 'Criar conta →'; return;
    }
    const exp = codeData.expiresAt?._seconds ? new Date(codeData.expiresAt._seconds * 1000) : null;
    if (exp && exp < new Date()) {
      showAlert('reg-alert', 'Código expirado.');
      btn.disabled = false; btn.textContent = 'Criar conta →'; return;
    }

    // 2. Criar conta no Firebase Auth
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    // 3. Salvar perfil no Firestore
    await setDoc(doc(db, 'users', cred.user.uid), {
      username, email, curso: course,
      role: 'student',
      createdAt: serverTimestamp(),
      lastActiveAt: serverTimestamp(),
    });

    // 4. Marcar convite como usado
    await updateDoc(doc(db, 'inviteCodes', inviteCode), {
      used: true,
      usedBy: cred.user.uid,
      usedAt: serverTimestamp(),
    }).catch(() => {});

    showAlert('reg-alert', '✅ Conta criada! Redirecionando...', 'success');
    setTimeout(() => { window.location.href = 'app.html'; }, 1200);

  } catch (err) {
    showAlert('reg-alert', firebaseError(err.code));
    btn.disabled    = false;
    btn.textContent = 'Criar conta →';
  }
};

// ── LOGOUT ─────────────────────────────────────────────────────────────────
window.doLogout = async function () {
  await signOut(auth);
  window.location.href = 'index.html';
};