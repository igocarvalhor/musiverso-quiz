const TOPICOS = [
  { id: "teoria-musical",      label: "Teoria Musical" },
  { id: "harmonia-funcional",  label: "Harmonia Funcional" },
  { id: "historia-da-musica",  label: "Historia da Musica" },
];

const perguntas = [
  // NIVEL FACIL — Teoria Musical
  { nivel: "facil", topico: "teoria-musical", pergunta: "O que e musica?", opcoes: ["Organizacao de sons e silencio no tempo", "Som aleatorio sem organizacao", "Apenas repeticao de ritmos", "Som sem duracao definida"], resposta: 0 },
  { nivel: "facil", topico: "teoria-musical", pergunta: "O que e ritmo?", opcoes: ["Altura dos sons musicais", "Organizacao dos sons no tempo", "Volume dos sons musicais", "Tipo de instrumento"], resposta: 1 },
  { nivel: "facil", topico: "teoria-musical", pergunta: "O que e melodia?", opcoes: ["Sequencia de notas organizadas no tempo", "Varios sons tocados ao mesmo tempo", "Som sem altura definida", "Organizacao dos tempos"], resposta: 0 },
  { nivel: "facil", topico: "teoria-musical", pergunta: "O que e harmonia?", opcoes: ["Sequencia de notas isoladas", "Combinacao de sons simultaneos", "Silencio entre sons", "Velocidade da musica"], resposta: 1 },
  { nivel: "facil", topico: "teoria-musical", pergunta: "O que e intensidade?", opcoes: ["Altura do som", "Duracao do som", "Forca do som", "Sequencia de notas"], resposta: 2 },
  { nivel: "facil", topico: "teoria-musical", pergunta: "O que e altura do som?", opcoes: ["Volume do som", "Grave ou agudo", "Tempo do som", "Duracao do som"], resposta: 1 },
  { nivel: "facil", topico: "teoria-musical", pergunta: "O que e timbre?", opcoes: ["Caracteristica que diferencia os sons", "Altura do som", "Duracao do som", "Velocidade da musica"], resposta: 0 },
  { nivel: "facil", topico: "teoria-musical", pergunta: "O que e duracao?", opcoes: ["Tempo que o som permanece", "Altura do som", "Forca do som", "Tipo de instrumento"], resposta: 0 },
  { nivel: "facil", topico: "teoria-musical", pergunta: "O que e pulsacao?", opcoes: ["Batida regular da musica", "Altura das notas", "Volume do som", "Tipo de acorde"], resposta: 0 },
  { nivel: "facil", topico: "teoria-musical", pergunta: "O que e andamento?", opcoes: ["Velocidade da musica", "Altura das notas", "Duracao do som", "Timbre do instrumento"], resposta: 0 },
  { nivel: "facil", topico: "teoria-musical", pergunta: "O que e pentagrama?", opcoes: ["Conjunto de quatro linhas", "Conjunto de cinco linhas", "Sequencia de notas", "Tipo de compasso"], resposta: 1 },
  { nivel: "facil", topico: "teoria-musical", pergunta: "Para que serve o pentagrama?", opcoes: ["Definir o ritmo da musica", "Registrar e organizar as notas musicais", "Aumentar o volume do som", "Definir a velocidade"], resposta: 1 },
  { nivel: "facil", topico: "teoria-musical", pergunta: "O que e clave?", opcoes: ["Figura que determina o silencio das notas no pentagrama", "Figura que determina a duracao das notas", "Figura que determina a altura e o nome das notas no pentagrama", "Figura que determina o ritmo da musica"], resposta: 2 },
  { nivel: "facil", topico: "teoria-musical", pergunta: "Para que serve a clave de Sol?", opcoes: ["Determinar notas graves", "Determinar notas agudas", "Determinar o ritmo", "Determinar o silencio"], resposta: 1 },
  { nivel: "facil", topico: "teoria-musical", pergunta: "Para que serve a clave de Fa?", opcoes: ["Determinar notas agudas", "Determinar notas graves", "Determinar o ritmo", "Determinar o andamento"], resposta: 1 },
  { nivel: "facil", topico: "teoria-musical", pergunta: "O que e nota musical?", opcoes: ["Representacao grafica do som", "Representacao do silencio", "Organizacao do tempo", "Tipo de instrumento"], resposta: 0 },
  { nivel: "facil", topico: "teoria-musical", pergunta: "O que e figura musical?", opcoes: ["Representacao da altura do som", "Representacao da duracao do som", "Representacao do timbre", "Representacao da intensidade"], resposta: 1 },
  { nivel: "facil", topico: "teoria-musical", pergunta: "O que e pausa?", opcoes: ["Representacao do silencio na musica", "Representacao da altura", "Representacao da duracao do som", "Representacao do ritmo"], resposta: 0 },
  { nivel: "facil", topico: "teoria-musical", pergunta: "Para que servem as figuras musicais?", opcoes: ["Indicar a altura das notas", "Indicar a duracao dos sons", "Indicar o timbre", "Indicar o instrumento"], resposta: 1 },
  { nivel: "facil", topico: "teoria-musical", pergunta: "O que e compasso?", opcoes: ["Organizacao dos tempos em grupos", "Altura das notas", "Tipo de som", "Timbre do instrumento"], resposta: 0 },

  // NIVEL MEDIO — Teoria Musical
  { nivel: "medio", topico: "teoria-musical", pergunta: "Quantos semitons existem em uma oitava?", opcoes: ["6", "8", "12", "14"], resposta: 2 },
  { nivel: "medio", topico: "teoria-musical", pergunta: "Quantos semitons tem um tom?", opcoes: ["1", "2", "3", "4"], resposta: 1 },
  { nivel: "medio", topico: "teoria-musical", pergunta: "Quantos semitons tem um semitom?", opcoes: ["1", "2", "3", "4"], resposta: 0 },
  { nivel: "medio", topico: "teoria-musical", pergunta: "Qual intervalo entre Do e Re?", opcoes: ["1 semitom", "1 tom", "2 tons", "3 tons"], resposta: 1 },
  { nivel: "medio", topico: "teoria-musical", pergunta: "Qual intervalo entre Mi e Fa?", opcoes: ["1 tom", "1 semitom", "2 tons", "3 tons"], resposta: 1 },
  { nivel: "medio", topico: "teoria-musical", pergunta: "Quantos graus tem a escala diatonica?", opcoes: ["5", "6", "7", "8"], resposta: 2 },
  { nivel: "medio", topico: "teoria-musical", pergunta: "Qual e a formula da escala maior?", opcoes: ["T T ST T T T ST", "T ST T T ST T T", "ST T T T ST T T", "T T T ST T ST T"], resposta: 0 },
  { nivel: "medio", topico: "teoria-musical", pergunta: "Quantos tempos tem o compasso 4/4?", opcoes: ["2", "3", "4", "5"], resposta: 2 },
  { nivel: "medio", topico: "teoria-musical", pergunta: "Quantos tempos tem o compasso 3/4?", opcoes: ["2", "3", "4", "5"], resposta: 1 },
  { nivel: "medio", topico: "teoria-musical", pergunta: "Qual figura vale 1 tempo no 4/4?", opcoes: ["Semibreve", "Minima", "Seminima", "Colcheia"], resposta: 2 },
  { nivel: "medio", topico: "teoria-musical", pergunta: "Quantas colcheias cabem em uma seminima?", opcoes: ["1", "2", "3", "4"], resposta: 1 },
  { nivel: "medio", topico: "teoria-musical", pergunta: "O sustenido (#) altera:", opcoes: ["1 tom", "1 semitom acima", "1 semitom abaixo", "2 tons"], resposta: 1 },
  { nivel: "medio", topico: "teoria-musical", pergunta: "O bemol (b) altera:", opcoes: ["1 tom", "1 semitom abaixo", "1 semitom acima", "2 tons"], resposta: 1 },
  { nivel: "medio", topico: "teoria-musical", pergunta: "Quantas linhas tem a pauta?", opcoes: ["4", "5", "6", "7"], resposta: 1 },
  { nivel: "medio", topico: "teoria-musical", pergunta: "Qual clave indica sons graves?", opcoes: ["Sol", "Fa", "Do", "Neutra"], resposta: 1 },
  { nivel: "medio", topico: "teoria-musical", pergunta: "Quantas seminimas cabem em uma semibreve?", opcoes: ["2", "3", "4", "5"], resposta: 2 },
  { nivel: "medio", topico: "teoria-musical", pergunta: "Qual intervalo entre Do e Mi?", opcoes: ["Segunda", "Terca", "Quarta", "Quinta"], resposta: 1 },
  { nivel: "medio", topico: "teoria-musical", pergunta: "Qual intervalo entre Do e Sol?", opcoes: ["Quarta", "Quinta", "Sexta", "Setima"], resposta: 1 },

  // NIVEL DIFICIL — Harmonia Funcional
  { nivel: "dificil", topico: "harmonia-funcional", pergunta: "Quantos tons tem a escala maior?", opcoes: ["5", "6", "7", "8"], resposta: 2 },
  { nivel: "dificil", topico: "harmonia-funcional", pergunta: "Quantos tons tem a escala menor natural?", opcoes: ["3", "4", "5", "6"], resposta: 1 },
  { nivel: "dificil", topico: "harmonia-funcional", pergunta: "Quantos semitons tem a escala menor natural?", opcoes: ["10", "11", "12", "7"], resposta: 2 },
  { nivel: "dificil", topico: "harmonia-funcional", pergunta: "Qual e a formula da escala menor natural?", opcoes: ["T ST T T ST T T", "T T ST T T T ST", "ST T T ST T T T", "T T T ST T ST T"], resposta: 0 },
  { nivel: "dificil", topico: "harmonia-funcional", pergunta: "Uma triade tem quantas notas?", opcoes: ["2", "3", "4", "5"], resposta: 1 },
  { nivel: "dificil", topico: "harmonia-funcional", pergunta: "Triade maior possui:", opcoes: ["Terca maior", "Terca menor", "Quarta", "Segunda"], resposta: 0 },
  { nivel: "dificil", topico: "harmonia-funcional", pergunta: "Triade menor possui:", opcoes: ["Terca maior", "Terca menor", "Quarta", "Segunda"], resposta: 1 },
  { nivel: "dificil", topico: "harmonia-funcional", pergunta: "O V grau tem funcao:", opcoes: ["Tonica", "Dominante", "Subdominante", "Relativa"], resposta: 1 },
  { nivel: "dificil", topico: "harmonia-funcional", pergunta: "O I grau tem funcao:", opcoes: ["Dominante", "Tonica", "Subdominante", "Sensivel"], resposta: 1 },
  { nivel: "dificil", topico: "harmonia-funcional", pergunta: "Cadencia V-I e:", opcoes: ["Imperfeita", "Perfeita", "Plagal", "Deceptiva"], resposta: 1 },
  { nivel: "dificil", topico: "harmonia-funcional", pergunta: "Quantos semitons tem uma quinta justa?", opcoes: ["5", "6", "7", "8"], resposta: 2 },
  { nivel: "dificil", topico: "harmonia-funcional", pergunta: "Quantos semitons tem uma terca maior?", opcoes: ["2", "3", "4", "5"], resposta: 2 },
  { nivel: "dificil", topico: "harmonia-funcional", pergunta: "O que e enarmonia?", opcoes: ["Mesmo som, nomes diferentes", "Notas diferentes", "Intervalos iguais", "Acordes iguais"], resposta: 0 },
  { nivel: "dificil", topico: "harmonia-funcional", pergunta: "O que e modulacao?", opcoes: ["Mudanca de ritmo", "Mudanca de tonalidade", "Mudanca de intensidade", "Mudanca de timbre"], resposta: 1 },

  // HARMONIA FUNCIONAL — FACIL
  { nivel: "facil", topico: "harmonia-funcional", pergunta: "O que e funcao harmonica?", opcoes: ["Funcao que define a intensidade da musica", "Funcao que define o papel do acorde na tonalidade", "Funcao que define a velocidade", "Funcao que define o timbre"], resposta: 1 },
  { nivel: "facil", topico: "harmonia-funcional", pergunta: "Qual acorde representa a funcao tonica?", opcoes: ["IV grau", "V grau", "I grau", "II grau"], resposta: 2 },
  { nivel: "facil", topico: "harmonia-funcional", pergunta: "Qual acorde representa a funcao dominante?", opcoes: ["I grau", "III grau", "V grau", "VI grau"], resposta: 2 },
  { nivel: "facil", topico: "harmonia-funcional", pergunta: "Qual acorde representa a funcao subdominante?", opcoes: ["IV grau", "I grau", "V grau", "VII grau"], resposta: 0 },
  { nivel: "facil", topico: "harmonia-funcional", pergunta: "Qual funcao harmonica gera maior tensao?", opcoes: ["Subdominante", "Dominante", "Tonica", "Relativa"], resposta: 1 },
  { nivel: "facil", topico: "harmonia-funcional", pergunta: "Na progressao C - F - G - C, qual acorde exerce funcao dominante?", opcoes: ["F", "Am", "G", "C"], resposta: 2 },
  { nivel: "facil", topico: "harmonia-funcional", pergunta: "Na tonalidade de Do maior, qual e o acorde de tonica?", opcoes: ["F", "G", "C", "Dm"], resposta: 2 },
  { nivel: "facil", topico: "harmonia-funcional", pergunta: "A progressao G - C representa:", opcoes: ["Subdominante para Dominante", "Dominante para Tonica", "Tonica para Dominante", "Tonica para Subdominante"], resposta: 1 },

  // HARMONIA FUNCIONAL — MEDIO
  { nivel: "medio", topico: "harmonia-funcional", pergunta: "Qual e a funcao do IV grau?", opcoes: ["Subdominante", "Tonica", "Dominante", "Sensivel"], resposta: 0 },
  { nivel: "medio", topico: "harmonia-funcional", pergunta: "Qual e a funcao do V grau?", opcoes: ["Dominante", "Subdominante", "Tonica", "Relativa"], resposta: 0 },
  { nivel: "medio", topico: "harmonia-funcional", pergunta: "Na progressao Dm - G - C, a sequencia funcional correta e:", opcoes: ["Tonica - Dominante - Tonica", "Subdominante - Dominante - Tonica", "Dominante - Tonica - Subdominante", "Tonica - Subdominante - Dominante"], resposta: 1 },
  { nivel: "medio", topico: "harmonia-funcional", pergunta: "Na progressao C - Am - Dm - G, o acorde Am exerce:", opcoes: ["Dominante", "Subdominante", "Tonica relativa", "Sensivel"], resposta: 2 },
  { nivel: "medio", topico: "harmonia-funcional", pergunta: "Qual cadencia esta presente em G - C?", opcoes: ["Plagal", "Perfeita", "Interrompida", "Modal"], resposta: 1 },
  { nivel: "medio", topico: "harmonia-funcional", pergunta: "A progressao I - IV - V - I representa:", opcoes: ["Progressao cromatica", "Progressao funcional basica", "Escala menor", "Modulacao"], resposta: 1 },
  { nivel: "medio", topico: "harmonia-funcional", pergunta: "Qual acorde cria expectativa de resolucao?", opcoes: ["I grau", "III grau", "IV grau", "V grau"], resposta: 3 },

  // HARMONIA FUNCIONAL — DIFICIL
  { nivel: "dificil", topico: "harmonia-funcional", pergunta: "Na progressao C - Am - Dm - G - C, qual e a sequencia funcional correta?", opcoes: ["T - Trel - SD - D - T", "T - SD - D - T - SD", "SD - D - T - SD - D", "T - D - SD - T - D"], resposta: 0 },
  { nivel: "dificil", topico: "harmonia-funcional", pergunta: "Na progressao Dm - G - C - Am, o acorde Am funciona como:", opcoes: ["Dominante", "Tonica relativa", "Subdominante", "Sensivel"], resposta: 1 },
  { nivel: "dificil", topico: "harmonia-funcional", pergunta: "Qual progressao representa uma cadencia plagal?", opcoes: ["G - C", "Dm - G", "F - C", "Am - Dm"], resposta: 2 },
  { nivel: "dificil", topico: "harmonia-funcional", pergunta: "Na progressao G - Am, ocorre:", opcoes: ["Cadencia perfeita", "Resolucao plagal", "Cadencia deceptiva", "Modulacao direta"], resposta: 2 },
  { nivel: "dificil", topico: "harmonia-funcional", pergunta: "Qual analise correta para Dm - G - C?", opcoes: ["I - IV - V", "II - V - I", "III - VI - II", "V - I - IV"], resposta: 1 },
  { nivel: "dificil", topico: "harmonia-funcional", pergunta: "Qual grau geralmente exerce funcao dominante secundaria?", opcoes: ["V/V", "I", "IV", "VI"], resposta: 0 },

  // HISTORIA DA MUSICA — FACIL
  { nivel: "facil", topico: "historia-da-musica", pergunta: "A musica na Idade Media ficou conhecida por: [REVISAR]", opcoes: ["Desenvolvimento da polifonia", "Uso exclusivo de instrumentos eletricos", "Apenas canto solo", "Ausencia de organizacao musical"], resposta: 0 },
  { nivel: "facil", topico: "historia-da-musica", pergunta: "Quem foi [REVISAR - inserir nome]? (Compositor da Idade Media ligado a polifonia)", opcoes: ["Compositor da Idade Media ligado a polifonia", "Compositor do periodo classico", "Musico do jazz moderno", "Cantor popular contemporaneo"], resposta: 0 },
  { nivel: "facil", topico: "historia-da-musica", pergunta: "Quem foi [REVISAR - inserir nome]? (Compositor medieval que desenvolveu a polifonia)", opcoes: ["Compositor barroco", "Compositor medieval que desenvolveu a polifonia", "Compositor romantico", "Teorico moderno"], resposta: 1 },
  { nivel: "facil", topico: "historia-da-musica", pergunta: "O que e organum?", opcoes: ["Forma inicial de polifonia", "Instrumento de corda", "Ritmo moderno", "Escala musical"], resposta: 0 },

  // HISTORIA DA MUSICA — MEDIO
  { nivel: "medio", topico: "historia-da-musica", pergunta: "Qual compositor esta associado a obra 'O Cravo Bem Temperado'?", opcoes: ["Mozart", "Bach", "Beethoven", "Chopin"], resposta: 1 },
  { nivel: "medio", topico: "historia-da-musica", pergunta: "Quem compos a 9a Sinfonia?", opcoes: ["Bach", "Mozart", "Beethoven", "Debussy"], resposta: 2 },
  { nivel: "medio", topico: "historia-da-musica", pergunta: "Qual compositor e conhecido pela opera 'A Flauta Magica'?", opcoes: ["Verdi", "Mozart", "Puccini", "Wagner"], resposta: 1 },
  { nivel: "medio", topico: "historia-da-musica", pergunta: "Qual compositor e associado ao periodo Romantico?", opcoes: ["Bach", "Mozart", "Chopin", "Palestrina"], resposta: 2 },
  { nivel: "medio", topico: "historia-da-musica", pergunta: "Qual compositor pertence ao Renascimento?", opcoes: ["Bach", "Palestrina", "Beethoven", "Debussy"], resposta: 1 },
  { nivel: "medio", topico: "historia-da-musica", pergunta: "Qual forma musical era comum na Idade Media?", opcoes: ["Sinfonia", "Moteto", "Sonata", "Concerto"], resposta: 1 },

  // HISTORIA DA MUSICA — DIFICIL
  { nivel: "dificil", topico: "historia-da-musica", pergunta: "A Escola de Notre-Dame contribuiu principalmente para:", opcoes: ["Desenvolvimento da musica eletronica", "Evolucao da polifonia organizada", "Criacao da sinfonia", "Desenvolvimento do jazz"], resposta: 1 },
  { nivel: "dificil", topico: "historia-da-musica", pergunta: "Qual inovacao esta ligada a [REVISAR - inserir nome]?", opcoes: ["Uso de acordes modernos", "Ampliacao da polifonia para multiplas vozes", "Criacao da tonalidade maior", "Uso de instrumentos eletricos"], resposta: 1 },
  { nivel: "dificil", topico: "historia-da-musica", pergunta: "O moteto medieval se caracteriza por:", opcoes: ["Uso de uma unica voz", "Uso de varias vozes com textos diferentes", "Apenas instrumentos", "Ausencia de ritmo"], resposta: 1 },
  { nivel: "dificil", topico: "historia-da-musica", pergunta: "Qual compositor esta associado ao impressionismo musical?", opcoes: ["Bach", "Beethoven", "Debussy", "Mozart"], resposta: 2 },
  { nivel: "dificil", topico: "historia-da-musica", pergunta: "Qual caracteristica define o periodo Barroco?", opcoes: ["Uso de polifonia complexa e baixo continuo", "Ausencia de harmonia", "Uso apenas de voz solo", "Musica sem estrutura"], resposta: 0 },
  { nivel: "dificil", topico: "historia-da-musica", pergunta: "Qual obra e um exemplo de fuga barroca?", opcoes: ["Sinfonia no 5", "O Cravo Bem Temperado", "Clair de Lune", "Ave Maria moderna"], resposta: 1 },
];

module.exports = { perguntas, TOPICOS };
