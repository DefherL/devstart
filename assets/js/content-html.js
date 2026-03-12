/* ============================================================
   DevStart — assets/js/content-html.js
   Módulo 01 — HTML (10 capítulos)
   ============================================================ */

export const HTML = {

  /* ──────────────────────────────────────────────────────────
     CAP 01 — O que é HTML
  ────────────────────────────────────────────────────────── */
  'html-01': {
    moduleId: 'html',
    title: 'O que é HTML?',
    desc: 'HTML é a linguagem que estrutura toda página da web. Entender como ele funciona é o primeiro passo para criar qualquer coisa na internet.',
    blocks: [
      { type:'text', title:'A linguagem da web',
        body:'HTML significa <em>HyperText Markup Language</em> — Linguagem de Marcação de Hipertexto. Ele não é uma linguagem de programação: você não cria lógica ou cálculos com HTML. HTML é uma linguagem de <strong>estrutura</strong>: ele descreve o que cada coisa é numa página — isso é um título, isso é um parágrafo, isso é uma imagem, isso é um link.' },
      { type:'callout',
        body:'<strong>Analogia:</strong> Pense numa casa. O HTML é a <strong>estrutura</strong> — paredes, teto, janelas, portas. O CSS é a <strong>decoração</strong> — tinta, cortinas, móveis. O JavaScript é a <strong>eletricidade</strong> — liga e desliga coisas, faz a casa reagir.' },
      { type:'text', title:'Como o navegador usa o HTML',
        body:'Quando você acessa um site, o navegador baixa um arquivo <code>.html</code> e o lê de cima pra baixo. Ele interpreta cada <em>tag</em> e decide como renderizar o conteúdo na tela. Você nunca vê o HTML diretamente — você vê o resultado visual que o navegador constrói a partir dele.' },
      { type:'text', title:'Breve história',
        body:'O HTML foi criado por Tim Berners-Lee em 1991, no CERN (o laboratório de física da Suíça). A ideia era simples: criar um formato de documento que qualquer computador do mundo pudesse ler e que tivesse <em>links</em> — daí o "HyperText". O HTML5, versão atual, chegou em 2014 e trouxe suporte nativo a vídeo, áudio, canvas e APIs modernas.' },
    ],
    editor: {
      tabs: ['HTML'],
      code: [`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Minha primeira página</title>
</head>
<body>

  <h1>Olá, mundo!</h1>
  <p>Isso é HTML. Simples assim.</p>

  <p>Este parágrafo tem uma
     <strong>palavra em negrito</strong> e uma
     <em>palavra em itálico</em>.
  </p>

  <a href="https://google.com">Isso é um link</a>

</body>
</html>`],
    },
    quiz: [
      { q:'O que significa a sigla HTML?',
        opts:['High Text Markup Language','HyperText Markup Language','HyperText Modern Language','High Transfer Markup Language'],
        correct:1, explanation:'HTML = HyperText Markup Language. "Hyper" vem de hipertexto (texto com links). "Markup" é marcação — você marca o conteúdo com tags.' },
      { q:'HTML é considerado uma linguagem de programação?',
        opts:['Sim, é a principal linguagem da web','Não, é uma linguagem de marcação/estrutura','Sim, mas só a versão HTML5','Depende do navegador'],
        correct:1, explanation:'HTML é uma linguagem de marcação, não de programação. Ele descreve estrutura, não cria lógica ou comportamento.' },
      { q:'Quem criou o HTML e em que ano?',
        opts:['Bill Gates, 1985','Linus Torvalds, 1992','Tim Berners-Lee, 1991','Steve Jobs, 1995'],
        correct:2, explanation:'Tim Berners-Lee criou o HTML em 1991 no CERN para facilitar o compartilhamento de documentos entre cientistas.' },
    ],
    challenge: {
      title:'Sua primeira página HTML',
      desc:'Crie uma página HTML básica que apresente você mesmo.',
      tasks:[
        'Adicione o DOCTYPE e a estrutura básica (html, head, body)',
        'Coloque um título na aba do navegador usando a tag <title>',
        'Escreva seu nome num <h1>',
        'Adicione um parágrafo <p> descrevendo seu curso',
        'Inclua um link <a> para algum site que você usa',
      ],
    },
  },

  /* ──────────────────────────────────────────────────────────
     CAP 02 — Estrutura base de uma página HTML
  ────────────────────────────────────────────────────────── */
  'html-02': {
    moduleId: 'html',
    title: 'Estrutura base de uma página HTML',
    desc: 'Todo arquivo HTML válido tem uma estrutura obrigatória. Entender cada parte dela evita bugs e garante que o navegador interprete tudo corretamente.',
    blocks: [
      { type:'text', title:'O esqueleto de toda página web',
        body:'Toda página HTML começa com a mesma estrutura base. Ela não é opcional: sem ela, o navegador ainda tenta renderizar o conteúdo, mas pode interpretar errado a codificação de caracteres, o tipo de documento ou o idioma. Profissionais nunca pulam essas tags.' },
      { type:'text', title:'DOCTYPE — a declaração do tipo de documento',
        body:'A primeira linha de qualquer HTML deve ser <code>&lt;!DOCTYPE html&gt;</code>. Ela não é uma tag HTML — é uma instrução para o navegador. Ela diz: "Este documento usa HTML5, o padrão moderno." Sem ela, o navegador entra em "quirks mode" — um modo de compatibilidade com páginas antigas dos anos 90 que pode quebrar seu layout.' },
      { type:'text', title:'head vs body — o que vai em cada um',
        body:'A tag <code>&lt;head&gt;</code> contém informações <em>sobre</em> a página: título da aba, charset, links para CSS, scripts, meta tags para SEO. Nada dentro do <code>&lt;head&gt;</code> aparece visualmente na página.<br><br>A tag <code>&lt;body&gt;</code> contém tudo que o usuário vê e interage: textos, imagens, botões, formulários, vídeos.' },
      { type:'callout',
        body:'<strong>Dica:</strong> O atributo <code>lang="pt-BR"</code> na tag <code>&lt;html&gt;</code> é importante para acessibilidade. Leitores de tela usam isso para pronunciar o conteúdo corretamente. Também ajuda ferramentas de tradução automática.' },
    ],
    editor: {
      tabs: ['HTML'],
      code: [`<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <!-- Informações SOBRE a página (não aparecem na tela) -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Descrição da página para o Google">
  <title>Título que aparece na aba do navegador</title>
  <!-- Aqui virão links para CSS e scripts -->
</head>

<body>
  <!-- Tudo que o usuário VÊ fica aqui -->
  <h1>Conteúdo visível</h1>
  <p>Parágrafos, imagens, links, formulários...</p>
</body>

</html>`],
    },
    quiz: [
      { q:'Para que serve o <!DOCTYPE html>?',
        opts:['Define o título da página','Informa ao navegador que o documento usa HTML5','Conecta o arquivo CSS','Define o idioma da página'],
        correct:1, explanation:'O DOCTYPE informa ao navegador qual versão de HTML está sendo usada. Sem ele, o navegador entra em modo quirks, que pode quebrar o layout.' },
      { q:'Onde deve ficar o link para o arquivo CSS externo?',
        opts:['No final do <body>','No começo do <body>','Dentro do <head>','Fora da tag <html>'],
        correct:2, explanation:'Links para CSS ficam no <head>, antes do conteúdo, para o navegador carregar os estilos antes de renderizar a página.' },
      { q:'Qual tag define o título que aparece na aba do navegador?',
        opts:['<h1>','<header>','<title>','<name>'],
        correct:2, explanation:'A tag <title> dentro do <head> define o texto que aparece na aba do navegador e nos resultados de busca do Google.' },
    ],
    challenge: {
      title:'Estrutura perfeita',
      desc:'Monte uma estrutura HTML válida e completa do zero.',
      tasks:[
        'Declare o DOCTYPE corretamente na primeira linha',
        'Adicione lang="pt-BR" na tag <html>',
        'No <head>: charset UTF-8, viewport e um <title> descritivo',
        'No <body>: pelo menos um <h1> e um <p>',
        'Valide: abra no navegador e veja se aparece sem erros',
      ],
    },
  },

  /* ──────────────────────────────────────────────────────────
     CAP 03 — Tags de texto e hierarquia
  ────────────────────────────────────────────────────────── */
  'html-03': {
    moduleId: 'html',
    title: 'Tags de texto e hierarquia',
    desc: 'HTML tem tags específicas para cada tipo de texto. Usá-las corretamente não é só visual — afeta SEO, acessibilidade e semântica.',
    blocks: [
      { type:'text', title:'Headings — a hierarquia de títulos',
        body:'O HTML tem 6 níveis de títulos: <code>&lt;h1&gt;</code> até <code>&lt;h6&gt;</code>. O <code>&lt;h1&gt;</code> é o título principal da página — deve haver apenas um por página. O <code>&lt;h2&gt;</code> são seções, <code>&lt;h3&gt;</code> são subseções, e assim por diante. O Google usa essa hierarquia para entender o conteúdo da página — misturar a ordem prejudica seu SEO.' },
      { type:'text', title:'Parágrafos e quebras de linha',
        body:'A tag <code>&lt;p&gt;</code> cria um parágrafo — o navegador adiciona espaçamento automático antes e depois. Nunca use <code>&lt;br&gt;</code> para criar espaço entre parágrafos: use <code>&lt;p&gt;</code>. A tag <code>&lt;br&gt;</code> é apenas para quebras de linha dentro de um mesmo bloco de texto — como em endereços ou poemas.' },
      { type:'text', title:'Ênfase e importância',
        body:'<code>&lt;strong&gt;</code> indica <strong>importância</strong> — o conteúdo é semanticamente relevante (leitores de tela leem com ênfase). <code>&lt;em&gt;</code> indica <em>ênfase</em> — como uma entonação diferente na fala. Evite usar <code>&lt;b&gt;</code> e <code>&lt;i&gt;</code> para conteúdo com significado — use apenas para estilo visual sem semântica.' },
      { type:'callout',
        body:'<strong>SEO:</strong> Mecanismos de busca como o Google leem seu HTML e usam os headings para entender a estrutura do conteúdo. Um <code>&lt;h1&gt;</code> bem escrito com a palavra-chave principal é um dos fatores mais importantes de ranqueamento.' },
    ],
    editor: {
      tabs: ['HTML'],
      code: [`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Hierarquia de texto</title>
</head>
<body>

  <h1>Curso de Desenvolvimento Web</h1>

  <h2>Módulo 1 — HTML</h2>
  <p>HTML é a <strong>base de toda página web</strong>.
     Aprendê-lo bem é <em>fundamental</em> para qualquer dev.</p>

  <h3>Por que aprender HTML primeiro?</h3>
  <p>Porque sem estrutura, CSS e JavaScript não têm onde agir.</p>

  <h2>Módulo 2 — CSS</h2>
  <p>CSS é responsável pela <strong>aparência visual</strong> da página.</p>

  <!-- Veja como a hierarquia h1 > h2 > h3 organiza o conteúdo -->

</body>
</html>`],
    },
    quiz: [
      { q:'Quantos <h1> uma página deve ter idealmente?',
        opts:['Sem limite, quanto mais melhor','Apenas um','Dois — um no header, um no body','Nenhum, <h1> está obsoleto'],
        correct:1, explanation:'Uma página deve ter apenas um <h1>, que representa o tema principal. Múltiplos <h1> confundem mecanismos de busca e tecnologias assistivas.' },
      { q:'Qual a diferença entre <strong> e <b>?',
        opts:['São idênticos, só mudam o nome','<strong> tem significado semântico (importância), <b> é apenas visual','<b> é mais moderno que <strong>','<strong> é para CSS, <b> é para HTML puro'],
        correct:1, explanation:'<strong> indica que o conteúdo é semanticamente importante — leitores de tela enfatizam ao ler. <b> é puramente visual, sem significado semântico.' },
      { q:'Quando usar <br> vs <p>?',
        opts:['<br> para espaçamento entre parágrafos, <p> dentro de parágrafos','São intercambiáveis','<p> para parágrafos com espaçamento próprio, <br> para quebra de linha dentro de um bloco','<br> é a forma moderna de criar parágrafos'],
        correct:2, explanation:'<p> cria um bloco de parágrafo com espaçamento automático. <br> é uma quebra de linha simples, usada dentro de blocos como poemas ou endereços.' },
    ],
    challenge: {
      title:'Artigo bem estruturado',
      desc:'Crie a estrutura de um artigo sobre um tema de tecnologia usando headings corretos.',
      tasks:[
        'Use um <h1> com o título do artigo',
        'Crie pelo menos 2 seções com <h2>',
        'Adicione pelo menos uma subseção com <h3>',
        'Use <strong> para destacar termos importantes',
        'Use <em> para pelo menos um trecho com ênfase',
      ],
    },
  },

  /* ──────────────────────────────────────────────────────────
     CAP 04 — Links e imagens
  ────────────────────────────────────────────────────────── */
  'html-04': {
    moduleId: 'html',
    title: 'Links e imagens',
    desc: 'Links conectam a web — são a essência do HyperText. Imagens trazem vida às páginas. Aprender a usá-los corretamente vai além da sintaxe.',
    blocks: [
      { type:'text', title:'A tag <a> — âncora e navegação',
        body:'A tag <code>&lt;a&gt;</code> cria hiperlinks. O atributo <code>href</code> define o destino. Pode ser uma URL completa (<code>href="https://..."</code>), um caminho relativo para outra página do seu site (<code>href="contato.html"</code>), ou um ID na mesma página (<code>href="#secao"</code>). O atributo <code>target="_blank"</code> abre em nova aba — sempre adicione <code>rel="noopener noreferrer"</code> junto por segurança.' },
      { type:'text', title:'A tag <img> — imagens',
        body:'A tag <code>&lt;img&gt;</code> é <em>self-closing</em> — não precisa de tag de fechamento. Os atributos essenciais são <code>src</code> (caminho da imagem) e <code>alt</code> (texto alternativo). O <code>alt</code> não é opcional para profissionais: ele é lido por leitores de tela para pessoas com deficiência visual, é exibido quando a imagem não carrega, e é indexado pelo Google Imagens.' },
      { type:'callout',
        body:'<strong>Acessibilidade:</strong> Um <code>alt</code> bom descreve o conteúdo e a função da imagem. <code>alt="foto"</code> é inútil. <code>alt="Diagrama mostrando o ciclo de vida do JavaScript no navegador"</code> é ótimo. Para imagens decorativas (que não adicionam informação), use <code>alt=""</code> — assim o leitor de tela as ignora.' },
      { type:'text', title:'Caminhos relativos vs absolutos',
        body:'Um caminho absoluto inclui o protocolo e domínio completo: <code>https://site.com/img/foto.jpg</code>. Um caminho relativo é em relação ao arquivo atual: <code>./img/foto.jpg</code> (mesma pasta) ou <code>../img/foto.jpg</code> (pasta acima). Para sites, use caminhos relativos nos arquivos internos — facilita mover o projeto entre ambientes.' },
    ],
    editor: {
      tabs: ['HTML'],
      code: [`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Links e Imagens</title>
</head>
<body>

  <h1>Links e Imagens</h1>

  <!-- Link externo — abre em nova aba com segurança -->
  <a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer">
    MDN Web Docs — melhor referência HTML
  </a>

  <!-- Link interno — outra página do mesmo site -->
  <a href="contato.html">Fale conosco</a>

  <!-- Âncora — vai para um ID na mesma página -->
  <a href="#rodape">Ir para o rodapé</a>

  <!-- Imagem com alt descritivo -->
  <img
    src="https://via.placeholder.com/400x200"
    alt="Imagem de exemplo com dimensões 400x200 pixels"
    width="400"
    height="200"
  >

  <div id="rodape">
    <p>Rodapé da página</p>
  </div>

</body>
</html>`],
    },
    quiz: [
      { q:'Qual atributo da tag <a> define o destino do link?',
        opts:['src','link','href','url'],
        correct:2, explanation:'O atributo href (Hypertext Reference) define para onde o link aponta — pode ser uma URL, caminho relativo ou âncora.' },
      { q:'Por que o atributo alt nas imagens é importante?',
        opts:['É obrigatório para o CSS funcionar','Apenas para SEO do Google Imagens','Para acessibilidade, SEO e exibição quando a imagem não carrega','Só para imagens grandes'],
        correct:2, explanation:'O alt serve para três fins: acessibilidade (leitores de tela), SEO (Google indexa o texto) e fallback (exibido quando a imagem não carrega).' },
      { q:'Ao abrir um link com target="_blank", qual atributo adicionar por segurança?',
        opts:['secure="true"','rel="noopener noreferrer"','type="external"','safe="blank"'],
        correct:1, explanation:'rel="noopener noreferrer" impede que a página aberta acesse o objeto window da página original — evita um ataque chamado "reverse tabnapping".' },
    ],
    challenge: {
      title:'Página de portfólio simples',
      desc:'Crie uma página com sua apresentação, incluindo links e imagens.',
      tasks:[
        'Crie um link para seu GitHub ou LinkedIn (abrindo em nova aba com segurança)',
        'Adicione uma imagem (pode ser placeholder) com alt descritivo',
        'Crie um link âncora para uma seção da mesma página',
        'Use um caminho relativo para simular um link interno (contato.html)',
        'Teste: clique nos links e veja se funcionam corretamente',
      ],
    },
  },

  /* ──────────────────────────────────────────────────────────
     CAP 05 — Listas
  ────────────────────────────────────────────────────────── */
  'html-05': {
    moduleId: 'html',
    title: 'Listas — ul, ol e dl',
    desc: 'Listas são um dos elementos mais usados na web — menus de navegação, steps de tutorial, FAQs e muito mais são feitos com listas HTML.',
    blocks: [
      { type:'text', title:'ul — lista não ordenada',
        body:'<code>&lt;ul&gt;</code> (unordered list) cria uma lista com marcadores. Use quando a <em>ordem não importa</em>: ingredientes de uma receita, features de um produto, lista de habilidades. Cada item fica dentro de <code>&lt;li&gt;</code>. O marcador padrão é um círculo sólido — você pode mudar com CSS.' },
      { type:'text', title:'ol — lista ordenada',
        body:'<code>&lt;ol&gt;</code> (ordered list) cria uma lista numerada. Use quando a <em>ordem importa</em>: passos de instalação, ranking, instruções sequenciais. O atributo <code>start</code> define o número inicial (<code>start="3"</code> começa no 3). O atributo <code>type</code> muda o estilo: <code>type="A"</code> usa letras, <code>type="I"</code> usa algarismos romanos.' },
      { type:'text', title:'dl — lista de definições',
        body:'<code>&lt;dl&gt;</code> (description list) é menos conhecida mas muito útil. Serve para pares termo-definição: glossários, FAQs, metadados. Usa <code>&lt;dt&gt;</code> para o termo (description term) e <code>&lt;dd&gt;</code> para a definição (description detail). Um <code>&lt;dt&gt;</code> pode ter vários <code>&lt;dd&gt;</code>.' },
      { type:'callout',
        body:'<strong>Na prática:</strong> Menus de navegação são feitos com <code>&lt;ul&gt;</code> + CSS. A maioria dos menus que você vê na web é uma lista não ordenada estilizada. O CSS remove os marcadores e muda a direção — mas a estrutura semântica continua sendo uma lista.' },
    ],
    editor: {
      tabs: ['HTML'],
      code: [`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Listas HTML</title>
</head>
<body>

  <!-- Lista não ordenada — ordem não importa -->
  <h2>Habilidades</h2>
  <ul>
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>
    <li>Git</li>
  </ul>

  <!-- Lista ordenada — passo a passo -->
  <h2>Como criar um site</h2>
  <ol>
    <li>Planejar a estrutura</li>
    <li>Escrever o HTML</li>
    <li>Estilizar com CSS</li>
    <li>Adicionar interação com JS</li>
    <li>Publicar online</li>
  </ol>

  <!-- Lista de definições — glossário -->
  <h2>Glossário</h2>
  <dl>
    <dt>HTML</dt>
    <dd>Linguagem de marcação para estruturar páginas web</dd>

    <dt>CSS</dt>
    <dd>Linguagem para estilizar elementos HTML</dd>
  </dl>

</body>
</html>`],
    },
    quiz: [
      { q:'Quando usar <ol> em vez de <ul>?',
        opts:['Quando quiser bolinhas no lugar de números','Quando a ordem dos itens é importante','Quando houver mais de 5 itens','Quando os itens forem longos'],
        correct:1, explanation:'<ol> (ordered list) é para quando a ordem importa — tutoriais, rankings, instruções. <ul> é para quando os itens são equivalentes entre si.' },
      { q:'Qual tag contém cada item de uma lista ul ou ol?',
        opts:['<item>','<list-item>','<li>','<dt>'],
        correct:2, explanation:'<li> (list item) é a tag para cada item, tanto em <ul> quanto em <ol>.' },
      { q:'Para criar um glossário ou FAQ, qual tipo de lista é mais semântico?',
        opts:['<ul>','<ol>','<dl>','<table>'],
        correct:2, explanation:'<dl> (description list) é feita exatamente para pares termo-definição, como glossários, FAQs e metadados de artigos.' },
    ],
    challenge: {
      title:'Menu de navegação e conteúdo listado',
      desc:'Use os três tipos de lista para estruturar uma página.',
      tasks:[
        'Crie um menu de navegação usando <ul> com pelo menos 4 itens',
        'Crie um tutorial com <ol> mostrando os passos para aprender programação',
        'Crie um mini-glossário com <dl> definindo 3 termos técnicos',
        'Aninhe uma <ul> dentro de um <li> para criar um submenu',
      ],
    },
  },

  /* ──────────────────────────────────────────────────────────
     CAP 06 — Tabelas
  ────────────────────────────────────────────────────────── */
  'html-06': {
    moduleId: 'html',
    title: 'Tabelas HTML',
    desc: 'Tabelas existem para dados tabulares — comparações, horários, relatórios. Aprender a estruturá-las corretamente evita problemas de acessibilidade e manutenção.',
    blocks: [
      { type:'text', title:'Quando usar tabelas',
        body:'Tabelas são para <strong>dados tabulares</strong>: quando você tem linhas e colunas que se relacionam. Horário de aulas, comparativo de preços de planos, resultado de partidas. O erro clássico de devs iniciantes é usar tabelas para criar layouts de página — isso era feito nos anos 90 e hoje é considerado má prática. Para layout, use CSS Grid e Flexbox.' },
      { type:'text', title:'Estrutura básica da tabela',
        body:'Uma tabela HTML tem: <code>&lt;table&gt;</code> como container, <code>&lt;thead&gt;</code> para o cabeçalho, <code>&lt;tbody&gt;</code> para o corpo, <code>&lt;tfoot&gt;</code> para o rodapé (opcional). Dentro desses, <code>&lt;tr&gt;</code> cria linhas (table row), <code>&lt;th&gt;</code> cria células de cabeçalho (table header) e <code>&lt;td&gt;</code> cria células de dados (table data).' },
      { type:'text', title:'colspan e rowspan — mesclando células',
        body:'Assim como no Excel, você pode mesclar células em HTML. <code>colspan="2"</code> faz a célula ocupar 2 colunas. <code>rowspan="3"</code> faz ocupar 3 linhas. Cuidado: ao mesclar, você deve remover as células que seriam "cobertas" pela mesclagem — caso contrário, a tabela fica desalinhada.' },
      { type:'callout',
        body:'<strong>Acessibilidade em tabelas:</strong> Use <code>&lt;th scope="col"&gt;</code> para cabeçalhos de coluna e <code>&lt;th scope="row"&gt;</code> para cabeçalhos de linha. Adicione um <code>&lt;caption&gt;</code> descrevendo o conteúdo. Isso é essencial para leitores de tela navegarem corretamente em tabelas complexas.' },
    ],
    editor: {
      tabs: ['HTML'],
      code: [`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Tabelas</title>
  <style>
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #333; padding: 8px 12px; text-align: left; }
    thead { background: #1e242d; color: #00e5a0; }
    tr:nth-child(even) { background: #13181f; }
  </style>
</head>
<body>

  <table>
    <caption>Comparativo de linguagens front-end</caption>

    <thead>
      <tr>
        <th scope="col">Linguagem</th>
        <th scope="col">Tipo</th>
        <th scope="col">Uso Principal</th>
        <th scope="col">Dificuldade</th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <td>HTML</td>
        <td>Marcação</td>
        <td>Estrutura da página</td>
        <td>⭐</td>
      </tr>
      <tr>
        <td>CSS</td>
        <td>Estilo</td>
        <td>Aparência visual</td>
        <td>⭐⭐</td>
      </tr>
      <tr>
        <td>JavaScript</td>
        <td>Programação</td>
        <td>Interatividade</td>
        <td>⭐⭐⭐</td>
      </tr>
    </tbody>
  </table>

</body>
</html>`],
    },
    quiz: [
      { q:'Qual a diferença entre <th> e <td>?',
        opts:['<th> é para tabelas grandes, <td> para pequenas','<th> é célula de cabeçalho (semântica de título), <td> é célula de dado','São iguais, só diferem visualmente','<td> vem antes de <th> na estrutura'],
        correct:1, explanation:'<th> é semanticamente um cabeçalho — leitores de tela o anunciam ao navegar pelas células. <td> é uma célula de dado comum.' },
      { q:'Qual atributo faz uma célula ocupar 2 colunas?',
        opts:['width="2"','span="2"','colspan="2"','merge="2"'],
        correct:2, explanation:'colspan (column span) define quantas colunas a célula deve ocupar. rowspan faz o mesmo para linhas.' },
      { q:'Por que não se deve usar tabelas para layout de páginas?',
        opts:['Tabelas são lentas para renderizar','É apenas uma questão de estilo pessoal','Dificulta acessibilidade, manutenção e responsividade — para layout use CSS Grid/Flexbox','Tabelas não funcionam em navegadores modernos'],
        correct:2, explanation:'Tabelas para layout criam HTML difícil de manter, inacessível para leitores de tela e não responsivo. CSS Grid e Flexbox foram criados exatamente para layout.' },
    ],
    challenge: {
      title:'Tabela de horário semanal',
      desc:'Crie uma tabela de horário de aulas usando todos os recursos aprendidos.',
      tasks:[
        'Use <thead>, <tbody> e <caption> corretamente',
        'Adicione scope="col" nos cabeçalhos das colunas (dias da semana)',
        'Use colspan para mesclar um horário de almoço que ocupa 2 colunas',
        'Estilize com um <style> básico: bordas e cor de fundo no thead',
      ],
    },
  },

  /* ──────────────────────────────────────────────────────────
     CAP 07 — Formulários
  ────────────────────────────────────────────────────────── */
  'html-07': {
    moduleId: 'html',
    title: 'Formulários HTML',
    desc: 'Formulários são o principal meio de interação do usuário com o servidor. Login, cadastro, busca, checkout — tudo passa por um form.',
    blocks: [
      { type:'text', title:'A tag <form> e seus atributos',
        body:'A tag <code>&lt;form&gt;</code> agrupa os campos e define como os dados serão enviados. O atributo <code>action</code> define para onde os dados vão (URL do servidor). O atributo <code>method</code> define como: <code>GET</code> envia dados na URL (bom para buscas) ou <code>POST</code> envia no corpo da requisição (bom para dados sensíveis como senhas).' },
      { type:'text', title:'Tipos de input — o campo camaleão',
        body:'A tag <code>&lt;input&gt;</code> muda completamente de comportamento com o atributo <code>type</code>. <code>type="text"</code> é um campo de texto simples. <code>type="email"</code> valida formato de e-mail automaticamente. <code>type="password"</code> esconde os caracteres. <code>type="number"</code> aceita apenas números. <code>type="date"</code> abre um seletor de data. <code>type="checkbox"</code> e <code>type="radio"</code> são caixas de seleção.' },
      { type:'text', title:'<label> — acessibilidade obrigatória',
        body:'Todo input deve ter um <code>&lt;label&gt;</code> associado. Isso é crucial para acessibilidade: leitores de tela anunciam o label ao focar no campo. Para associar, use o atributo <code>for</code> no label com o mesmo valor do <code>id</code> do input. Benefício bônus: clicar no label foca o input correspondente — melhor UX.' },
      { type:'callout',
        body:'<strong>Validação nativa:</strong> O HTML tem validação embutida. <code>required</code> impede envio de campos vazios. <code>minlength</code> e <code>maxlength</code> controlam o tamanho do texto. <code>pattern</code> aceita regex. <code>min</code> e <code>max</code> limitam valores numéricos. Use validação nativa antes de adicionar JavaScript.' },
    ],
    editor: {
      tabs: ['HTML'],
      code: [`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Formulário de Cadastro</title>
  <style>
    body { font-family: sans-serif; max-width: 400px; margin: 2rem auto; }
    .campo { display: flex; flex-direction: column; gap: 4px; margin-bottom: 1rem; }
    label { font-size: 0.85rem; font-weight: 600; color: #888; }
    input, select, textarea {
      padding: 8px 12px; border: 1px solid #333;
      border-radius: 8px; background: #13181f;
      color: #e8edf2; font-size: 0.95rem;
    }
    button {
      width: 100%; padding: 10px; background: #00e5a0;
      color: #000; border: none; border-radius: 8px;
      font-weight: 700; cursor: pointer;
    }
  </style>
</head>
<body>

  <h1>Criar conta</h1>

  <form action="/cadastro" method="POST">

    <div class="campo">
      <label for="nome">Nome completo</label>
      <input type="text" id="nome" name="nome"
             placeholder="Seu nome" required minlength="3">
    </div>

    <div class="campo">
      <label for="email">E-mail</label>
      <input type="email" id="email" name="email"
             placeholder="seu@email.com" required>
    </div>

    <div class="campo">
      <label for="senha">Senha</label>
      <input type="password" id="senha" name="senha"
             placeholder="Mínimo 8 caracteres" required minlength="8">
    </div>

    <div class="campo">
      <label for="curso">Curso</label>
      <select id="curso" name="curso" required>
        <option value="">Selecione...</option>
        <option value="ads">ADS</option>
        <option value="cc">Ciência da Computação</option>
      </select>
    </div>

    <button type="submit">Criar conta →</button>

  </form>

</body>
</html>`],
    },
    quiz: [
      { q:'Qual a diferença entre method GET e POST num formulário?',
        opts:['GET é mais rápido, POST é mais lento','GET envia dados na URL, POST envia no corpo da requisição','POST é para formulários grandes, GET para pequenos','Não há diferença prática'],
        correct:1, explanation:'GET coloca os dados na URL (?campo=valor) — bom para buscas. POST envia no corpo da requisição — obrigatório para senhas e dados sensíveis.' },
      { q:'Para que serve o atributo "for" no <label>?',
        opts:['Define o estilo do label','Associa o label ao input pelo id, melhorando acessibilidade','Define quantos campos o label cobre','Nada, é obsoleto'],
        correct:1, explanation:'O atributo for no label deve ter o mesmo valor do id do input. Isso associa os dois: leitores de tela anunciam o label e clicar no label foca o input.' },
      { q:'Qual type de input valida automaticamente o formato de e-mail?',
        opts:['type="text" com pattern','type="email"','type="mail"','type="validate"'],
        correct:1, explanation:'type="email" valida automaticamente o formato do e-mail no envio do formulário, sem precisar de JavaScript.' },
    ],
    challenge: {
      title:'Formulário de contato completo',
      desc:'Construa um formulário de contato funcional com validação nativa.',
      tasks:[
        'Crie um form com action e method POST',
        'Adicione campos: nome (text, required), email (email, required), assunto (text), mensagem (textarea)',
        'Associe cada input ao seu label com for/id',
        'Adicione um select com pelo menos 3 opções de categoria',
        'Use required, minlength e placeholder nos campos adequados',
      ],
    },
  },

  /* ──────────────────────────────────────────────────────────
     CAP 08 — Divs, spans e o modelo de caixa
  ────────────────────────────────────────────────────────── */
  'html-08': {
    moduleId: 'html',
    title: 'Divs, spans e como o HTML organiza blocos',
    desc: 'div e span são os elementos mais usados no HTML moderno. Entender a diferença entre elementos block e inline é fundamental para dominar CSS.',
    blocks: [
      { type:'text', title:'Block vs Inline — a diferença fundamental',
        body:'Todo elemento HTML é ou <strong>block</strong> ou <strong>inline</strong>. Elementos <em>block</em> ocupam toda a largura disponível e empurram o próximo elemento para baixo: <code>div, p, h1-h6, ul, ol, table, form</code>. Elementos <em>inline</em> ocupam apenas o espaço do seu conteúdo e ficam na mesma linha: <code>span, a, strong, em, img, input</code>.' },
      { type:'text', title:'<div> — o container genérico block',
        body:'A <code>&lt;div&gt;</code> (division) é um container genérico block. Ela não tem significado semântico — existe apenas para agrupar elementos e permitir estilização via CSS. Quando nenhuma tag semântica (<code>section, article, header</code>) se encaixa, use <code>&lt;div&gt;</code>. Evite o excesso de divs aninhadas ("div soup") — dificulta a leitura e manutenção.' },
      { type:'text', title:'<span> — o container genérico inline',
        body:'O <code>&lt;span&gt;</code> é o equivalente inline da <code>&lt;div&gt;</code>. Use para estilizar parte de um texto: colorir uma palavra, destacar um valor, adicionar um ícone inline. Ele não quebra o fluxo do texto — o conteúdo antes e depois continua na mesma linha.' },
      { type:'callout',
        body:'<strong>Regra prática:</strong> Precisa agrupar um bloco inteiro (seção, card, coluna)? Use <code>&lt;div&gt;</code>. Precisa estilizar parte de um texto em linha? Use <code>&lt;span&gt;</code>. Mas antes de usar qualquer um, pergunte: existe uma tag semântica que se encaixa melhor aqui? (<code>section, article, aside, header, footer, nav, main</code>)' },
    ],
    editor: {
      tabs: ['HTML'],
      code: [`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Block vs Inline</title>
  <style>
    .card { background: #13181f; border: 1px solid #1e242d;
            border-radius: 12px; padding: 1rem; margin: 1rem 0; }
    .preco { color: #00e5a0; font-weight: 700; font-size: 1.2rem; }
    .desconto { background: #ff6b35; color: white;
                padding: 2px 6px; border-radius: 4px;
                font-size: 0.75rem; }
  </style>
</head>
<body>

  <!-- div — container BLOCK (ocupa linha inteira) -->
  <div class="card">
    <h2>Curso de HTML</h2>
    <!-- span — inline (fica no mesmo fluxo do texto) -->
    <p>
      Preço: <span class="preco">Grátis</span>
      <span class="desconto">100% OFF</span>
    </p>
    <p>Aprenda a estrutura de toda página web.</p>
  </div>

  <div class="card">
    <h2>Curso de CSS</h2>
    <p>
      Preço: <span class="preco">Grátis</span>
    </p>
    <p>Domine estilização e layout.</p>
  </div>

</body>
</html>`],
    },
    quiz: [
      { q:'Qual a diferença entre div e span?',
        opts:['div é para texto, span é para imagens','div é block (ocupa linha inteira), span é inline (fica no fluxo do texto)','São iguais, só o nome muda','span é mais moderno que div'],
        correct:1, explanation:'div é um elemento block — quebra o fluxo e ocupa toda a largura. span é inline — fica dentro do fluxo de texto, ocupando só o espaço do conteúdo.' },
      { q:'Quais destes são elementos inline?',
        opts:['div, p, h1','a, span, strong','ul, ol, table','form, section, article'],
        correct:1, explanation:'a, span, strong, em, img e input são elementos inline — ficam na mesma linha que o conteúdo ao redor.' },
      { q:'O que significa "div soup"?',
        opts:['Div com conteúdo de texto longo','Excesso de divs aninhadas sem semântica, tornando o HTML difícil de ler','Uma técnica avançada de layout','Divs com múltiplas classes CSS'],
        correct:1, explanation:'Div soup é quando o HTML tem muitas divs genéricas aninhadas. O problema é falta de legibilidade e semântica — tags como section, article e nav comunicam melhor a intenção.' },
    ],
    challenge: {
      title:'Layout de card de produto',
      desc:'Use divs e spans para criar um card de produto estilizado.',
      tasks:[
        'Crie um container .card com div',
        'Dentro do card: imagem, título, preço com span colorido',
        'Adicione uma tag de "novidade" ou "desconto" usando span',
        'Crie 3 cards lado a lado usando display:flex no container pai',
      ],
    },
  },

  /* ──────────────────────────────────────────────────────────
     CAP 09 — HTML Semântico
  ────────────────────────────────────────────────────────── */
  'html-09': {
    moduleId: 'html',
    title: 'HTML Semântico',
    desc: 'HTML5 trouxe tags que comunicam significado, não apenas estrutura visual. Usar semântica correta melhora SEO, acessibilidade e manutenibilidade.',
    blocks: [
      { type:'text', title:'O problema do HTML sem semântica',
        body:'Antes do HTML5, tudo era <code>&lt;div&gt;</code>: <code>&lt;div id="header"&gt;</code>, <code>&lt;div id="nav"&gt;</code>, <code>&lt;div id="content"&gt;</code>. O problema: para um humano, "div#header" pode ser o cabeçalho. Mas para um leitor de tela ou para o Google, é só mais um div. O HTML semântico resolve isso com tags que têm significado intrínseco.' },
      { type:'text', title:'As principais tags semânticas',
        body:'<code>&lt;header&gt;</code>: cabeçalho de uma página ou seção. <code>&lt;nav&gt;</code>: bloco de navegação principal. <code>&lt;main&gt;</code>: conteúdo principal da página (apenas 1 por página). <code>&lt;article&gt;</code>: conteúdo independente e reutilizável (post de blog, card de notícia). <code>&lt;section&gt;</code>: seção temática de conteúdo. <code>&lt;aside&gt;</code>: conteúdo relacionado mas não essencial (sidebar, anúncio). <code>&lt;footer&gt;</code>: rodapé.' },
      { type:'text', title:'article vs section — a diferença',
        body:'<code>&lt;article&gt;</code> é para conteúdo que faz sentido sozinho, fora de contexto — você poderia copiar e colar num feed de notícias e ainda faria sentido. <code>&lt;section&gt;</code> é para agrupar conteúdo relacionado que faz parte de um todo maior. Regra: se o conteúdo pode ser sindicado (RSS, feed), é <code>&lt;article&gt;</code>. Se é apenas uma parte de uma página, é <code>&lt;section&gt;</code>.' },
      { type:'callout',
        body:'<strong>Impacto real:</strong> Sites com HTML semântico correto ranqueiam melhor no Google porque o algoritmo entende melhor o conteúdo. Leitores de tela navegam por landmarks semânticos (<code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;footer&gt;</code>) — sem eles, pessoas com deficiência visual precisam ler a página inteira para achar o que querem.' },
    ],
    editor: {
      tabs: ['HTML'],
      code: [`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>DevBlog — HTML Semântico</title>
</head>
<body>

  <!-- Cabeçalho do site -->
  <header>
    <a href="/">DevBlog</a>
    <nav>
      <ul>
        <li><a href="/artigos">Artigos</a></li>
        <li><a href="/sobre">Sobre</a></li>
        <li><a href="/contato">Contato</a></li>
      </ul>
    </nav>
  </header>

  <!-- Conteúdo principal — único na página -->
  <main>

    <!-- Artigo independente — poderia estar num feed RSS -->
    <article>
      <header>
        <h1>Por que aprender HTML Semântico?</h1>
        <time datetime="2024-01-15">15 de janeiro de 2024</time>
      </header>

      <section>
        <h2>Benefícios para SEO</h2>
        <p>O Google usa a estrutura semântica para entender o conteúdo...</p>
      </section>

      <section>
        <h2>Benefícios para acessibilidade</h2>
        <p>Leitores de tela navegam por landmarks semânticos...</p>
      </section>
    </article>

  </main>

  <!-- Sidebar com conteúdo relacionado -->
  <aside>
    <h2>Artigos relacionados</h2>
    <ul>
      <li><a href="#">CSS Semântico</a></li>
      <li><a href="#">ARIA Labels</a></li>
    </ul>
  </aside>

  <!-- Rodapé do site -->
  <footer>
    <p>&copy; 2024 DevBlog. Todos os direitos reservados.</p>
  </footer>

</body>
</html>`],
    },
    quiz: [
      { q:'Quantas tags <main> uma página pode ter?',
        opts:['Sem limite','Duas — uma para desktop, uma para mobile','Apenas uma','Três no máximo'],
        correct:2, explanation:'A tag <main> representa o conteúdo principal da página — deve haver apenas uma. Múltiplas <main> são inválidas semanticamente.' },
      { q:'Qual a diferença entre <article> e <section>?',
        opts:['São sinônimos','<article> é conteúdo independente e reutilizável; <section> agrupa conteúdo relacionado de uma página','<section> é mais moderno','<article> só para notícias, <section> para qualquer coisa'],
        correct:1, explanation:'<article> = conteúdo que faz sentido sozinho (post, card). <section> = agrupamento temático dentro de uma página maior.' },
      { q:'Por que usar <nav> em vez de <div id="nav">?',
        opts:['Não há diferença','<nav> comunica semanticamente que é navegação — leitores de tela e buscadores entendem','<div> é mais lento para renderizar','<nav> tem estilos padrão melhores'],
        correct:1, explanation:'<nav> é um landmark semântico: leitores de tela oferecem atalho direto para ele. O Google entende que é navegação do site. <div id="nav"> é só texto para humanos.' },
    ],
    challenge: {
      title:'Reescreva com semântica',
      desc:'Converta um HTML cheio de divs genéricas para HTML semântico.',
      tasks:[
        'Substitua <div id="header"> por <header>',
        'Substitua <div id="menu"> por <nav>',
        'Substitua <div id="conteudo"> por <main>',
        'Coloque posts de blog dentro de <article>',
        'Substitua <div id="footer"> por <footer>',
      ],
    },
  },

  /* ──────────────────────────────────────────────────────────
     CAP 10 — Desafio Final HTML
  ────────────────────────────────────────────────────────── */
  'html-10': {
    moduleId: 'html',
    title: '🏆 Desafio Final — HTML',
    desc: 'Hora de aplicar tudo que você aprendeu. Cinco desafios progressivos para consolidar seu domínio do HTML.',
    blocks: [
      { type:'text', title:'O que você domina agora',
        body:'Ao longo deste módulo você aprendeu a estrutura completa do HTML: desde o DOCTYPE até tags semânticas avançadas. Você sabe criar texto hierárquico, links e imagens acessíveis, listas, tabelas, formulários e estruturar uma página com semântica moderna. Chegou a hora de reunir tudo.' },
      { type:'callout',
        body:'<strong>Dica para o desafio:</strong> Não tente fazer tudo de uma vez. Construa incrementalmente — primeiro a estrutura básica, depois adicione seções, depois os detalhes. Assim como um dev real trabalha.' },
      { type:'text', title:'Critérios de qualidade',
        body:'Seu HTML será bom quando: (1) passar na validação do W3C sem erros, (2) cada tag for a mais semântica possível para o contexto, (3) todas as imagens tiverem alt descritivo, (4) todos os inputs tiverem labels associados, (5) a hierarquia de headings fizer sentido (h1 → h2 → h3).' },
      { type:'text', title:'Próximo passo após este módulo',
        body:'Com HTML sólido, você está pronto para o Módulo 02 — CSS. Lá você vai aprender a transformar estruturas HTML simples em interfaces visuais profissionais. Cada propriedade CSS que você vai aprender faz mais sentido quando você entende profundamente a estrutura HTML que ela estiliza.' },
    ],
    editor: {
      tabs: ['HTML'],
      code: [`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfólio — Seu Nome</title>
</head>
<body>

  <!-- DESAFIO: Complete este portfólio usando tudo que aprendeu -->

  <!-- 1. Header com nav semântico -->
  <header>
    <nav>
      <!-- Adicione links para as seções: Sobre, Projetos, Contato -->
    </nav>
  </header>

  <main>

    <!-- 2. Seção "Sobre mim" com h1 e parágrafo -->
    <section id="sobre">
      <!-- seu conteúdo aqui -->
    </section>

    <!-- 3. Seção "Habilidades" com lista ul -->
    <section id="habilidades">
      <!-- use ul com li para cada habilidade -->
    </section>

    <!-- 4. Seção "Projetos" com articles -->
    <section id="projetos">
      <!-- pelo menos 2 articles, cada um com imagem, título e descrição -->
    </section>

    <!-- 5. Formulário de contato com todos os campos necessários -->
    <section id="contato">
      <form action="/contato" method="POST">
        <!-- nome, email, mensagem, botão -->
      </form>
    </section>

  </main>

  <footer>
    <!-- copyright e links de redes sociais -->
  </footer>

</body>
</html>`],
    },
    quiz: [
      { q:'Qual conjunto de tags representa a estrutura semântica ideal de uma página?',
        opts:['div > div > div > div','header + main + footer com section/article dentro do main','body > content > wrapper > inner','page > header > body > end'],
        correct:1, explanation:'header (cabeçalho), main (conteúdo principal) e footer (rodapé) são a estrutura semântica base de uma página HTML5 moderna.' },
      { q:'Um formulário de login precisa de qual estrutura mínima?',
        opts:['Dois inputs e um button','form > label+input (email) + label+input (password) + button[type=submit]','input email + input senha','div > campos'],
        correct:1, explanation:'Todo formulário precisa da tag form, cada campo precisa de um label associado, e o botão de envio deve ser type="submit".' },
      { q:'O que torna um HTML acessível?',
        opts:['Usar muitas divs para organização','Apenas ter bom CSS','Tags semânticas corretas, alt em imagens, labels em inputs e hierarquia de headings','Usar classes em todos os elementos'],
        correct:2, explanation:'Acessibilidade em HTML requer: semântica correta (para leitores de tela), alt descritivo (para deficiência visual), labels em inputs e hierarquia lógica de headings.' },
    ],
    challenge: {
      title:'Portfólio HTML completo',
      desc:'Construa uma página de portfólio pessoal usando todos os recursos do módulo.',
      tasks:[
        'Estrutura: DOCTYPE, html[lang], head completo, body com header/main/footer',
        'Navegação: nav com links âncora para as seções da página',
        'Sobre: seção com h1 (seu nome), foto com alt, parágrafo de apresentação',
        'Habilidades: lista ul com suas tecnologias; projetos: articles com imagem, título e descrição',
        'Contato: formulário completo com name, email, mensagem e validação nativa',
      ],
    },
  },

};
