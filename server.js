require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

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
  easy: {
    label: "Facil",
    unlockScore: 0,
    basePoints: 10,
    roundSize: 8,
  },
  medium: {
    label: "Medio",
    unlockScore: 60,
    basePoints: 15,
    roundSize: 8,
  },
  hard: {
    label: "Dificil",
    unlockScore: 140,
    basePoints: 20,
    roundSize: 8,
  },
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
    return "easy";
  }

  const normalized = level.toLowerCase();
  return LEVELS[normalized] ? normalized : "easy";
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

  let currentLevel = "easy";
  if (newTotalScore >= LEVELS.hard.unlockScore) {
    currentLevel = "hard";
  } else if (newTotalScore >= LEVELS.medium.unlockScore) {
    currentLevel = "medium";
  }

  const highestTitle = calculateTitle(newTotalScore);

  const { error: upsertError } = await supabase.from("player_progress").upsert(
    {
      player_id: playerId,
      total_score: newTotalScore,
      current_level: currentLevel,
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
  if (!supabase) {
    return res.status(503).json({
      error: "Supabase nao configurado",
    });
  }

  try {
    const level = resolveLevel(req.query.level);
    const requestedLimit = Number(req.query.limit) || LEVELS[level].roundSize;
    const limit = Math.min(Math.max(requestedLimit, 1), 20);

    const { data, error } = await supabase
      .from("quiz_questions")
      .select("id,level,question_text,options,correct_option,explanation")
      .eq("level", level)
      .eq("active", true)
      .limit(limit);

    if (error) {
      throw error;
    }

    const shuffled = (data || []).sort(() => Math.random() - 0.5);

    const publicQuestions = shuffled.map((item) => ({
      id: item.id,
      level: item.level,
      question: item.question_text,
      options: item.options,
      correct_option: item.correct_option,
      explanation: item.explanation,
    }));

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
    const requestedLimit = Number(req.query.limit) || 10;
    const limit = Math.min(Math.max(requestedLimit, 1), 30);

    if (level) {
      const { data, error } = await supabase
        .from("leaderboard_by_level")
        .select("player_name,level,best_score,total_sessions,last_played_at")
        .eq("level", level)
        .order("best_score", { ascending: false })
        .order("last_played_at", { ascending: false })
        .limit(limit);

      if (error) {
        throw error;
      }

      return res.status(200).json({
        scope: "level",
        level,
        entries: data || [],
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
      entries: data || [],
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
    const safeScore = Math.max(Number(score) || 0, 0);
    const safeTotalQuestions = Math.max(Number(totalQuestions) || 0, 0);
    const safeCorrectAnswers = Math.max(Number(correctAnswers) || 0, 0);
    const safeBestStreak = Math.max(Number(bestStreak) || 0, 0);

    const player = await getOrCreatePlayer(playerName);

    const { error: sessionError } = await supabase.from("game_sessions").insert({
      player_id: player.id,
      score: safeScore,
      level: safeLevel,
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
