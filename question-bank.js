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
  { nivel: "dificil", topico: "harmonia-funcional", pergunta: "Quantos tons tem a escala maior?", opcoes: ["5", "6", "7", "8"], resposta: 2, explicacoes: ["Incorreto. 5 tons nao completa a estrutura da escala maior, que precisa fechar uma oitava completa.", "Incorreto. 6 tons esta proximo, mas ignora que a escala tambem possui semitons estruturais obrigatorios.", "Correto. A escala maior e formada por 6 tons e 2 semitons (12 semitons no total). O essencial e entender a distribuicao: T-T-ST-T-T-T-ST.", "Incorreto. 8 representa quantidade de notas (graus), nao a soma intervalar em tons."] },
  { nivel: "dificil", topico: "harmonia-funcional", pergunta: "Quantos tons tem a escala menor natural?", opcoes: ["3", "4", "5", "6"], resposta: 2, explicacoes: ["Incorreto. 3 tons nao sustenta uma estrutura diatonica.", "Incorreto. 4 tons e uma contagem incompleta comum, mas nao corresponde a realidade.", "Correto. A escala menor natural possui 5 tons e 2 semitons, totalizando 12 semitons.", "Incorreto. 6 tons descaracteriza o modo menor."] },
  { nivel: "dificil", topico: "harmonia-funcional", pergunta: "Quantos semitons tem a escala menor natural?", opcoes: ["10", "11", "12", "7"], resposta: 2, explicacoes: ["Incorreto. 10 semitons nao completam a oitava.", "Incorreto. 11 semitons nao formam uma oitava completa.", "Correto. Toda escala dentro da oitava possui 12 semitons.", "Incorreto. 7 refere-se a numero de notas."] },
  { nivel: "dificil", topico: "harmonia-funcional", pergunta: "Qual e a formula da escala menor natural?", opcoes: ["T ST T T ST T T", "T T ST T T T ST", "ST T T ST T T T", "T T T ST T ST T"], resposta: 0, explicacoes: ["Correto. T-ST-T-T-ST-T-T define o modo menor natural (eolio), com terca menor, sexta menor e setima menor.", "Incorreto. Essa e a formula da escala maior.", "Incorreto. A sequencia nao forma um modo diatonico valido.", "Incorreto. A distribuicao intervalar esta quebrada."] },
  { nivel: "dificil", topico: "harmonia-funcional", pergunta: "Uma triade tem quantas notas?", opcoes: ["2", "3", "4", "5"], resposta: 1, explicacoes: ["Incorreto. Duas notas formam apenas um intervalo.", "Correto. Triade e formada por empilhamento de tercas: fundamental, terca e quinta.", "Incorreto. Quatro notas formam tetrade.", "Incorreto. Cinco notas ja sao extensoes."] },
  { nivel: "dificil", topico: "harmonia-funcional", pergunta: "Triade maior possui:", opcoes: ["Terca maior", "Terca menor", "Quarta", "Segunda"], resposta: 0, explicacoes: ["Correto. A terca maior (4 semitons) define o carater maior do acorde.", "Incorreto. Terca menor mudaria o acorde para menor.", "Incorreto. Quarta nao faz parte da estrutura basica.", "Incorreto. Segunda e extensao, nao base."] },
  { nivel: "dificil", topico: "harmonia-funcional", pergunta: "Triade menor possui:", opcoes: ["Terca maior", "Terca menor", "Quarta", "Segunda"], resposta: 1, explicacoes: ["Incorreto. Terca maior caracteriza acorde maior.", "Correto. Terca menor (3 semitons) define o acorde menor.", "Incorreto. Quarta nao define triade.", "Incorreto. Segunda nao e estrutural."] },
  { nivel: "dificil", topico: "harmonia-funcional", pergunta: "O V grau tem funcao:", opcoes: ["Tonica", "Dominante", "Subdominante", "Relativa"], resposta: 1, explicacoes: ["Incorreto. Tonica e repouso.", "Correto. O V grau contem o tritono e exerce funcao dominante, gerando forte tensao.", "Incorreto. Subdominante prepara, nao tensiona ao maximo.", "Incorreto. Relativa nao e funcao principal."] },
  { nivel: "dificil", topico: "harmonia-funcional", pergunta: "O I grau tem funcao:", opcoes: ["Dominante", "Tonica", "Subdominante", "Sensivel"], resposta: 1, explicacoes: ["Incorreto. Dominante gera tensao.", "Correto. A tonica e o centro tonal e ponto de repouso.", "Incorreto. Subdominante prepara tensao.", "Incorreto. Sensivel e o VII grau."] },
  { nivel: "dificil", topico: "harmonia-funcional", pergunta: "Cadencia V-I e:", opcoes: ["Imperfeita", "Perfeita", "Plagal", "Deceptiva"], resposta: 1, explicacoes: ["Incorreto. A cadencia imperfeita ocorre quando nao ha sensacao plena de fechamento, geralmente quando a tonica aparece em inversao ou posicao fraca.", "Correto. A cadencia V-I e chamada de cadencia perfeita (ou autentica) porque representa a resolucao mais forte dentro do sistema tonal. Isso acontece porque o acorde dominante (V) contem o tritono (entre a terca e a setima do acorde), que gera tensao maxima e resolve diretamente na tonica (I), criando sensacao de conclusao completa.", "Incorreto. A cadencia plagal ocorre entre IV-I, conhecida como efeito 'amem', muito comum em musica sacra.", "Incorreto. A cadencia deceptiva ocorre quando o V nao resolve na tonica, mas sim em outro acorde, geralmente o VI."] },
  { nivel: "dificil", topico: "harmonia-funcional", pergunta: "Quantos semitons tem uma quinta justa?", opcoes: ["5", "6", "7", "8"], resposta: 2, explicacoes: ["Incorreto. 5 semitons e quarta justa.", "Incorreto. 6 semitons e tritono.", "Correto. Quinta justa possui 7 semitons.", "Incorreto. 8 semitons e sexta menor."] },
  { nivel: "dificil", topico: "harmonia-funcional", pergunta: "Quantos semitons tem uma terca maior?", opcoes: ["2", "3", "4", "5"], resposta: 2, explicacoes: ["Incorreto. 2 semitons e segunda maior.", "Incorreto. 3 semitons e terca menor.", "Correto. 4 semitons definem a terca maior.", "Incorreto. 5 semitons e quarta justa."] },
  { nivel: "dificil", topico: "harmonia-funcional", pergunta: "O que e enarmonia?", opcoes: ["Mesmo som, nomes diferentes", "Notas diferentes", "Intervalos iguais", "Acordes iguais"], resposta: 0, explicacoes: ["Correto. Notas com mesmo som, mas grafia diferente (C# = Db).", "Incorreto. Notas diferentes nao sao enarmonicas.", "Incorreto. Intervalos iguais nao definem enarmonia.", "Incorreto. Acordes iguais nao sao o foco do conceito."] },
  { nivel: "dificil", topico: "harmonia-funcional", pergunta: "O que e modulacao?", opcoes: ["Mudanca de ritmo", "Mudanca de tonalidade", "Mudanca de intensidade", "Mudanca de timbre"], resposta: 1, explicacoes: ["Incorreto. Ritmo nao altera tonalidade.", "Correto. Modulacao e mudanca de centro tonal dentro da musica.", "Incorreto. Intensidade nao muda tonalidade.", "Incorreto. Timbre nao altera funcao tonal."] },

  // HARMONIA FUNCIONAL — FACIL
  { nivel: "facil", topico: "harmonia-funcional", pergunta: "O que e funcao harmonica?", opcoes: ["Funcao que define a intensidade da musica", "Funcao que define o papel do acorde na tonalidade", "Funcao que define a velocidade", "Funcao que define o timbre"], resposta: 1, explicacoes: ["Incorreto. Intensidade e dinamica.", "Correto. Define o papel do acorde na tonalidade (T, SD, D).", "Incorreto. Velocidade e andamento.", "Incorreto. Timbre e cor sonora."] },
  { nivel: "facil", topico: "harmonia-funcional", pergunta: "Qual acorde representa a funcao tonica?", opcoes: ["IV grau", "V grau", "I grau", "II grau"], resposta: 2, explicacoes: ["Incorreto. IV e subdominante.", "Incorreto. V e dominante.", "Correto. I grau representa a tonica.", "Incorreto. II e subdominante."] },
  { nivel: "facil", topico: "harmonia-funcional", pergunta: "Qual acorde representa a funcao dominante?", opcoes: ["I grau", "III grau", "V grau", "VI grau"], resposta: 2, explicacoes: ["Incorreto. I e tonica.", "Incorreto. III nao e dominante principal.", "Correto. V grau exerce funcao dominante.", "Incorreto. VI e relativa."] },
  { nivel: "facil", topico: "harmonia-funcional", pergunta: "Qual acorde representa a funcao subdominante?", opcoes: ["IV grau", "I grau", "V grau", "VII grau"], resposta: 0, explicacoes: ["Correto. IV grau exerce funcao subdominante.", "Incorreto. I e tonica.", "Incorreto. V e dominante.", "Incorreto. VII e sensivel."] },
  { nivel: "facil", topico: "harmonia-funcional", pergunta: "Qual funcao harmonica gera maior tensao?", opcoes: ["Subdominante", "Dominante", "Tonica", "Relativa"], resposta: 1, explicacoes: ["Incorreto. Subdominante prepara.", "Correto. Dominante gera tensao maxima.", "Incorreto. Tonica e repouso.", "Incorreto. Relativa nao gera tensao principal."] },
  { nivel: "facil", topico: "harmonia-funcional", pergunta: "Na progressao C - F - G - C, qual acorde exerce funcao dominante?", opcoes: ["F", "Am", "G", "C"], resposta: 2, explicacoes: ["Incorreto. F e subdominante.", "Incorreto. Am nem aparece.", "Correto. G e V grau e cria tensao antes da resolucao.", "Incorreto. C e tonica."] },
  { nivel: "facil", topico: "harmonia-funcional", pergunta: "Na tonalidade de Do maior, qual e o acorde de tonica?", opcoes: ["F", "G", "C", "Dm"], resposta: 2, explicacoes: ["Incorreto. F e subdominante.", "Incorreto. G e dominante.", "Correto. C e a tonica de Do maior.", "Incorreto. Dm e subdominante."] },
  { nivel: "facil", topico: "harmonia-funcional", pergunta: "A progressao G - C representa:", opcoes: ["Subdominante para Dominante", "Dominante para Tonica", "Tonica para Dominante", "Tonica para Subdominante"], resposta: 1, explicacoes: ["Incorreto. Nao e SD-D.", "Correto. Dominante resolve na tonica.", "Incorreto. Nao comeca na tonica.", "Incorreto. Nao e T-SD."] },

  // HARMONIA FUNCIONAL — MEDIO
  { nivel: "medio", topico: "harmonia-funcional", pergunta: "Qual e a funcao do IV grau?", opcoes: ["Subdominante", "Tonica", "Dominante", "Sensivel"], resposta: 0, explicacoes: ["Correto. IV exerce funcao subdominante.", "Incorreto. Nao e tonica.", "Incorreto. Nao e dominante.", "Incorreto. Sensivel e VII."] },
  { nivel: "medio", topico: "harmonia-funcional", pergunta: "Qual e a funcao do V grau?", opcoes: ["Dominante", "Subdominante", "Tonica", "Relativa"], resposta: 0, explicacoes: ["Correto. V grau exerce funcao dominante, gerando tensao.", "Incorreto. Subdominante e IV ou II.", "Incorreto. Tonica e I grau.", "Incorreto. Relativa nao e funcao principal."] },
  { nivel: "medio", topico: "harmonia-funcional", pergunta: "Na progressao Dm - G - C, a sequencia funcional correta e:", opcoes: ["Tonica - Dominante - Tonica", "Subdominante - Dominante - Tonica", "Dominante - Tonica - Subdominante", "Tonica - Subdominante - Dominante"], resposta: 1, explicacoes: ["Incorreto. Dm nao e tonica.", "Correto. II (SD) -> V (D) -> I (T), progressao classica.", "Incorreto. Ordem funcional errada.", "Incorreto. Nao resolve corretamente."] },
  { nivel: "medio", topico: "harmonia-funcional", pergunta: "Na progressao C - Am - Dm - G, o acorde Am exerce:", opcoes: ["Dominante", "Subdominante", "Tonica relativa", "Sensivel"], resposta: 2, explicacoes: ["Incorreto. Nao cria tensao.", "Incorreto. Nao e preparacao direta.", "Correto. VI grau funciona como tonica relativa.", "Incorreto. Sensivel e VII."] },
  { nivel: "medio", topico: "harmonia-funcional", pergunta: "Qual cadencia esta presente em G - C?", opcoes: ["Plagal", "Perfeita", "Interrompida", "Modal"], resposta: 1, explicacoes: ["Incorreto. A cadencia plagal seria F-C (IV-I), nao G-C.", "Correto. G-C representa V-I na tonalidade de C maior, caracterizando uma cadencia perfeita. Aqui ocorre o movimento mais forte da harmonia tonal: tensao (dominante) -> resolucao (tonica).", "Incorreto. Cadencia interrompida (deceptiva) ocorre quando o V resolve no VI.", "Incorreto. Cadencia modal envolve linguagem fora do sistema tonal tradicional."] },
  { nivel: "medio", topico: "harmonia-funcional", pergunta: "A progressao I - IV - V - I representa:", opcoes: ["Progressao cromatica", "Progressao funcional basica", "Escala menor", "Modulacao"], resposta: 1, explicacoes: ["Incorreto. Nao e cromatica.", "Correto. E progressao funcional basica.", "Incorreto. Nao define escala.", "Incorreto. Nao ha mudanca de tonalidade."] },
  { nivel: "medio", topico: "harmonia-funcional", pergunta: "Qual acorde cria expectativa de resolucao?", opcoes: ["I grau", "III grau", "IV grau", "V grau"], resposta: 3, explicacoes: ["Incorreto. Tonica resolve.", "Incorreto. III e fraco funcionalmente.", "Incorreto. IV prepara.", "Correto. V contem tritono e sensivel, gerando maxima tensao."] },

  // HARMONIA FUNCIONAL — DIFICIL
  { nivel: "dificil", topico: "harmonia-funcional", pergunta: "Na progressao C - Am - Dm - G - C, qual e a sequencia funcional correta?", opcoes: ["T - Trel - SD - D - T", "T - SD - D - T - SD", "SD - D - T - SD - D", "T - D - SD - T - D"], resposta: 0, explicacoes: ["Correto. T - Trel - SD - D - T representa um ciclo tonal completo. A musica parte do repouso (tonica), passa por uma area de variacao (tonica relativa), prepara a tensao (subdominante), cria tensao (dominante) e resolve novamente na tonica.", "Incorreto. A sequencia perde logica funcional, pois desloca funcoes essenciais.", "Incorreto. Comecar em subdominante quebra a sensacao de centro tonal.", "Incorreto. A ordem dominante-subdominante esta invertida, o que compromete a logica da resolucao."] },
  { nivel: "dificil", topico: "harmonia-funcional", pergunta: "Na progressao Dm - G - C - Am, o acorde Am funciona como:", opcoes: ["Dominante", "Tonica relativa", "Subdominante", "Sensivel"], resposta: 1, explicacoes: ["Incorreto. Nao e dominante.", "Correto. Am e tonica relativa (VI grau).", "Incorreto. Nao e subdominante.", "Incorreto. Nao e sensivel."] },
  { nivel: "dificil", topico: "harmonia-funcional", pergunta: "Qual progressao representa uma cadencia plagal?", opcoes: ["G - C", "Dm - G", "F - C", "Am - Dm"], resposta: 2, explicacoes: ["Incorreto. G-C e V-I (cadencia perfeita).", "Incorreto. Dm-G e uma preparacao para dominante (II-V).", "Correto. F-C representa IV-I, que caracteriza a cadencia plagal. Diferente da cadencia perfeita, ela nao tem o tritono dominante, portanto gera uma resolucao mais suave, muito associada ao final de hinos e musicas religiosas.", "Incorreto. Am-Dm nao resolve na tonica, portanto nao forma cadencia conclusiva."] },
  { nivel: "dificil", topico: "harmonia-funcional", pergunta: "Na progressao G - Am, ocorre:", opcoes: ["Cadencia perfeita", "Resolucao plagal", "Cadencia deceptiva", "Modulacao direta"], resposta: 2, explicacoes: ["Incorreto. A cadencia perfeita exige resolucao V-I, o que nao acontece aqui.", "Incorreto. A cadencia plagal seria IV-I.", "Correto. Aqui temos uma cadencia deceptiva (V-VI). O acorde dominante (G) cria expectativa de resolucao na tonica (C), mas em vez disso resolve em Am (VI grau). Isso engana o ouvido e prolonga a progressao, sendo muito usada para evitar fechamento imediato.", "Incorreto. Nao ha mudanca de tonalidade, apenas uma resolucao inesperada dentro da mesma tonalidade."] },
  { nivel: "dificil", topico: "harmonia-funcional", pergunta: "Qual analise correta para Dm - G - C?", opcoes: ["I - IV - V", "II - V - I", "III - VI - II", "V - I - IV"], resposta: 1, explicacoes: ["Incorreto. Nao comeca em I.", "Correto. II - V - I e progressao padrao.", "Incorreto. Sequencia errada.", "Incorreto. Ordem incorreta."] },
  { nivel: "dificil", topico: "harmonia-funcional", pergunta: "Qual grau geralmente exerce funcao dominante secundaria?", opcoes: ["V/V", "I", "IV", "VI"], resposta: 0, explicacoes: ["Correto. V/V e o dominante da dominante.", "Incorreto. I nao cria tensao.", "Incorreto. IV e subdominante.", "Incorreto. VI e relativa."] },

  // HISTORIA DA MUSICA — FACIL
  { nivel: "facil", topico: "historia-da-musica", pergunta: "A musica na Idade Media ficou conhecida principalmente por:", opcoes: ["Desenvolvimento da polifonia", "Uso exclusivo de instrumentos eletricos", "Apenas canto solo", "Ausencia de organizacao musical"], resposta: 0 },
  { nivel: "facil", topico: "historia-da-musica", pergunta: "Quem foi Perotin (Perotinus)?", opcoes: ["Compositor da Idade Media ligado a polifonia de Notre-Dame", "Compositor do periodo classico", "Musico do jazz moderno", "Cantor popular contemporaneo"], resposta: 0 },
  { nivel: "facil", topico: "historia-da-musica", pergunta: "Quem foi Leonin (Leoninus)?", opcoes: ["Compositor barroco", "Compositor medieval associado ao desenvolvimento inicial da polifonia na Escola de Notre-Dame", "Compositor romantico", "Teorico moderno"], resposta: 1 },
  { nivel: "facil", topico: "historia-da-musica", pergunta: "O que e organum?", opcoes: ["Forma inicial de polifonia", "Instrumento de corda", "Ritmo moderno", "Escala musical"], resposta: 0 },

  // HISTORIA DA MUSICA — MEDIO
  { nivel: "medio", topico: "historia-da-musica", pergunta: "Qual compositor esta associado a obra 'O Cravo Bem Temperado'?", opcoes: ["Mozart", "Bach", "Beethoven", "Chopin"], resposta: 1 },
  { nivel: "medio", topico: "historia-da-musica", pergunta: "Qual compositor e conhecido pela opera 'A Flauta Magica'?", opcoes: ["Verdi", "Mozart", "Puccini", "Wagner"], resposta: 1 },
  { nivel: "medio", topico: "historia-da-musica", pergunta: "Qual compositor e associado ao periodo Romantico?", opcoes: ["Bach", "Mozart", "Chopin", "Palestrina"], resposta: 2 },
  { nivel: "medio", topico: "historia-da-musica", pergunta: "Qual forma musical era comum na Idade Media?", opcoes: ["Sinfonia", "Moteto", "Sonata", "Concerto"], resposta: 1 },

  // HISTORIA DA MUSICA — DIFICIL
  { nivel: "dificil", topico: "historia-da-musica", pergunta: "A Escola de Notre-Dame contribuiu principalmente para:", opcoes: ["Desenvolvimento da musica eletronica", "Evolucao da polifonia organizada", "Criacao da sinfonia", "Desenvolvimento do jazz"], resposta: 1 },
  { nivel: "dificil", topico: "historia-da-musica", pergunta: "Qual inovacao esta ligada a Perotin (Perotinus)?", opcoes: ["Uso de acordes modernos", "Ampliacao da polifonia para multiplas vozes na Escola de Notre-Dame", "Criacao da tonalidade maior", "Uso de instrumentos eletricos"], resposta: 1 },
  { nivel: "dificil", topico: "historia-da-musica", pergunta: "O moteto medieval se caracteriza por:", opcoes: ["Uso de uma unica voz", "Uso de varias vozes com textos diferentes", "Apenas instrumentos", "Ausencia de ritmo"], resposta: 1 },
  { nivel: "dificil", topico: "historia-da-musica", pergunta: "Qual compositor esta associado ao impressionismo musical?", opcoes: ["Bach", "Beethoven", "Debussy", "Mozart"], resposta: 2 },
  { nivel: "dificil", topico: "historia-da-musica", pergunta: "Qual caracteristica define o periodo Barroco?", opcoes: ["Uso de polifonia complexa e baixo continuo", "Ausencia de harmonia", "Uso apenas de voz solo", "Musica sem estrutura"], resposta: 0 },
  { nivel: "dificil", topico: "historia-da-musica", pergunta: "Qual obra e um exemplo de fuga barroca?", opcoes: ["Sinfonia no 5", "O Cravo Bem Temperado", "Clair de Lune", "Ave Maria moderna"], resposta: 1 },

  // HISTORIA DA MUSICA COM EXPLICACOES (FEEDBACK DETALHADO)
  { nivel: "facil", topico: "historia-da-musica", pergunta: "Em qual periodo surgiu o canto gregoriano?", opcoes: ["Renascimento", "Idade Media", "Barroco", "Classico"], resposta: 1, explicacoes: ["Incorreto. Veio depois.", "Correto. Musica medieval religiosa.", "Incorreto. Posterior.", "Incorreto. Posterior."] },
  { nivel: "facil", topico: "historia-da-musica", pergunta: "A musica na Catedral de Notre-Dame ficou conhecida por:", opcoes: ["Polifonia", "Musica eletronica", "Monodia moderna", "Ausencia de estrutura"], resposta: 0, explicacoes: ["Correto. Desenvolvimento da polifonia.", "Incorreto. Seculo XX.", "Incorreto. Nao corresponde.", "Incorreto. Musica organizada."] },
  { nivel: "medio", topico: "historia-da-musica", pergunta: "Quem compos a 9a Sinfonia?", opcoes: ["Bach", "Mozart", "Beethoven", "Debussy"], resposta: 2, explicacoes: ["Incorreto. Barroco.", "Incorreto. Nao foi ele.", "Correto. Beethoven.", "Incorreto. Impressionismo."] },
  { nivel: "medio", topico: "historia-da-musica", pergunta: "Qual compositor pertence ao Renascimento?", opcoes: ["Bach", "Palestrina", "Beethoven", "Debussy"], resposta: 1, explicacoes: ["Incorreto. Barroco.", "Correto. Renascimento.", "Incorreto. Classico/Romantico.", "Incorreto. Moderno."] },
  { nivel: "dificil", topico: "historia-da-musica", pergunta: "A Escola de Notre-Dame contribuiu para:", opcoes: ["Musica eletronica", "Evolucao da polifonia", "Sinfonia", "Jazz"], resposta: 1, explicacoes: ["Incorreto. Seculo XX.", "Correto. Polifonia organizada.", "Incorreto. Periodo classico.", "Incorreto. Seculo XX."] },
];

const harmonia_medio = [
  {
    nivel: "medio",
    tema: "harmonia",
    subtema: "campo_harmonico",
    pergunta: "Na tonalidade de C maior, qual é o acorde do II grau (supertônica)?",
    opcoes: ["Dm", "Em", "F", "G"],
    resposta: 0,
    explicacoes: [
      "Correto. Dm é o II grau.",
      "Incorreto. Em é III grau.",
      "Incorreto. F é IV grau.",
      "Incorreto. G é V grau.",
    ],
  },
  {
    nivel: "medio",
    tema: "harmonia",
    subtema: "campo_harmonico",
    pergunta: "Na tonalidade de G maior, qual é o acorde do VI grau?",
    opcoes: ["Em", "Bm", "Am", "C"],
    resposta: 0,
    explicacoes: [
      "Correto. Em é VI grau.",
      "Incorreto. Bm é III.",
      "Incorreto. Am é II.",
      "Incorreto. C é IV.",
    ],
  },
  {
    nivel: "medio",
    tema: "harmonia",
    subtema: "funcao",
    pergunta: "Na tonalidade de C maior, qual função exerce o acorde F (IV grau)?",
    opcoes: ["Tônica", "Dominante", "Subdominante", "Sensível"],
    resposta: 2,
    explicacoes: ["Incorreto.", "Incorreto.", "Correto. IV grau é subdominante.", "Incorreto."],
  },
  {
    nivel: "medio",
    tema: "harmonia",
    subtema: "funcao",
    pergunta: "Na tonalidade de D maior, qual acorde exerce função dominante (V grau)?",
    opcoes: ["G", "A", "D", "Bm"],
    resposta: 1,
    explicacoes: ["Incorreto. IV grau.", "Correto. A é V grau.", "Incorreto. I grau.", "Incorreto. VI grau."],
  },
  {
    nivel: "medio",
    tema: "harmonia",
    subtema: "progressao",
    pergunta: "Na tonalidade de C maior, a progressão Dm → G → C representa:",
    opcoes: ["I - IV - V", "II - V - I", "V - I - IV", "III - VI - II"],
    resposta: 1,
    explicacoes: ["Incorreto.", "Correto. II-V-I é progressão fundamental.", "Incorreto.", "Incorreto."],
  },
  {
    nivel: "medio",
    tema: "harmonia",
    subtema: "analise",
    pergunta: "Na progressão C → Am → Dm → G, o acorde Am exerce qual função?",
    opcoes: ["Dominante", "Subdominante", "Tônica relativa", "Sensível"],
    resposta: 2,
    explicacoes: ["Incorreto.", "Incorreto.", "Correto. VI grau funciona como tônica relativa.", "Incorreto."],
  },
  {
    nivel: "medio",
    tema: "harmonia",
    subtema: "analise",
    pergunta: "Na tonalidade de G maior, qual acorde exerce função subdominante (IV grau)?",
    opcoes: ["D", "C", "G", "Em"],
    resposta: 1,
    explicacoes: ["Incorreto.", "Correto. C é IV grau.", "Incorreto.", "Incorreto."],
  },
  {
    nivel: "medio",
    tema: "harmonia",
    subtema: "inversao",
    pergunta: "Um acorde em primeira inversão possui qual nota no baixo?",
    opcoes: ["Fundamental", "Terça", "Quinta", "Sétima"],
    resposta: 1,
    explicacoes: ["Incorreto.", "Correto. Terça no baixo.", "Incorreto.", "Incorreto."],
  },
  {
    nivel: "medio",
    tema: "harmonia",
    subtema: "inversao",
    pergunta: "Um acorde em segunda inversão possui qual nota no baixo?",
    opcoes: ["Terça", "Quinta", "Fundamental", "Sétima"],
    resposta: 1,
    explicacoes: ["Incorreto.", "Correto. Quinta no baixo.", "Incorreto.", "Incorreto."],
  },
  {
    nivel: "medio",
    tema: "harmonia",
    subtema: "cadencia",
    pergunta: "Na tonalidade de C maior, a sequência F → G → C representa:",
    opcoes: ["Cadência plagal", "Cadência autêntica completa", "Cadência deceptiva", "Cadência modal"],
    resposta: 1,
    explicacoes: ["Incorreto. IV-I.", "Correto. IV-V-I.", "Incorreto.", "Incorreto."],
  },
  {
    nivel: "medio",
    tema: "harmonia",
    subtema: "relativa",
    pergunta: "Na tonalidade de C maior, qual acorde é a relativa menor (VI grau)?",
    opcoes: ["Am", "Dm", "Em", "G"],
    resposta: 0,
    explicacoes: ["Correto.", "Incorreto.", "Incorreto.", "Incorreto."],
  },
  {
    nivel: "medio",
    tema: "harmonia",
    subtema: "analise",
    pergunta: "Na tonalidade de D maior, qual acorde é o II grau (supertônica)?",
    opcoes: ["Em", "F#m", "G", "A"],
    resposta: 0,
    explicacoes: ["Correto. Em é II grau.", "Incorreto.", "Incorreto.", "Incorreto."],
  },
  {
    nivel: "medio",
    tema: "harmonia",
    subtema: "analise",
    pergunta: "Na tonalidade de G maior, qual acorde é o V grau (dominante)?",
    opcoes: ["D", "C", "G", "Em"],
    resposta: 0,
    explicacoes: ["Correto.", "Incorreto.", "Incorreto.", "Incorreto."],
  },
  {
    nivel: "medio",
    tema: "harmonia",
    subtema: "analise",
    pergunta: "Na tonalidade de C maior, qual acorde é o III grau?",
    opcoes: ["Em", "Dm", "F", "Am"],
    resposta: 0,
    explicacoes: ["Correto.", "Incorreto.", "Incorreto.", "Incorreto."],
  },
  {
    nivel: "medio",
    tema: "harmonia",
    subtema: "analise",
    pergunta: "Na tonalidade de G maior, qual acorde é o IV grau?",
    opcoes: ["C", "D", "G", "Am"],
    resposta: 0,
    explicacoes: ["Correto.", "Incorreto.", "Incorreto.", "Incorreto."],
  },
  {
    nivel: "medio",
    tema: "harmonia",
    subtema: "analise",
    pergunta: "Na tonalidade de D maior, qual acorde é o V grau?",
    opcoes: ["A", "G", "D", "Bm"],
    resposta: 0,
    explicacoes: ["Correto.", "Incorreto.", "Incorreto.", "Incorreto."],
  },
  {
    nivel: "medio",
    tema: "harmonia",
    subtema: "analise",
    pergunta: "Na tonalidade de C maior, qual acorde exerce função dominante?",
    opcoes: ["G", "F", "C", "Am"],
    resposta: 0,
    explicacoes: ["Correto.", "Incorreto.", "Incorreto.", "Incorreto."],
  },
  {
    nivel: "medio",
    tema: "harmonia",
    subtema: "analise",
    pergunta: "Na tonalidade de G maior, qual acorde é o VI grau?",
    opcoes: ["Em", "Bm", "Am", "C"],
    resposta: 0,
    explicacoes: ["Correto.", "Incorreto.", "Incorreto.", "Incorreto."],
  },
  {
    nivel: "medio",
    tema: "harmonia",
    subtema: "analise",
    pergunta: "Na tonalidade de D maior, qual acorde é o IV grau?",
    opcoes: ["G", "A", "D", "Em"],
    resposta: 0,
    explicacoes: ["Correto.", "Incorreto.", "Incorreto.", "Incorreto."],
  },
  {
    nivel: "medio",
    tema: "harmonia",
    subtema: "analise",
    pergunta: "Na tonalidade de C maior, qual acorde é o V grau?",
    opcoes: ["G", "F", "C", "Am"],
    resposta: 0,
    explicacoes: ["Correto.", "Incorreto.", "Incorreto.", "Incorreto."],
  },
];

perguntas.push(
  ...harmonia_medio.map((q) => ({
    nivel: q.nivel,
    tema: q.tema,
    subtema: q.subtema,
    topico: "harmonia-funcional",
    pergunta: q.pergunta,
    opcoes: q.opcoes,
    resposta: q.resposta,
    explicacoes: q.explicacoes,
  }))
);

const harmonia_dificil = [
  {
    nivel: "dificil",
    tema: "harmonia",
    subtema: "cadencia",
    pergunta: "Na tonalidade de C maior, a sequência G → Am (V → VI) representa qual tipo de cadência?",
    opcoes: ["Perfeita", "Plagal", "Deceptiva", "Autêntica"],
    resposta: 2,
    explicacoes: [
      "Incorreto. V-I.",
      "Incorreto. IV-I.",
      "Correto. V resolve no VI, criando efeito de surpresa.",
      "Incorreto.",
    ],
  },
  {
    nivel: "dificil",
    tema: "harmonia",
    subtema: "dominante_secundaria",
    pergunta: "Na tonalidade de C maior, o acorde G é o V grau. Qual acorde é o dominante desse acorde (V de G)?",
    opcoes: ["D", "A", "E", "B"],
    resposta: 0,
    explicacoes: ["Correto. D é dominante de G.", "Incorreto.", "Incorreto.", "Incorreto."],
  },
  {
    nivel: "dificil",
    tema: "harmonia",
    subtema: "dominante_secundaria",
    pergunta: "Na tonalidade de G maior, o acorde Am é o II grau. Qual acorde é o dominante de Am?",
    opcoes: ["E", "A", "D", "B"],
    resposta: 0,
    explicacoes: ["Correto. E é dominante de Am.", "Incorreto.", "Incorreto.", "Incorreto."],
  },
  {
    nivel: "dificil",
    tema: "harmonia",
    subtema: "dominante_secundaria",
    pergunta: "Na tonalidade de C maior, o acorde Am é o VI grau. Qual acorde funciona como dominante de Am?",
    opcoes: ["E", "G", "D", "A"],
    resposta: 0,
    explicacoes: ["Correto. E é dominante de Am.", "Incorreto.", "Incorreto.", "Incorreto."],
  },
  {
    nivel: "dificil",
    tema: "harmonia",
    subtema: "dominante_secundaria",
    pergunta: "Na tonalidade de C maior, o acorde Dm é o II grau. Qual acorde é o dominante de Dm?",
    opcoes: ["A", "E", "G", "B"],
    resposta: 0,
    explicacoes: ["Correto. A é dominante de Dm.", "Incorreto.", "Incorreto.", "Incorreto."],
  },
  {
    nivel: "dificil",
    tema: "harmonia",
    subtema: "emprestimo_modal",
    pergunta: "Na tonalidade de C maior, o acorde Bb não pertence ao campo harmônico. De onde ele vem?",
    opcoes: ["Dominante secundária", "Empréstimo modal", "Modulação", "Função tônica"],
    resposta: 1,
    explicacoes: ["Incorreto.", "Correto. Vem do modo menor paralelo.", "Incorreto.", "Incorreto."],
  },
  {
    nivel: "dificil",
    tema: "harmonia",
    subtema: "emprestimo_modal",
    pergunta: "Na tonalidade de C maior, o acorde Ab é usado ocasionalmente. Isso caracteriza:",
    opcoes: ["Modulação", "Empréstimo modal", "Dominante", "Cadência"],
    resposta: 1,
    explicacoes: ["Incorreto.", "Correto. Acorde emprestado do modo menor.", "Incorreto.", "Incorreto."],
  },
  {
    nivel: "dificil",
    tema: "harmonia",
    subtema: "modulacao",
    pergunta: "Quando uma música em C maior passa a ter G como novo centro tonal, isso é chamado de:",
    opcoes: ["Cadência", "Modulação", "Inversão", "Função"],
    resposta: 1,
    explicacoes: ["Incorreto.", "Correto. Mudança de tonalidade.", "Incorreto.", "Incorreto."],
  },
  {
    nivel: "dificil",
    tema: "harmonia",
    subtema: "analise",
    pergunta: "Na progressão C → E7 → Am, o acorde E7 exerce qual função?",
    opcoes: ["Tônica", "Subdominante", "Dominante do Am", "Empréstimo modal"],
    resposta: 2,
    explicacoes: ["Incorreto.", "Incorreto.", "Correto. E7 é dominante de Am.", "Incorreto."],
  },
  {
    nivel: "dificil",
    tema: "harmonia",
    subtema: "analise",
    pergunta: "Na tonalidade de G maior, o acorde Em é o VI grau. Qual acorde é o dominante de Em?",
    opcoes: ["B", "E", "A", "D"],
    resposta: 0,
    explicacoes: ["Correto. B é dominante de Em.", "Incorreto.", "Incorreto.", "Incorreto."],
  },
  {
    nivel: "dificil",
    tema: "harmonia",
    subtema: "analise",
    pergunta: "Na tonalidade de D maior, o acorde A é o V grau. Qual acorde é dominante de A?",
    opcoes: ["E", "B", "F#", "C#"],
    resposta: 0,
    explicacoes: ["Correto. E é dominante de A.", "Incorreto.", "Incorreto.", "Incorreto."],
  },
  {
    nivel: "dificil",
    tema: "harmonia",
    subtema: "analise",
    pergunta: "Na tonalidade de C maior, o acorde Em é o III grau. Qual acorde é dominante de Em?",
    opcoes: ["B", "E", "A", "D"],
    resposta: 0,
    explicacoes: ["Correto. B é dominante de Em.", "Incorreto.", "Incorreto.", "Incorreto."],
  },
  {
    nivel: "dificil",
    tema: "harmonia",
    subtema: "acordes",
    pergunta: "Um acorde diminuto é formado por quais intervalos?",
    opcoes: [
      "terça maior + quinta justa",
      "terça menor + quinta diminuta",
      "terça maior + quinta aumentada",
      "terça menor + quinta justa",
    ],
    resposta: 1,
    explicacoes: ["Incorreto.", "Correto. Estrutura do diminuto.", "Incorreto.", "Incorreto."],
  },
  {
    nivel: "dificil",
    tema: "harmonia",
    subtema: "acordes",
    pergunta: "Um acorde aumentado possui qual característica principal?",
    opcoes: ["quinta aumentada", "quinta diminuta", "terça menor", "sétima menor"],
    resposta: 0,
    explicacoes: ["Correto.", "Incorreto.", "Incorreto.", "Incorreto."],
  },
  {
    nivel: "dificil",
    tema: "harmonia",
    subtema: "cadencia",
    pergunta: "Na tonalidade de C maior, a sequência F → C representa:",
    opcoes: ["Perfeita", "Plagal", "Deceptiva", "Autêntica"],
    resposta: 1,
    explicacoes: ["Incorreto.", "Correto. IV-I.", "Incorreto.", "Incorreto."],
  },
  {
    nivel: "dificil",
    tema: "harmonia",
    subtema: "cadencia",
    pergunta: "Na tonalidade de C maior, a sequência G → C representa:",
    opcoes: ["Plagal", "Perfeita", "Deceptiva", "Modal"],
    resposta: 1,
    explicacoes: ["Incorreto.", "Correto. V-I.", "Incorreto.", "Incorreto."],
  },
  {
    nivel: "dificil",
    tema: "harmonia",
    subtema: "cadencia",
    pergunta: "Na tonalidade de C maior, a sequência G → Am representa:",
    opcoes: ["Perfeita", "Plagal", "Deceptiva", "Autêntica"],
    resposta: 2,
    explicacoes: ["Incorreto.", "Incorreto.", "Correto.", "Incorreto."],
  },
];

perguntas.push(
  ...harmonia_dificil.map((q) => ({
    nivel: q.nivel,
    tema: q.tema,
    subtema: q.subtema,
    topico: "harmonia-funcional",
    pergunta: q.pergunta,
    opcoes: q.opcoes,
    resposta: q.resposta,
    explicacoes: q.explicacoes,
  }))
);

const harmonia_facil = [
  {
    nivel: "facil",
    tema: "harmonia",
    subtema: "funcao",
    pergunta: "Qual função harmônica representa estabilidade?",
    opcoes: ["Dominante", "Subdominante", "Tônica", "Sensível"],
    resposta: 2,
    explicacoes: [
      "Incorreto. Dominante gera tensão.",
      "Incorreto. Subdominante prepara.",
      "Correto. A tônica é o ponto de repouso.",
      "Incorreto. Sensível cria expectativa.",
    ],
  },
  {
    nivel: "facil",
    tema: "harmonia",
    subtema: "dominante",
    pergunta: "Qual função cria tensão que resolve na tônica?",
    opcoes: ["Tônica", "Dominante", "Subdominante", "Relativa"],
    resposta: 1,
    explicacoes: [
      "Incorreto. Representa repouso.",
      "Correto. A dominante cria tensão e pede resolução.",
      "Incorreto. Apenas prepara.",
      "Incorreto. Não é função principal.",
    ],
  },
  {
    nivel: "facil",
    tema: "harmonia",
    subtema: "graus",
    pergunta: "Qual grau representa a tônica?",
    opcoes: ["V", "IV", "I", "II"],
    resposta: 2,
    explicacoes: [
      "Incorreto. V é dominante.",
      "Incorreto. IV é subdominante.",
      "Correto. I é tônica.",
      "Incorreto. II é preparação.",
    ],
  },
  {
    nivel: "facil",
    tema: "harmonia",
    subtema: "graus",
    pergunta: "Qual grau representa a dominante?",
    opcoes: ["I", "III", "V", "VI"],
    resposta: 2,
    explicacoes: [
      "Incorreto. Tônica.",
      "Incorreto. Não exerce função principal.",
      "Correto. V é dominante.",
      "Incorreto. Relativa.",
    ],
  },
  {
    nivel: "facil",
    tema: "harmonia",
    subtema: "subdominante",
    pergunta: "Qual função prepara a dominante?",
    opcoes: ["Tônica", "Dominante", "Subdominante", "Sensível"],
    resposta: 2,
    explicacoes: [
      "Incorreto. Repouso.",
      "Incorreto. Já é tensão.",
      "Correto. Subdominante prepara a tensão.",
      "Incorreto.",
    ],
  },
  {
    nivel: "facil",
    tema: "harmonia",
    subtema: "cadencia",
    pergunta: "O que é cadência perfeita?",
    opcoes: ["IV → I", "V → I", "V → VI", "I → IV"],
    resposta: 1,
    explicacoes: [
      "Incorreto. Plagal.",
      "Correto. Dominante resolve na tônica.",
      "Incorreto. Deceptiva.",
      "Incorreto.",
    ],
  },
  {
    nivel: "facil",
    tema: "harmonia",
    subtema: "cadencia",
    pergunta: "O que é cadência plagal?",
    opcoes: ["IV → I", "V → I", "V → VI", "II → V"],
    resposta: 0,
    explicacoes: [
      "Correto. Subdominante para tônica.",
      "Incorreto. Perfeita.",
      "Incorreto.",
      "Incorreto.",
    ],
  },
  {
    nivel: "facil",
    tema: "harmonia",
    subtema: "cadencia",
    pergunta: "O que é cadência deceptiva?",
    opcoes: ["V → I", "IV → I", "V → VI", "I → V"],
    resposta: 2,
    explicacoes: [
      "Incorreto.",
      "Incorreto.",
      "Correto. Evita resolução esperada.",
      "Incorreto.",
    ],
  },
  {
    nivel: "facil",
    tema: "harmonia",
    subtema: "campo_harmonico",
    pergunta: "Quantos graus tem o campo harmônico maior?",
    opcoes: ["5", "6", "7", "8"],
    resposta: 2,
    explicacoes: ["Incorreto.", "Incorreto.", "Correto. São 7 graus.", "Incorreto."],
  },
  {
    nivel: "facil",
    tema: "harmonia",
    subtema: "relativa",
    pergunta: "Qual é a relativa menor de C?",
    opcoes: ["Em", "Dm", "Am", "G"],
    resposta: 2,
    explicacoes: ["Incorreto.", "Incorreto.", "Correto. Am é relativa.", "Incorreto."],
  },
];

perguntas.push(
  ...harmonia_facil.map((q) => ({
    nivel: q.nivel,
    tema: q.tema,
    subtema: q.subtema,
    topico: "harmonia-funcional",
    pergunta: q.pergunta,
    opcoes: q.opcoes,
    resposta: q.resposta,
    explicacoes: q.explicacoes,
  }))
);

const harmonia_extra = [
  {
    nivel: "facil",
    tema: "harmonia",
    subtema: "funcao",
    topico: "harmonia-funcional",
    pergunta: "Em uma tonalidade maior, qual grau costuma iniciar o senso de repouso?",
    opcoes: ["V", "II", "I", "VII"],
    resposta: 2,
    explicacoes: [
      "Incorreto. V cria tensao e pede resolucao.",
      "Incorreto. II geralmente prepara a dominante.",
      "Correto. I grau (tonica) e o principal ponto de estabilidade.",
      "Incorreto. VII e sensivel, com tendencia de movimento para a tonica.",
    ],
  },
  {
    nivel: "facil",
    tema: "harmonia",
    subtema: "campo_harmonico",
    topico: "harmonia-funcional",
    pergunta: "Na tonalidade de C maior, qual acorde corresponde ao IV grau?",
    opcoes: ["Dm", "F", "G", "Am"],
    resposta: 1,
    explicacoes: [
      "Incorreto. Dm e II grau.",
      "Correto. F e o IV grau em C maior.",
      "Incorreto. G e V grau.",
      "Incorreto. Am e VI grau.",
    ],
  },
  {
    nivel: "facil",
    tema: "harmonia",
    subtema: "cadencia",
    topico: "harmonia-funcional",
    pergunta: "Qual sequencia representa uma cadencia que evita o fechamento esperado?",
    opcoes: ["V - I", "IV - I", "V - VI", "II - V"],
    resposta: 2,
    explicacoes: [
      "Incorreto. V-I e cadencia perfeita, com fechamento forte.",
      "Incorreto. IV-I e cadencia plagal.",
      "Correto. V-VI caracteriza cadencia deceptiva, adiando a resolucao final.",
      "Incorreto. II-V prepara uma resolucao, mas nao fecha por si so.",
    ],
  },
  {
    nivel: "medio",
    tema: "harmonia",
    subtema: "campo_harmonico",
    topico: "harmonia-funcional",
    pergunta: "Na tonalidade de G maior, qual e o acorde do III grau?",
    opcoes: ["Bm", "Am", "C", "D"],
    resposta: 0,
    explicacoes: [
      "Correto. Bm e o III grau no campo harmonico de G maior.",
      "Incorreto. Am e II grau.",
      "Incorreto. C e IV grau.",
      "Incorreto. D e V grau.",
    ],
  },
  {
    nivel: "medio",
    tema: "harmonia",
    subtema: "analise",
    topico: "harmonia-funcional",
    pergunta: "Na progressao F - G - Em - Am (em C maior), qual funcao exerce o acorde G?",
    opcoes: ["Tonica", "Dominante", "Subdominante", "Relativa"],
    resposta: 1,
    explicacoes: [
      "Incorreto. Tonica e o I grau (C).",
      "Correto. G e o V grau e exerce funcao dominante.",
      "Incorreto. Subdominante e mais associada a IV ou II.",
      "Incorreto. Relativa nao e uma funcao principal nesse contexto.",
    ],
  },
  {
    nivel: "medio",
    tema: "harmonia",
    subtema: "inversao",
    topico: "harmonia-funcional",
    pergunta: "Um acorde em estado fundamental possui qual nota no baixo?",
    opcoes: ["Terca", "Quinta", "Setima", "Fundamental"],
    resposta: 3,
    explicacoes: [
      "Incorreto. Terca no baixo caracteriza primeira inversao.",
      "Incorreto. Quinta no baixo caracteriza segunda inversao.",
      "Incorreto. Setima no baixo aparece em inversoes de acordes de setima.",
      "Correto. Em estado fundamental, a fundamental fica no baixo.",
    ],
  },
  {
    nivel: "medio",
    tema: "harmonia",
    subtema: "cadencia",
    topico: "harmonia-funcional",
    pergunta: "Em C maior, qual leitura funcional de Dm - G - C esta correta?",
    opcoes: ["II - V - I", "IV - V - I", "VI - II - V", "I - IV - V"],
    resposta: 0,
    explicacoes: [
      "Correto. Dm e II, G e V, C e I.",
      "Incorreto. Dm nao e IV em C maior.",
      "Incorreto. A sequencia proposta nao corresponde aos acordes dados.",
      "Incorreto. C nao aparece na posicao inicial dessa leitura.",
    ],
  },
  {
    nivel: "dificil",
    tema: "harmonia",
    subtema: "dominante_secundaria",
    topico: "harmonia-funcional",
    pergunta: "Na tonalidade de C maior, qual acorde funciona como V/II?",
    opcoes: ["E", "A", "D", "B"],
    resposta: 1,
    explicacoes: [
      "Incorreto. E e dominante de Am (VI).",
      "Correto. A (ou A7) funciona como dominante de Dm, que e o II grau.",
      "Incorreto. D e dominante de G (V), ou seja, V/V.",
      "Incorreto. B e dominante de Em (III).",
    ],
  },
  {
    nivel: "dificil",
    tema: "harmonia",
    subtema: "analise",
    topico: "harmonia-funcional",
    pergunta: "Na progressao C - E7 - Am - Dm - G - C, o acorde E7 e melhor descrito como:",
    opcoes: ["Subdominante diatonica", "Dominante secundaria do VI", "Emprestimo modal do paralelo maior", "Acorde diminuto de passagem"],
    resposta: 1,
    explicacoes: [
      "Incorreto. E7 nao e subdominante em C maior.",
      "Correto. E7 aponta para Am, atuando como dominante secundaria (V/VI).",
      "Incorreto. Nao se trata de emprestimo modal nesse caso.",
      "Incorreto. E7 e acorde dominante, nao diminuto.",
    ],
  },
  {
    nivel: "dificil",
    tema: "harmonia",
    subtema: "emprestimo_modal",
    topico: "harmonia-funcional",
    pergunta: "Em C maior, o uso de Ab maior geralmente indica:",
    opcoes: ["Cadencia perfeita", "Dominante secundaria", "Emprestimo modal de C menor", "Modulacao obrigatoria para Ab maior"],
    resposta: 2,
    explicacoes: [
      "Incorreto. Cadencia perfeita e tipicamente V-I.",
      "Incorreto. Ab nao exerce papel dominante tipico em C maior.",
      "Correto. Ab pode ser emprestado do modo menor paralelo (C menor).",
      "Incorreto. O acorde pode aparecer sem modulacao completa.",
    ],
  },
  {
    nivel: "dificil",
    tema: "harmonia",
    subtema: "acordes",
    topico: "harmonia-funcional",
    pergunta: "Qual intervalo transforma uma triade maior em aumentada?",
    opcoes: ["Elevar a terca em 1 semitom", "Elevar a quinta em 1 semitom", "Rebaixar a terca em 1 semitom", "Rebaixar a quinta em 1 semitom"],
    resposta: 1,
    explicacoes: [
      "Incorreto. Alterar a terca muda o modo maior/menor do acorde.",
      "Correto. A triade aumentada possui quinta aumentada em relacao a triade maior.",
      "Incorreto. Isso transformaria o acorde em menor.",
      "Incorreto. Rebaixar a quinta levaria a uma quinta diminuta.",
    ],
  },
  {
    nivel: "dificil",
    tema: "harmonia",
    subtema: "cadencia",
    topico: "harmonia-funcional",
    pergunta: "Em C maior, qual progressao tende a produzir maior sensacao de conclusao final?",
    opcoes: ["IV - I", "V - VI", "II - V", "V - I"],
    resposta: 3,
    explicacoes: [
      "Incorreto. IV-I e conclusiva, mas mais suave (plagal).",
      "Incorreto. V-VI e deceptiva, adia o fechamento.",
      "Incorreto. II-V prepara resolucao, mas nao conclui sozinho.",
      "Correto. V-I realiza a resolucao tonal mais forte (cadencia perfeita).",
    ],
  },
  {
    nivel: "facil",
    tema: "harmonia",
    subtema: "funcao",
    topico: "harmonia-funcional",
    pergunta: "Qual funcao harmonica costuma representar preparacao antes da dominante?",
    opcoes: ["Tonica", "Subdominante", "Sensivel", "Relativa"],
    resposta: 1,
    explicacoes: [
      "Incorreto. Tonica representa repouso.",
      "Correto. Subdominante prepara o caminho para a dominante.",
      "Incorreto. Sensivel e um grau, nao uma funcao principal isolada.",
      "Incorreto. Relativa nao substitui a funcao subdominante nesse papel.",
    ],
  },
  {
    nivel: "facil",
    tema: "harmonia",
    subtema: "cadencia",
    topico: "harmonia-funcional",
    pergunta: "A sequencia IV - I recebe qual nome?",
    opcoes: ["Cadencia perfeita", "Cadencia plagal", "Cadencia deceptiva", "Cadencia interrompida"],
    resposta: 1,
    explicacoes: [
      "Incorreto. Cadencia perfeita e V-I.",
      "Correto. IV-I define a cadencia plagal.",
      "Incorreto. Deceptiva ocorre em V-VI.",
      "Incorreto. Interrompida e outro nome usado para a deceptiva.",
    ],
  },
  {
    nivel: "facil",
    tema: "harmonia",
    subtema: "campo_harmonico",
    topico: "harmonia-funcional",
    pergunta: "Na tonalidade de C maior, qual acorde e o VI grau?",
    opcoes: ["Em", "Am", "Dm", "G"],
    resposta: 1,
    explicacoes: [
      "Incorreto. Em e III grau.",
      "Correto. Am e o VI grau em C maior.",
      "Incorreto. Dm e II grau.",
      "Incorreto. G e V grau.",
    ],
  },
  {
    nivel: "medio",
    tema: "harmonia",
    subtema: "analise",
    topico: "harmonia-funcional",
    pergunta: "Na progressao Am - Dm - G - C (em C maior), qual e a leitura funcional mais adequada?",
    opcoes: ["Trel - SD - D - T", "T - SD - D - T", "SD - D - T - SD", "D - T - SD - D"],
    resposta: 0,
    explicacoes: [
      "Correto. Am atua como tonica relativa, seguido por SD, D e resolucao em T.",
      "Incorreto. Am nao e tonica principal em C maior.",
      "Incorreto. A ordem funcional apresentada nao corresponde a progressao.",
      "Incorreto. A progressao nao inicia em dominante.",
    ],
  },
  {
    nivel: "medio",
    tema: "harmonia",
    subtema: "campo_harmonico",
    topico: "harmonia-funcional",
    pergunta: "Na tonalidade de D maior, qual e o acorde do VI grau?",
    opcoes: ["Bm", "F#m", "Em", "G"],
    resposta: 0,
    explicacoes: [
      "Correto. Bm e o VI grau em D maior.",
      "Incorreto. F#m e III grau.",
      "Incorreto. Em e II grau.",
      "Incorreto. G e IV grau.",
    ],
  },
  {
    nivel: "medio",
    tema: "harmonia",
    subtema: "inversao",
    topico: "harmonia-funcional",
    pergunta: "Em uma triade, quando a quinta esta no baixo, temos:",
    opcoes: ["Estado fundamental", "Primeira inversao", "Segunda inversao", "Acorde sus4"],
    resposta: 2,
    explicacoes: [
      "Incorreto. Estado fundamental tem a fundamental no baixo.",
      "Incorreto. Primeira inversao tem a terca no baixo.",
      "Correto. Quinta no baixo caracteriza segunda inversao.",
      "Incorreto. Sus4 e outra estrutura intervalar.",
    ],
  },
  {
    nivel: "medio",
    tema: "harmonia",
    subtema: "cadencia",
    topico: "harmonia-funcional",
    pergunta: "Em C maior, qual progressao exemplifica melhor uma preparacao cadencial sem resolucao final?",
    opcoes: ["II - V", "V - I", "IV - I", "V - VI"],
    resposta: 0,
    explicacoes: [
      "Correto. II-V prepara fortemente a resolucao, mas sem o I nao fecha plenamente.",
      "Incorreto. V-I ja representa fechamento tonal.",
      "Incorreto. IV-I tambem traz sensacao conclusiva (plagal).",
      "Incorreto. V-VI e deceptiva, nao apenas preparacao.",
    ],
  },
  {
    nivel: "dificil",
    tema: "harmonia",
    subtema: "dominante_secundaria",
    topico: "harmonia-funcional",
    pergunta: "Na tonalidade de C maior, o acorde D7 e normalmente analisado como:",
    opcoes: ["V/IV", "V/V", "II7 diatonico", "SubV de I"],
    resposta: 1,
    explicacoes: [
      "Incorreto. V/IV seria dominante de F (C7).",
      "Correto. D7 funciona como dominante de G, portanto V/V.",
      "Incorreto. Em C maior, o II diatonico e Dm7, nao D7.",
      "Incorreto. SubV de I seria Db7 em linguagem de substituicao tritonal.",
    ],
  },
  {
    nivel: "dificil",
    tema: "harmonia",
    subtema: "analise",
    topico: "harmonia-funcional",
    pergunta: "Na progressao C - A7 - Dm - G - C, a funcao de A7 e:",
    opcoes: ["Dominante secundaria do II", "Emprestimo modal", "Tonica relativa", "Subdominante menor"],
    resposta: 0,
    explicacoes: [
      "Correto. A7 aponta para Dm, atuando como V/II.",
      "Incorreto. O comportamento principal aqui e de dominante secundaria.",
      "Incorreto. A7 nao exerce papel de tonica relativa.",
      "Incorreto. Nao e classificado como subdominante menor nesse contexto.",
    ],
  },
  {
    nivel: "dificil",
    tema: "harmonia",
    subtema: "emprestimo_modal",
    topico: "harmonia-funcional",
    pergunta: "Em C maior, o acorde Bb em C - Bb - F sugere principalmente:",
    opcoes: ["Modulacao imediata para Bb maior", "Emprestimo modal do modo menor paralelo", "Dominante secundaria de G", "Acorde de passagem cromatica sem funcao"],
    resposta: 1,
    explicacoes: [
      "Incorreto. O uso isolado de Bb nao obriga modulacao completa.",
      "Correto. Bb e tipico de emprestimo modal de C menor.",
      "Incorreto. Dominante secundaria de G seria D ou D7.",
      "Incorreto. Embora possa ter cromatismo, ha funcao contextual clara no emprestimo modal.",
    ],
  },
  {
    nivel: "dificil",
    tema: "harmonia",
    subtema: "cadencia",
    topico: "harmonia-funcional",
    pergunta: "Qual descricao define melhor a forca da cadencia autentica perfeita?",
    opcoes: ["Resolucao fraca por ausencia de dominante", "Movimento IV-I com fechamento liturgico", "Resolucao V-I com maior tensao e relaxamento tonal", "Troca de centro tonal sem relacao funcional"],
    resposta: 2,
    explicacoes: [
      "Incorreto. A cadencia autentica depende da dominante.",
      "Incorreto. Essa descricao corresponde a cadencia plagal.",
      "Correto. V-I concentra tensao dominante e resolucao completa na tonica.",
      "Incorreto. Isso descreve modulacao, nao cadencia autentica.",
    ],
  },
  {
    nivel: "dificil",
    tema: "harmonia",
    subtema: "analise",
    topico: "harmonia-funcional",
    pergunta: "Em C maior, a progressao C - F - Dm - G - C pode ser lida, respectivamente, como:",
    opcoes: ["T - SD - SD - D - T", "T - D - SD - D - T", "T - Trel - SD - D - T", "SD - T - D - SD - T"],
    resposta: 0,
    explicacoes: [
      "Correto. C (T), F (SD), Dm (SD), G (D), C (T) compoem um percurso funcional coerente.",
      "Incorreto. F nao exerce funcao dominante nesse contexto tonal.",
      "Incorreto. Nao ha tonica relativa nessa sequencia especifica.",
      "Incorreto. A progressao nao inicia em subdominante.",
    ],
  },
  {
    nivel: "dificil",
    tema: "harmonia",
    subtema: "dominante_secundaria",
    topico: "harmonia-funcional",
    pergunta: "Na tonalidade de G maior, qual acorde representa V/VI?",
    opcoes: ["B", "C#", "D", "E"],
    resposta: 0,
    explicacoes: [
      "Correto. VI em G maior e Em; o dominante de Em e B (ou B7).",
      "Incorreto. C# nao cumpre a funcao dominante de Em nesse caso.",
      "Incorreto. D e V de G, nao V/VI.",
      "Incorreto. E e o proprio centro de chegada, nao seu dominante.",
    ],
  },
  {
    nivel: "dificil",
    tema: "harmonia",
    subtema: "cadencia",
    topico: "harmonia-funcional",
    pergunta: "Qual alternativa descreve corretamente a diferenca entre cadencia perfeita e cadencia plagal?",
    opcoes: [
      "Perfeita e IV-I; plagal e V-I",
      "Perfeita tende a maior tensao-resolucao; plagal tende a resolucao mais suave",
      "Perfeita ocorre apenas no modo menor; plagal apenas no maior",
      "Nao ha diferenca funcional entre elas"
    ],
    resposta: 1,
    explicacoes: [
      "Incorreto. A relacao esta invertida.",
      "Correto. V-I tende ao fechamento mais forte; IV-I produz conclusao mais branda.",
      "Incorreto. Ambas podem ocorrer em diferentes contextos tonais.",
      "Incorreto. Ha diferenca clara de funcao e percepcao cadencial.",
    ],
  },
  {
    nivel: "dificil",
    tema: "harmonia",
    subtema: "acordes",
    topico: "harmonia-funcional",
    pergunta: "Uma tetrade dominante (X7) e caracterizada por:",
    opcoes: [
      "Terca menor e setima maior",
      "Terca maior e setima menor",
      "Terca menor e quinta aumentada",
      "Terca maior e setima maior"
    ],
    resposta: 1,
    explicacoes: [
      "Incorreto. Essa combinacao nao define o acorde dominante tradicional.",
      "Correto. A estrutura de dominante 7 contem terca maior e setima menor.",
      "Incorreto. Essa descricao nao corresponde ao modelo de dominante 7 funcional.",
      "Incorreto. Terca maior e setima maior definem acorde maior com setima maior.",
    ],
  },
  {
    nivel: "dificil",
    tema: "harmonia",
    subtema: "modulacao",
    topico: "harmonia-funcional",
    pergunta: "Em analise tonal, o principal indicio de modulacao consolidada e:",
    opcoes: [
      "Uso de um unico acorde cromatico isolado",
      "Aparicao de dominante e tonica confirmando novo centro",
      "Presenca obrigatoria de cadencia plagal",
      "Mudanca de andamento"
    ],
    resposta: 1,
    explicacoes: [
      "Incorreto. Um acorde cromatico sozinho pode ser apenas coloracao local.",
      "Correto. A confirmacao do novo centro geralmente envolve funcao dominante-tonica da nova tonalidade.",
      "Incorreto. Plagal nao e requisito para consolidar modulacao.",
      "Incorreto. Andamento e parametro temporal, nao prova de modulacao tonal.",
    ],
  },
  {
    nivel: "dificil",
    tema: "harmonia",
    subtema: "emprestimo_modal",
    topico: "harmonia-funcional",
    pergunta: "No contexto de C maior, o acorde Eb maior e melhor interpretado como:",
    opcoes: [
      "Acorde diatonico do campo maior",
      "Emprestimo modal do paralelo menor",
      "Dominante secundaria de Am",
      "Substituicao tritonal de G7"
    ],
    resposta: 1,
    explicacoes: [
      "Incorreto. Eb nao pertence ao campo harmonico diatonico de C maior.",
      "Correto. Eb pode ser explicado como emprestimo do modo menor paralelo.",
      "Incorreto. Dominante de Am seria E (ou E7).",
      "Incorreto. Substituicao tritonal de G7 seria Db7.",
    ],
  },
  {
    nivel: "dificil",
    tema: "harmonia",
    subtema: "analise",
    topico: "harmonia-funcional",
    pergunta: "Em C maior, qual leitura funcional melhor descreve a progressao C - Am - F - G?",
    opcoes: ["T - Trel - SD - D", "T - SD - Trel - D", "SD - T - D - T", "T - D - SD - T"],
    resposta: 0,
    explicacoes: [
      "Correto. C (T), Am (Trel), F (SD), G (D) formam encadeamento funcional classico.",
      "Incorreto. Am nao desempenha papel de subdominante nesse contexto.",
      "Incorreto. A progressao nao inicia em subdominante.",
      "Incorreto. G nao aparece em posicao final de resolucao para tonica nessa sequencia.",
    ],
  },
  {
    nivel: "medio",
    tema: "harmonia",
    subtema: "analise",
    topico: "harmonia-funcional",
    pergunta: "Na tonalidade de A maior, qual acorde exerce funcao dominante?",
    opcoes: ["D", "E", "F#m", "C#m"],
    resposta: 1,
    explicacoes: [
      "Incorreto. D e IV grau (subdominante).",
      "Correto. E e V grau em A maior, com funcao dominante.",
      "Incorreto. F#m e VI grau.",
      "Incorreto. C#m e III grau.",
    ],
  },
  {
    nivel: "medio",
    tema: "harmonia",
    subtema: "campo_harmonico",
    topico: "harmonia-funcional",
    pergunta: "Em G maior, qual acorde corresponde ao VII grau diatonico?",
    opcoes: ["F#m", "A", "F#dim", "Em"],
    resposta: 2,
    explicacoes: [
      "Incorreto. F#m e acorde do VII em campo menor harmonico, nao no maior diatonico.",
      "Incorreto. A e II grau em G maior.",
      "Correto. No campo maior, o VII grau forma acorde diminuto (F#dim).",
      "Incorreto. Em e VI grau.",
    ],
  },
  {
    nivel: "medio",
    tema: "harmonia",
    subtema: "inversao",
    topico: "harmonia-funcional",
    pergunta: "No cifrado de inversoes de triades, I6 geralmente indica:",
    opcoes: ["Estado fundamental", "Primeira inversao", "Segunda inversao", "Acorde com setima"],
    resposta: 1,
    explicacoes: [
      "Incorreto. Estado fundamental nao recebe 6.",
      "Correto. O numero 6 indica primeira inversao da triade.",
      "Incorreto. Segunda inversao e normalmente indicada por 6/4.",
      "Incorreto. Setima exige outras indicacoes intervalares.",
    ],
  },
  {
    nivel: "medio",
    tema: "harmonia",
    subtema: "cadencia",
    topico: "harmonia-funcional",
    pergunta: "Qual sequencia melhor representa uma semicadencia em C maior?",
    opcoes: ["I - V", "V - I", "IV - I", "V - VI"],
    resposta: 0,
    explicacoes: [
      "Correto. A semicadencia termina em dominante, deixando expectativa de continuacao.",
      "Incorreto. V-I e fechamento autentico, nao semicadencial.",
      "Incorreto. IV-I e fechamento plagal.",
      "Incorreto. V-VI e resolucao deceptiva.",
    ],
  },
  {
    nivel: "facil",
    tema: "harmonia",
    subtema: "funcao",
    topico: "harmonia-funcional",
    pergunta: "Qual funcao harmonica tende a criar maior expectativa de resolucao?",
    opcoes: ["Tonica", "Subdominante", "Dominante", "Relativa"],
    resposta: 2,
    explicacoes: [
      "Incorreto. Tonica satisfaz a resolucao.",
      "Incorreto. Subdominante prepara, mas nao maximiza a tensao.",
      "Correto. Dominante concentra tensao e pede retorno para a tonica.",
      "Incorreto. Relativa nao e funcao principal de tensao maxima.",
    ],
  },
  {
    nivel: "facil",
    tema: "harmonia",
    subtema: "campo_harmonico",
    topico: "harmonia-funcional",
    pergunta: "Na tonalidade de C maior, qual acorde e o III grau?",
    opcoes: ["Dm", "Em", "F", "Am"],
    resposta: 1,
    explicacoes: [
      "Incorreto. Dm e II grau.",
      "Correto. Em e o III grau em C maior.",
      "Incorreto. F e IV grau.",
      "Incorreto. Am e VI grau.",
    ],
  },
];

perguntas.push(...harmonia_extra);

const historia_unidades = [
  // UNIDADE 1 (FACIL): Antiguidade, Idade Media e fundamentos historicos
  {
    nivel: "facil",
    tema: "historia",
    subtema: "unidade1",
    topico: "historia-da-musica",
    pergunta: "Qual principal caracteristica do canto gregoriano medieval?",
    opcoes: ["Polifonia com varias vozes independentes", "Monodia vocal liturgica em latim", "Uso predominante de instrumentos de percussao", "Harmonia tonal funcional completa"],
    resposta: 1,
    explicacoes: [
      "Incorreto. A polifonia surge depois como desenvolvimento historico.",
      "Correto. O canto gregoriano e monodico, religioso e em latim.",
      "Incorreto. O foco era vocal liturgico, nao percussivo.",
      "Incorreto. O sistema tonal funcional e posterior.",
    ],
  },
  {
    nivel: "facil",
    tema: "historia",
    subtema: "unidade1",
    topico: "historia-da-musica",
    pergunta: "O organum e importante historicamente por: ",
    opcoes: ["Introduzir o jazz na Europa", "Representar uma forma inicial de polifonia", "Ser a primeira sinfonia escrita", "Substituir completamente o canto religioso"],
    resposta: 1,
    explicacoes: [
      "Incorreto. Jazz e seculo XX.",
      "Correto. O organum amplia a monodia com voces adicionais.",
      "Incorreto. Sinfonia e genero muito posterior.",
      "Incorreto. O contexto continua liturgico.",
    ],
  },
  {
    nivel: "facil",
    tema: "historia",
    subtema: "unidade1",
    topico: "historia-da-musica",
    pergunta: "A Escola de Notre-Dame ficou associada principalmente a:",
    opcoes: ["Musica eletronica", "Consolidacao da polifonia medieval", "Opera italiana do seculo XIX", "Serialismo integral"],
    resposta: 1,
    explicacoes: [
      "Incorreto. Musica eletronica e contemporanea.",
      "Correto. Notre-Dame foi central para o desenvolvimento polifonico.",
      "Incorreto. Opera italiana e muito posterior.",
      "Incorreto. Serialismo e seculo XX.",
    ],
  },
  {
    nivel: "facil",
    tema: "historia",
    subtema: "unidade1",
    topico: "historia-da-musica",
    pergunta: "No contexto medieval, moteto e geralmente: ",
    opcoes: ["Peca para uma voz e violao", "Forma polifonica com possiveis textos diferentes simultaneos", "Danca instrumental barroca", "Forma classica de sonata"],
    resposta: 1,
    explicacoes: [
      "Incorreto. Essa descricao nao caracteriza o moteto medieval.",
      "Correto. O moteto medieval pode sobrepor textos e vozes.",
      "Incorreto. Nao e uma danca barroca.",
      "Incorreto. Forma-sonata e periodo classico.",
    ],
  },
  {
    nivel: "facil",
    tema: "historia",
    subtema: "unidade1",
    topico: "historia-da-musica",
    pergunta: "Em termos amplos, a transicao da monodia para a polifonia indica:",
    opcoes: ["Reducao de complexidade musical", "Maior elaboracao estrutural das composicoes", "Fim da musica religiosa", "Desaparecimento da escrita musical"],
    resposta: 1,
    explicacoes: [
      "Incorreto. A tendencia geral e de aumento de complexidade.",
      "Correto. A polifonia amplia as possibilidades de organizacao sonora.",
      "Incorreto. A musica religiosa continua central por longo periodo.",
      "Incorreto. A escrita musical se desenvolve, nao desaparece.",
    ],
  },
  {
    nivel: "facil",
    tema: "historia",
    subtema: "unidade1",
    topico: "historia-da-musica",
    pergunta: "Qual idioma predominava no repertorio liturgico medieval ocidental?",
    opcoes: ["Italiano", "Frances", "Latim", "Alemao"],
    resposta: 2,
    explicacoes: [
      "Incorreto. Nao era o idioma liturgico dominante no periodo.",
      "Incorreto. Tambem nao era o principal idioma liturgico.",
      "Correto. O latim foi a lingua central da liturgia ocidental medieval.",
      "Incorreto. Nao era o idioma liturgico predominante.",
    ],
  },
  {
    nivel: "facil",
    tema: "historia",
    subtema: "unidade1",
    topico: "historia-da-musica",
    pergunta: "A principal funcao social da musica liturgica medieval era:",
    opcoes: ["Entretenimento de corte", "Acompanhamento de cinema mudo", "Servico religioso e ritual", "Trilha sonora de teatro moderno"],
    resposta: 2,
    explicacoes: [
      "Incorreto. Essa funcao e mais ligada a repertorios profanos/cortes.",
      "Incorreto. Cinema e modernidade.",
      "Correto. A musica liturgica servia diretamente ao culto.",
      "Incorreto. Teatro moderno nao corresponde ao contexto medieval.",
    ],
  },
  {
    nivel: "facil",
    tema: "historia",
    subtema: "unidade1",
    topico: "historia-da-musica",
    pergunta: "Qual afirmacao resume melhor a importancia historica da Idade Media para a musica ocidental?",
    opcoes: ["Nao deixou legado para periodos seguintes", "Consolidou bases da notacao e da polifonia", "Criou a forma sonata classica", "Estabeleceu o dodecafonismo"],
    resposta: 1,
    explicacoes: [
      "Incorreto. O legado medieval e fundamental.",
      "Correto. Notacao e polifonia medieval influenciam toda a tradicao posterior.",
      "Incorreto. Forma-sonata e posterior.",
      "Incorreto. Dodecafonismo e seculo XX.",
    ],
  },
  {
    nivel: "facil",
    tema: "historia",
    subtema: "unidade1",
    topico: "historia-da-musica",
    pergunta: "O termo monodia descreve: ",
    opcoes: ["Musica com muitas vozes independentes", "Uma unica linha melodica principal", "Apenas musica instrumental", "Acordes complexos de jazz"],
    resposta: 1,
    explicacoes: [
      "Incorreto. Isso descreve polifonia.",
      "Correto. Monodia e uma unica linha melodica.",
      "Incorreto. Monodia pode ser vocal e nao se restringe ao instrumental.",
      "Incorreto. Nao e definicao de monodia.",
    ],
  },
  {
    nivel: "facil",
    tema: "historia",
    subtema: "unidade1",
    topico: "historia-da-musica",
    pergunta: "Comparando monodia e polifonia, a polifonia se destaca por:",
    opcoes: ["Eliminar qualquer relacao entre vozes", "Sobrepor vozes de modo organizado", "Abandonar completamente a melodia", "Proibir o uso de texto"],
    resposta: 1,
    explicacoes: [
      "Incorreto. A relacao entre vozes e precisamente organizada.",
      "Correto. Esse e o principio central da escrita polifonica.",
      "Incorreto. A melodia permanece, agora em textura mais complexa.",
      "Incorreto. Muitos repertorios polifonicos sao vocais com texto.",
    ],
  },

  // UNIDADE 2 (MEDIO): Renascimento, Barroco, Classico e Romantico
  {
    nivel: "medio",
    tema: "historia",
    subtema: "unidade2",
    topico: "historia-da-musica",
    pergunta: "No Renascimento, qual traco e frequentemente associado a escrita vocal sacra?",
    opcoes: ["Monodia acompanhada de sintetizador", "Polifonia imitativa equilibrada", "Serialismo dodecafonico", "Predominio de forma-sonata"],
    resposta: 1,
    explicacoes: [
      "Incorreto. Essa descricao e anacronica.",
      "Correto. A imitacao entre vozes e marca importante do periodo.",
      "Incorreto. Dodecafonismo e seculo XX.",
      "Incorreto. Forma-sonata se consolida depois.",
    ],
  },
  {
    nivel: "medio",
    tema: "historia",
    subtema: "unidade2",
    topico: "historia-da-musica",
    pergunta: "No Barroco, o baixo continuo teve papel de:",
    opcoes: ["Eliminar a harmonia", "Sustentar a base harmonica da textura", "Substituir toda a melodia", "Padronizar apenas musica coral a cappella"],
    resposta: 1,
    explicacoes: [
      "Incorreto. O baixo continuo justamente reforca o pensamento harmonico.",
      "Correto. Ele oferece alicerce harmonico e direcionalidade tonal.",
      "Incorreto. Nao substitui a melodia.",
      "Incorreto. O uso nao se limita a coral a cappella.",
    ],
  },
  {
    nivel: "medio",
    tema: "historia",
    subtema: "unidade2",
    topico: "historia-da-musica",
    pergunta: "Qual compositor e exemplar do Barroco tardio e do contraponto?",
    opcoes: ["Debussy", "Chopin", "J. S. Bach", "Stravinsky"],
    resposta: 2,
    explicacoes: [
      "Incorreto. Debussy e associado ao impressionismo.",
      "Incorreto. Chopin e romantico.",
      "Correto. Bach e referencia em contraponto e escrita barroca.",
      "Incorreto. Stravinsky e moderno.",
    ],
  },
  {
    nivel: "medio",
    tema: "historia",
    subtema: "unidade2",
    topico: "historia-da-musica",
    pergunta: "No Classicismo, um ideal estilistico recorrente e:",
    opcoes: ["Textura sempre densa e cromatica extrema", "Clareza formal e equilibrio de frases", "Abandono da periodicidade", "Negacao de estruturas tonais"],
    resposta: 1,
    explicacoes: [
      "Incorreto. Isso nao resume o ideal classico.",
      "Correto. O periodo valoriza equilibrio, simetria e inteligibilidade formal.",
      "Incorreto. A periodicidade e frequentemente importante.",
      "Incorreto. O tonalismo segue central.",
    ],
  },
  {
    nivel: "medio",
    tema: "historia",
    subtema: "unidade2",
    topico: "historia-da-musica",
    pergunta: "A opera 'A Flauta Magica' e tradicionalmente associada a:",
    opcoes: ["Mozart e ao fim do seculo XVIII", "Verdi e ao verismo italiano", "Wagner e ao drama musical tardio", "Monteverdi e ao primeiro barroco"],
    resposta: 0,
    explicacoes: [
      "Correto. A obra e de Mozart e pertence ao contexto classico tardio.",
      "Incorreto. Nao corresponde ao compositor nem ao estilo da obra.",
      "Incorreto. Nao pertence ao universo wagneriano.",
      "Incorreto. Monteverdi e anterior a esse repertorio.",
    ],
  },
  {
    nivel: "medio",
    tema: "historia",
    subtema: "unidade2",
    topico: "historia-da-musica",
    pergunta: "No Romantismo, qual tendencia aparece com frequencia?",
    opcoes: ["Expressividade subjetiva e ampliacao harmonica", "Retorno obrigatorio a monodia medieval", "Rejeicao total da dinamica", "Desaparecimento da orquestra"],
    resposta: 0,
    explicacoes: [
      "Correto. A linguagem romantica amplia contraste, cromatismo e subjetividade.",
      "Incorreto. Nao e caracteristica do periodo.",
      "Incorreto. Dinamica e recurso expressivo importante.",
      "Incorreto. A orquestra se expande no seculo XIX.",
    ],
  },
  {
    nivel: "medio",
    tema: "historia",
    subtema: "unidade2",
    topico: "historia-da-musica",
    pergunta: "Chopin e historicamente associado principalmente a:",
    opcoes: ["Musica medieval sacra", "Piano romantico e miniaturas poeticas", "Opera barroca francesa", "Minimalismo pos-moderno"],
    resposta: 1,
    explicacoes: [
      "Incorreto. Nao corresponde ao repertorio de Chopin.",
      "Correto. Seu catalogo para piano e central no romantismo.",
      "Incorreto. Nao e a principal associacao historica de Chopin.",
      "Incorreto. Minimalismo e posterior.",
    ],
  },
  {
    nivel: "medio",
    tema: "historia",
    subtema: "unidade2",
    topico: "historia-da-musica",
    pergunta: "Qual obra e frequentemente usada para exemplificar fuga barroca?",
    opcoes: ["Clair de Lune", "O Cravo Bem Temperado", "Sagração da Primavera", "Bolero"],
    resposta: 1,
    explicacoes: [
      "Incorreto. Clair de Lune e repertorio impressionista.",
      "Correto. O Cravo Bem Temperado e referencia em preludeos e fugas.",
      "Incorreto. Sagracao e obra modernista do seculo XX.",
      "Incorreto. Bolero pertence a outro contexto estilistico.",
    ],
  },
  {
    nivel: "medio",
    tema: "historia",
    subtema: "unidade2",
    topico: "historia-da-musica",
    pergunta: "A passagem do Barroco para o Classico envolve, em linhas gerais:",
    opcoes: ["Maior simplificacao textural e clareza formal", "Abandono da forma em favor de improvisacao total", "Substituicao da orquestra por voz solo", "Fim da tonalidade"],
    resposta: 0,
    explicacoes: [
      "Correto. A textura tende a maior transparencia e desenho formal mais claro.",
      "Incorreto. A escrita formal permanece central.",
      "Incorreto. A orquestra continua e se consolida.",
      "Incorreto. A tonalidade segue estruturante.",
    ],
  },
  {
    nivel: "medio",
    tema: "historia",
    subtema: "unidade2",
    topico: "historia-da-musica",
    pergunta: "Entre os compositores abaixo, qual pertence ao Renascimento?",
    opcoes: ["Palestrina", "Beethoven", "Mahler", "Ravel"],
    resposta: 0,
    explicacoes: [
      "Correto. Palestrina e referencia da polifonia renascentista.",
      "Incorreto. Beethoven e classico-romantico.",
      "Incorreto. Mahler e romantico tardio.",
      "Incorreto. Ravel e moderno/inicio do seculo XX.",
    ],
  },

  // UNIDADE 3 (DIFICIL): Seculos XIX-XX, modernismos e leitura critica
  {
    nivel: "dificil",
    tema: "historia",
    subtema: "unidade3",
    topico: "historia-da-musica",
    pergunta: "No impressionismo musical, uma caracteristica recorrente e:",
    opcoes: ["Predominio de periodos simetricos classicos estritos", "Exploracao timbrica, modos e ambiguidade tonal", "Uso exclusivo de fuga bachiana", "Rejeicao completa de dinamicas"],
    resposta: 1,
    explicacoes: [
      "Incorreto. Essa descricao nao captura a linguagem impressionista.",
      "Correto. Cor sonora e ambiguidade harmonica sao traços marcantes.",
      "Incorreto. Nao e o nucleo estetico do impressionismo.",
      "Incorreto. Dinamica continua relevante.",
    ],
  },
  {
    nivel: "dificil",
    tema: "historia",
    subtema: "unidade3",
    topico: "historia-da-musica",
    pergunta: "Debussy e historicamente associado a qual movimento?",
    opcoes: ["Minimalismo", "Impressionismo", "Barroco", "Classicismo vienense"],
    resposta: 1,
    explicacoes: [
      "Incorreto. Minimalismo e movimento posterior.",
      "Correto. Debussy e referencia central do impressionismo musical.",
      "Incorreto. Barroco e muito anterior.",
      "Incorreto. Nao pertence ao classicismo vienense.",
    ],
  },
  {
    nivel: "dificil",
    tema: "historia",
    subtema: "unidade3",
    topico: "historia-da-musica",
    pergunta: "Ate que ponto a ruptura modernista do seculo XX pode ser compreendida como continuidade historica?",
    opcoes: ["Nao ha qualquer relacao com o passado", "Ha ruptura e continuidade: novas tecnicas dialogam com tradicoes anteriores", "E apenas repeticao literal do romantismo", "Depende somente do uso de instrumentos eletricos"],
    resposta: 1,
    explicacoes: [
      "Incorreto. A historia musical raramente opera por corte absoluto.",
      "Correto. Muitos modernismos reinterpretam materiais historicos sob nova perspectiva.",
      "Incorreto. O modernismo nao e mera repeticao romantica.",
      "Incorreto. O fenomeno e mais amplo que a instrumentacao.",
    ],
  },
  {
    nivel: "dificil",
    tema: "historia",
    subtema: "unidade3",
    topico: "historia-da-musica",
    pergunta: "No estudo historico-estilistico, chamar um repertorio de 'barroco' implica considerar:",
    opcoes: ["Apenas a data de composicao", "Somente a nacionalidade do compositor", "Conjunto de praticas esteticas, formais e contextuais", "Exclusivamente o tipo de instrumento usado"],
    resposta: 2,
    explicacoes: [
      "Incorreto. Data ajuda, mas nao esgota a definicao.",
      "Incorreto. Nacionalidade isolada nao define estilo.",
      "Correto. A classificacao historica envolve linguagem, funcao social e contexto.",
      "Incorreto. Instrumentacao isolada e criterio insuficiente.",
    ],
  },
  {
    nivel: "dificil",
    tema: "historia",
    subtema: "unidade3",
    topico: "historia-da-musica",
    pergunta: "A expressao 'musica absoluta' no seculo XIX relaciona-se, em geral, a:",
    opcoes: ["Musica com programa narrativo explicito", "Musica autonomizada, sem dependencia de enredo externo", "Musica liturgica medieval", "Opera bufa italiana"],
    resposta: 1,
    explicacoes: [
      "Incorreto. Isso se aproxima da musica programatica.",
      "Correto. O conceito enfatiza a logica interna da forma musical.",
      "Incorreto. Nao corresponde ao debate estetico oitocentista.",
      "Incorreto. Opera bufa e outra categoria historica.",
    ],
  },
  {
    nivel: "dificil",
    tema: "historia",
    subtema: "unidade3",
    topico: "historia-da-musica",
    pergunta: "A oposicao entre musica programatica e musica absoluta, no romantismo, mostra principalmente:",
    opcoes: ["Uma disputa sobre o papel semantico da musica", "Um debate sobre afinacao temperada", "A proibicao de musica instrumental", "A rejeicao da orquestra sinfonica"],
    resposta: 0,
    explicacoes: [
      "Correto. O debate envolve significado, forma e referencia extramusical.",
      "Incorreto. Afinacao nao e o eixo principal dessa oposicao.",
      "Incorreto. A musica instrumental segue central no periodo.",
      "Incorreto. A orquestra se fortalece no romantismo.",
    ],
  },
  {
    nivel: "dificil",
    tema: "historia",
    subtema: "unidade3",
    topico: "historia-da-musica",
    pergunta: "Do ponto de vista historiografico, periodizacoes como 'Barroco', 'Classico' e 'Romantico' devem ser entendidas como:",
    opcoes: ["Categorias fixas e universais sem excecoes", "Ferramentas analiticas uteis, mas historicamente porosas", "Nomes de instrumentos antigos", "Subgeneros exclusivos de opera"],
    resposta: 1,
    explicacoes: [
      "Incorreto. Fronteiras entre periodos sao mais fluidas na pratica.",
      "Correto. Sao modelos interpretativos, nao caixas rigidas.",
      "Incorreto. Nao se trata de nomenclatura instrumental.",
      "Incorreto. Nao sao subgeneros operisticos.",
    ],
  },
  {
    nivel: "dificil",
    tema: "historia",
    subtema: "unidade3",
    topico: "historia-da-musica",
    pergunta: "No seculo XX, a ampliacao do conceito de material musical inclui:",
    opcoes: ["Apenas acordes tonais tradicionais", "Exploracao de timbre, ruido, modos de execucao e novas tecnologias", "Retorno obrigatorio ao cantochao", "Eliminacao de toda notacao"],
    resposta: 1,
    explicacoes: [
      "Incorreto. O repertorio moderno amplia bastante os materiais.",
      "Correto. A modernidade sonora envolve novas fontes e tecnicas composicionais.",
      "Incorreto. Nao ha obrigacao de retorno ao cantochao.",
      "Incorreto. A notacao se transforma, mas nao desaparece por completo.",
    ],
  },
  {
    nivel: "dificil",
    tema: "historia",
    subtema: "unidade3",
    topico: "historia-da-musica",
    pergunta: "Uma leitura conservatorial de estilo historico exige, alem de datas, observar:",
    opcoes: ["Somente biografia do compositor", "Analise de linguagem, forma, performance e contexto", "Apenas numero de movimentos da obra", "Exclusivamente o pais de origem"],
    resposta: 1,
    explicacoes: [
      "Incorreto. Biografia e importante, mas insuficiente.",
      "Correto. A compreensao estilistica envolve varios niveis de analise.",
      "Incorreto. Numero de movimentos isolado nao define estilo.",
      "Incorreto. Nacionalidade por si so nao resolve a classificacao.",
    ],
  },
  {
    nivel: "dificil",
    tema: "historia",
    subtema: "unidade3",
    topico: "historia-da-musica",
    pergunta: "Ao comparar Bach e Debussy, a principal diferenca historico-estetica esta em:",
    opcoes: ["Bach e vocal; Debussy apenas instrumental", "Contextos estilisticos distintos: barroco contrapontistico vs colorismo moderno", "Bach e do seculo XX; Debussy do XVIII", "Ambos pertencem ao mesmo estilo e periodo"],
    resposta: 1,
    explicacoes: [
      "Incorreto. A oposicao vocal/instrumental nao descreve bem essa comparacao.",
      "Correto. Eles representam universos esteticos e historicos distintos.",
      "Incorreto. As periodizacoes estao invertidas.",
      "Incorreto. Nao pertencem ao mesmo periodo/estilo.",
    ],
  },
];

perguntas.push(...historia_unidades);

const harmonia_extra_2 = [
  {
    nivel: "facil",
    tema: "harmonia",
    subtema: "funcao",
    topico: "harmonia-funcional",
    pergunta: "Em uma progressao tonal simples, qual funcao tende a encerrar com sensacao de repouso?",
    opcoes: ["Dominante", "Subdominante", "Tonica", "Sensivel"],
    resposta: 2,
    explicacoes: [
      "Incorreto. Dominante cria tensao e expectativa.",
      "Incorreto. Subdominante prepara o movimento para a dominante.",
      "Correto. A tonica e o principal polo de repouso tonal.",
      "Incorreto. Sensivel aponta para a tonica, mas nao encerra por si so.",
    ],
  },
  {
    nivel: "facil",
    tema: "harmonia",
    subtema: "graus",
    topico: "harmonia-funcional",
    pergunta: "Na tonalidade de G maior, qual acorde representa a tonica?",
    opcoes: ["C", "D", "G", "Em"],
    resposta: 2,
    explicacoes: [
      "Incorreto. C e IV grau em G maior.",
      "Incorreto. D e V grau.",
      "Correto. G e o I grau (tonica).",
      "Incorreto. Em e VI grau.",
    ],
  },
  {
    nivel: "medio",
    tema: "harmonia",
    subtema: "analise",
    topico: "harmonia-funcional",
    pergunta: "Na progressao C - F - Dm - G - C, qual funcao exerce o acorde Dm?",
    opcoes: ["Dominante", "Tonica relativa", "Subdominante", "Sensivel"],
    resposta: 2,
    explicacoes: [
      "Incorreto. Dm nao tem funcao dominante principal em C maior.",
      "Incorreto. Dm e II grau, nao tonica relativa.",
      "Correto. II grau atua como predominante/subdominante.",
      "Incorreto. Sensivel e associada ao VII grau.",
    ],
  },
  {
    nivel: "medio",
    tema: "harmonia",
    subtema: "cadencia",
    topico: "harmonia-funcional",
    pergunta: "Em D maior, qual sequencia representa uma cadencia perfeita?",
    opcoes: ["G - D", "A - D", "A - Bm", "Em - A"],
    resposta: 1,
    explicacoes: [
      "Incorreto. G-D e plagal (IV-I).",
      "Correto. A-D corresponde a V-I em D maior.",
      "Incorreto. A-Bm tende a leitura deceptiva (V-VI).",
      "Incorreto. Em-A e preparacao (II-V), sem resolucao final.",
    ],
  },
  {
    nivel: "dificil",
    tema: "harmonia",
    subtema: "dominante_secundaria",
    topico: "harmonia-funcional",
    pergunta: "Na tonalidade de C maior, qual acorde pode ser analisado como V/III?",
    opcoes: ["B", "E", "F#", "C#"],
    resposta: 0,
    explicacoes: [
      "Correto. III grau em C maior e Em; o dominante de Em e B (ou B7).",
      "Incorreto. E e V/VI (de Am).",
      "Incorreto. F# nao exerce V/III nesse contexto diatonico funcional.",
      "Incorreto. C# tambem nao corresponde a V/III aqui.",
    ],
  },
  {
    nivel: "dificil",
    tema: "harmonia",
    subtema: "modulacao",
    topico: "harmonia-funcional",
    pergunta: "Qual sinal sugere mais fortemente uma modulacao para a dominante na tonalidade maior?",
    opcoes: ["Aparecimento de IV-I", "Uso insistente de V/V seguido de V-I na nova regiao", "Repeticao da tonica inicial", "Presenca de acorde diminuto isolado"],
    resposta: 1,
    explicacoes: [
      "Incorreto. IV-I sozinho nao comprova mudanca de centro tonal.",
      "Correto. Encadeamentos dominantes confirmando novo polo fortalecem leitura modulante.",
      "Incorreto. Isso tende a manter o centro original.",
      "Incorreto. Um acorde isolado pode ser apenas coloracao local.",
    ],
  },
];

const historia_unidades_2 = [
  {
    nivel: "facil",
    tema: "historia",
    subtema: "unidade1",
    topico: "historia-da-musica",
    pergunta: "Qual ambiente institucional foi central para a musica liturgica medieval ocidental?",
    opcoes: ["Catedral e mosteiro", "Teatro de opera moderno", "Estudio eletronico", "Clube de jazz"],
    resposta: 0,
    explicacoes: [
      "Correto. A producao liturgica medieval esteve fortemente ligada a instituicoes religiosas.",
      "Incorreto. Opera moderna pertence a outro contexto historico.",
      "Incorreto. Estudio eletronico e seculo XX em diante.",
      "Incorreto. Jazz e modernidade.",
    ],
  },
  {
    nivel: "facil",
    tema: "historia",
    subtema: "unidade1",
    topico: "historia-da-musica",
    pergunta: "No repertorio medieval inicial, a textura mais comum era:",
    opcoes: ["Monodica", "Politonal", "Dodecafonica", "Minimalista"],
    resposta: 0,
    explicacoes: [
      "Correto. A monodia foi predominante antes da consolidacao da polifonia.",
      "Incorreto. Politonalidade e conceito posterior.",
      "Incorreto. Dodecafonismo e seculo XX.",
      "Incorreto. Minimalismo e contemporaneo.",
    ],
  },
  {
    nivel: "medio",
    tema: "historia",
    subtema: "unidade2",
    topico: "historia-da-musica",
    pergunta: "No periodo classico, a sinfonia se consolida principalmente por meio de:",
    opcoes: ["Textura monodica liturgica", "Desenvolvimento formal e expansao da linguagem orquestral", "Rejeicao da tonalidade", "Uso exclusivo de coro"],
    resposta: 1,
    explicacoes: [
      "Incorreto. Essa descricao nao corresponde ao genero sinfonico classico.",
      "Correto. O classicismo consolida modelos formais e pratica orquestral.",
      "Incorreto. A tonalidade segue central no periodo.",
      "Incorreto. Sinfonia classica e majoritariamente instrumental.",
    ],
  },
  {
    nivel: "medio",
    tema: "historia",
    subtema: "unidade2",
    topico: "historia-da-musica",
    pergunta: "Qual afirmacao sobre o romantismo musical e mais adequada?",
    opcoes: ["Busca expressiva individual e ampliacao de recursos harmonicos", "Retorno estrito ao estilo medieval", "Neutralidade expressiva como ideal", "Uniformidade absoluta de formas"],
    resposta: 0,
    explicacoes: [
      "Correto. O romantismo valoriza subjetividade e expansao da linguagem.",
      "Incorreto. Nao define o nucleo do romantismo.",
      "Incorreto. O periodo tende a forte contraste expressivo.",
      "Incorreto. Ha variedade e flexibilidade formal significativa.",
    ],
  },
  {
    nivel: "dificil",
    tema: "historia",
    subtema: "unidade3",
    topico: "historia-da-musica",
    pergunta: "Na historiografia musical, o termo 'modernismo' e melhor entendido como:",
    opcoes: ["Um estilo unico e homogeneo", "Conjunto plural de propostas de ruptura e reinvencao", "Sinonomo de musica barroca", "Categoria restrita a musica eletronica"],
    resposta: 1,
    explicacoes: [
      "Incorreto. O modernismo inclui correntes diversas.",
      "Correto. Ha varios modernismos com estrategias esteticas distintas.",
      "Incorreto. Nao corresponde ao periodo barroco.",
      "Incorreto. Vai alem da eletronica.",
    ],
  },
  {
    nivel: "dificil",
    tema: "historia",
    subtema: "unidade3",
    topico: "historia-da-musica",
    pergunta: "Uma leitura conservatorial de obra historica evita anacronismo quando: ",
    opcoes: ["Julga repertorio antigo com criterios unicos atuais", "Considera tecnicas, contexto, escuta e convencoes do periodo", "Ignora fontes historicas", "Substitui analise por opiniao pessoal"],
    resposta: 1,
    explicacoes: [
      "Incorreto. Isso pode gerar distorcoes interpretativas.",
      "Correto. Contextualizar historicamente reduz anacronismos.",
      "Incorreto. Fontes sao essenciais para analise historica.",
      "Incorreto. Opiniao sem metodo nao sustenta leitura academica.",
    ],
  },
];

perguntas.push(...harmonia_extra_2);
perguntas.push(...historia_unidades_2);


const historia_balanceamento = [
  {
    "nivel": "facil",
    "tema": "historia",
    "subtema": "unidade1",
    "topico": "historia-da-musica",
    "pergunta": "Em qual periodo se situa a maior parte do repertorio de canto gregoriano?",
    "opcoes": [
      "Renascimento",
      "Idade Media",
      "Classico",
      "Romantico"
    ],
    "resposta": 1,
    "explicacoes": [
      "Incorreto. Renascimento nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Correto. Idade Media.",
      "Incorreto. Classico nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Romantico nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "facil",
    "tema": "historia",
    "subtema": "unidade1",
    "topico": "historia-da-musica",
    "pergunta": "A Escola de Notre-Dame pertence principalmente a qual contexto historico?",
    "opcoes": [
      "Idade Media",
      "Barroco",
      "Classico",
      "Seculo XX"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Idade Media.",
      "Incorreto. Barroco nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Classico nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Seculo XX nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "facil",
    "tema": "historia",
    "subtema": "unidade1",
    "topico": "historia-da-musica",
    "pergunta": "Qual pratica foi essencial para o surgimento da polifonia medieval?",
    "opcoes": [
      "Organum",
      "Serialismo",
      "Jazz modal",
      "Musica concreta"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Organum.",
      "Incorreto. Serialismo nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Jazz modal nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Musica concreta nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "facil",
    "tema": "historia",
    "subtema": "unidade1",
    "topico": "historia-da-musica",
    "pergunta": "No estudo historico, o moteto medieval e associado principalmente a:",
    "opcoes": [
      "Textura monodica simples",
      "Polifonia vocal",
      "Opera romantica",
      "Sinfonia classica"
    ],
    "resposta": 1,
    "explicacoes": [
      "Incorreto. Textura monodica simples nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Correto. Polifonia vocal.",
      "Incorreto. Opera romantica nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Sinfonia classica nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "facil",
    "tema": "historia",
    "subtema": "unidade1",
    "topico": "historia-da-musica",
    "pergunta": "Qual lingua era central na liturgia musical medieval ocidental?",
    "opcoes": [
      "Latim",
      "Italiano",
      "Alemao",
      "Ingles"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Latim.",
      "Incorreto. Italiano nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Alemao nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Ingles nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "facil",
    "tema": "historia",
    "subtema": "unidade1",
    "topico": "historia-da-musica",
    "pergunta": "No Renascimento, Palestrina e geralmente lembrado por:",
    "opcoes": [
      "Opera buffa",
      "Polifonia sacra",
      "Poema sinfonico",
      "Serialismo"
    ],
    "resposta": 1,
    "explicacoes": [
      "Incorreto. Opera buffa nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Correto. Polifonia sacra.",
      "Incorreto. Poema sinfonico nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Serialismo nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "facil",
    "tema": "historia",
    "subtema": "unidade1",
    "topico": "historia-da-musica",
    "pergunta": "A frase 'baixo continuo' remete principalmente ao periodo:",
    "opcoes": [
      "Barroco",
      "Idade Media",
      "Classico",
      "Impressionista"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Barroco.",
      "Incorreto. Idade Media nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Classico nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Impressionista nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "facil",
    "tema": "historia",
    "subtema": "unidade1",
    "topico": "historia-da-musica",
    "pergunta": "Qual compositor se destaca como referencia do Barroco tardio?",
    "opcoes": [
      "Debussy",
      "Bach",
      "Mahler",
      "Ravel"
    ],
    "resposta": 1,
    "explicacoes": [
      "Incorreto. Debussy nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Correto. Bach.",
      "Incorreto. Mahler nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Ravel nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "facil",
    "tema": "historia",
    "subtema": "unidade1",
    "topico": "historia-da-musica",
    "pergunta": "A obra 'O Cravo Bem Temperado' e associada a:",
    "opcoes": [
      "Mozart",
      "Bach",
      "Beethoven",
      "Chopin"
    ],
    "resposta": 1,
    "explicacoes": [
      "Incorreto. Mozart nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Correto. Bach.",
      "Incorreto. Beethoven nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Chopin nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "facil",
    "tema": "historia",
    "subtema": "unidade1",
    "topico": "historia-da-musica",
    "pergunta": "No Classicismo, uma caracteristica marcante e:",
    "opcoes": [
      "Clareza formal",
      "Atonalidade integral",
      "Improviso livre sem forma",
      "Ausencia de periodicidade"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Clareza formal.",
      "Incorreto. Atonalidade integral nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Improviso livre sem forma nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Ausencia de periodicidade nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "facil",
    "tema": "historia",
    "subtema": "unidade1",
    "topico": "historia-da-musica",
    "pergunta": "Mozart e historicamente vinculado sobretudo ao periodo:",
    "opcoes": [
      "Classico",
      "Barroco",
      "Romantico",
      "Medieval"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Classico.",
      "Incorreto. Barroco nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Romantico nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Medieval nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "facil",
    "tema": "historia",
    "subtema": "unidade1",
    "topico": "historia-da-musica",
    "pergunta": "No Romantismo, cresce a valorizacao de:",
    "opcoes": [
      "Expressividade subjetiva",
      "Monodia liturgica",
      "Estilo estritamente contrapontistico barroco",
      "Neutralidade timbrica"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Expressividade subjetiva.",
      "Incorreto. Monodia liturgica nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Estilo estritamente contrapontistico barroco nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Neutralidade timbrica nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "facil",
    "tema": "historia",
    "subtema": "unidade1",
    "topico": "historia-da-musica",
    "pergunta": "Chopin e lembrado principalmente por seu repertorio para:",
    "opcoes": [
      "Piano",
      "Orgao liturgico medieval",
      "Quarteto de cordas barroco",
      "Musica eletronica"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Piano.",
      "Incorreto. Orgao liturgico medieval nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Quarteto de cordas barroco nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Musica eletronica nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "facil",
    "tema": "historia",
    "subtema": "unidade1",
    "topico": "historia-da-musica",
    "pergunta": "Debussy costuma ser associado a:",
    "opcoes": [
      "Impressionismo",
      "Dodecafonismo inicial",
      "Ars Nova medieval",
      "Classicismo vienense"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Impressionismo.",
      "Incorreto. Dodecafonismo inicial nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Ars Nova medieval nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Classicismo vienense nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "facil",
    "tema": "historia",
    "subtema": "unidade1",
    "topico": "historia-da-musica",
    "pergunta": "No seculo XX, o conceito de material musical foi:",
    "opcoes": [
      "Ampliado",
      "Reduzido a escalas maiores",
      "Limitado a coro a cappella",
      "Fixado apenas no tonalismo"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Ampliado.",
      "Incorreto. Reduzido a escalas maiores nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Limitado a coro a cappella nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Fixado apenas no tonalismo nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "facil",
    "tema": "historia",
    "subtema": "unidade1",
    "topico": "historia-da-musica",
    "pergunta": "A expressao 'cadencia amen' historicamente lembra:",
    "opcoes": [
      "Cadencia plagal em repertorio liturgico",
      "Cadencia perfeita classica obrigatoria",
      "Final jazzistico moderno",
      "Formula serial"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Cadencia plagal em repertorio liturgico.",
      "Incorreto. Cadencia perfeita classica obrigatoria nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Final jazzistico moderno nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Formula serial nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "facil",
    "tema": "historia",
    "subtema": "unidade1",
    "topico": "historia-da-musica",
    "pergunta": "Qual periodo vem historicamente antes do Barroco?",
    "opcoes": [
      "Renascimento",
      "Romantico",
      "Classico",
      "Impressionismo"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Renascimento.",
      "Incorreto. Romantico nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Classico nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Impressionismo nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "facil",
    "tema": "historia",
    "subtema": "unidade1",
    "topico": "historia-da-musica",
    "pergunta": "Beethoven e geralmente situado entre:",
    "opcoes": [
      "Classico e Romantico",
      "Medieval e Renascimento",
      "Barroco e Medieval",
      "Impressionismo e Modernismo"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Classico e Romantico.",
      "Incorreto. Medieval e Renascimento nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Barroco e Medieval nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Impressionismo e Modernismo nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "facil",
    "tema": "historia",
    "subtema": "unidade1",
    "topico": "historia-da-musica",
    "pergunta": "O desenvolvimento da notacao musical medieval foi importante porque:",
    "opcoes": [
      "Permitiu maior preservacao e transmissao do repertorio",
      "Substituiu totalmente a memoria musical",
      "Eliminou a pratica vocal",
      "Impediu novas composicoes"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Permitiu maior preservacao e transmissao do repertorio.",
      "Incorreto. Substituiu totalmente a memoria musical nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Eliminou a pratica vocal nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Impediu novas composicoes nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "facil",
    "tema": "historia",
    "subtema": "unidade1",
    "topico": "historia-da-musica",
    "pergunta": "Qual ambiente foi decisivo para a producao musical medieval sacra?",
    "opcoes": [
      "Mosteiros e catedrais",
      "Estudios de cinema",
      "Teatros de opera modernos",
      "Clubes de jazz"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Mosteiros e catedrais.",
      "Incorreto. Estudios de cinema nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Teatros de opera modernos nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Clubes de jazz nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "facil",
    "tema": "historia",
    "subtema": "unidade1",
    "topico": "historia-da-musica",
    "pergunta": "No estudo de historia da musica, periodos como 'Barroco' e 'Classico' sao:",
    "opcoes": [
      "Ferramentas de periodizacao",
      "Nomes de instrumentos",
      "Titulos de obras",
      "Categorias apenas geograficas"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Ferramentas de periodizacao.",
      "Incorreto. Nomes de instrumentos nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Titulos de obras nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Categorias apenas geograficas nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "facil",
    "tema": "historia",
    "subtema": "unidade1",
    "topico": "historia-da-musica",
    "pergunta": "A transicao da monodia para a polifonia indica:",
    "opcoes": [
      "Maior complexidade textual-musical",
      "Fim da musica religiosa",
      "Desaparecimento da melodia",
      "Substituicao da voz por eletronica"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Maior complexidade textual-musical.",
      "Incorreto. Fim da musica religiosa nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Desaparecimento da melodia nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Substituicao da voz por eletronica nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "facil",
    "tema": "historia",
    "subtema": "unidade1",
    "topico": "historia-da-musica",
    "pergunta": "A Escola de Notre-Dame e frequentemente ligada aos nomes:",
    "opcoes": [
      "Leonin e Perotin",
      "Haydn e Mozart",
      "Debussy e Ravel",
      "Brahms e Mahler"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Leonin e Perotin.",
      "Incorreto. Haydn e Mozart nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Debussy e Ravel nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Brahms e Mahler nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "medio",
    "tema": "historia",
    "subtema": "unidade2",
    "topico": "historia-da-musica",
    "pergunta": "Qual alternativa descreve melhor a funcao do baixo continuo no Barroco?",
    "opcoes": [
      "Base harmonica e sustentacao do discurso",
      "Eliminacao da harmonia",
      "Substituicao da melodia",
      "Uso exclusivo em musica eletrica"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Base harmonica e sustentacao do discurso.",
      "Incorreto. Eliminacao da harmonia nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Substituicao da melodia nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Uso exclusivo em musica eletrica nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "medio",
    "tema": "historia",
    "subtema": "unidade2",
    "topico": "historia-da-musica",
    "pergunta": "A oposicao entre musica absoluta e programatica no seculo XIX envolve sobretudo:",
    "opcoes": [
      "Debate estetico sobre significado musical",
      "Afinacao do temperamento",
      "Proibicao de repertorio instrumental",
      "Uso de latim na liturgia"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Debate estetico sobre significado musical.",
      "Incorreto. Afinacao do temperamento nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Proibicao de repertorio instrumental nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Uso de latim na liturgia nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "medio",
    "tema": "historia",
    "subtema": "unidade2",
    "topico": "historia-da-musica",
    "pergunta": "No Renascimento, a polifonia imitativa e relevante por:",
    "opcoes": [
      "Articular vozes em equilibrio estrutural",
      "Abandonar o contraponto",
      "Negar escrita vocal",
      "Eliminar texto"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Articular vozes em equilibrio estrutural.",
      "Incorreto. Abandonar o contraponto nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Negar escrita vocal nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Eliminar texto nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "medio",
    "tema": "historia",
    "subtema": "unidade2",
    "topico": "historia-da-musica",
    "pergunta": "No Classicismo, a expansao da sinfonia relaciona-se a:",
    "opcoes": [
      "Consolidacao formal e orquestral",
      "Desaparecimento da orquestra",
      "Retorno obrigatorio ao cantochao",
      "Atonalidade sistematica"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Consolidacao formal e orquestral.",
      "Incorreto. Desaparecimento da orquestra nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Retorno obrigatorio ao cantochao nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Atonalidade sistematica nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "medio",
    "tema": "historia",
    "subtema": "unidade2",
    "topico": "historia-da-musica",
    "pergunta": "No Romantismo tardio, qual tendencia aparece com frequencia?",
    "opcoes": [
      "Maior cromatismo e expansao expressiva",
      "Restricao tonal severa medieval",
      "Rejeicao da dinamica",
      "Fim da forma"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Maior cromatismo e expansao expressiva.",
      "Incorreto. Restricao tonal severa medieval nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Rejeicao da dinamica nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Fim da forma nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "medio",
    "tema": "historia",
    "subtema": "unidade2",
    "topico": "historia-da-musica",
    "pergunta": "Qual leitura historica e mais adequada para Debussy?",
    "opcoes": [
      "Exploracao timbrica e ambiguidade tonal",
      "Contraponto barroco estrito como eixo unico",
      "Monodia liturgica",
      "Opera verista italiana"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Exploracao timbrica e ambiguidade tonal.",
      "Incorreto. Contraponto barroco estrito como eixo unico nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Monodia liturgica nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Opera verista italiana nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "medio",
    "tema": "historia",
    "subtema": "unidade2",
    "topico": "historia-da-musica",
    "pergunta": "Em historiografia musical, periodizacoes sao uteis porque:",
    "opcoes": [
      "Organizam processos historicos complexos",
      "Substituem analise musical",
      "Eliminam excecoes",
      "Dispensam contexto"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Organizam processos historicos complexos.",
      "Incorreto. Substituem analise musical nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Eliminam excecoes nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Dispensam contexto nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "medio",
    "tema": "historia",
    "subtema": "unidade2",
    "topico": "historia-da-musica",
    "pergunta": "A musica da Escola de Notre-Dame antecipa debates sobre:",
    "opcoes": [
      "Organizacao da polifonia e notacao",
      "Sistemas eletricos de som",
      "Serialismo integral",
      "Forma-sonata romantica"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Organizacao da polifonia e notacao.",
      "Incorreto. Sistemas eletricos de som nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Serialismo integral nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Forma-sonata romantica nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "medio",
    "tema": "historia",
    "subtema": "unidade2",
    "topico": "historia-da-musica",
    "pergunta": "No Barroco, fuga pode ser entendida como:",
    "opcoes": [
      "Procedimento contrapontistico estruturado",
      "Genero operistico com recitativo",
      "Danca renascentista",
      "Tecnica exclusiva do sec XX"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Procedimento contrapontistico estruturado.",
      "Incorreto. Genero operistico com recitativo nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Danca renascentista nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Tecnica exclusiva do sec XX nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "medio",
    "tema": "historia",
    "subtema": "unidade2",
    "topico": "historia-da-musica",
    "pergunta": "No seculo XIX, a ampliacao da orquestra esta ligada a:",
    "opcoes": [
      "Novas demandas de cor e expressividade",
      "Desinteresse por timbre",
      "Abandono da escrita sinfonica",
      "Retorno a conjuntos medievais"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Novas demandas de cor e expressividade.",
      "Incorreto. Desinteresse por timbre nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Abandono da escrita sinfonica nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Retorno a conjuntos medievais nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "medio",
    "tema": "historia",
    "subtema": "unidade2",
    "topico": "historia-da-musica",
    "pergunta": "A recepcao de Bach no romantismo contribuiu para:",
    "opcoes": [
      "Revalorizacao do contraponto historico",
      "Extincao da musica coral",
      "Fim do repertorio de teclado",
      "Substituicao da polifonia por monodia"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Revalorizacao do contraponto historico.",
      "Incorreto. Extincao da musica coral nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Fim do repertorio de teclado nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Substituicao da polifonia por monodia nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "medio",
    "tema": "historia",
    "subtema": "unidade2",
    "topico": "historia-da-musica",
    "pergunta": "No estudo conservatorial, comparar Palestrina e Bach exige:",
    "opcoes": [
      "Contextualizar epocas, funcoes e linguagens",
      "Aplicar os mesmos criterios sem contexto",
      "Ignorar diferencas historicas",
      "Usar apenas dados biograficos"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Contextualizar epocas, funcoes e linguagens.",
      "Incorreto. Aplicar os mesmos criterios sem contexto nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Ignorar diferencas historicas nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Usar apenas dados biograficos nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "medio",
    "tema": "historia",
    "subtema": "unidade2",
    "topico": "historia-da-musica",
    "pergunta": "Qual par melhor representa contraste de periodos?",
    "opcoes": [
      "Palestrina (Renascimento) e Chopin (Romantismo)",
      "Bach (Medieval) e Debussy (Barroco)",
      "Mozart (Sec XX) e Perotin (Classico)",
      "Ravel (Medieval) e Leonin (Romantico)"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Palestrina (Renascimento) e Chopin (Romantismo).",
      "Incorreto. Bach (Medieval) e Debussy (Barroco) nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Mozart (Sec XX) e Perotin (Classico) nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Ravel (Medieval) e Leonin (Romantico) nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "medio",
    "tema": "historia",
    "subtema": "unidade2",
    "topico": "historia-da-musica",
    "pergunta": "A expressao 'ars nova' historicamente se conecta a:",
    "opcoes": [
      "Transformacoes da notacao e da escrita no fim medieval",
      "Opera italiana do sec XIX",
      "Samba urbano do sec XX",
      "Musica concreta"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Transformacoes da notacao e da escrita no fim medieval.",
      "Incorreto. Opera italiana do sec XIX nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Samba urbano do sec XX nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Musica concreta nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "medio",
    "tema": "historia",
    "subtema": "unidade2",
    "topico": "historia-da-musica",
    "pergunta": "No barroco, relacao entre retorica e musica indica:",
    "opcoes": [
      "Uso de recursos para afetos e persuasao expressiva",
      "Negacao da expressividade",
      "Padrao unico sem contraste",
      "Ausencia de gestualidade musical"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Uso de recursos para afetos e persuasao expressiva.",
      "Incorreto. Negacao da expressividade nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Padrao unico sem contraste nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Ausencia de gestualidade musical nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "medio",
    "tema": "historia",
    "subtema": "unidade2",
    "topico": "historia-da-musica",
    "pergunta": "No Classicismo, a fraseologia periodica e relevante porque:",
    "opcoes": [
      "Favorece clareza formal",
      "Impede modulacoes",
      "Elimina contraste",
      "Substitui harmonia"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Favorece clareza formal.",
      "Incorreto. Impede modulacoes nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Elimina contraste nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Substitui harmonia nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "medio",
    "tema": "historia",
    "subtema": "unidade2",
    "topico": "historia-da-musica",
    "pergunta": "No romantismo pianistico, miniaturas como noturnos e preludios mostram:",
    "opcoes": [
      "Concentracao poetica em pequena forma",
      "Obrigacao de grande forma sinfonica",
      "Recusa de lirismo",
      "Padrao liturgico medieval"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Concentracao poetica em pequena forma.",
      "Incorreto. Obrigacao de grande forma sinfonica nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Recusa de lirismo nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Padrao liturgico medieval nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "medio",
    "tema": "historia",
    "subtema": "unidade2",
    "topico": "historia-da-musica",
    "pergunta": "A modernidade do sec XX nao pode ser resumida a um unico estilo porque:",
    "opcoes": [
      "Ha pluralidade de linguagens",
      "Todos os compositores usam a mesma tecnica",
      "Nao existe mudanca historica",
      "Tudo retorna ao barroco"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Ha pluralidade de linguagens.",
      "Incorreto. Todos os compositores usam a mesma tecnica nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Nao existe mudanca historica nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Tudo retorna ao barroco nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "medio",
    "tema": "historia",
    "subtema": "unidade2",
    "topico": "historia-da-musica",
    "pergunta": "Quando se diz que uma obra e 'anacronica', em historia da musica geralmente significa:",
    "opcoes": [
      "Leitura fora de seu contexto historico",
      "Obra sem melodia",
      "Obra sem autor",
      "Obra sem data"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Leitura fora de seu contexto historico.",
      "Incorreto. Obra sem melodia nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Obra sem autor nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Obra sem data nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "medio",
    "tema": "historia",
    "subtema": "unidade2",
    "topico": "historia-da-musica",
    "pergunta": "A obra 'A Flauta Magica' ajuda a compreender:",
    "opcoes": [
      "Teatro musical classico tardio e suas sinteses",
      "Ars antiqua medieval",
      "Fuga barroca estrita",
      "Musica eletrica"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Teatro musical classico tardio e suas sinteses.",
      "Incorreto. Ars antiqua medieval nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Fuga barroca estrita nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Musica eletrica nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "medio",
    "tema": "historia",
    "subtema": "unidade2",
    "topico": "historia-da-musica",
    "pergunta": "No estudo de repertorio, 'estilo' envolve:",
    "opcoes": [
      "Conjunto de procedimentos recorrentes",
      "Apenas nacionalidade",
      "Somente instrumentacao",
      "Somente data"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Conjunto de procedimentos recorrentes.",
      "Incorreto. Apenas nacionalidade nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Somente instrumentacao nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Somente data nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "medio",
    "tema": "historia",
    "subtema": "unidade2",
    "topico": "historia-da-musica",
    "pergunta": "Qual criterio evita simplificacoes em prova de historia da musica?",
    "opcoes": [
      "Relacionar obra, contexto e linguagem",
      "Memorizar datas isoladas",
      "Ignorar formas musicais",
      "Evitar comparar periodos"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Relacionar obra, contexto e linguagem.",
      "Incorreto. Memorizar datas isoladas nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Ignorar formas musicais nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Evitar comparar periodos nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "medio",
    "tema": "historia",
    "subtema": "unidade2",
    "topico": "historia-da-musica",
    "pergunta": "A relacao entre historia e analise musical e melhor descrita como:",
    "opcoes": [
      "Complementar",
      "Excludente",
      "Irrelevante",
      "Aleatoria"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Complementar.",
      "Incorreto. Excludente nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Irrelevante nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Aleatoria nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "dificil",
    "tema": "historia",
    "subtema": "unidade3",
    "topico": "historia-da-musica",
    "pergunta": "Do ponto de vista historiografico, a ideia de 'ruptura' modernista deve ser lida junto com:",
    "opcoes": [
      "Processos de continuidade historica",
      "Negacao total do passado",
      "Ausencia de dialogo estilistico",
      "Fim da analise formal"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Processos de continuidade historica.",
      "Incorreto. Negacao total do passado nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Ausencia de dialogo estilistico nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Fim da analise formal nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "dificil",
    "tema": "historia",
    "subtema": "unidade3",
    "topico": "historia-da-musica",
    "pergunta": "Em leitura conservatorial, periodos historicos funcionam como:",
    "opcoes": [
      "Modelos analiticos porosos",
      "Categorias absolutas sem excecao",
      "Etiquetas puramente comerciais",
      "Substitutos da escuta"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Modelos analiticos porosos.",
      "Incorreto. Categorias absolutas sem excecao nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Etiquetas puramente comerciais nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Substitutos da escuta nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "dificil",
    "tema": "historia",
    "subtema": "unidade3",
    "topico": "historia-da-musica",
    "pergunta": "A consolidacao tonal entre barroco e classico pode ser entendida como:",
    "opcoes": [
      "Processo historico gradual",
      "Evento instantaneo e isolado",
      "Fenomeno exclusivo da opera",
      "Consequencia da musica eletronica"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Processo historico gradual.",
      "Incorreto. Evento instantaneo e isolado nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Fenomeno exclusivo da opera nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Consequencia da musica eletronica nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "dificil",
    "tema": "historia",
    "subtema": "unidade3",
    "topico": "historia-da-musica",
    "pergunta": "No debate oitocentista, musica programatica e absoluta diferem sobretudo quanto:",
    "opcoes": [
      "A relacao com referencia extramusical",
      "Uso de metrico fixo",
      "Numero de instrumentos",
      "Idioma do libreto"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. A relacao com referencia extramusical.",
      "Incorreto. Uso de metrico fixo nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Numero de instrumentos nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Idioma do libreto nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "dificil",
    "tema": "historia",
    "subtema": "unidade3",
    "topico": "historia-da-musica",
    "pergunta": "Em analise historica, chamar Debussy de 'anti-tonal' sem nuances e problematico porque:",
    "opcoes": [
      "Sua escrita frequentemente trabalha ambiguidade, nao simples negacao binaria",
      "Ele nao compunha para piano",
      "Nao ha harmonia em suas obras",
      "Ele pertence ao barroco"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Sua escrita frequentemente trabalha ambiguidade, nao simples negacao binaria.",
      "Incorreto. Ele nao compunha para piano nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Nao ha harmonia em suas obras nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Ele pertence ao barroco nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "dificil",
    "tema": "historia",
    "subtema": "unidade3",
    "topico": "historia-da-musica",
    "pergunta": "A nocao de estilo nacional no sec XIX deve ser tratada com cautela porque:",
    "opcoes": [
      "Convivem trocas transnacionais intensas",
      "Nao havia circulacao de repertorio",
      "Todos os compositores eram isolados",
      "Nao existiam editoras"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Convivem trocas transnacionais intensas.",
      "Incorreto. Nao havia circulacao de repertorio nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Todos os compositores eram isolados nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Nao existiam editoras nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "dificil",
    "tema": "historia",
    "subtema": "unidade3",
    "topico": "historia-da-musica",
    "pergunta": "No campo da performance historicamente informada, uma premissa central e:",
    "opcoes": [
      "Dialogar com fontes e praticas de epoca",
      "Aplicar sempre tecnica contemporanea sem ajuste",
      "Ignorar organologia",
      "Recusar qualquer pesquisa"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Dialogar com fontes e praticas de epoca.",
      "Incorreto. Aplicar sempre tecnica contemporanea sem ajuste nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Ignorar organologia nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Recusar qualquer pesquisa nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "dificil",
    "tema": "historia",
    "subtema": "unidade3",
    "topico": "historia-da-musica",
    "pergunta": "A classificacao 'Renascimento' em musica e mais util quando:",
    "opcoes": [
      "Relacionada a tecnicas, instituicoes e repertorios concretos",
      "Usada como rotulo sem analise",
      "Aplicada a qualquer obra antiga",
      "Restrita a biografias"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Relacionada a tecnicas, instituicoes e repertorios concretos.",
      "Incorreto. Usada como rotulo sem analise nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Aplicada a qualquer obra antiga nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Restrita a biografias nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "dificil",
    "tema": "historia",
    "subtema": "unidade3",
    "topico": "historia-da-musica",
    "pergunta": "No estudo comparativo entre Bach e Mozart, e metodologicamente correto:",
    "opcoes": [
      "Comparar processos formais respeitando contextos distintos",
      "Assumir identidade estilistica total",
      "Ignorar diferencas de genero",
      "Eliminar dados historicos"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Comparar processos formais respeitando contextos distintos.",
      "Incorreto. Assumir identidade estilistica total nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Ignorar diferencas de genero nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Eliminar dados historicos nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "dificil",
    "tema": "historia",
    "subtema": "unidade3",
    "topico": "historia-da-musica",
    "pergunta": "A ideia de canon musical ocidental pode ser criticada por:",
    "opcoes": [
      "Excluir repertorios e perspectivas historicas diversas",
      "Ser totalmente neutra",
      "Nao influenciar curriculos",
      "Dispensar revisoes"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Excluir repertorios e perspectivas historicas diversas.",
      "Incorreto. Ser totalmente neutra nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Nao influenciar curriculos nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Dispensar revisoes nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "dificil",
    "tema": "historia",
    "subtema": "unidade3",
    "topico": "historia-da-musica",
    "pergunta": "No sec XX, ampliacao do material sonoro inclui ruido e timbre como:",
    "opcoes": [
      "Elementos composicionais estruturantes",
      "Acidentes sem funcao",
      "Erros de execucao obrigatorios",
      "Residuos nao musicais"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Elementos composicionais estruturantes.",
      "Incorreto. Acidentes sem funcao nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Erros de execucao obrigatorios nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Residuos nao musicais nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "dificil",
    "tema": "historia",
    "subtema": "unidade3",
    "topico": "historia-da-musica",
    "pergunta": "A leitura de periodos como 'barroco' e 'classico' ganha rigor quando:",
    "opcoes": [
      "Combina escuta analitica e documentacao historica",
      "Depende apenas de opiniao pessoal",
      "Evita confronto com fontes",
      "Se baseia so em cronologia"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Combina escuta analitica e documentacao historica.",
      "Incorreto. Depende apenas de opiniao pessoal nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Evita confronto com fontes nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Se baseia so em cronologia nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "dificil",
    "tema": "historia",
    "subtema": "unidade3",
    "topico": "historia-da-musica",
    "pergunta": "Em provas de conservatorio, diferenciar contexto liturgico e cortesao e importante porque:",
    "opcoes": [
      "Afeta funcao, genero e linguagem",
      "Nao altera nada na musica",
      "So muda o idioma",
      "Vale apenas para opera"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Afeta funcao, genero e linguagem.",
      "Incorreto. Nao altera nada na musica nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. So muda o idioma nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Vale apenas para opera nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "dificil",
    "tema": "historia",
    "subtema": "unidade3",
    "topico": "historia-da-musica",
    "pergunta": "O conceito de 'obra' no sec XIX difere de praticas anteriores, entre outros motivos, pela:",
    "opcoes": [
      "Fixacao editorial e valorizacao autoral",
      "Ausencia de partitura",
      "Eliminacao do publico",
      "Fim da interpretacao"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Fixacao editorial e valorizacao autoral.",
      "Incorreto. Ausencia de partitura nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Eliminacao do publico nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Fim da interpretacao nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "dificil",
    "tema": "historia",
    "subtema": "unidade3",
    "topico": "historia-da-musica",
    "pergunta": "Uma armadilha anacronica comum ao estudar idade media e:",
    "opcoes": [
      "Aplicar criterios tonais do sec XIX sem media??o",
      "Reconhecer diferencas modais",
      "Investigar notacao neumatica",
      "Comparar fontes"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Aplicar criterios tonais do sec XIX sem media??o.",
      "Incorreto. Reconhecer diferencas modais nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Investigar notacao neumatica nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Comparar fontes nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "dificil",
    "tema": "historia",
    "subtema": "unidade3",
    "topico": "historia-da-musica",
    "pergunta": "Ao tratar impressionismo, reduzir tudo a 'falta de forma' e inadequado porque:",
    "opcoes": [
      "Ha organizacoes formais proprias e sofisticadas",
      "Nao existe estrutura alguma",
      "So ha improviso",
      "Nao ha planejamento timbrico"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Ha organizacoes formais proprias e sofisticadas.",
      "Incorreto. Nao existe estrutura alguma nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. So ha improviso nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Nao ha planejamento timbrico nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "dificil",
    "tema": "historia",
    "subtema": "unidade3",
    "topico": "historia-da-musica",
    "pergunta": "No romantismo, a expansao harmonica nao implica necessariamente:",
    "opcoes": [
      "Desaparecimento imediato da tonalidade",
      "Aumento de cromatismo",
      "Maior tensao funcional",
      "Novas trajetorias modulantes"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Desaparecimento imediato da tonalidade.",
      "Incorreto. Aumento de cromatismo nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Maior tensao funcional nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Novas trajetorias modulantes nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "dificil",
    "tema": "historia",
    "subtema": "unidade3",
    "topico": "historia-da-musica",
    "pergunta": "A relacao entre historia social e historia da musica e relevante pois:",
    "opcoes": [
      "Instituicoes, publico e mercado influenciam repertorios",
      "Musica evolui isolada da sociedade",
      "Contexto economico e irrelevante",
      "Politica nao afeta circulacao"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Instituicoes, publico e mercado influenciam repertorios.",
      "Incorreto. Musica evolui isolada da sociedade nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Contexto economico e irrelevante nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Politica nao afeta circulacao nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "dificil",
    "tema": "historia",
    "subtema": "unidade3",
    "topico": "historia-da-musica",
    "pergunta": "Em historiografia critica, 'grandes compositores' devem ser estudados com:",
    "opcoes": [
      "Contextualizacao, fontes e debate interpretativo",
      "Hagiografia sem questionamento",
      "Exclusao de repertorios perifericos",
      "Analise apenas biografica"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Contextualizacao, fontes e debate interpretativo.",
      "Incorreto. Hagiografia sem questionamento nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Exclusao de repertorios perifericos nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Analise apenas biografica nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "dificil",
    "tema": "historia",
    "subtema": "unidade3",
    "topico": "historia-da-musica",
    "pergunta": "A no??o de progresso linear na historia da musica e limitada porque:",
    "opcoes": [
      "Processos historicos incluem descontinuidades e coexistencias",
      "Todo periodo supera totalmente o anterior",
      "Nao ha repeticoes historicas",
      "Tecnica cresce sempre no mesmo sentido"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Processos historicos incluem descontinuidades e coexistencias.",
      "Incorreto. Todo periodo supera totalmente o anterior nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Nao ha repeticoes historicas nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Tecnica cresce sempre no mesmo sentido nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "dificil",
    "tema": "historia",
    "subtema": "unidade3",
    "topico": "historia-da-musica",
    "pergunta": "No ensino avancado, comparar fontes primarias e secundarias ajuda a:",
    "opcoes": [
      "Refinar interpretacoes historicas",
      "Eliminar necessidade de analise",
      "Substituir escuta",
      "Confirmar preconceitos"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Refinar interpretacoes historicas.",
      "Incorreto. Eliminar necessidade de analise nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Substituir escuta nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Confirmar preconceitos nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "dificil",
    "tema": "historia",
    "subtema": "unidade3",
    "topico": "historia-da-musica",
    "pergunta": "A categoria 'musica erudita ocidental' pode ser problematizada por:",
    "opcoes": [
      "Naturalizar hierarquias e exclusoes",
      "Ser completamente neutra",
      "Impedir qualquer analise",
      "Nao ter historia"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Naturalizar hierarquias e exclusoes.",
      "Incorreto. Ser completamente neutra nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Impedir qualquer analise nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Nao ter historia nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  },
  {
    "nivel": "dificil",
    "tema": "historia",
    "subtema": "unidade3",
    "topico": "historia-da-musica",
    "pergunta": "Uma boa resposta de vestibular/conservatorio em historia da musica deve:",
    "opcoes": [
      "Articular conceito, contexto e exemplo musical",
      "Listar datas sem argumento",
      "Evitar qualquer comparacao",
      "Ignorar terminologia"
    ],
    "resposta": 0,
    "explicacoes": [
      "Correto. Articular conceito, contexto e exemplo musical.",
      "Incorreto. Listar datas sem argumento nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Evitar qualquer comparacao nao representa a melhor resposta historico-estilistica para este enunciado.",
      "Incorreto. Ignorar terminologia nao representa a melhor resposta historico-estilistica para este enunciado."
    ]
  }
];

perguntas.push(...historia_balanceamento);

module.exports = { perguntas, TOPICOS };
