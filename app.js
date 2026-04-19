const state = {
  authenticated: false,
  playerName: "",
  activeLevel: "facil",
  unlockedLevels: ["facil"],
  totalScore: 0,
  roundScore: 0,
  streak: 0,
  roundBestStreak: 0,
  roundCorrectAnswers: 0,
  questionIndex: 0,
  questions: [],
  questionTimerId: null,
  currentTimeLimit: 10,
  secondsLeft: 0,
  hasAnsweredCurrent: false,
  isRoundStarted: false,
  seenQuestionIdsByLevel: {
    facil: new Set(),
    medio: new Set(),
    dificil: new Set(),
  },
  rankingScope: "overall",
  activeTopic: null,
  currentQuestionExplicacoes: [],
};

const LEVEL_META = {
  facil: { label: "Facil", basePoints: 10, unlockScore: 0, roundSize: 10, timeLimit: 10 },
  medio: { label: "Medio", basePoints: 15, unlockScore: 500, roundSize: 10, timeLimit: 15 },
  dificil: { label: "Dificil", basePoints: 20, unlockScore: 1000, roundSize: 10, timeLimit: 20 },
};

const RECENT_COOLDOWN_ROUNDS = 3;

const TOPICS = [
  { id: "teoria-musical",     label: "Teoria Musical" },
  { id: "harmonia-funcional", label: "Harmonia Funcional" },
  { id: "historia-da-musica", label: "Historia da Musica" },
];

const TITLES = [
  { minScore: 0, title: "Aventureiro Ritmico" },
  { minScore: 60, title: "Explorador Sonoro" },
  { minScore: 120, title: "Viajante Musical" },
  { minScore: 180, title: "Navegador Harmonico" },
  { minScore: 250, title: "Guardiao dos Ritmos" },
  { minScore: 330, title: "Mestre das Melodias" },
  { minScore: 420, title: "Comandante do Som" },
  { minScore: 520, title: "Lenda do Musiverso" },
];

const fallbackQuestions = {
  facil: [
    {
      question: "Qual destes instrumentos tem teclas?",
      options: ["Tambor", "Piano", "Chocalho", "Triangulo"],
      correct_option: 1,
      explanation: "O piano e um instrumento com teclas.",
    },
    {
      question: "Quando a musica fica bem fraquinha, ela esta...",
      options: ["Baixa", "Muito rapida", "Desafinada", "Parada"],
      correct_option: 0,
      explanation: "Som baixo significa volume fraquinho.",
    },
  ],
  medio: [
    {
      question: "Qual palavra indica velocidade da musica?",
      options: ["Tempo", "Cor", "Peso", "Sabor"],
      correct_option: 0,
      explanation: "Tempo indica se a musica esta lenta ou rapida.",
    },
    {
      question: "Qual instrumento e de cordas?",
      options: ["Violao", "Pandeiro", "Flauta", "Bateria"],
      correct_option: 0,
      explanation: "O violao produz som pelas cordas.",
    },
  ],
  dificil: [
    {
      question: "Um grupo de notas em sequencia forma uma...",
      options: ["Melodia", "Pintura", "Escultura", "Fotografia"],
      correct_option: 0,
      explanation: "Melodia e a sequencia de notas que conseguimos cantar.",
    },
    {
      question: "Qual sinal indica para repetir uma parte da musica?",
      options: ["Pausa", "Barra dupla com pontos", "Clave", "Sustenido"],
      correct_option: 1,
      explanation: "A barra com pontos indica repeticao do trecho.",
    },
  ],
};

const el = {
  startGameBtn: document.getElementById("startGameBtn"),
  logoutBtn: document.getElementById("logoutBtn"),
  playerLabel: document.getElementById("playerLabel"),
  profileInput: document.getElementById("profileInput"),
  profileImage: document.getElementById("profileImage"),
  profilePlaceholder: document.getElementById("profilePlaceholder"),
  titleChip: document.getElementById("titleChip"),
  scoreValue: document.getElementById("scoreValue"),
  streakValue: document.getElementById("streakValue"),
  correctValue: document.getElementById("correctValue"),
  questionCounter: document.getElementById("questionCounter"),
  timebarWrap: document.getElementById("timebarWrap"),
  timebarFill: document.getElementById("timebarFill"),
  questionText: document.getElementById("questionText"),
  answersWrap: document.getElementById("answersWrap"),
  feedbackText: document.getElementById("feedbackText"),
  nextBtn: document.getElementById("nextBtn"),
  levelSelect: document.getElementById("levelSelect"),
  topicSelect: document.getElementById("topicSelect"),
  progressBar: document.getElementById("progressBar"),
  rankingList: document.getElementById("rankingList"),
  overallBtn: document.getElementById("overallBtn"),
  byLevelBtn: document.getElementById("byLevelBtn"),
  rankingHint: document.getElementById("rankingHint"),
  answerButtonTemplate: document.getElementById("answerButtonTemplate"),
  quizStartCta: document.getElementById("quizStartCta"),
  quizHeader: document.getElementById("quizHeader"),
  toggleHeaderBtn: document.getElementById("toggleHeaderBtn"),
};

function setHeaderCollapsed(collapsed) {
  el.quizHeader.classList.toggle("collapsed", collapsed);
  el.toggleHeaderBtn.textContent = collapsed ? "Mostrar cabecalho" : "Ocultar cabecalho";
  el.toggleHeaderBtn.setAttribute("aria-expanded", String(!collapsed));
}

function apiFetch(path, options = {}) {
  return fetch(path, options).then((res) => {
    if (!res.ok) {
      return res.json().then((data) => {
        throw new Error(data.error || "Erro na requisicao");
      });
    }
    return res.json();
  });
}

function getTitleByScore(score) {
  let title = TITLES[0].title;
  for (const entry of TITLES) {
    if (score >= entry.minScore) {
      title = entry.title;
    }
  }
  return title;
}

function recalculateUnlockedLevels() {
  const unlocked = ["facil"];
  if (state.totalScore >= LEVEL_META.medio.unlockScore) {
    unlocked.push("medio");
  }
  if (state.totalScore >= LEVEL_META.dificil.unlockScore) {
    unlocked.push("dificil");
  }
  state.unlockedLevels = unlocked;

  if (!state.unlockedLevels.includes(state.activeLevel)) {
    state.activeLevel = state.unlockedLevels[state.unlockedLevels.length - 1];
  }
}

function updateUiStats() {
  recalculateUnlockedLevels();
  el.playerLabel.textContent = state.playerName || "-";
  el.titleChip.textContent = getTitleByScore(state.totalScore);
  el.scoreValue.textContent = state.roundScore;
  el.streakValue.textContent = state.streak;
  el.correctValue.textContent = state.roundCorrectAnswers;

  const total = state.questions.length || 1;
  const progress = (state.questionIndex / total) * 100;
  el.progressBar.style.width = `${Math.min(progress, 100)}%`;
  updateTimeBar();

  renderLevelButtons();
  renderTopicButtons();
}

function clearQuestionTimer() {
  if (state.questionTimerId) {
    clearInterval(state.questionTimerId);
    state.questionTimerId = null;
  }
}

function updateTimerChip() {
  // Timer visual is represented by the progress bar in the question area.
}

function updateTimeBar() {
  const safeLimit = Number(state.currentTimeLimit) > 0 ? Number(state.currentTimeLimit) : 10;
  const safeSeconds = Number.isFinite(state.secondsLeft) ? Math.max(0, state.secondsLeft) : 0;
  const pct = state.isRoundStarted ? Math.max(0, Math.min(100, (safeSeconds / safeLimit) * 100)) : 0;

  el.timebarFill.style.width = `${pct}%`;
  el.timebarWrap.classList.remove("timebar-warning", "timebar-danger");

  if (!state.isRoundStarted) {
    return;
  }

  if (pct <= 25) {
    el.timebarWrap.classList.add("timebar-danger");
  } else if (pct <= 50) {
    el.timebarWrap.classList.add("timebar-warning");
  }
}

function showStartCta(show) {
  el.quizStartCta.style.display = show ? "grid" : "none";
}

function handleTimeOut() {
  const question = state.questions[state.questionIndex];
  if (!question || state.hasAnsweredCurrent) {
    return;
  }

  state.hasAnsweredCurrent = true;
  clearQuestionTimer();

  recordSeenQuestion(state.activeLevel, question.id);

  const buttons = Array.from(el.answersWrap.querySelectorAll(".answer-btn"));
  buttons.forEach((btn) => {
    btn.disabled = true;
  });

  state.streak = 0;
  if (buttons[question.correctOption]) {
    buttons[question.correctOption].classList.add("correct");
  }

  const reason = question.explanation ? ` ${question.explanation}` : "";
  setFeedback(`Tempo esgotado! A resposta certa foi destacada.${reason}`, "error");
  updateUiStats();
  el.nextBtn.disabled = false;
}

function startQuestionTimer() {
  clearQuestionTimer();
  state.currentTimeLimit = LEVEL_META[state.activeLevel]?.timeLimit || 10;
  state.secondsLeft = state.currentTimeLimit;
  updateTimerChip();
  updateTimeBar();

  state.questionTimerId = setInterval(() => {
    state.secondsLeft -= 1;
    updateTimerChip();
    updateTimeBar();

    if (state.secondsLeft <= 0) {
      handleTimeOut();
    }
  }, 1000);
}

function renderTopicButtons() {
  el.topicSelect.innerHTML = "";

  // Botao "Todos"
  const allBtn = document.createElement("button");
  allBtn.className = `topic-btn ${state.activeTopic === null ? "active" : ""}`;
  allBtn.textContent = "Todos os topicos";
  allBtn.addEventListener("click", () => {
    if (state.isRoundStarted) return;
    state.activeTopic = null;
    renderTopicButtons();
    setFeedback("Topico: Todos os topicos selecionado.", "ok");
  });
  el.topicSelect.appendChild(allBtn);

  for (const topic of TOPICS) {
    const btn = document.createElement("button");
    btn.className = `topic-btn ${state.activeTopic === topic.id ? "active" : ""}`;
    btn.textContent = topic.label;
    btn.addEventListener("click", () => {
      if (state.isRoundStarted) return;
      state.activeTopic = topic.id;
      renderTopicButtons();
      setFeedback(`Topico: ${topic.label} selecionado.`, "ok");
    });
    el.topicSelect.appendChild(btn);
  }
}

function renderLevelButtons() {
  el.levelSelect.innerHTML = "";

  for (const levelKey of Object.keys(LEVEL_META)) {
    const button = document.createElement("button");
    button.className = `pill-btn ${state.activeLevel === levelKey ? "active" : ""}`;
    button.textContent = LEVEL_META[levelKey].label;
    const unlocked = state.unlockedLevels.includes(levelKey);
    button.disabled = !unlocked;

    if (!unlocked) {
      button.textContent += ` (${LEVEL_META[levelKey].unlockScore} pts)`;
    }

    button.addEventListener("click", () => {
      if (!unlocked) {
        return;
      }

      state.activeLevel = levelKey;
      state.activeTopic = null;
      resetToIdleState();
      setFeedback(
        `Nivel ${LEVEL_META[levelKey].label} selecionado. Toque em Comecar Quiz para iniciar.`,
        "ok"
      );
    });

    el.levelSelect.appendChild(button);
  }
}

function setFeedback(message, type = "") {
  el.feedbackText.textContent = message;
  el.feedbackText.className = `feedback ${type}`.trim();
  el.feedbackText.style.whiteSpace = "pre-wrap";
}

function getSessionUser() {
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

function saveSessionUser() {
  localStorage.setItem(
    "musiversoUser",
    JSON.stringify({
      nickname: state.playerName,
      totalScore: state.totalScore,
      currentLevel: state.activeLevel,
    })
  );
}

function getProfilePhotoStorageKey() {
  const safeName = (state.playerName || "anon").toLowerCase();
  return `musiversoProfilePhoto_${safeName}`;
}

function setProfileImage(src = "") {
  el.profileImage.src = src || "";
  el.profileImage.style.display = src ? "block" : "none";
  el.profilePlaceholder.style.display = src ? "none" : "grid";
}

function loadProfileImage() {
  const stored = localStorage.getItem(getProfilePhotoStorageKey()) || "";
  setProfileImage(stored);
}

function saveProfileImage(dataUrl) {
  localStorage.setItem(getProfilePhotoStorageKey(), dataUrl);
  setProfileImage(dataUrl);
}

function getSeenStorageKey(level) {
  const safeName = (state.playerName || "anon").toLowerCase();
  return `musiversoSeen_${safeName}_${level}`;
}

function getRecentStorageKey(level) {
  const safeName = (state.playerName || "anon").toLowerCase();
  return `musiversoRecent_${safeName}_${level}`;
}

function loadSeenIds(level) {
  try {
    const raw = localStorage.getItem(getSeenStorageKey(level));
    if (!raw) return new Set();
    return new Set(JSON.parse(raw));
  } catch (_e) {
    return new Set();
  }
}

function saveSeenIds(level) {
  try {
    localStorage.setItem(
      getSeenStorageKey(level),
      JSON.stringify(Array.from(state.seenQuestionIdsByLevel[level] || []))
    );
  } catch (_e) {}
}

function clearSeenIds(level) {
  try {
    localStorage.removeItem(getSeenStorageKey(level));
  } catch (_e) {}
}

function loadRecentIds(level) {
  try {
    const raw = localStorage.getItem(getRecentStorageKey(level));
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map((item) => String(item)) : [];
  } catch (_e) {
    return [];
  }
}

function saveRecentIds(level) {
  try {
    const recent = Array.from(state.recentQuestionIdsByLevel?.[level] || []);
    localStorage.setItem(getRecentStorageKey(level), JSON.stringify(recent));
  } catch (_e) {}
}

function getRecentQueue(level) {
  if (!state.recentQuestionIdsByLevel) {
    state.recentQuestionIdsByLevel = {};
  }

  if (!Array.isArray(state.recentQuestionIdsByLevel[level])) {
    state.recentQuestionIdsByLevel[level] = [];
  }

  return state.recentQuestionIdsByLevel[level];
}

function recordSeenQuestion(level, questionId) {
  const safeId = String(questionId || "").trim();
  if (!safeId) {
    return;
  }

  const seenSet = getSeenSet(level);
  const queue = getRecentQueue(level);

  seenSet.add(safeId);

  const existingIndex = queue.indexOf(safeId);
  if (existingIndex >= 0) {
    queue.splice(existingIndex, 1);
  }

  queue.push(safeId);

  const cooldownSize = Math.max(LEVEL_META[level]?.roundSize || 10, (LEVEL_META[level]?.roundSize || 10) * RECENT_COOLDOWN_ROUNDS);
  while (queue.length > cooldownSize) {
    queue.shift();
  }

  saveSeenIds(level);
  saveRecentIds(level);
}

function getSeenSet(level) {
  if (!state.seenQuestionIdsByLevel[level]) {
    state.seenQuestionIdsByLevel[level] = new Set();
  }

  return state.seenQuestionIdsByLevel[level];
}

function normalizeQuestion(question) {
  return {
    id: question.id || Math.random().toString(36).slice(2),
    level: question.level || question.nivel,
    tema: question.tema || null,
    subtema: question.subtema || null,
    topico: question.topico || null,
    question: question.question || question.question_text || question.pergunta,
    options: question.options || question.opcoes,
    correctOption:
      typeof question.correctOption === "number"
        ? question.correctOption
        : typeof question.correct_option === "number"
          ? question.correct_option
          : question.resposta,
    explanation: question.explanation || "",
    explicacoes: question.explicacoes || [],
  };
}

async function getAutoCorrectionFeedback(question, selectedIndex) {
  const respostaUsuario = question?.options?.[selectedIndex];
  const respostaCorreta = question?.options?.[question.correctOption];

  if (!respostaUsuario || !respostaCorreta) {
    return null;
  }

  const payload = {
    question_id: question.id,
    pergunta: question.question,
    resposta_correta: respostaCorreta,
    resposta_usuario: respostaUsuario,
    indice_usuario: selectedIndex,
    indice_correto: question.correctOption,
    explicacoes: Array.isArray(question.explicacoes) ? question.explicacoes : [],
    nivel: question.level || state.activeLevel,
    tema: question.tema || (question.topico && question.topico.includes("harmonia") ? "harmonia" : null),
    subtema: question.subtema || null,
  };

  try {
    return await apiFetch("/api/v1/corrigir-resposta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (_error) {
    return null;
  }
}

async function loadQuestions(level) {
  try {
    const seenIds = Array.from(getSeenSet(level)).join(",");
    const topicParam = state.activeTopic ? `&topic=${encodeURIComponent(state.activeTopic)}` : "";
    const data = await apiFetch(
      `/api/questions?level=${level}&limit=${LEVEL_META[level].roundSize}&excludeIds=${encodeURIComponent(seenIds)}${topicParam}`
    );

    if (!Array.isArray(data.questions) || !data.questions.length) {
      // Quando o pool esgota, preserva um cooldown de perguntas recentes
      // para evitar repeticao imediata entre rodadas.
      const recent = getRecentQueue(level);
      const seenSet = getSeenSet(level);
      seenSet.clear();

      for (const id of recent) {
        seenSet.add(String(id));
      }

      if (!recent.length) {
        clearSeenIds(level);
      } else {
        saveSeenIds(level);
      }

      const retryData = await apiFetch(
        `/api/questions?level=${level}&limit=${LEVEL_META[level].roundSize}&excludeIds=${encodeURIComponent(Array.from(seenSet).join(","))}${topicParam}`
      );

      if (!Array.isArray(retryData.questions) || !retryData.questions.length) {
        throw new Error("Sem perguntas nesse nivel");
      }

      return retryData.questions.map(normalizeQuestion);
    }

    return data.questions.map(normalizeQuestion);
  } catch (_error) {
    const fallback = fallbackQuestions[level] || fallbackQuestions.facil;
    const copied = fallback.map((q) => normalizeQuestion(q));
    return copied.sort(() => Math.random() - 0.5);
  }
}

function renderCurrentQuestion() {
  const question = state.questions[state.questionIndex];
  state.hasAnsweredCurrent = false;

  if (!question) {
    autoFinishRound();
    return;
  }

  showStartCta(false);
  el.questionCounter.textContent = `Pergunta ${state.questionIndex + 1}/${state.questions.length}`;
  el.questionText.textContent = question.question;
  state.currentQuestionExplicacoes = question.explicacoes || [];
  el.answersWrap.innerHTML = "";

  question.options.forEach((optionText, index) => {
    const button = el.answerButtonTemplate.content.firstElementChild.cloneNode(true);
    button.textContent = optionText;
    button.addEventListener("click", () => handleAnswer(index));
    el.answersWrap.appendChild(button);
  });

  el.nextBtn.disabled = true;
  startQuestionTimer();
}

async function handleAnswer(selectedIndex) {
  const question = state.questions[state.questionIndex];
  if (!question || state.hasAnsweredCurrent) {
    return;
  }

  state.hasAnsweredCurrent = true;
  clearQuestionTimer();

  recordSeenQuestion(state.activeLevel, question.id);

  const buttons = Array.from(el.answersWrap.querySelectorAll(".answer-btn"));
  buttons.forEach((btn) => {
    btn.disabled = true;
  });

  const isCorrect = selectedIndex === question.correctOption;
  const bonus = Math.min(state.streak * 2, 10);
  const aiFeedback = await getAutoCorrectionFeedback(question, selectedIndex);

  if (isCorrect) {
    const gained = LEVEL_META[state.activeLevel].basePoints + bonus;
    state.totalScore += gained;
    state.roundScore += gained;
    state.roundCorrectAnswers += 1;
    state.streak += 1;
    state.roundBestStreak = Math.max(state.roundBestStreak, state.streak);
    buttons[selectedIndex].classList.add("correct");

    const feedback = (aiFeedback?.fonte === "banco" ? aiFeedback.explicacao : null)
      || state.currentQuestionExplicacoes[selectedIndex]
      || "Acertou!";
    setFeedback(`${feedback} +${gained} pontos`, "ok");
  } else {
    state.streak = 0;
    buttons[selectedIndex].classList.add("wrong");
    buttons[question.correctOption].classList.add("correct");

    const userFeedback = state.currentQuestionExplicacoes[selectedIndex] || "Ops! A resposta certa era destacada.";
    const correctFeedback = state.currentQuestionExplicacoes[question.correctOption] || "Esta era a resposta correta.";
    const finalMessage = (aiFeedback?.fonte === "banco" ? aiFeedback.explicacao : null)
      || `${userFeedback}\n${correctFeedback}`;
    setFeedback(finalMessage, "error");
  }

  updateUiStats();
  el.nextBtn.disabled = false;
}

async function autoFinishRound() {
  clearQuestionTimer();
  el.nextBtn.disabled = true;
  el.questionCounter.textContent = "Rodada concluida";
  el.questionText.textContent = "Calculando pontuacao...";
  el.answersWrap.innerHTML = "";
  state.secondsLeft = 0;
  updateTimeBar();
  await submitScore();
  await loadRanking();
  setFeedback(
    `Rodada finalizada! Voce marcou ${state.roundScore} pontos. Inicie outra rodada quando quiser.`,
    "ok"
  );
  resetToIdleState();
}

async function nextQuestion() {
  clearQuestionTimer();
  state.questionIndex += 1;
  setFeedback("");
  updateUiStats();
  if (state.questionIndex >= state.questions.length) {
    await autoFinishRound();
    return;
  }
  renderCurrentQuestion();
}

function resetToIdleState() {
  clearQuestionTimer();
  state.isRoundStarted = false;
  state.questions = [];
  state.questionIndex = 0;
  state.roundScore = 0;
  state.streak = 0;
  state.roundCorrectAnswers = 0;
  state.roundBestStreak = 0;
  state.currentTimeLimit = LEVEL_META[state.activeLevel]?.timeLimit || 10;
  state.secondsLeft = 0;

  showStartCta(true);
  el.questionCounter.textContent = "Pergunta 0/0";
  el.questionText.textContent = "Toque em Comecar Quiz para iniciar sua rodada.";
  el.answersWrap.innerHTML = "";
  el.nextBtn.disabled = true;
  updateUiStats();
}

async function startRound() {
  if (!state.playerName) {
    return;
  }

  setFeedback("Carregando perguntas...");
  state.isRoundStarted = true;

  state.questions = await loadQuestions(state.activeLevel);
  state.questionIndex = 0;
  state.roundScore = 0;
  state.streak = 0;
  state.roundCorrectAnswers = 0;
  state.roundBestStreak = 0;

  updateUiStats();
  setFeedback("");
  renderCurrentQuestion();
}

async function submitScore() {
  if (!state.playerName) {
    return;
  }

  try {
    const payload = {
      playerName: state.playerName,
      score: state.roundScore,
      level: state.activeLevel,
      totalQuestions: state.questions.length,
      correctAnswers: state.roundCorrectAnswers,
      bestStreak: state.roundBestStreak,
    };

    const data = await apiFetch("/api/submit-score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (data?.progress?.totalScore) {
      state.totalScore = data.progress.totalScore;
      saveSessionUser();
    }
  } catch (_error) {
    // O app continua funcional mesmo sem backend configurado.
  }
}

function renderRanking(entries, scope) {
  el.rankingList.innerHTML = "";

  if (!entries.length) {
    el.rankingList.innerHTML = "<li>Nenhum registro ainda.</li>";
    return;
  }

  entries.forEach((entry, index) => {
    const item = document.createElement("li");

    const score =
      scope === "overall"
        ? entry.total_score || entry.best_score || 0
        : entry.best_score || 0;

    item.innerHTML = `
      <span class="rank-index">${index + 1}</span>
      <div>
        <div class="rank-name">${entry.player_name || "Jogador"}</div>
        <small>${entry.highest_title || entry.level || "Musico"}</small>
      </div>
      <span class="rank-score">${score} pts</span>
    `;

    el.rankingList.appendChild(item);
  });
}

async function loadRanking() {
  try {
    const query = state.rankingScope === "overall" ? "" : `?level=${state.activeLevel}`;
    const data = await apiFetch(`/api/ranking${query}`);
    renderRanking(data.entries || [], state.rankingScope);
  } catch (_error) {
    renderRanking([], state.rankingScope);
  }
}

function wireEvents() {
  el.toggleHeaderBtn.addEventListener("click", () => {
    const collapsed = !el.quizHeader.classList.contains("collapsed");
    setHeaderCollapsed(collapsed);
  });

  el.startGameBtn.addEventListener("click", async () => {
    if (!state.authenticated || !state.playerName) {
      setFeedback("Faca login ou crie conta para jogar.", "error");
      return;
    }

    await startRound();
    await loadRanking();
  });

  el.logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("musiversoUser");
    window.location.href = "/auth.html";
  });

  el.profileInput.addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      if (!result) {
        setFeedback("Nao foi possivel carregar a imagem.", "error");
        return;
      }

      saveProfileImage(result);
      setFeedback("Foto de perfil atualizada!", "ok");
    };

    reader.onerror = () => {
      setFeedback("Falha ao ler a imagem.", "error");
    };

    reader.readAsDataURL(file);
    event.target.value = "";
  });

  el.nextBtn.addEventListener("click", nextQuestion);

  el.overallBtn.addEventListener("click", async () => {
    state.rankingScope = "overall";
    el.overallBtn.classList.add("active");
    el.byLevelBtn.classList.remove("active");
    await loadRanking();
  });

  el.byLevelBtn.addEventListener("click", async () => {
    state.rankingScope = "level";
    el.byLevelBtn.classList.add("active");
    el.overallBtn.classList.remove("active");
    await loadRanking();
  });
}

async function bootstrap() {
  const sessionUser = getSessionUser();

  if (!sessionUser?.nickname) {
    window.location.href = "/auth.html";
    return;
  }

  state.authenticated = true;
  state.playerName = sessionUser.nickname;
  state.totalScore = Number(sessionUser.totalScore) || 0;
  state.activeLevel = sessionUser.currentLevel || "facil";

  // Restaurar IDs de perguntas ja vistas de sessoes anteriores
  for (const level of Object.keys(LEVEL_META)) {
    state.seenQuestionIdsByLevel[level] = loadSeenIds(level);
    if (!state.recentQuestionIdsByLevel) {
      state.recentQuestionIdsByLevel = {};
    }
    state.recentQuestionIdsByLevel[level] = loadRecentIds(level);
  }

  const startCollapsed = window.matchMedia("(max-width: 640px)").matches;
  setHeaderCollapsed(startCollapsed);

  wireEvents();
  loadProfileImage();
  resetToIdleState();
  setFeedback(`Conta ativa: ${state.playerName}. Escolha um nivel e toque em Comecar Quiz.`, "ok");
  await loadRanking();
}

bootstrap();
