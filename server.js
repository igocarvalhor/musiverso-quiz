require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const { createClient } = require("@supabase/supabase-js");
const { perguntas, TOPICOS } = require("./question-bank");
const OpenAI = require("openai");

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || "";

const hasSupabaseConfig = Boolean(SUPABASE_URL && SUPABASE_KEY);
const supabase = hasSupabaseConfig ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;

const LEVELS = {
  facil: {
    label: "Facil",
    unlockScore: 0,
    basePoints: 10,
    roundSize: 10,
  },
  medio: {
    label: "Medio",
    unlockScore: 500,
    basePoints: 15,
    roundSize: 10,
  },
  dificil: {
    label: "Dificil",
    unlockScore: 1000,
    basePoints: 20,
    roundSize: 10,
  },
};

const DB_LEVEL_BY_APP = {
  facil: "easy",
  medio: "medium",
  dificil: "hard",
};

const APP_LEVEL_BY_DB = {
  easy: "facil",
  medium: "medio",
  hard: "dificil",
};

const TITLES_BY_SCORE = [
  { minScore: 0, title: "Aventureiro Ritmico" },
  { minScore: 60, title: "Explorador Sonoro" },
  { minScore: 120, title: "Viajante Musical" },
  { minScore: 180, title: "Navegador Harmonico" },
  { minScore: 250, title: "Guardiao dos Ritmos" },
  { minScore: 330, title: "Mestre das Melodias" },
  { minScore: 420, title: "Comandante do Som" },
  { minScore: 520, title: "Lenda do Musiverso" },
];

function resolveLevel(level) {
  if (typeof level !== "string") {
    return "facil";
  }

  const normalized = level.toLowerCase();

  if (LEVELS[normalized]) {
    return normalized;
  }

  return APP_LEVEL_BY_DB[normalized] || "facil";
}

function toDbLevel(appLevel) {
  return DB_LEVEL_BY_APP[resolveLevel(appLevel)] || "easy";
}

function toAppLevel(dbLevel) {
  if (!dbLevel) {
    return "facil";
  }

  return APP_LEVEL_BY_DB[String(dbLevel).toLowerCase()] || "facil";
}

function shuffleList(list) {
  return [...list].sort(() => Math.random() - 0.5);
}

function shuffleOptionsWithCorrectIndex(options, correctOption, explicacoes = null) {
  const pairs = options.map((text, index) => ({
    text,
    isCorrect: index === correctOption,
    explanation: explicacoes ? explicacoes[index] : null,
  }));

  const shuffledPairs = shuffleList(pairs);
  const newCorrectOption = shuffledPairs.findIndex((item) => item.isCorrect);

  return {
    options: shuffledPairs.map((item) => item.text),
    correctOption: newCorrectOption,
    explicacoes: explicacoes ? shuffledPairs.map((item) => item.explanation) : null,
  };
}

function calculateTitle(totalScore) {
  let chosenTitle = TITLES_BY_SCORE[0].title;

  for (const item of TITLES_BY_SCORE) {
    if (totalScore >= item.minScore) {
      chosenTitle = item.title;
    }
  }

  return chosenTitle;
}

function normalizeNickname(value) {
  return String(value || "").trim();
}

function isValidNickname(nickname) {
  return /^[a-zA-Z0-9_]{3,20}$/.test(nickname);
}

function isValidPassword(password) {
  return typeof password === "string" && password.length >= 6 && password.length <= 72;
}

async function findPlayerByNickname(nickname) {
  const { data, error } = await supabase
    .from("players")
    .select("id,name")
    .eq("name", nickname)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

async function getOrCreatePlayer(playerName) {
  const trimmedName = String(playerName || "").trim();

  if (!trimmedName) {
    throw new Error("Nome de jogador invalido");
  }

  const { data: existingPlayer, error: findError } = await supabase
    .from("players")
    .select("id,name")
    .eq("name", trimmedName)
    .maybeSingle();

  if (findError) {
    throw findError;
  }

  if (existingPlayer) {
    return existingPlayer;
  }

  const { data: insertedPlayer, error: insertError } = await supabase
    .from("players")
    .insert({ name: trimmedName })
    .select("id,name")
    .single();

  if (insertError) {
    throw insertError;
  }

  return insertedPlayer;
}

async function upsertProgress(playerId, sessionScore) {
  const { data: progressRow, error: progressError } = await supabase
    .from("player_progress")
    .select("player_id,total_score,current_level")
    .eq("player_id", playerId)
    .maybeSingle();

  if (progressError) {
    throw progressError;
  }

  const previousScore = progressRow?.total_score || 0;
  const newTotalScore = previousScore + sessionScore;

  let currentLevel = "facil";
  if (newTotalScore >= LEVELS.dificil.unlockScore) {
    currentLevel = "dificil";
  } else if (newTotalScore >= LEVELS.medio.unlockScore) {
    currentLevel = "medio";
  }

  const highestTitle = calculateTitle(newTotalScore);

  const { error: upsertError } = await supabase.from("player_progress").upsert(
    {
      player_id: playerId,
      total_score: newTotalScore,
      current_level: toDbLevel(currentLevel),
      highest_title: highestTitle,
      updated_at: new Date().toISOString(),
    },
    {
      onConflict: "player_id",
    }
  );

  if (upsertError) {
    throw upsertError;
  }

  return {
    totalScore: newTotalScore,
    currentLevel,
    highestTitle,
  };
}

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    ok: true,
    service: "musiverso-api",
    supabaseConfigured: hasSupabaseConfig,
    timestamp: new Date().toISOString(),
  });
});

app.post("/api/auth/register", async (req, res) => {
  if (!supabase) {
    return res.status(503).json({
      error: "Supabase nao configurado",
    });
  }

  try {
    const nickname = normalizeNickname(req.body?.nickname);
    const password = req.body?.password;

    if (!isValidNickname(nickname)) {
      return res.status(400).json({
        error: "Nickname invalido. Use 3-20 caracteres (letras, numeros e underscore).",
      });
    }

    if (!isValidPassword(password)) {
      return res.status(400).json({
        error: "Senha invalida. Use de 6 a 72 caracteres.",
      });
    }

    let player = await findPlayerByNickname(nickname);

    if (!player) {
      const { data: createdPlayer, error: createError } = await supabase
        .from("players")
        .insert({ name: nickname })
        .select("id,name")
        .single();

      if (createError) {
        throw createError;
      }

      player = createdPlayer;
    }

    const { data: existingAuth, error: authFindError } = await supabase
      .from("player_auth")
      .select("player_id")
      .eq("player_id", player.id)
      .maybeSingle();

    if (authFindError) {
      throw authFindError;
    }

    if (existingAuth) {
      return res.status(409).json({
        error: "Nickname ja cadastrado.",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const { error: insertAuthError } = await supabase.from("player_auth").insert({
      player_id: player.id,
      password_hash: passwordHash,
    });

    if (insertAuthError) {
      throw insertAuthError;
    }

    const progress = await upsertProgress(player.id, 0);

    return res.status(201).json({
      ok: true,
      user: {
        nickname: player.name,
        totalScore: progress.totalScore,
        currentLevel: progress.currentLevel,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: "Falha ao criar conta",
      details: error.message,
    });
  }
});

app.post("/api/auth/login", async (req, res) => {
  if (!supabase) {
    return res.status(503).json({
      error: "Supabase nao configurado",
    });
  }

  try {
    const nickname = normalizeNickname(req.body?.nickname);
    const password = req.body?.password;

    if (!nickname || typeof password !== "string") {
      return res.status(400).json({
        error: "Informe nickname e senha.",
      });
    }

    const player = await findPlayerByNickname(nickname);

    if (!player) {
      return res.status(401).json({
        error: "Conta nao encontrada.",
      });
    }

    const { data: authRow, error: authError } = await supabase
      .from("player_auth")
      .select("password_hash")
      .eq("player_id", player.id)
      .maybeSingle();

    if (authError) {
      throw authError;
    }

    if (!authRow) {
      return res.status(401).json({
        error: "Conta nao encontrada.",
      });
    }

    const isMatch = await bcrypt.compare(password, authRow.password_hash);

    if (!isMatch) {
      return res.status(401).json({
        error: "Senha incorreta.",
      });
    }

    const { data: progressRow, error: progressError } = await supabase
      .from("player_progress")
      .select("total_score,current_level")
      .eq("player_id", player.id)
      .maybeSingle();

    if (progressError) {
      throw progressError;
    }

    return res.status(200).json({
      ok: true,
      user: {
        nickname: player.name,
        totalScore: progressRow?.total_score || 0,
        currentLevel: toAppLevel(progressRow?.current_level),
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: "Falha ao autenticar",
      details: error.message,
    });
  }
});

app.get("/api/levels", (_req, res) => {
  res.status(200).json({
    levels: LEVELS,
    titles: TITLES_BY_SCORE,
  });
});

app.get("/api/topics", (_req, res) => {
  res.status(200).json({ topics: TOPICOS });
});

app.get("/api/questions", async (req, res) => {
  try {
    const level = resolveLevel(req.query.level);
    const requestedLimit = Number(req.query.limit) || LEVELS[level].roundSize;
    const limit = Math.min(Math.max(requestedLimit, 1), 20);
    const excludeIds = String(req.query.excludeIds || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    const topicFilter = req.query.topic ? String(req.query.topic).trim() : null;

    const excludeSet = new Set(excludeIds);

    const questionsFromLevel = perguntas
      .map((item, index) => ({
        id: index + 1,
        ...item,
      }))
      .filter((item) => item.nivel === level)
      .filter((item) => !topicFilter || item.topico === topicFilter)
      .filter((item) => !excludeSet.has(String(item.id)));

    const selectedQuestions = shuffleList(questionsFromLevel).slice(0, limit);

    const publicQuestions = selectedQuestions.map((item) => {
      const shuffledQuestion = shuffleOptionsWithCorrectIndex(item.opcoes, item.resposta, item.explicacoes);

      return {
        id: item.id,
        level: item.nivel,
        question: item.pergunta,
        options: shuffledQuestion.options,
        correct_option: shuffledQuestion.correctOption,
        explanation: "",
        explicacoes: shuffledQuestion.explicacoes || [],
      };
    });

    return res.status(200).json({
      level,
      count: publicQuestions.length,
      questions: publicQuestions,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Falha ao carregar perguntas",
      details: error.message,
    });
  }
});

app.get("/api/ranking", async (req, res) => {
  if (!supabase) {
    return res.status(503).json({
      error: "Supabase nao configurado",
    });
  }

  try {
    const level = req.query.level ? resolveLevel(req.query.level) : null;
    const dbLevel = level ? toDbLevel(level) : null;
    const requestedLimit = Number(req.query.limit) || 10;
    const limit = Math.min(Math.max(requestedLimit, 1), 30);

    if (level) {
      const { data, error } = await supabase
        .from("leaderboard_by_level")
        .select("player_name,level,best_score,total_sessions,last_played_at")
        .eq("level", dbLevel)
        .order("best_score", { ascending: false })
        .order("last_played_at", { ascending: false })
        .limit(limit);

      if (error) {
        throw error;
      }

      return res.status(200).json({
        scope: "level",
        level,
        entries: (data || []).map((item) => ({
          ...item,
          level: toAppLevel(item.level),
        })),
      });
    }

    const { data, error } = await supabase
      .from("leaderboard_overall")
      .select("player_name,total_score,best_score,total_sessions,current_level,highest_title")
      .order("total_score", { ascending: false })
      .order("best_score", { ascending: false })
      .limit(limit);

    if (error) {
      throw error;
    }

    return res.status(200).json({
      scope: "overall",
      entries: (data || []).map((item) => ({
        ...item,
        current_level: toAppLevel(item.current_level),
      })),
    });
  } catch (error) {
    return res.status(500).json({
      error: "Falha ao carregar ranking",
      details: error.message,
    });
  }
});

app.post("/api/submit-score", async (req, res) => {
  if (!supabase) {
    return res.status(503).json({
      error: "Supabase nao configurado",
    });
  }

  try {
    const {
      playerName,
      score,
      level,
      totalQuestions,
      correctAnswers,
      bestStreak,
    } = req.body || {};

    const safeLevel = resolveLevel(level);
    const safeDbLevel = toDbLevel(safeLevel);
    const safeScore = Math.max(Number(score) || 0, 0);
    const safeTotalQuestions = Math.max(Number(totalQuestions) || 0, 0);
    const safeCorrectAnswers = Math.max(Number(correctAnswers) || 0, 0);
    const safeBestStreak = Math.max(Number(bestStreak) || 0, 0);

    const player = await getOrCreatePlayer(playerName);

    const { error: sessionError } = await supabase.from("game_sessions").insert({
      player_id: player.id,
      score: safeScore,
      level: safeDbLevel,
      total_questions: safeTotalQuestions,
      correct_answers: safeCorrectAnswers,
      best_streak: safeBestStreak,
    });

    if (sessionError) {
      throw sessionError;
    }

    const progress = await upsertProgress(player.id, safeScore);

    return res.status(201).json({
      ok: true,
      progress,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Falha ao salvar pontuacao",
      details: error.message,
    });
  }
});

// Endpoint para salvar perguntas geradas pela IA no question-bank.js
app.post("/api/save-questions", (req, res) => {
  try {
    const { questions } = req.body;

    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ error: "questions deve ser um array não vazio" });
    }

    const bankPath = path.join(__dirname, "question-bank.js");
    let content = fs.readFileSync(bankPath, "utf-8");

    const insertPoint = content.lastIndexOf("module.exports");
    if (insertPoint === -1) {
      return res.status(500).json({ error: "Não foi possível localizar module.exports em question-bank.js" });
    }

    const questionsCode = questions
      .map((q) => {
        const opcoes = JSON.stringify(q.opcoes || []);
        const explicacoes = q.explicacoes ? `, explicacoes: ${JSON.stringify(q.explicacoes)}` : "";
        const pergunta = (q.pergunta || "").replace(/\\/g, "\\\\").replace(/"/g, '\\"');
        return `  { nivel: "${q.nivel}", topico: "${q.topico}", pergunta: "${pergunta}", opcoes: ${opcoes}, resposta: ${q.resposta}${explicacoes} }`;
      })
      .join(",\n");

    const newContent =
      content.substring(0, insertPoint) +
      "  // PERGUNTAS GERADAS POR IA (" + new Date().toLocaleDateString("pt-BR") + ")\n" +
      questionsCode +
      ",\n\n" +
      content.substring(insertPoint);

    fs.writeFileSync(bankPath, newContent, "utf-8");

    return res.status(200).json({
      success: true,
      saved: questions.length,
      message: "Perguntas salvas com sucesso em question-bank.js",
    });
  } catch (error) {
    console.error("Erro ao salvar perguntas:", error);
    return res.status(500).json({
      error: "Falha ao salvar perguntas",
      details: error.message,
    });
  }
});

// Endpoint para gerar perguntas com IA (OpenAI)
app.post("/api/generate-questions", async (req, res) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(400).json({
      error: "OPENAI_API_KEY nao configurada no servidor",
    });
  }

  try {
    const { topic, level, count = 3 } = req.body;

    if (!topic || !level) {
      return res.status(400).json({
        error: "topic e level sao obrigatorios",
      });
    }

    const TOPICS = {
      "harmonia-funcional": "Harmonia Funcional (Funções harmônicas, acordes, progressões)",
      "teoria-musical": "Teoria Musical (Escalas, intervalos, ritmo, notação)",
      "historia-da-musica": "História da Música (Períodos, compositores, obras)",
    };

    if (!TOPICS[topic]) {
      return res.status(400).json({
        error: `Tópico inválido. Use: ${Object.keys(TOPICS).join(", ")}`,
      });
    }

    if (!["facil", "medio", "dificil"].includes(level)) {
      return res.status(400).json({
        error: "Nível inválido. Use: facil, medio ou dificil",
      });
    }

    const topicDesc = TOPICS[topic];
    const levelDesc =
      level === "facil"
        ? "iniciantes (conceitos básicos, sem termos muito complexos)"
        : level === "medio"
          ? "intermediários (conhecimento moderado, alguns termos técnicos)"
          : "avançados (conceitos complexos, análise detalhada)";

    const prompt = `Você é um professor de música especializado. Gere exatamente ${Math.min(count || 3, 10)} perguntas de múltipla escolha sobre "${topicDesc}" para alunos ${levelDesc}.

IMPORTANTE: Responda APENAS com um JSON válido, sem texto adicional. Use exatamente este formato:

\`\`\`json
{
  "questions": [
    {
      "pergunta": "Pergunta em português",
      "opcoes": ["Opção A", "Opção B", "Opção C", "Opção D"],
      "resposta": 0,
      "explicacoes": ["Explicação A", "Explicação B", "Explicação C", "Explicação D"]
    }
  ]
}
\`\`\`

Requisitos:
- Sempre 4 opções por pergunta
- Resposta é índice (0-3) da opção correta
- Explicações educacionais em português (uma por opção)`;

    const client = new OpenAI({ apiKey });
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 4000,
      temperature: 0.7,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const content = response.choices[0].message.content;
    const jsonMatch = content.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      return res.status(500).json({
        error: "Não foi possível extrair JSON da resposta da IA",
      });
    }

    const data = JSON.parse(jsonMatch[0]);

    if (!data.questions || !Array.isArray(data.questions)) {
      return res.status(500).json({
        error: "Resposta inválida: 'questions' não é um array",
      });
    }

    const enrichedQuestions = data.questions.map((q) => ({
      nivel: level,
      topico: topic,
      pergunta: q.pergunta,
      opcoes: q.opcoes,
      resposta: q.resposta,
      explicacoes: q.explicacoes,
      ia_generated: true,
      created_at: new Date().toISOString(),
    }));

    return res.status(200).json({
      success: true,
      count: enrichedQuestions.length,
      questions: enrichedQuestions,
      message: "Perguntas geradas com sucesso. Revise e execute 'git add question-bank.js' para salvar.",
    });
  } catch (error) {
    console.error("Erro ao gerar perguntas:", error);
    return res.status(500).json({
      error: "Falha ao gerar perguntas",
      details: error.message,
    });
  }
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Musiverso online em http://localhost:${PORT}`);
  });
}

module.exports = app;
