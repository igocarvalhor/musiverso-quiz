require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");
const { perguntas } = require("./question-bank");

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

function shuffleOptionsWithCorrectIndex(options, correctOption) {
  const pairs = options.map((text, index) => ({
    text,
    isCorrect: index === correctOption,
  }));

  const shuffledPairs = shuffleList(pairs);
  const newCorrectOption = shuffledPairs.findIndex((item) => item.isCorrect);

  return {
    options: shuffledPairs.map((item) => item.text),
    correctOption: newCorrectOption,
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

app.get("/api/levels", (_req, res) => {
  res.status(200).json({
    levels: LEVELS,
    titles: TITLES_BY_SCORE,
  });
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

    const excludeSet = new Set(excludeIds);

    const questionsFromLevel = perguntas
      .map((item, index) => ({
        id: index + 1,
        ...item,
      }))
      .filter((item) => item.nivel === level)
      .filter((item) => !excludeSet.has(String(item.id)));

    const selectedQuestions = shuffleList(questionsFromLevel).slice(0, limit);

    const publicQuestions = selectedQuestions.map((item) => {
      const shuffledQuestion = shuffleOptionsWithCorrectIndex(item.opcoes, item.resposta);

      return {
        id: item.id,
        level: item.nivel,
        question: item.pergunta,
        options: shuffledQuestion.options,
        correct_option: shuffledQuestion.correctOption,
        explanation: "",
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
