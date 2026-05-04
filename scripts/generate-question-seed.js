const fs = require("fs");
const path = require("path");
const { perguntas } = require("../question-bank");

const OUTPUT_PATH = path.join(__dirname, "..", "supabase-question-bank-seed.sql");

const LEVEL_MAP = {
  facil: "easy",
  medio: "medium",
  dificil: "hard",
};

function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function escapeSqlString(value) {
  return String(value || "").replace(/'/g, "''");
}

function inferTopic(question) {
  const explicitTopic = normalizeText(question.topico || question.tema);
  if (explicitTopic === "harmonia") {
    return "harmonia-funcional";
  }
  if (explicitTopic) {
    return explicitTopic;
  }

  const searchText = normalizeText([
    question.pergunta,
    question.explicacoes?.join(" "),
    question.subtema,
  ].join(" "));

  if (/(cadenc|acorde|triad|tetra|dominante|subdominante|tonica|harmonia|modulac|campo harmonico|funcao|emprestimo modal|dominante secundaria)/.test(searchText)) {
    return "harmonia-funcional";
  }
  if (/(idade media|barroco|classico|romantico|renascimento|notre-dame|perotin|leonin|bach|mozart|beethoven|debussy|palestrina|chopin|historia)/.test(searchText)) {
    return "historia-da-musica";
  }
  return "teoria-musical";
}

function inferSubtopic(question, topic) {
  if (question.subtema) {
    return normalizeText(question.subtema).replace(/_/g, "-");
  }

  const searchText = normalizeText([
    question.pergunta,
    question.explicacoes?.join(" "),
  ].join(" "));

  if (topic === "teoria-musical") {
    if (/(pentagrama|clave|partitura|pauta)/.test(searchText)) return "notacao";
    if (/(ritmo|compasso|seminima|minima|semibreve|colcheia|pausa|andamento|tempo)/.test(searchText)) return "ritmo";
    if (/(intervalo|escala|semitom|tom|oitava|modo)/.test(searchText)) return "intervalos-escalas";
    if (/(timbre|intensidade|duracao|altura|som|vibracao|melodia)/.test(searchText)) return "elementos-do-som";
    return "fundamentos";
  }

  if (topic === "harmonia-funcional") {
    if (/(cadenc)/.test(searchText)) return "cadencias";
    if (/(dominante secundaria|v\/v)/.test(searchText)) return "dominantes-secundarias";
    if (/(modulac)/.test(searchText)) return "modulacao";
    if (/(emprestimo modal)/.test(searchText)) return "emprestimo-modal";
    if (/(acorde|triad|tetra)/.test(searchText)) return "acordes";
    if (/(funcao|tonica|dominante|subdominante)/.test(searchText)) return "funcao";
    if (/(analise|progressao|ii-v-i)/.test(searchText)) return "analise";
    return "harmonia-geral";
  }

  if (topic === "historia-da-musica") {
    if (/(bach|mozart|beethoven|debussy|palestrina|chopin|perotin|leonin)/.test(searchText)) return "compositores";
    if (/(idade media|barroco|classico|romantico|renascimento)/.test(searchText)) return "periodos";
    if (/(notre-dame|organum|moteto|polifonia)/.test(searchText)) return "formas-e-escolas";
    return "historia-geral";
  }

  return null;
}

function buildTags(question, topic, subtopic) {
  const tags = new Set();
  tags.add(topic);
  if (subtopic) {
    tags.add(subtopic);
  }

  const searchText = normalizeText(question.pergunta);
  const keywordCandidates = [
    "musica",
    "som",
    "ritmo",
    "pentagrama",
    "clave",
    "compasso",
    "intervalo",
    "escala",
    "acorde",
    "triade",
    "cadencia",
    "modulacao",
    "dominante",
    "subdominante",
    "tonica",
    "bach",
    "mozart",
    "beethoven",
    "debussy",
    "notre-dame",
    "polifonia",
  ];

  for (const keyword of keywordCandidates) {
    if (searchText.includes(keyword)) {
      tags.add(keyword);
    }
  }

  return JSON.stringify(Array.from(tags));
}

function toSqlValue(question) {
  const level = LEVEL_MAP[normalizeText(question.nivel)] || "medium";
  const topic = inferTopic(question);
  const subtopic = inferSubtopic(question, topic);
  const tags = buildTags(question, topic, subtopic);
  const explanation = Array.isArray(question.explicacoes)
    ? question.explicacoes[question.resposta] || ""
    : "";

  return `(
  '${escapeSqlString(level)}'::difficulty_level,
  '${escapeSqlString(topic)}',
  '${escapeSqlString(topic)}',
  ${subtopic ? `'${escapeSqlString(subtopic)}'` : "null"},
  '${escapeSqlString(tags)}'::jsonb,
  '${escapeSqlString(question.pergunta)}',
  '${escapeSqlString(JSON.stringify(question.opcoes || []))}'::jsonb,
  ${Number(question.resposta) || 0},
  ${explanation ? `'${escapeSqlString(explanation)}'` : "null"}
)`;
}

function dedupeQuestions(list) {
  const byKey = new Map();
  for (const question of list) {
    const key = normalizeText(question.pergunta);
    if (!key || byKey.has(key)) {
      continue;
    }
    byKey.set(key, question);
  }
  return Array.from(byKey.values());
}

function buildSql(questions) {
  const values = questions.map(toSqlValue).join(",\n");

  return `-- =====================================================\n-- Musiverso Question Bank Seed\n-- Gerado automaticamente a partir de question-bank.js\n-- Execute apos supabase-schema.sql\n-- =====================================================\n\nbegin;\n\n-- Compatibilidade: garante colunas tematicas em bancos antigos\nalter table if exists public.quiz_questions\n  add column if not exists tema text;\n\nalter table if exists public.quiz_questions\n  add column if not exists topico text;\n\nalter table if exists public.quiz_questions\n  add column if not exists subtema text;\n\nalter table if exists public.quiz_questions\n  add column if not exists tags jsonb;\n\ninsert into public.quiz_questions (\n  level,\n  tema,\n  topico,\n  subtema,\n  tags,\n  question_text,\n  options,\n  correct_option,\n  explanation\n)\nselect *\nfrom (values\n${values}\n) as seed (\n  level,\n  tema,\n  topico,\n  subtema,\n  tags,\n  question_text,\n  options,\n  correct_option,\n  explanation\n)\nwhere not exists (\n  select 1\n  from public.quiz_questions existing\n  where lower(existing.question_text) = lower(seed.question_text)\n);\n\ncommit;\n`;
}

const uniqueQuestions = dedupeQuestions(perguntas);
const sql = buildSql(uniqueQuestions);
fs.writeFileSync(OUTPUT_PATH, sql, "utf8");

console.log(`Generated ${uniqueQuestions.length} questions at ${OUTPUT_PATH}`);