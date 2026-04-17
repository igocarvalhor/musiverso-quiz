"use strict";

const { Router } = require("express");
const { analisarProgressao } = require("../services/harmonia");

const router = Router();

// POST /api/v1/analisar
router.post("/", (req, res) => {
  const { progressao, tonalidade, modo } = req.body || {};

  if (!Array.isArray(progressao) || progressao.length === 0) {
    return res.status(400).json({ error: "Campo 'progressao' deve ser um array não vazio." });
  }
  if (typeof tonalidade !== "string" || !tonalidade.trim()) {
    return res.status(400).json({ error: "Campo 'tonalidade' é obrigatório." });
  }

  const modoNorm = typeof modo === "string" ? modo.toLowerCase() : "maior";
  const analise = analisarProgressao(progressao, tonalidade.trim(), modoNorm);

  res.json({
    analise,
    sequencia: analise.map((a) => a.funcao),
  });
});

module.exports = router;
