const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../middleware/auth');
const admin = require('firebase-admin');

router.use(verifyAdmin);

// Configuração de módulos (espelho do frontend)
const MODULES = {
  logica:  { title: 'Lógica de Programação', totalChapters: 12 },
  html:    { title: 'HTML',                  totalChapters: 10 },
  css:     { title: 'CSS',                   totalChapters: 12 },
  js:      { title: 'JavaScript',            totalChapters: 14 },
  ai:      { title: 'IA com Claude',         totalChapters: 8  },
};
const TOTAL_CHAPTERS = Object.values(MODULES).reduce((s, m) => s + m.totalChapters, 0);

// ─── GET /api/admin/dashboard ──────────────────────────────────────────────
// Painel principal: visão geral de todos os alunos
router.get('/dashboard', async (req, res) => {
  const db = req.db;
  const STUCK_DAYS = parseInt(req.query.stuckDays || '5');
  const ABANDONED_DAYS = parseInt(req.query.abandonedDays || '14');

  const [usersSnap, progressSnap] = await Promise.all([
    db.collection('users').where('role', '==', 'student').get(),
    db.collection('progress').get(),
  ]);

  const progressMap = {};
  progressSnap.forEach(d => { progressMap[d.id] = d.data(); });

  const now = new Date();
  const students = [];
  const modulePopularity = {};

  usersSnap.forEach(doc => {
    const u = doc.data();
    const prog = progressMap[u.uid] || {};
    const lastActive = u.lastActiveAt?.toDate() || u.createdAt?.toDate() || new Date(0);
    const daysSinceActive = Math.floor((now - lastActive) / (1000 * 60 * 60 * 24));

    let totalCompleted = 0;
    let quizTotal = 0, quizCorrect = 0;
    const moduleBreakdown = {};

    Object.entries(MODULES).forEach(([modId, modInfo]) => {
      const mp = prog[modId] || {};
      const done = (mp.chaptersCompleted || []).length;
      const scores = mp.quizScores || {};
      totalCompleted += done;

      // Popularidade de módulo
      if (done > 0) modulePopularity[modId] = (modulePopularity[modId] || 0) + 1;

      // Desempenho em quiz
      Object.values(scores).forEach(q => {
        quizTotal += q.total || 0;
        quizCorrect += q.score || 0;
      });

      moduleBreakdown[modId] = {
        title: modInfo.title,
        completed: done,
        total: modInfo.totalChapters,
        percentage: Math.round((done / modInfo.totalChapters) * 100),
        quizScores: scores,
        stuck: done > 0 && done < modInfo.totalChapters && daysSinceActive >= STUCK_DAYS,
      };
    });

    const overallPct = Math.round((totalCompleted / TOTAL_CHAPTERS) * 100);
    const quizAvg = quizTotal > 0 ? Math.round((quizCorrect / quizTotal) * 100) : null;

    // Detectar módulo travado (mais capítulos iniciados mas não terminado + inativo)
    const stuckModules = Object.entries(moduleBreakdown)
      .filter(([, m]) => m.stuck)
      .map(([id, m]) => ({ id, ...m }));

    students.push({
      uid: u.uid,
      username: u.displayName,
      email: u.email,
      course: u.course,
      lastActive: lastActive.toISOString(),
      daysSinceActive,
      overallProgress: overallPct,
      totalCompleted,
      totalChapters: TOTAL_CHAPTERS,
      quizAverage: quizAvg,
      moduleBreakdown,
      stuckModules,
      status: overallPct === 100 ? 'completed'
        : daysSinceActive >= ABANDONED_DAYS ? 'abandoned'
        : stuckModules.length > 0 ? 'stuck'
        : daysSinceActive >= STUCK_DAYS ? 'inactive'
        : 'active',
    });
  });

  // Ranking por progresso
  students.sort((a, b) => b.overallProgress - a.overallProgress);

  // Módulo mais acessado
  const topModule = Object.entries(modulePopularity)
    .sort((a, b) => b[1] - a[1])
    .map(([id, count]) => ({ id, title: MODULES[id].title, count }));

  // Estatísticas gerais
  const stats = {
    totalStudents: students.length,
    active:    students.filter(s => s.status === 'active').length,
    stuck:     students.filter(s => s.status === 'stuck').length,
    inactive:  students.filter(s => s.status === 'inactive').length,
    abandoned: students.filter(s => s.status === 'abandoned').length,
    completed: students.filter(s => s.status === 'completed').length,
    avgProgress: students.length
      ? Math.round(students.reduce((s, u) => s + u.overallProgress, 0) / students.length)
      : 0,
    avgQuiz: (() => {
      const withQuiz = students.filter(s => s.quizAverage !== null);
      return withQuiz.length
        ? Math.round(withQuiz.reduce((s, u) => s + u.quizAverage, 0) / withQuiz.length)
        : null;
    })(),
    modulePopularity: topModule,
  };

  res.json({ stats, students, modules: MODULES });
});

// ─── GET /api/admin/student/:uid ──────────────────────────────────────────
// Detalhes completos de um aluno específico
router.get('/student/:uid', async (req, res) => {
  const db = req.db;
  const { uid } = req.params;

  const [userDoc, progressDoc, eventsSnap] = await Promise.all([
    db.collection('users').doc(uid).get(),
    db.collection('progress').doc(uid).get(),
    db.collection('progressEvents')
      .where('uid', '==', uid)
      .orderBy('timestamp', 'desc')
      .limit(50)
      .get(),
  ]);

  if (!userDoc.exists) return res.status(404).json({ error: 'Aluno não encontrado.' });

  const user = userDoc.data();
  const progress = progressDoc.exists ? progressDoc.data() : {};
  const events = eventsSnap.docs.map(d => ({ id: d.id, ...d.data() }));

  // Calcular velocidade de aprendizado (capítulos/semana)
  const completionEvents = events.filter(e => e.type === 'chapter_complete');
  let weeklyVelocity = 0;
  if (completionEvents.length >= 2) {
    const oldest = completionEvents[completionEvents.length - 1].timestamp?.toDate();
    const newest = completionEvents[0].timestamp?.toDate();
    const weeks = Math.max(1, (newest - oldest) / (7 * 24 * 60 * 60 * 1000));
    weeklyVelocity = Math.round(completionEvents.length / weeks * 10) / 10;
  }

  const { password, loginAttempts, lockedUntil, ...safeUser } = user;
  res.json({ user: safeUser, progress, events, weeklyVelocity });
});

// ─── GET /api/admin/quiz-analysis ─────────────────────────────────────────
// Questões com mais erros (para o admin melhorar o conteúdo)
router.get('/quiz-analysis', async (req, res) => {
  const db = req.db;
  const eventsSnap = await db.collection('progressEvents')
    .where('type', '==', 'quiz_complete')
    .orderBy('timestamp', 'desc')
    .limit(500)
    .get();

  const quizMap = {};
  eventsSnap.forEach(doc => {
    const e = doc.data();
    const key = `${e.moduleId}::${e.quizId}`;
    if (!quizMap[key]) quizMap[key] = { moduleId: e.moduleId, quizId: e.quizId, attempts: 0, totalScore: 0, totalQuestions: 0 };
    quizMap[key].attempts++;
    quizMap[key].totalScore += e.score || 0;
    quizMap[key].totalQuestions += e.total || 0;
  });

  const analysis = Object.values(quizMap).map(q => ({
    ...q,
    avgPercentage: q.totalQuestions > 0 ? Math.round((q.totalScore / q.totalQuestions) * 100) : 0,
  })).sort((a, b) => a.avgPercentage - b.avgPercentage); // piores primeiro

  res.json(analysis);
});

// ─── DELETE /api/admin/user/:uid ──────────────────────────────────────────
router.delete('/user/:uid', async (req, res) => {
  const { uid } = req.params;
  if (uid === req.user.uid) return res.status(400).json({ error: 'Você não pode remover sua própria conta.' });

  await Promise.all([
    admin.auth().deleteUser(uid),
    req.db.collection('users').doc(uid).delete(),
    req.db.collection('progress').doc(uid).delete(),
  ]);

  res.json({ message: 'Aluno removido.' });
});

module.exports = router;
