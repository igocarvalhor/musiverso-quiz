/**
 * MUSIVERSO - Rotas de Plataforma Educacional
 * Implementa os 9 mundos, lições, sistema adaptativo e IA
 */

const express = require("express");
const router = express.Router();
require("dotenv").config();
const { perguntas: legacyQuestionBank = [] } = require("../question-bank");

const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || "";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";

const hasSupabaseConfig = Boolean(SUPABASE_URL && SUPABASE_KEY);
const supabase = hasSupabaseConfig ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;
const LEGACY_LEVEL_BY_DIFFICULTY = { easy: "facil", medium: "medio", hard: "dificil" };
const DIFFICULTY_RANK = { easy: 1, medium: 2, hard: 3 };
const DIFFICULTY_ORDER = ["easy", "medium", "hard"];
const RECENT_QUESTION_WINDOW = 30;
const LESSON_COMPLETION_TARGET_ATTEMPTS = 10;
const LESSON_COMPLETION_MIN_CORRECT = 7;
const TIMED_QUIZ_XP = {
  standard: { correct: 10, wrong: 3 },
  timed: { correct: 15, wrong: 4 },
  meteor: { correct: 0, wrong: 0 },
};
const METEOR_CHALLENGE_REWARD_XP = 100;
const METEOR_CHALLENGE_STEP = 10;
const METEOR_ACHIEVEMENT_PREFIX = "Salve o Planeta do Meteoro";
const LESSON_KEYWORD_OVERRIDES = {
  "o que e musica?": ["musica", "som", "sons", "silencio", "vibracao"],
  "elementos do som": ["altura", "intensidade", "timbre", "duracao", "som"],
  "o pentagrama": ["pentagrama", "pauta", "clave", "linhas", "espacos", "notas"],
  "figuras ritmicas": ["figura", "figuras", "semibreve", "minima", "seminima", "colcheia", "pausa", "compasso"],
  "funcoes harmonicas": ["funcao", "funcional", "tonica", "subdominante", "dominante", "graus"],
  "cadencia autentica": ["cadencia", "autentica", "perfeita", "v-i", "dominante", "tonica"],
  "cadencia plagal e deceptiva": ["cadencia", "plagal", "deceptiva", "iv-i", "v-vi"],
  "analise funcional basica": ["analise", "funcional", "graus", "campo", "harmonico", "progressao"],
  "progressao ii-v-i": ["ii-v-i", "ii", "v", "i", "progressao", "encadeamento"],
  "progressao i-iv-v-i": ["i-iv-v-i", "i", "iv", "v", "progressao", "funcional"],
  "ciclo de quintas": ["ciclo", "quintas", "dominante", "progressao", "resolucao"],
  "turnarounds": ["turnaround", "turnarounds", "retorno", "progressao", "encadeamento"],
  "cadencia perfeita": ["cadencia", "perfeita", "autentica", "v-i", "fechamento"],
  "cadencia imperfeita": ["cadencia", "imperfeita", "meia", "resolucao", "parcial"],
  "cadencia plagal": ["cadencia", "plagal", "iv-i", "resolucao", "suave"],
  "cadencia deceptiva": ["cadencia", "deceptiva", "v-vi", "surpresa", "desvio"],
  "analise por graus": ["analise", "graus", "funcao", "tonica", "subdominante", "dominante"],
  "analise de progressoes": ["analise", "progressao", "ii-v-i", "ciclo", "encadeamento"],
  "analise de cadencias": ["analise", "cadencia", "autentica", "plagal", "deceptiva", "imperfeita"],
  "estudo de repertorio": ["analise", "repertorio", "progressao", "cadencia", "contexto"],
  "dominantes secundarias": ["dominante", "secundaria", "v/v", "tensao", "temporaria"],
  "modulacao": ["modulacao", "tonalidade", "centro", "tonal", "mudanca"],
  "emprestimo modal": ["emprestimo", "modal", "paralelo", "modo", "acorde"],
  "rearmonizacao": ["rearmonizacao", "substituicao", "variacao", "dominante", "modal"],
};
const LESSON_TOPIC_OVERRIDES = {
  "o que e musica?": { topicHints: ["teoria-musical"], maxDifficulty: "easy" },
  "elementos do som": { topicHints: ["teoria-musical"], maxDifficulty: "easy" },
  "o pentagrama": { topicHints: ["teoria-musical"], maxDifficulty: "medium" },
  "figuras ritmicas": { topicHints: ["teoria-musical"], maxDifficulty: "medium" },
  "funcoes harmonicas": { topicHints: ["harmonia-funcional"], maxDifficulty: "medium" },
  "cadencia autentica": { topicHints: ["harmonia-funcional"], maxDifficulty: "medium" },
  "cadencia plagal e deceptiva": { topicHints: ["harmonia-funcional"], maxDifficulty: "hard" },
  "analise funcional basica": { topicHints: ["harmonia-funcional"], maxDifficulty: "hard" },
  "progressao ii-v-i": { topicHints: ["harmonia-funcional"], maxDifficulty: "medium" },
  "progressao i-iv-v-i": { topicHints: ["harmonia-funcional"], maxDifficulty: "medium" },
  "ciclo de quintas": { topicHints: ["harmonia-funcional"], maxDifficulty: "hard" },
  "turnarounds": { topicHints: ["harmonia-funcional"], maxDifficulty: "hard" },
  "cadencia perfeita": { topicHints: ["harmonia-funcional"], maxDifficulty: "medium" },
  "cadencia imperfeita": { topicHints: ["harmonia-funcional"], maxDifficulty: "hard" },
  "cadencia plagal": { topicHints: ["harmonia-funcional"], maxDifficulty: "hard" },
  "cadencia deceptiva": { topicHints: ["harmonia-funcional"], maxDifficulty: "hard" },
  "analise por graus": { topicHints: ["harmonia-funcional"], maxDifficulty: "hard" },
  "analise de progressoes": { topicHints: ["harmonia-funcional"], maxDifficulty: "hard" },
  "analise de cadencias": { topicHints: ["harmonia-funcional"], maxDifficulty: "hard" },
  "estudo de repertorio": { topicHints: ["harmonia-funcional"], maxDifficulty: "hard" },
  "dominantes secundarias": { topicHints: ["harmonia-funcional"], maxDifficulty: "hard" },
  "modulacao": { topicHints: ["harmonia-funcional"], maxDifficulty: "hard" },
  "emprestimo modal": { topicHints: ["harmonia-funcional"], maxDifficulty: "hard" },
  "rearmonizacao": { topicHints: ["harmonia-funcional"], maxDifficulty: "hard" },
};
const LESSON_FOCUS_OVERRIDES = {
  "funcoes harmonicas": {
    preferredSubthemes: ["funcao", "dominante", "subdominante", "graus", "relativa"],
    excludedSubthemes: ["cadencia", "analise", "dominante_secundaria", "modulacao", "emprestimo_modal"],
  },
  "cadencia autentica": {
    preferredSubthemes: ["cadencia"],
    requiredKeywords: ["autentica", "perfeita", "v-i"],
    excludedSubthemes: ["analise", "dominante_secundaria", "modulacao", "emprestimo_modal"],
  },
  "cadencia plagal e deceptiva": {
    preferredSubthemes: ["cadencia"],
    requiredKeywords: ["plagal", "deceptiva", "iv-i", "v-vi"],
    excludedSubthemes: ["analise", "dominante_secundaria", "modulacao"],
  },
  "analise funcional basica": {
    preferredSubthemes: ["analise", "progressao"],
    excludedSubthemes: ["cadencia", "dominante_secundaria", "modulacao", "emprestimo_modal"],
  },
  "progressao ii-v-i": {
    preferredSubthemes: ["progressao", "analise"],
    requiredKeywords: ["ii-v-i", "ii", "v", "i"],
    excludedSubthemes: ["cadencia", "dominante_secundaria", "modulacao"],
  },
  "progressao i-iv-v-i": {
    preferredSubthemes: ["progressao", "funcao"],
    requiredKeywords: ["i-iv-v-i", "iv", "v", "i"],
    excludedSubthemes: ["cadencia", "dominante_secundaria", "modulacao"],
  },
  "ciclo de quintas": {
    preferredSubthemes: ["progressao", "analise"],
    requiredKeywords: ["ciclo", "quintas", "dominante"],
    excludedSubthemes: ["cadencia", "emprestimo_modal"],
  },
  "turnarounds": {
    preferredSubthemes: ["progressao", "analise"],
    requiredKeywords: ["turnaround", "turnarounds", "retorno", "progressao"],
    excludedSubthemes: ["cadencia", "emprestimo_modal"],
  },
  "cadencia perfeita": {
    preferredSubthemes: ["cadencia"],
    requiredKeywords: ["perfeita", "autentica", "v-i"],
    excludedSubthemes: ["analise", "dominante_secundaria", "modulacao"],
  },
  "cadencia imperfeita": {
    preferredSubthemes: ["cadencia"],
    requiredKeywords: ["imperfeita", "meia", "parcial"],
    excludedSubthemes: ["analise", "dominante_secundaria", "modulacao"],
  },
  "cadencia plagal": {
    preferredSubthemes: ["cadencia"],
    requiredKeywords: ["plagal", "iv-i"],
    excludedSubthemes: ["analise", "dominante_secundaria", "modulacao"],
  },
  "cadencia deceptiva": {
    preferredSubthemes: ["cadencia"],
    requiredKeywords: ["deceptiva", "v-vi", "surpresa"],
    excludedSubthemes: ["analise", "dominante_secundaria", "modulacao"],
  },
  "analise por graus": {
    preferredSubthemes: ["analise", "graus", "funcao"],
    excludedSubthemes: ["cadencia", "dominante_secundaria", "modulacao"],
  },
  "analise de progressoes": {
    preferredSubthemes: ["analise", "progressao"],
    excludedSubthemes: ["cadencia", "dominante_secundaria", "modulacao"],
  },
  "analise de cadencias": {
    preferredSubthemes: ["analise", "cadencia"],
    requiredKeywords: ["cadencia", "autentica", "plagal", "deceptiva", "imperfeita"],
    excludedSubthemes: ["dominante_secundaria", "modulacao", "emprestimo_modal"],
  },
  "estudo de repertorio": {
    preferredSubthemes: ["analise", "progressao", "cadencia"],
    excludedSubthemes: [],
  },
  "dominantes secundarias": {
    preferredSubthemes: ["dominante_secundaria"],
    requiredKeywords: ["dominante", "secundaria", "v/v"],
    excludedSubthemes: ["cadencia", "modulacao", "emprestimo_modal", "funcao", "campo_harmonico", "graus", "subdominante", "relativa"],
  },
  "modulacao": {
    preferredSubthemes: ["modulacao"],
    requiredKeywords: ["modulacao", "tonalidade", "centro tonal", "acorde pivo", "tonicizacao"],
    excludedSubthemes: ["cadencia", "dominante_secundaria", "emprestimo_modal", "funcao", "campo_harmonico", "graus", "subdominante", "relativa", "analise"],
  },
  "emprestimo modal": {
    preferredSubthemes: ["emprestimo_modal"],
    requiredKeywords: ["emprestimo", "modal", "paralelo"],
    excludedSubthemes: ["cadencia", "dominante_secundaria", "modulacao", "funcao", "campo_harmonico", "graus", "subdominante", "relativa", "analise"],
  },
  "rearmonizacao": {
    preferredSubthemes: ["rearmonizacao", "dominante_secundaria", "modulacao", "emprestimo_modal"],
    requiredKeywords: ["rearmonizacao", "substituicao", "tritonal", "variacao", "dominante"],
    excludedSubthemes: ["funcao", "campo_harmonico", "graus", "subdominante", "relativa", "cadencia", "analise"],
  },
};
const DEFAULT_WORLD_SEED = [
  { order_number: 1, name: "Notacao e Leitura (Bohumil Med)", description: "Fundamentos de notacao musical, pentagrama, claves, figuras e pausa - base da leitura", icon: "🎵", unlocked_at_xp: 0 },
  { order_number: 2, name: "Ritmo e Metrica (Bohumil Med)", description: "Compassos, sincope, contratempo e percepcao ritmica - o pulso musical", icon: "🎶", unlocked_at_xp: 100 },
  { order_number: 3, name: "Intervalos e Escalas (Bohumil Med)", description: "Tons, semitons, intervalos e escalas maior/menor/modos - estrutura melodica", icon: "🎼", unlocked_at_xp: 300 },
  { order_number: 4, name: "Acordes e Campo Harmonico (Bohumil Med)", description: "Triades, tetrades, campo harmonico e inversoes - construcao acordal", icon: "🎹", unlocked_at_xp: 600 },
  { order_number: 5, name: "Funcoes Harmonicas (Ian Guest)", description: "Tonica, subdominante, dominante e sensivel - leitura funcional", icon: "🔗", unlocked_at_xp: 1000 },
  { order_number: 6, name: "Progressoes e Encadeamentos (Ian Guest)", description: "II-V-I, I-IV-V-I, ciclos e turnararounds - movimento entre acordes", icon: "🔄", unlocked_at_xp: 1500 },
  { order_number: 7, name: "Cadencias e Desvios (Ian Guest)", description: "Cadencias perfeita/plagal/deceptiva e imperfeita - repouso e tensao", icon: "⚡", unlocked_at_xp: 2000 },
  { order_number: 8, name: "Analise Funcional (Ian Guest + Roy Bennett)", description: "Leitura de progressoes, repertorio e contexto historico-funcional", icon: "🔍", unlocked_at_xp: 2500 },
  { order_number: 9, name: "Conteudo Avancado (Ian Guest)", description: "Dominantes secundarias, modulacao, emprestimo modal e rearmonizacao", icon: "👑", unlocked_at_xp: 3000 },
];
const DEFAULT_LESSON_SEED_BY_WORLD = {
  1: [
    { order_number: 1, name: "Vibracao e Som", description: "Conceitos basicos de acustica, frequencia e propagacao - Bohumil Med", xp_reward: 50 },
    { order_number: 2, name: "Altura, Intensidade e Timbre", description: "Propriedades fundamentais do som - o que caracteriza uma nota", xp_reward: 50 },
    { order_number: 3, name: "Pentagrama e Claves", description: "Linhas, espacos, clave de Sol e Fa - base da notacao", xp_reward: 50 },
    { order_number: 4, name: "Figuras e Pausas", description: "Semibreve, minima, seminima, colcheia - valores ritmicos na notacao", xp_reward: 50 },
  ],
  2: [
    { order_number: 1, name: "Compassos Basicos", description: "2/4, 3/4 e 4/4 - unidade ritmico-metrica - Bohumil Med", xp_reward: 60 },
    { order_number: 2, name: "Sincope e Contratempo", description: "Deslocamentos ritmicos, acentuacao e pulso", xp_reward: 60 },
    { order_number: 3, name: "Leitura em Claves", description: "Clave de Sol e de Fa - pratica de leitura", xp_reward: 60 },
    { order_number: 4, name: "Ditado e Percepcao Ritmica", description: "Escuta ativa e escrita de padroes ritmicos", xp_reward: 60 },
  ],
  3: [
    { order_number: 1, name: "Intervalos Simples", description: "Classificacao (maior, menor, justo) e calculo em semitons - Bohumil Med", xp_reward: 70 },
    { order_number: 2, name: "Escala Maior", description: "Formula T-T-ST-T-T-T-ST - construcao do modo maior", xp_reward: 70 },
    { order_number: 3, name: "Escala Menor", description: "Natural, harmonica e melodica - tres variantes essenciais", xp_reward: 70 },
    { order_number: 4, name: "Modos Maiores", description: "Jonio, Lidio, Mixolidio - escalas tipicas do sistema tonal", xp_reward: 70 },
  ],
  4: [
    { order_number: 1, name: "Triades Maiores e Menores", description: "Empilhamento de tercas, inversoes e voicings - Bohumil Med", xp_reward: 80 },
    { order_number: 2, name: "Acordes Diminutos e Aumentados", description: "Qualidade acordal, acordes especiais e suas funcoes", xp_reward: 80 },
    { order_number: 3, name: "Campo Harmonico Maior", description: "Graus harmonicos (I, ii, iii, IV, V, vi, vii°) e suas relacoes", xp_reward: 80 },
    { order_number: 4, name: "Tetrades e Campo Menor", description: "Acordes com setima, campo menor harmonico e aplicacoes", xp_reward: 80 },
  ],
  5: [
    { order_number: 1, name: "Funcao Tonica", description: "Repouso, resolucao, estabilidade harmonica - Ian Guest", xp_reward: 90 },
    { order_number: 2, name: "Funcao Subdominante", description: "Preparacao, movimento e transicao harmonica", xp_reward: 90 },
    { order_number: 3, name: "Funcao Dominante", description: "Tensao, sensivel, resolucao em V-I ou V-vi", xp_reward: 90 },
    { order_number: 4, name: "Leitura Funcional Basica", description: "Leitura de qualquer progressao por lentes de T-SD-D", xp_reward: 90 },
  ],
  6: [
    { order_number: 1, name: "Progressao II-V-I", description: "Encadeamento essencial em jazz, pop e classico - Ian Guest", xp_reward: 100 },
    { order_number: 2, name: "Progressao I-IV-V-I", description: "Ciclo tonal fundamental, base para inumeras composicoes", xp_reward: 100 },
    { order_number: 3, name: "Ciclo de Quintas", description: "Movimento contınuo por dominantes, modulacao natural", xp_reward: 100 },
    { order_number: 4, name: "Turnaround e Variacoes", description: "Padroes de retorno, repeticoes e adaptacoes funcionais", xp_reward: 100 },
  ],
  7: [
    { order_number: 1, name: "Cadencia Perfeita (V-I)", description: "Fechamento forte, resolucao completa - Ian Guest", xp_reward: 110 },
    { order_number: 2, name: "Cadencia Plagal (IV-I)", description: "Repouso suave, encerramento menos tensionado", xp_reward: 110 },
    { order_number: 3, name: "Cadencia Deceptiva (V-VI)", description: "Desvio de expectativa, surpresa harmonica", xp_reward: 110 },
    { order_number: 4, name: "Cadencia Imperfeita (V-qualquer)", description: "Resolucao parcial, suspensao do repouso", xp_reward: 110 },
  ],
  8: [
    { order_number: 1, name: "Analise por Funcoes", description: "Leitura de qualquer progressao por lentes de T-SD-D - Ian Guest", xp_reward: 120 },
    { order_number: 2, name: "Analise de Progressoes em Contexto", description: "Identificacao de padroes, substituidos e variantes funcionais", xp_reward: 120 },
    { order_number: 3, name: "Reconhecimento Auditivo de Cadencias", description: "Escuta ativa de V-I, IV-I, V-VI e suas variacoes", xp_reward: 120 },
    { order_number: 4, name: "Estudo de Repertorio Real", description: "Analise de composicoes reais, contexto historico e aplicacao - Roy Bennett", xp_reward: 120 },
  ],
  9: [
    { order_number: 1, name: "Dominantes Secundarias", description: "Funcoes harmonicas temporarias, tensao expandida - Ian Guest", xp_reward: 140 },
    { order_number: 2, name: "Modulacao", description: "Mudanca de centro tonal, ponte harmonica entre tonalidades", xp_reward: 140 },
    { order_number: 3, name: "Emprestimo Modal", description: "Acordes do paralelo, cromatismo harmonico controlado", xp_reward: 140 },
    { order_number: 4, name: "Rearmonizacao e Substituicoes", description: "Variacoes acordais, turnaround, aplicacoes criativas", xp_reward: 140 },
  ],
};
const CURRICULUM_SOURCE_BY_WORLD_ORDER = {
  1: {
    axis: "teoria-musical",
    axis_label: "Notacao e Leitura",
    source_key: "bohumil_med",
    source_label: "Bohumil Med",
    source_summary: "Fundamentos de notacao, acustica, pentagrama, claves e figuras ritmicas.",
  },
  2: {
    axis: "teoria-musical",
    axis_label: "Ritmo e Metrica",
    source_key: "bohumil_med",
    source_label: "Bohumil Med",
    source_summary: "Compassos, sincopa, contratempo e consolidacao da percepcao ritmica.",
  },
  3: {
    axis: "teoria-musical",
    axis_label: "Intervalos e Escalas",
    source_key: "bohumil_med",
    source_label: "Bohumil Med",
    source_summary: "Intervalos, escalas maior/menor/modos e construcao melodica.",
  },
  4: {
    axis: "teoria-musical",
    axis_label: "Acordes e Campo Harmonico",
    source_key: "bohumil_med",
    source_label: "Bohumil Med",
    source_summary: "Triades, tetrades, campo harmonico e inversoes acordais.",
  },
  5: {
    axis: "harmonia-funcional",
    axis_label: "Funcoes Harmonicas",
    source_key: "ian_guest",
    source_label: "Ian Guest",
    source_summary: "Tonica, subdominante, dominante e sensivel em leitura funcional.",
  },
  6: {
    axis: "harmonia-funcional",
    axis_label: "Progressoes e Encadeamentos",
    source_key: "ian_guest",
    source_label: "Ian Guest",
    source_summary: "II-V-I, I-IV-V-I, ciclo de quintas e turnarounds.",
  },
  7: {
    axis: "harmonia-funcional",
    axis_label: "Cadencias e Desvios",
    source_key: "ian_guest",
    source_label: "Ian Guest",
    source_summary: "Cadencias perfeita, plagal, deceptiva e imperfeita.",
  },
  8: {
    axis: "harmonia-funcional-e-historica",
    axis_label: "Analise Funcional e Historica",
    source_key: "ian_guest_e_roy_bennett",
    source_label: "Ian Guest + Roy Bennett",
    source_summary: "Leitura de progressoes em contexto tonalista com analise de repertorio historico.",
  },
  9: {
    axis: "harmonia-funcional-avancada",
    axis_label: "Conteudo Avancado",
    source_key: "ian_guest",
    source_label: "Ian Guest",
    source_summary: "Dominantes secundarias, modulacao, emprestimo modal e rearmonizacao.",
  },
};
const ADMIN_TEST_USERS = uniqueList(
  [
    process.env.ADMIN_USERNAME || "admin",
    ...(process.env.ADMIN_TEST_USERS || "").split(","),
  ].map((item) => normalizeText(item))
);
let musiversoSeedPromise = null;
const LEGACY_QUESTIONS = legacyQuestionBank.map((question, index) => ({
  id: -(index + 1),
  ...question,
}));

function ensureSupabase(res) {
  if (supabase) {
    return true;
  }

  res.status(503).json({ error: "Supabase nao configurado" });
  return false;
}

function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function shuffleList(items) {
  const list = [...items];
  for (let index = list.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [list[index], list[swapIndex]] = [list[swapIndex], list[index]];
  }
  return list;
}

function uniqueList(values) {
  return [...new Set(values.filter(Boolean))];
}

function detectTopicHints(text) {
  const normalized = normalizeText(text);
  const hints = [];

  if (/(harmonia|acorde|acordes|triade|triades|tetrade|tetra|cadenc|dominante|subdominante|tonica|funcional|progress|ii v i|campo harmonico|ciclo de quintas|modulac|modo)/.test(normalized)) {
    hints.push("harmonia-funcional");
  }

  if (/(historia|periodo|barroco|classico|romantico|renascimento|compositor|estilo)/.test(normalized)) {
    hints.push("historia-da-musica");
  }

  if (/(teoria|musica|som|ritmo|leitura|clave|pentagrama|figura|intervalo|escala|compasso|pulsacao|andamento|semitom|tom|nota|notas|timbre|duracao|intensidade|altura)/.test(normalized)) {
    hints.push("teoria-musical");
  }

  return uniqueList(hints);
}

function extractKeywordsFromContext(lesson, world) {
  const contextText = [
    lesson?.name,
    lesson?.description,
    world?.name,
    world?.description,
  ].join(" ");

  const normalized = normalizeText(contextText);
  const tokens = normalized.match(/[a-z0-9-]{3,}/g) || [];
  const curated = [];

  if (/fundamentos/.test(normalized)) {
    curated.push("musica", "som", "sons", "teoria", "pentagrama", "figura", "ritmo", "clave");
  }
  if (/(leitura|ritmo)/.test(normalized)) {
    curated.push("ritmo", "compasso", "leitura", "clave", "pulsacao", "sincope", "figura");
  }
  if (/(intervalos|escalas)/.test(normalized)) {
    curated.push("intervalo", "intervalos", "escala", "escalas", "tom", "semitom", "oitava");
  }
  if (/acordes/.test(normalized)) {
    curated.push("acorde", "acordes", "triade", "triades", "tetrade", "campo", "harmonico");
  }
  if (/harmonia funcional/.test(normalized)) {
    curated.push("harmonia", "funcao", "funcional", "tonica", "dominante", "subdominante", "sensivel");
  }
  if (/progress/.test(normalized)) {
    curated.push("progressao", "progressoes", "ciclo", "quintas", "ii", "v", "i");
  }
  if (/cadenc/.test(normalized)) {
    curated.push("cadencia", "cadencias", "plagal", "deceptiva", "imperfeita", "perfeita", "autentica");
  }
  if (/analise/.test(normalized)) {
    curated.push("analise", "funcional", "identificacao", "harmonia");
  }
  if (/avanc/.test(normalized)) {
    curated.push("modulacao", "modulacoes", "dominante", "secundaria", "modos", "modal");
  }

  return uniqueList([...tokens, ...curated]).filter((item) => item.length >= 3);
}

function buildLessonContext(lesson, world) {
  const normalizedLessonName = normalizeText(lesson?.name);
  const lessonTopicOverride = LESSON_TOPIC_OVERRIDES[normalizedLessonName];
  const lessonFocusOverride = LESSON_FOCUS_OVERRIDES[normalizedLessonName] || {};
  const lessonKeywords = LESSON_KEYWORD_OVERRIDES[normalizedLessonName] || extractKeywordsFromContext(lesson, null);
  const worldKeywords = extractKeywordsFromContext(null, world);

  return {
    topicHints: uniqueList(
      lessonTopicOverride?.topicHints || [
        ...detectTopicHints(world?.name),
        ...detectTopicHints(world?.description),
        ...detectTopicHints(lesson?.name),
        ...detectTopicHints(lesson?.description),
      ]
    ),
    keywords: lessonKeywords.length ? lessonKeywords : worldKeywords,
    maxDifficulty: lessonTopicOverride?.maxDifficulty || null,
    preferredSubthemes: uniqueList(lessonFocusOverride.preferredSubthemes || []),
    excludedSubthemes: uniqueList(lessonFocusOverride.excludedSubthemes || []),
    requiredKeywords: uniqueList(lessonFocusOverride.requiredKeywords || []),
  };
}

function getQuestionIdentity(question) {
  const textIdentity = normalizeText(question?.question_text || question?.question || question?.pergunta);
  if (textIdentity) {
    return `text:${textIdentity}`;
  }

  if (question?.id != null) {
    return `id:${question.id}`;
  }

  return null;
}

function getQuestionSearchText(question) {
  const textParts = [
    question?.question_text,
    question?.question,
    question?.pergunta,
    question?.explanation,
    question?.tema,
    question?.topico,
    question?.topic,
    question?.subtema,
    question?.subtopic,
    question?.category,
  ];

  if (Array.isArray(question?.tags)) {
    textParts.push(question.tags.join(" "));
  }

  return normalizeText(textParts.filter(Boolean).join(" "));
}

function getQuestionTopicSignals(question) {
  const baseSignals = [
    question?.topico,
    question?.topic,
    question?.tema,
    question?.theme,
    question?.subtema,
    question?.subtopic,
  ].map((item) => normalizeText(item)).filter(Boolean);

  const tagSignals = Array.isArray(question?.tags)
    ? question.tags.map((item) => normalizeText(item)).filter(Boolean)
    : [];

  return uniqueList([...baseSignals, ...tagSignals]);
}

function getQuestionSubthemeSignals(question) {
  const baseSignals = [
    question?.subtema,
    question?.subtopic,
    question?.category,
  ].map((item) => normalizeText(item)).filter(Boolean);

  const tagSignals = Array.isArray(question?.tags)
    ? question.tags.map((item) => normalizeText(item)).filter(Boolean)
    : [];

  return uniqueList([...baseSignals, ...tagSignals]);
}

function scoreQuestionByKeywords(question, keywords) {
  const searchText = getQuestionSearchText(question);
  let score = 0;

  for (const keyword of keywords) {
    if (keyword && searchText.includes(keyword)) {
      score += 2;
    }
  }

  return score;
}

function scoreQuestionAgainstContext(question, topicHints, keywords, preferredSubthemes = [], excludedSubthemes = []) {
  const searchText = getQuestionSearchText(question);
  const topicSignals = getQuestionTopicSignals(question);
  const subthemeSignals = getQuestionSubthemeSignals(question);
  let score = scoreQuestionByKeywords(question, keywords);

  if (topicSignals.some((signal) => topicHints.includes(signal))) {
    score += 10;
  }

  if (preferredSubthemes.some((signal) => subthemeSignals.includes(signal))) {
    score += 18;
  }

  if (excludedSubthemes.some((signal) => subthemeSignals.includes(signal))) {
    score -= 14;
  }

  for (const topicHint of topicHints) {
    if (topicHint && searchText.includes(topicHint)) {
      score += 5;
    }
  }
  return score;
}

function pickQuestionsForLesson(candidates, lesson, world, count) {
  const {
    topicHints,
    keywords,
    preferredSubthemes,
    excludedSubthemes,
    requiredKeywords,
  } = buildLessonContext(lesson, world);

  if (!topicHints.length && !keywords.length && !preferredSubthemes.length) {
    return shuffleList(candidates).slice(0, count);
  }

  const scored = candidates
    .map((question) => ({
      question,
      score: scoreQuestionAgainstContext(question, topicHints, keywords, preferredSubthemes, excludedSubthemes),
      subthemeSignals: getQuestionSubthemeSignals(question),
      keywordScore: scoreQuestionByKeywords(question, requiredKeywords),
    }))
    .sort((left, right) => right.score - left.score);

  const isPreferred = (item) =>
    !preferredSubthemes.length ||
    item.subthemeSignals.some((signal) => preferredSubthemes.includes(signal));
  const isBlocked = (item) =>
    excludedSubthemes.length && item.subthemeSignals.some((signal) => excludedSubthemes.includes(signal));

  const strict = scored.filter((item) => !isBlocked(item) && isPreferred(item) && (!requiredKeywords.length || item.keywordScore > 0));
  const focused = scored.filter((item) => !isBlocked(item) && isPreferred(item) && item.score > 0);
  const thematic = scored.filter((item) => !isBlocked(item) && item.score > 0);
  const fallback = shuffleList(scored.filter((item) => !isBlocked(item) && item.score <= 0).map((item) => item.question));
  const blockedFallback = shuffleList(scored.filter((item) => isBlocked(item)).map((item) => item.question));

  return dedupeQuestionsByIdentity([
    ...strict.map((item) => item.question),
    ...focused.map((item) => item.question),
    ...thematic.map((item) => item.question),
    ...fallback,
    ...blockedFallback,
  ]).slice(0, count);
}

function normalizeDifficulty(value) {
  const normalized = normalizeText(value);
  if (normalized === "facil") {
    return "easy";
  }
  if (normalized === "medio") {
    return "medium";
  }
  if (normalized === "dificil") {
    return "hard";
  }
  if (normalized === "easy" || normalized === "medium" || normalized === "hard") {
    return normalized;
  }
  return "medium";
}

function shiftDifficulty(baseDifficulty, delta) {
  const baseIndex = DIFFICULTY_ORDER.indexOf(normalizeDifficulty(baseDifficulty));
  const nextIndex = Math.max(0, Math.min(DIFFICULTY_ORDER.length - 1, baseIndex + delta));
  return DIFFICULTY_ORDER[nextIndex];
}

function getWorldBaseDifficulty(orderNumber) {
  if (!orderNumber || orderNumber <= 3) {
    return "easy";
  }
  if (orderNumber <= 6) {
    return "medium";
  }
  return "hard";
}

function getCurriculumSourceForWorld(world) {
  if (!world) {
    return {
      axis: null,
      axis_label: null,
      source_key: null,
      source_label: null,
      source_summary: null,
    };
  }

  const mapped = CURRICULUM_SOURCE_BY_WORLD_ORDER[Number(world.order_number)] || {};
  return {
    axis: mapped.axis || null,
    axis_label: mapped.axis_label || null,
    source_key: mapped.source_key || null,
    source_label: mapped.source_label || null,
    source_summary: mapped.source_summary || null,
  };
}

function inferLessonCompetency(lesson, world) {
  const normalizedLessonName = normalizeText(lesson?.name);
  const normalizedWorldName = normalizeText(world?.name);

  if (normalizedLessonName.includes("analise") || normalizedLessonName.includes("repertorio")) {
    return "analise";
  }
  if (
    normalizedLessonName.includes("aplicacao") ||
    normalizedLessonName.includes("progres") ||
    normalizedLessonName.includes("cadencia") ||
    normalizedLessonName.includes("turnaround") ||
    normalizedLessonName.includes("dominantes") ||
    normalizedLessonName.includes("modulacao") ||
    normalizedLessonName.includes("emprestimo") ||
    normalizedLessonName.includes("rearmonizacao")
  ) {
    return "aplicacao";
  }
  if (
    normalizedWorldName.includes("fundamentos") ||
    normalizedWorldName.includes("leitura") ||
    normalizedLessonName.includes("o que e") ||
    normalizedLessonName.includes("elementos") ||
    normalizedLessonName.includes("pentagrama")
  ) {
    return "compreensao";
  }
  return "identificacao";
}

function getCompetencyLabel(competency) {
  if (competency === "analise") {
    return "Analise";
  }
  if (competency === "aplicacao") {
    return "Aplicacao";
  }
  if (competency === "compreensao") {
    return "Compreensao";
  }
  return "Identificacao";
}

function getXpAwardForMode(mode, correct) {
  const normalizedMode = normalizeText(mode) || "standard";
  const config = TIMED_QUIZ_XP[normalizedMode] || TIMED_QUIZ_XP.standard;
  return correct ? config.correct : config.wrong;
}

function getTierByXp(xp) {
  if (xp >= 3000) return "maestro";
  if (xp >= 2000) return "harmonicista";
  if (xp >= 1000) return "explorador";
  return "iniciante";
}

function getMeteorAchievementName(milestone) {
  return `${METEOR_ACHIEVEMENT_PREFIX} ${milestone}`;
}

async function ensureMeteorAchievement(milestone) {
  const name = getMeteorAchievementName(milestone);

  const { data: existing, error: existingError } = await supabase
    .from("achievements")
    .select("id")
    .eq("name", name)
    .maybeSingle();

  if (existingError) throw existingError;
  if (existing?.id) {
    return existing.id;
  }

  const { data: inserted, error: insertError } = await supabase
    .from("achievements")
    .insert({
      name,
      description: `Supere o desafio do meteoro apos ${milestone} acertos e salve o planeta em 2 minutos.`,
      icon: "☄️",
      category: "explorer",
      unlock_requirement: {
        type: "meteor_challenge",
        milestone,
        reward_xp: METEOR_CHALLENGE_REWARD_XP,
      },
    })
    .select("id")
    .single();

  if (insertError) throw insertError;
  return inserted.id;
}

function buildLessonCurriculum(lesson, world) {
  const worldCurriculum = getCurriculumSourceForWorld(world);
  const focus = LESSON_FOCUS_OVERRIDES[normalizeText(lesson?.name)] || null;
  const competency = inferLessonCompetency(lesson, world);

  return {
    ...worldCurriculum,
    competency,
    competency_label: getCompetencyLabel(competency),
    focus_subthemes: focus?.preferredSubthemes || [],
    focus_keywords: focus?.requiredKeywords || [],
  };
}

function buildDifficultyPlan(baseDifficulty, lessonOrder, totalCount) {
  const count = Math.max(1, totalCount);
  const lessonStep = Math.max(1, Math.min(4, Number(lessonOrder) || 1));
  const ratios = {
    easy: 0,
    medium: 0,
    hard: 0,
  };

  if (baseDifficulty === "easy") {
    if (lessonStep <= 2) {
      ratios.easy = 0.8;
      ratios.medium = 0.2;
    } else {
      ratios.easy = 0.65;
      ratios.medium = 0.35;
    }
  } else if (baseDifficulty === "medium") {
    if (lessonStep === 1) {
      ratios.easy = 0.25;
      ratios.medium = 0.6;
      ratios.hard = 0.15;
    } else if (lessonStep <= 3) {
      ratios.easy = 0.15;
      ratios.medium = 0.65;
      ratios.hard = 0.2;
    } else {
      ratios.easy = 0.1;
      ratios.medium = 0.55;
      ratios.hard = 0.35;
    }
  } else {
    if (lessonStep === 1) {
      ratios.medium = 0.3;
      ratios.hard = 0.7;
    } else {
      ratios.medium = 0.2;
      ratios.hard = 0.8;
    }
  }

  const plan = {
    easy: Math.floor(count * ratios.easy),
    medium: Math.floor(count * ratios.medium),
    hard: Math.floor(count * ratios.hard),
  };

  let allocated = plan.easy + plan.medium + plan.hard;
  while (allocated < count) {
    plan[baseDifficulty] += 1;
    allocated += 1;
  }

  return plan;
}

function dedupeQuestionsByIdentity(questions) {
  const seen = new Set();
  const deduped = [];
  for (const question of questions) {
    const identity = getQuestionIdentity(question);
    if (!identity || seen.has(identity)) {
      continue;
    }
    seen.add(identity);
    deduped.push(question);
  }
  return deduped;
}

function getCoverageScore(questions, lesson, world) {
  const { topicHints, keywords, preferredSubthemes, excludedSubthemes } = buildLessonContext(lesson, world);
  return (questions || []).reduce(
    (sum, question) => sum + scoreQuestionAgainstContext(question, topicHints, keywords, preferredSubthemes, excludedSubthemes),
    0
  );
}

function filterOutRecentQuestions(questions, recentQuestionIds) {
  if (!recentQuestionIds?.size) {
    return questions;
  }

  return (questions || []).filter((question) => !recentQuestionIds.has(Number(question?.id)));
}

function buildLevelPriority(baseDifficulty) {
  if (baseDifficulty === "hard") {
    return ["hard", "medium", "easy"];
  }
  if (baseDifficulty === "medium") {
    return ["medium", "hard", "easy"];
  }
  return ["easy", "medium", "hard"];
}

function assembleQuestionsByPlan(plan, questions, totalCount, baseDifficulty) {
  const deduped = dedupeQuestionsByIdentity(questions || []);
  const buckets = {
    easy: [],
    medium: [],
    hard: [],
  };

  for (const question of deduped) {
    const normalizedLevel = normalizeDifficulty(question?.level || question?.nivel);
    if (!buckets[normalizedLevel]) {
      continue;
    }
    buckets[normalizedLevel].push(question);
  }

  const selected = [];
  for (const level of DIFFICULTY_ORDER) {
    const targetCount = Math.max(0, plan?.[level] || 0);
    if (!targetCount) {
      continue;
    }
    selected.push(...buckets[level].slice(0, targetCount));
    buckets[level] = buckets[level].slice(targetCount);
  }

  if (selected.length >= totalCount) {
    return selected.slice(0, totalCount);
  }

  const levelPriority = buildLevelPriority(baseDifficulty);
  for (const level of levelPriority) {
    if (selected.length >= totalCount) {
      break;
    }
    selected.push(...buckets[level].slice(0, totalCount - selected.length));
    buckets[level] = buckets[level].slice(Math.max(0, totalCount - selected.length));
  }

  if (selected.length >= totalCount) {
    return selected.slice(0, totalCount);
  }

  for (const level of DIFFICULTY_ORDER) {
    if (selected.length >= totalCount) {
      break;
    }
    selected.push(...buckets[level].slice(0, totalCount - selected.length));
  }

  return selected.slice(0, totalCount);
}

function pickLegacyQuestionsForLesson(lesson, world, difficulty, count) {
  const {
    topicHints,
    keywords,
    maxDifficulty,
    preferredSubthemes,
    excludedSubthemes,
    requiredKeywords,
  } = buildLessonContext(lesson, world);
  const effectiveDifficulty = maxDifficulty && DIFFICULTY_RANK[difficulty] > DIFFICULTY_RANK[maxDifficulty]
    ? maxDifficulty
    : difficulty;
  const requestedLegacyLevel = LEGACY_LEVEL_BY_DIFFICULTY[effectiveDifficulty] || "medio";
  const levelOrder = uniqueList([requestedLegacyLevel, "medio", "facil", "dificil"]);
  const exactTopicMatches = LEGACY_QUESTIONS.filter((question) => {
    const topicSignals = getQuestionTopicSignals(question);
    return topicSignals.some((signal) => topicHints.includes(signal));
  });
  const strictTopicMatches = exactTopicMatches.filter(
    (question) => scoreQuestionByKeywords(question, keywords) > 0
  );
  const keywordMatches = LEGACY_QUESTIONS.filter(
    (question) => scoreQuestionByKeywords(question, keywords) > 0
  );
  const sourcePool = strictTopicMatches.length
    ? strictTopicMatches
    : keywordMatches.length
      ? keywordMatches
      : exactTopicMatches.length
      ? exactTopicMatches
      : LEGACY_QUESTIONS;

  const ranked = sourcePool
    .map((question) => ({
      question,
      score:
        scoreQuestionAgainstContext(question, topicHints, keywords, preferredSubthemes, excludedSubthemes) +
        (question.nivel === requestedLegacyLevel ? 3 : 0),
      levelRank: levelOrder.indexOf(question.nivel),
      subthemeSignals: getQuestionSubthemeSignals(question),
      keywordScore: scoreQuestionByKeywords(question, requiredKeywords),
    }))
    .filter((item) => item.score > 0)
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }
      return left.levelRank - right.levelRank;
    });

  const isPreferred = (item) =>
    !preferredSubthemes.length ||
    item.subthemeSignals.some((signal) => preferredSubthemes.includes(signal));
  const isBlocked = (item) =>
    excludedSubthemes.length && item.subthemeSignals.some((signal) => excludedSubthemes.includes(signal));

  const strict = ranked.filter((item) => !isBlocked(item) && isPreferred(item) && (!requiredKeywords.length || item.keywordScore > 0));
  const focused = ranked.filter((item) => !isBlocked(item) && isPreferred(item));
  const thematic = ranked.filter((item) => !isBlocked(item));
  const blocked = ranked.filter((item) => isBlocked(item));

  return dedupeQuestionsByIdentity([
    ...strict.map((item) => item.question),
    ...focused.map((item) => item.question),
    ...thematic.map((item) => item.question),
    ...blocked.map((item) => item.question),
  ]).slice(0, count);
}

function pickLegacyQuestionsByPlan(lesson, world, plan, totalCount) {
  const byLevel = [];
  for (const difficulty of DIFFICULTY_ORDER) {
    const levelCount = plan[difficulty] || 0;
    if (!levelCount) {
      continue;
    }
    byLevel.push(...pickLegacyQuestionsForLesson(lesson, world, difficulty, levelCount));
  }

  return dedupeQuestionsByIdentity(byLevel).slice(0, totalCount);
}

function serializeQuestion(question, lesson, world) {
  const lessonCurriculum = buildLessonCurriculum(lesson, world);
  const authorBase = question.autor_base || question.author_base || lessonCurriculum.source_key;
  const competency = question.competencia || lessonCurriculum.competency;

  return {
    id: question.id,
    question_text: question.question_text || question.question || question.pergunta || "Pergunta indisponivel",
    options: Array.isArray(question.options)
      ? question.options
      : Array.isArray(question.opcoes)
        ? question.opcoes
        : [],
    level: normalizeDifficulty(question.level || question.nivel),
    explanation: question.explanation || question.explicacoes?.[question.resposta] || "",
    autor_base: authorBase,
    autor_label: authorBase === "bohumil_med"
      ? "Bohumil Med"
      : authorBase === "roy_bennett"
        ? "Roy Bennett"
        : authorBase === "ian_guest"
          ? "Ian Guest"
          : lessonCurriculum.source_label,
    competencia: competency,
    competencia_label: getCompetencyLabel(competency),
    eixo_curricular: question.tema || lessonCurriculum.axis,
    axis_label: lessonCurriculum.axis_label,
  };
}

function isAdminPlayer(player) {
  const normalizedName = normalizeText(player?.name);
  if (!normalizedName) {
    return false;
  }

  return normalizedName.startsWith("admin") || ADMIN_TEST_USERS.includes(normalizedName);
}

async function ensureMusiversoSeed() {
  if (!supabase) {
    return;
  }

  if (!musiversoSeedPromise) {
    musiversoSeedPromise = (async () => {
      const { data: existingWorlds, error: worldsError } = await supabase
        .from("worlds")
        .select("id, order_number");

      if (worldsError) throw worldsError;

      const existingWorldByOrder = new Map((existingWorlds || []).map((world) => [world.order_number, world]));
      const worldsToInsert = DEFAULT_WORLD_SEED.filter((world) => !existingWorldByOrder.has(world.order_number));

      if (worldsToInsert.length) {
        const { error: insertWorldError } = await supabase.from("worlds").insert(worldsToInsert);
        if (insertWorldError) throw insertWorldError;
      }

      const { data: allWorlds, error: allWorldsError } = await supabase
        .from("worlds")
        .select("id, order_number");

      if (allWorldsError) throw allWorldsError;

      for (const world of allWorlds || []) {
        const templates = DEFAULT_LESSON_SEED_BY_WORLD[world.order_number] || [];
        if (!templates.length) {
          continue;
        }

        const { data: existingLessons, error: lessonsError } = await supabase
          .from("lessons")
          .select("order_number")
          .eq("world_id", world.id);

        if (lessonsError) throw lessonsError;

        const existingOrders = new Set((existingLessons || []).map((lesson) => lesson.order_number));
        const lessonsToInsert = templates
          .filter((lesson) => !existingOrders.has(lesson.order_number))
          .map((lesson) => ({
            world_id: world.id,
            order_number: lesson.order_number,
            name: lesson.name,
            description: lesson.description,
            xp_reward: lesson.xp_reward,
          }));

        if (lessonsToInsert.length) {
          const { error: insertLessonsError } = await supabase.from("lessons").insert(lessonsToInsert);
          if (insertLessonsError) throw insertLessonsError;
        }
      }
    })().catch((error) => {
      musiversoSeedPromise = null;
      throw error;
    });
  }

  await musiversoSeedPromise;
}

function getLegacyQuestionById(questionId) {
  const numericId = Number(questionId);
  if (!Number.isFinite(numericId) || numericId >= 0) {
    return null;
  }

  return LEGACY_QUESTIONS.find((question) => question.id === numericId) || null;
}

/**
 * GET /worlds
 * Retorna todos os 9 mundos e status de desbloqueio do jogador
 */
router.get("/worlds", async (req, res) => {
  if (!ensureSupabase(res)) return;

  try {
    await ensureMusiversoSeed();

    const { player_id } = req.query;

    const { data: worlds, error: worldsError } = await supabase
      .from("worlds")
      .select("*")
      .order("order_number", { ascending: true });

    if (worldsError) throw worldsError;

    if (!player_id) {
      return res.json(worlds);
    }

    // Buscar XP do jogador para verificar mundos desbloqueados
    const { data: player, error: playerError } = await supabase
      .from("players")
      .select("name, xp")
      .eq("id", player_id)
      .single();

    if (playerError && playerError.code !== "PGRST116") throw playerError;

    const playerXp = player?.xp || 0;
    const adminAccount = isAdminPlayer(player);

    // Marcar mundos como desbloqueados baseado em XP
    const worldsWithStatus = worlds.map((world) => ({
      ...world,
      unlocked: adminAccount ? true : playerXp >= world.unlocked_at_xp,
      xp_to_unlock: adminAccount ? 0 : Math.max(0, world.unlocked_at_xp - playerXp),
      curriculum: getCurriculumSourceForWorld(world),
    }));

    res.json(worldsWithStatus);
  } catch (error) {
    console.error("Error fetching worlds:", error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /worlds/:worldId/lessons
 * Retorna todas as lições de um mundo
 */
router.get("/worlds/:worldId/lessons", async (req, res) => {
  if (!ensureSupabase(res)) return;

  try {
    await ensureMusiversoSeed();

    const { worldId } = req.params;
    const { player_id } = req.query;

    const { data: lessons, error: lessonsError } = await supabase
      .from("lessons")
      .select("*")
      .eq("world_id", worldId)
      .order("order_number", { ascending: true });

    if (lessonsError) throw lessonsError;

    const { data: world, error: worldError } = await supabase
      .from("worlds")
      .select("id, order_number, name")
      .eq("id", worldId)
      .single();

    if (worldError) throw worldError;

    if (!player_id) {
      return res.json(lessons.map((lesson) => ({
        ...lesson,
        curriculum: buildLessonCurriculum(lesson, world),
      })));
    }

    // Buscar progresso do jogador nas lições
    const { data: progression, error: progressionError } = await supabase
      .from("player_progression")
      .select("lesson_id, xp_earned, completed_at, attempts")
      .eq("player_id", player_id);

    if (progressionError && progressionError.code !== "PGRST116") {
      throw progressionError;
    }

    const progressMap = {};
    (progression || []).forEach((p) => {
      progressMap[p.lesson_id] = p;
    });

    const lessonsWithProgress = lessons.map((lesson) => ({
      ...lesson,
      completed: !!progressMap[lesson.id]?.completed_at,
      xp_earned: progressMap[lesson.id]?.xp_earned || 0,
      attempts: progressMap[lesson.id]?.attempts || 0,
      curriculum: buildLessonCurriculum(lesson, world),
    }));

    res.json(lessonsWithProgress);
  } catch (error) {
    console.error("Error fetching lessons:", error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /questions
 * Pega perguntas adaptadas ao nível do jogador
 * Query params: lesson_id, count, difficulty
 */
router.get("/questions", async (req, res) => {
  if (!ensureSupabase(res)) return;

  try {
    const {
      lesson_id,
      player_id,
      count = 10,
      difficulty = "medium",
    } = req.query;

    let adjustedDifficulty = difficulty;

    // Se houver player_id, ajustar dificuldade baseado em desempenho anterior
    if (player_id && lesson_id) {
      const { data: performance } = await supabase
        .from("adaptivity_log")
        .select("correct")
        .eq("player_id", player_id)
        .eq("lesson_id", lesson_id)
        .order("created_at", { ascending: false })
        .limit(5);

      const recentCorrect = performance?.filter((p) => p.correct).length || 0;
      const recentTotal = performance?.length || 0;

      // Ajustar nível dinamicamente
      if (recentTotal >= 3) {
        const accuracy = recentCorrect / recentTotal;
        if (accuracy >= 0.9 && difficulty !== "hard") {
          adjustedDifficulty = "hard";
        } else if (accuracy < 0.5 && difficulty !== "easy") {
          adjustedDifficulty = "easy";
        }
      }
    }

    let lesson = null;
    let world = null;

    if (lesson_id) {
      const { data: lessonData, error: lessonError } = await supabase
        .from("lessons")
        .select("id, name, description, world_id, order_number")
        .eq("id", lesson_id)
        .single();

      if (lessonError && lessonError.code !== "PGRST116") throw lessonError;
      lesson = lessonData || null;

      if (lesson?.world_id) {
        const { data: worldData, error: worldError } = await supabase
          .from("worlds")
            .select("id, name, description, order_number")
          .eq("id", lesson.world_id)
          .single();

        if (worldError && worldError.code !== "PGRST116") throw worldError;
        world = worldData || null;
      }
    }

    const requestedCount = Math.max(5, Math.min(20, parseInt(count, 10) || 10));
    const requestedDifficulty = normalizeDifficulty(difficulty);
    const adaptiveDifficulty = normalizeDifficulty(adjustedDifficulty);
    const worldBaseDifficulty = world?.order_number
      ? getWorldBaseDifficulty(world.order_number)
      : requestedDifficulty;

    let baseDifficulty = worldBaseDifficulty;
    const rankDelta = DIFFICULTY_RANK[adaptiveDifficulty] - DIFFICULTY_RANK[worldBaseDifficulty];
    if (rankDelta >= 1) {
      baseDifficulty = shiftDifficulty(worldBaseDifficulty, 1);
    } else if (rankDelta <= -1) {
      baseDifficulty = shiftDifficulty(worldBaseDifficulty, -1);
    }

    const difficultyPlan = buildDifficultyPlan(baseDifficulty, lesson?.order_number, requestedCount);
    let recentQuestionIds = new Set();

    if (player_id) {
      const { data: recentAnswers, error: recentAnswersError } = await supabase
        .from("adaptivity_log")
        .select("question_id")
        .eq("player_id", player_id)
        .order("created_at", { ascending: false })
        .limit(RECENT_QUESTION_WINDOW);

      if (recentAnswersError) throw recentAnswersError;

      recentQuestionIds = new Set(
        (recentAnswers || [])
          .map((entry) => Number(entry.question_id))
          .filter((entry) => Number.isFinite(entry))
      );
    }

    const candidateLimit = Math.max(requestedCount * 16, 120);
    const { data: candidateQuestions, error } = await supabase
      .from("quiz_questions")
      .select("*")
      .eq("active", true)
      .in("level", DIFFICULTY_ORDER)
      .limit(candidateLimit);

    if (error) throw error;

    const allCandidateQuestions = candidateQuestions || [];
    const eligibleCandidateQuestions = filterOutRecentQuestions(allCandidateQuestions, recentQuestionIds);
    const effectiveCandidateQuestions = eligibleCandidateQuestions;

    const questionsByLevel = {
      easy: effectiveCandidateQuestions.filter((question) => question.level === "easy"),
      medium: effectiveCandidateQuestions.filter((question) => question.level === "medium"),
      hard: effectiveCandidateQuestions.filter((question) => question.level === "hard"),
    };

    const selectedByPlan = [];
    for (const level of DIFFICULTY_ORDER) {
      const levelCount = difficultyPlan[level] || 0;
      if (!levelCount) {
        continue;
      }
      const pool = questionsByLevel[level] || [];
      const levelSelection = lesson
        ? pickQuestionsForLesson(pool, lesson, world, levelCount)
        : shuffleList(pool).slice(0, levelCount);
      selectedByPlan.push(...levelSelection);
    }

    let selectedQuestions = dedupeQuestionsByIdentity(selectedByPlan);
    if (selectedQuestions.length < requestedCount) {
      const fallbackPool = lesson
        ? pickQuestionsForLesson(effectiveCandidateQuestions, lesson, world, requestedCount * 2)
        : shuffleList(effectiveCandidateQuestions).slice(0, requestedCount * 2);
      selectedQuestions = dedupeQuestionsByIdentity([...selectedQuestions, ...fallbackPool]);
    }
    if (selectedQuestions.length < requestedCount) {
      const repeatedFallbackPool = lesson
        ? pickQuestionsForLesson(allCandidateQuestions, lesson, world, requestedCount * 2)
        : shuffleList(allCandidateQuestions).slice(0, requestedCount * 2);
      selectedQuestions = dedupeQuestionsByIdentity([...selectedQuestions, ...repeatedFallbackPool]);
    }
    selectedQuestions = selectedQuestions.slice(0, requestedCount);

    const normalizedLessonName = normalizeText(lesson?.name);
    const hasLessonOverride = Boolean(LESSON_TOPIC_OVERRIDES[normalizedLessonName] || LESSON_KEYWORD_OVERRIDES[normalizedLessonName]);
    const legacyFallback = lesson
      ? filterOutRecentQuestions(pickLegacyQuestionsByPlan(lesson, world, difficultyPlan, requestedCount * 2), recentQuestionIds)
      : [];

    const dbCoverageScore = lesson ? getCoverageScore(selectedQuestions, lesson, world) : 0;
    const legacyCoverageScore = lesson ? getCoverageScore(legacyFallback, lesson, world) : 0;
    const preferredQuestions = hasLessonOverride
      ? legacyFallback
      : legacyCoverageScore > dbCoverageScore
        ? legacyFallback
        : selectedQuestions;
    const secondaryQuestions = preferredQuestions === legacyFallback ? selectedQuestions : legacyFallback;
    const finalQuestions = assembleQuestionsByPlan(
      difficultyPlan,
      [...preferredQuestions, ...secondaryQuestions],
      requestedCount,
      baseDifficulty
    );

    res.json({
      questions: finalQuestions.map((question) => serializeQuestion(question, lesson, world)),
      adjusted_difficulty: baseDifficulty,
      requested_count: requestedCount,
      difficulty_plan: difficultyPlan,
      lesson_theme: lesson?.name || null,
      world_theme: world?.name || null,
      curriculum: buildLessonCurriculum(lesson, world),
    });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /answer
 * Processa resposta do jogador e retorna feedback + feedback IA
 */
router.post("/answer", async (req, res) => {
  if (!ensureSupabase(res)) return;

  try {
    const { player_id, lesson_id, question_id, user_answer, challenge_mode } = req.body;

    if (!player_id || !question_id) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const legacyQuestion = getLegacyQuestionById(question_id);
    let question = null;

    if (legacyQuestion) {
      question = {
        id: legacyQuestion.id,
        question_text: legacyQuestion.pergunta,
        options: legacyQuestion.opcoes,
        correct_option: legacyQuestion.resposta,
        explanation: legacyQuestion.explicacoes?.[legacyQuestion.resposta] || null,
      };
    } else {
      const { data: dbQuestion, error: questionError } = await supabase
        .from("quiz_questions")
        .select("*")
        .eq("id", question_id)
        .single();

      if (questionError) throw questionError;
      question = dbQuestion;
    }

    const mode = normalizeText(challenge_mode) || "standard";
    const correct = user_answer === String(question.correct_option);
    const xp_earned = getXpAwardForMode(mode, correct);

    // Atualizar XP do jogador
    const { data: player } = await supabase
      .from("players")
      .select("xp, total_questions_answered, total_correct")
      .eq("id", player_id)
      .single();

    const shouldCountInTotals = mode !== "meteor";
    const newXp = (player?.xp || 0) + xp_earned;
    const newTotalAnswered = (player?.total_questions_answered || 0) + (shouldCountInTotals ? 1 : 0);
    const newTotalCorrect = (player?.total_correct || 0) + (shouldCountInTotals && correct ? 1 : 0);

    await supabase
      .from("players")
      .update({
        xp: newXp,
        total_questions_answered: newTotalAnswered,
        total_correct: newTotalCorrect,
        last_activity: new Date().toISOString(),
      })
      .eq("id", player_id);

    // Registrar no log de adaptabilidade
    if (lesson_id) {
      await supabase.from("adaptivity_log").insert({
        player_id,
        lesson_id,
        question_id: Number(question.id),
        correct,
        created_at: new Date().toISOString(),
      });

      // Atualizar progresso da lição
      const { data: progression } = await supabase
        .from("player_progression")
        .select("id, attempts, correct_answers, xp_earned, completed_at")
        .eq("player_id", player_id)
        .eq("lesson_id", lesson_id)
        .single();

      if (progression) {
        const nextAttempts = (progression.attempts || 0) + 1;
        const nextCorrectAnswers = (progression.correct_answers || 0) + (correct ? 1 : 0);
        const shouldComplete =
          nextAttempts >= LESSON_COMPLETION_TARGET_ATTEMPTS &&
          nextCorrectAnswers >= LESSON_COMPLETION_MIN_CORRECT;

        await supabase
          .from("player_progression")
          .update({
            attempts: nextAttempts,
            correct_answers: nextCorrectAnswers,
            xp_earned: (progression.xp_earned || 0) + xp_earned,
            last_attempt: new Date().toISOString(),
            completed_at: progression.completed_at || (shouldComplete ? new Date().toISOString() : null),
          })
          .eq("id", progression.id);
      } else {
        await supabase.from("player_progression").insert({
          player_id,
          lesson_id,
          attempts: 1,
          correct_answers: correct ? 1 : 0,
          xp_earned,
        });
      }
    }

    // Gerar feedback da IA (simples por enquanto)
    let ai_feedback = question.explanation;

    if (OPENAI_API_KEY && process.env.USE_AI_FEEDBACK === "true") {
      try {
        const prompt = `
Você é um professor de música altamente qualificado baseado em Bohumil Med.

Pergunta: ${question.question_text}
Opção do aluno: ${question.options[user_answer]}
Resposta correta: ${question.options[question.correct_option]}
Acertou: ${correct}

Se o aluno errou, explique:
1. O que ele entendeu mal
2. O conceito correto
3. Um exemplo musical real

Se acertou, aprofunde a resposta contextulizando em teoria musical.

Responda em português de forma clara mas técnica.
        `;

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content:
                  "Você é um professor de música teórica e harmonia. Explique conceitos de forma clara e conecte com aplicações práticas.",
              },
              { role: "user", content: prompt },
            ],
            temperature: 0.7,
            max_tokens: 300,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          ai_feedback = data.choices[0].message.content;

          // Armazenar feedback da IA
          await supabase.from("ai_feedback").insert({
            player_id,
            question_id: Number(question.id),
            user_answer: question.options[user_answer],
            correct_answer: question.options[question.correct_option],
            feedback_text: ai_feedback,
          });
        }
      } catch (aiError) {
        console.error("AI feedback error:", aiError);
        // Continuar sem IA
      }
    }

    const newTier = getTierByXp(newXp);

    if (newTier !== player?.tier) {
      await supabase.from("players").update({ tier: newTier }).eq("id", player_id);
    }

    const meteorChallengeUnlocked =
      mode !== "meteor" && correct && newTotalCorrect > 0 && newTotalCorrect % METEOR_CHALLENGE_STEP === 0;

    res.json({
      correct,
      xp_earned,
      total_xp: newXp,
      tier: newTier,
      total_correct: newTotalCorrect,
      challenge_mode: mode,
      meteor_challenge_unlocked: meteorChallengeUnlocked,
      meteor_challenge_milestone: meteorChallengeUnlocked ? newTotalCorrect : null,
      explanation: question.explanation,
      ai_feedback,
      correct_answer: question.options[question.correct_option],
      user_answer_text: question.options[user_answer],
    });
  } catch (error) {
    console.error("Error processing answer:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/challenge/meteor/claim", async (req, res) => {
  if (!ensureSupabase(res)) return;

  try {
    const { player_id, milestone, success } = req.body;

    if (!player_id || !milestone) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const numericMilestone = Number(milestone);
    if (!numericMilestone || numericMilestone % METEOR_CHALLENGE_STEP !== 0) {
      return res.status(400).json({ error: "Invalid meteor milestone" });
    }

    const { data: player, error: playerError } = await supabase
      .from("players")
      .select("name, xp, tier, total_correct")
      .eq("id", player_id)
      .single();

    if (playerError) throw playerError;

    const adminAccount = isAdminPlayer(player);
    if (!adminAccount && (player?.total_correct || 0) < numericMilestone) {
      return res.status(400).json({ error: "Meteor challenge not unlocked for this milestone" });
    }

    const achievementId = await ensureMeteorAchievement(numericMilestone);

    const { data: existingUnlock, error: unlockError } = await supabase
      .from("player_achievements")
      .select("id")
      .eq("player_id", player_id)
      .eq("achievement_id", achievementId)
      .maybeSingle();

    if (unlockError) throw unlockError;

    if (existingUnlock?.id) {
      return res.json({
        success: Boolean(success),
        reward_claimed: false,
        reward_xp: 0,
        total_xp: player?.xp || 0,
        tier: player?.tier || getTierByXp(player?.xp || 0),
        already_claimed: true,
        is_admin: adminAccount,
      });
    }

    if (!success) {
      return res.json({
        success: false,
        reward_claimed: false,
        reward_xp: 0,
        total_xp: player?.xp || 0,
        tier: player?.tier || getTierByXp(player?.xp || 0),
        already_claimed: false,
        is_admin: adminAccount,
      });
    }

    await supabase.from("player_achievements").insert({
      player_id,
      achievement_id: achievementId,
    });

    const totalXp = (player?.xp || 0) + METEOR_CHALLENGE_REWARD_XP;
    const tier = getTierByXp(totalXp);

    await supabase
      .from("players")
      .update({
        xp: totalXp,
        tier,
        last_activity: new Date().toISOString(),
      })
      .eq("id", player_id);

    res.json({
      success: true,
      reward_claimed: true,
      reward_xp: METEOR_CHALLENGE_REWARD_XP,
      total_xp: totalXp,
      tier,
      already_claimed: false,
      is_admin: adminAccount,
    });
  } catch (error) {
    console.error("Error claiming meteor challenge:", error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /player/:playerId/progress
 * Retorna progresso completo do jogador
 */
router.get("/player/:playerId/progress", async (req, res) => {
  if (!ensureSupabase(res)) return;

  try {
    const { playerId } = req.params;

    const { data: player } = await supabase
      .from("players")
      .select("name, xp, tier, streak_days, total_questions_answered, total_correct")
      .eq("id", playerId)
      .single();

    const adminAccount = isAdminPlayer(player);

    const { data: worldProgress } = await supabase
      .from("player_world_progress")
      .select("*")
      .eq("player_id", playerId);

    const { data: achievements } = await supabase
      .from("player_achievements")
      .select(
        `
        achievement_id,
        unlocked_at,
        achievements (name, icon, description)
      `
      )
      .eq("player_id", playerId);

    const accuracy =
      player?.total_questions_answered > 0
        ? ((player.total_correct / player.total_questions_answered) * 100).toFixed(1)
        : 0;

    res.json({
      player: {
        ...player,
        accuracy_percent: accuracy,
        is_admin: adminAccount,
      },
      world_progress: worldProgress || [],
      achievements: achievements || [],
    });
  } catch (error) {
    console.error("Error fetching player progress:", error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /leaderboard
 * Retorna top 100 jogadores
 */
router.get("/leaderboard", async (req, res) => {
  if (!ensureSupabase(res)) return;

  try {
    const { data: leaderboard, error } = await supabase.from("leaderboard").select("*");

    if (error) throw error;

    res.json(leaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
