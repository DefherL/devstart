/* ============================================================
   DevStart — assets/js/firebase.js
   Inicialização do Firebase compartilhada por todas as páginas.
   Importe este módulo PRIMEIRO em qualquer página que use Firebase.
   ============================================================ */

import { initializeApp }       from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth }             from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getFirestore }        from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// ─────────────────────────────────────────────────────────────────────────────
// 🔧 SUBSTITUA ESTES VALORES pelas credenciais do seu projeto Firebase.
//    Acesse: console.firebase.google.com → Configurações do projeto → Seus apps
// ─────────────────────────────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey:            "AIzaSyCb12YghRVwPVgrJHZdpceWxObHysTHj5U",
  authDomain:        "devstart-11b00.firebaseapp.com",
  projectId:         "devstart-11b00",
  storageBucket:     "devstart-11b00.firebasestorage.app",
  messagingSenderId: "711485898249",
  appId:             "1:711485898249:web:04e57aae01d97f532cc2d8"
};
// ─────────────────────────────────────────────────────────────────────────────

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db   = getFirestore(app);

// URL base da API backend
// Em produção, troque pelo endereço do seu servidor (ex: https://api.devstart.com.br)
export const API_URL = 'http://localhost:3001/api';

export { app, auth, db };