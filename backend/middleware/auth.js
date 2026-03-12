const admin = require('firebase-admin');

// ─── Verify Firebase JWT ────────────────────────────────────────────────────
async function verifyToken(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token não fornecido.' });
  }

  const token = header.split('Bearer ')[1];
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Token inválido ou expirado. Faça login novamente.' });
  }
}

// ─── Verify Admin Role ──────────────────────────────────────────────────────
async function verifyAdmin(req, res, next) {
  await verifyToken(req, res, async () => {
    const db = req.db;
    const userDoc = await db.collection('users').doc(req.user.uid).get();
    if (!userDoc.exists || userDoc.data().role !== 'admin') {
      return res.status(403).json({ error: 'Acesso negado. Rota exclusiva para administradores.' });
    }
    next();
  });
}

module.exports = { verifyToken, verifyAdmin };
