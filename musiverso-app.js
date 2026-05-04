const MUSIVERSO_DOIS_TITLES = [
  { minXp: 0, title: "Aventureiro Ritmico" },
  { minXp: 120, title: "Explorador Sonoro" },
  { minXp: 320, title: "Cartografo das Notas" },
  { minXp: 720, title: "Guardiao da Harmonia" },
  { minXp: 1500, title: "Mestre do Musiverso" },
];

const MUSIVERSO_WORLD_MOODS = [
  {
    match: /notacao|leitura/i,
    id: "notacao",
    icon: "🎼",
    soundtrack: "Pulso leve, sinos suaves e o coracao do som acordando.",
    topics: ["Teoria Musical", "Notacao", "Leitura"],
    accent: "#57c9ff",
    motif: [261.63, 329.63, 392.0],
  },
  {
    match: /ritmo|metrica/i,
    id: "ritmo",
    icon: "🥁",
    soundtrack: "Percussao corporal, compassos e passos brilhando no tempo.",
    topics: ["Teoria Musical", "Ritmo"],
    accent: "#71df8d",
    motif: [293.66, 293.66, 440.0],
  },
  {
    match: /intervalos|escalas/i,
    id: "intervalos",
    icon: "🎵",
    soundtrack: "Escadas melodicas, constelacoes de notas e saltos ascendentes.",
    topics: ["Teoria Musical", "Escalas"],
    accent: "#7f9cff",
    motif: [329.63, 392.0, 523.25],
  },
  {
    match: /acordes|campo/i,
    id: "acordes",
    icon: "🎹",
    soundtrack: "Blocos harmonicos quentes, piano cartoon e camadas empilhadas.",
    topics: ["Teoria Musical", "Acordes"],
    accent: "#ffb347",
    motif: [261.63, 329.63, 392.0, 523.25],
  },
  {
    match: /funcoes|funcional/i,
    id: "funcoes",
    icon: "🔗",
    soundtrack: "Tonica, subdominante, dominante - as pilares da harmonia funcional.",
    topics: ["Harmonia Funcional", "Ian Guest"],
    accent: "#b88cff",
    motif: [392.0, 493.88, 587.33],
  },
  {
    match: /progress/i,
    id: "progressoes",
    icon: "🚂",
    soundtrack: "Rotas II-V-I, trilhos luminosos e movimento harmônico continuo.",
    topics: ["Harmonia Funcional", "Progressoes"],
    accent: "#ff8e6a",
    motif: [349.23, 440.0, 523.25],
  },
  {
    match: /cadenc|desvio/i,
    id: "cadencias",
    icon: "✨",
    soundtrack: "Portais de resolucao, finais suaves e chegadas orquestradas.",
    topics: ["Harmonia Funcional", "Cadencias"],
    accent: "#ffd36b",
    motif: [440.0, 523.25, 659.25],
  },
  {
    match: /analise/i,
    id: "analise",
    icon: "🔍",
    soundtrack: "Lentes sonoras, rastros funcionais e leitura viva da musica com perspectiva historica.",
    topics: ["Historia da Musica", "Harmonia Funcional", "Roy Bennett"],
    accent: "#42d9c8",
    motif: [329.63, 440.0, 493.88],
  },
  {
    match: /avanc/i,
    id: "avancado",
    icon: "👑",
    soundtrack: "Auroras modais, dominantes secundarias e exploracao cosmica - o pico da maestria.",
    topics: ["Harmonia Funcional", "Modulacao", "Rearmonizacao"],
    accent: "#ff7ac6",
    motif: [523.25, 659.25, 783.99],
  },
];

const QUIZ_MODE_META = {
  standard: {
    label: "Modo normal",
    summary: "Sessao padrao de 10 perguntas.",
    timeLimitSeconds: null,
    xpLabel: "XP padrao",
  },
  timed: {
    label: "Cronometro +50% XP",
    summary: "Responda 10 perguntas antes do tempo acabar para ganhar mais XP por resposta.",
    timeLimitSeconds: 90,
    xpLabel: "+50% XP por resposta",
  },
  meteor: {
    label: "Salve o planeta do meteoro",
    summary: "Acerte pelo menos 6 de 10 em 2 minutos para ganhar 100 XP.",
    timeLimitSeconds: 120,
    xpLabel: "100 XP ao salvar o planeta",
  },
};

const METEOR_ACHIEVEMENT_PREFIX = "Salve o Planeta do Meteoro";

class MusiversoDoisApp {
  constructor() {
    this.playerId = localStorage.getItem("playerId");
    this.session = this.getStoredSession();
    this.playerData = { player: {}, world_progress: [], achievements: [] };
    this.legacyProfile = { progress: {}, profilePhoto: "" };
    this.worlds = [];
    this.lessons = [];
    this.ranking = [];
    this.currentWorld = null;
    this.currentLesson = null;
    this.quizState = null;
    this.latestResult = null;
    this.pendingMeteorChallenge = null;
    this.activeScreen = "map";
    this.audioEnabled = true;
    this.audioContext = null;
    this.quizTimerId = null;
    this.hoveredWorldId = null;
    this.el = this.bindDom();
    this.bindEvents();
    this.init();
  }

  bindDom() {
    return {
      logoutBtn: document.getElementById("logoutBtn"),
      audioToggleBtn: document.getElementById("audioToggleBtn"),
      refreshRankingBtn: document.getElementById("refreshRankingBtn"),
      playerName: document.getElementById("playerName"),
      playerTitle: document.getElementById("playerTitle"),
      playerXp: document.getElementById("playerXp"),
      playerAccuracy: document.getElementById("playerAccuracy"),
      playerUnlockedWorlds: document.getElementById("playerUnlockedWorlds"),
      playerTier: document.getElementById("playerTier"),
      achievementCount: document.getElementById("achievementCount"),
      achievementList: document.getElementById("achievementList"),
      profileImage: document.getElementById("profileImage"),
      profilePlaceholder: document.getElementById("profilePlaceholder"),
      mapHeadline: document.getElementById("mapHeadline"),
      soundtrackLabel: document.getElementById("soundtrackLabel"),
      mapProgressLabel: document.getElementById("mapProgressLabel"),
      worldMap: document.getElementById("worldMap"),
      mapScreen: document.getElementById("mapScreen"),
      detailScreen: document.getElementById("detailScreen"),
      screenNav: document.getElementById("screenNav"),
      screenBackBtn: document.getElementById("screenBackBtn"),
      screenTitle: document.getElementById("screenTitle"),
      worldDetail: document.getElementById("worldDetail"),
      rankingList: document.getElementById("rankingList"),
      rankingHint: document.getElementById("rankingHint"),
    };
  }

  bindEvents() {
    this.el.logoutBtn?.addEventListener("click", () => {
      localStorage.removeItem("musiversoUser");
      localStorage.removeItem("playerId");
      window.location.href = "/auth.html";
    });

    this.el.audioToggleBtn?.addEventListener("click", async () => {
      this.audioEnabled = !this.audioEnabled;
      if (this.audioEnabled) {
        await this.ensureAudioContext();
      }
      this.updateAudioButton();
      this.playUiPulse();
    });

    this.el.refreshRankingBtn?.addEventListener("click", async () => {
      await this.loadRanking();
      this.renderRanking();
      this.playUiPulse();
    });

    this.el.screenBackBtn?.addEventListener("click", () => {
      this.playUiPulse();
      this.goBackScreen();
    });

    document.addEventListener("pointerdown", () => {
      this.ensureAudioContext();
    }, { passive: true });

    window.addEventListener("resize", () => {
      this.renderScreenLayout();
    });
  }

  getStoredSession() {
    const raw = localStorage.getItem("musiversoUser");
    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw);
    } catch (_error) {
      return null;
    }
  }

  async init() {
    if (!this.playerId) {
      window.location.href = "/auth.html";
      return;
    }

    try {
      await Promise.all([
        this.loadPlayerData(),
        this.loadLegacyProfile(),
        this.loadWorlds(),
        this.loadRanking(),
      ]);

      this.updateMeteorChallengeAvailability();

      const firstWorld = this.worlds.find((world) => world.unlocked) || this.worlds[0] || null;
      if (firstWorld) {
        await this.selectWorld(firstWorld.id, { playSound: false, openScreen: false });
      }

      this.renderShell();
    } catch (error) {
      console.error("[MusiversoDois] Erro ao inicializar:", error);
      this.el.worldDetail.innerHTML = `
        <div class="md2-empty-state">
          <h2>MusiversoDois em manutencao</h2>
          <p>${error.message}</p>
        </div>
      `;
    }
  }

  async parseApiResponse(response) {
    const contentType = (response.headers.get("content-type") || "").toLowerCase();
    const rawBody = await response.text();

    let parsed = null;
    if (rawBody) {
      try {
        parsed = JSON.parse(rawBody);
      } catch (_error) {
        parsed = null;
      }
    }

    if (!response.ok) {
      const jsonError = parsed && typeof parsed === "object" ? parsed.error || parsed.message : null;
      const fallbackText = rawBody ? rawBody.slice(0, 180) : "Erro desconhecido";
      const message = jsonError || fallbackText || `Erro HTTP ${response.status}`;
      throw new Error(`Erro ${response.status}: ${message}`);
    }

    if (parsed !== null) {
      return parsed;
    }

    if (contentType.includes("application/json")) {
      throw new Error("A API retornou JSON invalido.");
    }

    throw new Error("A API retornou um formato inesperado.");
  }

  async loadPlayerData() {
    const response = await fetch(`/api/musiverso/player/${this.playerId}/progress`);
    this.playerData = await this.parseApiResponse(response);
  }

  async loadLegacyProfile() {
    try {
      const response = await fetch(`/api/player/sync?playerId=${encodeURIComponent(this.playerId)}`);
      this.legacyProfile = await this.parseApiResponse(response);
    } catch (_error) {
      this.legacyProfile = { progress: {}, profilePhoto: this.session?.profilePhoto || "" };
    }
  }

  async loadWorlds() {
    const response = await fetch(`/api/musiverso/worlds?player_id=${encodeURIComponent(this.playerId)}`);
    const worlds = await this.parseApiResponse(response);
    this.worlds = Array.isArray(worlds)
      ? [...worlds].sort((left, right) => (left.order_number || 0) - (right.order_number || 0))
      : [];
  }

  async loadLessons(worldId) {
    if (!worldId) {
      this.lessons = [];
      return;
    }

    const response = await fetch(
      `/api/musiverso/worlds/${worldId}/lessons?player_id=${encodeURIComponent(this.playerId)}`
    );
    this.lessons = await this.parseApiResponse(response);
  }

  async loadRanking() {
    try {
      const response = await fetch("/api/ranking?limit=8");
      const data = await this.parseApiResponse(response);
      this.ranking = data.entries || [];
    } catch (_error) {
      this.ranking = [];
    }
  }

  getWorldMood(world) {
    const worldName = String(world?.name || "");
    return MUSIVERSO_WORLD_MOODS.find((item) => item.match.test(worldName)) || {
      id: "default",
      icon: world?.icon || "🎵",
      soundtrack: "Uma nova trilha sonora se forma conforme voce avanca.",
      topics: ["Teoria Musical"],
      accent: "#63d1ff",
      motif: [261.63, 392.0, 523.25],
    };
  }

  getWorldProgress(worldId) {
    return this.playerData?.world_progress?.find((item) => item.world_id === worldId) || null;
  }

  getCurriculumBadges(curriculum) {
    if (!curriculum) {
      return "";
    }

    const badges = [
      curriculum.source_label || curriculum.autor_label,
      curriculum.axis_label || curriculum.eixo_curricular,
      curriculum.competency_label,
    ].filter(Boolean);

    return badges.length
      ? `<div class="md2-curriculum-badges">${badges.map((label) => `<span class="chip md2-curriculum-chip">${label}</span>`).join("")}</div>`
      : "";
  }

  getLessonFocusCopy(lesson) {
    const keywords = lesson?.curriculum?.focus_keywords || [];
    if (!keywords.length) {
      return lesson?.description || "Exploracao guiada desta trilha.";
    }

    return `Foco editorial: ${keywords.slice(0, 3).join(" · ")}`;
  }

  getMeteorBannerMarkup() {
    if (!this.pendingMeteorChallenge) {
      return "";
    }

    const lessonId = this.resolveChallengeLessonId(this.pendingMeteorChallenge.sourceLessonId);
    if (!lessonId) {
      return "";
    }

    return `
      <section class="md2-meteor-banner">
        <div>
          <p class="mini-label">Evento especial</p>
          <h3>Salve o planeta do meteoro</h3>
          <p>Marco de ${this.pendingMeteorChallenge.milestone} acertos liberado. Acerte 6 de 10 em 2 minutos para ganhar 100 XP.</p>
        </div>
        <button class="primary-btn md2-meteor-btn" id="startMeteorChallengeBtn" data-lesson-id="${lessonId}" type="button">Iniciar desafio</button>
      </section>
    `;
  }

  getUnlockedWorldCount() {
    return this.worlds.filter((world) => world.unlocked).length;
  }

  getQuizModeMeta(mode) {
    return QUIZ_MODE_META[mode] || QUIZ_MODE_META.standard;
  }

  clearQuizTimer() {
    if (this.quizTimerId) {
      window.clearInterval(this.quizTimerId);
      this.quizTimerId = null;
    }
  }

  getTimeRemainingMs() {
    if (!this.quizState?.endsAt) {
      return 0;
    }
    return Math.max(0, this.quizState.endsAt - Date.now());
  }

  formatCountdown(msRemaining) {
    const totalSeconds = Math.max(0, Math.ceil(msRemaining / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  syncQuizTimerDisplay() {
    if (!this.quizState?.timeLimitSeconds) {
      return;
    }

    const msRemaining = this.getTimeRemainingMs();
    const timerLabel = this.formatCountdown(msRemaining);
    document.querySelectorAll("[data-quiz-timer]").forEach((element) => {
      element.textContent = timerLabel;
      element.classList.toggle("is-warning", msRemaining <= 30000);
    });
  }

  startQuizTimer(seconds) {
    this.clearQuizTimer();
    if (!this.quizState || !seconds) {
      return;
    }

    this.quizState.timeLimitSeconds = seconds;
    this.quizState.endsAt = Date.now() + (seconds * 1000);
    this.syncQuizTimerDisplay();

    this.quizTimerId = window.setInterval(async () => {
      if (!this.quizState?.timeLimitSeconds) {
        this.clearQuizTimer();
        return;
      }

      const msRemaining = this.getTimeRemainingMs();
      this.syncQuizTimerDisplay();
      if (msRemaining > 0) {
        return;
      }

      this.clearQuizTimer();
      await this.finishQuiz("timeout");
    }, 250);
  }

  getClaimedMeteorMilestones() {
    const achievements = this.playerData?.achievements || [];
    const claimed = new Set();

    for (const item of achievements) {
      const name = String(item?.achievements?.name || "");
      if (!name.startsWith(METEOR_ACHIEVEMENT_PREFIX)) {
        continue;
      }
      const match = name.match(/(\d+)$/);
      if (match) {
        claimed.add(Number(match[1]));
      }
    }

    return claimed;
  }

  resolveChallengeLessonId(preferredLessonId) {
    return preferredLessonId || this.currentLesson?.id || this.lessons[0]?.id || null;
  }

  updateMeteorChallengeAvailability(sourceLessonId) {
    const isAdmin = Boolean(this.playerData?.player?.is_admin) || String(this.playerData?.player?.name || "").toLowerCase().startsWith("admin");
    const totalCorrect = Number(this.playerData?.player?.total_correct) || 0;
    const highestMilestone = Math.floor(totalCorrect / 10) * 10;
    const claimedMilestones = this.getClaimedMeteorMilestones();

    let pendingMilestone = null;
    for (let milestone = highestMilestone; milestone >= 10; milestone -= 10) {
      if (!claimedMilestones.has(milestone)) {
        pendingMilestone = milestone;
        break;
      }
    }

    if (!pendingMilestone && isAdmin) {
      const claimedValues = Array.from(claimedMilestones.values());
      const maxClaimed = claimedValues.length ? Math.max(...claimedValues) : 0;
      pendingMilestone = Math.max(10, maxClaimed + 10);
    }

    if (!pendingMilestone) {
      this.pendingMeteorChallenge = null;
      return;
    }

    this.pendingMeteorChallenge = {
      milestone: pendingMilestone,
      sourceLessonId: this.resolveChallengeLessonId(sourceLessonId || this.pendingMeteorChallenge?.sourceLessonId),
    };
  }

  getPlayerTitle() {
    const explicitTitle = this.legacyProfile?.progress?.highestTitle;
    if (explicitTitle) {
      return explicitTitle;
    }

    const xp = Number(this.playerData?.player?.xp) || 0;
    let selected = MUSIVERSO_DOIS_TITLES[0].title;
    for (const item of MUSIVERSO_DOIS_TITLES) {
      if (xp >= item.minXp) {
        selected = item.title;
      }
    }
    return selected;
  }

  updateAudioButton() {
    if (!this.el.audioToggleBtn) {
      return;
    }

    this.el.audioToggleBtn.textContent = this.audioEnabled ? "Som ligado" : "Som pausado";
    this.el.audioToggleBtn.classList.toggle("is-muted", !this.audioEnabled);
  }

  async selectWorld(worldId, options = {}) {
    const { playSound = true, openScreen = true } = options;
    const nextWorld = this.worlds.find((world) => world.id === worldId) || null;

    if (!nextWorld) {
      return;
    }

    this.currentWorld = nextWorld;
    this.currentLesson = null;
    this.quizState = null;
    this.clearQuizTimer();

    if (this.currentWorld.unlocked) {
      await this.loadLessons(this.currentWorld.id);
    } else {
      this.lessons = [];
    }

    if (playSound) {
      this.playWorldPreview(this.currentWorld);
    }

    if (openScreen) {
      this.activeScreen = "world";
    }

    this.renderShell();
  }

  renderShell() {
    this.updateAudioButton();
    this.renderScreenLayout();
    this.renderProfile();
    this.renderMap();
    this.renderDetail();
    this.renderRanking();
  }

  isCompactLayout() {
    return window.matchMedia("(max-width: 900px)").matches;
  }

  goBackScreen() {
    if (this.activeScreen === "quiz") {
      this.clearQuizTimer();
      this.quizState = null;
      this.activeScreen = "world";
      this.renderShell();
      return;
    }

    if (this.activeScreen === "world") {
      this.activeScreen = "map";
      this.renderScreenLayout();
      return;
    }
  }

  renderScreenLayout() {
    const mapPanel = document.querySelector(".md2-map-panel");
    if (!mapPanel) {
      return;
    }

    mapPanel.dataset.screen = this.activeScreen;
    this.el.screenBackBtn?.setAttribute("hidden", "hidden");

    if (this.el.screenTitle) {
      this.el.screenTitle.textContent = this.activeScreen === "map"
        ? "Explore seu conhecimento musical no Musiverso"
        : this.activeScreen === "quiz"
          ? "Quiz da trilha"
          : "Bem-vindo ao Musiverso";
    }
  }

  renderProfile() {
    const player = this.playerData?.player || {};
    const accuracy = Number(player.accuracy_percent || 0);
    const profilePhoto = this.legacyProfile?.profilePhoto || this.session?.profilePhoto || "";
    const playerName = player.name || this.session?.nickname || "Explorador";

    this.el.playerName.textContent = playerName;
    this.el.playerTitle.textContent = this.getPlayerTitle();
    this.el.playerXp.textContent = String(Number(player.xp) || 0);
    this.el.playerAccuracy.textContent = `${accuracy}%`;
    this.el.playerUnlockedWorlds.textContent = `${this.getUnlockedWorldCount()}/${this.worlds.length || 9}`;
    this.el.playerTier.textContent = player.tier || "Iniciante";
    this.el.achievementCount.textContent = String((this.playerData?.achievements || []).length);

    if (profilePhoto) {
      this.el.profileImage.src = profilePhoto;
      this.el.profileImage.style.display = "block";
      this.el.profilePlaceholder.style.display = "none";
    } else {
      this.el.profileImage.style.display = "none";
      this.el.profilePlaceholder.style.display = "grid";
      this.el.profilePlaceholder.textContent = playerName.slice(0, 1).toUpperCase() || "♪";
    }

    const achievements = this.playerData?.achievements || [];
    this.el.achievementList.innerHTML = achievements.length
      ? achievements.slice(0, 4).map((item) => {
          const badge = item.achievements;
          return `
            <article class="md2-achievement-pill">
              <span>${badge?.icon || "🎵"}</span>
              <div>
                <strong>${badge?.name || "Conquista"}</strong>
                <small>${badge?.description || "Nova descoberta musical"}</small>
              </div>
            </article>
          `;
        }).join("")
      : `
        <div class="md2-empty-chip">
          Termine sua primeira trilha para liberar conquistas musicais.
        </div>
      `;
  }

  renderMap() {
    const selectedWorldId = this.currentWorld?.id;
    const unlockedCount = this.getUnlockedWorldCount();
    this.el.mapHeadline.textContent = "Bem-vindo ao Musiverso";
    this.el.soundtrackLabel.textContent = this.currentWorld
      ? this.getWorldMood(this.currentWorld).soundtrack
      : "Clique em um mundo no mapa para explorar suas trilhas.";
    this.el.mapProgressLabel.textContent = `${unlockedCount} mundos desbloqueados`;

    this.el.worldMap.innerHTML = this.worlds.map((world, index) => {
      const mood = this.getWorldMood(world);
      const progress = this.getWorldProgress(world.id);
      const completed = Boolean(progress && progress.lessons_completed >= progress.total_lessons && progress.total_lessons > 0);
      const isSelected = world.id === selectedWorldId;
      const connector = index < this.worlds.length - 1
        ? `<div class="md2-world-link ${world.unlocked ? "is-open" : ""}"></div>`
        : "";

      return `
        <div class="md2-world-stop md2-world-stop--${index % 3}">
          <button
            class="md2-world-node md2-world-node--${mood.id} ${world.unlocked ? "is-unlocked" : "is-locked"} ${completed ? "is-completed" : ""} ${isSelected ? "is-selected" : ""}"
            data-world-id="${world.id}"
            type="button"
            aria-label="${world.name}"
          >
            <span class="md2-world-node__pulse"></span>
            <span class="md2-world-node__icon">${world.icon || mood.icon}</span>
            <span class="md2-world-node__name">${world.name}</span>
            <span class="md2-world-node__meta">
              ${world.unlocked
                ? `${progress?.lessons_completed || 0}/${progress?.total_lessons || 0} trilhas`
                : `🔒 ${world.xp_to_unlock || 0} XP`}
            </span>
            ${world.unlocked ? `<span class="md2-world-node__cta">${isSelected ? "▼ trilhas abertas" : "Ver trilhas ↓"}</span>` : ""}
          </button>
          ${connector}
        </div>
      `;
    }).join("");

    this.el.worldMap.querySelectorAll(".md2-world-node").forEach((button) => {
      button.addEventListener("click", async () => {
        this.playUiPulse();
        this.hoveredWorldId = null;
        await this.selectWorld(button.dataset.worldId);
      });

      button.addEventListener("mouseenter", () => {
        if (this.hoveredWorldId === button.dataset.worldId) {
          return;
        }
        this.hoveredWorldId = button.dataset.worldId;
        const world = this.worlds.find((item) => item.id === button.dataset.worldId);
        if (world) {
          this.playWorldPreview(world, 0.035);
        }
      });
    });
  }

  renderDetail() {
    if (!this.currentWorld) {
      this.el.worldDetail.innerHTML = `
        <div class="md2-empty-state">
          <h2>Preparando o MusiversoDois</h2>
          <p>Selecione um mundo para visualizar sua trilha.</p>
        </div>
      `;
      return;
    }

    if (this.quizState) {
      this.renderQuizDetail();
      return;
    }

    this.renderWorldDetail();
  }

  renderWorldDetail() {
    const world = this.currentWorld;
    const mood = this.getWorldMood(world);
    const progress = this.getWorldProgress(world.id);
    const completionRatio = progress?.total_lessons
      ? Math.round(((progress?.lessons_completed || 0) / progress.total_lessons) * 100)
      : 0;
    const resultMarkup = this.latestResult && this.latestResult.worldId === world.id
      ? `
          <div class="md2-result-banner md2-result-banner--${this.latestResult.tone}">
            <span class="md2-result-banner__icon">${this.latestResult.icon}</span>
            <div>
              <strong>${this.latestResult.label}</strong>
              <p>${this.latestResult.correctAnswers}/${this.latestResult.totalQuestions} acertos · +${this.latestResult.xp} XP</p>
            </div>
          </div>
        `
      : "";
    const meteorMarkup = this.getMeteorBannerMarkup();

    const lessonsMarkup = world.unlocked
      ? (this.lessons.length
          ? this.lessons.map((lesson) => `
              <article class="md2-lesson-card ${lesson.completed ? "is-completed" : ""}">
                <div class="md2-lesson-card__top">
                  <span class="md2-lesson-card__icon">${lesson.completed ? "✅" : "🎵"}</span>
                  <div class="md2-lesson-card__info">
                    <strong>${lesson.name}</strong>
                    <span>${lesson.attempts || 0} tentativas · ${lesson.xp_earned || 0} XP</span>
                    ${this.getCurriculumBadges(lesson.curriculum)}
                    <small>${this.getLessonFocusCopy(lesson)}</small>
                  </div>
                </div>
                <div class="md2-lesson-actions">
                  <button class="md2-lesson-btn ${lesson.completed ? "is-done" : ""}" data-lesson-id="${lesson.id}" data-mode="standard" type="button">
                    ${lesson.completed ? "Revisar" : "Entrar na trilha"}
                  </button>
                  <button class="ghost-btn md2-lesson-timed-btn" data-lesson-id="${lesson.id}" data-mode="timed" type="button">
                    Cronometro +50% XP
                  </button>
                </div>
              </article>
            `).join("")
          : `<div class="md2-empty-chip">Este mundo ainda esta preparando suas trilhas.</div>`)
      : `
          <div class="md2-locked-world">
            <strong>🔒 Mundo bloqueado</strong>
            <p>Ganhe mais ${world.xp_to_unlock || 0} XP para abrir este caminho musical.</p>
          </div>
        `;

    this.el.worldDetail.innerHTML = `
      <div class="md2-detail-top">
        <p class="md2-detail-top__title">Trilhas de ${world.name}</p>
        <button class="md2-inline-back" id="inlineBackBtn" type="button">Voltar ao mapa</button>
      </div>
      ${resultMarkup}
      ${meteorMarkup}
      <section class="md2-focus-card md2-focus-card--${mood.id}">
        <div class="md2-focus-card__hero">
          <div class="md2-focus-card__art">
            <span>${world.icon || mood.icon}</span>
          </div>
          <div>
            <p class="mini-label">Mundo Musical</p>
            <h2>${world.name}</h2>
            <p>${world.description || "Uma nova paisagem musical pronta para ser explorada."}</p>
            ${this.getCurriculumBadges(world.curriculum)}
            ${world.curriculum?.source_summary ? `<p class="md2-curriculum-summary">Base editorial: ${world.curriculum.source_summary}</p>` : ""}
          </div>
        </div>

        <div class="md2-focus-stats">
          <div><span>Trilhas completas</span><strong>${progress?.lessons_completed || 0}/${progress?.total_lessons || 0}</strong></div>
          <div><span>Mapa explorado</span><strong>${completionRatio}%</strong></div>
          <div><span>Camada sonora</span><strong>${mood.topics.join(" · ")}</strong></div>
        </div>

        <div class="md2-focus-actions">
          <button class="secondary-btn md2-preview-btn" type="button" id="previewWorldBtn">Ouvir tema</button>
          <span class="chip">${world.unlocked ? "Trilha aberta" : "Aguardando desbloqueio"}</span>
        </div>
      </section>

      <section class="md2-lessons-section">
        <div class="md2-section-head">
          <h3>Trilhas deste mundo</h3>
          <span>${this.lessons.length || 0} missoes</span>
        </div>
        <div class="md2-lessons-list">${lessonsMarkup}</div>
      </section>
    `;

    this.el.worldDetail.querySelector("#previewWorldBtn")?.addEventListener("click", () => {
      this.playWorldPreview(world, 0.05);
    });

    this.el.worldDetail.querySelector("#inlineBackBtn")?.addEventListener("click", () => {
      this.playUiPulse();
      this.activeScreen = "map";
      this.renderShell();
    });

    this.el.worldDetail.querySelector("#startMeteorChallengeBtn")?.addEventListener("click", async (event) => {
      this.playUiPulse();
      await this.startMeteorChallenge({
        lessonId: event.currentTarget.dataset.lessonId,
        milestone: this.pendingMeteorChallenge?.milestone,
      });
    });

    this.el.worldDetail.querySelectorAll(".md2-lesson-btn, .md2-lesson-timed-btn").forEach((button) => {
      button.addEventListener("click", async () => {
        this.playUiPulse();
        await this.startLesson(button.dataset.lessonId, { mode: button.dataset.mode || "standard" });
      });
    });
  }

  renderQuizDetail() {
    const question = this.quizState.questions[this.quizState.currentQuestionIndex];
    const progress = Math.round(((this.quizState.currentQuestionIndex + 1) / this.quizState.questions.length) * 100);
    const feedback = this.quizState.currentFeedback;
    const mood = this.getWorldMood(this.currentWorld);
    const modeMeta = this.getQuizModeMeta(this.quizState.mode);
    const timerMarkup = this.quizState.timeLimitSeconds
      ? `<span class="chip md2-timer-chip" data-quiz-timer>${this.formatCountdown(this.getTimeRemainingMs())}</span>`
      : "";

    this.el.worldDetail.innerHTML = `
      <section class="md2-quiz-card md2-quiz-card--${mood.id}">
        <div class="md2-quiz-topbar">
          <button class="md2-inline-back" id="exitQuizBtn" type="button">Voltar para trilhas</button>
          <span class="chip">${this.currentWorld.name}</span>
          <span class="chip">${modeMeta.label}</span>
          <span class="chip">${this.quizState.currentQuestionIndex + 1}/${this.quizState.questions.length}</span>
          ${timerMarkup}
        </div>

        ${this.getCurriculumBadges(this.currentLesson?.curriculum || question)}

        <div class="md2-quiz-progress">
          <div class="md2-quiz-progress__fill" style="width: ${progress}%"></div>
        </div>

        <div class="md2-quiz-copy">
          <p class="mini-label">Licao atual</p>
          <h2>${this.currentLesson?.name || "Trilha sonora"}</h2>
          <p class="md2-curriculum-summary">${modeMeta.summary}</p>
          <p class="md2-quiz-focus">${this.getLessonFocusCopy(this.currentLesson)}</p>
          <p>${question.question_text}</p>
        </div>

        <div class="md2-quiz-options">
          ${question.options.map((option, index) => {
            const isSelected = feedback && String(index) === String(feedback.user_answer_index);
            const isCorrect = feedback && String(index) === String(feedback.correct_option_index);
            return `
              <button
                class="md2-quiz-option ${isSelected ? "is-selected" : ""} ${isCorrect ? "is-correct" : ""}"
                data-option="${index}"
                type="button"
                ${feedback ? "disabled" : ""}
              >
                <span>${option}</span>
              </button>
            `;
          }).join("")}
        </div>

        <div class="md2-quiz-footer">
          <div class="md2-quiz-counters">
            <span>⭐ ${this.quizState.xpEarned} XP</span>
            <span>🎯 ${this.quizState.correctAnswers} acertos</span>
            <span>🔥 ${this.quizState.bestStreak} combo maximo</span>
            <span>⏱️ ${modeMeta.xpLabel}</span>
          </div>
          ${feedback
            ? `
              <div class="md2-quiz-feedback ${feedback.correct ? "is-correct" : "is-wrong"}">
                <strong>${feedback.correct ? "Resposta afinada" : "Ajuste a escuta"}</strong>
                <p>${feedback.ai_feedback || feedback.explanation || "Continue explorando o conceito."}</p>
                ${feedback.correct ? "" : `<small>Resposta correta: ${feedback.correct_answer || ""}</small>`}
                <button class="primary-btn" id="nextQuizBtn" type="button">${this.quizState.currentQuestionIndex >= this.quizState.questions.length - 1 ? "Finalizar trilha" : "Proxima pergunta"}</button>
              </div>
            `
            : `<p class="hint">Toque em uma alternativa para ouvir o feedback musical.</p>`}
        </div>
      </section>
    `;

    this.el.worldDetail.querySelector("#exitQuizBtn")?.addEventListener("click", () => {
      this.clearQuizTimer();
      this.quizState = null;
      this.activeScreen = "world";
      this.renderShell();
    });

    this.el.worldDetail.querySelectorAll(".md2-quiz-option").forEach((button) => {
      button.addEventListener("click", async () => {
        await this.submitAnswer(question.id, button.dataset.option);
      });
    });

    this.el.worldDetail.querySelector("#nextQuizBtn")?.addEventListener("click", async () => {
      await this.advanceQuiz();
    });

    this.syncQuizTimerDisplay();
  }

  renderRanking() {
    this.el.rankingList.innerHTML = this.ranking.length
      ? this.ranking.map((entry, index) => `
          <li>
            <span class="rank-index">${index + 1}</span>
            <div>
              <div class="rank-name">${entry.player_name || "Jogador"}</div>
              <small>${entry.highest_title || "Explorador"}</small>
            </div>
            <span class="rank-score">${entry.total_score || entry.best_score || 0} pts</span>
          </li>
        `).join("")
      : `<li>Nenhum registro ainda.</li>`;

    this.el.rankingHint.textContent = this.currentWorld
      ? `Mundo em destaque: ${this.currentWorld.name}`
      : "Conclua trilhas para ver o mapa crescer.";
  }

  async startLesson(lessonId, options = {}) {
    const mode = options.mode || "standard";
    this.currentLesson = this.lessons.find((lesson) => String(lesson.id) === String(lessonId)) || null;
    this.latestResult = null;
    this.clearQuizTimer();

    const response = await fetch(
      `/api/musiverso/questions?lesson_id=${encodeURIComponent(lessonId)}&player_id=${encodeURIComponent(this.playerId)}&count=10`
    );
    const data = await this.parseApiResponse(response);

    this.quizState = {
      questions: data.questions || [],
      currentQuestionIndex: 0,
      xpEarned: 0,
      correctAnswers: 0,
      answeredQuestions: 0,
      streak: 0,
      bestStreak: 0,
      currentFeedback: null,
      mode,
      timeLimitSeconds: this.getQuizModeMeta(mode).timeLimitSeconds,
      endsAt: null,
      meteorMilestone: null,
    };

    this.activeScreen = "quiz";

    this.playWorldPreview(this.currentWorld, 0.04);
    this.renderShell();

    if (this.quizState.timeLimitSeconds) {
      this.startQuizTimer(this.quizState.timeLimitSeconds);
    }
  }

  async startMeteorChallenge(options = {}) {
    const lessonId = this.resolveChallengeLessonId(options.lessonId || this.pendingMeteorChallenge?.sourceLessonId);
    if (!lessonId) {
      return;
    }

    this.currentLesson = this.lessons.find((lesson) => String(lesson.id) === String(lessonId)) || this.currentLesson;
    this.latestResult = null;
    this.clearQuizTimer();

    const response = await fetch(
      `/api/musiverso/questions?lesson_id=${encodeURIComponent(lessonId)}&player_id=${encodeURIComponent(this.playerId)}&count=10&difficulty=hard`
    );
    const data = await this.parseApiResponse(response);

    this.quizState = {
      questions: data.questions || [],
      currentQuestionIndex: 0,
      xpEarned: 0,
      correctAnswers: 0,
      answeredQuestions: 0,
      streak: 0,
      bestStreak: 0,
      currentFeedback: null,
      mode: "meteor",
      timeLimitSeconds: this.getQuizModeMeta("meteor").timeLimitSeconds,
      endsAt: null,
      meteorMilestone: Number(options.milestone || this.pendingMeteorChallenge?.milestone) || null,
    };

    this.activeScreen = "quiz";
    this.playWorldPreview(this.currentWorld, 0.055);
    this.renderShell();
    this.startQuizTimer(this.quizState.timeLimitSeconds);
  }

  async submitAnswer(questionId, userAnswer) {
    if (!this.quizState || this.quizState.currentFeedback || (this.quizState.timeLimitSeconds && this.getTimeRemainingMs() <= 0)) {
      return;
    }

    const response = await fetch("/api/musiverso/answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        player_id: this.playerId,
        lesson_id: this.quizState.mode === "meteor" ? null : this.currentLesson?.id,
        question_id: questionId,
        user_answer: userAnswer,
        challenge_mode: this.quizState.mode,
      }),
    });

    const data = await this.parseApiResponse(response);
    this.quizState.xpEarned += Number(data.xp_earned) || 0;
    if (data.correct) {
      this.quizState.correctAnswers += 1;
      this.quizState.streak += 1;
      this.quizState.bestStreak = Math.max(this.quizState.bestStreak, this.quizState.streak);
      this.playCorrectSound();
    } else {
      this.quizState.streak = 0;
      this.playWrongSound();
    }
    this.quizState.answeredQuestions += 1;

    if (data.meteor_challenge_unlocked && data.meteor_challenge_milestone) {
      this.pendingMeteorChallenge = {
        milestone: Number(data.meteor_challenge_milestone),
        sourceLessonId: this.currentLesson?.id || null,
      };
    }

    const currentQuestion = this.quizState.questions[this.quizState.currentQuestionIndex];
    this.quizState.currentFeedback = {
      ...data,
      user_answer_index: String(userAnswer),
      correct_option_index: String(currentQuestion.correct_option),
    };

    this.renderShell();
  }

  async advanceQuiz() {
    if (!this.quizState) {
      return;
    }

    if (this.quizState.currentQuestionIndex >= this.quizState.questions.length - 1) {
      await this.finishQuiz();
      return;
    }

    this.quizState.currentQuestionIndex += 1;
    this.quizState.currentFeedback = null;
    this.playUiPulse();
    this.renderShell();
  }

  async finishQuiz(reason = "completed") {
    if (!this.quizState) {
      return;
    }

    this.clearQuizTimer();

    const finishedState = this.quizState;
    const correctAnswers = finishedState.correctAnswers;
    const totalQuestions = finishedState.questions.length;
    const answeredQuestions = finishedState.answeredQuestions || 0;
    const timedOut = reason === "timeout";
    let xp = finishedState.xpEarned;
    let tone = correctAnswers <= 1 ? "danger" : correctAnswers <= 3 ? "warning" : "success";
    let icon = tone === "danger" ? "🎯" : tone === "warning" ? "🌟" : "🏆";
    let label = timedOut
      ? "O tempo da trilha acabou"
      : tone === "danger"
        ? "A trilha ainda esta aquecendo"
        : tone === "warning"
          ? "Boa evolucao musical"
          : "Execucao brilhante";

    if (finishedState.mode === "meteor") {
      const success = !timedOut && answeredQuestions >= totalQuestions && correctAnswers >= 6;
      const rewardResponse = await fetch("/api/musiverso/challenge/meteor/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          player_id: this.playerId,
          milestone: finishedState.meteorMilestone,
          success,
        }),
      });
      const rewardData = await this.parseApiResponse(rewardResponse);
      xp = Number(rewardData.reward_xp) || 0;
      tone = success ? "success" : "danger";
      icon = success ? "☄️" : "🛡️";
      label = success ? "Planeta salvo do meteoro" : "O meteoro venceu esta rodada";
    }

    this.latestResult = {
      worldId: this.currentWorld?.id,
      tone,
      icon,
      label,
      correctAnswers,
      totalQuestions,
      xp,
    };

    this.quizState = null;
    this.activeScreen = "world";
    this.playFinishSound(tone);

    await Promise.all([
      this.loadPlayerData(),
      this.loadLegacyProfile(),
      this.loadWorlds(),
      this.loadRanking(),
      this.currentWorld?.id ? this.loadLessons(this.currentWorld.id) : Promise.resolve(),
    ]);

    this.updateMeteorChallengeAvailability(this.currentLesson?.id);

    this.renderShell();
  }

  async ensureAudioContext() {
    if (!this.audioEnabled || typeof window.AudioContext === "undefined") {
      return null;
    }

    if (!this.audioContext) {
      this.audioContext = new window.AudioContext();
    }

    if (this.audioContext.state === "suspended") {
      await this.audioContext.resume();
    }

    return this.audioContext;
  }

  async playTone(frequency, duration, options = {}) {
    const context = await this.ensureAudioContext();
    if (!context || !frequency) {
      return;
    }

    const { delay = 0, gain = 0.04, type = "sine" } = options;
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    const now = context.currentTime + delay;

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, now);
    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.exponentialRampToValueAtTime(gain, now + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + duration + 0.04);
  }

  playSequence(frequencies, options = {}) {
    frequencies.forEach((frequency, index) => {
      this.playTone(frequency, options.duration || 0.22, {
        delay: index * (options.step || 0.11),
        gain: options.gain || 0.04,
        type: options.type || "triangle",
      });
    });
  }

  playWorldPreview(world, gain = 0.03) {
    if (!world || !this.audioEnabled) {
      return;
    }
    const mood = this.getWorldMood(world);
    this.playSequence(mood.motif, { gain, duration: 0.18, step: 0.09, type: "triangle" });
  }

  playUiPulse() {
    if (!this.audioEnabled) {
      return;
    }
    this.playSequence([523.25, 659.25], { gain: 0.02, duration: 0.08, step: 0.05, type: "square" });
  }

  playCorrectSound() {
    this.playSequence([523.25, 659.25, 783.99], { gain: 0.035, duration: 0.18, step: 0.08, type: "triangle" });
  }

  playWrongSound() {
    this.playSequence([392.0, 369.99], { gain: 0.02, duration: 0.2, step: 0.06, type: "sawtooth" });
  }

  playFinishSound(tone) {
    const map = {
      danger: [261.63, 311.13, 349.23],
      warning: [329.63, 392.0, 493.88],
      success: [392.0, 523.25, 659.25, 783.99],
    };
    this.playSequence(map[tone] || map.success, { gain: 0.04, duration: 0.22, step: 0.09, type: "triangle" });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    window.musiversoDois = new MusiversoDoisApp();
  });
} else {
  window.musiversoDois = new MusiversoDoisApp();
}