/* ============================================================
   DevStart — assets/js/content-logica.js
   Módulo 00 — Lógica de Programação (12 capítulos)
   ============================================================ */

export const LOGICA = {

  /* ──────────────────────────────────────────────────────────
     CAP 01 — O que é lógica
  ────────────────────────────────────────────────────────── */
  'logica-01': {
    moduleId: 'logica',
    title: 'O que é lógica de programação?',
    desc: 'Antes de escrever uma linha de código, você precisa aprender a pensar de forma estruturada. É isso que a lógica de programação ensina.',
    blocks: [
      { type:'text', title:'Por que aprender lógica antes de código?',
        body:'Muita gente começa direto em HTML ou Python e trava na primeira vez que precisa resolver um problema. O motivo quase sempre é o mesmo: falta de lógica. Código é só uma forma de escrever instruções — a habilidade real é saber <em>quais</em> instruções dar e em qual ordem.' },
      { type:'callout',
        body:'<strong>Analogia:</strong> Imagine que você quer ensinar um robô a fazer um sanduíche. Ele não entende "faça um sanduíche" — você precisa dizer: <code>1. Pegue o pão. 2. Abra o pão. 3. Coloque o recheio...</code> Esse processo de detalhar cada passo é lógica de programação.' },
      { type:'text', title:'O que é um computador, afinal?',
        body:'Um computador é uma máquina que executa instruções de forma extremamente rápida e precisa — mas completamente sem criatividade. Ele faz exatamente o que você mandou, nem mais, nem menos. Se der errado, o erro é sempre seu, não dele. Isso muda a forma como você precisa pensar.' },
      { type:'text', title:'Lógica no dia a dia',
        body:'Você já usa lógica o tempo todo sem perceber. Ao acordar: <em>SE estiver chovendo, ENTÃO pego o guarda-chuva.</em> Ao cozinhar: <em>ENQUANTO a água não ferver, ESPERE.</em> Esses padrões — condições, repetições, sequências — são a base de todo programa.' },
    ],
    editor: {
      tabs: ['Pseudocódigo'],
      code: [`// Pseudocódigo — linguagem informal para descrever lógica
// Não é código real, é um rascunho do raciocínio

ALGORITMO AcordarDeManha
  INICIO
    tocar_alarme()
    SE esta_chovendo ENTAO
      pegar_guarda_chuva()
    FIM_SE
    ENQUANTO nao_estou_pronto FACA
      me_preparar()
    FIM_ENQUANTO
    ir_para_faculdade()
  FIM
FIM_ALGORITMO

// Perceba a estrutura:
// 1. Sequência (uma coisa depois da outra)
// 2. Condição (SE... ENTÃO)
// 3. Repetição (ENQUANTO... FAÇA)
// Esses 3 elementos resolvem QUALQUER problema computacional`],
    },
    quiz: [
      { q:'O que melhor define "lógica de programação"?',
        opts:['Uma linguagem de programação específica','A habilidade de criar sequências de instruções para resolver problemas','Um software de desenvolvimento','A matemática por trás dos computadores'],
        correct:1, explanation:'Lógica de programação é a habilidade de estruturar raciocínio em passos ordenados — independente da linguagem usada.' },
      { q:'Por que um computador executa instruções erradas sem reclamar?',
        opts:['Porque ele é burro','Porque ele não tem sistema operacional','Porque ele executa exatamente o que foi programado, sem interpretação própria','Porque falta memória RAM'],
        correct:2, explanation:'Computadores não têm julgamento — eles executam fielmente o que você escreveu. O bug é sempre uma instrução errada.' },
      { q:'Quais são os 3 elementos fundamentais da lógica de programação?',
        opts:['HTML, CSS e JavaScript','Variáveis, funções e classes','Sequência, condição e repetição','Input, processamento e output'],
        correct:2, explanation:'Sequência (ordem de execução), Condição (decisões) e Repetição (loops) são os blocos básicos de qualquer algoritmo.' },
    ],
    challenge: {
      title:'Descreva seu algoritmo matinal',
      desc:'Escreva em pseudocódigo (ou português mesmo) os passos da sua manhã, usando os 3 elementos da lógica.',
      tasks:[
        'Identifique pelo menos 3 ações sequenciais da sua manhã',
        'Adicione pelo menos 1 condição (SE algo ENTÃO faça isso)',
        'Adicione pelo menos 1 repetição (ENQUANTO / REPITA)',
        'Revise: cada passo é claro o suficiente para um robô seguir?',
      ],
    },
  },

  /* ──────────────────────────────────────────────────────────
     CAP 02 — Algoritmos
  ────────────────────────────────────────────────────────── */
  'logica-02': {
    moduleId: 'logica',
    title: 'Algoritmos: resolvendo problemas passo a passo',
    desc: 'Todo programa é um algoritmo. Entender o que torna um algoritmo bom é a habilidade mais importante de um desenvolvedor.',
    blocks: [
      { type:'text', title:'O que é um algoritmo?',
        body:'Algoritmo é uma sequência finita de passos bem definidos que resolve um problema. A palavra vem do nome do matemático árabe Al-Khwarizmi (século IX). Receitas de bolo, instruções de montagem de móvel, GPS — tudo são algoritmos.' },
      { type:'callout',
        body:'<strong>3 características obrigatórias de um algoritmo:</strong> <br>• <code>Finito</code> — deve terminar em algum momento <br>• <code>Definido</code> — cada passo deve ser claro e sem ambiguidade <br>• <code>Eficaz</code> — deve produzir o resultado correto' },
      { type:'text', title:'Como criar um algoritmo?',
        body:'O processo é sempre o mesmo: <strong>1)</strong> Entenda o problema completamente. <strong>2)</strong> Identifique as entradas (o que você recebe) e saídas (o que deve produzir). <strong>3)</strong> Divida em subproblemas menores. <strong>4)</strong> Escreva os passos. <strong>5)</strong> Teste com exemplos.' },
      { type:'text', title:'Algoritmo vs. Programa',
        body:'Um algoritmo é a ideia — pode ser escrito em papel, em português, em fluxograma. Um programa é a implementação desse algoritmo em uma linguagem que o computador entende (JavaScript, Python etc.). Você pode ter um algoritmo perfeito implementado de forma ruim, ou um código bonito que resolve o problema errado.' },
    ],
    editor: {
      tabs: ['Algoritmo em Português', 'Algoritmo — Trocar Lâmpada'],
      code: [
`// ALGORITMO: Encontrar o maior de dois números
// Entrada: numero_a, numero_b
// Saída: o maior número

ALGORITMO MaiorNumero(numero_a, numero_b)
  INICIO
    SE numero_a > numero_b ENTAO
      RETORNE numero_a
    SENAO SE numero_b > numero_a ENTAO
      RETORNE numero_b
    SENAO
      RETORNE "São iguais"
    FIM_SE
  FIM
FIM_ALGORITMO

// Teste mental:
// MaiorNumero(10, 5) → retorna 10 ✓
// MaiorNumero(3, 8)  → retorna 8  ✓
// MaiorNumero(6, 6)  → "São iguais" ✓`,
`// ALGORITMO: Trocar uma lâmpada
// (exemplo clássico de algoritmo do cotidiano)

ALGORITMO TrocarLampada
  INICIO
    SE lampada_queimada ENTAO
      desligar_interruptor()
      ENQUANTO lampada_ainda_quente FACA
        esperar()
      FIM_ENQUANTO
      remover_lampada_velha()
      colocar_lampada_nova()
      ligar_interruptor()
      SE lampada_acendeu ENTAO
        ESCREVA "Troca concluída!"
      SENAO
        ESCREVA "Verifique a instalação"
      FIM_SE
    SENAO
      ESCREVA "Lâmpada está funcionando"
    FIM_SE
  FIM
FIM_ALGORITMO`],
    },
    quiz: [
      { q:'Qual das opções NÃO é uma característica obrigatória de um algoritmo?',
        opts:['Ser finito','Ser rápido','Ser definido (sem ambiguidade)','Ser eficaz'],
        correct:1, explanation:'Rapidez não é obrigatória — um algoritmo pode ser lento e ainda ser correto. O que é obrigatório é ser finito, definido e eficaz.' },
      { q:'Qual é a diferença entre algoritmo e programa?',
        opts:['Algoritmo roda no computador, programa não','Algoritmo é a lógica/ideia; programa é a implementação numa linguagem','Programas são mais rápidos que algoritmos','Não há diferença'],
        correct:1, explanation:'Algoritmo é a solução conceitual (pode ser em papel). Programa é essa solução escrita em código executável.' },
      { q:'Qual é o primeiro passo para criar um bom algoritmo?',
        opts:['Abrir o VS Code','Escolher a linguagem de programação','Entender completamente o problema','Escrever os loops'],
        correct:2, explanation:'Entender o problema é fundamental. Muitos bugs existem porque o programador começou a codar sem entender o que realmente precisava resolver.' },
    ],
    challenge: {
      title:'Crie 2 algoritmos do cotidiano',
      desc:'Escolha 2 situações do seu dia e escreva o algoritmo em pseudocódigo, identificando entradas, saídas e os 3 elementos (sequência, condição, repetição).',
      tasks:[
        'Algoritmo 1: escolha uma situação simples (ex: fazer café)',
        'Algoritmo 2: escolha uma situação com condição (ex: escolher roupa)',
        'Identifique: entradas e saídas de cada algoritmo',
        'Use pelo menos 1 condição em cada um',
        'Verifique: o algoritmo termina? Está sem ambiguidade?',
      ],
    },
  },

  /* ──────────────────────────────────────────────────────────
     CAP 03 — Fluxogramas
  ────────────────────────────────────────────────────────── */
  'logica-03': {
    moduleId: 'logica',
    title: 'Fluxogramas: visualizando a lógica',
    desc: 'Antes de escrever código, desenhar o fluxo do programa evita horas de retrabalho. Aprenda a linguagem visual dos desenvolvedores.',
    blocks: [
      { type:'text', title:'Por que usar fluxogramas?',
        body:'Código é linear — você lê de cima pra baixo. Mas problemas complexos têm ramificações, loops e exceções. Um fluxograma transforma essa complexidade em um diagrama visual que qualquer pessoa consegue entender, mesmo sem saber programar.' },
      { type:'callout',
        body:'<strong>Símbolos essenciais:</strong><br>• <code>Oval/Elipse</code> — Início e Fim<br>• <code>Retângulo</code> — Processo / ação<br>• <code>Losango</code> — Decisão (Sim/Não)<br>• <code>Paralelogramo</code> — Entrada/Saída de dados<br>• <code>Seta</code> — Direção do fluxo' },
      { type:'text', title:'Como ler um fluxograma',
        body:'Sempre comece pelo oval "Início". Siga as setas. Quando chegar num losango (decisão), escolha o caminho Sim ou Não. Continue até o oval "Fim". Se encontrar um loop, o fluxo vai voltar para um ponto anterior.' },
      { type:'text', title:'Fluxograma antes do código',
        body:'Profissionais experientes ainda desenham fluxogramas (ou diagramas similares) antes de codar. Não porque é obrigatório, mas porque pensar visualmente revela erros de lógica muito antes deles virarem bugs difíceis de encontrar.' },
    ],
    editor: {
      tabs: ['Fluxograma em texto', 'Fluxograma — Login'],
      code: [
`// Fluxograma em ASCII — Verificar se número é positivo
//
//        [INÍCIO]
//            |
//    [Ler número N]
//            |
//      <N > 0 ?>
//      /         \
//    SIM          NÃO
//     |             |
// [Mostrar     <N == 0 ?>
// "Positivo"]   /       \
//             SIM        NÃO
//              |           |
//         [Mostrar    [Mostrar
//          "Zero"]   "Negativo"]
//              \       /
//               \     /
//               [FIM]
//
// Em código JavaScript seria:
// if (n > 0)      → "Positivo"
// else if (n == 0)→ "Zero"
// else            → "Negativo"`,
`// Fluxograma — Processo de Login
//
//        [INÍCIO]
//            |
//  [Usuário digita email + senha]
//            |
//   <Email existe no banco?>
//      /           \
//    SIM            NÃO
//     |               |
// <Senha correta?>  [Mostrar "Usuário
//   /      \          não encontrado"]
// SIM       NÃO          |
//  |          |          |
// [Fazer   [Incrementar [Voltar ao
//  login]   tentativas]  início]
//  |          |
//  |    <3 tentativas?>
//  |      /        \
//  |    SIM         NÃO
//  |     |            |
//  |  [Bloquear    [Mostrar
//  |   conta]       "Senha errada"]
//  |                   |
//  |               [Voltar ao início]
//  |
// [FIM]`],
    },
    quiz: [
      { q:'Qual símbolo representa uma DECISÃO em um fluxograma?',
        opts:['Retângulo','Oval','Losango','Paralelogramo'],
        correct:2, explanation:'O losango (diamante) representa pontos de decisão — perguntas cujas respostas determinam o caminho do fluxo.' },
      { q:'Para que serve o paralelogramo em um fluxograma?',
        opts:['Representar o início e fim','Representar entrada e saída de dados','Representar um processo ou cálculo','Representar um subprograma'],
        correct:1, explanation:'O paralelogramo representa operações de entrada (ler dados) e saída (mostrar resultados).' },
      { q:'Por que criar um fluxograma ANTES de escrever código?',
        opts:['É obrigatório por lei','Para imprimir e entregar ao professor','Para visualizar a lógica e encontrar erros antes de implementar','Para escolher a linguagem de programação'],
        correct:2, explanation:'Fluxogramas revelam falhas de lógica visualmente, antes que virem bugs no código — economizando muito tempo de debug.' },
    ],
    challenge: {
      title:'Desenhe 2 fluxogramas',
      desc:'Usando papel, draw.io (gratuito) ou até ASCII art, crie fluxogramas para as situações abaixo.',
      tasks:[
        'Fluxograma 1: verificar se uma pessoa pode tirar carteira (idade >= 18)',
        'Fluxograma 2: calcular e mostrar a média de 3 notas (aprovado >= 6)',
        'Use todos os símbolos: oval, retângulo, losango e paralelogramo',
        'Verifique se todos os caminhos levam ao "Fim"',
      ],
    },
  },

  /* ──────────────────────────────────────────────────────────
     CAP 04 — Variáveis e constantes
  ────────────────────────────────────────────────────────── */
  'logica-04': {
    moduleId: 'logica',
    title: 'Variáveis e constantes',
    desc: 'Todo programa precisa guardar informações. Variáveis e constantes são as "caixas" onde esses dados vivem.',
    blocks: [
      { type:'text', title:'O que é uma variável?',
        body:'Uma variável é um espaço na memória do computador com um nome e um valor. O nome você escolhe, o valor pode mudar durante o programa — por isso "variável". É como uma caixa etiquetada: você pode colocar algo dentro, tirar, trocar.' },
      { type:'callout',
        body:'<strong>Regras para nomear variáveis:</strong><br>• Comece com letra ou underscore (<code>_</code>)<br>• Sem espaços (use <code>camelCase</code>: <code>nomeCompleto</code>)<br>• Sem acentos ou caracteres especiais<br>• Seja descritivo: <code>idadeUsuario</code> é melhor que <code>x</code>' },
      { type:'text', title:'Variável vs. Constante',
        body:'Uma <strong>constante</strong> é como uma variável que não pode mudar depois de definida. Use constantes para valores que não devem se alterar: o valor do PI, a velocidade da luz, a URL da sua API. Deixar algo como constante é uma forma de comunicar "isso nunca deve mudar".' },
      { type:'text', title:'Tipos de dados',
        body:'Cada variável guarda um tipo de dado: <strong>Inteiro</strong> (42), <strong>Real/Float</strong> (3.14), <strong>Texto/String</strong> ("Olá"), <strong>Booleano</strong> (verdadeiro/falso). O tipo define quais operações você pode fazer com o valor.' },
    ],
    editor: {
      tabs: ['Pseudocódigo', 'Equivalente em JS'],
      code: [
`// VARIÁVEIS E CONSTANTES em pseudocódigo

// Declaração
VARIAVEL nome: Texto = "Ana"
VARIAVEL idade: Inteiro = 20
VARIAVEL altura: Real = 1.65
VARIAVEL estudante: Booleano = Verdadeiro
CONSTANTE PI: Real = 3.14159

// Uso
ESCREVA "Nome: " + nome        // Nome: Ana
ESCREVA "Idade: " + idade      // Idade: 20

// Modificando variável
idade = idade + 1
ESCREVA "Ano que vem: " + idade // Ano que vem: 21

// Tentativa inválida (constante não muda)
PI = 3  // ERRO! Constante não pode ser alterada

// Boas práticas de nomenclatura
VARIAVEL nomeCompleto: Texto       // camelCase ✓
VARIAVEL salarioMensal: Real       // descritivo ✓
VARIAVEL x: Inteiro                // ruim — o que é x? ✗`,
`// Equivalente em JavaScript (próximos módulos)
// Por enquanto, apenas visualize a relação

let nome = "Ana";        // variável texto
let idade = 20;          // variável número
let altura = 1.65;       // variável decimal
let estudante = true;    // variável booleana
const PI = 3.14159;      // constante

// Modificando
idade = idade + 1;       // ou: idade++
console.log(idade);      // 21

// Em JS: let = pode mudar | const = não muda
// Você verá muito mais disso no módulo de JS!`],
    },
    quiz: [
      { q:'Qual é a principal diferença entre variável e constante?',
        opts:['Variável guarda texto, constante guarda números','Variável pode ter seu valor alterado, constante não','Constante é mais rápida','Não há diferença prática'],
        correct:1, explanation:'Variável pode ter o valor alterado durante a execução. Constante é definida uma vez e nunca muda — isso é garantido pelo programa.' },
      { q:'Qual dos nomes de variável abaixo segue as boas práticas?',
        opts:['nome completo','2nome','nomeCompleto','nome-completo'],
        correct:2, explanation:'camelCase (nomeCompleto) é o padrão: sem espaços, sem hífens, sem começar com número, sem caracteres especiais.' },
      { q:'Uma variável do tipo Booleano pode guardar quais valores?',
        opts:['0 e 1','Qualquer número','Verdadeiro ou Falso','Texto de até 1 caractere'],
        correct:2, explanation:'Booleano vem de George Boole — só aceita dois valores: verdadeiro (true) ou falso (false). É a base de toda lógica condicional.' },
    ],
    challenge: {
      title:'Modele as variáveis de um cadastro',
      desc:'Pense em um formulário de cadastro de aluno e declare todas as variáveis necessárias em pseudocódigo.',
      tasks:[
        'Declare pelo menos 5 variáveis com tipos corretos (nome, idade, curso...)',
        'Inclua pelo menos 1 constante que faria sentido nesse contexto',
        'Use nomes descritivos em camelCase',
        'Atribua valores iniciais de exemplo a cada variável',
        'Escreva um ESCREVA mostrando os dados do aluno formatados',
      ],
    },
  },

  /* ──────────────────────────────────────────────────────────
     CAP 05 — Tipos de dados
  ────────────────────────────────────────────────────────── */
  'logica-05': {
    moduleId: 'logica',
    title: 'Tipos de dados na prática',
    desc: 'Por que "10" + 10 pode dar "1010" em vez de 20? Entender tipos de dados evita bugs clássicos e confusões frustrantes.',
    blocks: [
      { type:'text', title:'Por que tipos importam?',
        body:'Computadores tratam dados diferentes de formas diferentes. Somar dois números dá um resultado; somar dois textos os concatena. Comparar um número com um texto pode dar resultados inesperados. Entender tipos é entender como o computador pensa.' },
      { type:'callout',
        body:'<strong>Tipos primitivos universais:</strong><br>• <code>Inteiro</code> — números sem casas decimais: -3, 0, 42<br>• <code>Real (Float)</code> — com casas decimais: 3.14, -0.5<br>• <code>Texto (String)</code> — sequência de caracteres: "Olá", "123"<br>• <code>Booleano</code> — verdadeiro/falso<br>• <code>Nulo</code> — ausência intencional de valor' },
      { type:'text', title:'Armadilhas de tipo',
        body:'O número <code>123</code> e o texto <code>"123"</code> parecem iguais mas são completamente diferentes. <code>123 + 1 = 124</code> (soma). <code>"123" + 1 = "1231"</code> (concatenação de texto). Esse tipo de confusão é responsável por uma quantidade enorme de bugs em sistemas reais.' },
      { type:'text', title:'Conversão de tipos',
        body:'Às vezes você precisa converter um tipo em outro. Texto para número (para fazer cálculos com dados de formulários), número para texto (para montar mensagens), booleano para texto (para exibir "Sim" ou "Não"). Toda linguagem tem funções de conversão.' },
    ],
    editor: {
      tabs: ['Tipos em pseudocódigo', 'Exemplos de conversão'],
      code: [
`// TIPOS DE DADOS — exemplos e operações

// Inteiros
VARIAVEL a: Inteiro = 10
VARIAVEL b: Inteiro = 3
ESCREVA a + b    // 13 (soma)
ESCREVA a / b    // 3  (divisão inteira, sem decimal)
ESCREVA a MOD b  // 1  (resto da divisão — módulo)

// Reais
VARIAVEL pi: Real = 3.14159
VARIAVEL raio: Real = 5.0
ESCREVA pi * raio * raio  // 78.53... (área do círculo)

// Strings
VARIAVEL nome: Texto = "Maria"
VARIAVEL sobrenome: Texto = "Silva"
ESCREVA nome + " " + sobrenome  // "Maria Silva"
ESCREVA TAMANHO(nome)           // 5 (letras)

// Booleano
VARIAVEL aprovado: Booleano = Verdadeiro
SE aprovado ENTAO
  ESCREVA "Parabéns!"
FIM_SE

// CUIDADO — tipo errado!
VARIAVEL numero_texto: Texto = "42"
ESCREVA numero_texto + 1  // "421" (concatenação!) NÃO 43!`,
`// CONVERSÃO DE TIPOS

// Texto → Número (para calcular com input do usuário)
VARIAVEL entrada: Texto = LER()   // usuário digitou "25"
VARIAVEL idade: Inteiro = PARA_INTEIRO(entrada)
ESCREVA idade + 1  // 26 (agora funciona!)

// Número → Texto (para montar mensagens)
VARIAVEL pontos: Inteiro = 150
VARIAVEL mensagem: Texto = "Você fez " + PARA_TEXTO(pontos) + " pontos"
ESCREVA mensagem  // "Você fez 150 pontos"

// Booleano → Texto
VARIAVEL ativo: Booleano = Verdadeiro
ESCREVA SE ativo ENTAO "Ativo" SENAO "Inativo"  // "Ativo"

// Verificar tipo antes de operar (boa prática)
SE TIPO(valor) == "Inteiro" ENTAO
  // faça operação numérica
FIM_SE`],
    },
    quiz: [
      { q:'O que acontece ao somar o número 5 com o texto "3" na maioria das linguagens?',
        opts:['Dá erro sempre','Resulta em 8','Resulta em "53" (concatenação)','Resulta em 53'],
        correct:2, explanation:'Na maioria das linguagens, quando você mistura número com texto numa soma, o número é convertido para texto e ocorre concatenação: 5 + "3" = "53".' },
      { q:'Qual tipo de dado é mais adequado para guardar o CPF de uma pessoa?',
        opts:['Inteiro','Real','Texto (String)','Booleano'],
        correct:2, explanation:'CPF parece número mas é texto — contém zeros à esquerda (012.345.678-09), hífens e pontos. Guardar como número perderia esses caracteres.' },
      { q:'O que é o operador MOD (módulo)?',
        opts:['Divisão com casas decimais','Multiplicação de módulos','Resto da divisão inteira','Raiz quadrada'],
        correct:2, explanation:'MOD retorna o resto da divisão. 10 MOD 3 = 1 (porque 10 ÷ 3 = 3, sobra 1). Muito usado para verificar se número é par (n MOD 2 == 0).' },
    ],
    challenge: {
      title:'Calculadora de média com tipos corretos',
      desc:'Escreva em pseudocódigo uma calculadora que lê 3 notas como texto, converte para número, calcula a média e exibe o resultado com a situação.',
      tasks:[
        'Leia as 3 notas como Texto (simulando input do usuário)',
        'Converta cada nota para Real antes de calcular',
        'Calcule a média corretamente',
        'Use condicional: média >= 6 → "Aprovado", senão → "Reprovado"',
        'Exiba a mensagem com a média formatada',
      ],
    },
  },

  /* ──────────────────────────────────────────────────────────
     CAP 06 — Operadores
  ────────────────────────────────────────────────────────── */
  'logica-06': {
    moduleId: 'logica',
    title: 'Operadores: o vocabulário das expressões',
    desc: 'Operadores são os verbos da lógica. Com eles você calcula, compara e combina condições para controlar o fluxo do seu programa.',
    blocks: [
      { type:'text', title:'Três famílias de operadores',
        body:'Existem 3 grupos: <strong>Aritméticos</strong> — fazem cálculos matemáticos. <strong>Relacionais</strong> — comparam valores e retornam verdadeiro/falso. <strong>Lógicos</strong> — combinam condições booleanas.' },
      { type:'callout',
        body:'<strong>Operadores aritméticos:</strong> <code>+</code> soma · <code>-</code> subtração · <code>*</code> multiplicação · <code>/</code> divisão · <code>%</code> módulo (resto) · <code>**</code> potência<br><br><strong>Operadores relacionais:</strong> <code>==</code> igual · <code>!=</code> diferente · <code>></code> maior · <code><</code> menor · <code>>=</code> maior ou igual · <code><=</code> menor ou igual<br><br><strong>Operadores lógicos:</strong> <code>E (AND)</code> · <code>OU (OR)</code> · <code>NÃO (NOT)</code>' },
      { type:'text', title:'Tabela verdade do AND e OR',
        body:'AND retorna Verdadeiro apenas quando <em>ambas</em> as condições são verdadeiras. OR retorna Verdadeiro quando <em>pelo menos uma</em> condição é verdadeira. NOT inverte o valor: NOT Verdadeiro = Falso.' },
      { type:'text', title:'Precedência de operadores',
        body:'Assim como na matemática, operadores têm prioridade: primeiro potência, depois multiplicação/divisão, depois soma/subtração, depois relacionais, depois lógicos. Use parênteses para garantir a ordem que você quer: <code>(2 + 3) * 4 = 20</code> é diferente de <code>2 + 3 * 4 = 14</code>.' },
    ],
    editor: {
      tabs: ['Aritméticos + Relacionais', 'Lógicos + Tabela Verdade'],
      code: [
`// OPERADORES ARITMÉTICOS
VARIAVEL a = 10, b = 3

ESCREVA a + b   // 13  (soma)
ESCREVA a - b   // 7   (subtração)
ESCREVA a * b   // 30  (multiplicação)
ESCREVA a / b   // 3.33 (divisão real)
ESCREVA a MOD b // 1   (resto)
ESCREVA a ** 2  // 100 (potência)

// Precedência (como na matemática)
ESCREVA 2 + 3 * 4    // 14 (não 20!)
ESCREVA (2 + 3) * 4  // 20 (parênteses primeiro)

// OPERADORES RELACIONAIS (retornam Booleano)
ESCREVA 5 > 3    // Verdadeiro
ESCREVA 5 < 3    // Falso
ESCREVA 5 == 5   // Verdadeiro
ESCREVA 5 != 3   // Verdadeiro
ESCREVA 5 >= 5   // Verdadeiro
ESCREVA 10 <= 9  // Falso`,
`// OPERADORES LÓGICOS — Tabela verdade

// AND — verdadeiro SE ambos forem verdadeiros
ESCREVA Verdadeiro AND Verdadeiro  // Verdadeiro
ESCREVA Verdadeiro AND Falso       // Falso
ESCREVA Falso AND Verdadeiro       // Falso
ESCREVA Falso AND Falso            // Falso

// OR — verdadeiro SE pelo menos um for verdadeiro
ESCREVA Verdadeiro OR Verdadeiro   // Verdadeiro
ESCREVA Verdadeiro OR Falso        // Verdadeiro
ESCREVA Falso OR Verdadeiro        // Verdadeiro
ESCREVA Falso OR Falso             // Falso

// NOT — inverte o valor
ESCREVA NOT Verdadeiro  // Falso
ESCREVA NOT Falso       // Verdadeiro

// Exemplo prático
VARIAVEL idade = 20, temCarteira = Verdadeiro
SE idade >= 18 AND temCarteira ENTAO
  ESCREVA "Pode dirigir"
FIM_SE`],
    },
    quiz: [
      { q:'Qual é o resultado de: 17 MOD 5?',
        opts:['3','2','3.4','1'],
        correct:1, explanation:'17 ÷ 5 = 3 com resto 2. Portanto 17 MOD 5 = 2. O módulo é muito usado para verificar paridade e divisibilidade.' },
      { q:'Quando o operador AND retorna Verdadeiro?',
        opts:['Quando pelo menos uma condição é verdadeira','Somente quando ambas as condições são verdadeiras','Sempre que a primeira condição é verdadeira','Nunca'],
        correct:1, explanation:'AND (E) exige que TODAS as condições sejam verdadeiras. Basta uma ser falsa para o resultado ser falso.' },
      { q:'Qual o resultado de: NOT (5 > 3)?',
        opts:['Verdadeiro','Falso','5','3'],
        correct:1, explanation:'5 > 3 é Verdadeiro. NOT Verdadeiro = Falso. O NOT inverte o valor booleano.' },
    ],
    challenge: {
      title:'Sistema de validação com operadores',
      desc:'Escreva a lógica de validação de um cadastro usando os três tipos de operadores.',
      tasks:[
        'Valide idade: deve ser >= 18 E <= 120',
        'Valide nota: deve ser >= 0 E <= 10',
        'Valide senha: tamanho >= 8 OU contem caractere especial',
        'Combine as validações: só cadastra SE todas forem válidas',
        'Exiba mensagem de erro específica para cada validação falha',
      ],
    },
  },

  /* ──────────────────────────────────────────────────────────
     CAP 07 — Estruturas condicionais
  ────────────────────────────────────────────────────────── */
  'logica-07': {
    moduleId: 'logica',
    title: 'Estruturas condicionais: SE, SENÃO, ESCOLHA',
    desc: 'Todo programa precisa tomar decisões. As estruturas condicionais são o mecanismo que permite ao seu código responder de formas diferentes a situações diferentes.',
    blocks: [
      { type:'text', title:'SE... ENTÃO... SENÃO',
        body:'A estrutura mais básica de decisão. O programa avalia uma condição — se for verdadeira, executa o bloco do SE; se for falsa, executa o bloco do SENÃO (opcional). Você pode encadear múltiplas condições com SENÃO SE.' },
      { type:'callout',
        body:'<strong>Atenção ao encadeamento:</strong> Quando você usa <code>SENÃO SE</code>, o programa verifica as condições em ordem e executa apenas o primeiro bloco verdadeiro. Uma vez que um bloco é executado, os demais são ignorados — mesmo que também sejam verdadeiros.' },
      { type:'text', title:'ESCOLHA... CASO (switch)',
        body:'Quando você tem muitas condições baseadas no <em>valor exato</em> de uma variável, o ESCOLHA (switch) é mais legível que vários SENÃO SE encadeados. Funciona comparando a variável com cada CASO e executando o bloco correspondente.' },
      { type:'text', title:'Condicionais aninhadas',
        body:'Você pode colocar um SE dentro de outro SE — isso se chama aninhamento. Use com moderação: mais de 3 níveis de aninhamento torna o código difícil de entender. Se isso acontecer, considere dividir em funções menores.' },
    ],
    editor: {
      tabs: ['SE / SENÃO SE / SENÃO', 'ESCOLHA / CASO'],
      code: [
`// ESTRUTURA SE — SENÃO SE — SENÃO

// Exemplo 1: Classificação de nota
VARIAVEL nota = 7.5

SE nota >= 9 ENTAO
  ESCREVA "Excelente — A"
SENAO SE nota >= 7 ENTAO
  ESCREVA "Bom — B"
SENAO SE nota >= 5 ENTAO
  ESCREVA "Regular — C"
SENAO SE nota >= 3 ENTAO
  ESCREVA "Fraco — D"
SENAO
  ESCREVA "Reprovado — F"
FIM_SE
// Saída: "Bom — B"

// Exemplo 2: Condicional aninhada
VARIAVEL temperatura = 28
VARIAVEL chovendo = Falso

SE temperatura > 25 ENTAO
  SE chovendo ENTAO
    ESCREVA "Quente mas chuvoso — leve guarda-chuva"
  SENAO
    ESCREVA "Dia perfeito para praia!"
  FIM_SE
SENAO
  ESCREVA "Vista um casaco"
FIM_SE`,
`// ESCOLHA / CASO — equivalente ao switch

// Exemplo: Menu de opções
VARIAVEL opcao: Inteiro = 2

ESCOLHA opcao
  CASO 1:
    ESCREVA "Novo cadastro"
  CASO 2:
    ESCREVA "Consultar cadastro"
  CASO 3:
    ESCREVA "Atualizar dados"
  CASO 4:
    ESCREVA "Excluir cadastro"
  CASO_CONTRARIO:
    ESCREVA "Opção inválida"
FIM_ESCOLHA
// Saída: "Consultar cadastro"

// Quando usar ESCOLHA vs SE:
// ✅ ESCOLHA: valor exato de UMA variável
// ✅ SE: condições com comparações, intervalos
//         ou múltiplas variáveis`],
    },
    quiz: [
      { q:'No encadeamento SE / SENÃO SE / SENÃO, o que acontece quando a primeira condição é verdadeira?',
        opts:['Todas as condições são verificadas','O bloco é executado e as demais condições são ignoradas','O programa entra em loop','Retorna erro'],
        correct:1, explanation:'Uma vez que uma condição é verdadeira, seu bloco é executado e o resto da cadeia é ignorada — mesmo que outras condições também sejam verdadeiras.' },
      { q:'Em qual situação o ESCOLHA/CASE é preferível ao SE/SENÃO?',
        opts:['Quando há condições com intervalos numéricos','Quando há comparação com múltiplas variáveis','Quando se compara o valor exato de uma única variável com várias opções','Quando há condições aninhadas'],
        correct:2, explanation:'ESCOLHA é ideal para verificar o valor exato de uma variável contra múltiplas opções fixas — é mais legível que vários SENÃO SE.' },
      { q:'Qual é o risco de usar condicionais muito aninhadas?',
        opts:['O programa fica mais rápido','O código fica difícil de ler e manter','As condições ficam mais precisas','Não há nenhum risco'],
        correct:1, explanation:'Aninhamento excessivo (mais de 3 níveis) cria o "Pyramid of Doom" — código ilegível e propenso a bugs. A solução é extrair lógica em funções.' },
    ],
    challenge: {
      title:'Sistema de classificação de IMC',
      desc:'Implemente em pseudocódigo o cálculo e classificação do IMC (Índice de Massa Corporal).',
      tasks:[
        'Leia peso (kg) e altura (m) como variáveis',
        'Calcule IMC = peso / (altura * altura)',
        'Classifique: <18.5 Abaixo, 18.5-24.9 Normal, 25-29.9 Sobrepeso, >=30 Obesidade',
        'Exiba o IMC calculado e a classificação',
        'Adicione validação: peso e altura devem ser positivos',
      ],
    },
  },

  /* ──────────────────────────────────────────────────────────
     CAP 08 — Estruturas de repetição
  ────────────────────────────────────────────────────────── */
  'logica-08': {
    moduleId: 'logica',
    title: 'Estruturas de repetição: loops',
    desc: 'Repetir tarefas manualmente é impraticável. Loops permitem que o computador faça em segundos o que levaria horas para um humano.',
    blocks: [
      { type:'text', title:'Por que loops existem?',
        body:'Imagine exibir os números de 1 a 1.000.000. Sem loop, você escreveria 1.000.000 linhas de ESCREVA. Com loop, são 4 linhas. Repetição é uma das superpotências do computador — e loops são como você a controla.' },
      { type:'callout',
        body:'<strong>3 estruturas de repetição:</strong><br>• <code>PARA</code> — quando você sabe quantas vezes repetir<br>• <code>ENQUANTO</code> — repete enquanto condição for verdadeira (verifica antes)<br>• <code>REPITA...ATÉ</code> — repete até condição ser verdadeira (verifica depois, executa pelo menos 1x)' },
      { type:'text', title:'Cuidado: Loop infinito',
        body:'Um loop infinito acontece quando a condição de parada nunca se torna falsa. O programa trava ou consome 100% do processador. Sempre garanta que a variável de controle do loop está sendo atualizada corretamente dentro do loop.' },
      { type:'text', title:'BREAK e CONTINUE',
        body:'<strong>BREAK</strong> interrompe o loop imediatamente, mesmo que a condição ainda seja verdadeira. <strong>CONTINUE</strong> pula para a próxima iteração, ignorando o restante do bloco atual. Use com moderação — loop com break/continue fica mais difícil de ler.' },
    ],
    editor: {
      tabs: ['PARA (FOR)', 'ENQUANTO (WHILE)', 'REPITA (DO-WHILE)'],
      code: [
`// LOOP PARA — usado quando se sabe quantas vezes repetir

// Exemplo 1: Contar de 1 a 10
PARA i = 1 ATÉ 10 FACA
  ESCREVA i
FIM_PARA
// Saída: 1 2 3 4 5 6 7 8 9 10

// Exemplo 2: Tabuada do 7
PARA i = 1 ATÉ 10 FACA
  ESCREVA "7 x " + i + " = " + (7 * i)
FIM_PARA

// Exemplo 3: Iterar com passo personalizado
PARA i = 0 ATÉ 100 PASSO 10 FACA
  ESCREVA i  // 0 10 20 30 40 50 60 70 80 90 100
FIM_PARA

// Exemplo 4: Contador regressivo
PARA i = 5 ATÉ 1 PASSO -1 FACA
  ESCREVA i  // 5 4 3 2 1
FIM_PARA
ESCREVA "Fogo!"`,
`// LOOP ENQUANTO — repete enquanto condição for verdadeira

// Exemplo 1: Leitura com validação
VARIAVEL senha = ""
ENQUANTO senha != "1234" FACA
  ESCREVA "Digite a senha:"
  senha = LER()
FIM_ENQUANTO
ESCREVA "Acesso liberado!"

// Exemplo 2: Somar números até digitar 0
VARIAVEL numero = -1
VARIAVEL soma = 0
ENQUANTO numero != 0 FACA
  ESCREVA "Digite um número (0 para sair):"
  numero = LER()
  soma = soma + numero
FIM_ENQUANTO
ESCREVA "Soma total: " + soma

// ⚠️ Loop infinito (NUNCA faça isso)
// VARIAVEL x = 1
// ENQUANTO x > 0 FACA  // sempre verdadeiro!
//   ESCREVA x          // x nunca muda!
// FIM_ENQUANTO`,
`// LOOP REPITA...ATÉ — executa pelo menos 1 vez

// Diferença do ENQUANTO:
// ENQUANTO verifica ANTES → pode não executar nenhuma vez
// REPITA verifica DEPOIS  → executa pelo menos 1 vez

// Exemplo: Menu interativo
VARIAVEL opcao = 0
REPITA
  ESCREVA "=== MENU ==="
  ESCREVA "1 - Jogar"
  ESCREVA "2 - Configurações"
  ESCREVA "0 - Sair"
  opcao = LER()

  ESCOLHA opcao
    CASO 1: ESCREVA "Iniciando jogo..."
    CASO 2: ESCREVA "Abrindo configurações..."
    CASO 0: ESCREVA "Até logo!"
    CASO_CONTRARIO: ESCREVA "Opção inválida"
  FIM_ESCOLHA
ATÉ opcao == 0
// O menu sempre aparece pelo menos uma vez!`],
    },
    quiz: [
      { q:'Qual estrutura de loop é mais adequada quando você sabe exatamente quantas vezes repetir?',
        opts:['ENQUANTO','REPITA...ATÉ','PARA','Todas são equivalentes'],
        correct:2, explanation:'O PARA é ideal quando o número de iterações é conhecido. ENQUANTO e REPITA são melhores quando a repetição depende de uma condição dinâmica.' },
      { q:'Qual é a diferença entre ENQUANTO e REPITA...ATÉ?',
        opts:['ENQUANTO é mais rápido','REPITA sempre executa o bloco pelo menos uma vez; ENQUANTO pode não executar nenhuma vez','ENQUANTO verifica no final, REPITA no início','Não há diferença'],
        correct:1, explanation:'REPITA verifica a condição DEPOIS de executar — garante pelo menos uma execução. ENQUANTO verifica ANTES — se a condição já for falsa, nunca executa.' },
      { q:'O que causa um loop infinito?',
        opts:['Usar o operador AND dentro do loop','A condição de parada nunca se tornar falsa','Usar variáveis dentro do loop','Ter mais de 100 iterações'],
        correct:1, explanation:'Loop infinito ocorre quando a condição de parada nunca é satisfeita — geralmente porque a variável de controle não está sendo atualizada corretamente.' },
    ],
    challenge: {
      title:'Jogo de adivinhar o número',
      desc:'Implemente em pseudocódigo um jogo onde o computador "pensa" em um número e o usuário tenta adivinhar.',
      tasks:[
        'Defina um número secreto (ex: CONSTANTE SEGREDO = 42)',
        'Use REPITA para manter o jogo rodando',
        'A cada tentativa, diga se o palpite é maior, menor ou correto',
        'Conte o número de tentativas',
        'Ao acertar, mostre o número de tentativas usadas',
      ],
    },
  },

  /* ──────────────────────────────────────────────────────────
     CAP 09 — Vetores e matrizes
  ────────────────────────────────────────────────────────── */
  'logica-09': {
    moduleId: 'logica',
    title: 'Vetores e matrizes: listas e tabelas de dados',
    desc: 'E se você precisar guardar 100 notas de alunos? Criar 100 variáveis é impraticável. Vetores resolvem isso com elegância.',
    blocks: [
      { type:'text', title:'O que é um vetor (array)?',
        body:'Um vetor é uma coleção de valores do mesmo tipo, armazenados sequencialmente na memória, acessados por um índice numérico. Em vez de <code>nota1, nota2, nota3</code>, você tem <code>notas[0], notas[1], notas[2]</code>.' },
      { type:'callout',
        body:'<strong>Índices começam em 0!</strong> Na maioria das linguagens, o primeiro elemento é <code>[0]</code>, não <code>[1]</code>. Um vetor com 5 elementos tem índices 0, 1, 2, 3, 4. Acessar <code>[5]</code> daria erro — fora dos limites!' },
      { type:'text', title:'Matriz: vetor de vetores',
        body:'Uma matriz é um vetor bidimensional — pense em uma planilha com linhas e colunas. Cada elemento é acessado por dois índices: <code>matriz[linha][coluna]</code>. Útil para representar tabelas, grades, mapas de jogos.' },
      { type:'text', title:'Percorrendo com loops',
        body:'Vetores e loops foram feitos um para o outro. Um PARA de 0 até TAMANHO(vetor)-1 percorre todos os elementos. Isso transforma operações que antes exigiriam 1000 linhas em apenas 3.' },
    ],
    editor: {
      tabs: ['Vetores', 'Matrizes'],
      code: [
`// VETORES — declaração e acesso

// Declaração
VARIAVEL frutas: Vetor[5] de Texto
frutas[0] = "Maçã"
frutas[1] = "Banana"
frutas[2] = "Laranja"
frutas[3] = "Uva"
frutas[4] = "Manga"

// Ou em linha (literal)
VARIAVEL notas = [7.5, 8.0, 6.5, 9.0, 7.0]

// Acessando elementos
ESCREVA frutas[0]   // "Maçã"
ESCREVA notas[2]    // 6.5
ESCREVA TAMANHO(notas)  // 5

// Percorrendo com PARA
VARIAVEL soma = 0
PARA i = 0 ATÉ TAMANHO(notas) - 1 FACA
  soma = soma + notas[i]
FIM_PARA
ESCREVA "Média: " + (soma / TAMANHO(notas))  // 7.6

// Encontrar o maior valor
VARIAVEL maior = notas[0]
PARA i = 1 ATÉ TAMANHO(notas) - 1 FACA
  SE notas[i] > maior ENTAO
    maior = notas[i]
  FIM_SE
FIM_PARA
ESCREVA "Maior nota: " + maior  // 9.0`,
`// MATRIZES — vetor bidimensional

// Tabela 3x3 (3 linhas, 3 colunas)
VARIAVEL tabela: Matriz[3][3] de Inteiro

// Preenchendo
tabela[0][0] = 1  tabela[0][1] = 2  tabela[0][2] = 3
tabela[1][0] = 4  tabela[1][1] = 5  tabela[1][2] = 6
tabela[2][0] = 7  tabela[2][1] = 8  tabela[2][2] = 9

// Percorrendo a matriz completa (loop aninhado)
PARA linha = 0 ATÉ 2 FACA
  PARA coluna = 0 ATÉ 2 FACA
    ESCREVASEMNL tabela[linha][coluna] + " "
  FIM_PARA
  QUEBRALINHA()
FIM_PARA
// Saída:
// 1 2 3
// 4 5 6
// 7 8 9

// Exemplo real: notas de 3 alunos em 4 matérias
VARIAVEL notas_turma = [
  [7.0, 8.5, 6.0, 9.0],  // Aluno 0
  [5.5, 7.0, 8.0, 6.5],  // Aluno 1
  [9.0, 9.5, 8.5, 10.0]  // Aluno 2
]
ESCREVA notas_turma[2][3]  // 10.0 (aluno 2, matéria 3)`],
    },
    quiz: [
      { q:'Em um vetor com 8 elementos, qual é o índice do último elemento?',
        opts:['8','7','9','1'],
        correct:1, explanation:'Índices começam em 0. Em um vetor com 8 elementos, os índices vão de 0 a 7. O último é sempre TAMANHO - 1.' },
      { q:'O que é uma matriz em programação?',
        opts:['Um vetor com elementos negativos','Uma coleção de vetores — estrutura bidimensional com linhas e colunas','Um vetor de textos','Uma lista de funções'],
        correct:1, explanation:'Matriz é um vetor bidimensional — acessado por dois índices [linha][coluna]. Ideal para representar tabelas e grades.' },
      { q:'Qual combinação é ideal para percorrer todos os elementos de um vetor?',
        opts:['Condicionais aninhadas','Loop PARA com índice de 0 até TAMANHO-1','Loop REPITA com BREAK','Múltiplas variáveis separadas'],
        correct:1, explanation:'PARA de 0 até TAMANHO-1 é a forma padrão de percorrer vetores — garante que todos os elementos são visitados sem ultrapassar os limites.' },
    ],
    challenge: {
      title:'Sistema de notas de uma turma',
      desc:'Implemente um sistema completo para gerenciar as notas de uma turma usando vetores.',
      tasks:[
        'Crie um vetor com as notas de 6 alunos (valores entre 0 e 10)',
        'Calcule e exiba a média da turma',
        'Encontre e exiba a maior e menor nota',
        'Conte quantos alunos foram aprovados (nota >= 6)',
        'Exiba a lista de notas em ordem crescente (tente ordenar!)',
      ],
    },
  },

  /* ──────────────────────────────────────────────────────────
     CAP 10 — Funções e modularização
  ────────────────────────────────────────────────────────── */
  'logica-10': {
    moduleId: 'logica',
    title: 'Funções: dividindo para conquistar',
    desc: 'Copiar e colar código é a raiz de muitos problemas. Funções permitem escrever uma vez e reutilizar em qualquer lugar.',
    blocks: [
      { type:'text', title:'Por que funções?',
        body:'Imagine que você usa o mesmo cálculo de imposto em 15 lugares do seu sistema. Se a alíquota mudar, você precisa alterar 15 lugares. Com uma função, altera em 1 lugar e os 15 pontos se atualizam automaticamente. Funções são o principal mecanismo de reutilização de código.' },
      { type:'callout',
        body:'<strong>Anatomia de uma função:</strong><br>• <code>Nome</code> — descreve o que ela faz (verbo + substantivo)<br>• <code>Parâmetros</code> — dados que ela recebe<br>• <code>Corpo</code> — o que ela faz com esses dados<br>• <code>Retorno</code> — o resultado que ela devolve (opcional)' },
      { type:'text', title:'Funções vs. Procedimentos',
        body:'Uma <strong>função</strong> processa dados e retorna um resultado. Um <strong>procedimento</strong> (void function) executa ações sem retornar nada — como exibir texto na tela. Na prática moderna, ambos são chamados de "funções".' },
      { type:'text', title:'Escopo de variáveis',
        body:'Variáveis criadas dentro de uma função existem apenas dentro dela — isso se chama <strong>escopo local</strong>. Variáveis fora de qualquer função são <strong>globais</strong>. Prefira variáveis locais: elas evitam efeitos colaterais inesperados.' },
    ],
    editor: {
      tabs: ['Funções básicas', 'Funções avançadas'],
      code: [
`// DECLARANDO E CHAMANDO FUNÇÕES

// Função sem parâmetros e sem retorno (procedimento)
FUNCAO exibirBoasVindas()
  ESCREVA "=== Bem-vindo ao DevStart! ==="
FIM_FUNCAO

// Função com parâmetros e com retorno
FUNCAO calcularMedia(nota1: Real, nota2: Real, nota3: Real): Real
  VARIAVEL soma = nota1 + nota2 + nota3
  RETORNE soma / 3
FIM_FUNCAO

// Função com condição no retorno
FUNCAO verificarAprovacao(media: Real): Texto
  SE media >= 6 ENTAO
    RETORNE "Aprovado"
  SENAO
    RETORNE "Reprovado"
  FIM_SE
FIM_FUNCAO

// CHAMANDO as funções
exibirBoasVindas()

VARIAVEL minhaMedia = calcularMedia(7.0, 8.5, 6.5)
ESCREVA "Média: " + minhaMedia              // 7.33

VARIAVEL situacao = verificarAprovacao(minhaMedia)
ESCREVA "Situação: " + situacao             // Aprovado`,
`// ESCOPO E BOAS PRÁTICAS

// Variável LOCAL — existe só dentro da função
FUNCAO calcularAreaCirculo(raio: Real): Real
  VARIAVEL area = 3.14159 * raio * raio  // local!
  RETORNE area
FIM_FUNCAO

// "area" não existe aqui fora

// Funções chamando outras funções
FUNCAO calcularAreaQuadrado(lado: Real): Real
  RETORNE lado * lado
FIM_FUNCAO

FUNCAO calcularAreaRetangulo(base: Real, altura: Real): Real
  RETORNE base * altura
FIM_FUNCAO

FUNCAO calcularAreaTotal(lado: Real, base: Real, alt: Real): Real
  VARIAVEL aQ = calcularAreaQuadrado(lado)
  VARIAVEL aR = calcularAreaRetangulo(base, alt)
  RETORNE aQ + aR
FIM_FUNCAO

// Programa principal
ESCREVA calcularAreaTotal(4, 6, 3)  // 16 + 18 = 34

// Regra de ouro: 1 função = 1 responsabilidade`],
    },
    quiz: [
      { q:'Qual é a principal vantagem de usar funções?',
        opts:['O programa fica mais bonito','Reutilização de código — escreva uma vez, use em vários lugares','As funções rodam mais rápido','Variáveis ficam acessíveis em todo o programa'],
        correct:1, explanation:'Reutilização é o principal benefício: evita duplicação de código, facilita manutenção e reduz bugs — se precisar corrigir, corrige em um único lugar.' },
      { q:'O que é escopo local de uma variável?',
        opts:['Uma variável que funciona em qualquer lugar do programa','Uma variável acessível apenas dentro da função onde foi criada','Uma variável que não pode ser alterada','Uma constante'],
        correct:1, explanation:'Variáveis locais existem apenas dentro da função onde foram declaradas. Isso protege o restante do programa de modificações indesejadas.' },
      { q:'O que diferencia uma função de um procedimento?',
        opts:['Funções são mais rápidas','Funções retornam um valor; procedimentos executam ações sem retornar nada','Procedimentos aceitam parâmetros; funções não','Não há diferença prática'],
        correct:1, explanation:'Funções processam e retornam dados. Procedimentos executam ações (como exibir mensagens) sem retornar valor. Na prática moderna, ambos são chamados de "funções".' },
    ],
    challenge: {
      title:'Biblioteca de funções matemáticas',
      desc:'Crie um conjunto de funções que formarão uma mini-biblioteca matemática reutilizável.',
      tasks:[
        'calcularPotencia(base, expoente): retorna base elevada ao expoente',
        'calcularRaizQuadrada(numero): retorna a raiz (use expoente 0.5)',
        'calcularFatorial(n): retorna n! usando loop (ex: 5! = 120)',
        'ehPrimo(n): retorna Verdadeiro se n for primo',
        'Crie um programa principal que chama todas as funções com exemplos',
      ],
    },
  },

  /* ──────────────────────────────────────────────────────────
     CAP 11 — Pseudocódigo
  ────────────────────────────────────────────────────────── */
  'logica-11': {
    moduleId: 'logica',
    title: 'Pseudocódigo: o rascunho do programador',
    desc: 'Pseudocódigo é a ponte entre o pensamento humano e o código de máquina. Dominar essa ferramenta acelera seu desenvolvimento em qualquer linguagem.',
    blocks: [
      { type:'text', title:'O que é pseudocódigo?',
        body:'Pseudocódigo é uma forma de descrever algoritmos usando uma mistura de linguagem natural e estruturas de programação — sem a necessidade de seguir a sintaxe exata de nenhuma linguagem. É informal, flexível e focado na lógica, não na implementação.' },
      { type:'callout',
        body:'<strong>Pseudocódigo é uma ferramenta de pensamento:</strong><br>• Não compila nem executa<br>• Pode ser em português, inglês ou misto<br>• Foca na lógica, não na sintaxe<br>• Facilita a comunicação entre programadores<br>• Serve como documentação de alto nível' },
      { type:'text', title:'Da ideia ao pseudocódigo ao código',
        body:'O fluxo ideal é: <strong>1)</strong> Entender o problema. <strong>2)</strong> Escrever em pseudocódigo. <strong>3)</strong> Revisar a lógica. <strong>4)</strong> Traduzir para a linguagem escolhida. Pular o passo 2 é o erro mais comum de iniciantes.' },
      { type:'text', title:'Padrões de pseudocódigo populares',
        body:'Não existe um padrão único — cada empresa, universidade ou livro tem o seu. O importante é ser consistente e claro. Você já aprendeu o padrão usado neste curso. O Portugol é outro padrão brasileiro popular (você pode encontrá-lo em concursos públicos).' },
    ],
    editor: {
      tabs: ['Pseudocódigo → JavaScript', 'Pseudocódigo Completo'],
      code: [
`// PSEUDOCÓDIGO vs. JAVASCRIPT — tradução direta

// ── Variáveis ──
// Pseudo:  VARIAVEL nome: Texto = "Ana"
// JS:      let nome = "Ana";

// ── Condição ──
// Pseudo:
//   SE nota >= 6 ENTAO
//     ESCREVA "Aprovado"
//   SENAO
//     ESCREVA "Reprovado"
//   FIM_SE
//
// JS:
//   if (nota >= 6) {
//     console.log("Aprovado");
//   } else {
//     console.log("Reprovado");
//   }

// ── Loop PARA ──
// Pseudo:
//   PARA i = 0 ATÉ 9 FACA
//     ESCREVA i
//   FIM_PARA
//
// JS:
//   for (let i = 0; i <= 9; i++) {
//     console.log(i);
//   }

// ── Função ──
// Pseudo:
//   FUNCAO somar(a, b): Inteiro
//     RETORNE a + b
//   FIM_FUNCAO
//
// JS:
//   function somar(a, b) {
//     return a + b;
//   }`,
`// PSEUDOCÓDIGO COMPLETO — Sistema de votação simples

ALGORITMO SistemaVotacao
VARIAVEL votos_a: Inteiro = 0
VARIAVEL votos_b: Inteiro = 0
VARIAVEL total: Inteiro = 0
VARIAVEL voto: Texto
VARIAVEL continuar: Booleano = Verdadeiro

FUNCAO registrarVoto(candidato: Texto)
  SE candidato == "A" ENTAO
    votos_a = votos_a + 1
  SENAO SE candidato == "B" ENTAO
    votos_b = votos_b + 1
  SENAO
    ESCREVA "Voto inválido"
    RETORNE  // sai da função sem incrementar total
  FIM_SE
  total = total + 1
FIM_FUNCAO

FUNCAO exibirResultado()
  ESCREVA "=== RESULTADO ==="
  ESCREVA "Candidato A: " + votos_a + " votos"
  ESCREVA "Candidato B: " + votos_b + " votos"
  SE votos_a > votos_b ENTAO
    ESCREVA "Vencedor: Candidato A"
  SENAO SE votos_b > votos_a ENTAO
    ESCREVA "Vencedor: Candidato B"
  SENAO
    ESCREVA "Empate!"
  FIM_SE
FIM_FUNCAO

INICIO
  ENQUANTO continuar FACA
    voto = LER("Vote (A/B/S para sair): ")
    SE voto == "S" ENTAO
      continuar = Falso
    SENAO
      registrarVoto(voto)
    FIM_SE
  FIM_ENQUANTO
  exibirResultado()
FIM`],
    },
    quiz: [
      { q:'Qual é a principal característica do pseudocódigo?',
        opts:['Precisa compilar para funcionar','É focado na lógica, sem seguir a sintaxe exata de nenhuma linguagem','Só pode ser escrito em inglês','É mais rápido que código real'],
        correct:1, explanation:'Pseudocódigo é informal — foca na lógica do algoritmo sem se preocupar com a sintaxe precisa de uma linguagem. Isso acelera o planejamento.' },
      { q:'Qual é o fluxo ideal de desenvolvimento?',
        opts:['Abrir IDE → escrever código → testar → corrigir bugs','Entender o problema → pseudocódigo → revisar lógica → implementar','Desenhar fluxograma → escrever pseudocódigo → escolher linguagem → desistir','Copiar do Stack Overflow → adaptar → testar'],
        correct:1, explanation:'Planejar antes de codar (via pseudocódigo ou fluxograma) reduz drasticamente o tempo gasto em debug e retrabalho.' },
      { q:'Por que o pseudocódigo facilita a comunicação entre programadores?',
        opts:['Porque roda em qualquer computador','Porque é independente de linguagem — qualquer programador entende a lógica, independente da tecnologia que usa','Porque é mais curto que o código real','Porque não tem variáveis'],
        correct:1, explanation:'Pseudocódigo é universal — um programador Python e um Java conseguem discutir a lógica sem barreiras de sintaxe.' },
    ],
    challenge: {
      title:'Pseudocódigo do seu sistema favorito',
      desc:'Escolha uma funcionalidade de um app que você usa (ex: busca no Instagram, pagamento no iFood) e escreva o pseudocódigo.',
      tasks:[
        'Escolha uma funcionalidade específica (não o app inteiro)',
        'Identifique as entradas e saídas do processo',
        'Escreva o pseudocódigo com pelo menos 3 funções',
        'Use todos os elementos: variáveis, condições, loops, funções',
        'Revise: está claro o suficiente para outro dev implementar?',
      ],
    },
  },

  /* ──────────────────────────────────────────────────────────
     CAP 12 — Desafio Final do Módulo
  ────────────────────────────────────────────────────────── */
  'logica-12': {
    moduleId: 'logica',
    title: '🏆 Desafio Final — Lógica de Programação',
    desc: 'Você chegou ao fim do módulo 00! Agora é hora de provar que absorveu tudo — 5 problemas que cobrem cada conceito que você aprendeu.',
    blocks: [
      { type:'callout',
        body:'<strong>Regras do desafio:</strong> Resolva cada problema em pseudocódigo no editor abaixo. Não há resposta certa ou errada — o objetivo é demonstrar raciocínio lógico claro. Cada problema usa um ou mais conceitos do módulo.' },
      { type:'text', title:'Problema 1 — Calculadora de troco',
        body:'Um cliente paga R$ 50,00 por uma compra. Implemente um algoritmo que leia o valor da compra, calcule o troco e informe as cédulas/moedas necessárias (R$ 20, R$ 10, R$ 5, R$ 1, R$ 0,50, R$ 0,10).' },
      { type:'text', title:'Problema 2 — Sequência de Fibonacci',
        body:'A sequência de Fibonacci começa com 0, 1, e cada número seguinte é a soma dos dois anteriores: 0, 1, 1, 2, 3, 5, 8, 13... Implemente um algoritmo que exiba os primeiros N termos da sequência, onde N é fornecido pelo usuário.' },
      { type:'text', title:'Problema 3 — Busca em vetor',
        body:'Dado um vetor com 10 nomes, implemente uma função que receba um nome como parâmetro e retorne a posição onde o nome foi encontrado, ou -1 se não existir no vetor.' },
      { type:'text', title:'Problema 4 — Matriz transposta',
        body:'A transposta de uma matriz é obtida trocando linhas por colunas. Implemente um algoritmo que receba uma matriz 3x3 e exiba a matriz original e a transposta.' },
      { type:'text', title:'Problema 5 — Mini agenda',
        body:'Implemente uma mini agenda de contatos usando vetores paralelos (um para nomes, um para telefones). Deve ter funções para: adicionar contato, buscar por nome e listar todos os contatos.' },
    ],
    editor: {
      tabs: ['Problema 1', 'Problema 2', 'Problema 3', 'Problema 4', 'Problema 5'],
      code: [
`// PROBLEMA 1 — Calculadora de troco
// Dica: use MOD e divisão inteira para separar as cédulas

ALGORITMO CalcularTroco
  VARIAVEL valorCompra: Real = LER("Valor da compra: R$ ")
  VARIAVEL valorPago: Real = 50.00
  VARIAVEL troco: Real = valorPago - valorCompra

  SE troco < 0 ENTAO
    ESCREVA "Valor insuficiente!"
  SENAO
    ESCREVA "Troco: R$ " + troco
    // Sua implementação aqui:
    // calcular quantas notas de R$20, R$10...
  FIM_SE
FIM_ALGORITMO`,
`// PROBLEMA 2 — Fibonacci
// Dica: você precisará de 3 variáveis (anterior, atual, próximo)

ALGORITMO Fibonacci
  VARIAVEL n: Inteiro = LER("Quantos termos? ")
  // Escreva sua solução aqui
FIM_ALGORITMO`,
`// PROBLEMA 3 — Busca em vetor
// Dica: percorra o vetor e compare cada elemento

VARIAVEL nomes = ["Ana","Bruno","Carlos","Diana",
                  "Eduardo","Fernanda","Gabriel",
                  "Helena","Igor","Julia"]

FUNCAO buscarNome(nome: Texto): Inteiro
  // Retorne a posição ou -1
  // Escreva sua solução aqui
FIM_FUNCAO`,
`// PROBLEMA 4 — Matriz transposta
// Dica: transposta[j][i] = original[i][j]

VARIAVEL original = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]

// Crie a transposta e exiba ambas
// Escreva sua solução aqui`,
`// PROBLEMA 5 — Mini agenda
// Dica: vetores paralelos — nomes[i] corresponde a telefones[i]

VARIAVEL nomes: Vetor[50] de Texto
VARIAVEL telefones: Vetor[50] de Texto
VARIAVEL qtd: Inteiro = 0

FUNCAO adicionarContato(nome, tel)
  // Sua implementação
FIM_FUNCAO

FUNCAO buscarContato(nome)
  // Sua implementação
FIM_FUNCAO

FUNCAO listarContatos()
  // Sua implementação
FIM_FUNCAO`],
    },
    challenge: {
      title:'Complete todos os 5 problemas',
      desc:'Resolva cada problema usando os conceitos aprendidos no módulo. Não se preocupe com a sintaxe — foque na lógica.',
      tasks:[
        'Problema 1: Calculadora de troco com cédulas corretas',
        'Problema 2: Sequência de Fibonacci com N termos',
        'Problema 3: Busca em vetor retornando posição ou -1',
        'Problema 4: Transposta de matriz 3x3',
        'Problema 5: Mini agenda com 3 funções completas',
      ],
    },
  },

};
