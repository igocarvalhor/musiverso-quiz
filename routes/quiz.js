"use strict";

const { Router } = require("express");
const { detectarTonalidade } = require("../services/harmonia");
const { perguntas } = require("../question-bank");

const router = Router();

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

module.exports = router;
