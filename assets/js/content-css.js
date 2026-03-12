/* ============================================================
   DevStart — assets/js/content-css.js
   Módulo 02 — CSS (12 capítulos)
   ============================================================ */

export const CSS = {

  /* ──────────────────────────────────────────────────────────
     CAP 01 — O que é CSS e como funciona
  ────────────────────────────────────────────────────────── */
  'css-01': {
    moduleId: 'css',
    title: 'O que é CSS e como funciona?',
    desc: 'CSS é a linguagem que transforma estrutura HTML em interfaces visuais. Entender como o navegador processa CSS é o primeiro passo para dominar o estilo.',
    blocks: [
      { type:'text', title:'CSS — a camada de apresentação',
        body:'CSS significa <em>Cascading Style Sheets</em> — Folhas de Estilo em Cascata. Enquanto o HTML define <em>o que</em> é cada elemento, o CSS define <em>como</em> ele aparece: cor, tamanho, espaçamento, posicionamento, animação. Sem CSS, toda página web seria texto preto no fundo branco — como um documento de texto dos anos 80.' },
      { type:'text', title:'As três formas de aplicar CSS',
        body:'<strong>Inline:</strong> <code>style="color:red"</code> diretamente na tag — evite, dificulta manutenção. <strong>Interno:</strong> <code>&lt;style&gt;</code> dentro do <code>&lt;head&gt;</code> — bom para páginas únicas e exemplos. <strong>Externo:</strong> arquivo <code>.css</code> separado linkado com <code>&lt;link rel="stylesheet" href="style.css"&gt;</code> — o jeito profissional, permite reutilizar estilos em múltiplas páginas.' },
      { type:'text', title:'A anatomia de uma regra CSS',
        body:'Uma regra CSS tem dois componentes: o <strong>seletor</strong> (quem será estilizado) e o <strong>bloco de declarações</strong> (como será estilizado). Cada declaração é um par <code>propriedade: valor;</code>. O ponto e vírgula no final de cada declaração é obrigatório — esquecer ele quebra tudo abaixo.' },
      { type:'callout',
        body:'<strong>Cascata:</strong> O "C" em CSS significa que os estilos se acumulam e se sobrepõem em cascata. Um elemento pode receber estilos de múltiplas fontes — e há regras precisas de prioridade para decidir qual vence. Isso é a especificidade, que você vai aprender no próximo capítulo.' },
    ],
    editor: {
      tabs: ['HTML'],
      code: [`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Meu primeiro CSS</title>
  <style>
    /* Seletor { propriedade: valor; } */

    body {
      background-color: #0a0c0f;
      color: #e8edf2;
      font-family: 'Segoe UI', sans-serif;
      padding: 2rem;
    }

    h1 {
      color: #00e5a0;
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    p {
      color: #8a95a3;
      line-height: 1.8;
      max-width: 600px;
    }

    .destaque {
      background: rgba(0, 229, 160, 0.1);
      border-left: 3px solid #00e5a0;
      padding: 1rem;
      border-radius: 0 8px 8px 0;
    }
  </style>
</head>
<body>
  <h1>CSS em ação!</h1>
  <p>Antes do CSS, esta página seria só texto preto no fundo branco.</p>
  <p class="destaque">
    Com CSS, você controla absolutamente tudo que o olho vê.
  </p>
</body>
</html>`],
    },
    quiz: [
      { q:'O que significa a sigla CSS?',
        opts:['Colored Style Sheets','Cascading Style Sheets','Creative Styling System','Computer Style Syntax'],
        correct:1, explanation:'CSS = Cascading Style Sheets (Folhas de Estilo em Cascata). O "cascading" se refere ao sistema de prioridade que decide qual estilo vence quando há conflito.' },
      { q:'Qual é a forma profissional recomendada de aplicar CSS?',
        opts:['Inline com o atributo style','Tag <style> no body','Arquivo .css externo linkado no <head>','JavaScript adicionando estilos'],
        correct:2, explanation:'CSS externo em arquivo .css separado é a melhor prática — separa estrutura de estilo, permite reutilização em múltiplas páginas e é mais fácil de manter.' },
      { q:'Uma declaração CSS é composta por:',
        opts:['tag e atributo','seletor e bloco de declarações','classe e id','elemento e filho'],
        correct:1, explanation:'Uma regra CSS tem: seletor (quem) + bloco de declarações entre chaves (como). Cada declaração é um par propriedade: valor com ponto e vírgula.' },
    ],
    challenge: {
      title:'Estilize sua primeira página',
      desc:'Aplique CSS a uma página HTML básica usando as três formas de aplicação.',
      tasks:[
        'Crie um arquivo style.css externo e linke no <head>',
        'Defina cor de fundo escura para o body e cor clara para o texto',
        'Estilize o h1 com a cor #00e5a0 e font-size de 2rem',
        'Adicione uma classe .card com background, border-radius e padding',
        'Use um style inline em apenas UM elemento (e comente por que evitar)',
      ],
    },
  },

  /* ──────────────────────────────────────────────────────────
     CAP 02 — Seletores e especificidade
  ────────────────────────────────────────────────────────── */
  'css-02': {
    moduleId: 'css',
    title: 'Seletores e especificidade',
    desc: 'Seletores são o coração do CSS. Saber selecionar exatamente o elemento certo — sem afetar outros — é o que separa devs iniciantes de profissionais.',
    blocks: [
      { type:'text', title:'Tipos de seletores',
        body:'<strong>Tag:</strong> <code>p { }</code> — seleciona todos os <code>&lt;p&gt;</code>. <strong>Classe:</strong> <code>.card { }</code> — seleciona todos com <code>class="card"</code> (um elemento pode ter várias classes). <strong>ID:</strong> <code>#titulo { }</code> — seleciona o elemento único com <code>id="titulo"</code>. <strong>Universal:</strong> <code>* { }</code> — seleciona tudo (use com cuidado). <strong>Atributo:</strong> <code>input[type="email"] { }</code> — seleciona por atributo.' },
      { type:'text', title:'Seletores combinados',
        body:'<strong>Descendente:</strong> <code>div p</code> — todo <code>&lt;p&gt;</code> dentro de qualquer <code>&lt;div&gt;</code>. <strong>Filho direto:</strong> <code>div > p</code> — <code>&lt;p&gt;</code> filho imediato de <code>&lt;div&gt;</code>. <strong>Adjacente:</strong> <code>h2 + p</code> — <code>&lt;p&gt;</code> imediatamente após um <code>&lt;h2&gt;</code>. <strong>Grupo:</strong> <code>h1, h2, h3</code> — aplica o mesmo estilo a vários seletores.' },
      { type:'text', title:'Especificidade — quem vence o conflito',
        body:'Quando dois seletores disputam o mesmo elemento, a especificidade decide quem vence. Pesos: <strong>Inline style = 1000</strong>, <strong>ID = 100</strong>, <strong>Classe/pseudo-classe/atributo = 10</strong>, <strong>Tag/pseudo-elemento = 1</strong>. Exemplo: <code>.card h2</code> vale 11 pontos (10+1). <code>#hero h2</code> vale 101 (100+1). O maior número vence.' },
      { type:'callout',
        body:'<strong>Regra de ouro:</strong> Evite IDs para estilização CSS — eles têm especificidade muito alta e tornam difícil sobrescrever estilos depois. Prefira classes. Reserve <code>id</code> para JavaScript e âncoras HTML. E <strong>nunca use <code>!important</code></strong> como solução — é o sinal de que a arquitetura CSS está bagunçada.' },
    ],
    editor: {
      tabs: ['HTML'],
      code: [`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Especificidade CSS</title>
  <style>
    /* Tag — especificidade: 1 */
    p {
      color: gray;
    }

    /* Classe — especificidade: 10 */
    .destaque {
      color: #00e5a0;
    }

    /* ID — especificidade: 100 */
    #unico {
      color: #ff6b35;
    }

    /* Combinado: classe + tag — especificidade: 11 */
    .card p {
      font-size: 0.9rem;
      color: #8a95a3;
    }

    /* Qual cor vai aparecer em cada parágrafo? */
  </style>
</head>
<body>
  <p>Parágrafo comum — cor: gray (tag, esp=1)</p>
  <p class="destaque">Com classe — cor: verde (classe, esp=10)</p>
  <p id="unico">Com ID — cor: laranja (id, esp=100)</p>

  <div class="card">
    <p>Dentro de .card — cor: #8a95a3 (classe+tag, esp=11)</p>
    <p class="destaque">Dentro de .card com .destaque — qual vence?</p>
  </div>
</body>
</html>`],
    },
    quiz: [
      { q:'Qual seletor tem maior especificidade?',
        opts:['p.card','#header','.nav a','div > span'],
        correct:1, explanation:'#header tem especificidade 100 (ID). p.card tem 11 (tag+classe). .nav a tem 11. div > span tem 2. IDs sempre vencem classes e tags.' },
      { q:'Qual seletor seleciona um <p> filho DIRETO de uma <div>?',
        opts:['div p','div + p','div > p','div ~ p'],
        correct:2, explanation:'div > p seleciona <p> que é filho direto (imediato) de <div>. div p selecionaria qualquer <p> descendente, mesmo que aninhado dentro de outro elemento.' },
      { q:'Por que evitar !important no CSS?',
        opts:['É obsoleto no CSS3','Torna impossível sobrescrever estilos depois, quebrando a cascata','Funciona apenas no Chrome','Aumenta o tamanho do arquivo'],
        correct:1, explanation:'!important quebra o fluxo natural da cascata CSS. Quando você começa a usá-lo, precisa de mais !important para sobrescrever, criando um ciclo difícil de manter.' },
    ],
    challenge: {
      title:'Mapa de especificidade',
      desc:'Crie um arquivo CSS testando diferentes seletores e prevendo qual estilo vencerá.',
      tasks:[
        'Crie 4 parágrafos: estilize um com tag, um com classe, um com ID, um com inline',
        'Preveja e confirme qual cor aparece em cada um',
        'Use o seletor filho direto (>) para estilizar apenas o primeiro nível de uma lista',
        'Crie um seletor de atributo para estilizar inputs do tipo text diferente dos do tipo email',
      ],
    },
  },

  /* ──────────────────────────────────────────────────────────
     CAP 03 — Box Model
  ────────────────────────────────────────────────────────── */
  'css-03': {
    moduleId: 'css',
    title: 'Box Model — o modelo de caixa',
    desc: 'Todo elemento HTML é uma caixa. Entender as camadas dessa caixa — content, padding, border, margin — é o fundamento de todo layout CSS.',
    blocks: [
      { type:'text', title:'As quatro camadas do Box Model',
        body:'De dentro para fora: <strong>Content</strong> — o conteúdo real (texto, imagem). <strong>Padding</strong> — espaço interno entre o conteúdo e a borda. <strong>Border</strong> — a linha ao redor do elemento. <strong>Margin</strong> — espaço externo entre este elemento e os vizinhos. Quando você define <code>width: 300px</code>, por padrão isso se refere apenas ao conteúdo — padding e border são adicionados por fora, aumentando o tamanho total.' },
      { type:'text', title:'box-sizing: border-box — a propriedade mais importante do CSS',
        body:'Com o comportamento padrão (<code>content-box</code>), <code>width: 300px</code> mais <code>padding: 20px</code> e <code>border: 1px</code> resulta em um elemento de 342px de largura total. Isso é confuso. Com <code>box-sizing: border-box</code>, o elemento terá exatamente 300px — padding e border ficam para dentro. Todo projeto moderno começa com <code>* { box-sizing: border-box; }</code>.' },
      { type:'text', title:'Margin, padding e atalhos',
        body:'Você pode definir cada lado separadamente (<code>margin-top, margin-right, margin-bottom, margin-left</code>) ou usar atalhos: <code>margin: 10px</code> (todos os lados), <code>margin: 10px 20px</code> (cima/baixo esquerda/direita), <code>margin: 10px 20px 5px 15px</code> (top, right, bottom, left — sentido horário). O mesmo se aplica ao padding.' },
      { type:'callout',
        body:'<strong>margin: 0 auto</strong> é o truque clássico para centralizar um elemento block horizontalmente. Define margin-top e margin-bottom como 0, e margin-left e margin-right como "auto" — o navegador divide o espaço disponível igualmente nos dois lados. O elemento precisa ter um width definido para isso funcionar.' },
    ],
    editor: {
      tabs: ['HTML'],
      code: [`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Box Model</title>
  <style>
    /* Reset fundamental — todo projeto começa com isso */
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background: #0a0c0f;
      color: #e8edf2;
      font-family: sans-serif;
      padding: 2rem;
    }

    .caixa {
      /* Content */
      width: 300px;

      /* Padding — espaço interno */
      padding: 20px;

      /* Border */
      border: 2px solid #00e5a0;

      /* Margin — espaço externo */
      margin: 20px auto;

      background: #13181f;
      border-radius: 8px;
    }

    /* Com border-box: largura total = 300px (padding e border ficam dentro) */
    /* Sem border-box: largura total = 300 + 40 + 4 = 344px */
  </style>
</head>
<body>

  <div class="caixa">
    <p>Esta caixa tem:</p>
    <p>• width: 300px</p>
    <p>• padding: 20px</p>
    <p>• border: 2px</p>
    <p>• margin: 20px auto (centralizada)</p>
  </div>

</body>
</html>`],
    },
    quiz: [
      { q:'Com box-sizing: content-box (padrão), um elemento com width:200px, padding:10px e border:2px tem qual largura total?',
        opts:['200px','212px','224px','222px'],
        correct:2, explanation:'200px (content) + 10px*2 (padding) + 2px*2 (border) = 224px. Com border-box, o total seria 200px — por isso todo projeto moderno usa border-box.' },
      { q:'O que faz margin: 0 auto num elemento block?',
        opts:['Remove todas as margens','Centraliza horizontalmente (margens automáticas dos lados)','Centraliza vertical e horizontalmente','Define margem de 0 em todos os lados'],
        correct:1, explanation:'margin: 0 auto define top/bottom como 0 e left/right como auto — o browser divide o espaço lateral igualmente, centralizando o elemento. Precisa de width definido.' },
      { q:'Qual a ordem correta dos valores em margin: 10px 20px 5px 15px?',
        opts:['top, bottom, left, right','left, right, top, bottom','top, right, bottom, left','right, top, left, bottom'],
        correct:2, explanation:'A ordem é sempre clockwise (sentido horário): top, right, bottom, left. Uma forma de lembrar: TRBL (TRouBLe).' },
    ],
    challenge: {
      title:'Card com Box Model perfeito',
      desc:'Construa um card controlando precisamente cada camada do box model.',
      tasks:[
        'Adicione * { box-sizing: border-box } no início do CSS',
        'Crie um .card com width: 350px, padding: 24px, border e border-radius',
        'Centralize o card na página com margin: 2rem auto',
        'Use o DevTools (F12) para inspecionar o box model do card',
        'Teste: adicione mais padding e confirme que a largura total continua 350px',
      ],
    },
  },

  /* ──────────────────────────────────────────────────────────
     CAP 04 — Tipografia
  ────────────────────────────────────────────────────────── */
  'css-04': {
    moduleId: 'css',
    title: 'Tipografia — fontes e texto',
    desc: 'Tipografia é responsável por 90% do design de uma interface. Saber controlar fontes, tamanhos, espaçamentos e pesos transforma completamente a qualidade visual de um projeto.',
    blocks: [
      { type:'text', title:'Famílias de fontes',
        body:'<code>font-family</code> define a fonte. Sempre inclua uma família genérica como fallback: <code>font-family: "Inter", sans-serif</code>. Se o browser não tiver "Inter", usa qualquer fonte sans-serif do sistema. As famílias genéricas são: <code>serif</code> (com serifa, ex: Times), <code>sans-serif</code> (sem serifa, ex: Arial), <code>monospace</code> (largura fixa, ex: Courier — ótima para código), <code>cursive</code> e <code>fantasy</code>.' },
      { type:'text', title:'Google Fonts — fontes externas',
        body:'O Google Fonts oferece centenas de fontes gratuitas. Para usar: acesse fonts.google.com, escolha a fonte, copie o <code>&lt;link&gt;</code> e cole no <code>&lt;head&gt;</code> antes do seu CSS. Depois use normalmente com <code>font-family: "Nome da Fonte", fallback</code>. Atenção: cada fonte extra que você carrega afeta o tempo de carregamento — use no máximo 2-3 fontes por projeto.' },
      { type:'text', title:'Propriedades essenciais de texto',
        body:'<code>font-size</code>: tamanho (px, rem, em). <code>font-weight</code>: peso (100-900, ou bold). <code>font-style</code>: normal, italic. <code>line-height</code>: altura da linha — para textos longos, 1.6-1.8 melhora muito a leitura. <code>letter-spacing</code>: espaço entre letras. <code>text-transform</code>: uppercase, lowercase, capitalize. <code>text-align</code>: left, center, right, justify.' },
      { type:'callout',
        body:'<strong>rem vs em vs px:</strong> <code>px</code> é absoluto. <code>em</code> é relativo ao elemento pai — 1.5em num elemento filho de 16px = 24px. <code>rem</code> é relativo ao root (html) — mais previsível. Profissionais usam <code>rem</code> para tamanhos de fonte e <code>px</code> para bordas e sombras. Isso facilita acessibilidade: quando o usuário aumenta o tamanho da fonte do navegador, elementos em rem escalam junto.' },
    ],
    editor: {
      tabs: ['HTML'],
      code: [`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Tipografia CSS</title>
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Figtree:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Figtree', sans-serif;
      background: #0a0c0f;
      color: #e8edf2;
      padding: 3rem 2rem;
      font-size: 16px; /* base = 1rem */
      line-height: 1.6;
    }

    h1 {
      font-family: 'Syne', sans-serif;
      font-size: 3rem;        /* 48px */
      font-weight: 800;
      letter-spacing: -0.02em; /* ligeiro kerning negativo em títulos grandes */
      color: #00e5a0;
      margin-bottom: 0.5rem;
    }

    h2 {
      font-family: 'Syne', sans-serif;
      font-size: 1.5rem;
      font-weight: 700;
      margin: 2rem 0 0.75rem;
    }

    p {
      font-size: 1rem;
      line-height: 1.8;    /* espaçamento confortável para leitura */
      color: #8a95a3;
      max-width: 65ch;     /* ch = largura do "0" — ~65 chars é ideal para leitura */
    }

    .badge {
      display: inline-block;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      background: rgba(0,229,160,0.1);
      color: #00e5a0;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
    }

    code {
      font-family: 'JetBrains Mono', 'Courier New', monospace;
      font-size: 0.875rem;
      background: #1e242d;
      color: #ff6b35;
      padding: 2px 6px;
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <span class="badge">Módulo 02</span>
  <h1>Tipografia CSS</h1>
  <p>A tipografia é responsável por ~90% do design de uma interface.
     A <code>line-height: 1.8</code> desta linha melhora a legibilidade.
     E o <code>max-width: 65ch</code> mantém o comprimento ideal de linha.</p>

  <h2>Por que usar rem?</h2>
  <p>Rem é relativo ao elemento raiz. Se o usuário aumentar a fonte
     no navegador, tudo que usa rem escala automaticamente.</p>
</body>
</html>`],
    },
    quiz: [
      { q:'Qual unidade é mais indicada para font-size em projetos acessíveis?',
        opts:['px','%','rem','vw'],
        correct:2, explanation:'rem (root em) é relativo ao tamanho de fonte do elemento html. Quando o usuário ajusta o tamanho de fonte nas configurações do navegador, elementos em rem escalam automaticamente — px não.' },
      { q:'O que é line-height: 1.8?',
        opts:['Espaçamento de 1.8px entre linhas','A altura da linha é 1.8x o tamanho da fonte','Define 1.8 linhas de altura fixa','Espaçamento de 180% entre letras'],
        correct:1, explanation:'line-height sem unidade é um multiplicador do font-size atual. 1.8 significa que a linha terá 1.8x o tamanho da fonte. Para texto longo, 1.6-1.8 é ideal para leitura.' },
      { q:'Para que serve max-width: 65ch num parágrafo?',
        opts:['Limita a 65 pixels','Limita a 65 caracteres de largura — comprimento ideal para leitura confortável','Define 65% da largura do pai','Mede 65 centímetros'],
        correct:1, explanation:'ch é relativo à largura do caractere "0". max-width: 65ch limita o parágrafo a ~65 caracteres por linha — a faixa considerada ideal para legibilidade por pesquisas de UX.' },
    ],
    challenge: {
      title:'Sistema tipográfico',
      desc:'Crie um sistema tipográfico consistente para uma página de blog.',
      tasks:[
        'Importe duas fontes do Google Fonts: uma display para títulos, uma sans-serif para texto',
        'Defina uma escala de tamanhos: h1 (3rem), h2 (2rem), h3 (1.5rem), p (1rem)',
        'Aplique line-height: 1.8 nos parágrafos e max-width: 65ch',
        'Crie um estilo para código inline com font-family monospace e cor diferente',
        'Use letter-spacing negativo nos títulos grandes para melhor aparência',
      ],
    },
  },

  /* ──────────────────────────────────────────────────────────
     CAP 05 — Cores e background
  ────────────────────────────────────────────────────────── */
  'css-05': {
    moduleId: 'css',
    title: 'Cores e background',
    desc: 'CSS oferece múltiplos formatos de cor e recursos poderosos de background — gradientes, imagens, posicionamento. Dominar cores é essencial para UI de qualidade.',
    blocks: [
      { type:'text', title:'Formatos de cor no CSS',
        body:'<strong>Hexadecimal:</strong> <code>#00e5a0</code> (ou shorthand <code>#0ea</code>). <strong>RGB:</strong> <code>rgb(0, 229, 160)</code>. <strong>RGBA:</strong> <code>rgba(0, 229, 160, 0.5)</code> — com transparência (0=transparente, 1=opaco). <strong>HSL:</strong> <code>hsl(160, 100%, 45%)</code> — Hue (cor), Saturation (saturação), Lightness (luminosidade). HSL é o mais intuitivo para ajustar cores manualmente. <strong>CSS Variables:</strong> <code>var(--accent)</code> — reutilizável em todo o projeto.' },
      { type:'text', title:'CSS Custom Properties (variáveis)',
        body:'Variáveis CSS são definidas com <code>--nome: valor</code> e usadas com <code>var(--nome)</code>. Declare no <code>:root</code> para disponibilizá-las globalmente. Exemplo: <code>:root { --cor-primaria: #00e5a0; }</code>. Isso cria um sistema de design consistente — mudar a cor primária em um lugar atualiza tudo. É como ter um "token de design" em CSS puro.' },
      { type:'text', title:'Background — além da cor sólida',
        body:'<code>background-color</code>: cor sólida. <code>background-image: url(...)</code>: imagem de fundo. <code>background-size: cover</code>: cobre o elemento mantendo proporção. <code>background-position: center</code>: centraliza. <code>background-repeat: no-repeat</code>: sem repetição. <strong>Gradientes:</strong> <code>background: linear-gradient(135deg, #00e5a0, #4fc3f7)</code> — do verde ao azul em diagonal.' },
      { type:'callout',
        body:'<strong>opacity vs rgba:</strong> <code>opacity: 0.5</code> torna o elemento E todo seu conteúdo semitransparente — incluindo texto dentro. <code>background: rgba(0,0,0,0.5)</code> torna apenas o background semitransparente, sem afetar o conteúdo. Para sobreposições e cards com transparência, sempre prefira rgba.' },
    ],
    editor: {
      tabs: ['HTML'],
      code: [`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Cores CSS</title>
  <style>
    /* Variáveis CSS — sistema de design */
    :root {
      --cor-primaria:  #00e5a0;
      --cor-secundaria: #ff6b35;
      --cor-fundo:     #0a0c0f;
      --cor-texto:     #e8edf2;
      --cor-sutil:     #8a95a3;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: var(--cor-fundo);
      color: var(--cor-texto);
      font-family: sans-serif;
      padding: 2rem;
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .card {
      width: 200px; padding: 1.5rem;
      border-radius: 12px;
      font-weight: 600;
    }

    .hex    { background: #13181f; border: 1px solid #00e5a0; color: #00e5a0; }
    .rgba   { background: rgba(0, 229, 160, 0.1); color: var(--cor-primaria); }
    .hsl    { background: hsl(160, 50%, 10%); color: hsl(160, 100%, 45%); }

    .gradiente-linear {
      background: linear-gradient(135deg, #00e5a0, #4fc3f7);
      color: #000;
      width: 420px;
    }

    .gradiente-radial {
      background: radial-gradient(circle, #ff6b35, #0a0c0f);
      color: white;
    }
  </style>
</head>
<body>
  <div class="card hex">Hexadecimal<br>#00e5a0</div>
  <div class="card rgba">RGBA<br>rgba(0,229,160,0.1)</div>
  <div class="card hsl">HSL<br>hsl(160, 50%, 10%)</div>
  <div class="card gradiente-linear">linear-gradient(135deg, verde → azul)</div>
  <div class="card gradiente-radial">radial-gradient(laranja → escuro)</div>
</body>
</html>`],
    },
    quiz: [
      { q:'Qual a diferença entre opacity:0.5 e background:rgba(0,0,0,0.5)?',
        opts:['São iguais visualmente','opacity afeta o elemento inteiro (incluindo texto), rgba afeta apenas o background','rgba é mais moderno','opacity só funciona em divs'],
        correct:1, explanation:'opacity torna o elemento e todo seu conteúdo semitransparente. rgba(r,g,b,0.5) torna apenas a cor de fundo semitransparente — o texto continua totalmente visível.' },
      { q:'Onde se declaram variáveis CSS para ficarem disponíveis globalmente?',
        opts:['No body','No html','No :root','No * (universal)'],
        correct:2, explanation:':root é o seletor de mais alto nível — equivale ao elemento html com especificidade maior. Variáveis declaradas aqui estão disponíveis em todo o documento.' },
      { q:'O que faz background-size: cover?',
        opts:['Cobre 100% de largura mantendo a altura original','Reduz a imagem para caber no elemento','Cobre todo o elemento mantendo a proporção da imagem, cortando o excesso','Cria uma cópia de fundo'],
        correct:2, explanation:'cover faz a imagem cobrir todo o elemento mantendo sua proporção. Se necessário, partes da imagem são cortadas. É a escolha certa para backgrounds de hero sections.' },
    ],
    challenge: {
      title:'Paleta com variáveis CSS',
      desc:'Crie um sistema de cores com variáveis e aplique em múltiplos componentes.',
      tasks:[
        'Defina pelo menos 5 variáveis CSS no :root: primária, secundária, fundo, texto, borda',
        'Crie cards usando apenas as variáveis (sem cores hardcoded)',
        'Aplique um gradiente linear num banner/hero section',
        'Troque o valor de --cor-primaria em :root e veja tudo atualizar automaticamente',
        'Use rgba para criar um card com background semitransparente sobre um gradiente',
      ],
    },
  },

  /* ──────────────────────────────────────────────────────────
     CAP 06 — Flexbox
  ────────────────────────────────────────────────────────── */
  'css-06': {
    moduleId: 'css',
    title: 'Flexbox — layout unidimensional',
    desc: 'Flexbox revolucionou o layout CSS. Com ele, alinhar elementos no centro da tela, distribuir espaço e criar linhas responsivas ficou trivial.',
    blocks: [
      { type:'text', title:'O que é Flexbox',
        body:'Flexbox (Flexible Box) é um sistema de layout unidimensional — trabalha em uma direção por vez (linha ou coluna). Você ativa com <code>display: flex</code> no elemento pai (flex container). Os filhos diretos viram flex items e ganham superpoderes de posicionamento. Antes do Flexbox, centralizar verticalmente um elemento era um pesadelo. Hoje: <code>display: flex; align-items: center; justify-content: center</code> — pronto.' },
      { type:'text', title:'Os dois eixos do Flexbox',
        body:'O Flexbox tem dois eixos: <strong>main axis</strong> (eixo principal) e <strong>cross axis</strong> (eixo cruzado). Por padrão, o main axis é horizontal (row). <code>justify-content</code> controla o eixo principal. <code>align-items</code> controla o eixo cruzado. Se você mudar para <code>flex-direction: column</code>, os eixos invertem: justify-content passa a controlar vertical e align-items passa a controlar horizontal.' },
      { type:'text', title:'Propriedades essenciais',
        body:'No container: <code>flex-direction</code> (row/column), <code>justify-content</code> (start/center/end/space-between/space-around), <code>align-items</code> (start/center/end/stretch), <code>flex-wrap: wrap</code> (permite quebra de linha), <code>gap</code> (espaço entre items). Nos items: <code>flex: 1</code> (ocupa espaço disponível igualmente), <code>align-self</code> (sobrescreve align-items para um item específico).' },
      { type:'callout',
        body:'<strong>O truque mais usado:</strong> Para centralizar qualquer coisa dentro de um container, use <code>display: flex; align-items: center; justify-content: center;</code> no container. Funciona para botões, cards, modais, hero sections. É o pattern de centralização mais comum do CSS moderno.' },
    ],
    editor: {
      tabs: ['HTML'],
      code: [`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Flexbox</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #0a0c0f; color: #e8edf2; font-family: sans-serif; padding: 2rem; }

    /* NAVBAR — flex clássico: logo à esquerda, nav à direita */
    .navbar {
      display: flex;
      justify-content: space-between; /* distribui nos extremos */
      align-items: center;            /* centraliza verticalmente */
      background: #13181f;
      padding: 1rem 2rem;
      border-radius: 12px;
      margin-bottom: 2rem;
    }
    .nav-links { display: flex; gap: 1.5rem; list-style: none; }
    .nav-links a { color: #8a95a3; text-decoration: none; }

    /* CARDS — flex com wrap para responsividade */
    .cards {
      display: flex;
      flex-wrap: wrap;  /* quebra linha quando não cabe */
      gap: 1rem;
      margin-bottom: 2rem;
    }
    .card {
      flex: 1;          /* cada card ocupa espaço igual */
      min-width: 150px; /* tamanho mínimo antes de quebrar */
      background: #13181f;
      border: 1px solid #1e242d;
      border-radius: 12px;
      padding: 1.5rem;
    }

    /* CENTRALIZAÇÃO PERFEITA */
    .hero {
      height: 200px;
      background: linear-gradient(135deg, #13181f, #1e242d);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 0.5rem;
    }
    .hero h2 { color: #00e5a0; }
    .hero p  { color: #8a95a3; font-size: 0.875rem; }
  </style>
</head>
<body>

  <nav class="navbar">
    <strong style="color:#00e5a0">DevStart</strong>
    <ul class="nav-links">
      <li><a href="#">HTML</a></li>
      <li><a href="#">CSS</a></li>
      <li><a href="#">JS</a></li>
    </ul>
  </nav>

  <div class="cards">
    <div class="card"><h3>HTML</h3><p>Estrutura</p></div>
    <div class="card"><h3>CSS</h3><p>Estilo</p></div>
    <div class="card"><h3>JS</h3><p>Interação</p></div>
    <div class="card"><h3>Git</h3><p>Versionamento</p></div>
  </div>

  <div class="hero">
    <h2>Centralização perfeita</h2>
    <p>display: flex + align-items + justify-content</p>
  </div>

</body>
</html>`],
    },
    quiz: [
      { q:'O que faz justify-content: space-between?',
        opts:['Centraliza todos os itens','Coloca todos os itens juntos no centro','Distribui os itens com espaço igual entre eles, colando o primeiro e último nas bordas','Adiciona espaço igual ao redor de cada item'],
        correct:2, explanation:'space-between distribui o espaço disponível ENTRE os itens. O primeiro item fica na borda inicial e o último na borda final. Perfeito para navbars.' },
      { q:'Com flex-direction: column, qual propriedade controla o alinhamento horizontal?',
        opts:['justify-content','align-items','flex-wrap','align-content'],
        correct:1, explanation:'Com flex-direction: column, o main axis vira vertical (justify-content controla vertical) e o cross axis vira horizontal (align-items controla horizontal). Os eixos se invertem.' },
      { q:'O que faz flex: 1 num item?',
        opts:['Define width: 1px','Faz o item crescer para preencher o espaço disponível, dividindo igualmente com outros flex:1','Define apenas 1 item visível','Remove o item do fluxo flex'],
        correct:1, explanation:'flex: 1 é atalho para flex-grow:1, flex-shrink:1, flex-basis:0. O item cresce para ocupar espaço disponível. Vários items com flex:1 dividem o espaço igualmente.' },
    ],
    challenge: {
      title:'Layout completo com Flexbox',
      desc:'Construa um layout de página completo usando apenas Flexbox.',
      tasks:[
        'Crie uma navbar com logo à esquerda e links à direita usando justify-content: space-between',
        'Crie uma seção hero centralizada com display:flex, align-items e justify-content: center',
        'Crie uma grade de 3 cards usando flex:1 e flex-wrap:wrap com gap',
        'Crie um footer com copyright à esquerda e links à direita',
        'Teste responsividade: reduza a janela e veja os cards quebrarem linha',
      ],
    },
  },

  /* ──────────────────────────────────────────────────────────
     CAP 07 — CSS Grid
  ────────────────────────────────────────────────────────── */
  'css-07': {
    moduleId: 'css',
    title: 'CSS Grid — layout bidimensional',
    desc: 'CSS Grid é o sistema de layout mais poderoso do CSS. Ele trabalha em duas dimensões simultaneamente — linhas e colunas — tornando layouts complexos simples.',
    blocks: [
      { type:'text', title:'Grid vs Flexbox — quando usar cada um',
        body:'Flexbox é unidimensional: você controla itens numa linha OU numa coluna. Grid é bidimensional: você controla linhas E colunas simultaneamente. Use <strong>Flexbox</strong> para componentes (navbar, botões, cards internos, alinhamento de ícone+texto). Use <strong>Grid</strong> para layouts de página (estrutura geral, galerias de imagens, dashboards). Na prática, os dois trabalham juntos.' },
      { type:'text', title:'Criando um grid',
        body:'Ative com <code>display: grid</code> no container. <code>grid-template-columns</code> define as colunas. <code>grid-template-rows</code> define as linhas. A unidade <code>fr</code> (fraction) distribui o espaço disponível: <code>grid-template-columns: 1fr 2fr 1fr</code> cria 3 colunas onde a do meio é o dobro das outras. <code>repeat(3, 1fr)</code> cria 3 colunas iguais. <code>gap</code> define o espaço entre células.' },
      { type:'text', title:'auto-fit e minmax — grid responsivo sem media query',
        body:'A combinação mais poderosa do Grid: <code>grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))</code>. Isso cria colunas que: têm no mínimo 250px, podem crescer para ocupar espaço disponível (<code>1fr</code>), e se auto-ajustam — em telas grandes ficam 4 por linha, em tablets 2, em celular 1. Tudo isso sem uma única media query.' },
      { type:'callout',
        body:'<strong>Grid Areas</strong> é o recurso mais visual do Grid. Você nomeia as áreas e monta o layout como um diagrama: <code>grid-template-areas: "header header" "sidebar main" "footer footer"</code>. Cada elemento recebe <code>grid-area: header</code> (ou main, sidebar, etc.). O resultado é um layout que você pode ler como um mapa.' },
    ],
    editor: {
      tabs: ['HTML'],
      code: [`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>CSS Grid</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #0a0c0f; color: #e8edf2; font-family: sans-serif; }

    /* LAYOUT DE PÁGINA COM GRID AREAS */
    .page-layout {
      display: grid;
      grid-template-areas:
        "header  header"
        "sidebar main"
        "footer  footer";
      grid-template-columns: 240px 1fr;
      grid-template-rows: auto 1fr auto;
      min-height: 100vh;
      gap: 0;
    }

    .header  { grid-area: header;  background: #13181f; padding: 1rem 2rem;
               display: flex; align-items: center; justify-content: space-between; }
    .sidebar { grid-area: sidebar; background: #111418; padding: 1.5rem; border-right: 1px solid #1e242d; }
    .main    { grid-area: main;    padding: 2rem; }
    .footer  { grid-area: footer;  background: #13181f; padding: 1rem 2rem; text-align: center;
               font-size: 0.875rem; color: #4a5568; border-top: 1px solid #1e242d; }

    /* GALERIA RESPONSIVA SEM MEDIA QUERY */
    .galeria {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 1rem;
      margin-top: 1.5rem;
    }
    .foto {
      aspect-ratio: 1;
      background: #1e242d;
      border-radius: 8px;
      display: flex; align-items: center; justify-content: center;
      color: #4a5568; font-size: 0.75rem;
    }

    h2 { color: #00e5a0; margin-bottom: 0.5rem; font-size: 1rem; }
    .nav a { color: #8a95a3; text-decoration: none; margin-left: 1rem; font-size: 0.875rem; }
  </style>
</head>
<body>
  <div class="page-layout">

    <header class="header">
      <strong style="color:#00e5a0">DevStart</strong>
      <nav class="nav">
        <a href="#">Início</a>
        <a href="#">Cursos</a>
        <a href="#">Perfil</a>
      </nav>
    </header>

    <aside class="sidebar">
      <h2>Módulos</h2>
      <p style="color:#4a5568;font-size:.85rem">HTML · CSS · JS · IA</p>
    </aside>

    <main class="main">
      <h2>Galeria (auto-fit + minmax)</h2>
      <p style="color:#8a95a3;font-size:.875rem">Redimensione a janela — os cards se ajustam automaticamente.</p>
      <div class="galeria">
        <div class="foto">img 1</div>
        <div class="foto">img 2</div>
        <div class="foto">img 3</div>
        <div class="foto">img 4</div>
        <div class="foto">img 5</div>
        <div class="foto">img 6</div>
      </div>
    </main>

    <footer class="footer">© 2024 DevStart</footer>

  </div>
</body>
</html>`],
    },
    quiz: [
      { q:'O que faz grid-template-columns: repeat(3, 1fr)?',
        opts:['Cria 3 linhas iguais','Cria 3 colunas que dividem o espaço disponível igualmente','Repete o grid 3 vezes','Cria colunas de 3px'],
        correct:1, explanation:'repeat(3, 1fr) é atalho para 1fr 1fr 1fr. Cria 3 colunas que dividem o espaço disponível em partes iguais. fr = fraction (fração do espaço disponível).' },
      { q:'Qual a principal diferença entre Flexbox e Grid?',
        opts:['Grid é mais antigo','Flexbox é unidimensional (linha ou coluna), Grid é bidimensional (linhas E colunas)','Grid só funciona em Firefox','Flexbox não suporta gap'],
        correct:1, explanation:'Flexbox trabalha em uma dimensão por vez. Grid trabalha simultaneamente em linhas e colunas. Para layouts de página, Grid. Para alinhamento de componentes, Flexbox.' },
      { q:'O que faz repeat(auto-fit, minmax(250px, 1fr))?',
        opts:['Cria exatamente 250 colunas','Cria colunas responsivas que têm min 250px e crescem automaticamente — sem media query','Repete o grid automaticamente 250 vezes','Define grid de 250px fixo'],
        correct:1, explanation:'auto-fit cria quantas colunas couberem. minmax(250px, 1fr) garante mínimo 250px e máximo 1fr. O resultado é uma grade responsiva que se adapta sem media queries.' },
    ],
    challenge: {
      title:'Dashboard com Grid',
      desc:'Construa um layout de dashboard usando Grid Areas e galeria responsiva.',
      tasks:[
        'Crie um layout de página com grid-template-areas: header, sidebar, main, footer',
        'Use grid-template-columns: 220px 1fr para sidebar fixa + conteúdo flexível',
        'Dentro do main, crie cards de métricas com repeat(auto-fit, minmax(200px, 1fr))',
        'Use gap consistente em todo o layout',
        'Teste: reduza a tela e veja os cards de métrica se adaptarem',
      ],
    },
  },

  /* ──────────────────────────────────────────────────────────
     CAP 08 — Posicionamento
  ────────────────────────────────────────────────────────── */
  'css-08': {
    moduleId: 'css',
    title: 'Posicionamento CSS',
    desc: 'Position é a propriedade que tira elementos do fluxo normal do documento. Entender static, relative, absolute, fixed e sticky é essencial para tooltips, modais, navbars fixas e overlays.',
    blocks: [
      { type:'text', title:'Os 5 valores de position',
        body:'<strong>static</strong>: padrão — segue o fluxo normal do documento. <strong>relative</strong>: posicionado em relação à sua posição original no fluxo — ainda ocupa espaço. <strong>absolute</strong>: posicionado em relação ao ancestral posicionado mais próximo (não-static) — sai do fluxo. <strong>fixed</strong>: posicionado em relação à viewport — permanece no lugar ao rolar a página. <strong>sticky</strong>: híbrido — se comporta como relative até atingir um threshold, depois como fixed.' },
      { type:'text', title:'O par relative + absolute',
        body:'O pattern mais usado: o pai recebe <code>position: relative</code> (cria um novo contexto de posicionamento) e o filho recebe <code>position: absolute</code> com <code>top/right/bottom/left</code> para se posicionar dentro do pai. Exemplo clássico: badge de notificação no canto de um ícone, tooltip sobre um botão, overlay sobre uma imagem.' },
      { type:'text', title:'Fixed e Sticky',
        body:'<code>position: fixed</code> gruda o elemento na viewport — perfeito para navbars e botões de "voltar ao topo". O elemento sai completamente do fluxo e não ocupa mais espaço. <code>position: sticky</code> é mais inteligente: o elemento rola normalmente com a página mas "gruda" quando atinge a posição definida. Perfeito para headers de tabela e menus de seções.' },
      { type:'callout',
        body:'<strong>z-index só funciona em elementos posicionados.</strong> Se você tentar usar z-index num elemento com position: static, nada acontece. z-index define a ordem de empilhamento — número maior fica na frente. Crie um sistema consistente: modal em z-index 1000, overlay em 999, tooltip em 500, navbar em 100.' },
    ],
    editor: {
      tabs: ['HTML'],
      code: [`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Posicionamento CSS</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #0a0c0f; color: #e8edf2; font-family: sans-serif; padding: 5rem 2rem 2rem; }

    /* FIXED — navbar gruda no topo */
    .navbar {
      position: fixed;
      top: 0; left: 0; right: 0;
      background: rgba(17, 20, 24, 0.95);
      backdrop-filter: blur(10px);
      padding: 1rem 2rem;
      z-index: 100;
      display: flex; justify-content: space-between; align-items: center;
      border-bottom: 1px solid #1e242d;
    }

    /* RELATIVE + ABSOLUTE — badge sobre ícone */
    .icone-wrap {
      position: relative;
      display: inline-block;
      margin: 2rem 0;
    }
    .icone {
      width: 56px; height: 56px;
      background: #13181f;
      border-radius: 12px;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.5rem;
    }
    .badge {
      position: absolute;
      top: -6px; right: -6px;  /* sai do fluxo e se posiciona no canto */
      background: #ff4d4d;
      color: white;
      font-size: 0.7rem;
      font-weight: 700;
      width: 20px; height: 20px;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
    }

    /* STICKY — header de seção gruda ao rolar */
    .section-header {
      position: sticky;
      top: 64px; /* fica logo abaixo da navbar fixed */
      background: #0a0c0f;
      padding: 0.75rem 0;
      color: #00e5a0;
      font-weight: 700;
      border-bottom: 1px solid #1e242d;
      z-index: 50;
    }

    .content { padding: 1rem 0; color: #8a95a3; line-height: 1.8; }
  </style>
</head>
<body>

  <!-- FIXED -->
  <nav class="navbar">
    <strong style="color:#00e5a0">DevStart</strong>
    <span style="font-size:.85rem;color:#8a95a3">position: fixed</span>
  </nav>

  <!-- RELATIVE + ABSOLUTE -->
  <div class="icone-wrap">
    <div class="icone">🔔</div>
    <div class="badge">3</div>
  </div>
  <p style="color:#8a95a3;font-size:.875rem;margin-bottom:2rem">
    Badge com position: absolute no canto do ícone (position: relative)
  </p>

  <!-- STICKY -->
  <div class="section-header">Seção 1 — Conceitos (sticky ao rolar)</div>
  <div class="content">
    <p>Role a página para ver o header sticky em ação...</p>
    <br><br><br><br><br><br>
  </div>

  <div class="section-header">Seção 2 — Prática</div>
  <div class="content">
    <p>Este header também é sticky!</p>
    <br><br><br><br><br><br>
  </div>

</body>
</html>`],
    },
    quiz: [
      { q:'Qual position faz o elemento sair do fluxo e ser posicionado em relação à viewport?',
        opts:['relative','absolute','fixed','sticky'],
        correct:2, explanation:'position: fixed tira o elemento do fluxo normal e o posiciona em relação à viewport — ele fica no lugar mesmo quando a página rola. Perfeito para navbars.' },
      { q:'Para usar position: absolute num filho posicionado dentro de um pai, o pai precisa ter:',
        opts:['display: flex','position: relative (ou absolute/fixed/sticky)','overflow: hidden','z-index definido'],
        correct:1, explanation:'O elemento absolute se posiciona em relação ao ancestral posicionado mais próximo. Para que o pai seja esse ancestral, ele precisa ter position diferente de static (geralmente relative).' },
      { q:'Qual a diferença entre fixed e sticky?',
        opts:['São iguais','fixed sempre fica na viewport; sticky rola com a página até um threshold, depois gruda','sticky é mais antigo','fixed só funciona no Chrome'],
        correct:1, explanation:'fixed sempre está fixo na viewport. sticky se comporta como relative inicialmente — rola com a página — mas quando atinge a posição definida (ex: top:0), gruda como fixed.' },
    ],
    challenge: {
      title:'Navbar fixa + modal com overlay',
      desc:'Construa os dois padrões de posicionamento mais usados na web.',
      tasks:[
        'Crie uma navbar com position:fixed, top:0, z-index:100 e backdrop-filter:blur',
        'Adicione padding-top no body para compensar a navbar fixa',
        'Crie um botão que "abra" um modal — overlay com position:fixed cobrindo tudo (z-index:200)',
        'Dentro do overlay, posicione o modal centralizado com position:absolute + transform:translate(-50%,-50%)',
        'Use position:sticky num header de seção que gruda ao rolar',
      ],
    },
  },

  /* ──────────────────────────────────────────────────────────
     CAP 09 — Responsividade e Media Queries
  ────────────────────────────────────────────────────────── */
  'css-09': {
    moduleId: 'css',
    title: 'Responsividade e Media Queries',
    desc: 'Mais de 60% do tráfego web é mobile. Criar interfaces que funcionam em qualquer tamanho de tela não é opcional — é o padrão mínimo de qualidade.',
    blocks: [
      { type:'text', title:'Mobile First — a abordagem profissional',
        body:'Mobile First significa escrever CSS para mobile primeiro, depois adicionar media queries para telas maiores. É o oposto do que parece intuitivo, mas tem vantagens: forçar você a pensar no essencial antes do acessório, melhor performance em mobile (menos CSS para sobrescrever), e é o critério que o Google usa para ranquear sites. A regra: estilos base = mobile. Media queries com <code>min-width</code> = telas maiores.' },
      { type:'text', title:'A sintaxe das media queries',
        body:'<code>@media (min-width: 768px) { }</code> — aplica os estilos quando a tela tiver pelo menos 768px. Breakpoints comuns: <strong>480px</strong> (celular grande), <strong>768px</strong> (tablet), <strong>1024px</strong> (desktop pequeno), <strong>1280px</strong> (desktop), <strong>1536px</strong> (tela grande). Você também pode combinar: <code>@media (min-width: 768px) and (max-width: 1023px)</code> para estilizar só tablets.' },
      { type:'text', title:'Unidades relativas — a base da responsividade',
        body:'Além de media queries, use unidades relativas: <code>%</code> relativo ao pai, <code>vw/vh</code> relativo à viewport (100vw = 100% da largura da janela), <code>rem</code> relativo à fonte raiz. <code>clamp(mínimo, ideal, máximo)</code> é a função mais moderna: <code>font-size: clamp(1rem, 2.5vw, 2rem)</code> — nunca menor que 1rem, nunca maior que 2rem, fluido entre os dois.' },
      { type:'callout',
        body:'<strong>viewport meta tag:</strong> Sem <code>&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</code> no head, media queries não funcionam em mobile — o navegador renderiza a página como se fosse desktop e depois reduz o zoom. Essa tag é obrigatória em todo projeto responsivo.' },
    ],
    editor: {
      tabs: ['HTML'],
      code: [`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <!-- Sem essa meta tag, responsividade não funciona em mobile! -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Responsividade</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }

    /* ── MOBILE FIRST: estilos base são para mobile ── */
    body {
      font-family: sans-serif;
      background: #0a0c0f;
      color: #e8edf2;
      padding: 1rem;
    }

    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 1rem;
      background: #13181f;
      border-radius: 8px;
      margin-bottom: 1rem;
    }

    /* Mobile: nav escondido */
    .nav-links { display: none; gap: 1rem; list-style: none; }

    .cards {
      display: grid;
      /* Mobile: 1 coluna */
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .card {
      background: #13181f;
      border: 1px solid #1e242d;
      border-radius: 12px;
      padding: 1.5rem;
    }

    h1 { font-size: 1.5rem; color: #00e5a0; margin-bottom: 1rem; }
    /* clamp: fluido entre 1.5rem e 3rem */
    h1 { font-size: clamp(1.5rem, 4vw, 3rem); }

    /* ── TABLET: 768px+ ── */
    @media (min-width: 768px) {
      body { padding: 1.5rem; }
      .nav-links { display: flex; } /* Nav aparece */
      .cards { grid-template-columns: repeat(2, 1fr); } /* 2 colunas */
    }

    /* ── DESKTOP: 1024px+ ── */
    @media (min-width: 1024px) {
      body { padding: 2rem; }
      .cards { grid-template-columns: repeat(3, 1fr); } /* 3 colunas */
    }
  </style>
</head>
<body>
  <nav class="navbar">
    <strong style="color:#00e5a0">DevStart</strong>
    <ul class="nav-links">
      <li>HTML</li><li>CSS</li><li>JS</li>
    </ul>
    <span style="color:#4a5568;font-size:.8rem">☰ mobile</span>
  </nav>

  <h1>Responsividade</h1>
  <p style="color:#8a95a3;margin-bottom:1rem;font-size:.875rem">
    Redimensione a janela: 1 coluna (mobile) → 2 (tablet) → 3 (desktop)
  </p>

  <div class="cards">
    <div class="card"><h3 style="color:#00e5a0">HTML</h3><p style="color:#8a95a3">Estrutura</p></div>
    <div class="card"><h3 style="color:#ff6b35">CSS</h3><p style="color:#8a95a3">Estilo</p></div>
    <div class="card"><h3 style="color:#f7df1e">JS</h3><p style="color:#8a95a3">Interação</p></div>
  </div>
</body>
</html>`],
    },
    quiz: [
      { q:'O que significa "Mobile First" no CSS?',
        opts:['Criar versão mobile depois do desktop','Criar os estilos base para mobile e usar min-width para ampliar para telas maiores','Usar apenas flexbox em mobile','Criar dois arquivos CSS separados'],
        correct:1, explanation:'Mobile First = estilos base são para a menor tela. Media queries com min-width adicionam estilos para telas maiores. É a abordagem profissional e o critério de indexação do Google.' },
      { q:'Qual meta tag é obrigatória para responsividade funcionar em dispositivos móveis?',
        opts:['<meta name="mobile" content="true">','<meta name="responsive" content="yes">','<meta name="viewport" content="width=device-width, initial-scale=1.0">','<meta charset="UTF-8">'],
        correct:2, explanation:'Sem a meta viewport, navegadores mobile renderizam a página como desktop e reduzem o zoom — media queries não funcionam corretamente. É obrigatória em todo projeto responsivo.' },
      { q:'O que faz font-size: clamp(1rem, 2.5vw, 2rem)?',
        opts:['Define três tamanhos de fonte diferentes','Cria uma fonte fluida: mínimo 1rem, ideal 2.5% da viewport, máximo 2rem','Aplica tamanho diferente em cada media query','Define fonte de 2.5rem fixo'],
        correct:1, explanation:'clamp(min, ideal, max) cria um valor fluido. O tamanho varia com a viewport mas nunca fica abaixo do mínimo nem acima do máximo. Perfeito para tipografia responsiva sem media queries.' },
    ],
    challenge: {
      title:'Layout totalmente responsivo',
      desc:'Construa uma página que funciona perfeitamente em mobile, tablet e desktop.',
      tasks:[
        'Adicione a meta viewport no head',
        'Escreva estilos base para mobile (1 coluna, padding menor, fonte menor)',
        'Em 768px: 2 colunas, nav visível, padding médio',
        'Em 1024px: 3 colunas, layout completo, padding maior',
        'Use clamp() para pelo menos um font-size fluido sem media query',
      ],
    },
  },

  /* ──────────────────────────────────────────────────────────
     CAP 10 — Transições e Animações
  ────────────────────────────────────────────────────────── */
  'css-10': {
    moduleId: 'css',
    title: 'Transições e animações CSS',
    desc: 'Movimento e feedback visual são fundamentais para UX. CSS oferece transições suaves e animações complexas sem uma linha de JavaScript.',
    blocks: [
      { type:'text', title:'Transições — mudança suave entre estados',
        body:'<code>transition</code> anima a mudança de um valor CSS para outro. Sintaxe: <code>transition: propriedade duração timing-function delay</code>. Exemplo: <code>transition: background-color 0.3s ease</code>. Você pode animar múltiplas propriedades: <code>transition: color 0.2s, transform 0.3s ease</code>. O atalho <code>transition: all 0.3s</code> funciona mas é menos performático — prefira especificar a propriedade.' },
      { type:'text', title:'Transform — mover, escalar, rotacionar',
        body:'<code>transform</code> é uma das propriedades mais performáticas do CSS — é acelerada por GPU. <code>translate(x, y)</code>: mover. <code>scale(n)</code>: escalar (1.05 = 5% maior). <code>rotate(ndeg)</code>: rotacionar. <code>skew(ndeg)</code>: inclinar. Combine: <code>transform: translateY(-4px) scale(1.02)</code>. Para centralizar absolutamente um elemento: <code>transform: translate(-50%, -50%)</code>.' },
      { type:'text', title:'@keyframes — animações complexas',
        body:'Para animações que se repetem ou têm múltiplos estados, use <code>@keyframes</code>. Define os estágios com porcentagens ou <code>from/to</code>. Aplique com <code>animation: nome duração timing-function delay iteration-count direction</code>. <code>animation-iteration-count: infinite</code> repete para sempre. <code>animation-fill-mode: both</code> mantém o estado final da animação.' },
      { type:'callout',
        body:'<strong>Performance:</strong> Animate apenas <code>transform</code> e <code>opacity</code> — são as únicas propriedades que o browser anima sem recalcular o layout (GPU). Animar <code>width</code>, <code>height</code>, <code>top</code>, <code>margin</code> causa reflow — é caro e pode causar travadas. Use <code>transform: translateX()</code> em vez de <code>left</code>, e <code>transform: scaleX()</code> em vez de <code>width</code>.' },
    ],
    editor: {
      tabs: ['HTML'],
      code: [`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Transições e Animações</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #0a0c0f; color: #e8edf2;
      font-family: sans-serif; padding: 2rem;
      display: flex; flex-direction: column; gap: 2rem;
    }

    /* TRANSIÇÃO em hover */
    .botao {
      display: inline-flex; align-items: center; gap: 0.5rem;
      background: #00e5a0; color: #000;
      padding: 0.75rem 1.5rem; border: none;
      border-radius: 10px; font-weight: 700; cursor: pointer;
      /* Define a transição */
      transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s;
    }
    .botao:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 24px rgba(0,229,160,0.4);
      background: #00c48a;
    }
    .botao:active {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0,229,160,0.3);
    }

    /* CARD com hover suave */
    .card {
      background: #13181f; border: 1px solid #1e242d;
      border-radius: 16px; padding: 1.5rem;
      max-width: 300px;
      transition: transform 0.25s ease, border-color 0.25s, box-shadow 0.25s;
      cursor: pointer;
    }
    .card:hover {
      transform: translateY(-6px);
      border-color: #00e5a0;
      box-shadow: 0 12px 32px rgba(0,229,160,0.15);
    }

    /* ANIMAÇÃO com @keyframes */
    @keyframes pulsar {
      0%, 100% { transform: scale(1); opacity: 1; }
      50%       { transform: scale(1.1); opacity: 0.8; }
    }
    @keyframes girar {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    @keyframes entrar {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .dot-verde {
      width: 12px; height: 12px; border-radius: 50%;
      background: #00e5a0;
      animation: pulsar 2s ease-in-out infinite;
      display: inline-block;
    }
    .spinner {
      width: 32px; height: 32px;
      border: 3px solid #1e242d;
      border-top-color: #00e5a0;
      border-radius: 50%;
      animation: girar 0.8s linear infinite;
    }
    .anim-entrada {
      animation: entrar 0.5s ease both;
      color: #8a95a3; font-size: 0.875rem;
    }
  </style>
</head>
<body>

  <div>
    <button class="botao">✨ Hover neste botão</button>
  </div>

  <div class="card">
    <h3 style="color:#00e5a0;margin-bottom:.5rem">Card com hover</h3>
    <p style="color:#8a95a3;font-size:.875rem">Passe o mouse para ver a transição suave com transform e box-shadow.</p>
  </div>

  <div style="display:flex;gap:2rem;align-items:center">
    <span class="dot-verde"></span>
    <span style="font-size:.875rem;color:#8a95a3">Pulsando com @keyframes</span>
    <div class="spinner"></div>
    <span style="font-size:.875rem;color:#8a95a3">Spinner girando</span>
  </div>

  <p class="anim-entrada">Este texto entrou com animação de fade + slide up 👆</p>

</body>
</html>`],
    },
    quiz: [
      { q:'Por que animar transform e opacity é mais performático que animar width ou margin?',
        opts:['transform e opacity são mais modernos','O browser anima transform/opacity na GPU sem recalcular o layout; width/margin causam reflow','opacity não funciona em todos os navegadores','width não pode ser animado'],
        correct:1, explanation:'transform e opacity são composited — o browser os anima na GPU sem recalcular o layout do documento (reflow). Animar width, height, top ou margin força o browser a recalcular todo o layout a cada frame.' },
      { q:'O que faz animation-iteration-count: infinite?',
        opts:['Anima 99999 vezes','A animação se repete indefinidamente','Define a duração como infinita','Remove o delay da animação'],
        correct:1, explanation:'infinite faz a animação se repetir indefinidamente. Perfeito para spinners, indicadores de status e elementos decorativos.' },
      { q:'Qual é a forma performática de mover um elemento 100px para a direita?',
        opts:['left: 100px','margin-left: 100px','transform: translateX(100px)','right: -100px'],
        correct:2, explanation:'transform: translateX() é acelerado por GPU e não causa reflow. Usar left, margin ou right anima no CPU e força recálculo do layout a cada frame — muito mais lento.' },
    ],
    challenge: {
      title:'Microinterações com CSS',
      desc:'Adicione feedback visual a botões e cards usando transições e animações.',
      tasks:[
        'Crie um botão com transition em hover: translateY(-3px) + box-shadow colorido',
        'Adicione :active com translateY(0) para simular clique físico',
        'Crie um card com hover que eleva o card e muda a borda para a cor primária',
        'Crie um spinner de loading com @keyframes e border-top colorido',
        'Crie uma animação de entrada (fade + translateY) e aplique num título',
      ],
    },
  },

  /* ──────────────────────────────────────────────────────────
     CAP 11 — Pseudo-classes e pseudo-elementos
  ────────────────────────────────────────────────────────── */
  'css-11': {
    moduleId: 'css',
    title: 'Pseudo-classes e pseudo-elementos',
    desc: 'Pseudo-classes e pseudo-elementos permitem estilizar elementos em estados específicos ou partes de elementos sem adicionar classes no HTML — código mais limpo e poderoso.',
    blocks: [
      { type:'text', title:'Pseudo-classes — estados do elemento',
        body:'Pseudo-classes selecionam elementos em estados específicos. As mais usadas: <code>:hover</code> (mouse sobre), <code>:focus</code> (focado via teclado ou clique), <code>:active</code> (sendo clicado), <code>:visited</code> (link visitado), <code>:disabled</code> (input desabilitado), <code>:checked</code> (checkbox marcado). Estruturais: <code>:first-child</code>, <code>:last-child</code>, <code>:nth-child(n)</code>, <code>:not(seletor)</code>.' },
      { type:'text', title:':nth-child — seleção poderosa',
        body:'<code>:nth-child(n)</code> seleciona elementos pelo índice. <code>:nth-child(2)</code> seleciona o segundo filho. <code>:nth-child(odd)</code> ou <code>:nth-child(2n+1)</code> seleciona ímpares. <code>:nth-child(even)</code> seleciona pares — clássico para zebrar tabelas. <code>:nth-child(3n)</code> seleciona a cada 3 elementos. <code>:not(.excluir)</code> seleciona todos exceto os com classe .excluir.' },
      { type:'text', title:'Pseudo-elementos — partes do elemento',
        body:'Pseudo-elementos estilizam partes específicas de um elemento. <code>::before</code> e <code>::after</code> inserem conteúdo antes ou depois do conteúdo real — precisam de <code>content: ""</code>. <code>::placeholder</code> estiliza o placeholder de inputs. <code>::first-line</code> estiliza a primeira linha de um parágrafo. <code>::selection</code> estiliza o texto selecionado. A diferença visual: pseudo-classe usa <code>:</code>, pseudo-elemento usa <code>::</code>.' },
      { type:'callout',
        body:'<strong>::before e ::after</strong> são os pseudo-elementos mais versáteis. Com eles você pode: adicionar ícones decorativos, criar efeitos de sublinhado animado, inserir aspas em citações, fazer badges e tooltips — sem adicionar uma única tag HTML. O elemento pai precisa ter <code>position: relative</code> se o pseudo-elemento for posicionado.' },
    ],
    editor: {
      tabs: ['HTML'],
      code: [`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Pseudo-classes e Pseudo-elementos</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #0a0c0f; color: #e8edf2; font-family: sans-serif; padding: 2rem; }

    /* :hover + :focus — estados de interação */
    input {
      background: #13181f;
      border: 1px solid #1e242d;
      color: #e8edf2;
      padding: 0.75rem 1rem;
      border-radius: 8px;
      outline: none;
      width: 100%; margin-bottom: 1rem;
      transition: border-color 0.2s;
    }
    input:focus { border-color: #00e5a0; }
    input:disabled { opacity: 0.4; cursor: not-allowed; }

    /* ::placeholder */
    input::placeholder { color: #4a5568; }

    /* :nth-child — linhas zebradas */
    table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; }
    td { padding: 0.75rem 1rem; font-size: 0.875rem; }
    tr:nth-child(even) td { background: #13181f; }
    tr:hover td { background: rgba(0,229,160,0.05); }

    /* ::before — ícone decorativo */
    .item-lista {
      position: relative;
      padding-left: 1.5rem;
      margin-bottom: 0.5rem;
      color: #8a95a3;
      font-size: 0.875rem;
    }
    .item-lista::before {
      content: "▶";
      position: absolute;
      left: 0;
      color: #00e5a0;
      font-size: 0.65rem;
      top: 0.2rem;
    }

    /* ::after — sublinhado animado em link */
    .link-animado {
      position: relative;
      color: #00e5a0;
      text-decoration: none;
      display: inline-block;
    }
    .link-animado::after {
      content: "";
      position: absolute;
      bottom: -2px; left: 0;
      width: 0; height: 2px;
      background: #00e5a0;
      transition: width 0.3s ease;
    }
    .link-animado:hover::after { width: 100%; }

    /* ::selection — texto selecionado */
    ::selection { background: rgba(0,229,160,0.3); color: #e8edf2; }

    h3 { color: #00e5a0; margin: 1.5rem 0 0.75rem; font-size: 0.9rem; text-transform: uppercase; letter-spacing: .05em; }
  </style>
</head>
<body>

  <h3>:focus e ::placeholder</h3>
  <input type="text" placeholder="Clique aqui — borda verde no focus">
  <input type="text" placeholder="Input desabilitado" disabled>

  <h3>:nth-child(even) em tabela</h3>
  <table>
    <tr><td>HTML</td><td>Estrutura</td></tr>
    <tr><td>CSS</td><td>Estilo</td></tr>
    <tr><td>JavaScript</td><td>Interação</td></tr>
    <tr><td>Git</td><td>Versionamento</td></tr>
  </table>

  <h3>::before — lista com ícone</h3>
  <div class="item-lista">Aprenda HTML primeiro</div>
  <div class="item-lista">Depois CSS para estilização</div>
  <div class="item-lista">Então JavaScript para interação</div>

  <h3>::after — sublinhado animado</h3>
  <a href="#" class="link-animado">Passe o mouse aqui</a>

  <h3>::selection</h3>
  <p style="color:#8a95a3;margin-top:.5rem">Selecione este texto para ver a cor de seleção customizada 👆</p>

</body>
</html>`],
    },
    quiz: [
      { q:'Qual pseudo-classe estiliza um input quando ele está em foco?',
        opts:[':hover',':active',':focus',':selected'],
        correct:2, explanation:':focus se aplica quando o elemento recebe foco — via clique ou navegação por teclado (Tab). Essencial para acessibilidade: usuários de teclado precisam ver claramente qual campo está ativo.' },
      { q:'Qual a diferença sintática entre pseudo-classe e pseudo-elemento?',
        opts:['Não há diferença','Pseudo-classes usam : (simples), pseudo-elementos usam :: (duplo)','Pseudo-elementos usam # e pseudo-classes usam .','São escritos da mesma forma'],
        correct:1, explanation:'Pseudo-classes usam : simples (:hover, :focus). Pseudo-elementos usam :: duplo (::before, ::after, ::placeholder). O CSS moderno faz essa distinção; CSS2 usava : para ambos.' },
      { q:'Para que serve content: "" em ::before e ::after?',
        opts:['É opcional','É obrigatório — sem content o pseudo-elemento não é renderizado','Define o texto a ser exibido','Limpa o conteúdo existente'],
        correct:1, explanation:'A propriedade content é obrigatória em ::before e ::after. Sem ela o pseudo-elemento não existe na página. Use content: "" para elementos puramente visuais (sem texto).' },
    ],
    challenge: {
      title:'Componentes com pseudo-seletores',
      desc:'Construa componentes elegantes usando pseudo-classes e pseudo-elementos.',
      tasks:[
        'Estilize inputs com :focus mostrando borda colorida (sem outline padrão feio)',
        'Crie uma lista com ::before em cada item para ícone personalizado',
        'Crie um link com ::after que anima um sublinhado no hover',
        'Zebrar uma tabela com :nth-child(even)',
        'Customizar ::selection com background e color da paleta do projeto',
      ],
    },
  },

  /* ──────────────────────────────────────────────────────────
     CAP 12 — Desafio Final CSS
  ────────────────────────────────────────────────────────── */
  'css-12': {
    moduleId: 'css',
    title: '🏆 Desafio Final — CSS',
    desc: 'Hora de unir tudo: variáveis, flexbox, grid, responsividade, animações e pseudo-seletores num projeto real.',
    blocks: [
      { type:'text', title:'O que você domina agora',
        body:'Em 11 capítulos você passou por: o modelo de cascata e especificidade, o box model com border-box, tipografia com rem e Google Fonts, sistema de cores com variáveis CSS, Flexbox para componentes, Grid para layouts, posicionamento, responsividade Mobile First, transições e animações performáticas, e pseudo-seletores. Isso é o suficiente para construir qualquer interface profissional.' },
      { type:'text', title:'O que faz CSS de nível profissional',
        body:'A diferença entre CSS iniciante e profissional não é conhecer mais propriedades — é a organização. Profissionais usam: (1) variáveis CSS para um sistema de design consistente, (2) Mobile First com breakpoints organizados, (3) BEM ou outra convenção de nomenclatura de classes, (4) apenas transform/opacity em animações, (5) comentários para separar seções do CSS.' },
      { type:'callout',
        body:'<strong>Próximo passo:</strong> Com HTML + CSS sólidos, você está pronto para o JavaScript. Tudo que você aprendeu sobre estrutura e estilo vai fazer sentido quando você começar a manipular elementos com JS — alterar classes, mudar estilos, criar e remover elementos dinamicamente.' },
      { type:'text', title:'Desafio: Landing Page Completa',
        body:'Construa uma landing page para um produto fictício de tecnologia. Ela deve ter: navbar fixa responsiva, hero section centralizada com gradiente, grid de features/benefícios, seção de preços com 3 cards, e footer. Use tudo que aprendeu neste módulo.' },
    ],
    editor: {
      tabs: ['HTML'],
      code: [`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DevTool — Landing Page</title>
  <style>
    /* ════ DESAFIO FINAL — Complete o CSS abaixo ════ */

    /* 1. Variáveis CSS */
    :root {
      --primary: #00e5a0;
      --bg:      #0a0c0f;
      --card:    #13181f;
      /* adicione mais variáveis... */
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Segoe UI', sans-serif;
      background: var(--bg);
      color: #e8edf2;
    }

    /* 2. Navbar fixa — complete */
    .navbar {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 100;
      /* adicione: background blur, padding, display flex... */
    }

    /* 3. Hero section — complete */
    .hero {
      min-height: 100vh;
      display: flex;
      /* centralize o conteúdo, adicione gradiente de fundo... */
    }

    /* 4. Features grid — complete */
    .features {
      display: grid;
      /* use repeat(auto-fit, minmax(..., 1fr)) */
    }

    /* 5. Cards de preço — complete */
    .pricing {
      /* flex com wrap e gap */
    }

    /* adicione responsividade, hover effects, transições... */
  </style>
</head>
<body>

  <nav class="navbar">
    <!-- logo + links + botão CTA -->
  </nav>

  <section class="hero">
    <!-- título grande, subtítulo, botão CTA -->
  </section>

  <section class="features" style="padding:5rem 2rem">
    <!-- 3-4 cards de features -->
  </section>

  <section class="pricing" style="padding:5rem 2rem">
    <!-- 3 cards: grátis, pro, enterprise -->
  </section>

  <footer style="padding:2rem;text-align:center;color:#4a5568;border-top:1px solid #1e242d">
    © 2024 DevTool. Feito com HTML + CSS puro.
  </footer>

</body>
</html>`],
    },
    quiz: [
      { q:'Qual conjunto de técnicas representa CSS profissional?',
        opts:['!important em tudo, IDs para estilizar, px para tudo','Variáveis CSS, Mobile First, transform para animações, box-sizing: border-box','Inline styles, tabelas para layout, floats','Apenas classes globais sem organização'],
        correct:1, explanation:'CSS profissional usa: variáveis para sistema de design, Mobile First para responsividade, transform/opacity para animações performáticas, border-box para box model previsível.' },
      { q:'Para criar um layout de página completo com sidebar + main, qual abordagem é mais indicada?',
        opts:['Tabelas HTML','Float + clearfix','CSS Grid com grid-template-areas','Apenas Flexbox aninhado'],
        correct:2, explanation:'CSS Grid com grid-template-areas é ideal para layouts de página — define visualmente a estrutura com linhas e colunas. Flexbox fica para alinhar conteúdo dentro das células do grid.' },
      { q:'Qual é a ordem correta de aprendizado front-end?',
        opts:['JavaScript → HTML → CSS','CSS → HTML → JavaScript','HTML (estrutura) → CSS (estilo) → JavaScript (comportamento)','São independentes, a ordem não importa'],
        correct:2, explanation:'HTML define a estrutura, CSS estiliza essa estrutura, JavaScript manipula ambos dinamicamente. Cada camada depende da anterior — aprender nessa ordem torna cada passo mais natural.' },
    ],
    challenge: {
      title:'Landing Page completa',
      desc:'Construa uma landing page profissional do zero usando todos os conceitos do módulo.',
      tasks:[
        'Sistema de design: variáveis CSS para cores, espaçamentos e bordas',
        'Navbar: fixed, backdrop-filter:blur, flex com logo + links + CTA, responsiva',
        'Hero: min-height:100vh, gradiente, centralização flex, título com clamp(), botão com hover',
        'Features: CSS Grid auto-fit/minmax, cards com ::before e hover animado',
        'Responsividade: Mobile First com breakpoints em 768px e 1024px',
      ],
    },
  },

};
