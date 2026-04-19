const el = {
  authNicknameInput: document.getElementById("authNickname"),
  authPasswordInput: document.getElementById("authPassword"),
  loginBtn: document.getElementById("loginBtn"),
  registerBtn: document.getElementById("registerBtn"),
  authStatus: document.getElementById("authStatus"),
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

function saveSession(user) {
  localStorage.setItem("musiversoUser", JSON.stringify(user));
  if (user.id) {
    localStorage.setItem("playerId", user.id);
  }
}

function getSession() {
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

    saveSession({
      nickname: response.user.nickname,
      totalScore: response.user.totalScore || 0,
      currentLevel: response.user.currentLevel || "facil",
    });

    window.location.href = "/";
  } catch (error) {
    setAuthStatus(error.message || "Falha na autenticacao.", "error");
    setAuthEnabled(true);
  }
}

function bootstrap() {
  const existingSession = getSession();
  if (existingSession?.nickname) {
    window.location.href = "/";
    return;
  }

  el.loginBtn.addEventListener("click", async () => {
    await handleAuth("login");
  });

  el.registerBtn.addEventListener("click", async () => {
    await handleAuth("register");
  });
}

bootstrap();
