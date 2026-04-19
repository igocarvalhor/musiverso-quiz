/**
 * MUSIVERSO - Rotas de Plataforma Educacional
 * Implementa os 9 mundos, lições, sistema adaptativo e IA
 */

const express = require("express");
const router = express.Router();
require("dotenv").config();

const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || "";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * GET /worlds
 * Retorna todos os 9 mundos e status de desbloqueio do jogador
 */
router.get("/worlds", async (req, res) => {
  try {
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
      .select("xp")
      .eq("id", player_id)
      .single();

    if (playerError && playerError.code !== "PGRST116") throw playerError;

    const playerXp = player?.xp || 0;

    // Marcar mundos como desbloqueados baseado em XP
    const worldsWithStatus = worlds.map((world) => ({
      ...world,
      unlocked: playerXp >= world.unlocked_at_xp,
      xp_to_unlock: Math.max(0, world.unlocked_at_xp - playerXp),
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
  try {
    const { worldId } = req.params;
    const { player_id } = req.query;

    const { data: lessons, error: lessonsError } = await supabase
      .from("lessons")
      .select("*")
      .eq("world_id", worldId)
      .order("order_number", { ascending: true });

    if (lessonsError) throw lessonsError;

    if (!player_id) {
      return res.json(lessons);
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
  try {
    const {
      lesson_id,
      player_id,
      count = 5,
      difficulty = "medium",
    } = req.query;

    const { data: questions, error } = await supabase
      .from("quiz_questions")
      .select("id, question_text, options, level, explanation")
      .eq("level", difficulty)
      .eq("active", true)
      .limit(parseInt(count));

    if (error) throw error;

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
      let adjustedDifficulty = difficulty;
      if (recentTotal >= 3) {
        const accuracy = recentCorrect / recentTotal;
        if (accuracy >= 0.9 && difficulty !== "hard") {
          adjustedDifficulty = "hard";
        } else if (accuracy < 0.5 && difficulty !== "easy") {
          adjustedDifficulty = "easy";
        }
      }

      // Se a dificuldade foi ajustada, buscar novas questões
      if (adjustedDifficulty !== difficulty) {
        const { data: newQuestions } = await supabase
          .from("quiz_questions")
          .select("id, question_text, options, level, explanation")
          .eq("level", adjustedDifficulty)
          .eq("active", true)
          .limit(parseInt(count));

        return res.json({ questions: newQuestions, adjusted_difficulty: adjustedDifficulty });
      }
    }

    res.json({ questions, adjusted_difficulty: difficulty });
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
  try {
    const { player_id, lesson_id, question_id, user_answer } = req.body;

    if (!player_id || !question_id) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Buscar a pergunta
    const { data: question, error: questionError } = await supabase
      .from("quiz_questions")
      .select("*")
      .eq("id", question_id)
      .single();

    if (questionError) throw questionError;

    const correct = user_answer === String(question.correct_option);
    const xp_earned = correct ? 10 : 3;

    // Atualizar XP do jogador
    const { data: player } = await supabase
      .from("players")
      .select("xp, total_questions_answered, total_correct")
      .eq("id", player_id)
      .single();

    const newXp = (player?.xp || 0) + xp_earned;
    const newTotalAnswered = (player?.total_questions_answered || 0) + 1;
    const newTotalCorrect = (player?.total_correct || 0) + (correct ? 1 : 0);

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
        question_id,
        correct,
        created_at: new Date().toISOString(),
      });

      // Atualizar progresso da lição
      const { data: progression } = await supabase
        .from("player_progression")
        .select("id, attempts, correct_answers, xp_earned")
        .eq("player_id", player_id)
        .eq("lesson_id", lesson_id)
        .single();

      if (progression) {
        await supabase
          .from("player_progression")
          .update({
            attempts: (progression.attempts || 0) + 1,
            correct_answers: (progression.correct_answers || 0) + (correct ? 1 : 0),
            xp_earned: (progression.xp_earned || 0) + xp_earned,
            last_attempt: new Date().toISOString(),
            completed_at:
              (progression.correct_answers || 0) + (correct ? 1 : 0) >= 3
                ? new Date().toISOString()
                : null,
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
            question_id,
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

    // Calcular novo tier baseado em XP
    let newTier = "iniciante";
    if (newXp >= 3000) newTier = "maestro";
    else if (newXp >= 2000) newTier = "harmonicista";
    else if (newXp >= 1000) newTier = "explorador";

    if (newTier !== player?.tier) {
      await supabase.from("players").update({ tier: newTier }).eq("id", player_id);
    }

    res.json({
      correct,
      xp_earned,
      total_xp: newXp,
      tier: newTier,
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

/**
 * GET /player/:playerId/progress
 * Retorna progresso completo do jogador
 */
router.get("/player/:playerId/progress", async (req, res) => {
  try {
    const { playerId } = req.params;

    const { data: player } = await supabase
      .from("players")
      .select("name, xp, tier, streak_days, total_questions_answered, total_correct")
      .eq("id", playerId)
      .single();

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
