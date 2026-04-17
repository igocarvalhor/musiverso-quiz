"use strict";

const { Router } = require("express");
const { detectarTonalidade } = require("../services/harmonia");
const { perguntas } = require("../question-bank");

const router = Router();

const errosComuns = {
  II_vs_V: "Voce confundiu a funcao subdominante (II) com dominante (V).",
  VI_vs_I: "Voce confundiu tonica relativa (VI) com tonica principal (I).",
  IV_vs_II: "Ambos sao subdominantes, mas exercem papeis diferentes na preparacao.",
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

  if ((u.includes("dominante") || u === "v") && (c.includes("subdominante") || c === "ii")) {
    return "II_vs_V";
  }

  if ((u.includes("tonica") || u === "i") && (c.includes("relativa") || c === "vi")) {
    return "VI_vs_I";
  }

  if ((u.includes("ii") || u.includes("supertonica")) && (c.includes("iv") || c.includes("subdominante"))) {
    return "IV_vs_II";
  }

  return null;
}

function explicarComparando(correta, usuario) {
  return [
    `Voce escolheu \"${usuario}\", mas o correto e \"${correta}\".`,
    "",
    "Diferenca conceitual:",
    `- ${usuario}: papel diferente no sistema tonal`,
    `- ${correta}: funcao esperada no contexto da pergunta`,
  ].join("\n");
}

function gerarExplicacao(resposta) {
  const erro = classificarErro(resposta);

  if (erro === "acerto") {
    return "Excelente! Sua resposta esta correta. Continue assim.";
  }

  if (erro === "erro_funcao_harmonica") {
    const comparativa = explicarComparando(resposta.resposta_correta, resposta.resposta_usuario);
    return [
      comparativa,
      "",
      "Em harmonia funcional, cada acorde tem um papel especifico (T, SD ou D).",
      "A dica e observar o grau dentro da tonalidade antes de decidir a funcao.",
    ].join("\n");
  }

  if (erro === "erro_grau") {
    return "Voce confundiu o grau do acorde dentro da tonalidade. Reconte os graus a partir da tonica para identificar corretamente.";
  }

  return "Revise o conceito envolvido nesta questao e compare o papel da sua resposta com o da resposta correta.";
}

function adaptarExplicacao(texto, nivel) {
  const safeNivel = normalizarTexto(nivel);

  if (safeNivel === "facil") {
    return "Boa tentativa! Pense no papel do acorde na musica: ele descansa, prepara ou cria tensao?";
  }

  if (safeNivel === "dificil") {
    return `${texto}\n\nDetalhe avancado: no sistema tonal, a leitura funcional depende da hierarquia entre tonica, predominante e dominante.`;
  }

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

  if (!resposta_correta || !resposta_usuario) {
    return res.status(400).json({
      error: "Campos 'resposta_correta' e 'resposta_usuario' sao obrigatorios.",
    });
  }

  const tipoErro = classificarErro(payload);
  const acertou = tipoErro === "acerto";
  const padraoErro = acertou ? null : detectarPadraoErro(resposta_usuario, resposta_correta);

  let explicacaoBase = gerarExplicacao(payload);
  if (padraoErro && errosComuns[padraoErro]) {
    explicacaoBase = `${explicacaoBase}\n\nPadrao detectado: ${errosComuns[padraoErro]}`;
  }

  const explicacao = adaptarExplicacao(explicacaoBase, payload.nivel);

  return res.json({
    acertou,
    tipo_erro: tipoErro,
    explicacao,
  });
});

module.exports = router;
