/* ============================================================
   DevStart — assets/js/content-js.js
   Módulo 03 — JavaScript (14 capítulos)
   ============================================================ */

export const JS = {

  /* ──────────────────────────────────────────────────────────
     CAP 01 — O que é JavaScript
  ────────────────────────────────────────────────────────── */
  'js-01': {
    moduleId: 'js',
    title: 'O que é JavaScript?',
    desc: 'JavaScript transforma páginas estáticas em experiências interativas. É a única linguagem de programação nativa dos navegadores — e uma das mais usadas no mundo.',
    blocks: [
      { type:'text', title:'A terceira camada da web',
        body:'HTML estrutura, CSS estiliza, JavaScript <strong>comporta</strong>. Enquanto HTML e CSS são estáticos — definem como a página aparece ao carregar — o JavaScript é dinâmico: ele reage a cliques, valida formulários, busca dados de servidores, atualiza a tela sem recarregar a página. Toda interação que você faz numa aplicação web moderna passa por JavaScript.' },
      { type:'text', title:'Onde o JavaScript roda',
        body:'JavaScript nasceu no navegador em 1995. Hoje ele roda em dois ambientes: <strong>Browser</strong> — acessa o DOM, eventos do usuário, localStorage, APIs do navegador. <strong>Node.js</strong> — roda no servidor, acessa o sistema de arquivos, banco de dados, cria APIs. O mesmo código JavaScript pode rodar nos dois lados — daí o termo "fullstack JavaScript".' },
      { type:'text', title:'Como incluir JS numa página',
        body:'Três formas: <strong>Inline</strong>: <code>onclick="alert(\'oi\')"</code> diretamente na tag — evite, mistura comportamento com estrutura. <strong>Internal</strong>: <code>&lt;script&gt;</code> dentro do HTML — ok para scripts pequenos. <strong>Externo</strong>: <code>&lt;script src="script.js"&gt;&lt;/script&gt;</code> — profissional. O script externo deve ser colocado no final do <code>&lt;body&gt;</code> ou com atributo <code>defer</code> no head, para o HTML carregar antes do JS executar.' },
      { type:'callout',
        body:'<strong>Console.log</strong> é sua ferramenta de debug mais importante. <code>console.log(valor)</code> imprime no console do navegador (F12 → Console). Use para inspecionar variáveis, entender o fluxo do código e encontrar bugs. Todo desenvolvedor JavaScript passa 30% do tempo olhando para o console.' },
    ],
    editor: {
      tabs: ['HTML'],
      code: [`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Meu primeiro JavaScript</title>
</head>
<body>
  <h1 id="titulo">Olá, Mundo!</h1>
  <p id="mensagem">Clique no botão abaixo.</p>
  <button onclick="mudarTexto()">Clique em mim!</button>

  <script>
    // Isso é um comentário — o JS ignora
    console.log('JavaScript rodando!'); // Veja no console (F12)

    let contador = 0;

    function mudarTexto() {
      contador++;
      document.getElementById('mensagem').textContent =
        'Você clicou ' + contador + ' vez(es)!';

      if (contador >= 5) {
        document.getElementById('titulo').style.color = '#00e5a0';
      }
    }
  </script>
</body>
</html>`],
    },
    quiz: [
      { q:'Qual é a função do JavaScript numa página web?',
        opts:['Definir a estrutura do conteúdo','Estilizar elementos visualmente','Adicionar comportamento e interatividade dinâmica','Conectar ao banco de dados diretamente'],
        correct:2, explanation:'JavaScript é a camada de comportamento: reage a eventos, manipula o DOM, busca dados e atualiza a interface sem recarregar a página.' },
      { q:'Onde deve ser colocado o <script src="app.js"> para garantir que o HTML carregue primeiro?',
        opts:['Dentro do <head> sem atributos','No início do <body>','No final do <body> (ou <head> com defer)','Fora das tags html'],
        correct:2, explanation:'Scripts no final do body garantem que o HTML já foi parseado. Alternativamente, use <script defer src="app.js"> no head — defer adia a execução até o HTML estar pronto.' },
      { q:'Para que serve console.log()?',
        opts:['Exibe uma janela de alerta para o usuário','Imprime valores no console do navegador — usado para debug','Salva dados no servidor','Registra erros automaticamente'],
        correct:1, explanation:'console.log() imprime no console do DevTools (F12). É a ferramenta principal de debug do JavaScript — inspecione variáveis, fluxo de execução e valores em tempo real.' },
    ],
    challenge: {
      title:'Primeira interação com JavaScript',
      desc:'Crie uma página que reage à interação do usuário.',
      tasks:[
        'Adicione um <script> no final do body',
        'Use console.log() para imprimir uma mensagem de boas-vindas',
        'Crie um botão que ao ser clicado muda o texto de um parágrafo',
        'Crie um segundo botão que muda a cor do título',
        'Adicione um contador que mostra quantas vezes o botão foi clicado',
      ],
    },
  },

  /* ──────────────────────────────────────────────────────────
     CAP 02 — Variáveis e tipos de dados
  ────────────────────────────────────────────────────────── */
  'js-02': {
    moduleId: 'js',
    title: 'Variáveis e tipos de dados',
    desc: 'Variáveis são contêineres para armazenar dados. JavaScript tem tipos dinâmicos — a mesma variável pode guardar diferentes tipos ao longo da execução.',
    blocks: [
      { type:'text', title:'let, const e var',
        body:'<strong>const</strong>: valor que não muda — use como padrão. <strong>let</strong>: valor que pode ser reatribuído. <strong>var</strong>: forma antiga, com escopo confuso — evite em código moderno. A regra prática: comece com <code>const</code>. Se precisar reatribuir, mude para <code>let</code>. Nunca use <code>var</code>. Isso evita bugs difíceis de encontrar relacionados a escopo e hoisting.' },
      { type:'text', title:'Os tipos primitivos',
        body:'<strong>String</strong>: texto — <code>"olá"</code>, <code>\'mundo\'</code>, <code>`template ${variavel}`</code>. <strong>Number</strong>: número — <code>42</code>, <code>3.14</code>, <code>-7</code>. <strong>Boolean</strong>: <code>true</code> ou <code>false</code>. <strong>null</strong>: ausência intencional de valor. <strong>undefined</strong>: variável declarada mas sem valor atribuído. <strong>Symbol</strong> e <strong>BigInt</strong>: tipos avançados. O operador <code>typeof</code> retorna o tipo de um valor.' },
      { type:'text', title:'Template literals — strings modernas',
        body:'Template literals usam backtick (`) e permitem: interpolação de variáveis com <code>${variavel}</code>, strings multilinhas sem <code>\\n</code>. Exemplo: <code>`Olá, ${nome}! Você tem ${idade} anos.`</code>. Muito mais legível que concatenação com +. Sempre prefira template literals quando precisar inserir variáveis em strings.' },
      { type:'callout',
        body:'<strong>null vs undefined:</strong> <code>undefined</code> é o que o JS coloca automaticamente — variável declarada sem valor, parâmetro não passado, propriedade inexistente. <code>null</code> é o que <em>você</em> coloca intencionalmente para dizer "aqui não tem valor". É uma distinção semântica importante: undefined = acidente; null = intenção.' },
    ],
    editor: {
      tabs: ['JS'],
      code: [`// ── VARIÁVEIS ──────────────────────────────────────────────
const nome = 'DevStart';       // string — não muda
let pontos = 0;                 // number — vai mudar
let ativo = true;               // boolean
let perfil = null;              // null — intencional

console.log(typeof nome);       // "string"
console.log(typeof pontos);     // "number"
console.log(typeof ativo);      // "boolean"
console.log(typeof perfil);     // "object" — quirk histórico do JS!

// ── TEMPLATE LITERALS ───────────────────────────────────────
const curso = 'HTML';
const nivel = 3;
const msg = \`Bem-vindo ao \${nome}! Você está no nível \${nivel}.\`;
console.log(msg);

// ── REATRIBUIÇÃO ─────────────────────────────────────────────
pontos = 10;                     // ✅ let pode ser reatribuído
pontos += 5;                     // pontos = pontos + 5 = 15
console.log('Pontos:', pontos);

// const nome = 'Outro';         // ❌ TypeError — const não pode ser reatribuído

// ── CONVERSÃO DE TIPOS ───────────────────────────────────────
const textoNumero = '42';
console.log(textoNumero + 1);   // "421" — concatenação de string!
console.log(Number(textoNumero) + 1); // 43  — conversão explícita
console.log(parseInt('3.9'));   // 3  — arredonda para baixo
console.log(parseFloat('3.9')); // 3.9`],
    },
    quiz: [
      { q:'Qual a diferença entre const e let?',
        opts:['const é mais rápido','const não pode ser reatribuído; let pode','let é global, const é local','São sinônimos modernos'],
        correct:1, explanation:'const cria uma ligação constante — não pode ser reatribuído após a declaração. let pode ser reatribuído. Use const por padrão e let quando precisar reatribuir.' },
      { q:'O que retorna typeof null no JavaScript?',
        opts:['"null"','"undefined"','"object"','"none"'],
        correct:2, explanation:'"object" — isso é um bug histórico do JavaScript que não foi corrigido para não quebrar código antigo. null não é um objeto, mas typeof null retorna "object".' },
      { q:'Como inserir uma variável numa string usando template literals?',
        opts:['"{variavel}"','$(variavel)','`${variavel}`','<<variavel>>'],
        correct:2, explanation:'Template literals usam backticks (`) e interpolação com ${expressão}. Mais legível que concatenação: `Olá, ${nome}!` vs "Olá, " + nome + "!"' },
    ],
    challenge: {
      title:'Sistema de perfil de usuário',
      desc:'Use variáveis e tipos para criar um perfil de estudante.',
      tasks:[
        'Declare com const: nome, curso e email do estudante',
        'Declare com let: pontos (0), nivel (1), ativo (true)',
        'Use template literal para montar uma mensagem de boas-vindas completa',
        'Simule progresso: some pontos, incremente nível quando pontos > 100',
        'Use typeof para verificar o tipo de cada variável e imprima no console',
      ],
    },
  },

  /* ──────────────────────────────────────────────────────────
     CAP 03 — Operadores e condicionais
  ────────────────────────────────────────────────────────── */
  'js-03': {
    moduleId: 'js',
    title: 'Operadores e condicionais',
    desc: 'Operadores são os verbos do JavaScript. Condicionais são a tomada de decisão. Juntos, eles definem a lógica do seu código.',
    blocks: [
      { type:'text', title:'Operadores de comparação',
        body:'<code>===</code> igualdade estrita (valor E tipo) — <strong>sempre use este</strong>. <code>==</code> igualdade solta (converte tipos) — evite, causa bugs: <code>"5" == 5</code> é <code>true</code>. <code>!==</code> diferença estrita. <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code> comparações numéricas. <code>&amp;&amp;</code> AND lógico. <code>||</code> OR lógico. <code>!</code> NOT lógico.' },
      { type:'text', title:'if / else if / else',
        body:'A estrutura básica de decisão. <code>if (condição) { } else if (outra) { } else { }</code>. O bloco <code>else if</code> é opcional e pode ser encadeado quantas vezes precisar. O <code>else</code> final captura tudo que não encaixou nas condições anteriores. Boa prática: valide o caso de erro primeiro e retorne cedo (<em>early return</em>) — evita aninhamento excessivo.' },
      { type:'text', title:'Operador ternário e Nullish Coalescing',
        body:'<strong>Ternário:</strong> <code>condição ? valorSeTrue : valorSeFalse</code> — compacto para condicionais simples. <strong>Nullish Coalescing (??)</strong>: <code>valor ?? "padrão"</code> — retorna o lado direito se o valor for <code>null</code> ou <code>undefined</code> (mas não para <code>0</code> ou <code>""</code>). <strong>Optional Chaining (?.):</strong> <code>usuario?.perfil?.foto</code> — não quebra se usuario ou perfil for null/undefined.' },
      { type:'callout',
        body:'<strong>Truthy e Falsy:</strong> Em JavaScript, qualquer valor pode ser avaliado como booleano. Valores <em>falsy</em>: <code>false, 0, "", null, undefined, NaN</code>. Todo o resto é <em>truthy</em>. Isso permite escrever: <code>if (nome) { }</code> em vez de <code>if (nome !== null && nome !== undefined && nome !== "")</code>.' },
    ],
    editor: {
      tabs: ['JS'],
      code: [`// ── COMPARAÇÕES ────────────────────────────────────────────
console.log(5 === 5);       // true  — mesmo valor e tipo
console.log(5 === "5");     // false — tipos diferentes!
console.log(5 == "5");      // true  — == converte tipo (evite!)

// ── IF / ELSE ────────────────────────────────────────────────
const nota = 75;

if (nota >= 90) {
  console.log('Conceito A');
} else if (nota >= 70) {
  console.log('Conceito B');  // este executa
} else if (nota >= 50) {
  console.log('Conceito C');
} else {
  console.log('Reprovado');
}

// ── TERNÁRIO ─────────────────────────────────────────────────
const idade = 20;
const status = idade >= 18 ? 'maior de idade' : 'menor de idade';
console.log(status); // "maior de idade"

// ── NULLISH COALESCING (??) ──────────────────────────────────
const nomeUsuario = null;
const exibir = nomeUsuario ?? 'Visitante';
console.log(exibir); // "Visitante"

const pontos = 0;
console.log(pontos ?? 'sem pontos'); // 0 — ?? não trata 0 como falso!
console.log(pontos || 'sem pontos'); // "sem pontos" — || trata 0 como falso

// ── OPTIONAL CHAINING (?.) ──────────────────────────────────
const usuario = { nome: 'Ana', endereco: null };
console.log(usuario?.endereco?.cidade); // undefined — sem erro!
// console.log(usuario.endereco.cidade); // ❌ TypeError`],
    },
    quiz: [
      { q:'Por que usar === em vez de == no JavaScript?',
        opts:['=== é mais rápido','=== compara valor E tipo — evita coerção implícita que causa bugs','São equivalentes','== foi descontinuado'],
        correct:1, explanation:'=== (strict equality) não faz conversão de tipos. "5" === 5 é false. Com ==, "5" == 5 é true porque o JS converte "5" para número. Esse comportamento causa bugs sutis.' },
      { q:'O que retorna: null ?? "padrão"?',
        opts:['"padrão"','null','undefined','false'],
        correct:0, explanation:'?? (Nullish Coalescing) retorna o lado direito APENAS se o lado esquerdo for null ou undefined. null ?? "padrão" retorna "padrão". Diferente de ||, que também trata 0 e "" como falso.' },
      { q:'Quais valores são considerados "falsy" no JavaScript?',
        opts:['Apenas false e null','false, 0, "", null, undefined, NaN','Qualquer objeto vazio','false, null e undefined apenas'],
        correct:1, explanation:'Os 6 valores falsy são: false, 0, "" (string vazia), null, undefined e NaN. Qualquer outro valor — incluindo [], {}, "false", -1 — é truthy.' },
    ],
    challenge: {
      title:'Sistema de notas e aprovação',
      desc:'Construa um avaliador de desempenho de estudantes.',
      tasks:[
        'Crie uma função que recebe nota (0-100) e retorna o conceito (A/B/C/D/F)',
        'Use ternário para exibir "Aprovado" ou "Reprovado" baseado na nota',
        'Use ?? para dar um nome padrão "Aluno" se o nome for null',
        'Use optional chaining para acessar propriedades aninhadas com segurança',
        'Teste com valores edge: 0, 50, 70, 90, 100, null',
      ],
    },
  },

  /* ──────────────────────────────────────────────────────────
     CAP 04 — Funções
  ────────────────────────────────────────────────────────── */
  'js-04': {
    moduleId: 'js',
    title: 'Funções',
    desc: 'Funções são os blocos de construção do JavaScript. Reutilize lógica, organize código e pense em termos de responsabilidades — uma função, uma tarefa.',
    blocks: [
      { type:'text', title:'Três formas de declarar funções',
        body:'<strong>Function declaration:</strong> <code>function nome() { }</code> — pode ser chamada antes de ser declarada (hoisting). <strong>Function expression:</strong> <code>const nome = function() { }</code> — não tem hoisting. <strong>Arrow function:</strong> <code>const nome = () =&gt; { }</code> — sintaxe moderna, mais compacta, não tem próprio <code>this</code>. Para funções de uma linha: <code>const dobrar = x =&gt; x * 2</code> — o return é implícito.' },
      { type:'text', title:'Parâmetros, argumentos e valores padrão',
        body:'Parâmetros são os nomes na declaração: <code>function saudar(nome, titulo)</code>. Argumentos são os valores passados na chamada: <code>saudar("Ana", "Dev")</code>. Valores padrão: <code>function saudar(nome = "Visitante")</code> — usado se o argumento não for passado. <code>rest parameters</code>: <code>function soma(...numeros)</code> — agrupa argumentos extras num array.' },
      { type:'text', title:'Escopo e closures',
        body:'Variáveis declaradas dentro de uma função são locais — não existem fora. Variáveis fora da função são acessíveis dentro (<em>escopo léxico</em>). Uma <strong>closure</strong> acontece quando uma função interna "lembra" do escopo da função externa, mesmo após a externa ter retornado. É o mecanismo por trás de contadores privados, memoização e módulos.' },
      { type:'callout',
        body:'<strong>Funções são first-class citizens</strong> em JavaScript: elas podem ser atribuídas a variáveis, passadas como argumentos e retornadas por outras funções. Isso é a base dos <em>callbacks</em>, <em>higher-order functions</em> e da programação funcional. <code>setTimeout(minhaFuncao, 1000)</code> — você passa a função como argumento.' },
    ],
    editor: {
      tabs: ['JS'],
      code: [`// ── TRÊS FORMAS DE DECLARAR ────────────────────────────────
// 1. Function declaration (tem hoisting)
function saudar(nome = 'Visitante') {
  return \`Olá, \${nome}! Bem-vindo ao DevStart.\`;
}

// 2. Function expression
const despedir = function(nome) {
  return \`Até logo, \${nome}!\`;
};

// 3. Arrow function — mais compacta
const dobrar = x => x * 2;
const somar  = (a, b) => a + b;
const quadrado = n => {        // arrow com bloco (return explícito)
  const resultado = n * n;
  return resultado;
};

console.log(saudar('Ana'));     // "Olá, Ana! Bem-vindo ao DevStart."
console.log(saudar());          // "Olá, Visitante! ..."
console.log(dobrar(7));         // 14
console.log(somar(3, 4));       // 7

// ── CLOSURES ─────────────────────────────────────────────────
function criarContador() {
  let count = 0;          // variável privada — inacessível de fora

  return {
    incrementar: () => ++count,
    decrementar: () => --count,
    valor:       () => count,
  };
}

const contador = criarContador();
contador.incrementar();
contador.incrementar();
contador.incrementar();
console.log(contador.valor());  // 3 — count está "fechado" na closure
// console.log(count);            // ❌ ReferenceError — inacessível!

// ── FUNÇÃO COMO ARGUMENTO (callback) ─────────────────────────
function executarDepois(fn, mensagem) {
  console.log('Executando...');
  fn(mensagem);
}

executarDepois(console.log, 'Callback executado!');`],
    },
    quiz: [
      { q:'Qual a sintaxe correta de uma arrow function que retorna x ao quadrado?',
        opts:['function(x) => x*x','(x) -> x*x','const quadrado = x => x * x','arrow quadrado(x) { return x*x }'],
        correct:2, explanation:'Arrow function: const nome = (params) => expressão. Para um parâmetro, os parênteses são opcionais. Para retorno direto de expressão simples, o return é implícito.' },
      { q:'O que é uma closure em JavaScript?',
        opts:['Um método para fechar conexões','Uma função que lembra do escopo onde foi criada, mesmo após esse escopo ter encerrado','Um tipo especial de loop','Uma forma de importar módulos'],
        correct:1, explanation:'Closure é quando uma função interna mantém referência às variáveis do escopo externo, mesmo após a função externa retornar. Usado para criar variáveis "privadas" e módulos.' },
      { q:'O que são "first-class functions"?',
        opts:['Funções declaradas no topo do arquivo','Funções que podem ser atribuídas a variáveis, passadas como argumentos e retornadas por outras funções','As funções nativas do JavaScript','Funções com performance otimizada'],
        correct:1, explanation:'First-class functions significa que funções são tratadas como qualquer outro valor: podem ser armazenadas em variáveis, passadas como argumentos (callbacks) e retornadas por outras funções.' },
    ],
    challenge: {
      title:'Biblioteca de funções utilitárias',
      desc:'Crie um conjunto de funções reutilizáveis para uma plataforma de ensino.',
      tasks:[
        'Crie calcularMedia(...notas) usando rest params que retorna a média',
        'Crie conceito(nota) com arrow function que retorna A/B/C/D/F',
        'Crie criarAluno(nome, curso) que retorna um objeto com métodos usando closure',
        'Crie aplicarDesconto(preco, pct = 10) com parâmetro padrão',
        'Passe uma função como callback para executar uma operação em lista de alunos',
      ],
    },
  },

  /* ──────────────────────────────────────────────────────────
     CAP 05 — Arrays
  ────────────────────────────────────────────────────────── */
  'js-05': {
    moduleId: 'js',
    title: 'Arrays — listas e coleções',
    desc: 'Arrays armazenam listas de valores. Os métodos modernos de array — map, filter, reduce, find — são usados em praticamente todo projeto JavaScript.',
    blocks: [
      { type:'text', title:'Criando e acessando arrays',
        body:'Arrays são criados com colchetes: <code>const frutas = ["maçã", "banana", "uva"]</code>. Acesso por índice (começa em 0): <code>frutas[0]</code> = "maçã". Propriedade <code>length</code>: <code>frutas.length</code> = 3. Métodos básicos: <code>push()</code> adiciona no final, <code>pop()</code> remove do final, <code>unshift()</code> adiciona no início, <code>shift()</code> remove do início, <code>splice()</code> remove/insere em qualquer posição.' },
      { type:'text', title:'Os 4 métodos essenciais modernos',
        body:'<strong>map(fn)</strong>: transforma cada item, retorna novo array. <strong>filter(fn)</strong>: filtra itens que passam no teste, retorna novo array. <strong>find(fn)</strong>: retorna o primeiro item que passa no teste. <strong>reduce(fn, inicial)</strong>: reduz o array a um único valor (soma, objeto, etc). Todos recebem uma função como argumento e <strong>não modificam o array original</strong> — são imutáveis.' },
      { type:'text', title:'Outros métodos importantes',
        body:'<code>forEach(fn)</code>: itera sem retornar (substitui o for clássico). <code>some(fn)</code>: retorna true se qualquer item passar. <code>every(fn)</code>: retorna true se todos passarem. <code>includes(valor)</code>: verifica se o array contém o valor. <code>indexOf(valor)</code>: retorna o índice ou -1. <code>sort(fn)</code>: ordena (cuidado: ordena strings por padrão). <code>flat()</code>: achata arrays aninhados. <code>slice(inicio, fim)</code>: retorna subarray sem modificar o original.' },
      { type:'callout',
        body:'<strong>Spread operator (...)</strong> com arrays: <code>[...arr1, ...arr2]</code> combina arrays. <code>[...arr]</code> cria uma cópia rasa. <strong>Destructuring</strong>: <code>const [primeiro, segundo, ...resto] = arr</code> — extrai valores do array diretamente em variáveis. Ambos são amplamente usados em React e código moderno.' },
    ],
    editor: {
      tabs: ['JS'],
      code: [`const alunos = [
  { nome: 'Ana',    nota: 92, curso: 'ADS' },
  { nome: 'Bruno',  nota: 68, curso: 'CC'  },
  { nome: 'Carol',  nota: 85, curso: 'ADS' },
  { nome: 'Diego',  nota: 45, curso: 'CC'  },
  { nome: 'Elena',  nota: 95, curso: 'ADS' },
];

// MAP — transforma cada item
const nomes = alunos.map(a => a.nome);
console.log('Nomes:', nomes);
// ["Ana", "Bruno", "Carol", "Diego", "Elena"]

// FILTER — filtra pelos que passam
const aprovados = alunos.filter(a => a.nota >= 70);
console.log('Aprovados:', aprovados.map(a => a.nome));
// ["Ana", "Carol", "Elena"]

// FIND — primeiro que satisfaz
const primeiroCc = alunos.find(a => a.curso === 'CC');
console.log('Primeiro CC:', primeiroCc.nome); // "Bruno"

// REDUCE — acumula um valor
const somaNotas = alunos.reduce((acc, a) => acc + a.nota, 0);
const media = somaNotas / alunos.length;
console.log('Média geral:', media.toFixed(1)); // "77.0"

// ENCADEAMENTO — filter + map
const notasAprovados = alunos
  .filter(a => a.nota >= 70)
  .map(a => \`\${a.nome}: \${a.nota}\`);
console.log('Aprovados:', notasAprovados);

// SPREAD + DESTRUCTURING
const [melhor, ...resto] = [...alunos].sort((a, b) => b.nota - a.nota);
console.log('Melhor aluno:', melhor.nome, melhor.nota);`],
    },
    quiz: [
      { q:'Qual método retorna um NOVO array com os itens transformados?',
        opts:['forEach','filter','map','reduce'],
        correct:2, explanation:'map() transforma cada item e retorna um NOVO array com os resultados. forEach() também itera mas retorna undefined — use forEach para efeitos colaterais, map para transformações.' },
      { q:'O que filter() retorna?',
        opts:['O primeiro item que passa no teste','Um novo array com todos os itens que passaram no teste','true ou false','O índice dos itens filtrados'],
        correct:1, explanation:'filter() retorna um NOVO array contendo apenas os itens para os quais a função retornou true. O array original não é modificado.' },
      { q:'O que faz [...arr1, ...arr2]?',
        opts:['Multiplica os arrays','Cria um novo array combinando todos os elementos dos dois arrays','Remove duplicatas','Ordena os dois arrays juntos'],
        correct:1, explanation:'O spread operator (...) "espalha" os elementos do array. [...arr1, ...arr2] cria um novo array com todos os elementos de arr1 seguidos pelos de arr2.' },
    ],
    challenge: {
      title:'Processamento de lista de estudantes',
      desc:'Use os métodos de array para analisar uma turma de alunos.',
      tasks:[
        'Crie um array de 6 alunos com nome, nota e curso',
        'Use map() para criar uma lista de strings formatadas "Nome: X pontos"',
        'Use filter() para separar aprovados (nota >= 70) de reprovados',
        'Use reduce() para calcular a média geral da turma',
        'Use find() para encontrar o aluno com maior nota (dica: sort primeiro)',
      ],
    },
  },

  /* ──────────────────────────────────────────────────────────
     CAP 06 — Objetos
  ────────────────────────────────────────────────────────── */
  'js-06': {
    moduleId: 'js',
    title: 'Objetos',
    desc: 'Objetos são a estrutura de dados mais versátil do JavaScript. JSON, APIs, configurações, modelos de dados — tudo em JS passa por objetos.',
    blocks: [
      { type:'text', title:'Criando e acessando objetos',
        body:'Objetos armazenam dados em pares chave-valor. <code>const usuario = { nome: "Ana", idade: 22 }</code>. Acesso com ponto: <code>usuario.nome</code>. Acesso com colchetes (útil para chaves dinâmicas): <code>usuario["nome"]</code>. Adicionar propriedade: <code>usuario.email = "ana@dev.com"</code>. Remover: <code>delete usuario.email</code>. Verificar existência: <code>"nome" in usuario</code> retorna true.' },
      { type:'text', title:'Destructuring e spread em objetos',
        body:'<strong>Destructuring</strong>: <code>const { nome, idade } = usuario</code> — extrai propriedades em variáveis. Com renomear: <code>const { nome: nomeCompleto } = usuario</code>. Com valor padrão: <code>const { role = "user" } = usuario</code>. <strong>Spread</strong>: <code>const novo = { ...usuario, role: "admin" }</code> — cria novo objeto com todas as propriedades do original mais as novas (imutabilidade).' },
      { type:'text', title:'Métodos de Object',
        body:'<code>Object.keys(obj)</code>: array com as chaves. <code>Object.values(obj)</code>: array com os valores. <code>Object.entries(obj)</code>: array de pares [chave, valor]. <code>Object.assign(destino, fonte)</code>: copia propriedades (use spread no lugar). <code>Object.freeze(obj)</code>: torna o objeto imutável. <strong>Iteração:</strong> <code>for (const [chave, valor] of Object.entries(obj))</code> é a forma mais elegante de iterar sobre um objeto.' },
      { type:'callout',
        body:'<strong>Referência vs Valor:</strong> Tipos primitivos (string, number, boolean) são copiados por valor. Objetos e arrays são copiados por referência — a variável guarda apenas um ponteiro. <code>const b = a</code> onde a é um objeto faz b apontar para o mesmo objeto. Modificar b modifica a. Para copiar: <code>const b = { ...a }</code> (spread faz cópia rasa).' },
    ],
    editor: {
      tabs: ['JS'],
      code: [`// ── CRIAÇÃO E ACESSO ────────────────────────────────────────
const aluno = {
  nome: 'Ana Paula',
  curso: 'ADS',
  notas: [92, 85, 78],
  ativo: true,
  // Método dentro do objeto
  media() {
    const soma = this.notas.reduce((a, b) => a + b, 0);
    return (soma / this.notas.length).toFixed(1);
  }
};

console.log(aluno.nome);          // "Ana Paula"
console.log(aluno['curso']);      // "ADS"  — acesso por colchete
console.log(aluno.media());       // "85.0"

// ── DESTRUCTURING ────────────────────────────────────────────
const { nome, curso, ativo = true } = aluno;
console.log(nome, curso);         // "Ana Paula" "ADS"

// Renomeando ao extrair
const { nome: nomeCompleto } = aluno;
console.log(nomeCompleto);        // "Ana Paula"

// ── SPREAD — criando novo objeto sem mutar o original ────────
const alunoAtualizado = {
  ...aluno,
  email: 'ana@devstart.com',
  notas: [...aluno.notas, 95],  // adiciona nova nota
};
console.log(alunoAtualizado.notas); // [92, 85, 78, 95]
console.log(aluno.notas.length);    // 3 — original intacto!

// ── OBJECT.ENTRIES — iteração elegante ───────────────────────
const config = { tema: 'dark', idioma: 'pt-BR', notificacoes: true };

for (const [chave, valor] of Object.entries(config)) {
  console.log(\`\${chave}: \${valor}\`);
}

// ── REFERÊNCIA vs VALOR ──────────────────────────────────────
const obj1 = { x: 1 };
const obj2 = obj1;       // mesma referência!
obj2.x = 99;
console.log(obj1.x);     // 99 — foram modificados juntos!

const obj3 = { ...obj1 }; // spread = cópia rasa
obj3.x = 0;
console.log(obj1.x);     // 99 — obj1 preservado`],
    },
    quiz: [
      { q:'O que faz const { nome, idade } = usuario?',
        opts:['Cria um novo objeto','Destructuring — extrai as propriedades nome e idade em variáveis separadas','Remove nome e idade do objeto','Verifica se nome e idade existem'],
        correct:1, explanation:'Destructuring de objeto extrai propriedades e cria variáveis com os mesmos nomes. É equivalente a: const nome = usuario.nome; const idade = usuario.idade;' },
      { q:'Como criar uma cópia de um objeto sem afetar o original?',
        opts:['const copia = objeto','const copia = Object.copy(objeto)','const copia = { ...objeto }','const copia = clone(objeto)'],
        correct:2, explanation:'O spread operator {...objeto} cria uma cópia rasa (shallow copy) — copia todas as propriedades do primeiro nível. Para objetos aninhados, use JSON.parse(JSON.stringify(obj)) ou structuredClone().' },
      { q:'O que retorna Object.keys({ a: 1, b: 2, c: 3 })?',
        opts:['{ a: 1, b: 2, c: 3 }','[1, 2, 3]','["a", "b", "c"]','[["a",1],["b",2],["c",3]]'],
        correct:2, explanation:'Object.keys() retorna um array com as chaves (nomes das propriedades) do objeto. Object.values() retorna os valores. Object.entries() retorna pares [chave, valor].' },
    ],
    challenge: {
      title:'Modelo de dados de uma plataforma',
      desc:'Construa e manipule objetos que representam dados reais.',
      tasks:[
        'Crie um objeto curso com propriedades: id, titulo, modulos (array), instrutor (objeto aninhado)',
        'Adicione um método progresso() que calcula % de módulos concluídos',
        'Use destructuring para extrair titulo e instrutor.nome',
        'Use spread para atualizar o curso sem mutar o original',
        'Use Object.entries() para iterar e imprimir cada propriedade',
      ],
    },
  },

  /* ──────────────────────────────────────────────────────────
     CAP 07 — DOM — manipulando a página
  ────────────────────────────────────────────────────────── */
  'js-07': {
    moduleId: 'js',
    title: 'DOM — manipulando a página',
    desc: 'O DOM é a interface entre JavaScript e HTML. Com ele você seleciona elementos, muda conteúdo, altera estilos e cria/remove elementos dinamicamente.',
    blocks: [
      { type:'text', title:'O que é o DOM',
        body:'DOM significa <em>Document Object Model</em>. Quando o navegador carrega o HTML, ele cria uma árvore de objetos JavaScript representando cada elemento. O <code>document</code> é a raiz. Cada tag HTML vira um nó nessa árvore. O JavaScript acessa e modifica essa árvore em tempo real — e o navegador reflete as mudanças na tela imediatamente.' },
      { type:'text', title:'Selecionando elementos',
        body:'<code>document.getElementById("id")</code>: um elemento pelo ID. <code>document.querySelector(".classe")</code>: o primeiro que casa com o seletor CSS. <code>document.querySelectorAll("p")</code>: todos que casam — retorna NodeList. <strong>Prefira querySelector/querySelectorAll</strong> — usam a mesma sintaxe CSS que você já conhece. Sempre verifique se o elemento existe antes de manipulá-lo.' },
      { type:'text', title:'Modificando elementos',
        body:'<code>el.textContent = "texto"</code>: muda o texto (seguro — não interpreta HTML). <code>el.innerHTML = "&lt;b&gt;texto&lt;/b&gt;"</code>: muda o HTML interno (cuidado com XSS). <code>el.style.color = "#00e5a0"</code>: muda estilo inline. <code>el.classList.add("ativa")</code>, <code>.remove()</code>, <code>.toggle()</code>, <code>.contains()</code>: manipula classes CSS — preferível ao style inline.' },
      { type:'callout',
        body:'<strong>classList.toggle()</strong> é o método mais útil para interatividade: <code>el.classList.toggle("aberto")</code> — se a classe existe, remove; se não existe, adiciona. Com isso, toda a lógica visual fica no CSS (animações, estilos), e o JS apenas gerencia qual classe está ativa. Isso é a base de menus hamburguer, acordeões, modais e tabs.' },
    ],
    editor: {
      tabs: ['HTML'],
      code: [`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>DOM Manipulation</title>
  <style>
    body { background:#0a0c0f; color:#e8edf2; font-family:sans-serif; padding:2rem; }
    .card { background:#13181f; border:1px solid #1e242d; border-radius:12px; padding:1.5rem; margin:1rem 0; transition: border-color .3s; }
    .card.ativo { border-color:#00e5a0; }
    button { background:#00e5a0; color:#000; border:none; padding:.5rem 1rem; border-radius:8px; cursor:pointer; font-weight:700; margin:.25rem; }
    #lista { padding-left:0; list-style:none; }
    #lista li { padding:.5rem; border-bottom:1px solid #1e242d; display:flex; justify-content:space-between; }
    .del { background:rgba(255,77,77,.15); color:#ff4d4d; font-size:.75rem; padding:.2rem .5rem; border-radius:4px; cursor:pointer; border:none; }
  </style>
</head>
<body>
  <h1 id="titulo">Manipulando o DOM</h1>
  <div class="card" id="card">
    <p id="status">Estado: normal</p>
    <button onclick="alternarEstado()">Toggle .ativo</button>
    <button onclick="mudarTitulo()">Mudar título</button>
  </div>

  <h2 style="margin:1rem 0 .5rem">Lista dinâmica</h2>
  <input id="input" placeholder="Digite um item..." style="background:#13181f;border:1px solid #1e242d;color:#e8edf2;padding:.5rem .75rem;border-radius:8px;outline:none;margin-right:.5rem">
  <button onclick="adicionarItem()">+ Adicionar</button>
  <ul id="lista"></ul>

  <script>
    // querySelector — seletor CSS
    const card   = document.querySelector('#card');
    const status = document.querySelector('#status');

    function alternarEstado() {
      // classList.toggle — adiciona se não tem, remove se tem
      const ativo = card.classList.toggle('ativo');
      status.textContent = 'Estado: ' + (ativo ? 'ATIVO ✅' : 'normal');
    }

    function mudarTitulo() {
      const titulo = document.getElementById('titulo');
      titulo.textContent  = 'Título alterado via JS!';
      titulo.style.color  = '#00e5a0';
    }

    function adicionarItem() {
      const input = document.getElementById('input');
      const texto = input.value.trim();
      if (!texto) return;

      // Criar elemento dinamicamente
      const li  = document.createElement('li');
      const btn = document.createElement('button');
      btn.textContent = 'remover';
      btn.className   = 'del';
      btn.onclick     = () => li.remove(); // remove o próprio li

      li.textContent = texto;
      li.appendChild(btn);
      document.getElementById('lista').appendChild(li);

      input.value = '';
      input.focus();
    }
  </script>
</body>
</html>`],
    },
    quiz: [
      { q:'Qual a diferença entre textContent e innerHTML?',
        opts:['São iguais','textContent define texto puro (seguro), innerHTML interpreta tags HTML (risco de XSS)','innerHTML é mais moderno','textContent só funciona em parágrafos'],
        correct:1, explanation:'textContent trata o valor como texto puro — tags HTML aparecem literalmente. innerHTML interpreta as tags, o que pode criar vulnerabilidade XSS se o valor vier do usuário. Use textContent por padrão.' },
      { q:'O que faz element.classList.toggle("ativo")?',
        opts:['Sempre adiciona a classe "ativo"','Remove a classe "ativo"','Adiciona se não existir, remove se existir','Verifica se a classe existe'],
        correct:2, explanation:'toggle é um interruptor: se a classe existir, remove e retorna false. Se não existir, adiciona e retorna true. Perfeito para menus, accordions e qualquer elemento que alterna entre estados.' },
      { q:'Qual método seleciona TODOS os elementos que casam com um seletor CSS?',
        opts:['document.getElementById()','document.querySelector()','document.querySelectorAll()','document.getElements()'],
        correct:2, explanation:'querySelectorAll() retorna uma NodeList com todos os elementos que casam. querySelector() retorna apenas o primeiro. getElementsByClassName() também retorna todos, mas usa seletor de classe apenas.' },
    ],
    challenge: {
      title:'Lista de tarefas interativa',
      desc:'Construa um todo list completo manipulando o DOM.',
      tasks:[
        'Crie um input + botão para adicionar tarefas',
        'Use createElement e appendChild para criar itens na lista',
        'Adicione botão de remover em cada item que usa .remove()',
        'Use classList.toggle("concluida") ao clicar no item para riscá-lo',
        'Adicione um contador que mostra "X de Y tarefas concluídas"',
      ],
    },
  },

  /* ──────────────────────────────────────────────────────────
     CAP 08 — Eventos
  ────────────────────────────────────────────────────────── */
  'js-08': {
    moduleId: 'js',
    title: 'Eventos',
    desc: 'Eventos são o coração da interatividade web. Cliques, teclas, scroll, foco — qualquer ação do usuário pode ser capturada e processada pelo JavaScript.',
    blocks: [
      { type:'text', title:'addEventListener — a forma profissional',
        body:'Evite atributos inline como <code>onclick="..."</code> — mistura HTML com JS. Use <code>elemento.addEventListener("evento", funcao)</code>. Vantagens: pode adicionar múltiplos listeners para o mesmo evento, pode remover listeners com <code>removeEventListener</code>, separa HTML de JavaScript. Eventos comuns: <code>click</code>, <code>input</code>, <code>change</code>, <code>keydown</code>, <code>keyup</code>, <code>focus</code>, <code>blur</code>, <code>submit</code>.' },
      { type:'text', title:'O objeto Event',
        body:'A função handler recebe automaticamente um objeto <code>event</code> (ou <code>e</code> por convenção) com informações sobre o evento. <code>event.target</code>: o elemento que disparou o evento. <code>event.preventDefault()</code>: cancela o comportamento padrão (ex: impede o form de submeter e recarregar a página). <code>event.stopPropagation()</code>: impede o evento de subir para elementos pai (bubbling).' },
      { type:'text', title:'Event Delegation — padrão avançado',
        body:'Em vez de adicionar um listener em cada item de uma lista, adicione no container pai. Quando o evento sobe (bubbling), você verifica qual elemento disparou com <code>event.target</code>. Vantagem: funciona para elementos criados dinamicamente, usa menos memória, código mais limpo. <code>event.target.closest(".item")</code> é útil para encontrar o ancestral mais próximo com determinada classe.' },
      { type:'callout',
        body:'<strong>Debounce</strong> é uma técnica essencial: evita que uma função seja chamada muitas vezes em sequência rápida (como ao digitar num input de busca). Com <code>setTimeout</code> e <code>clearTimeout</code>, você espera o usuário parar de digitar por X milissegundos antes de executar. Evita sobrecarregar o servidor com requisições a cada tecla.' },
    ],
    editor: {
      tabs: ['HTML'],
      code: [`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Eventos JS</title>
  <style>
    body { background:#0a0c0f; color:#e8edf2; font-family:sans-serif; padding:2rem; }
    input { background:#13181f; border:1px solid #1e242d; color:#e8edf2; padding:.6rem 1rem; border-radius:8px; outline:none; width:100%; margin:.5rem 0; }
    input:focus { border-color:#00e5a0; }
    button { background:#00e5a0; color:#000; border:none; padding:.5rem 1.25rem; border-radius:8px; cursor:pointer; font-weight:700; }
    .lista { list-style:none; padding:0; margin-top:1rem; }
    .lista li { padding:.6rem 1rem; background:#13181f; border-radius:8px; margin:.3rem 0; cursor:pointer; transition:background .15s; }
    .lista li:hover { background:#1e242d; }
    .lista li.selecionado { border-left:3px solid #00e5a0; color:#00e5a0; }
    #log { background:#13181f; padding:1rem; border-radius:8px; font-family:monospace; font-size:.8rem; color:#4a5568; margin-top:1rem; min-height:60px; }
  </style>
</head>
<body>

  <!-- Formulário com preventDefault -->
  <form id="form">
    <input type="text" id="busca" placeholder="Digite para buscar (debounce 400ms)...">
    <button type="submit">Buscar</button>
  </form>

  <!-- Event Delegation na lista -->
  <ul class="lista" id="lista">
    <li data-id="1">HTML — Estrutura</li>
    <li data-id="2">CSS — Estilo</li>
    <li data-id="3">JavaScript — Comportamento</li>
    <li data-id="4">Git — Versionamento</li>
  </ul>

  <div id="log">Log de eventos aparece aqui...</div>

  <script>
    const log = document.getElementById('log');
    const add = msg => log.textContent = msg;

    // addEventListener — forma profissional
    document.getElementById('form').addEventListener('submit', (e) => {
      e.preventDefault(); // cancela reload da página
      add('Form submetido sem recarregar a página! ✅');
    });

    // Debounce — espera parar de digitar
    let timer;
    document.getElementById('busca').addEventListener('input', (e) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        add(\`Buscando: "\${e.target.value}" (disparou 400ms após parar)\`);
      }, 400);
    });

    // Event Delegation — 1 listener para toda a lista
    document.getElementById('lista').addEventListener('click', (e) => {
      const li = e.target.closest('li');
      if (!li) return;

      // Toggle seleção
      document.querySelectorAll('.lista li').forEach(el => el.classList.remove('selecionado'));
      li.classList.add('selecionado');

      add(\`Clicou em: "\${li.textContent.trim()}" (id: \${li.dataset.id})\`);
    });

    // Evento de teclado
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') add('ESC pressionado!');
    });
  </script>
</body>
</html>`],
    },
    quiz: [
      { q:'Por que usar addEventListener em vez de onclick="..." no HTML?',
        opts:['addEventListener é mais rápido','Separa JS do HTML, permite múltiplos handlers e remoção de listeners','onclick não existe mais','addEventListener só funciona em botões'],
        correct:1, explanation:'addEventListener separa comportamento (JS) de estrutura (HTML), permite adicionar múltiplos listeners para o mesmo evento, e permite remoção com removeEventListener. onclick inline mistura as camadas.' },
      { q:'O que faz event.preventDefault()?',
        opts:['Para a propagação do evento','Cancela o comportamento padrão do navegador (ex: form não recarrega a página)','Remove o listener do evento','Previne erros de JavaScript'],
        correct:1, explanation:'Cada evento tem um comportamento padrão: submit recarrega a página, click em link navega, keydown em form submete. preventDefault() cancela esse comportamento, deixando o JS controlar o que acontece.' },
      { q:'O que é Event Delegation?',
        opts:['Passar eventos entre componentes','Colocar um listener no elemento pai que captura eventos dos filhos via bubbling','Deletar listeners após uso','Um evento personalizado'],
        correct:1, explanation:'Event Delegation aproveita o bubbling: eventos sobem pela árvore DOM. Um listener no pai captura eventos de todos os filhos. Funciona para elementos dinâmicos e usa menos memória.' },
    ],
    challenge: {
      title:'Interface de busca com eventos',
      desc:'Construa uma busca interativa usando os padrões de eventos modernos.',
      tasks:[
        'Crie um form de busca com addEventListener("submit") e preventDefault()',
        'Implemente debounce no input de busca (400ms)',
        'Crie uma lista e use Event Delegation para capturar cliques nos itens',
        'Use event.target.dataset para acessar dados do item clicado',
        'Adicione listener de keydown no documento para ESC fechar/limpar a busca',
      ],
    },
  },

  /* ──────────────────────────────────────────────────────────
     CAP 09 — Fetch API e Promises
  ────────────────────────────────────────────────────────── */
  'js-09': {
    moduleId: 'js',
    title: 'Fetch API e Promises',
    desc: 'A web moderna é assíncrona. Promises e async/await são o modelo mental para trabalhar com operações que levam tempo — requisições HTTP, timers, leitura de arquivos.',
    blocks: [
      { type:'text', title:'JavaScript é single-thread e assíncrono',
        body:'JavaScript executa uma coisa por vez (single-thread). Mas operações como buscar dados de uma API levam tempo — se fossem síncronas, trvariam o navegador. A solução é assincronia: o JS inicia a operação, continua executando outras coisas, e quando a operação termina, chama uma função de callback. Promises e async/await são formas mais elegantes de escrever esse padrão.' },
      { type:'text', title:'Promises — o contrato assíncrono',
        body:'Uma Promise representa um valor que estará disponível no futuro. Ela tem três estados: <strong>pending</strong> (aguardando), <strong>fulfilled</strong> (resolvida com sucesso), <strong>rejected</strong> (falhou). Você encadeia <code>.then(resultado)</code> para sucesso e <code>.catch(erro)</code> para falha. <code>Promise.all([p1, p2])</code> aguarda múltiplas promises em paralelo.' },
      { type:'text', title:'async/await — a sintaxe moderna',
        body:'<code>async/await</code> é açúcar sintático sobre Promises. Torna código assíncrono com aparência síncrona. <code>async function buscar()</code> sempre retorna uma Promise. <code>await promessa</code> pausa a execução da função até a Promise resolver. Envolva em <code>try/catch</code> para tratar erros. Sempre prefira async/await sobre .then() em código novo — é mais legível.' },
      { type:'callout',
        body:'<strong>Fetch API</strong> é o método nativo para requisições HTTP. <code>fetch(url)</code> retorna uma Promise. O processo: <code>const res = await fetch(url)</code> → obtém a Response. <code>const data = await res.json()</code> → parseia o JSON. Sempre verifique <code>res.ok</code> (true se status 200-299). Para POST: passe <code>{ method: "POST", headers, body: JSON.stringify(data) }</code>.' },
    ],
    editor: {
      tabs: ['HTML'],
      code: [`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Fetch + Async/Await</title>
  <style>
    body { background:#0a0c0f; color:#e8edf2; font-family:sans-serif; padding:2rem; }
    button { background:#00e5a0; color:#000; border:none; padding:.6rem 1.25rem; border-radius:8px; cursor:pointer; font-weight:700; margin:.25rem; }
    .card { background:#13181f; border:1px solid #1e242d; border-radius:12px; padding:1rem; margin:.5rem 0; }
    .erro { color:#ff4d4d; }
    .loading { color:#8a95a3; }
  </style>
</head>
<body>
  <h1>Fetch API</h1>
  <button onclick="buscarUsuario()">Buscar usuário aleatório</button>
  <button onclick="buscarMultiplos()">Buscar 3 em paralelo</button>
  <div id="resultado"></div>

  <script>
    const el = document.getElementById('resultado');

    // ASYNC/AWAIT — forma moderna e legível
    async function buscarUsuario() {
      el.innerHTML = '<p class="loading">Carregando...</p>';

      try {
        // fetch retorna Promise — await pausa até resolver
        const res  = await fetch('https://jsonplaceholder.typicode.com/users/1');

        if (!res.ok) throw new Error(\`HTTP \${res.status}\`);

        // .json() também é assíncrono
        const user = await res.json();

        el.innerHTML = \`
          <div class="card">
            <strong>\${user.name}</strong><br>
            📧 \${user.email}<br>
            🏢 \${user.company.name}<br>
            🌐 \${user.website}
          </div>
        \`;
      } catch (erro) {
        el.innerHTML = \`<p class="erro">Erro: \${erro.message}</p>\`;
      }
    }

    // PROMISE.ALL — múltiplas requests em paralelo
    async function buscarMultiplos() {
      el.innerHTML = '<p class="loading">Buscando 3 usuários em paralelo...</p>';

      try {
        const urls = [1, 2, 3].map(id =>
          fetch(\`https://jsonplaceholder.typicode.com/users/\${id}\`).then(r => r.json())
        );

        // Aguarda TODAS resolverem antes de continuar
        const usuarios = await Promise.all(urls);

        el.innerHTML = usuarios.map(u => \`
          <div class="card"><strong>\${u.name}</strong> — \${u.email}</div>
        \`).join('');

      } catch (erro) {
        el.innerHTML = \`<p class="erro">Erro: \${erro.message}</p>\`;
      }
    }
  </script>
</body>
</html>`],
    },
    quiz: [
      { q:'O que retorna uma função declarada com async?',
        opts:['Um valor direto','Sempre uma Promise','Um callback','undefined'],
        correct:1, explanation:'Toda função async retorna automaticamente uma Promise. Mesmo que você retorne um valor simples, o async envolve em Promise.resolve(valor). Por isso await só funciona dentro de funções async.' },
      { q:'O que faz await dentro de uma função async?',
        opts:['Para todo o JavaScript','Pausa apenas a execução da função async até a Promise resolver, sem bloquear o event loop','Converte uma Promise em valor síncrono permanentemente','Cancela a Promise se demorar muito'],
        correct:1, explanation:'await pausa a função async (não o JS todo) até a Promise resolver. O event loop continua executando outras tarefas enquanto aguarda. É por isso que a UI não trava.' },
      { q:'Para que serve res.ok na Fetch API?',
        opts:['Verifica se a resposta tem JSON','Verifica se o status HTTP é 200-299 (sucesso)','Cancela a requisição se houver erro','Retorna o corpo da resposta'],
        correct:1, explanation:'fetch() só lança erro para falhas de rede. Status 404 ou 500 NÃO lançam erro — a Promise resolve. Você precisa verificar res.ok (true para status 200-299) manualmente.' },
    ],
    challenge: {
      title:'App de busca de dados de API',
      desc:'Construa uma interface que consome uma API pública com tratamento de erros.',
      tasks:[
        'Use fetch + async/await para buscar dados de https://jsonplaceholder.typicode.com/posts',
        'Exiba os 5 primeiros posts como cards na página',
        'Adicione estado de loading ("Carregando...") enquanto aguarda',
        'Trate erros com try/catch e exiba mensagem amigável',
        'Adicione um input de busca que filtra os posts localmente pelo título',
      ],
    },
  },

  /* ──────────────────────────────────────────────────────────
     CAP 10 — LocalStorage e persistência
  ────────────────────────────────────────────────────────── */
  'js-10': {
    moduleId: 'js',
    title: 'LocalStorage e persistência de dados',
    desc: 'LocalStorage permite salvar dados no navegador do usuário — preferências, carrinho de compras, rascunhos, configurações — sem servidor.',
    blocks: [
      { type:'text', title:'Web Storage API',
        body:'O navegador oferece duas formas de armazenamento local: <strong>localStorage</strong> — persiste mesmo fechando o navegador, sem data de expiração. <strong>sessionStorage</strong> — persiste só durante a sessão (até fechar a aba). Ambos armazenam apenas strings, têm limite de ~5MB por domínio. API simples: <code>setItem(chave, valor)</code>, <code>getItem(chave)</code>, <code>removeItem(chave)</code>, <code>clear()</code>.' },
      { type:'text', title:'Serializando objetos com JSON',
        body:'Como o localStorage só aceita strings, use <code>JSON.stringify(objeto)</code> para converter objeto/array em string antes de salvar. Use <code>JSON.parse(string)</code> para converter de volta ao carregar. Sempre use <code>try/catch</code> ao fazer JSON.parse — se a string for inválida, lança SyntaxError. Padrão profissional: funções wrapper <code>salvar(chave, valor)</code> e <code>carregar(chave)</code> que encapsulam a serialização.' },
      { type:'text', title:'Quando usar localStorage',
        body:'Bom para: preferências do usuário (tema, idioma), rascunhos de formulário, histórico de buscas, carrinho de compras simples, estado de UI (sidebar aberta/fechada). <strong>Nunca armazene</strong> no localStorage: tokens de autenticação (use httpOnly cookies), dados sensíveis (cartão de crédito, senhas), dados que precisam sincronizar entre dispositivos. localStorage é acessível por qualquer JavaScript da página — vulnerável a XSS.' },
      { type:'callout',
        body:'<strong>Padrão de hidratação:</strong> Ao carregar a página, leia os dados do localStorage e "hidrate" o estado inicial da sua aplicação. Ao fazer qualquer mudança, salve no localStorage imediatamente. Isso garante que o usuário nunca perde dados ao atualizar a página. É o padrão usado por apps como Gmail (rascunhos) e VSCode (estado de arquivos).' },
    ],
    editor: {
      tabs: ['HTML'],
      code: [`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>LocalStorage</title>
  <style>
    body { background:#0a0c0f; color:#e8edf2; font-family:sans-serif; padding:2rem; }
    input, textarea { background:#13181f; border:1px solid #1e242d; color:#e8edf2;
      padding:.6rem 1rem; border-radius:8px; outline:none; width:100%; margin:.3rem 0; }
    input:focus, textarea:focus { border-color:#00e5a0; }
    button { background:#00e5a0; color:#000; border:none; padding:.5rem 1rem; border-radius:8px; cursor:pointer; font-weight:700; margin:.25rem; }
    .btn-danger { background:rgba(255,77,77,.15); color:#ff4d4d; }
    .preferencias { display:flex; gap:1rem; margin:1rem 0; flex-wrap:wrap; }
    .pref-btn { background:#13181f; border:1px solid #1e242d; color:#8a95a3; border-radius:8px; padding:.4rem .85rem; cursor:pointer; }
    .pref-btn.ativo { border-color:#00e5a0; color:#00e5a0; }
  </style>
</head>
<body>
  <h1>LocalStorage na prática</h1>

  <h2 style="margin:1rem 0 .5rem;font-size:1rem;color:#8a95a3">📝 Rascunho automático</h2>
  <textarea id="rascunho" rows="4" placeholder="Digite algo... será salvo automaticamente"></textarea>

  <h2 style="margin:1rem 0 .5rem;font-size:1rem;color:#8a95a3">🎨 Preferências de tema</h2>
  <div class="preferencias">
    <button class="pref-btn" data-tema="dark" onclick="setTema('dark')">🌙 Dark</button>
    <button class="pref-btn" data-tema="light" onclick="setTema('light')">☀️ Light</button>
    <button class="pref-btn" data-tema="system" onclick="setTema('system')">💻 Sistema</button>
  </div>

  <button onclick="limparTudo()" class="btn-danger">🗑 Limpar localStorage</button>
  <p id="info" style="color:#4a5568;font-size:.8rem;margin-top:.5rem"></p>

  <script>
    // ── Funções wrapper ──────────────────────────────────────
    function salvar(chave, valor) {
      localStorage.setItem(chave, JSON.stringify(valor));
    }
    function carregar(chave, padrao = null) {
      try {
        const item = localStorage.getItem(chave);
        return item ? JSON.parse(item) : padrao;
      } catch { return padrao; }
    }

    // ── Rascunho automático ──────────────────────────────────
    const textarea = document.getElementById('rascunho');
    // Hidratar ao carregar
    textarea.value = carregar('rascunho', '');

    textarea.addEventListener('input', () => {
      salvar('rascunho', textarea.value);
      document.getElementById('info').textContent = '✅ Salvo automaticamente';
    });

    // ── Tema ─────────────────────────────────────────────────
    function setTema(tema) {
      salvar('tema', tema);
      document.querySelectorAll('.pref-btn').forEach(btn => {
        btn.classList.toggle('ativo', btn.dataset.tema === tema);
      });
      document.getElementById('info').textContent = \`Tema "\${tema}" salvo!\`;
    }

    // Hidratar tema ao carregar
    const temaSalvo = carregar('tema', 'dark');
    setTema(temaSalvo);

    // ── Limpar ───────────────────────────────────────────────
    function limparTudo() {
      localStorage.clear();
      textarea.value = '';
      document.getElementById('info').textContent = '🗑 localStorage limpo';
    }
  </script>
</body>
</html>`],
    },
    quiz: [
      { q:'Qual a diferença entre localStorage e sessionStorage?',
        opts:['sessionStorage armazena mais dados','localStorage persiste após fechar o navegador; sessionStorage expira ao fechar a aba','localStorage só funciona com HTTPS','São iguais'],
        correct:1, explanation:'localStorage persiste indefinidamente até ser limpo manualmente. sessionStorage dura apenas a sessão da aba — fechar a aba apaga os dados. Ambos têm ~5MB de limite.' },
      { q:'Por que usar JSON.stringify ao salvar objetos no localStorage?',
        opts:['Para compressão','O localStorage só armazena strings — stringify converte objetos em string JSON','Para segurança','Para aumentar o limite de 5MB'],
        correct:1, explanation:'localStorage é um key-value store de strings. Objetos e arrays precisam ser convertidos com JSON.stringify antes de salvar. Na leitura, use JSON.parse para restaurar o tipo original.' },
      { q:'O que NÃO deve ser armazenado no localStorage?',
        opts:['Preferências de tema','Tokens de autenticação e dados sensíveis','Histórico de buscas','Estado de sidebar aberta/fechada'],
        correct:1, explanation:'localStorage é acessível por qualquer JS da página — vulnerável a ataques XSS. Tokens de auth devem usar httpOnly cookies (inacessíveis ao JavaScript). Dados sensíveis como senhas NUNCA devem ser armazenados no cliente.' },
    ],
    challenge: {
      title:'App de notas com persistência',
      desc:'Construa um app de notas que nunca perde dados ao recarregar.',
      tasks:[
        'Crie interface para adicionar, listar e deletar notas',
        'Salve as notas como array de objetos no localStorage',
        'Hidrate a lista ao carregar a página (leia do localStorage)',
        'Atualize o localStorage a cada mudança (adicionar/deletar)',
        'Adicione preferência de ordenação (mais recente/mais antigo) que também persiste',
      ],
    },
  },

  /* ──────────────────────────────────────────────────────────
     CAP 11 — Classes e Orientação a Objetos
  ────────────────────────────────────────────────────────── */
  'js-11': {
    moduleId: 'js',
    title: 'Classes e Orientação a Objetos',
    desc: 'Classes organizam código em torno de entidades do mundo real. Herança, encapsulamento e polimorfismo — os pilares da OOP em JavaScript moderno.',
    blocks: [
      { type:'text', title:'Classes em JavaScript',
        body:'Classes são templates para criar objetos. O método <code>constructor()</code> é chamado automaticamente ao criar uma instância com <code>new</code>. Propriedades com <code>this.nome</code> pertencem a cada instância. Métodos sem <code>function</code> são compartilhados por todas as instâncias (ficam no protótipo). <code>static</code> define métodos da classe (não das instâncias) — como funções utilitárias.' },
      { type:'text', title:'Herança com extends',
        body:'<code>class Aluno extends Pessoa</code> cria uma subclasse. A subclasse herda todos os métodos da classe pai. <code>super()</code> no constructor chama o constructor do pai — obrigatório antes de usar <code>this</code>. <code>super.metodo()</code> chama um método do pai. A subclasse pode sobrescrever métodos do pai (override). Prefira composição à herança para evitar hierarquias complexas.' },
      { type:'text', title:'Getters, Setters e campos privados',
        body:'<code>get nome() { }</code> e <code>set nome(v) { }</code> permitem acessar métodos como propriedades: <code>aluno.nome</code> em vez de <code>aluno.getNome()</code>. Campos privados com <code>#</code>: <code>#senha</code> só é acessível dentro da classe — JavaScript bloqueia acesso externo (diferente da convenção <code>_senha</code> que era apenas social). É encapsulamento real.' },
      { type:'callout',
        body:'<strong>Classes vs Objetos literais:</strong> Para uma única instância, use objeto literal (<code>const config = { ... }</code>). Use classes quando precisar criar múltiplas instâncias do mesmo tipo, precisar de herança ou quiser encapsulamento com campos privados. Em React, componentes funcionais substituíram classes — mas classes continuam presentes em muitas bases de código.' },
    ],
    editor: {
      tabs: ['JS'],
      code: [`// ── CLASSE BASE ─────────────────────────────────────────────
class Pessoa {
  #senha; // campo privado — inacessível fora da classe

  constructor(nome, email, senha) {
    this.nome  = nome;
    this.email = email;
    this.#senha = senha;
    this.criadoEm = new Date();
  }

  // Método de instância
  apresentar() {
    return \`Olá! Sou \${this.nome} (\${this.email})\`;
  }

  // Getter — acessado como propriedade
  get iniciais() {
    return this.nome.split(' ').map(p => p[0]).join('').toUpperCase();
  }

  // Método estático — da classe, não da instância
  static validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

// ── HERANÇA ──────────────────────────────────────────────────
class Aluno extends Pessoa {
  constructor(nome, email, senha, curso) {
    super(nome, email, senha); // chama constructor da Pessoa
    this.curso   = curso;
    this.notas   = [];
    this.nivel   = 1;
  }

  adicionarNota(nota) {
    this.notas.push(nota);
    if (this.media > 80 && this.nivel < 5) this.nivel++;
  }

  get media() {
    if (!this.notas.length) return 0;
    return this.notas.reduce((a, b) => a + b, 0) / this.notas.length;
  }

  // Sobrescrevendo o método do pai (override)
  apresentar() {
    return \`\${super.apresentar()} — cursando \${this.curso}\`;
  }
}

// ── USO ───────────────────────────────────────────────────────
const ana = new Aluno('Ana Paula', 'ana@dev.com', 'senha123', 'ADS');
ana.adicionarNota(92);
ana.adicionarNota(88);
ana.adicionarNota(95);

console.log(ana.apresentar());    // "Olá! Sou Ana Paula... — cursando ADS"
console.log(ana.iniciais);        // "AP" — getter
console.log(ana.media.toFixed(1)); // "91.7"
console.log(ana.nivel);           // 2

console.log(Pessoa.validarEmail('ana@dev.com')); // true — método estático
// console.log(ana.#senha);                       // ❌ SyntaxError — privado!`],
    },
    quiz: [
      { q:'O que faz a palavra-chave super() no constructor de uma subclasse?',
        opts:['Cria uma cópia da superclasse','Chama o constructor da classe pai — obrigatório antes de usar this','Herda todos os métodos automaticamente','Define a classe como superior'],
        correct:1, explanation:'super() no constructor chama o constructor da classe pai, inicializando as propriedades herdadas. É obrigatório em subclasses antes de qualquer uso de this — se omitido, lança ReferenceError.' },
      { q:'O que são campos privados (#) em JavaScript?',
        opts:['Uma convenção visual sem efeito real','Propriedades acessíveis apenas dentro da classe — JavaScript bloqueia acesso externo','Campos somente leitura','Campos que não aparecem no console'],
        correct:1, explanation:'Campos com # (como #senha) são verdadeiramente privados — o JS lança SyntaxError ao tentar acessá-los fora da classe. Diferente de _senha, que é apenas convenção social sem proteção real.' },
      { q:'Quando preferir classes vs objetos literais?',
        opts:['Sempre use classes','Classes para múltiplas instâncias/herança/encapsulamento; objeto literal para instâncias únicas','Sempre use objetos literais','Classes apenas em TypeScript'],
        correct:1, explanation:'Objeto literal ({}) é perfeito para singletons (config, utils). Classes fazem sentido quando você precisa criar múltiplas instâncias do mesmo tipo, usar herança ou encapsulamento com campos privados.' },
    ],
    challenge: {
      title:'Sistema de gerenciamento de turma',
      desc:'Modele uma turma de estudantes usando classes.',
      tasks:[
        'Crie classe Pessoa com nome, email e método apresentar()',
        'Crie classe Aluno extends Pessoa com notas[], curso e getter media',
        'Crie classe Professor extends Pessoa com disciplina e método avaliar(aluno, nota)',
        'Adicione campo privado #matricula em Aluno',
        'Crie classe Turma com array de alunos e métodos: addAluno(), ranking() e mediaTurma()',
      ],
    },
  },

  /* ──────────────────────────────────────────────────────────
     CAP 12 — Módulos ES6
  ────────────────────────────────────────────────────────── */
  'js-12': {
    moduleId: 'js',
    title: 'Módulos ES6 — import e export',
    desc: 'Módulos dividem o código em arquivos reutilizáveis. Import e export são a base de todo projeto JavaScript moderno — React, Vue, Node.js e frameworks usam este sistema.',
    blocks: [
      { type:'text', title:'Por que módulos?',
        body:'Antes dos módulos, todo código JavaScript compartilhava o mesmo escopo global — uma variável em um arquivo podia colidir com outra em outro arquivo. Módulos resolvem isso: cada arquivo tem seu próprio escopo. Você <strong>exporta</strong> explicitamente o que quer compartilhar e <strong>importa</strong> explicitamente o que precisa usar. Isso torna dependências visíveis e elimina variáveis globais acidentais.' },
      { type:'text', title:'Export e Import',
        body:'<strong>Named export</strong>: <code>export function soma() { }</code> ou <code>export { soma, subtrair }</code>. Importar: <code>import { soma } from "./math.js"</code>. <strong>Default export</strong>: <code>export default class App { }</code> — um por arquivo. Importar: <code>import App from "./App.js"</code> (sem chaves). <strong>Renomear</strong>: <code>import { soma as add } from "./math.js"</code>. <strong>Importar tudo</strong>: <code>import * as Math from "./math.js"</code>.' },
      { type:'text', title:'Como usar no browser e no Node.js',
        body:'No <strong>browser</strong>: <code>&lt;script type="module" src="app.js"&gt;</code>. Módulos são deferred automaticamente e têm escopo próprio. Precisa de servidor (não funciona com file://) — use o Live Server do VS Code. No <strong>Node.js</strong>: use extensão <code>.mjs</code> ou adicione <code>"type": "module"</code> no <code>package.json</code>. Alternativa mais antiga (ainda muito usada): CommonJS com <code>require()</code> e <code>module.exports</code>.' },
      { type:'callout',
        body:'<strong>Import dinâmico</strong>: <code>const modulo = await import("./modulo.js")</code> — carrega o módulo sob demanda, não no início. Útil para code splitting: só carrega código quando o usuário precisar, reduzindo o tamanho inicial do bundle. É a base do lazy loading em React e Next.js.' },
    ],
    editor: {
      tabs: ['JS'],
      code: [`// ══════════════════════════════════════════════
// Arquivo: utils/math.js
// ══════════════════════════════════════════════
export const PI = 3.14159;

export function somar(a, b) { return a + b; }
export function subtrair(a, b) { return a - b; }
export function multiplicar(a, b) { return a * b; }

// Default export — um por arquivo
export default function calcular(op, a, b) {
  const ops = { '+': somar, '-': subtrair, '*': multiplicar };
  return ops[op]?.(a, b) ?? 'Operador inválido';
}

// ══════════════════════════════════════════════
// Arquivo: utils/string.js
// ══════════════════════════════════════════════
export const capitalizar = str =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const slugify = str =>
  str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

// ══════════════════════════════════════════════
// Arquivo: app.js  (arquivo principal)
// ══════════════════════════════════════════════

// Named imports — com chaves
import { somar, multiplicar, PI } from './utils/math.js';

// Default import — sem chaves, qualquer nome
import calcular from './utils/math.js';

// Renomeando import
import { capitalizar as toTitle } from './utils/string.js';

// Importando tudo como namespace
import * as StringUtils from './utils/string.js';

console.log(somar(3, 4));              // 7
console.log(multiplicar(PI, 2));       // 6.28318
console.log(calcular('+', 10, 5));     // 15
console.log(toTitle('devstart'));       // "Devstart"
console.log(StringUtils.slugify('Meu Curso de JS')); // "meu-curso-de-js"

// Import dinâmico — carrega sob demanda
async function carregarModuloHeavy() {
  const { default: Heavy } = await import('./heavy-module.js');
  Heavy.init();
}`],
    },
    quiz: [
      { q:'Qual a diferença entre named export e default export?',
        opts:['Named é mais rápido','Named permite múltiplos exports por arquivo (importado com {}); default é um por arquivo (importado sem {})','Default é mais moderno','Named é apenas para funções'],
        correct:1, explanation:'Named exports: export function nome(){} — importado com { nome }. Default export: export default classe — importado sem chaves, com qualquer nome. Um arquivo pode ter múltiplos named exports mas apenas um default.' },
      { q:'O que é import dinâmico?',
        opts:['Importar variáveis dinâmicas','Carregar um módulo sob demanda com await import() — não no início da execução','Importar de URLs externas','Renomear imports automaticamente'],
        correct:1, explanation:'import() dinâmico carrega o módulo apenas quando chamado, não no carregamento inicial. Isso permite code splitting — carregar código pesado só quando necessário, melhorando a performance inicial.' },
      { q:'Por que módulos eliminam o problema de variáveis globais?',
        opts:['Módulos usam let em vez de var','Cada módulo tem seu próprio escopo — variáveis não vazam para o escopo global','Módulos compilam o código','Módulos usam TypeScript'],
        correct:1, explanation:'Antes dos módulos, todo script compartilhava o escopo global — variável x em um arquivo colidia com x em outro. Módulos têm escopo próprio. Só o que for explicitamente exportado fica acessível externamente.' },
    ],
    challenge: {
      title:'Projeto organizado em módulos',
      desc:'Refatore um projeto monolítico para usar módulos ES6.',
      tasks:[
        'Crie utils/math.js com funções de cálculo (named exports)',
        'Crie utils/string.js com funções de formatação de texto',
        'Crie models/Aluno.js com a classe Aluno (default export)',
        'Crie app.js que importa e usa todos os módulos',
        'Use import dinâmico para carregar um módulo apenas quando um botão for clicado',
      ],
    },
  },

  /* ──────────────────────────────────────────────────────────
     CAP 13 — Tratamento de erros
  ────────────────────────────────────────────────────────── */
  'js-13': {
    moduleId: 'js',
    title: 'Tratamento de erros',
    desc: 'Erros acontecem — rede cai, usuário digita errado, API muda. Código robusto antecipa falhas e as trata graciosamente, sem deixar o usuário na mão.',
    blocks: [
      { type:'text', title:'try / catch / finally',
        body:'<code>try { }</code> envolve o código que pode falhar. <code>catch(erro) { }</code> captura o erro se ele ocorrer. <code>finally { }</code> executa sempre — com ou sem erro — ideal para limpar recursos. O objeto <code>erro</code> tem <code>erro.message</code> (descrição), <code>erro.name</code> (tipo: TypeError, ReferenceError, SyntaxError) e <code>erro.stack</code> (stack trace completo para debug).' },
      { type:'text', title:'Lançando erros com throw',
        body:'Você pode criar e lançar seus próprios erros com <code>throw new Error("mensagem")</code>. Isso interrompe a execução e sobe na pilha de chamadas até encontrar um <code>catch</code>. Boas práticas: lance erros com mensagens descritivas. Crie classes de erro customizadas (<code>class ValidacaoError extends Error</code>) para distinguir tipos de falha e ter comportamentos diferentes no catch.' },
      { type:'text', title:'Erros em código assíncrono',
        body:'Em funções async, envolva o <code>await</code> em <code>try/catch</code> para capturar rejeições de Promises. Sem isso, erros em código async resultam em "UnhandledPromiseRejection" — difícil de debugar. Para múltiplas operações independentes, use <code>Promise.allSettled()</code> em vez de <code>Promise.all()</code> — não falha se uma Promise rejeitar, retorna o resultado de cada uma individualmente.' },
      { type:'callout',
        body:'<strong>Nunca engula erros silenciosamente:</strong> <code>catch(e) { }</code> vazio é uma das piores práticas — o erro some e você não sabe o que está errado. Sempre: <code>console.error(e)</code> no mínimo. Em produção, use um serviço de monitoramento de erros (Sentry, Datadog). Diferencie erros esperados (validação) de inesperados (bug): trate os esperados, reporte os inesperados.' },
    ],
    editor: {
      tabs: ['JS'],
      code: [`// ── TRY/CATCH/FINALLY ───────────────────────────────────────
function dividir(a, b) {
  if (b === 0) throw new Error('Divisão por zero não é permitida');
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('Ambos os argumentos devem ser números');
  }
  return a / b;
}

try {
  console.log(dividir(10, 2));  // 5
  console.log(dividir(10, 0));  // lança Error
} catch (erro) {
  console.error(\`[\${erro.name}] \${erro.message}\`);
} finally {
  console.log('finally sempre executa');
}

// ── ERRO CUSTOMIZADO ─────────────────────────────────────────
class ValidacaoError extends Error {
  constructor(campo, mensagem) {
    super(mensagem);
    this.name  = 'ValidacaoError';
    this.campo = campo;
  }
}

function validarEmail(email) {
  if (!email.includes('@')) {
    throw new ValidacaoError('email', 'E-mail inválido — deve conter @');
  }
  return true;
}

try {
  validarEmail('usuario-sem-arroba');
} catch (erro) {
  if (erro instanceof ValidacaoError) {
    console.error(\`Campo "\${erro.campo}": \${erro.message}\`);
  } else {
    throw erro; // re-lança erros inesperados
  }
}

// ── ASYNC COM TRY/CATCH ──────────────────────────────────────
async function buscarDados(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(\`HTTP \${res.status}: \${res.statusText}\`);
    return await res.json();
  } catch (erro) {
    console.error('Erro na requisição:', erro.message);
    return null; // valor de fallback
  }
}

// ── PROMISE.ALLSETTLED ───────────────────────────────────────
async function buscarMultiplos() {
  const urls = [
    'https://jsonplaceholder.typicode.com/users/1',
    'https://url-que-nao-existe.xyz/erro',      // vai falhar
    'https://jsonplaceholder.typicode.com/users/2',
  ];

  const resultados = await Promise.allSettled(urls.map(u => fetch(u)));
  resultados.forEach((r, i) => {
    if (r.status === 'fulfilled') console.log(\`URL \${i+1}: ✅ OK\`);
    else console.log(\`URL \${i+1}: ❌ \${r.reason.message}\`);
  });
}

buscarMultiplos();`],
    },
    quiz: [
      { q:'Quando o bloco finally é executado?',
        opts:['Apenas se não houver erro','Apenas se houver erro','Sempre — com ou sem erro, após try e catch','Apenas em código assíncrono'],
        correct:2, explanation:'finally sempre executa, independente de erro. Útil para garantir limpeza de recursos (fechar conexão, parar loading spinner) que deve acontecer em qualquer cenário.' },
      { q:'Por que nunca deixar catch vazio (catch(e) {})?',
        opts:['Causa erro de sintaxe','Engole o erro silenciosamente — o bug some e fica impossível de debugar','Aumenta o consumo de memória','Não é recomendado apenas por estilo'],
        correct:1, explanation:'Um catch vazio captura o erro e não faz nada com ele — você nunca saberá que algo deu errado. Sempre faça pelo menos console.error(e) ou re-lance o erro com throw e para erros inesperados.' },
      { q:'Qual a diferença entre Promise.all() e Promise.allSettled()?',
        opts:['São iguais','Promise.all() falha se qualquer Promise rejeitar; Promise.allSettled() retorna resultado de todas, independente de sucesso ou falha','Promise.allSettled() é mais rápido','Promise.all() funciona apenas em Node.js'],
        correct:1, explanation:'Promise.all() rejeita imediatamente se qualquer Promise falhar. Promise.allSettled() aguarda todas e retorna um array com o status de cada uma (fulfilled ou rejected) — ideal quando as operações são independentes.' },
    ],
    challenge: {
      title:'Sistema robusto com tratamento de erros',
      desc:'Adicione tratamento de erros profissional a uma aplicação.',
      tasks:[
        'Crie classe ApiError extends Error com statusCode e endpoint',
        'Crie função fetchComTratamento(url) com try/catch e verificação de res.ok',
        'Crie validador de formulário que lança ValidacaoError com campo e mensagem',
        'Use Promise.allSettled() para buscar dados de múltiplas APIs',
        'Crie um sistema de feedback visual: loading → sucesso → erro (com mensagem amigável)',
      ],
    },
  },

  /* ──────────────────────────────────────────────────────────
     CAP 14 — Desafio Final JavaScript
  ────────────────────────────────────────────────────────── */
  'js-14': {
    moduleId: 'js',
    title: '🏆 Desafio Final — JavaScript',
    desc: 'Hora de construir algo real. Um projeto completo que usa DOM, eventos, fetch, localStorage, classes e módulos — tudo junto.',
    blocks: [
      { type:'text', title:'O que você domina agora',
        body:'Em 13 capítulos você aprendeu: variáveis e tipos, operadores e condicionais, funções e closures, arrays com métodos modernos, objetos e destructuring, manipulação do DOM, eventos e event delegation, Fetch API com async/await, localStorage, classes e OOP, módulos ES6 e tratamento de erros. Isso é o kit completo do desenvolvedor JavaScript moderno.' },
      { type:'text', title:'O que fazer com JavaScript',
        body:'Com esse conhecimento você pode: criar qualquer interface interativa, consumir APIs públicas e construir apps de dados, criar jogos 2D com Canvas, desenvolver extensões de navegador, aprender React/Vue/Angular (todos são JS), aprender Node.js para backend, criar CLIs e ferramentas de linha de comando. JavaScript é literalmente a linguagem mais versátil do mundo.' },
      { type:'callout',
        body:'<strong>Próximo nível:</strong> O Módulo 04 — IA com Claude vai te ensinar a integrar inteligência artificial nos seus projetos: usar a API do Claude para criar assistentes, gerar conteúdo, analisar dados e automatizar tarefas. Com HTML + CSS + JS + IA, você estará no top 1% de desenvolvedores front-end.' },
      { type:'text', title:'Desafio: App de Filmes/Séries',
        body:'Construa um app que consume a API pública JSONPlaceholder (ou OMDb API) para listar, buscar e favoritar itens. O projeto deve usar: classes para modelar os dados, fetch para buscar da API, DOM para renderizar, eventos para interação, localStorage para favoritos, e módulos para organizar o código.' },
    ],
    editor: {
      tabs: ['HTML'],
      code: [`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DevNotes — App de Anotações</title>
  <style>
    :root {
      --bg: #0a0c0f; --card: #13181f; --border: #1e242d;
      --accent: #00e5a0; --text: #e8edf2; --muted: #8a95a3;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', sans-serif; background: var(--bg); color: var(--text); padding: 2rem; }
    h1 { color: var(--accent); margin-bottom: 1.5rem; }
    .form { display: flex; gap: .5rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
    input { flex: 1; min-width: 200px; background: var(--card); border: 1px solid var(--border); color: var(--text); padding: .6rem 1rem; border-radius: 8px; outline: none; }
    input:focus { border-color: var(--accent); }
    button { background: var(--accent); color: #000; border: none; padding: .6rem 1.2rem; border-radius: 8px; cursor: pointer; font-weight: 700; }
    .lista { display: grid; gap: 1rem; }
    .nota { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 1.25rem; }
    .nota h3 { margin-bottom: .5rem; }
    .nota p  { color: var(--muted); font-size: .875rem; line-height: 1.6; }
    .nota-actions { display: flex; gap: .5rem; margin-top: .75rem; }
    .btn-del { background: rgba(255,77,77,.1); color: #ff4d4d; font-size: .8rem; padding: .3rem .7rem; border-radius: 6px; border: none; cursor: pointer; }
    .btn-fav { background: rgba(255,184,0,.1); color: #ffb800; font-size: .8rem; padding: .3rem .7rem; border-radius: 6px; border: none; cursor: pointer; }
    .btn-fav.ativo { background: rgba(255,184,0,.25); }
    .empty { color: var(--muted); text-align: center; padding: 3rem; }
  </style>
</head>
<body>
  <h1>📝 DevNotes</h1>

  <div class="form">
    <input id="titulo" placeholder="Título da nota...">
    <input id="conteudo" placeholder="Conteúdo...">
    <button onclick="adicionarNota()">+ Nota</button>
  </div>

  <div class="lista" id="lista">
    <p class="empty">Nenhuma nota ainda. Crie a primeira!</p>
  </div>

  <script>
    // DESAFIO: Implemente o sistema abaixo usando tudo que aprendeu

    // Classe Nota
    class Nota {
      constructor(titulo, conteudo) {
        this.id        = Date.now();
        this.titulo    = titulo;
        this.conteudo  = conteudo;
        this.favorito  = false;
        this.criadaEm  = new Date().toLocaleDateString('pt-BR');
      }
    }

    // Gerenciador de notas
    class GerenciadorNotas {
      #notas = [];

      constructor() {
        this.#notas = this.#carregar();
      }

      adicionar(titulo, conteudo) {
        if (!titulo.trim()) throw new Error('Título é obrigatório');
        const nota = new Nota(titulo, conteudo);
        this.#notas.unshift(nota);
        this.#salvar();
        return nota;
      }

      remover(id) {
        this.#notas = this.#notas.filter(n => n.id !== id);
        this.#salvar();
      }

      toggleFavorito(id) {
        const nota = this.#notas.find(n => n.id === id);
        if (nota) { nota.favorito = !nota.favorito; this.#salvar(); }
      }

      get todas() { return this.#notas; }

      #salvar() { localStorage.setItem('devnotes', JSON.stringify(this.#notas)); }
      #carregar() {
        try { return JSON.parse(localStorage.getItem('devnotes') || '[]'); }
        catch { return []; }
      }
    }

    const gerenciador = new GerenciadorNotas();

    function renderizar() {
      const lista  = document.getElementById('lista');
      const notas  = gerenciador.todas;

      if (!notas.length) {
        lista.innerHTML = '<p class="empty">Nenhuma nota ainda. Crie a primeira!</p>';
        return;
      }

      lista.innerHTML = notas.map(nota => \`
        <div class="nota">
          <h3>\${nota.titulo}</h3>
          <p>\${nota.conteudo || 'Sem conteúdo'}</p>
          <div class="nota-actions">
            <button class="btn-fav \${nota.favorito ? 'ativo' : ''}"
                    onclick="toggleFav(\${nota.id})">
              \${nota.favorito ? '⭐ Favoritado' : '☆ Favoritar'}
            </button>
            <button class="btn-del" onclick="remover(\${nota.id})">🗑 Remover</button>
            <span style="margin-left:auto;font-size:.75rem;color:#4a5568">\${nota.criadaEm}</span>
          </div>
        </div>
      \`).join('');
    }

    function adicionarNota() {
      const titulo   = document.getElementById('titulo').value;
      const conteudo = document.getElementById('conteudo').value;
      try {
        gerenciador.adicionar(titulo, conteudo);
        document.getElementById('titulo').value   = '';
        document.getElementById('conteudo').value = '';
        renderizar();
      } catch(e) { alert(e.message); }
    }

    function remover(id) { gerenciador.remover(id); renderizar(); }
    function toggleFav(id) { gerenciador.toggleFavorito(id); renderizar(); }

    // Inicializar
    renderizar();
  </script>
</body>
</html>`],
    },
    quiz: [
      { q:'Qual é o fluxo correto para um app JavaScript moderno?',
        opts:['HTML → PHP → banco de dados','Estrutura (HTML) + Estilo (CSS) + Comportamento (JS) + Dados (API/localStorage)','Apenas JavaScript para tudo','CSS primeiro, HTML depois'],
        correct:1, explanation:'A arquitetura web moderna separa responsabilidades: HTML estrutura, CSS estiliza, JS adiciona comportamento e gerencia dados. Cada camada tem sua função e elas trabalham juntas.' },
      { q:'Por que organizar código em classes e módulos?',
        opts:['É obrigatório no JS moderno','Melhora organização, reusabilidade, testabilidade e colaboração em equipe','Classes são mais rápidas que funções','Módulos reduzem o tamanho do arquivo'],
        correct:1, explanation:'Classes encapsulam estado e comportamento relacionados. Módulos separam responsabilidades em arquivos. Juntos, tornam o código mais organizado, reutilizável e fácil de manter em equipe.' },
      { q:'Ao construir um app completo, qual é a ordem lógica de desenvolvimento?',
        opts:['CSS → HTML → JavaScript','Design → HTML (estrutura) → CSS (estilo) → JS (lógica) → testes','JavaScript primeiro, HTML depois','Todos ao mesmo tempo'],
        correct:1, explanation:'O fluxo natural: defina o design/wireframe → construa o HTML semântico → aplique estilos CSS → adicione comportamento com JS → teste e itere. Cada etapa serve de base para a próxima.' },
    ],
    challenge: {
      title:'App de Notas Completo — DevNotes',
      desc:'Finalize o app DevNotes com todas as funcionalidades.',
      tasks:[
        'O código base já está no editor — revise e entenda cada parte',
        'Adicione filtro de favoritos: botão que mostra apenas notas favoritadas',
        'Adicione busca por título: input que filtra notas em tempo real (com debounce)',
        'Adicione ordenação: mais recente primeiro vs mais antigo primeiro',
        'Implemente exportar notas como .txt usando a API Blob do navegador',
      ],
    },
  },

};
