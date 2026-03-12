/* ============================================================
   DevStart — assets/js/security.js
   Proteções client-side:
   · Detecção de DevTools → trava a tela
   · Bloquear copiar/colar no conteúdo protegido
   · Bloquear clique direito nas áreas de conteúdo
   · Desabilitar atalhos de inspeção
   ============================================================ */

const Security = (() => {

  let devToolsOpen   = false;
  let overlayVisible = false;

  // ── Cria o overlay de bloqueio ──────────────────────────────────────────
  function createOverlay() {
    const el = document.createElement('div');
    el.id = 'security-overlay';
    el.style.cssText = `
      position: fixed; inset: 0; z-index: 99999;
      background: #0a0c0f;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      font-family: 'Syne', sans-serif;
      color: #e8edf2;
      gap: 1rem;
      animation: fadeIn .3s ease;
    `;
    el.innerHTML = `
      <div style="font-size:3rem">🔒</div>
      <div style="font-size:1.5rem;font-weight:800;color:#ff4d4d">Acesso Bloqueado</div>
      <div style="font-size:.95rem;color:#8a95a3;text-align:center;max-width:340px;line-height:1.6">
        Ferramentas de desenvolvimento foram detectadas.<br/>
        Feche o DevTools e recarregue a página.
      </div>
      <button onclick="location.reload()"
        style="margin-top:.5rem;background:#00e5a0;color:#000;border:none;padding:.75rem 2rem;
               border-radius:12px;font-family:'Syne',sans-serif;font-weight:700;
               font-size:.95rem;cursor:pointer;">
        Recarregar página
      </button>
    `;
    return el;
  }

  function showOverlay() {
    if (overlayVisible) return;
    overlayVisible = true;
    document.body.appendChild(createOverlay());
    // Limpa o conteúdo visível do body enquanto overlay está ativo
    document.querySelectorAll('body > *:not(#security-overlay)').forEach(el => {
      el.style.visibility = 'hidden';
    });
  }

  function hideOverlay() {
    if (!overlayVisible) return;
    overlayVisible = false;
    const el = document.getElementById('security-overlay');
    if (el) el.remove();
    document.querySelectorAll('body > *').forEach(el => {
      el.style.visibility = '';
    });
  }

  // ── Detecção de DevTools via tamanho de janela ──────────────────────────
  // Método 1: Diferença entre outer/inner window
  function checkWindowSize() {
    const threshold = 160;
    const widthDiff  = window.outerWidth  - window.innerWidth;
    const heightDiff = window.outerHeight - window.innerHeight;
    return widthDiff > threshold || heightDiff > threshold;
  }

  // Método 2: Tempo de execução do debugger (funciona em Chrome)
  function checkDebugger() {
    const start = performance.now();
    // eslint-disable-next-line no-debugger
    debugger;
    return performance.now() - start > 100;
  }

  // Método 3: Detecção via toString de função
  let devToolsChecker = /./;
  devToolsChecker.toString = () => { devToolsOpen = true; return ''; };

  function runDetection() {
    const bySize    = checkWindowSize();
    const byDebug   = checkDebugger();

    if (bySize || byDebug || devToolsOpen) {
      showOverlay();
    } else {
      hideOverlay();
      devToolsOpen = false;
    }
  }

  // ── Bloquear atalhos de teclado de inspeção ─────────────────────────────
  function blockInspectShortcuts(e) {
    // F12
    if (e.key === 'F12') { e.preventDefault(); return false; }
    // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C / Ctrl+U
    if (e.ctrlKey && e.shiftKey && ['I','i','J','j','C','c'].includes(e.key)) {
      e.preventDefault(); return false;
    }
    if (e.ctrlKey && ['U','u'].includes(e.key)) {
      e.preventDefault(); return false;
    }
    // Cmd+Option+I (Mac)
    if (e.metaKey && e.altKey && ['I','i'].includes(e.key)) {
      e.preventDefault(); return false;
    }
  }

  // ── Bloquear copiar/colar em elementos protegidos ───────────────────────
  function blockCopyPaste() {
    // Aplica em qualquer elemento com class "protected-content"
    document.addEventListener('copy', (e) => {
      if (e.target.closest('.protected-content')) {
        e.preventDefault();
        showCopyAlert();
      }
    });
    document.addEventListener('cut', (e) => {
      if (e.target.closest('.protected-content')) {
        e.preventDefault();
      }
    });
    document.addEventListener('selectstart', (e) => {
      if (e.target.closest('.protected-content')) {
        e.preventDefault();
      }
    });
  }

  // ── Bloquear clique direito em conteúdo protegido ───────────────────────
  function blockContextMenu() {
    document.addEventListener('contextmenu', (e) => {
      if (e.target.closest('.protected-content')) {
        e.preventDefault();
      }
    });
  }

  // ── Alerta visual de cópia bloqueada ────────────────────────────────────
  let copyAlertTimeout = null;
  function showCopyAlert() {
    let el = document.getElementById('copy-alert');
    if (!el) {
      el = document.createElement('div');
      el.id = 'copy-alert';
      el.style.cssText = `
        position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%);
        background: rgba(255,77,77,0.9); color: #fff;
        padding: .6rem 1.25rem; border-radius: 8px;
        font-family: 'Figtree', sans-serif; font-size: .875rem;
        z-index: 9999; animation: fadeUp .3s ease;
        display: flex; align-items: center; gap: .5rem;
      `;
      el.textContent = '🚫 Cópia de conteúdo não permitida nesta plataforma.';
      document.body.appendChild(el);
    }
    el.style.display = 'flex';
    clearTimeout(copyAlertTimeout);
    copyAlertTimeout = setTimeout(() => { el.style.display = 'none'; }, 3000);
  }

  // ── API pública ─────────────────────────────────────────────────────────
  function init({ detectDevTools = true, blockCopy = true, blockMenu = true } = {}) {
    if (detectDevTools) {
      // Roda a cada 2 segundos
      setInterval(runDetection, 2000);
      // Também checa no console.log via objeto toString
      console.log('%cDevStart — Área Protegida', 'color:#00e5a0;font-size:16px;font-weight:bold;');
      console.log(devToolsChecker);
    }

    if (blockCopy) {
      blockCopyPaste();
    }

    if (blockMenu) {
      blockContextMenu();
    }

    // Sempre bloqueia atalhos de inspeção
    document.addEventListener('keydown', blockInspectShortcuts);
  }

  return { init, showOverlay, hideOverlay };
})();

export default Security;
