const express = require('express');
const router = express.Router();
const { verifyToken, verifyAdmin } = require('../middleware/auth');
const admin = require('firebase-admin');
const crypto = require('crypto');

// ─── POST /api/auth/register ────────────────────────────────────────────────
// Cadastro com código de convite
router.post('/register', async (req, res) => {
  const { email, username, password, course, inviteCode } = req.body;
  const db = req.db;

  // Validações básicas
  if (!email || !username || !password || !course || !inviteCode) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }
  if (password.length < 8) {
    return res.status(400).json({ error: 'A senha deve ter no mínimo 8 caracteres.' });
  }
  if (!['ADS', 'CC'].includes(course)) {
    return res.status(400).json({ error: 'Curso inválido. Use ADS ou CC.' });
  }

  // Verificar username único
  const usernameSnap = await db.collection('users')
    .where('username', '==', username.toLowerCase()).get();
  if (!usernameSnap.empty) {
    return res.status(400).json({ error: 'Este nome de usuário já está em uso.' });
  }

  // Verificar código de convite
  const inviteSnap = await db.collection('inviteCodes').doc(inviteCode).get();
  if (!inviteSnap.exists) {
    return res.status(400).json({ error: 'Código de convite inválido.' });
  }
  const invite = inviteSnap.data();
  if (invite.used) {
    return res.status(400).json({ error: 'Este código de convite já foi utilizado.' });
  }
  if (invite.expiresAt && invite.expiresAt.toDate() < new Date()) {
    return res.status(400).json({ error: 'Este código de convite expirou.' });
  }

  try {
    // Criar usuário no Firebase Auth
    const userRecord = await admin.auth().createUser({ email, password, displayName: username });

    // Salvar perfil no Firestore
    await db.collection('users').doc(userRecord.uid).set({
      uid: userRecord.uid,
      email,
      username: username.toLowerCase(),
      displayName: username,
      course,
      role: 'student',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      lastActiveAt: admin.firestore.FieldValue.serverTimestamp(),
      progress: {},       // { moduleId: { chaptersCompleted: [], quizScores: {} } }
      loginAttempts: 0,
      lockedUntil: null,
    });

    // Marcar convite como usado
    await db.collection('inviteCodes').doc(inviteCode).update({
      used: true,
      usedBy: userRecord.uid,
      usedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(201).json({ message: 'Cadastro realizado com sucesso! Faça login para continuar.' });
  } catch (err) {
    if (err.code === 'auth/email-already-exists') {
      return res.status(400).json({ error: 'Este e-mail já está cadastrado.' });
    }
    throw err;
  }
});

// ─── POST /api/auth/login-attempt ──────────────────────────────────────────
// Registra tentativa de login falha (o login real é feito pelo SDK do Firebase no client)
router.post('/login-attempt', async (req, res) => {
  const { email, success } = req.body;
  const db = req.db;

  if (!email) return res.status(400).json({ error: 'Email obrigatório.' });

  // Buscar user por email
  const snap = await db.collection('users').where('email', '==', email).limit(1).get();
  if (snap.empty) return res.json({ ok: true }); // não revelar se email existe

  const userRef = snap.docs[0].ref;
  const userData = snap.docs[0].data();

  if (success) {
    // Login bem-sucedido — resetar contador
    await userRef.update({
      loginAttempts: 0,
      lockedUntil: null,
      lastActiveAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    return res.json({ ok: true });
  }

  // Login falhou
  const attempts = (userData.loginAttempts || 0) + 1;
  const updateData = { loginAttempts: attempts };

  if (attempts >= 5) {
    // Bloquear por 15 minutos
    const lockUntil = new Date(Date.now() + 15 * 60 * 1000);
    updateData.lockedUntil = admin.firestore.Timestamp.fromDate(lockUntil);
  }

  await userRef.update(updateData);

  const remaining = Math.max(0, 5 - attempts);
  if (attempts >= 5) {
    return res.status(429).json({ error: 'Conta bloqueada por 15 minutos devido a muitas tentativas.' });
  }
  res.json({ warning: `Senha incorreta. ${remaining} tentativa(s) restante(s).`, attempts });
});

// ─── GET /api/auth/check-lock ───────────────────────────────────────────────
router.post('/check-lock', async (req, res) => {
  const { email } = req.body;
  const db = req.db;
  const snap = await db.collection('users').where('email', '==', email).limit(1).get();
  if (snap.empty) return res.json({ locked: false });

  const data = snap.docs[0].data();
  if (data.lockedUntil && data.lockedUntil.toDate() > new Date()) {
    const minutesLeft = Math.ceil((data.lockedUntil.toDate() - new Date()) / 60000);
    return res.json({ locked: true, minutesLeft });
  }
  res.json({ locked: false });
});

// ─── GET /api/auth/me ───────────────────────────────────────────────────────
router.get('/me', verifyToken, async (req, res) => {
  const doc = await req.db.collection('users').doc(req.user.uid).get();
  if (!doc.exists) return res.status(404).json({ error: 'Usuário não encontrado.' });
  const { password, loginAttempts, lockedUntil, ...safe } = doc.data();
  res.json(safe);
});

// ─── POST /api/auth/invites ─────────────────────────────────────────────────
// Admin gera códigos de convite
router.post('/invites', verifyAdmin, async (req, res) => {
  const { quantity = 1, expiresInDays = 7 } = req.body;
  const db = req.db;
  const codes = [];

  for (let i = 0; i < Math.min(quantity, 50); i++) {
    const code = crypto.randomBytes(4).toString('hex').toUpperCase(); // ex: A1B2C3D4
    const expiresAt = new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000);
    await db.collection('inviteCodes').doc(code).set({
      code,
      used: false,
      usedBy: null,
      usedAt: null,
      createdBy: req.user.uid,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      expiresAt: admin.firestore.Timestamp.fromDate(expiresAt),
    });
    codes.push({ code, expiresAt });
  }

  res.json({ codes });
});

// ─── GET /api/auth/invites ──────────────────────────────────────────────────
router.get('/invites', verifyAdmin, async (req, res) => {
  const snap = await req.db.collection('inviteCodes').orderBy('createdAt', 'desc').get();
  const invites = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  res.json(invites);
});

module.exports = router;
