/* ============================================================
   DevStart — assets/js/content-ia.js
   Módulo 04 — IA com Claude (8 capítulos)
   ============================================================ */

export const IA = {

  /* ──────────────────────────────────────────────────────────
     CAP 01 — O que é IA e como funciona
  ────────────────────────────────────────────────────────── */
  'ia-01': {
    moduleId: 'ia',
    title: 'O que é IA e como funciona?',
    desc: 'Entenda os fundamentos da Inteligência Artificial moderna — modelos de linguagem, treinamento e por que ferramentas como o Claude mudaram o que é possível construir.',
    blocks: [
      { type:'text', title:'IA não é mágica — é matemática',
        body:'Inteligência Artificial moderna, especialmente os LLMs (Large Language Models — Modelos de Linguagem de Grande Escala), são redes neurais treinadas em enormes volumes de texto. Elas aprendem padrões estatísticos da linguagem humana: dado um contexto, qual é o próximo token mais provável? Claude, GPT-4, Gemini — todos funcionam sobre esse princípio. A "inteligência" emerge da escala: bilhões de parâmetros, trilhões de tokens de treinamento.' },
      { type:'text', title:'O que são LLMs',
        body:'LLM significa Large Language Model. São modelos treinados para prever e gerar texto. Durante o treinamento, o modelo vê bilhões de exemplos de texto e ajusta seus parâmetros internos para prever cada palavra. Após o treinamento, ele pode gerar texto coerente, responder perguntas, traduzir idiomas, escrever código, analisar documentos. A versão de Claude que você está usando agora é um LLM.' },
      { type:'text', title:'Claude — o modelo da Anthropic',
        body:'Claude é o modelo de IA desenvolvido pela Anthropic, empresa fundada com foco em segurança de IA. Claude se destaca por: seguir instruções complexas com precisão, analisar e gerar código de alta qualidade, trabalhar com documentos longos (janela de contexto extensa), e raciocinar sobre problemas complexos. Como desenvolvedor, você vai usar Claude via API para integrar IA nas suas aplicações.' },
      { type:'callout',
        body:'<strong>Tokens:</strong> LLMs não processam palavras, mas tokens — fragmentos de texto. "JavaScript" pode ser 1-3 tokens. A janela de contexto define quanto texto o modelo consegue processar de uma vez. Isso importa ao desenvolver: requisições longas custam mais e podem ser truncadas. Ser conciso e específico nos prompts é boa prática por razões técnicas e econômicas.' },
    ],
    editor: {
      tabs: ['JS'],
      code: [`// IA com Claude — conceitos fundamentais
// (Este é um arquivo de conceitos — sem execução no browser)

/*
  COMO UM LLM PROCESSA TEXTO:
  1. Texto de entrada é tokenizado
  2. Tokens viram embeddings (vetores numéricos)
  3. Passam por camadas de atenção (transformer)
  4. Modelo prevê o próximo token mais provável
  5. Token gerado, processo se repete

  ANATOMIA DE UMA REQUISIÇÃO À API CLAUDE:
  {
    model: "claude-sonnet-4-5",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: "Explique recursão em JavaScript"
      }
    ]
  }

  RESPOSTA DA API:
  {
    content: [{ type: "text", text: "Recursão é..." }],
    usage: {
      input_tokens: 12,   // tokens enviados (custo)
      output_tokens: 287  // tokens gerados (custo)
    }
  }
*/

// Vocabulário essencial:
const conceitosIA = {
  LLM:        'Large Language Model — modelo treinado em texto em escala',
  token:      'Fragmento de texto processado pelo modelo (~0.75 palavras em média)',
  contexto:   'Toda a conversa até agora — o modelo "vê" tudo isso',
  prompt:     'Instrução ou mensagem enviada ao modelo',
  completion: 'Texto gerado pelo modelo em resposta ao prompt',
  embedding:  'Representação numérica (vetor) de texto — mede similaridade',
  temperatura:'Controla aleatoriedade: 0 = determinístico, 1 = criativo',
};

Object.entries(conceitosIA).forEach(([termo, def]) => {
  console.log(\`📚 \${termo}: \${def}\`);
});`],
    },
    quiz: [
      { q:'O que é um LLM?',
        opts:['Um tipo de banco de dados','Large Language Model — rede neural treinada em texto em escala para gerar e compreender linguagem','Um servidor de IA','Uma linguagem de programação especial para IA'],
        correct:1, explanation:'LLM (Large Language Model) é uma rede neural treinada em enormes volumes de texto. Ela aprende padrões da linguagem e pode gerar texto coerente, responder perguntas, escrever código e muito mais.' },
      { q:'O que são tokens no contexto de LLMs?',
        opts:['Senhas de autenticação da API','Moedas virtuais para pagar','Fragmentos de texto que o modelo processa — "JavaScript" pode ser 1-3 tokens','Arquivos de configuração do modelo'],
        correct:2, explanation:'Tokens são as unidades básicas que LLMs processam. Uma palavra pode ser 1-3 tokens. O custo de APIs de IA é medido em tokens — input tokens (o que você envia) e output tokens (o que o modelo gera).' },
      { q:'O que diferencia Claude dos outros modelos de IA?',
        opts:['É gratuito para sempre','Desenvolvido pela Anthropic com foco em segurança, janela de contexto extensa e precisão em código e raciocínio complexo','É o único LLM que existe','Usa uma linguagem de programação diferente'],
        correct:1, explanation:'Claude é desenvolvido pela Anthropic com ênfase em segurança e alinhamento. Se destaca por seguir instruções complexas, trabalhar com documentos longos e qualidade em código e raciocínio.' },
    ],
    challenge: {
      title:'Explorar o Claude no chat',
      desc:'Antes de programar com IA, entenda como interagir com ela efetivamente.',
      tasks:[
        'Abra o Claude.ai e peça para ele explicar um conceito técnico que você não entende bem',
        'Peça para ele gerar um trecho de código JavaScript que você possa testar',
        'Peça para revisar um código que você escreveu e sugerir melhorias',
        'Experimente mudar o tom: "Explique como se eu tivesse 10 anos" vs explicação técnica',
        'Documente o que funcionou bem e o que não funcionou nas suas interações',
      ],
    },
  },

  /* ──────────────────────────────────────────────────────────
     CAP 02 — Engenharia de Prompts
  ────────────────────────────────────────────────────────── */
  'ia-02': {
    moduleId: 'ia',
    title: 'Engenharia de Prompts',
    desc: 'Prompt engineering é a arte de se comunicar com modelos de IA. A qualidade do output depende diretamente da qualidade do input. Aprenda as técnicas que separam resultados mediocres de excelentes.',
    blocks: [
      { type:'text', title:'O que é engenharia de prompts',
        body:'Prompt engineering é a prática de estruturar instruções para modelos de IA de forma a obter os resultados desejados com consistência. Não é sobre palavras mágicas — é sobre comunicação precisa. Os mesmos princípios que tornam uma boa especificação técnica ou um bom comentário de código também tornam um bom prompt: seja claro sobre o contexto, objetivo, formato esperado e restrições.' },
      { type:'text', title:'As 4 dimensões de um bom prompt',
        body:'<strong>Contexto:</strong> quem você é, qual é a situação. <strong>Tarefa:</strong> o que exatamente você quer que o modelo faça. <strong>Formato:</strong> como deve ser a resposta (lista, código, JSON, parágrafo). <strong>Restrições:</strong> o que evitar, limites, tom. Exemplo fraco: "explique arrays". Exemplo forte: "Sou estudante de programação sem experiência prévia. Explique arrays em JavaScript com 3 exemplos de código práticos do dia a dia, em português, sem jargão."' },
      { type:'text', title:'Técnicas avançadas',
        body:'<strong>Few-shot:</strong> dê exemplos do que você quer antes de fazer a pergunta. <strong>Chain of thought:</strong> peça para o modelo "pensar passo a passo" — melhora raciocínio. <strong>Role prompting:</strong> "Você é um desenvolvedor senior revisando código de um júnior". <strong>Output format:</strong> "Responda em JSON com os campos: titulo, descricao, exemplos". <strong>Iteração:</strong> refine o prompt com base na resposta anterior.' },
      { type:'callout',
        body:'<strong>System prompt vs User message:</strong> O system prompt define o comportamento geral do assistente — personalidade, regras, contexto permanente. A user message é a instrução específica. Na API Claude, você passa o system prompt separadamente. Isso é o que as empresas usam para customizar Claude para seus produtos: "Você é o assistente da empresa X, responda apenas sobre tópicos Y e Z."' },
    ],
    editor: {
      tabs: ['JS'],
      code: [`// EXEMPLOS DE PROMPTS — da fraqueza à excelência

// ❌ PROMPT FRACO — vago, sem contexto
const promptFraco = "me faz um site";

// ✅ PROMPT BOM — contexto, tarefa, formato, restrições
const promptBom = \`
Você é um desenvolvedor front-end experiente.

Crie uma landing page HTML/CSS para um curso online de JavaScript com:
- Navbar fixa com logo e botão CTA
- Hero section com título, subtítulo e dois botões
- Seção de 3 features com ícones emoji
- Design: fundo escuro (#0a0c0f), cor de acesso #00e5a0
- CSS inline no <style>, sem frameworks externos
- Responsiva para mobile

Retorne APENAS o código HTML completo, sem explicações.
\`;

// ── FEW-SHOT — mostrar exemplos antes de pedir ───────────────
const promptFewShot = \`
Converta nomes de variáveis de camelCase para snake_case.

Exemplos:
- firstName → first_name
- totalPrice → total_price
- getUserData → get_user_data

Agora converta: calculateMonthlyRevenue
\`;

// ── CHAIN OF THOUGHT — pedir raciocínio passo a passo ────────
const promptCot = \`
Analise este código JavaScript e identifique bugs.
Pense passo a passo:
1. Verifique tipos de dados
2. Verifique casos extremos (null, undefined, array vazio)
3. Verifique lógica de controle de fluxo

Código:
function calcularMedia(notas) {
  return notas.reduce((a, b) => a + b) / notas.length;
}
\`;

// ── SYSTEM PROMPT — contexto permanente da sessão ────────────
const systemPrompt = \`
Você é TutorJS, assistente de ensino de JavaScript do DevStart.

Regras:
- Responda sempre em português brasileiro
- Use exemplos práticos e simples
- Quando mostrar código, adicione comentários explicativos
- Se o aluno errar, corrija gentilmente e explique o porquê
- Mantenha respostas concisas — máximo 3 parágrafos
\`;

console.log('Bom prompt definido:', promptBom.trim().slice(0, 80) + '...');`],
    },
    quiz: [
      { q:'Quais são as 4 dimensões de um bom prompt?',
        opts:['Velocidade, custo, modelo e idioma','Contexto, tarefa, formato e restrições','Pergunta, resposta, revisão e entrega','Temperatura, tokens, modelo e versão'],
        correct:1, explanation:'Um bom prompt define: Contexto (quem você é, a situação), Tarefa (o que quer que o modelo faça), Formato (como deve ser a resposta) e Restrições (o que evitar, limites).' },
      { q:'O que é few-shot prompting?',
        opts:['Usar poucos tokens','Dar exemplos de input/output antes de fazer a pergunta real','Fazer a mesma pergunta várias vezes','Limitar o tamanho da resposta'],
        correct:1, explanation:'Few-shot prompting fornece 2-5 exemplos do comportamento desejado antes da pergunta real. O modelo aprende o padrão dos exemplos e aplica na sua solicitação — muito eficaz para formatações específicas.' },
      { q:'Qual a diferença entre system prompt e user message?',
        opts:['São a mesma coisa','System prompt define comportamento permanente do assistente; user message é a instrução específica de cada turno','System prompt é mais caro','User message é enviada pelo servidor'],
        correct:1, explanation:'O system prompt é o contexto persistente — define quem o assistente é, quais regras seguir. A user message é a pergunta/instrução específica. Empresas usam system prompts para customizar Claude para seus produtos.' },
    ],
    challenge: {
      title:'Biblioteca de prompts para desenvolvimento',
      desc:'Crie prompts otimizados para as tarefas mais comuns de um dev.',
      tasks:[
        'Escreva um prompt para gerar um componente HTML/CSS a partir de uma descrição',
        'Escreva um prompt para revisar código e sugerir melhorias com exemplos',
        'Escreva um prompt few-shot para converter JSON em HTML formatado',
        'Escreva um system prompt para um tutor de programação com personalidade e regras',
        'Teste cada prompt no Claude.ai e itere até obter resultados consistentes',
      ],
    },
  },

  /* ──────────────────────────────────────────────────────────
     CAP 03 — API do Claude — primeiros passos
  ────────────────────────────────────────────────────────── */
  'ia-03': {
    moduleId: 'ia',
    title: 'API do Claude — primeiros passos',
    desc: 'A API do Claude permite integrar IA nas suas aplicações. Aprenda a autenticar, fazer requisições, processar respostas e tratar erros.',
    blocks: [
      { type:'text', title:'O que é uma API de IA',
        body:'A API do Claude é uma interface HTTP que permite enviar mensagens e receber respostas do modelo programaticamente — sem interface gráfica, direto do seu código. Você envia uma requisição POST com o texto, o modelo processa e devolve a resposta em JSON. Isso permite construir: chatbots, geradores de conteúdo, analisadores de texto, assistentes de código — qualquer app que precise de inteligência de linguagem.' },
      { type:'text', title:'Estrutura da requisição',
        body:'Endpoint: <code>POST https://api.anthropic.com/v1/messages</code>. Headers obrigatórios: <code>x-api-key: SUA_CHAVE</code> e <code>anthropic-version: 2023-06-01</code>. Body: <code>model</code> (qual versão), <code>max_tokens</code> (limite de tokens na resposta), <code>messages</code> (array de mensagens com role "user" ou "assistant"). Opcionalmente: <code>system</code> (system prompt) e <code>temperature</code> (0-1).' },
      { type:'text', title:'Segurança da API Key',
        body:'<strong>Nunca exponha sua API key no código front-end.</strong> Qualquer pessoa que abrir o código fonte do browser consegue ver e usar sua chave. A arquitetura correta: o front-end chama seu próprio backend, o backend usa a API key em variável de ambiente, o backend chama a API do Claude. Assim a chave fica em servidor, nunca no cliente. Em desenvolvimento com Node.js, use <code>.env</code> com a biblioteca <code>dotenv</code>.' },
      { type:'callout',
        body:'<strong>Custos:</strong> A API do Claude é paga por token. Claude Haiku é o mais barato e rápido — ótimo para tarefas simples e alto volume. Claude Sonnet equilibra capacidade e custo. Claude Opus é o mais poderoso para tarefas complexas. Sempre defina um <code>max_tokens</code> razoável para controlar custos. Em desenvolvimento, monitore o uso no dashboard da Anthropic.' },
    ],
    editor: {
      tabs: ['JS'],
      code: [`// ── CHAMADA À API DO CLAUDE (Node.js / backend) ─────────────
// Nunca faça isso direto no front-end — a API key ficaria exposta!

// Instalação: npm install @anthropic-ai/sdk
// import Anthropic from '@anthropic-ai/sdk';

// ── COM FETCH PURO (Node.js backend) ────────────────────────
async function perguntarClaude(pergunta, systemPrompt = '') {
  const resposta = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type':    'application/json',
      'x-api-key':       process.env.ANTHROPIC_API_KEY, // variável de ambiente
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model:      'claude-haiku-4-5-20251001', // rápido e barato
      max_tokens: 1024,
      system:     systemPrompt,
      messages: [
        { role: 'user', content: pergunta }
      ],
    }),
  });

  if (!resposta.ok) {
    const erro = await resposta.json();
    throw new Error(\`API Claude: \${erro.error?.message}\`);
  }

  const dados = await resposta.json();
  return dados.content[0].text; // extrai o texto da resposta
}

// ── CONVERSA MULTI-TURNO ─────────────────────────────────────
async function conversa() {
  const historico = [];

  async function enviar(mensagem) {
    historico.push({ role: 'user', content: mensagem });

    const resposta = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type':    'application/json',
        'x-api-key':       process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model:      'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        system:     'Você é um tutor de JavaScript amigável.',
        messages:   historico,  // envia todo o histórico
      }),
    });

    const dados    = await resposta.json();
    const texto    = dados.content[0].text;
    historico.push({ role: 'assistant', content: texto });
    return texto;
  }

  return { enviar, historico };
}

// ── RESPOSTA DA API ──────────────────────────────────────────
/*
  {
    id: "msg_...",
    type: "message",
    role: "assistant",
    content: [{ type: "text", text: "Resposta aqui..." }],
    model: "claude-haiku-4-5-20251001",
    stop_reason: "end_turn",
    usage: {
      input_tokens: 28,
      output_tokens: 156
    }
  }
*/`],
    },
    quiz: [
      { q:'Por que não se deve colocar a API key no código front-end?',
        opts:['O front-end não suporta chaves longas','Qualquer pessoa pode ver o código fonte do browser e roubar a chave','A API não aceita requisições do browser','É mais lento'],
        correct:1, explanation:'O código JavaScript do front-end é público — qualquer pessoa abre o DevTools e lê. A API key ficaria exposta, podendo ser usada por terceiros gerando custos e riscos. Sempre use a chave apenas no backend (servidor).' },
      { q:'O que é o parâmetro max_tokens na API do Claude?',
        opts:['O número de mensagens permitidas','O limite máximo de tokens na resposta gerada — controla custo e tamanho','A versão do modelo a usar','O timeout da requisição'],
        correct:1, explanation:'max_tokens limita o tamanho da resposta gerada. Se o modelo precisaria de mais tokens para terminar, ele para. Importante para controlar custos — uma resposta com max_tokens:100 custa muito menos que max_tokens:4096.' },
      { q:'Como funciona uma conversa multi-turno com a API?',
        opts:['O modelo guarda memória automaticamente','Você envia o histórico completo de mensagens em cada requisição — o modelo não tem memória própria','Cada mensagem é independente','Use um ID de sessão especial'],
        correct:1, explanation:'A API é stateless — sem estado. O modelo não lembra conversas anteriores. Para multi-turno, você mantém o histórico no seu código e envia todas as mensagens (user e assistant) a cada requisição.' },
    ],
    challenge: {
      title:'Backend proxy para a API do Claude',
      desc:'Construa um servidor Node.js que serve de intermediário seguro para a API.',
      tasks:[
        'Crie um servidor Express simples com rota POST /chat',
        'Use dotenv para carregar ANTHROPIC_API_KEY do arquivo .env',
        'A rota recebe {mensagem} e retorna a resposta do Claude',
        'Adicione tratamento de erros: rate limit, API key inválida, timeout',
        'Teste com curl ou Postman antes de conectar o front-end',
      ],
    },
  },

  /* ──────────────────────────────────────────────────────────
     CAP 04 — Construindo um Chatbot
  ────────────────────────────────────────────────────────── */
  'ia-04': {
    moduleId: 'ia',
    title: 'Construindo um Chatbot',
    desc: 'Com HTML, CSS, JavaScript e a API do Claude, você pode construir um chatbot funcional. Aprenda a criar a interface, gerenciar histórico e exibir respostas em tempo real com streaming.',
    blocks: [
      { type:'text', title:'Arquitetura de um chatbot web',
        body:'Um chatbot web tem três partes: <strong>Front-end</strong> — interface HTML/CSS com input do usuário e área de mensagens. <strong>Backend</strong> — servidor Node.js que recebe as mensagens, mantém o histórico e chama a API do Claude. <strong>API do Claude</strong> — processa e gera respostas. O fluxo: usuário digita → front-end envia POST para backend → backend chama Claude → backend retorna resposta → front-end exibe.' },
      { type:'text', title:'Streaming — respostas em tempo real',
        body:'Por padrão, a API do Claude aguarda toda a resposta antes de retornar. Com <strong>streaming</strong>, você recebe a resposta token por token, em tempo real — como a resposta "digitando" que você vê no Claude.ai. Isso melhora muito a UX para respostas longas. Ative com <code>"stream": true</code> na requisição. No backend, use Server-Sent Events (SSE) para repassar os tokens para o front-end.' },
      { type:'text', title:'Gerenciando o histórico da conversa',
        body:'O histórico é um array de objetos <code>{ role, content }</code> que cresce a cada turno. Atenção ao tamanho: históricos muito longos aumentam o custo e podem ultrapassar a janela de contexto. Estratégias: limitar a últimas N mensagens, resumir o histórico periodicamente (peça ao Claude para resumir a conversa), ou usar apenas as mensagens mais relevantes. Para persistência, salve o histórico no localStorage.' },
      { type:'callout',
        body:'<strong>UX de chatbot:</strong> Sempre mostre um indicador de loading enquanto aguarda a resposta. Desabilite o input durante o processamento. Scroll automático para a última mensagem. Suporte a Enter para enviar. Trate erros com mensagem amigável ("Algo deu errado, tente novamente"). Esses detalhes fazem a diferença entre um protótipo e um produto.' },
    ],
    editor: {
      tabs: ['HTML'],
      code: [`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DevBot — Tutor de JavaScript</title>
  <style>
    :root { --bg:#0a0c0f; --card:#13181f; --border:#1e242d; --accent:#00e5a0; --text:#e8edf2; --muted:#8a95a3; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', sans-serif; background: var(--bg); color: var(--text); height: 100vh; display: flex; flex-direction: column; }

    .header { padding: 1rem 1.5rem; background: var(--card); border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: .75rem; }
    .avatar { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, var(--accent), #4fc3f7); display: flex; align-items: center; justify-content: center; font-size: 1rem; }
    .header h1 { font-size: 1rem; color: var(--text); }
    .header p  { font-size: .75rem; color: var(--muted); }

    .mensagens { flex: 1; overflow-y: auto; padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }

    .msg { max-width: 80%; padding: .75rem 1rem; border-radius: 12px; font-size: .9rem; line-height: 1.6; }
    .msg.user      { background: var(--accent); color: #000; border-radius: 12px 12px 4px 12px; align-self: flex-end; font-weight: 500; }
    .msg.assistant { background: var(--card); border: 1px solid var(--border); border-radius: 12px 12px 12px 4px; align-self: flex-start; }
    .msg.loading   { opacity: .6; }
    .msg code      { background: rgba(0,229,160,.1); color: var(--accent); padding: 1px 5px; border-radius: 4px; font-family: monospace; font-size: .85em; }
    .msg pre       { background: #0a0c0f; padding: .75rem; border-radius: 8px; overflow-x: auto; margin: .5rem 0; font-size: .8rem; }
    .msg pre code  { background: none; color: #e8edf2; }

    .input-area { padding: 1rem 1.5rem; background: var(--card); border-top: 1px solid var(--border); display: flex; gap: .75rem; align-items: flex-end; }
    textarea { flex: 1; background: var(--bg); border: 1px solid var(--border); color: var(--text); padding: .6rem 1rem; border-radius: 10px; outline: none; resize: none; font-family: inherit; font-size: .9rem; max-height: 120px; line-height: 1.5; }
    textarea:focus { border-color: var(--accent); }
    button { background: var(--accent); color: #000; border: none; width: 40px; height: 40px; border-radius: 10px; cursor: pointer; font-size: 1.1rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    button:disabled { opacity: .4; cursor: not-allowed; }

    .sugestoes { display: flex; gap: .5rem; flex-wrap: wrap; padding: .75rem 1.5rem 0; }
    .sug { background: var(--card); border: 1px solid var(--border); color: var(--muted); font-size: .75rem; padding: .3rem .75rem; border-radius: 20px; cursor: pointer; transition: all .15s; }
    .sug:hover { border-color: var(--accent); color: var(--accent); }
  </style>
</head>
<body>

  <div class="header">
    <div class="avatar">🤖</div>
    <div>
      <h1>DevBot</h1>
      <p>Tutor de JavaScript • Powered by Claude</p>
    </div>
  </div>

  <div class="sugestoes">
    <span class="sug" onclick="perguntar(this.textContent)">O que são Promises?</span>
    <span class="sug" onclick="perguntar(this.textContent)">Explique closures com exemplo</span>
    <span class="sug" onclick="perguntar(this.textContent)">Como funciona o event loop?</span>
  </div>

  <div class="mensagens" id="mensagens">
    <div class="msg assistant">
      Olá! Sou o DevBot, seu tutor de JavaScript 👋<br>
      Pode me perguntar sobre qualquer conceito — estou aqui para ajudar!
    </div>
  </div>

  <div class="input-area">
    <textarea id="input" placeholder="Pergunte sobre JavaScript..." rows="1"
      onkeydown="if(event.key==='Enter' && !event.shiftKey){event.preventDefault();enviar()}"></textarea>
    <button id="btn" onclick="enviar()">➤</button>
  </div>

  <script>
    // ATENÇÃO: Em produção, esta chamada deve ir para seu backend!
    // Aqui simulamos a resposta para fins didáticos

    const historico = [];
    const SYSTEM = \`Você é DevBot, tutor de JavaScript do DevStart.
Responda em português, com exemplos de código quando relevante.
Seja conciso e didático. Use markdown para formatar código.\`;

    function adicionarMsg(texto, role) {
      const div = document.createElement('div');
      div.className = \`msg \${role}\`;
      div.innerHTML = formatarTexto(texto);
      document.getElementById('mensagens').appendChild(div);
      div.scrollIntoView({ behavior: 'smooth' });
      return div;
    }

    function formatarTexto(texto) {
      // Formatação básica de markdown
      return texto
        .replace(/\`\`\`(\w+)?\n([\s\S]*?)\`\`\`/g, '<pre><code>$2</code></pre>')
        .replace(/\`([^\`]+)\`/g, '<code>$1</code>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>');
    }

    async function enviar() {
      const input = document.getElementById('input');
      const texto = input.value.trim();
      if (!texto) return;

      adicionarMsg(texto, 'user');
      historico.push({ role: 'user', content: texto });
      input.value = '';

      const btn = document.getElementById('btn');
      btn.disabled = true;

      const loading = adicionarMsg('Pensando...', 'assistant loading');

      try {
        // EM PRODUÇÃO: substituir pela chamada ao seu backend
        // const res = await fetch('/api/chat', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ mensagem: texto, historico })
        // });
        // const data = await res.json();
        // const resposta = data.resposta;

        // SIMULAÇÃO DIDÁTICA (remova em produção):
        await new Promise(r => setTimeout(r, 1200));
        const resposta = \`Ótima pergunta sobre **\${texto.slice(0,30)}...**!

Em um projeto real, aqui viria a resposta do Claude via API.

Para implementar: crie um backend Node.js com Express que:
1. Recebe a mensagem via POST /api/chat
2. Chama a API do Claude com o histórico
3. Retorna a resposta

Exemplo de código:
\\\`\\\`\\\`javascript
const res = await fetch('/api/chat', {
  method: 'POST',
  body: JSON.stringify({ mensagem })
});
\\\`\\\`\\\`\`;

        historico.push({ role: 'assistant', content: resposta });
        loading.className = 'msg assistant';
        loading.innerHTML = formatarTexto(resposta);
        loading.scrollIntoView({ behavior: 'smooth' });

      } catch (erro) {
        loading.innerHTML = '❌ Erro ao conectar. Verifique o backend.';
        loading.style.borderColor = '#ff4d4d';
      } finally {
        btn.disabled = false;
        input.focus();
      }
    }

    function perguntar(texto) {
      document.getElementById('input').value = texto;
      enviar();
    }
  </script>
</body>
</html>`],
    },
    quiz: [
      { q:'O que é streaming na API do Claude?',
        opts:['Transmissão de vídeo','Receber a resposta token por token em tempo real, em vez de aguardar o texto completo','Um método de autenticação mais seguro','Enviar múltiplas mensagens simultaneamente'],
        correct:1, explanation:'Streaming envia os tokens gerados progressivamente, em vez de aguardar toda a resposta. Isso cria a experiência de "digitando em tempo real" que melhora muito a UX para respostas longas.' },
      { q:'Por que históricos de conversa muito longos são problemáticos?',
        opts:['O navegador não consegue armazenar','Aumentam o custo (mais tokens de input) e podem ultrapassar a janela de contexto do modelo','O modelo fica confuso com muitas mensagens','A API bloqueia após 10 mensagens'],
        correct:1, explanation:'Cada requisição envia todo o histórico — históricos longos significam mais tokens de input em cada chamada (custo maior) e podem ultrapassar o limite de contexto do modelo. Estratégias: limitar N mensagens ou resumir periodicamente.' },
      { q:'Qual é a arquitetura correta para um chatbot seguro?',
        opts:['Front-end → API Claude diretamente','Front-end → Backend (com API key em .env) → API Claude','API Claude → Front-end → Backend','Backend → Front-end → API Claude'],
        correct:1, explanation:'A API key deve ficar no backend (servidor), nunca no front-end. O front-end chama seu backend, o backend usa a key para chamar o Claude. Assim a key nunca fica exposta no código do browser.' },
    ],
    challenge: {
      title:'Chatbot com personalidade customizada',
      desc:'Construa um chatbot especializado para um caso de uso específico.',
      tasks:[
        'Use o código do editor como base e customize o design',
        'Defina um system prompt para dar personalidade: assistente de receitas, tutor de inglês ou qualquer tema',
        'Implemente contagem de tokens estimada (caracteres / 4 como aproximação)',
        'Adicione botão de limpar conversa que reseta o histórico',
        'Conecte ao seu backend Node.js do capítulo anterior (substitua a simulação)',
      ],
    },
  },

  /* ──────────────────────────────────────────────────────────
     CAP 05 — Análise e geração de conteúdo
  ────────────────────────────────────────────────────────── */
  'ia-05': {
    moduleId: 'ia',
    title: 'Análise e geração de conteúdo com IA',
    desc: 'Além de chat, a API do Claude permite analisar textos, extrair dados estruturados, gerar conteúdo em formatos específicos e processar documentos — casos de uso poderosos para qualquer aplicação.',
    blocks: [
      { type:'text', title:'Extração de dados estruturados',
        body:'Um dos usos mais poderosos de LLMs: extrair dados estruturados de texto não estruturado. Você pode pedir ao Claude para retornar JSON com campos específicos extraídos de um texto. Exemplo: passe um currículo em texto e peça um JSON com nome, habilidades e experiências. Ou passe avaliações de clientes e peça um JSON com sentimento, pontos positivos e negativos. Isso é NLP (processamento de linguagem natural) sem treinar nenhum modelo.' },
      { type:'text', title:'Análise e resumo de documentos',
        body:'Claude tem janela de contexto extensa — consegue processar documentos longos em uma única requisição. Usos práticos: resumir artigos técnicos, extrair action items de atas de reunião, analisar termos de serviço em linguagem simples, classificar emails por urgência, comparar documentos e apontar diferenças. O padrão: envie o documento no prompt + instrução específica do que fazer com ele.' },
      { type:'text', title:'Geração de conteúdo com formato',
        body:'Claude pode gerar conteúdo em qualquer formato que você especificar: HTML para uma seção da página, JSON para alimentar um frontend, Markdown para documentação, CSV para importar numa planilha. Especifique o formato com precisão no prompt: "Retorne APENAS JSON válido, sem texto antes ou depois, com os campos: titulo (string), tags (array de strings), dificuldade (1-5)."' },
      { type:'callout',
        body:'<strong>Output JSON confiável:</strong> Para extrair JSON do Claude de forma robusta, instrua o modelo a retornar apenas JSON, sem formatação markdown (sem ```json). No código, use try/catch ao fazer JSON.parse. Uma técnica alternativa: use regex para extrair o JSON da resposta — <code>texto.match(/\{[\s\S]*\}/)?.[0]</code>. Para uso crítico, valide o JSON recebido com um schema (Zod, JSON Schema).' },
    ],
    editor: {
      tabs: ['HTML'],
      code: [`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Análise de Texto com IA</title>
  <style>
    :root { --bg:#0a0c0f; --card:#13181f; --border:#1e242d; --accent:#00e5a0; --text:#e8edf2; --muted:#8a95a3; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', sans-serif; background: var(--bg); color: var(--text); padding: 2rem; max-width: 800px; margin: 0 auto; }
    h1 { color: var(--accent); margin-bottom: 1.5rem; }
    h3 { color: var(--text); margin-bottom: .75rem; font-size: .9rem; text-transform: uppercase; letter-spacing: .05em; }
    textarea { width: 100%; background: var(--card); border: 1px solid var(--border); color: var(--text); padding: 1rem; border-radius: 10px; outline: none; font-family: inherit; resize: vertical; min-height: 120px; margin-bottom: 1rem; }
    textarea:focus { border-color: var(--accent); }
    .botoes { display: flex; gap: .5rem; flex-wrap: wrap; margin-bottom: 1.5rem; }
    button { background: var(--accent); color: #000; border: none; padding: .5rem 1rem; border-radius: 8px; cursor: pointer; font-weight: 700; font-size: .85rem; }
    button.sec { background: var(--card); border: 1px solid var(--border); color: var(--muted); }
    button:disabled { opacity: .4; }
    .resultado { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 1.25rem; margin-top: 1rem; min-height: 80px; }
    .tag { display: inline-block; background: rgba(0,229,160,.1); color: var(--accent); font-size: .75rem; padding: .2rem .6rem; border-radius: 20px; margin: .2rem; }
    .sentimento { font-size: 1.5rem; margin-bottom: .5rem; }
    .campo { margin-bottom: .75rem; }
    .campo label { font-size: .75rem; color: var(--muted); display: block; margin-bottom: .25rem; }
    .campo p { font-size: .9rem; line-height: 1.6; }
    .loading { color: var(--muted); font-style: italic; }
  </style>
</head>
<body>
  <h1>🔍 Análise de Texto com IA</h1>

  <h3>Texto para analisar</h3>
  <textarea id="texto" placeholder="Cole aqui qualquer texto — avaliação de produto, artigo, email, código...">O DevStart é uma plataforma incrível de aprendizado! Os módulos são muito bem estruturados e os exemplos práticos fazem toda a diferença. Aprendi HTML e CSS em tempo recorde. O único ponto de melhoria seria adicionar mais exercícios interativos nos capítulos de JavaScript.</textarea>

  <div class="botoes">
    <button onclick="analisar('sentimento')">😊 Sentimento</button>
    <button onclick="analisar('resumo')">📝 Resumir</button>
    <button onclick="analisar('extrair')">📊 Extrair dados</button>
    <button onclick="analisar('melhorar')">✨ Melhorar texto</button>
  </div>

  <div class="resultado" id="resultado">
    <p style="color:var(--muted)">Escolha uma análise acima...</p>
  </div>

  <script>
    const prompts = {
      sentimento: (t) => \`Analise o sentimento deste texto e retorne APENAS um JSON:
{
  "sentimento": "positivo|negativo|neutro|misto",
  "emoji": "emoji representando o sentimento",
  "pontuacao": número de 1 a 10,
  "pontos_positivos": ["item1", "item2"],
  "pontos_negativos": ["item1"],
  "resumo": "frase curta sobre o sentimento"
}

Texto: """
\${t}
"""\`,

      resumo: (t) => \`Resuma este texto em 3 bullet points concisos em português.
Retorne APENAS um JSON: { "pontos": ["ponto1", "ponto2", "ponto3"] }

Texto: """
\${t}
"""\`,

      extrair: (t) => \`Extraia entidades deste texto. Retorne APENAS JSON:
{
  "pessoas": [],
  "organizacoes": [],
  "datas": [],
  "topicos_principais": [],
  "tom": "formal|informal|tecnico|casual"
}

Texto: """
\${t}
"""\`,

      melhorar: (t) => \`Melhore a clareza e objetividade deste texto, mantendo o conteúdo original.
Retorne APENAS JSON: { "original_palavras": número, "melhorado": "texto melhorado aqui", "melhorado_palavras": número, "mudancas": ["mudança1", "mudança2"] }

Texto: """
\${t}
"""\`,
    };

    const renderizadores = {
      sentimento: (d) => \`
        <div class="sentimento">\${d.emoji}</div>
        <div class="campo"><label>Sentimento</label><p>\${d.sentimento} — \${d.pontuacao}/10</p></div>
        <div class="campo"><label>Resumo</label><p>\${d.resumo}</p></div>
        <div class="campo"><label>Positivos</label>\${d.pontos_positivos.map(p=>\`<span class="tag">✓ \${p}</span>\`).join('')}</div>
        \${d.pontos_negativos.length ? \`<div class="campo"><label>Melhorias</label>\${d.pontos_negativos.map(p=>\`<span class="tag" style="background:rgba(255,77,77,.1);color:#ff4d4d">↑ \${p}</span>\`).join('')}</div>\` : ''}
      \`,
      resumo: (d) => d.pontos.map(p => \`<p style="padding:.4rem 0;border-bottom:1px solid var(--border)">• \${p}</p>\`).join(''),
      extrair: (d) => Object.entries(d).map(([k, v]) =>
        \`<div class="campo"><label>\${k}</label><p>\${Array.isArray(v) ? (v.length ? v.map(i=>\`<span class="tag">\${i}</span>\`).join('') : '—') : v}</p></div>\`
      ).join(''),
      melhorar: (d) => \`
        <div class="campo"><label>Texto melhorado (\${d.original_palavras}→\${d.melhorado_palavras} palavras)</label><p style="line-height:1.7">\${d.melhorado}</p></div>
        <div class="campo"><label>Mudanças feitas</label>\${d.mudancas.map(m=>\`<span class="tag">✓ \${m}</span>\`).join('')}</div>
      \`,
    };

    async function analisar(tipo) {
      const texto = document.getElementById('texto').value.trim();
      if (!texto) return alert('Adicione um texto para analisar!');

      const resultado = document.getElementById('resultado');
      resultado.innerHTML = '<p class="loading">🤖 Analisando com IA...</p>';
      document.querySelectorAll('button').forEach(b => b.disabled = true);

      try {
        // SIMULAÇÃO — substituir pela chamada ao backend real
        await new Promise(r => setTimeout(r, 1500));

        // Dados simulados para demonstração
        const simulados = {
          sentimento: { sentimento: 'positivo', emoji: '😊', pontuacao: 8, pontos_positivos: ['Módulos bem estruturados', 'Exemplos práticos', 'Aprendizado rápido'], pontos_negativos: ['Poucos exercícios interativos'], resumo: 'Avaliação muito positiva com sugestão construtiva' },
          resumo: { pontos: ['Plataforma DevStart tem módulos bem estruturados com exemplos práticos', 'Usuário aprendeu HTML e CSS rapidamente', 'Sugestão: adicionar mais exercícios interativos em JavaScript'] },
          extrair: { pessoas: [], organizacoes: ['DevStart'], datas: [], topicos_principais: ['aprendizado', 'HTML', 'CSS', 'JavaScript', 'exercícios interativos'], tom: 'informal' },
          melhorar: { original_palavras: 52, melhorado: 'A plataforma DevStart oferece módulos bem estruturados com exemplos práticos eficazes. O aprendizado de HTML e CSS foi ágil e satisfatório. Recomendo a adição de exercícios interativos nos módulos de JavaScript para aprimorar a experiência.', melhorado_palavras: 38, mudancas: ['Linguagem mais formal', 'Estrutura mais clara', 'Eliminação de redundâncias'] },
        };

        const dados = simulados[tipo];
        resultado.innerHTML = renderizadores[tipo](dados);

      } catch (e) {
        resultado.innerHTML = \`<p style="color:#ff4d4d">❌ Erro: \${e.message}</p>\`;
      } finally {
        document.querySelectorAll('button').forEach(b => b.disabled = false);
      }
    }
  </script>
</body>
</html>`],
    },
    quiz: [
      { q:'Como extrair dados estruturados de texto com a API do Claude?',
        opts:['É impossível — LLMs só geram texto livre','Instrua o modelo a retornar APENAS JSON com os campos desejados, use JSON.parse na resposta','Use um modelo de ML separado para extração','Processe a resposta com regex em todos os casos'],
        correct:1, explanation:'LLMs podem retornar texto em qualquer formato que você especificar. Para JSON, instrua claramente: "Retorne APENAS JSON válido, sem texto antes ou depois" e use JSON.parse no código.' },
      { q:'Como processar documentos longos com o Claude?',
        opts:['Divida sempre em partes de 100 palavras','Envie o documento completo no prompt — Claude tem janela de contexto extensa suficiente para documentos longos','Use apenas as primeiras 3 frases','Pré-processe com outro modelo primeiro'],
        correct:1, explanation:'Claude tem janela de contexto extensa (centenas de milhares de tokens) — consegue processar documentos longos em uma única requisição. Envie o documento + instrução do que fazer com ele.' },
      { q:'Qual técnica torna JSON extraído por LLM mais robusto?',
        opts:['Sempre confiar que o modelo retorna JSON perfeito','Instruir "APENAS JSON sem markdown", usar try/catch no parse, e validar o schema recebido','Usar apenas campos de texto simples','Fazer múltiplas requisições e votar'],
        correct:1, explanation:'Combine: instrua o modelo a retornar apenas JSON (sem ```json), envolva JSON.parse em try/catch (pode falhar), e valide o schema com Zod ou verificação manual para garantir os campos esperados.' },
    ],
    challenge: {
      title:'Analisador de código com IA',
      desc:'Construa uma ferramenta que analisa código JavaScript e gera feedback estruturado.',
      tasks:[
        'Crie interface com textarea para colar código JavaScript',
        'Crie prompt que pede ao Claude: bugs encontrados, sugestões de melhoria, nota de qualidade (1-10)',
        'Faça o Claude retornar JSON: { nota, bugs[], melhorias[], versaoMelhorada }',
        'Renderize o resultado de forma visual e clara na página',
        'Adicione botão de "melhorar código" que aplica as sugestões automaticamente',
      ],
    },
  },

  /* ──────────────────────────────────────────────────────────
     CAP 06 — IA no fluxo de desenvolvimento
  ────────────────────────────────────────────────────────── */
  'ia-06': {
    moduleId: 'ia',
    title: 'IA no fluxo de desenvolvimento',
    desc: 'IA não substitui o desenvolvedor — amplifica sua produtividade. Aprenda a usar Claude como parceiro de desenvolvimento: geração de código, revisão, debugging, documentação e testes.',
    blocks: [
      { type:'text', title:'IA como pair programmer',
        body:'Pair programming é uma técnica onde dois desenvolvedores trabalham juntos no mesmo código. Com Claude, você tem um pair programmer disponível 24/7 que conhece praticamente todas as linguagens e frameworks. Use para: explorar abordagens antes de implementar, revisar código antes de commitar, entender código legado confuso, descobrir APIs que você não conhecia, e desbloquear quando você está travado num problema.' },
      { type:'text', title:'Prompts para geração de código',
        body:'Para obter código útil: especifique a linguagem e versão, descreva o contexto do projeto, dê um exemplo de entrada e saída esperada, mencione restrições (performance, compatibilidade), peça comentários explicativos. Exemplo: "Em JavaScript moderno (ES2022), crie uma função que recebe um array de objetos com {id, nome, nota} e retorna os 3 melhores ordenados por nota. Inclua tratamento para arrays vazios e comentários."' },
      { type:'text', title:'Debugging com IA',
        body:'Ao pedir ajuda com um bug: forneça o código completo relevante, a mensagem de erro exata (copie do console), o comportamento esperado vs o obtido, e o que você já tentou. Quanto mais contexto, melhor. Claude pode identificar: erros de tipo, problemas de escopo, condições de corrida, erros de lógica, problemas de async/await. Também peça para ele explicar por que o bug acontece — entender > copiar solução.' },
      { type:'callout',
        body:'<strong>Validação é obrigatória:</strong> Claude pode gerar código com bugs, APIs desatualizadas ou soluções subótimas. Sempre: leia e entenda o código antes de usar, execute e teste, verifique a documentação oficial para APIs críticas, e use suas próprias boas práticas de segurança. IA amplifica o que você já sabe — se você não revisar, erros passam despercebidos.' },
    ],
    editor: {
      tabs: ['JS'],
      code: [`// ── PROMPTS EFICAZES PARA DESENVOLVIMENTO ───────────────────

// 1. GERAÇÃO DE CÓDIGO — contexto + exemplo + restrições
const promptGeracaoCode = \`
Linguagem: JavaScript ES2022
Contexto: Plataforma educacional DevStart

Crie uma função \`calcularProgresso\` que:
- Recebe: array de módulos [{id, titulo, capitulos: [{id, concluido}]}]
- Retorna: { total, concluidos, percentual, proximoCapitulo }
- Trata: array vazio, módulos sem capítulos, todos concluídos
- Estilo: arrow functions, destructuring, sem mutação

Exemplo entrada:
[{id:'css', titulo:'CSS', capitulos:[{id:'css-01', concluido:true},{id:'css-02', concluido:false}]}]

Exemplo saída:
{total:2, concluidos:1, percentual:50, proximoCapitulo:'css-02'}
\`;

// 2. CODE REVIEW — peça análise específica
const promptReview = \`
Revise este código JavaScript como um desenvolvedor sênior:

\\\`\\\`\\\`javascript
function buscarAluno(lista, id) {
  for(var i = 0; i < lista.length; i++) {
    if(lista[i].id == id) return lista[i]
  }
}
\\\`\\\`\\\`

Analise:
1. Problemas de qualidade/boas práticas
2. Possíveis bugs ou edge cases
3. Performance
4. Versão melhorada com comentários explicando as mudanças
\`;

// 3. DEBUGGING — contexto completo do erro
const promptDebug = \`
Tenho um bug em JavaScript. Preciso de ajuda.

**Código:**
\\\`\\\`\\\`javascript
async function carregarModulos() {
  const modulos = await fetch('/api/modulos').then(r => r.json());
  modulos.forEach(modulo => {
    renderizarModulo(modulo);
  });
}
\\\`\\\`\\\`

**Erro no console:**
TypeError: Cannot read properties of undefined (reading 'forEach')

**Comportamento esperado:** Listar módulos na página
**O que já tentei:** Verifiquei que a API retorna dados corretos no Postman

Por que esse erro ocorre e como corrigir?
\`;

// 4. DOCUMENTAÇÃO — gerar JSDoc
const promptDoc = \`
Adicione comentários JSDoc completos a esta função:

function processarPagamento(pedido, opcoesPagamento) {
  if (!pedido.itens?.length) throw new Error('Pedido sem itens');
  const subtotal = pedido.itens.reduce((s, i) => s + i.preco * i.qtd, 0);
  const desconto = opcoesPagamento.cupom ? subtotal * 0.1 : 0;
  return { subtotal, desconto, total: subtotal - desconto };
}
\`;

console.log('Prompts prontos para usar no Claude!');`],
    },
    quiz: [
      { q:'Qual informação é mais importante ao pedir debugging ao Claude?',
        opts:['Apenas o código','Código + mensagem de erro exata + comportamento esperado vs obtido','Apenas a mensagem de erro','O nome do arquivo e linha'],
        correct:1, explanation:'Quanto mais contexto, melhor o debugging. Forneça: código completo relevante, mensagem de erro exata (copie do console), o que você esperava vs o que aconteceu, e o que já tentou. Isso evita suposições e acelera a solução.' },
      { q:'Por que validar código gerado por IA é obrigatório?',
        opts:['Por questões legais','IA pode gerar código com bugs, APIs desatualizadas ou soluções subótimas — sempre revise, entenda e teste antes de usar','O código gerado é sempre correto','Para verificar o estilo de código'],
        correct:1, explanation:'LLMs podem gerar código plausível mas incorreto, usar APIs deprecadas ou criar vulnerabilidades de segurança sutis. Sempre leia, entenda, execute e teste o código gerado. IA amplifica suas capacidades — não substitui o julgamento.' },
      { q:'Como usar IA efetivamente como pair programmer?',
        opts:['Copiando código sem ler','Explorando abordagens, revisando código, desbloqueando problemas e entendendo código legado — mantendo você como o tomador de decisões','Deixando a IA escrever todo o código','Usando apenas para documentação'],
        correct:1, explanation:'IA é mais eficaz como um consultor disponível 24/7: ajuda a explorar opções, revisar antes de commitar, entender código confuso e desbloquear problemas. O desenvolvedor mantém o controle e a responsabilidade.' },
    ],
    challenge: {
      title:'Assistente de código pessoal',
      desc:'Integre IA no seu próprio fluxo de desenvolvimento.',
      tasks:[
        'Crie uma ferramenta CLI (Node.js) que lê um arquivo .js e envia para revisão do Claude',
        'O Claude deve retornar: bugs, melhorias, nota de qualidade e versão melhorada',
        'Salve o resultado em arquivo .md de revisão',
        'Adicione flag --fix que sobrescreve o arquivo original com a versão melhorada',
        'Documente a ferramenta com README.md explicando uso e exemplos',
      ],
    },
  },

  /* ──────────────────────────────────────────────────────────
     CAP 07 — Construindo features com IA
  ────────────────────────────────────────────────────────── */
  'ia-07': {
    moduleId: 'ia',
    title: 'Construindo features com IA',
    desc: 'IA como feature do produto — não só ferramenta de desenvolvimento. Aprenda a construir funcionalidades que usam IA como componente central: busca semântica, geração personalizada e automação.',
    blocks: [
      { type:'text', title:'IA como feature vs ferramenta',
        body:'Existe uma diferença importante: usar IA para <em>construir</em> (ferramenta de dev) vs construir IA <em>dentro</em> do produto (feature). Como feature, IA adiciona: busca semântica ("encontre módulos sobre assíncrono"), personalização ("crie um plano de estudos para mim"), automação ("corrija meus exercícios e dê feedback"), geração de conteúdo ("explique este erro de forma mais simples"), análise ("qual meu ponto mais fraco?").' },
      { type:'text', title:'Padrão RAG — contexto dinâmico',
        body:'RAG (Retrieval Augmented Generation) é o padrão mais importante em aplicações de IA. Em vez de depender do conhecimento do modelo, você: (1) busca informações relevantes do seu banco de dados, (2) injeta essas informações no contexto do prompt, (3) o modelo responde usando os dados reais da sua aplicação. Isso permite IA que conhece <em>seu</em> conteúdo específico — documentação interna, produtos do e-commerce, FAQ da empresa.' },
      { type:'text', title:'Rate limiting e custos na produção',
        body:'Em produção com muitos usuários, o custo da API de IA pode crescer rapidamente. Estratégias: <strong>cache</strong> — armazene respostas de perguntas frequentes e reutilize. <strong>Rate limiting</strong> — limite requisições por usuário por hora. <strong>Modelo menor primeiro</strong> — use Haiku para tarefas simples, Sonnet para complexas. <strong>Streaming</strong> — melhora UX mas não reduz custo. <strong>max_tokens conservador</strong> — defina o mínimo necessário.' },
      { type:'callout',
        body:'<strong>Moderação de conteúdo:</strong> Ao criar features com IA, considere que usuários podem tentar usar para fins impróprios. O Claude já tem guardrails internos, mas você pode reforçar com: system prompts restritivos ("só responda sobre X"), validação de input antes de enviar, e monitoramento das conversas. Leia os Termos de Uso da API da Anthropic para saber o que é permitido construir.' },
    ],
    editor: {
      tabs: ['HTML'],
      code: [`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DevStart — Busca Inteligente</title>
  <style>
    :root { --bg:#0a0c0f; --card:#13181f; --border:#1e242d; --accent:#00e5a0; --text:#e8edf2; --muted:#8a95a3; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', sans-serif; background: var(--bg); color: var(--text); padding: 2rem; max-width: 700px; margin: 0 auto; }
    h1 { color: var(--accent); margin-bottom: .5rem; }
    p.sub { color: var(--muted); margin-bottom: 1.5rem; font-size: .9rem; }
    .search-box { position: relative; margin-bottom: 1.5rem; }
    input { width: 100%; background: var(--card); border: 1px solid var(--border); color: var(--text); padding: .8rem 1rem .8rem 2.5rem; border-radius: 12px; outline: none; font-size: 1rem; }
    input:focus { border-color: var(--accent); }
    .search-icon { position: absolute; left: .85rem; top: 50%; transform: translateY(-50%); color: var(--muted); }
    .resultados { display: flex; flex-direction: column; gap: .75rem; }
    .item { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 1.1rem 1.25rem; cursor: pointer; transition: border-color .2s; }
    .item:hover { border-color: var(--accent); }
    .item-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; }
    .item h3 { font-size: .95rem; color: var(--text); }
    .item p  { font-size: .825rem; color: var(--muted); margin-top: .35rem; line-height: 1.5; }
    .badge { background: rgba(0,229,160,.1); color: var(--accent); font-size: .7rem; padding: .2rem .6rem; border-radius: 20px; white-space: nowrap; flex-shrink: 0; }
    .relevancia { font-size: .75rem; color: var(--muted); margin-top: .5rem; font-style: italic; }
    .resposta-ia { background: linear-gradient(135deg, rgba(0,229,160,.05), rgba(79,195,247,.05)); border: 1px solid rgba(0,229,160,.2); border-radius: 12px; padding: 1.25rem; margin-bottom: 1rem; }
    .resposta-ia h3 { color: var(--accent); font-size: .85rem; margin-bottom: .5rem; }
    .resposta-ia p { font-size: .9rem; line-height: 1.7; color: var(--text); }
    .loading-dots::after { content: ''; animation: dots 1.2s infinite; }
    @keyframes dots { 0%{content:'.'} 33%{content:'..'} 66%{content:'...'} }
    .empty { text-align: center; padding: 3rem; color: var(--muted); }
  </style>
</head>
<body>
  <h1>🔍 Busca Inteligente</h1>
  <p class="sub">Pergunte em linguagem natural — IA encontra o conteúdo mais relevante para você.</p>

  <div class="search-box">
    <span class="search-icon">🔍</span>
    <input type="text" id="busca" placeholder="Ex: como centralizar elementos com flexbox?" autofocus>
  </div>

  <div id="resultados" class="resultados">
    <div class="empty">Digite uma pergunta para começar</div>
  </div>

  <script>
    // BASE DE CONTEÚDO (simula seu banco de dados de módulos)
    const conteudo = [
      { id:'css-06', modulo:'CSS', titulo:'Flexbox — layout unidimensional', desc:'justify-content, align-items, flex-wrap, gap e todas as propriedades essenciais do Flexbox para criar layouts modernos.' },
      { id:'css-07', modulo:'CSS', titulo:'CSS Grid — layout bidimensional', desc:'grid-template-columns, auto-fit, minmax e grid-template-areas para layouts complexos de página.' },
      { id:'css-03', modulo:'CSS', titulo:'Box Model', desc:'content, padding, border, margin e box-sizing: border-box — o fundamento de todo layout CSS.' },
      { id:'css-08', modulo:'CSS', titulo:'Posicionamento CSS', desc:'static, relative, absolute, fixed e sticky — como tirar elementos do fluxo normal e posicioná-los precisamente.' },
      { id:'js-06', modulo:'JavaScript', titulo:'Objetos', desc:'Criação, destructuring, spread, Object.entries, referência vs valor — a estrutura de dados mais versátil do JS.' },
      { id:'js-09', modulo:'JavaScript', titulo:'Fetch API e Promises', desc:'async/await, try/catch, Promise.all, e como fazer requisições HTTP de forma moderna e robusta.' },
    ];

    let debounce;
    document.getElementById('busca').addEventListener('input', (e) => {
      clearTimeout(debounce);
      const q = e.target.value.trim();
      if (!q) { document.getElementById('resultados').innerHTML = '<div class="empty">Digite uma pergunta para começar</div>'; return; }
      if (q.length < 3) return;
      debounce = setTimeout(() => buscarComIA(q), 500);
    });

    async function buscarComIA(query) {
      const el = document.getElementById('resultados');
      el.innerHTML = '<div class="resposta-ia"><h3>🤖 IA analisando...</h3><p class="loading-dots">Buscando conteúdo relevante</p></div>';

      // Simula chamada ao backend + API Claude
      await new Promise(r => setTimeout(r, 1000));

      // Em produção: enviar query + conteudo[] para Claude e pedir:
      // { resumo: "resposta direta", ids_relevantes: ["css-06", "css-07"], explicacoes: {"css-06": "por quê é relevante"} }

      const simulado = {
        resumo: \`Para centralizar elementos com **Flexbox**, use \`display: flex\` no container pai, então \`justify-content: center\` para centralizar horizontalmente e \`align-items: center\` para centralizar verticalmente. Para centralização absoluta em ambos os eixos, combine as duas propriedades.\`,
        relevantes: [
          { ...conteudo[0], relevancia: 'Contém justify-content e align-items — as propriedades exatas para centralização' },
          { ...conteudo[2], relevancia: 'Box Model explica o espaçamento que afeta o alinhamento visual' },
          { ...conteudo[3], relevancia: 'Posicionamento é alternativa para centralização absoluta' },
        ]
      };

      el.innerHTML = \`
        <div class="resposta-ia">
          <h3>🤖 Resposta direta</h3>
          <p>\${simulado.resumo.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\`([^\`]+)\`/g, '<code style="background:rgba(0,229,160,.1);color:var(--accent);padding:1px 5px;border-radius:3px">$1</code>')}</p>
        </div>
        \${simulado.relevantes.map(r => \`
          <div class="item">
            <div class="item-header">
              <h3>\${r.titulo}</h3>
              <span class="badge">\${r.modulo}</span>
            </div>
            <p>\${r.desc}</p>
            <p class="relevancia">💡 \${r.relevancia}</p>
          </div>
        \`).join('')}
      \`;
    }
  </script>
</body>
</html>`],
    },
    quiz: [
      { q:'O que é o padrão RAG?',
        opts:['Random Access Generation — geração aleatória de texto','Retrieval Augmented Generation — busca dados relevantes do banco e injeta no prompt para o modelo responder com informações reais','Really Accurate GPT — versão mais precisa','Real-time AI Generation'],
        correct:1, explanation:'RAG (Retrieval Augmented Generation): busca informações relevantes do seu banco de dados e as injeta no prompt. Permite que o modelo responda sobre SEU conteúdo específico, não só sobre o que foi treinado.' },
      { q:'Como reduzir custos de API de IA em produção?',
        opts:['Usar sempre o modelo mais caro','Cache de respostas frequentes + rate limiting por usuário + modelo menor para tarefas simples + max_tokens conservador','Limitar a 1 requisição por dia','Compactar o texto antes de enviar'],
        correct:1, explanation:'Em produção: cache respostas de perguntas frequentes (reutilize), rate limit por usuário, use Haiku para tarefas simples e Sonnet para complexas, e defina max_tokens no mínimo necessário.' },
      { q:'Por que system prompts restritivos são importantes em features de IA?',
        opts:['Tornam o modelo mais rápido','Evitam que usuários usem a feature para fins não pretendidos, protegendo seu produto e seus custos de API','São apenas para testes','Reduzem o tamanho das respostas'],
        correct:1, explanation:'System prompts restritivos ("só responda sobre X") delimitam o escopo da feature, evitam uso abusivo, protegem contra prompt injection, e garantem que a IA entrega o valor pretendido do produto.' },
    ],
    challenge: {
      title:'Feature de plano de estudos personalizado',
      desc:'Construa uma feature que usa IA para criar planos de estudo personalizados.',
      tasks:[
        'Crie formulário: objetivo do usuário, tempo disponível por semana, conhecimento atual',
        'Monte prompt que injeta esses dados + lista de módulos disponíveis no DevStart',
        'Peça ao Claude para retornar JSON: { sequencia[], estimativa_semanas, dicas_personalizadas[] }',
        'Renderize o plano de estudos visualmente como timeline',
        'Adicione botão de regenerar que pede variação com foco diferente',
      ],
    },
  },

  /* ──────────────────────────────────────────────────────────
     CAP 08 — Desafio Final — IA
  ────────────────────────────────────────────────────────── */
  'ia-08': {
    moduleId: 'ia',
    title: '🏆 Desafio Final — IA com Claude',
    desc: 'O capítulo final. Você completou a jornada de zero a desenvolvedor com IA. Construa seu projeto final integrando tudo que aprendeu.',
    blocks: [
      { type:'text', title:'O que você domina agora',
        body:'Em 7 capítulos você aprendeu: fundamentos de LLMs e como modelos funcionam, engenharia de prompts para outputs precisos e consistentes, integração com a API do Claude de forma segura, construção de chatbots com histórico e streaming, extração e geração de conteúdo estruturado, uso de IA no fluxo de desenvolvimento, e construção de features de produto com IA. Isso te coloca em um grupo pequeno de desenvolvedores.' },
      { type:'text', title:'O desenvolvedor com IA em 2025',
        body:'O mercado de tecnologia mudou definitivamente. Desenvolvedores que sabem integrar IA em produtos são mais produtivos, constroem features antes impossíveis para times pequenos, e entregam valor que antes exigia equipes inteiras de ML. As empresas mais inovadoras hoje são pequenos times usando IA como alavanca. Você tem agora o conhecimento técnico completo para ser um desses desenvolvedores.' },
      { type:'callout',
        body:'<strong>Continue aprendendo:</strong> HTML + CSS + JavaScript + IA é uma base sólida. Os próximos passos naturais são: React (componentes de UI reutilizáveis), Node.js + Express (backend completo), banco de dados (PostgreSQL ou MongoDB), Git e GitHub (versionamento e colaboração), e deploy (Vercel, Railway). Com cada tecnologia nova, você pode usar o Claude como tutor e acelerador.' },
      { type:'text', title:'Projeto Final — Portfólio Inteligente',
        body:'Construa um portfólio pessoal com IA integrada que demonstre todos os seus projetos do DevStart. O portfólio deve ter: apresentação com suas skills, galeria dos projetos construídos no curso, e um chat com IA que responde perguntas sobre você e seu trabalho (usando RAG com suas informações pessoais no contexto). Esse portfólio vai impressionar qualquer recrutador técnico.' },
    ],
    editor: {
      tabs: ['HTML'],
      code: [`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfólio — [Seu Nome]</title>
  <style>
    :root {
      --bg: #0a0c0f; --card: #13181f; --border: #1e242d;
      --accent: #00e5a0; --text: #e8edf2; --muted: #8a95a3;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', sans-serif; background: var(--bg); color: var(--text); }

    /* ── HERO ── */
    .hero {
      min-height: 100vh; display: flex; flex-direction: column;
      align-items: center; justify-content: center; text-align: center;
      padding: 2rem;
      background: radial-gradient(ellipse at 50% 0%, rgba(0,229,160,.07) 0%, transparent 70%);
    }
    .hero h1 { font-size: clamp(2rem, 6vw, 4rem); font-weight: 800; }
    .hero h1 span { color: var(--accent); }
    .hero p { color: var(--muted); margin: 1rem 0 2rem; font-size: 1.1rem; max-width: 500px; line-height: 1.7; }
    .skills { display: flex; gap: .5rem; flex-wrap: wrap; justify-content: center; }
    .skill-tag { background: rgba(0,229,160,.1); color: var(--accent); padding: .3rem .85rem; border-radius: 20px; font-size: .85rem; border: 1px solid rgba(0,229,160,.2); }

    /* ── PROJETOS ── */
    section { padding: 5rem 2rem; max-width: 1000px; margin: 0 auto; }
    h2 { font-size: 1.75rem; margin-bottom: .5rem; }
    h2 span { color: var(--accent); }
    .sub { color: var(--muted); margin-bottom: 2.5rem; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem; }
    .projeto { background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 1.5rem; transition: border-color .2s, transform .2s; }
    .projeto:hover { border-color: var(--accent); transform: translateY(-4px); }
    .projeto-icon { font-size: 2rem; margin-bottom: .75rem; }
    .projeto h3 { margin-bottom: .4rem; }
    .projeto p { color: var(--muted); font-size: .875rem; line-height: 1.6; margin-bottom: 1rem; }
    .tags { display: flex; gap: .35rem; flex-wrap: wrap; }
    .tag { background: var(--bg); border: 1px solid var(--border); color: var(--muted); font-size: .7rem; padding: .15rem .5rem; border-radius: 10px; }

    /* ── CHAT IA ── */
    .chat-section { background: var(--card); border-top: 1px solid var(--border); padding: 4rem 2rem; }
    .chat-inner { max-width: 700px; margin: 0 auto; }
    .chat-msgs { height: 300px; overflow-y: auto; margin: 1rem 0; display: flex; flex-direction: column; gap: .75rem; padding: 1rem; background: var(--bg); border-radius: 12px; border: 1px solid var(--border); }
    .msg { max-width: 80%; padding: .65rem 1rem; border-radius: 12px; font-size: .875rem; line-height: 1.6; }
    .msg.user { background: var(--accent); color: #000; align-self: flex-end; border-radius: 12px 12px 4px 12px; font-weight: 500; }
    .msg.bot  { background: #1e242d; align-self: flex-start; border-radius: 12px 12px 12px 4px; }
    .chat-input { display: flex; gap: .75rem; }
    .chat-input input { flex:1; background: var(--bg); border: 1px solid var(--border); color: var(--text); padding: .65rem 1rem; border-radius: 10px; outline: none; font-size: .9rem; }
    .chat-input input:focus { border-color: var(--accent); }
    .chat-input button { background: var(--accent); color: #000; border: none; padding: .65rem 1.25rem; border-radius: 10px; cursor: pointer; font-weight: 700; }
  </style>
</head>
<body>

  <!-- HERO -->
  <div class="hero">
    <h1>Olá, sou <span>[Seu Nome]</span></h1>
    <p>Desenvolvedor front-end apaixonado por código limpo, interfaces bonitas e o poder da IA para criar experiências incríveis.</p>
    <div class="skills">
      <span class="skill-tag">HTML</span>
      <span class="skill-tag">CSS</span>
      <span class="skill-tag">JavaScript</span>
      <span class="skill-tag">IA com Claude</span>
      <span class="skill-tag">Flexbox / Grid</span>
      <span class="skill-tag">APIs REST</span>
    </div>
  </div>

  <!-- PROJETOS -->
  <section>
    <h2>Meus <span>Projetos</span></h2>
    <p class="sub">Construídos durante o DevStart — da estrutura ao deploy.</p>
    <div class="grid">
      <div class="projeto">
        <div class="projeto-icon">📝</div>
        <h3>DevNotes</h3>
        <p>App de notas com localStorage, favoritos e busca. JavaScript puro com classes e módulos ES6.</p>
        <div class="tags"><span class="tag">HTML</span><span class="tag">CSS</span><span class="tag">JavaScript</span></div>
      </div>
      <div class="projeto">
        <div class="projeto-icon">🤖</div>
        <h3>DevBot</h3>
        <p>Chatbot tutor de JavaScript powered by Claude. Histórico de conversa e formatação de markdown.</p>
        <div class="tags"><span class="tag">API Claude</span><span class="tag">Node.js</span><span class="tag">Fetch</span></div>
      </div>
      <div class="projeto">
        <div class="projeto-icon">🔍</div>
        <h3>Busca Inteligente</h3>
        <p>Busca semântica com IA usando padrão RAG. Resultados rankeados por relevância com explicação.</p>
        <div class="tags"><span class="tag">RAG</span><span class="tag">CSS Grid</span><span class="tag">Debounce</span></div>
      </div>
    </div>
  </section>

  <!-- CHAT IA -->
  <div class="chat-section">
    <div class="chat-inner">
      <h2>Converse com meu <span>Assistente IA</span></h2>
      <p class="sub" style="margin-bottom:1rem">Pergunte qualquer coisa sobre mim, meus projetos ou minhas habilidades.</p>
      <div class="chat-msgs" id="msgs">
        <div class="msg bot">Olá! Sou o assistente IA de [Seu Nome]. Posso te contar sobre os projetos, habilidades e jornada de aprendizado. O que você gostaria de saber? 😊</div>
      </div>
      <div class="chat-input">
        <input id="ci" placeholder="Pergunte sobre meus projetos..." onkeydown="if(event.key==='Enter')enviarChat()">
        <button onclick="enviarChat()">Enviar</button>
      </div>
    </div>
  </div>

  <script>
    // DESAFIO FINAL: Implemente o chat com IA usando RAG
    // O "banco de dados" do portfólio — injete no prompt
    const meusdados = \`
      Nome: [Seu Nome]
      Curso: ADS/CC — DevStart
      Skills: HTML, CSS, JavaScript, IA com Claude, Flexbox, Grid, Fetch API, localStorage, OOP
      Projetos: DevNotes (notas com JS puro), DevBot (chatbot com Claude), Busca Inteligente (RAG)
      Interesse: front-end, IA aplicada, UX, código limpo
    \`;

    async function enviarChat() {
      const input = document.getElementById('ci');
      const texto = input.value.trim();
      if (!texto) return;

      const msgs = document.getElementById('msgs');
      msgs.innerHTML += \`<div class="msg user">\${texto}</div>\`;
      input.value = '';
      msgs.scrollTop = msgs.scrollHeight;

      // TODO: Conectar ao backend com RAG
      // O system prompt deve injetar meusdados como contexto
      await new Promise(r => setTimeout(r, 800));
      msgs.innerHTML += \`<div class="msg bot">Em produção, aqui viria a resposta do Claude usando seus dados como contexto (padrão RAG). Configure seu backend e injete \\\`meusados\\\` no system prompt!</div>\`;
      msgs.scrollTop = msgs.scrollHeight;
    }
  </script>
</body>
</html>`],
    },
    quiz: [
      { q:'Qual combinação de tecnologias representa um desenvolvedor completo com IA em 2025?',
        opts:['Apenas Python e Machine Learning','HTML + CSS + JavaScript + Integração de APIs de IA + Backend','Apenas frameworks como React e Vue','IA substitui a necessidade de aprender as outras tecnologias'],
        correct:1, explanation:'O desenvolvedor moderno com IA combina: HTML/CSS/JS para o front-end, conhecimento de APIs de IA para integração, e um backend básico para servir de proxy seguro. É uma stack completa e altamente produtiva.' },
      { q:'O que é um portfólio com IA integrada e por que impressiona recrutadores?',
        opts:['Um portfólio que usa animações geradas por IA','Um portfólio onde um chatbot responde perguntas sobre você usando suas informações reais como contexto (RAG) — demonstra capacidade técnica diferenciada','Um portfólio criado inteiramente por IA','Um portfólio em Python'],
        correct:1, explanation:'Um portfólio com chatbot RAG demonstra: conhecimento de HTML/CSS/JS, integração de APIs, arquitetura backend segura, e pensamento de produto. Poucos candidatos têm esse nível técnico — é um diferencial real.' },
      { q:'Qual é o próximo passo natural após dominar HTML, CSS, JavaScript e IA?',
        opts:['Parar de estudar — você já sabe o suficiente','Ir direto para Machine Learning','React (UI em componentes), Node.js (backend), banco de dados, Git/GitHub e deploy','Aprender outra linguagem do zero antes de avançar'],
        correct:2, explanation:'A progressão natural: React transforma como você constrói UIs, Node.js completa o fullstack, banco de dados persiste dados reais, Git/GitHub é essencial em qualquer equipe, e deploy torna os projetos acessíveis ao mundo.' },
    ],
    challenge: {
      title:'Portfólio com IA — Projeto Final',
      desc:'Construa seu portfólio pessoal com assistente IA integrado.',
      tasks:[
        'Customize o código do editor com seu nome, projetos reais e habilidades',
        'Adicione pelo menos 4 projetos com ícone, descrição e tags de tecnologias',
        'Implemente o chatbot conectado ao backend com RAG usando seus dados reais',
        'Torne responsivo para mobile com media queries',
        'Faça o deploy no Vercel ou Netlify e compartilhe o link nos comentários do DevStart',
      ],
    },
  },

};
