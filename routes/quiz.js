"use strict";

const { Router } = require("express");
const { detectarTonalidade } = require("../services/harmonia");
const { perguntas } = require("../question-bank");

const router = Router();

const errosComuns = {
  II_vs_V: {
    facil: "Subdominante (II) prepara a dominante. Dominante (V) cria tensao e quer resolver. Sao papeis muito diferentes!",
    medio: "O grau II (Supertonica) exerce funcao de predominante/subdominante. O grau V (Dominante) cria tensao que must resolver na tonica.",
    dificil: "Subdominante (II em modo maior) apresenta um polo direcional para a dominante. Dominante (V) mantem a hierarquia tonal atraves da triton resolvendo para a tonica.",
  },
  VI_vs_I: {
    facil: "I e a tonica real. VI e a tonica relativa (seu parente proximo mas nao igual). I repousa, VI tem uma sensacao diferente.",
    medio: "Ambas sao tonicos em relacao menor/maior paralela, mas apenas I e a verdadeira tonica da tonalidade. VI pertence ao campo harmonico relativo.",
    dificil: "A tonica principal (I) e o ponto de repouso final na harmonia funcional. VI (relativa) pode agir como uma substituicao modal mas nao estabiliza o mesmo sistema tonal.",
  },
  IV_vs_II: {
    facil: "Tanto IV quanto II preparam a dominante, mas tem personalidades diferentes na musica.",
    medio: "Grade IV (Subdominante) e mais comum e estavel. Grau II (Supertonica) e uma alternativa de predominante com caracter diferente.",
    dificil: "IV oferece uma base subominante classica com qualidade maior. II fornece qualidade menor (em modo maior) criando uma cor harmonica alternativa na mesmo funcao.",
  },
};

function normalizarTexto(valor) {
  return String(valor || "").trim().toLowerCase();
}

function classificarErro(resposta) {
  const respostaUsuario = normalizarTexto(resposta.resposta_usuario);
  const respostaCorreta = normalizarTexto(resposta.resposta_correta);

  if (respostaUsuario === respostaCorreta) {
    return "acerto";
  }

  if (resposta.subtema === "funcao") {
    return "erro_funcao_harmonica";
  }

  if (resposta.subtema === "campo_harmonico") {
    return "erro_grau";
  }

  return "erro_geral";
}

function detectarPadraoErro(respostaUsuario, respostaCorreta) {
  const u = normalizarTexto(respostaUsuario);
  const c = normalizarTexto(respostaCorreta);

  // II vs V - Subdominante vs Dominante
  if (
    (u.includes("dominante") && (c.includes("subdominante") || c.includes("supertonica") || c === "ii" || c === "iv")) ||
    ((u === "v" || u === "dom") && (c === "ii" || c === "iv" || c.includes("subdominante"))) ||
    (c.includes("subdominante") && (u.includes("dominante") || u === "v"))
  ) {
    return "II_vs_V";
  }

  // VI vs I - Tonica relativa vs Tonica principal
  if (
    (u.includes("relativa") && c.includes("tonica") && !c.includes("relativa")) ||
    ((u === "vi" || u === "vi-") && (c === "i" || c.includes("tonica principal"))) ||
    ((u.includes("tonica") && !u.includes("relativa")) && (c === "vi" || c.includes("relativa")))
  ) {
    return "VI_vs_I";
  }

  // IV vs II - Subdominantes diferentes
  if (
    ((u.includes("iv") || u === "iv" || u === "subdominante")) && 
    ((c.includes("ii") || c === "ii" || c.includes("supertonica")))
  ) {
    return "IV_vs_II";
  }

  // Tambem capaz de detectar o inverso
  if (
    ((c.includes("iv") || c === "iv" || c.includes("subdominante"))) && 
    ((u.includes("ii") || u === "ii" || u.includes("supertonica")))
  ) {
    return "IV_vs_II";
  }

  return null;
}

function gerarExplicacao(resposta) {
  const erro = classificarErro(resposta);

  if (erro === "acerto") {
    return "Excelente! Sua resposta esta correta. Continue assim.";
  }

  const usuario = resposta.resposta_usuario || "";
  const correta = resposta.resposta_correta || "";
  const comparativa = [
    `Voce escolheu \"${usuario}\", mas o correto e \"${correta}\".`,
    "",
    "Por que esta diferenca importa:",
  ].join("\n");

  if (erro === "erro_funcao_harmonica") {
    return [
      comparativa,
      `- ${usuario}: funcao ou papel diferente no contexto da tonalidade`,
      `- ${correta}: o papel esperado nesta situacao harmonica`,
      "",
      "Dica: Lembre que cada grau da escala tem uma funcao tonal especifica (tonica, subdominante ou dominante). Conta os graus a partir da tonica!",
    ].join("\n");
  }

  if (erro === "erro_grau") {
    return [
      comparativa,
      `- ${usuario}: grau incorreto ou campo harmonico errado`,
      `- ${correta}: o grau ou campo harmonico correto`,
      "",
      "Reconte os graus a partir da tonica e verifique em qual tonalidade voce esta!",
    ].join("\n");
  }

  return [
    comparativa,
    `- Voce respondeu: ${usuario}`,
    `- Resposta correta: ${correta}`,
    "",
    "Revise o conceito e a explicacao da pergunta anterior.",
  ].join("\n");
}

function adaptarExplicacao(texto, nivel) {
  const safeNivel = normalizarTexto(nivel);

  if (safeNivel === "dificil") {
    // Adicionar contexto teorico avancado sem destruir o conteudo
    const finais = [
      "\n\nDetalhes avancados:",
      "- Analises funcionais dependem da hierarquia tonal (tonica → subdominante → dominante)",
      "- A conducao de vozes e a inversao do acorde tambem influenciam a percepcao funcional",
      "- Compare a sua resposta com a teoria de Riemann e Schoenberg",
    ];
    return texto + "\n" + finais.join("\n");
  }

  // Para nivel facil e medio, retorna o texto como eh (ja foi adaptado no objeto errosComuns)
  return texto;
}

// POST /api/v1/gerar-questao
router.post("/gerar-questao", (req, res) => {
  const { nivel, tema } = req.body || {};

  let pool = perguntas;

  if (nivel) {
    pool = pool.filter((q) => q.nivel === nivel.toLowerCase());
  }
  if (tema) {
    // O campo pode ser 'topico' (banco antigo) ou 'tema' (banco novo)
    pool = pool.filter(
      (q) => q.tema === tema.toLowerCase() || (q.topico && q.topico.includes(tema.toLowerCase()))
    );
  }

  if (pool.length === 0) {
    return res.status(404).json({ error: "Nenhuma questão encontrada para os filtros informados." });
  }

  const questao = pool[Math.floor(Math.random() * pool.length)];

  res.json({
    pergunta: questao.pergunta,
    opcoes: questao.opcoes,
    resposta: questao.resposta,
    explicacao: questao.explicacoes
      ? questao.explicacoes[questao.resposta]
      : null,
  });
});

// POST /api/v1/detectar-tonalidade
router.post("/detectar-tonalidade", (req, res) => {
  const { progressao } = req.body || {};

  if (!Array.isArray(progressao) || progressao.length === 0) {
    return res.status(400).json({ error: "Campo 'progressao' deve ser um array não vazio." });
  }

  const resultado = detectarTonalidade(progressao);
  res.json(resultado);
});

// POST /api/v1/corrigir-resposta
router.post("/corrigir-resposta", (req, res) => {
  const payload = req.body || {};
  const resposta_correta = String(payload.resposta_correta || "").trim();
  const resposta_usuario = String(payload.resposta_usuario || "").trim();
  const perguntaTexto = String(payload.pergunta || "").trim();

  if (!resposta_correta || !resposta_usuario) {
    return res.status(400).json({
      error: "Campos 'resposta_correta' e 'resposta_usuario' sao obrigatorios.",
    });
  }

  const tipoErro = classificarErro(payload);
  const acertou = tipoErro === "acerto";
  const nivel = normalizarTexto(payload.nivel || "medio");

  // Tentar encontrar a pergunta no banco para usar explicacoes especificas
  if (perguntaTexto) {
    const questao = perguntas.find((q) => normalizarTexto(q.pergunta) === normalizarTexto(perguntaTexto));
    if (questao && Array.isArray(questao.explicacoes) && questao.explicacoes.length > 0) {
      const indexUsuario = questao.opcoes ? questao.opcoes.findIndex(
        (op) => normalizarTexto(op) === normalizarTexto(resposta_usuario)
      ) : -1;
      const indexCorreto = questao.opcoes ? questao.opcoes.findIndex(
        (op) => normalizarTexto(op) === normalizarTexto(resposta_correta)
      ) : -1;

      const explicacaoUsuario = indexUsuario >= 0 ? questao.explicacoes[indexUsuario] : null;
      const explicacaoCorreta = indexCorreto >= 0 ? questao.explicacoes[indexCorreto] : null;

      let explicacao = "";
      if (!acertou && explicacaoUsuario && explicacaoCorreta) {
        explicacao = `${explicacaoUsuario}\n\n✓ Correto: ${explicacaoCorreta}`;
      } else if (acertou && explicacaoCorreta) {
        explicacao = explicacaoCorreta;
      } else if (explicacaoUsuario) {
        explicacao = explicacaoUsuario;
      }

      if (explicacao) {
        return res.json({ acertou, tipo_erro: tipoErro, explicacao, fonte: "banco" });
      }
    }
  }

  // Fallback: usar padroes comuns ou explicacao generica
  const padraoErro = acertou ? null : detectarPadraoErro(resposta_usuario, resposta_correta);
  let explicacaoBase = gerarExplicacao(payload);

  if (padraoErro && errosComuns[padraoErro]) {
    const explicacaoEspecializada = errosComuns[padraoErro][nivel] || errosComuns[padraoErro]["medio"];
    explicacaoBase = [
      `Voce escolheu \"${resposta_usuario}\", mas o correto e \"${resposta_correta}\".`,
      "",
      explicacaoEspecializada,
      "",
      "Dica: Estude a diferenca entre esses dois conceitos importantes em harmonia.",
    ].join("\n");
  }

  const explicacao = adaptarExplicacao(explicacaoBase, nivel);

  return res.json({
    acertou,
    tipo_erro: tipoErro,
    explicacao,
    padrao: padraoErro,
    fonte: "ia",
  });
});

module.exports = router;
