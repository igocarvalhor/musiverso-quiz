"use strict";

// ─── Notas cromáticas ────────────────────────────────────────────────────────
const NOTAS = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const ENARM = { Db: "C#", Eb: "D#", Fb: "E", Gb: "F#", Ab: "G#", Bb: "A#", Cb: "B" };

function normalizarNota(nota) {
  const n = String(nota).replace(/m$/, "").replace(/7$/, "").replace(/maj7$/, "").replace(/dim$/, "").replace(/aug$/, "").replace(/sus.*$/, "").replace(/add.*$/, "");
  return ENARM[n] || n;
}

function indiceDaNota(nota) {
  return NOTAS.indexOf(normalizarNota(nota));
}

// ─── Campos harmônicos ───────────────────────────────────────────────────────
// Fórmula maior:  Tons T T ST T T T ST  → semitons [0,2,4,5,7,9,11]
// Fórmula menor:  T ST T T ST T T       → semitons [0,2,3,5,7,8,10]
const INTERVALOS_MAIOR = [0, 2, 4, 5, 7, 9, 11];
const INTERVALOS_MENOR = [0, 2, 3, 5, 7, 8, 10];

// Qualidade dos graus em cada modo (para identificação de acorde m/M/dim)
const QUALIDADE_MAIOR = ["M", "m", "m", "M", "M", "m", "dim"];
const QUALIDADE_MENOR = ["m", "dim", "M", "m", "m", "M", "M"];

// Funções harmônicas por grau (1-indexed)
const FUNCAO_MAIOR = { 1: "T", 2: "SD", 3: "Tmed", 4: "SD", 5: "D", 6: "Trel", 7: "D" };
const FUNCAO_MENOR = { 1: "T", 2: "SD", 3: "Trel", 4: "SD", 5: "D", 6: "SDrel", 7: "D" };

function gerarCampoHarmonico(tonica, modo = "maior") {
  const base = indiceDaNota(tonica);
  if (base === -1) return [];
  const intervalos = modo === "maior" ? INTERVALOS_MAIOR : INTERVALOS_MENOR;
  const qualidades = modo === "maior" ? QUALIDADE_MAIOR : QUALIDADE_MENOR;
  return intervalos.map((intervalo, i) => ({
    grau: i + 1,
    nota: NOTAS[(base + intervalo) % 12],
    qualidade: qualidades[i],
  }));
}

// ─── Detectar grau de um acorde dentro de uma tonalidade ────────────────────
function detectarGrau(acorde, tonica, modo = "maior") {
  const campo = gerarCampoHarmonico(tonica, modo);
  const notaAcorde = normalizarNota(acorde);
  const entry = campo.find((g) => g.nota === notaAcorde);
  return entry || null;
}

// ─── Analisar progressão ────────────────────────────────────────────────────
function analisarProgressao(progressao, tonica, modo = "maior") {
  const funcoes = modo === "maior" ? FUNCAO_MAIOR : FUNCAO_MENOR;
  const campo = gerarCampoHarmonico(tonica, modo);

  return progressao.map((acorde) => {
    const notaAcorde = normalizarNota(acorde);
    const entry = campo.find((g) => g.nota === notaAcorde);

    if (!entry) {
      // Acorde fora do campo — pode ser dominante secundária ou empréstimo modal
      return {
        acorde,
        grau: null,
        funcao: "X", // acordes externos
      };
    }

    return {
      acorde,
      grau: entry.grau,
      funcao: funcoes[entry.grau] || "?",
    };
  });
}

// ─── Detectar tonalidade automaticamente ────────────────────────────────────
function detectarTonalidade(progressao) {
  let melhorTonica = "C";
  let melhorModo = "maior";
  let melhorScore = -1;

  for (const tonica of NOTAS) {
    for (const modo of ["maior", "menor"]) {
      const campo = gerarCampoHarmonico(tonica, modo);
      const notasCampo = new Set(campo.map((g) => g.nota));
      const score = progressao.filter((a) => notasCampo.has(normalizarNota(a))).length;
      if (score > melhorScore) {
        melhorScore = score;
        melhorTonica = tonica;
        melhorModo = modo;
      }
    }
  }

  const confianca = progressao.length > 0 ? Math.round((melhorScore / progressao.length) * 100) / 100 : 0;
  return { tonalidade: melhorTonica, modo: melhorModo, confianca };
}

module.exports = { analisarProgressao, detectarTonalidade, gerarCampoHarmonico };
