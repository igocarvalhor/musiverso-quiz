/**
 * MUSIVERSO - Frontend da Plataforma
 * Gerencia interface de mundos, lições e aprendizado adaptativo
 */

class MusiversoApp {
  constructor() {
    this.playerId = localStorage.getItem("playerId");
    this.currentView = "worlds"; // worlds, lessons, quiz
    this.currentWorld = null;
    this.currentLesson = null;
    this.worlds = [];
    this.lessons = [];
    this.playerData = null;
    this.init();
  }

  async init() {
    if (!this.playerId) {
      window.location.href = "/auth.html";
      return;
    }

    await this.loadPlayerData();
    await this.loadWorlds();
    this.renderWorldsView();
  }

  /**
   * Carrega dados do jogador (XP, tier, progresso)
   */
  async loadPlayerData() {
    try {
      const response = await fetch(`/api/musiverso/player/${this.playerId}/progress`);
      const data = await response.json();
      this.playerData = data;
      this.updateHeader();
    } catch (error) {
      console.error("Erro ao carregar dados do jogador:", error);
    }
  }

  /**
   * Carrega todos os 9 mundos
   */
  async loadWorlds() {
    try {
      const response = await fetch(`/api/musiverso/worlds?player_id=${this.playerId}`);
      this.worlds = await response.json();
    } catch (error) {
      console.error("Erro ao carregar mundos:", error);
    }
  }

  /**
   * Carrega lições de um mundo
   */
  async loadLessons(worldId) {
    try {
      const response = await fetch(
        `/api/musiverso/worlds/${worldId}/lessons?player_id=${this.playerId}`
      );
      this.lessons = await response.json();
    } catch (error) {
      console.error("Erro ao carregar lições:", error);
    }
  }

  /**
   * Renderiza a visão de mundos (tela principal)
   */
  renderWorldsView() {
    const container = document.getElementById("gamePanel");
    if (!container) return;

    let html = '<div class="worlds-grid">';

    this.worlds.forEach((world) => {
      const locked = !world.unlocked;
      const progress = this.playerData?.world_progress?.find(
        (w) => w.world_id === world.id
      );

      html += `
        <div class="world-card ${locked ? "locked" : "unlocked"}">
          <div class="world-icon">${world.icon}</div>
          <h3>${world.name}</h3>
          <p class="world-description">${world.description}</p>
          
          ${locked ? 
            `<div class="lock-info">🔒 Desbloqueado com ${world.xp_to_unlock} XP</div>` :
            `
              <div class="progress-info">
                <div class="progress-bar">
                  <div class="progress-fill" style="width: ${
                    progress ? (progress.lessons_completed / progress.total_lessons) * 100 : 0
                  }%"></div>
                </div>
                <span class="progress-text">
                  ${progress?.lessons_completed || 0}/${progress?.total_lessons || 0}
                </span>
              </div>
              <button class="btn-enter-world" data-world-id="${world.id}">
                Entrar 🎯
              </button>
            `
          }
        </div>
      `;
    });

    html += "</div>";
    container.innerHTML = html;

    // Adicionar event listeners
    document.querySelectorAll(".btn-enter-world").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const worldId = e.target.dataset.worldId;
        this.enterWorld(worldId);
      });
    });
  }

  /**
   * Entra em um mundo e mostra suas lições
   */
  async enterWorld(worldId) {
    this.currentWorld = this.worlds.find((w) => w.id === worldId);
    await this.loadLessons(worldId);
    this.currentView = "lessons";
    this.renderLessonsView();
  }

  /**
   * Renderiza a visão de lições de um mundo
   */
  renderLessonsView() {
    const container = document.getElementById("gamePanel");
    if (!container) return;

    let html = `
      <div class="lessons-view">
        <button class="btn-back" id="backToWorlds">← Voltar aos Mundos</button>
        
        <div class="world-header">
          <span class="world-icon" style="font-size: 3em;">${this.currentWorld.icon}</span>
          <div>
            <h2>${this.currentWorld.name}</h2>
            <p>${this.currentWorld.description}</p>
          </div>
        </div>

        <div class="lessons-grid">
    `;

    this.lessons.forEach((lesson, index) => {
      const completed = lesson.completed;
      html += `
        <div class="lesson-card ${completed ? "completed" : ""}">
          <div class="lesson-number">${index + 1}</div>
          <h4>${lesson.name}</h4>
          <p>${lesson.description}</p>
          
          <div class="lesson-stats">
            <span>📚 ${lesson.attempts} tentativas</span>
            <span>⭐ ${lesson.xp_earned} XP</span>
          </div>

          <button class="btn-start-lesson" data-lesson-id="${lesson.id}">
            ${completed ? "✓ Revisar" : "Iniciar"}
          </button>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;

    container.innerHTML = html;

    // Event listeners
    document.getElementById("backToWorlds").addEventListener("click", () => {
      this.currentView = "worlds";
      this.renderWorldsView();
    });

    document.querySelectorAll(".btn-start-lesson").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const lessonId = e.target.dataset.lessonId;
        this.startLesson(lessonId);
      });
    });
  }

  /**
   * Inicia uma lição (começa o quiz)
   */
  async startLesson(lessonId) {
    this.currentLesson = this.lessons.find((l) => l.id === lessonId);
    this.currentView = "quiz";

    // Carregar perguntas adaptativas
    try {
      const response = await fetch(
        `/api/musiverso/questions?lesson_id=${lessonId}&player_id=${this.playerId}&count=5`
      );
      const data = await response.json();

      this.quizState = {
        questions: data.questions,
        currentQuestionIndex: 0,
        xpEarned: 0,
        difficulty: data.adjusted_difficulty,
      };

      this.renderQuizView();
    } catch (error) {
      console.error("Erro ao carregar perguntas:", error);
    }
  }

  /**
   * Renderiza a visão do quiz
   */
  renderQuizView() {
    const container = document.getElementById("gamePanel");
    if (!container || !this.quizState) return;

    const question = this.quizState.questions[this.quizState.currentQuestionIndex];
    const progress = ((this.quizState.currentQuestionIndex + 1) / this.quizState.questions.length) * 100;

    let html = `
      <div class="quiz-view">
        <div class="quiz-header-top">
          <button class="btn-exit-quiz" id="exitQuiz">← Sair</button>
          <div class="quiz-progress">
            ${this.quizState.currentQuestionIndex + 1} / ${this.quizState.questions.length}
          </div>
          <div class="xp-counter">
            ⭐ +${this.quizState.xpEarned} XP
          </div>
        </div>

        <div class="progress-bar">
          <div class="progress-fill" style="width: ${progress}%"></div>
        </div>

        <div class="question-container">
          <h3>${question.question_text}</h3>
          
          <div class="options-grid">
    `;

    question.options.forEach((option, index) => {
      html += `
        <button class="option-btn" data-option="${index}">
          ${option}
        </button>
      `;
    });

    html += `
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;

    // Event listeners
    document.getElementById("exitQuiz").addEventListener("click", () => {
      this.currentView = "lessons";
      this.renderLessonsView();
    });

    document.querySelectorAll(".option-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const userAnswer = e.target.dataset.option;
        this.submitAnswer(question.id, userAnswer);
      });
    });
  }

  /**
   * Submete uma resposta e recebe feedback
   */
  async submitAnswer(questionId, userAnswer) {
    try {
      const response = await fetch("/api/musiverso/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          player_id: this.playerId,
          lesson_id: this.currentLesson.id,
          question_id: questionId,
          user_answer: userAnswer,
        }),
      });

      const data = await response.json();

      // Mostrar feedback
      this.showFeedback(data);

      // Atualizar XP acumulado
      this.quizState.xpEarned += data.xp_earned;

      // Ir para próxima pergunta ou finalizar
      this.quizState.currentQuestionIndex += 1;

      if (this.quizState.currentQuestionIndex >= this.quizState.questions.length) {
        // Quiz finalizado
        this.finishQuiz(data.total_xp, data.tier);
      } else {
        // Próxima pergunta
        setTimeout(() => {
          this.renderQuizView();
        }, 2500);
      }
    } catch (error) {
      console.error("Erro ao submeter resposta:", error);
    }
  }

  /**
   * Mostra feedback da resposta
   */
  showFeedback(data) {
    const container = document.querySelector(".quiz-view");
    const correct = data.correct;

    const feedbackHtml = `
      <div class="feedback-overlay ${correct ? "correct" : "incorrect"}">
        <div class="feedback-content">
          <div class="feedback-result">
            ${correct ? "✅ Correto!" : "❌ Incorreto"}
          </div>
          <p class="feedback-explanation">${data.ai_feedback || data.explanation}</p>
          ${!correct ? `<p class="feedback-answer">Resposta: ${data.correct_answer}</p>` : ""}
          <p class="feedback-xp">+${data.xp_earned} XP</p>
        </div>
      </div>
    `;

    container.insertAdjacentHTML("afterend", feedbackHtml);
  }

  /**
   * Finaliza o quiz
   */
  async finishQuiz(totalXp, tier) {
    await this.loadPlayerData();

    const container = document.getElementById("gamePanel");
    const xpGained = this.quizState.xpEarned;

    const finishHtml = `
      <div class="quiz-finish">
        <h2>🎉 Aula Finalizada!</h2>
        
        <div class="finish-stats">
          <div class="stat">
            <span class="stat-label">XP Ganho</span>
            <span class="stat-value">+${xpGained}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Total XP</span>
            <span class="stat-value">${totalXp}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Tier</span>
            <span class="stat-value">${tier}</span>
          </div>
        </div>

        <button class="btn-continue" id="continueBtn">Voltar →</button>
      </div>
    `;

    container.innerHTML = finishHtml;

    document.getElementById("continueBtn").addEventListener("click", () => {
      this.currentView = "lessons";
      this.renderLessonsView();
    });
  }

  /**
   * Atualiza o header com dados do jogador
   */
  updateHeader() {
    const headerContent = `
      <div class="player-info">
        <h2>${this.playerData?.player?.name || "Jogador"}</h2>
        <div class="stats">
          <span>⭐ ${this.playerData?.player?.xp || 0} XP</span>
          <span>🏆 ${this.playerData?.player?.tier || "Iniciante"}</span>
          <span>🎯 ${this.playerData?.player?.accuracy_percent || 0}% Precisão</span>
        </div>
      </div>
    `;

    const header = document.getElementById("playerLabel");
    if (header) {
      header.parentElement.innerHTML = headerContent;
    }
  }
}

// Inicializar app quando o DOM estiver pronto
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    window.musiversoApp = new MusiversoApp();
  });
} else {
  window.musiversoApp = new MusiversoApp();
}
