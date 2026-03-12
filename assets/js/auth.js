/* ============================================================
   DevStart — assets/js/auth.js
   Autenticação 100% via Firebase (sem depender do backend).
   ============================================================ */

import { auth, db, API_URL } from './firebase.js';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import {
  doc, getDoc, setDoc
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// ── Páginas que NÃO devem redirecionar automaticamente ─────
const PAGINA_ATUAL = window.location.pathname.split('/').pop() || 'index.html';
const PAGINAS_PUBLICAS = ['login.html', 'index.html', '', '/'];

// ── Redirect automático se já logado ───────────────────────
// Só redireciona se o usuário acessar login.html já logado
onAuthStateChanged(auth, async (user) => {
  if (!user) return; // sem sessão → fica na tela de login normalmente

  // Se estiver na página de login com sessão ativa → redireciona
  if (PAGINAS_PUBLICAS.includes(PAGINA_ATUAL)) {
    try {
      const snap = await getDoc(doc(db, 'users', user.uid));
      const role = snap.exists() ? snap.data().role : 'student';
      redirectByRole(role);
    } catch {
      window.location.href = 'app.html';
    }
  }
});

function redirectByRole(role) {
  window.location.href = role === 'admin' ? 'admin.html' : 'app.html';
}

// ── Utilitários de alerta ──────────────────────────────────
function showAlert(id, msg, type = 'error') {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = msg;
  el.className = `alert alert-${type} show`;
  el.style.display = 'block';
}
function hideAlert(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = '';
  el.className = 'alert';
  el.style.display = 'none';
}

// ── Força da senha ─────────────────────────────────────────
window.checkStrength = function (pw) {
  let score = 0;
  if (pw.length >= 8)           score++;
  if (pw.length >= 12)          score++;
  if (/[A-Z]/.test(pw))        score++;
  if (/[0-9]/.test(pw))        score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;

  const idx    = Math.max(0, Math.min(score - 1, 4));
  const colors = ['#ff4d4d','#ff4d4d','#f5a623','#00e5a0','#00e5a0'];
  const labels = ['Muito fraca','Fraca','Média','Forte','Muito forte'];
  const pcts   = [20, 40, 60, 80, 100];

  const fill  = document.getElementById('pw-strength-fill');
  const label = document.getElementById('pw-strength-label');
  if (fill)  { fill.style.width = pcts[idx] + '%'; fill.style.background = colors[idx]; }
  if (label) { label.textContent = labels[idx]; label.style.color = colors[idx]; }
};

// ── LOGIN ──────────────────────────────────────────────────
window.handleLogin = async function (e) {
  e.preventDefault();
  hideAlert('login-alert');

  const email = document.getElementById('login-email').value.trim();
  const pw    = document.getElementById('login-pw').value;
  const btn   = document.getElementById('login-btn');

  if (!email || !pw) {
    showAlert('login-alert', 'Preencha e-mail e senha.');
    return;
  }

  btn.disabled    = true;
  btn.textContent = 'Entrando...';

  try {
    // Login direto no Firebase — sem precisar do backend
    const cred = await signInWithEmailAndPassword(auth, email, pw);
    const snap = await getDoc(doc(db, 'users', cred.user.uid));
    const nome = snap.exists() ? (snap.data().displayName || snap.data().username) : 'dev';
    const role = snap.exists() ? snap.data().role : 'student';

    showAlert('login-alert', `Bem-vindo, ${nome}! 🚀`, 'success');
    setTimeout(() => redirectByRole(role), 900);

    // Tenta notificar backend em segundo plano (não bloqueia o login)
    try {
      await fetch(`${API_URL}/auth/login-attempt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, success: true }),
      });
    } catch { /* backend offline — ignora */ }

  } catch (err) {
    btn.disabled    = false;
    btn.textContent = 'Entrar →';

    // Tenta registrar falha no backend (não bloqueia)
    try {
      await fetch(`${API_URL}/auth/login-attempt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, success: false }),
      });
    } catch { /* backend offline — ignora */ }

    const code = err.code || '';
    if (code.includes('user-not-found') || code.includes('wrong-password') || code.includes('invalid-credential')) {
      showAlert('login-alert', '❌ E-mail ou senha incorretos.');
    } else if (code.includes('too-many-requests')) {
      showAlert('login-alert', '🔒 Muitas tentativas. Aguarde alguns minutos.');
    } else if (code.includes('network') || code.includes('offline')) {
      showAlert('login-alert', '📡 Sem conexão. Verifique sua internet.');
    } else {
      showAlert('login-alert', `Erro: ${code || 'tente novamente.'}`);
    }
  }
};

// ── CADASTRO ───────────────────────────────────────────────
window.handleRegister = async function (e) {
  e.preventDefault();
  hideAlert('reg-alert');

  const username   = document.getElementById('reg-username').value.trim();
  const course     = document.getElementById('reg-course').value;
  const email      = document.getElementById('reg-email').value.trim();
  const password   = document.getElementById('reg-pw').value;
  const inviteCode = document.getElementById('reg-invite').value.trim().toUpperCase();
  const btn        = document.getElementById('reg-btn');

  if (password.length < 8) {
    showAlert('reg-alert', 'A senha precisa ter no mínimo 8 caracteres.');
    return;
  }

  btn.disabled    = true;
  btn.textContent = 'Verificando convite...';

  try {
    // 1. Tenta cadastro via backend (se estiver rodando)
    let cadastroViaBackend = false;
    try {
      const res  = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, course, email, password, inviteCode }),
      });
      const data = await res.json();

      if (res.ok) {
        cadastroViaBackend = true;
        showAlert('reg-alert', '✅ Conta criada! Entrando...', 'success');
        setTimeout(() => {
          document.getElementById('login-email').value = email;
          switchTab('login');
        }, 1300);
      } else {
        showAlert('reg-alert', data.error || 'Erro no cadastro.');
        btn.disabled    = false;
        btn.textContent = 'Criar conta →';
        return;
      }
    } catch {
      // Backend offline → tenta direto no Firebase
    }

    if (!cadastroViaBackend) {
      btn.textContent = 'Verificando código...';

      // Validar convite direto no Firestore
      const inviteSnap = await getDoc(doc(db, 'inviteCodes', inviteCode));
      if (!inviteSnap.exists()) {
        showAlert('reg-alert', '❌ Código de convite inválido.');
        btn.disabled = false; btn.textContent = 'Criar conta →';
        return;
      }
      const invite = inviteSnap.data();
      if (invite.used) {
        showAlert('reg-alert', '❌ Este código já foi utilizado.');
        btn.disabled = false; btn.textContent = 'Criar conta →';
        return;
      }
      if (invite.expiresAt && invite.expiresAt.toDate() < new Date()) {
        showAlert('reg-alert', '❌ Código expirado.');
        btn.disabled = false; btn.textContent = 'Criar conta →';
        return;
      }

      btn.textContent = 'Criando conta...';

      // Criar no Firebase Auth
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      // Salvar perfil no Firestore
      await setDoc(doc(db, 'users', cred.user.uid), {
        uid: cred.user.uid,
        email,
        username: username.toLowerCase(),
        displayName: username,
        course,
        role: 'student',
        createdAt: new Date(),
        lastActiveAt: new Date(),
        progress: {},
        loginAttempts: 0,
        lockedUntil: null,
      });

      // Marcar convite como usado
      await setDoc(doc(db, 'inviteCodes', inviteCode), {
        ...invite, used: true, usedBy: email, usedAt: new Date()
      });

      showAlert('reg-alert', '✅ Conta criada! Faça login para começar.', 'success');
      setTimeout(() => {
        document.getElementById('login-email').value = email;
        switchTab('login');
      }, 1300);
    }

  } catch (err) {
    btn.disabled    = false;
    btn.textContent = 'Criar conta →';
    const code = err.code || '';
    if (code.includes('email-already-in-use')) {
      showAlert('reg-alert', '❌ E-mail já cadastrado. Faça login.');
    } else if (code.includes('weak-password')) {
      showAlert('reg-alert', '❌ Senha muito fraca.');
    } else {
      showAlert('reg-alert', `Erro: ${code || 'tente novamente.'}`);
    }
  }
};

// ── Switch de abas ─────────────────────────────────────────
window.switchTab = function (tab) {
  document.querySelectorAll('.auth-tab').forEach((b, i) =>
    b.classList.toggle('active', (i === 0 && tab === 'login') || (i === 1 && tab === 'register'))
  );
  const formLogin    = document.getElementById('form-login');
  const formRegister = document.getElementById('form-register');
  if (formLogin)    formLogin.classList.toggle('active', tab === 'login');
  if (formRegister) formRegister.classList.toggle('active', tab === 'register');
};

// ── LOGOUT ─────────────────────────────────────────────────
window.doLogout = async function () {
  await signOut(auth);
  window.location.href = 'index.html';
};