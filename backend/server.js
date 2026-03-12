const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const admin = require('firebase-admin');
const authRoutes = require('./routes/auth');
const progressRoutes = require('./routes/progress');
const adminRoutes = require('./routes/admin');

// ─── Firebase Admin Init ───────────────────────────────────────────────────
// Substitua pelo caminho do seu serviceAccountKey.json baixado do Firebase Console
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const auth = admin.auth();

// ─── App Setup ─────────────────────────────────────────────────────────────
const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// ─── Rate Limiters ─────────────────────────────────────────────────────────

// Login: máx 5 tentativas por 15 min por IP
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Muitas tentativas de login. Tente novamente em 15 minutos.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Cadastro: máx 3 cadastros por hora por IP
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: { error: 'Limite de cadastros atingido. Tente novamente em 1 hora.' },
});

// Global: 100 req/min por IP
const globalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 500,
  message: { error: 'Muitas requisições. Aguarde um momento.' },
});

app.use(globalLimiter);

// ─── Inject db & auth into requests ────────────────────────────────────────
app.use((req, _res, next) => {
  req.db = db;
  req.firebaseAuth = auth;
  next();
});

// ─── Routes ────────────────────────────────────────────────────────────────
app.use('/api/auth', loginLimiter, authRoutes);
app.use('/api/auth/register', registerLimiter);
app.use('/api/progress', progressRoutes);
app.use('/api/admin', adminRoutes);

// ─── Health Check ──────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => res.json({ status: 'ok', timestamp: new Date() }));

// ─── Error Handler ─────────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('[ERROR]', err.message);
  res.status(err.status || 500).json({ error: err.message || 'Erro interno do servidor.' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 DevStart API rodando na porta ${PORT}`));

module.exports = { db, auth };