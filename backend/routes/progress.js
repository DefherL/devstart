const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const admin = require('firebase-admin');

// Todos os endpoints de progresso exigem autenticação
router.use(verifyToken);

// ─── POST /api/progress/chapter ────────────────────────────────────────────
// Marca capítulo como concluído
router.post('/chapter', async (req, res) => {
  const { moduleId, chapterId } = req.body;
  const db = req.db;
  const uid = req.user.uid;

  if (!moduleId || !chapterId) {
    return res.status(400).json({ error: 'moduleId e chapterId são obrigatórios.' });
  }

  const userRef = db.collection('users').doc(uid);
  const progressRef = db.collection('progress').doc(uid);

  // Usar transaction para garantir integridade
  await db.runTransaction(async (t) => {
    const progressDoc = await t.get(progressRef);
    const existing = progressDoc.exists ? progressDoc.data() : {};
    const moduleProgress = existing[moduleId] || { chaptersCompleted: [], quizScores: {} };

    if (!moduleProgress.chaptersCompleted.includes(chapterId)) {
      moduleProgress.chaptersCompleted.push(chapterId);
    }

    t.set(progressRef, { [moduleId]: moduleProgress }, { merge: true });
    t.update(userRef, { lastActiveAt: admin.firestore.FieldValue.serverTimestamp() });
  });

  // Salvar evento de progresso para análise de travamento
  await db.collection('progressEvents').add({
    uid,
    moduleId,
    chapterId,
    type: 'chapter_complete',
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
  });

  res.json({ message: 'Progresso salvo!' });
});

// ─── POST /api/progress/quiz ───────────────────────────────────────────────
// Salva resultado de um quiz
router.post('/quiz', async (req, res) => {
  const { moduleId, quizId, score, total, answers } = req.body;
  const db = req.db;
  const uid = req.user.uid;

  if (!moduleId || !quizId || score === undefined || !total) {
    return res.status(400).json({ error: 'Campos obrigatórios: moduleId, quizId, score, total.' });
  }

  const progressRef = db.collection('progress').doc(uid);
  const userRef = db.collection('users').doc(uid);

  await db.runTransaction(async (t) => {
    const doc = await t.get(progressRef);
    const existing = doc.exists ? doc.data() : {};
    const moduleProgress = existing[moduleId] || { chaptersCompleted: [], quizScores: {} };

    // Manter melhor pontuação
    const prev = moduleProgress.quizScores[quizId];
    if (!prev || score > prev.score) {
      moduleProgress.quizScores[quizId] = {
        score,
        total,
        percentage: Math.round((score / total) * 100),
        completedAt: new Date().toISOString(),
        attempts: (prev?.attempts || 0) + 1,
      };
    } else {
      moduleProgress.quizScores[quizId].attempts = (prev.attempts || 0) + 1;
    }

    t.set(progressRef, { [moduleId]: moduleProgress }, { merge: true });
    t.update(userRef, { lastActiveAt: admin.firestore.FieldValue.serverTimestamp() });
  });

  // Evento para análise
  await db.collection('progressEvents').add({
    uid,
    moduleId,
    quizId,
    type: 'quiz_complete',
    score,
    total,
    percentage: Math.round((score / total) * 100),
    answers,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
  });

  res.json({ message: 'Quiz salvo!', percentage: Math.round((score / total) * 100) });
});

// ─── GET /api/progress/me ──────────────────────────────────────────────────
// Busca progresso do usuário logado
router.get('/me', async (req, res) => {
  const doc = await req.db.collection('progress').doc(req.user.uid).get();
  res.json(doc.exists ? doc.data() : {});
});

// ─── POST /api/progress/heartbeat ─────────────────────────────────────────
// Atualiza "last active" — chamado a cada 2 min enquanto o aluno está na página
router.post('/heartbeat', async (req, res) => {
  const { moduleId, chapterId } = req.body;
  await req.db.collection('users').doc(req.user.uid).update({
    lastActiveAt: admin.firestore.FieldValue.serverTimestamp(),
    currentModule: moduleId || null,
    currentChapter: chapterId || null,
  });
  res.json({ ok: true });
});

module.exports = router;
