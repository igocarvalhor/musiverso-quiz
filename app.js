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
  seenQuestionIdsByLevel: {
    facil: new Set(),
    medio: new Set(),
    dificil: new Set(),
  },
  rankingScope: "overall",
};

const LEVEL_META = {
  facil: { label: "Facil", basePoints: 10, unlockScore: 0, roundSize: 10 },
  medio: { label: "Medio", basePoints: 15, unlockScore: 500, roundSize: 10 },
  dificil: { label: "Dificil", basePoints: 20, unlockScore: 1000, roundSize: 10 },
};

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
  authNicknameInput: document.getElementById("authNickname"),
  authPasswordInput: document.getElementById("authPassword"),
  loginBtn: document.getElementById("loginBtn"),
  registerBtn: document.getElementById("registerBtn"),
  authStatus: document.getElementById("authStatus"),
  startGameBtn: document.getElementById("startGameBtn"),
  playerLabel: document.getElementById("playerLabel"),
  levelChip: document.getElementById("levelChip"),
  titleChip: document.getElementById("titleChip"),
  scoreValue: document.getElementById("scoreValue"),
  streakValue: document.getElementById("streakValue"),
  correctValue: document.getElementById("correctValue"),
  questionCounter: document.getElementById("questionCounter"),
  questionText: document.getElementById("questionText"),
  answersWrap: document.getElementById("answersWrap"),
  feedbackText: document.getElementById("feedbackText"),
  nextBtn: document.getElementById("nextBtn"),
  finishBtn: document.getElementById("finishBtn"),
  levelSelect: document.getElementById("levelSelect"),
  progressBar: document.getElementById("progressBar"),
  rankingList: document.getElementById("rankingList"),
  overallBtn: document.getElementById("overallBtn"),
  byLevelBtn: document.getElementById("byLevelBtn"),
  rankingHint: document.getElementById("rankingHint"),
  answerButtonTemplate: document.getElementById("answerButtonTemplate"),
};

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
  el.levelChip.textContent = `Nivel: ${LEVEL_META[state.activeLevel].label}`;
  el.titleChip.textContent = getTitleByScore(state.totalScore);
  el.scoreValue.textContent = state.roundScore;
  el.streakValue.textContent = state.streak;
  el.correctValue.textContent = state.roundCorrectAnswers;

  const total = state.questions.length || 1;
  const progress = (state.questionIndex / total) * 100;
  el.progressBar.style.width = `${Math.min(progress, 100)}%`;

  renderLevelButtons();
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
      startRound();
    });

    el.levelSelect.appendChild(button);
  }
}

function setFeedback(message, type = "") {
  el.feedbackText.textContent = message;
  el.feedbackText.className = `feedback ${type}`.trim();
}

function setAuthStatus(message, type = "") {
  el.authStatus.textContent = message;
  el.authStatus.className = `feedback ${type}`.trim();
}

function setAuthEnabled(enabled) {
  el.authNicknameInput.disabled = !enabled;
  el.authPasswordInput.disabled = !enabled;
  el.loginBtn.disabled = !enabled;
  el.registerBtn.disabled = !enabled;
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
    question: question.question || question.question_text || question.pergunta,
    options: question.options || question.opcoes,
    correctOption:
      typeof question.correctOption === "number"
        ? question.correctOption
        : typeof question.correct_option === "number"
          ? question.correct_option
          : question.resposta,
    explanation: question.explanation || "",
  };
}

async function loadQuestions(level) {
  try {
    const seenIds = Array.from(getSeenSet(level)).join(",");
    const data = await apiFetch(
      `/api/questions?level=${level}&limit=${LEVEL_META[level].roundSize}&excludeIds=${encodeURIComponent(seenIds)}`
    );

    if (!Array.isArray(data.questions) || !data.questions.length) {
      // Quando o nivel acaba, reinicia o pool daquele nivel para manter jogabilidade.
      getSeenSet(level).clear();
      const retryData = await apiFetch(
        `/api/questions?level=${level}&limit=${LEVEL_META[level].roundSize}`
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

  if (!question) {
    el.questionCounter.textContent = "Rodada concluida";
    el.questionText.textContent = "Parabens! Finalize a rodada para salvar sua pontuacao.";
    el.answersWrap.innerHTML = "";
    el.nextBtn.disabled = true;
    el.finishBtn.disabled = false;
    return;
  }

  el.questionCounter.textContent = `Pergunta ${state.questionIndex + 1}/${state.questions.length}`;
  el.questionText.textContent = question.question;
  el.answersWrap.innerHTML = "";

  question.options.forEach((optionText, index) => {
    const button = el.answerButtonTemplate.content.firstElementChild.cloneNode(true);
    button.textContent = optionText;
    button.addEventListener("click", () => handleAnswer(index));
    el.answersWrap.appendChild(button);
  });

  el.nextBtn.disabled = true;
  el.finishBtn.disabled = true;
}

function handleAnswer(selectedIndex) {
  const question = state.questions[state.questionIndex];
  if (!question) {
    return;
  }

  getSeenSet(state.activeLevel).add(String(question.id));

  const buttons = Array.from(el.answersWrap.querySelectorAll(".answer-btn"));
  buttons.forEach((btn) => {
    btn.disabled = true;
  });

  const isCorrect = selectedIndex === question.correctOption;
  const bonus = Math.min(state.streak * 2, 10);

  if (isCorrect) {
    const gained = LEVEL_META[state.activeLevel].basePoints + bonus;
    state.totalScore += gained;
    state.roundScore += gained;
    state.roundCorrectAnswers += 1;
    state.streak += 1;
    state.roundBestStreak = Math.max(state.roundBestStreak, state.streak);
    buttons[selectedIndex].classList.add("correct");
    setFeedback(`Acertou! +${gained} pontos`, "ok");
  } else {
    state.streak = 0;
    buttons[selectedIndex].classList.add("wrong");
    buttons[question.correctOption].classList.add("correct");
    const reason = question.explanation ? ` ${question.explanation}` : "";
    setFeedback(`Ops! A resposta certa era destacada.${reason}`, "error");
  }

  updateUiStats();
  el.nextBtn.disabled = false;
  el.finishBtn.disabled = false;
}

function nextQuestion() {
  state.questionIndex += 1;
  setFeedback("");
  updateUiStats();
  renderCurrentQuestion();
}

async function startRound() {
  if (!state.playerName) {
    return;
  }

  setFeedback("Carregando perguntas...");

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
  async function handleAuth(mode) {
    const nickname = el.authNicknameInput.value.trim();
    const password = el.authPasswordInput.value;

    if (!nickname || !password) {
      setAuthStatus("Informe nickname e senha.", "error");
      return;
    }

    setAuthEnabled(false);
    setAuthStatus(mode === "login" ? "Entrando..." : "Criando conta...");

    try {
      const response = await apiFetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname, password }),
      });

      state.authenticated = true;
      state.playerName = response.user.nickname;
      state.totalScore = response.user.totalScore || 0;
      state.activeLevel = response.user.currentLevel || "facil";
      updateUiStats();
      setAuthStatus(`Conta ativa: ${state.playerName}`, "ok");
      setFeedback("Login realizado! Clique em Comecar para iniciar.", "ok");
      el.authPasswordInput.value = "";
    } catch (error) {
      setAuthStatus(error.message || "Falha na autenticacao.", "error");
      state.authenticated = false;
    } finally {
      if (!state.authenticated) {
        setAuthEnabled(true);
      }
    }
  }

  el.loginBtn.addEventListener("click", async () => {
    await handleAuth("login");
  });

  el.registerBtn.addEventListener("click", async () => {
    await handleAuth("register");
  });

  el.startGameBtn.addEventListener("click", async () => {
    if (!state.authenticated || !state.playerName) {
      setFeedback("Faca login ou crie conta para jogar.", "error");
      return;
    }

    state.roundScore = 0;
    state.roundCorrectAnswers = 0;
    state.roundBestStreak = 0;
    state.seenQuestionIdsByLevel = {
      facil: new Set(),
      medio: new Set(),
      dificil: new Set(),
    };

    updateUiStats();
    await startRound();
    await loadRanking();
  });

  el.nextBtn.addEventListener("click", nextQuestion);

  el.finishBtn.addEventListener("click", async () => {
    await submitScore();
    await loadRanking();
    setFeedback("Pontuacao salva! Inicie outra rodada quando quiser.", "ok");
    await startRound();
  });

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
  wireEvents();
  updateUiStats();
  await loadRanking();
}

bootstrap();
