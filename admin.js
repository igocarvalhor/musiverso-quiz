const adminEl = {
  loginPanel: document.getElementById("adminLoginPanel"),
  dashboard: document.getElementById("adminDashboard"),
  username: document.getElementById("adminUsername"),
  password: document.getElementById("adminPassword"),
  loginBtn: document.getElementById("adminLoginBtn"),
  backBtn: document.getElementById("adminBackBtn"),
  status: document.getElementById("adminStatus"),
  refreshBtn: document.getElementById("adminRefreshBtn"),
  logoutBtn: document.getElementById("adminLogoutBtn"),
  usersBody: document.getElementById("adminUsersBody"),
  kpiUsers: document.getElementById("kpiUsers"),
  kpiSessions: document.getElementById("kpiSessions"),
  kpiActive7d: document.getElementById("kpiActive7d"),
  kpiAvg: document.getElementById("kpiAvg"),
  createNickname: document.getElementById("createNickname"),
  createPassword: document.getElementById("createPassword"),
  createScore: document.getElementById("createScore"),
  createUserBtn: document.getElementById("createUserBtn"),
};

const ADMIN_TOKEN_KEY = "musiversoAdminToken";

function setStatus(message, type = "") {
  adminEl.status.textContent = message;
  adminEl.status.className = `feedback ${type}`.trim();
}

function formatDate(dateString) {
  if (!dateString) {
    return "-";
  }

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleString("pt-BR");
}

function getToken() {
  return localStorage.getItem(ADMIN_TOKEN_KEY) || "";
}

function setToken(token) {
  if (!token) {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    return;
  }
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
}

function showDashboard(show) {
  adminEl.loginPanel.hidden = show;
  adminEl.dashboard.hidden = !show;
}

async function adminFetch(path, options = {}) {
  const token = getToken();
  const headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(path, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMessage = "Erro na requisicao";
    try {
      const payload = await response.json();
      errorMessage = payload.error || payload.details || errorMessage;
    } catch (_error) {}

    if (response.status === 401) {
      setToken("");
      showDashboard(false);
      throw new Error("Sessao admin expirada. Faca login novamente.");
    }

    throw new Error(errorMessage);
  }

  return response.json();
}

function renderUsers(users) {
  adminEl.usersBody.innerHTML = "";

  if (!Array.isArray(users) || !users.length) {
    adminEl.usersBody.innerHTML = '<tr><td colspan="7">Sem dados de usuarios.</td></tr>';
    return;
  }

  for (const user of users) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.nickname || "-"}</td>
      <td>${Number(user.totalScore || 0)}</td>
      <td>${user.currentLevel || "-"}</td>
      <td>${Number(user.sessions || 0)}</td>
      <td>${Number(user.bestScore || 0)}</td>
      <td>${formatDate(user.lastPlayedAt)}</td>
      <td>
        <div class="admin-user-actions" data-player-id="${user.playerId}">
          <input
            class="admin-delta-input"
            type="number"
            step="1"
            value="50"
            aria-label="Ajuste de pontos para ${user.nickname || "usuario"}"
          />
          <button class="secondary-btn admin-action-btn" data-action="add" type="button">+ pontos</button>
          <button class="secondary-btn admin-action-btn" data-action="remove" type="button">- pontos</button>
          <button class="secondary-btn admin-action-btn" data-action="reset-password" type="button">Resetar senha</button>
          <button class="secondary-btn admin-action-btn danger" data-action="delete" type="button">Excluir</button>
        </div>
      </td>
    `;
    adminEl.usersBody.appendChild(row);
  }
}

async function loadOverview() {
  setStatus("Carregando dados...", "");
  const payload = await adminFetch("/api/admin/overview");

  const summary = payload.summary || {};
  adminEl.kpiUsers.textContent = Number(summary.totalUsers || 0);
  adminEl.kpiSessions.textContent = Number(summary.totalSessions || 0);
  adminEl.kpiActive7d.textContent = Number(summary.activeUsersLast7Days || 0);
  adminEl.kpiAvg.textContent = Number(summary.averageSessionScore || 0);

  renderUsers(payload.users || []);
  setStatus(`Atualizado com sucesso: ${new Date().toLocaleTimeString("pt-BR")}`, "ok");
}

async function doLogin() {
  const username = adminEl.username.value.trim();
  const password = adminEl.password.value;

  if (!username || !password) {
    setStatus("Informe usuario e senha admin.", "error");
    return;
  }

  setStatus("Entrando...", "");

  const response = await fetch("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    let errorMessage = "Falha no login admin";
    try {
      const payload = await response.json();
      errorMessage = payload.error || payload.details || errorMessage;
    } catch (_error) {}
    throw new Error(errorMessage);
  }

  const data = await response.json();
  setToken(data.token || "");
  showDashboard(true);
  await loadOverview();
}

async function createUser() {
  const nickname = adminEl.createNickname.value.trim();
  const password = adminEl.createPassword.value;
  const initialScore = Number(adminEl.createScore.value || 0);

  if (!nickname || !password) {
    setStatus("Informe nickname e senha para criar o usuario.", "error");
    return;
  }

  await adminFetch("/api/admin/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nickname, password, initialScore }),
  });

  adminEl.createNickname.value = "";
  adminEl.createPassword.value = "";
  adminEl.createScore.value = "";
  setStatus("Usuario criado com sucesso.", "ok");
  await loadOverview();
}

async function adjustUserScore(playerId, delta) {
  await adminFetch(`/api/admin/users/${playerId}/score`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ delta }),
  });

  setStatus(`Pontuacao atualizada em ${delta > 0 ? "+" : ""}${delta}.`, "ok");
  await loadOverview();
}

async function removeUser(playerId) {
  await adminFetch(`/api/admin/users/${playerId}`, {
    method: "DELETE",
  });

  setStatus("Usuario removido com sucesso.", "ok");
  await loadOverview();
}

async function resetUserPassword(playerId, password) {
  await adminFetch(`/api/admin/users/${playerId}/password`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });

  setStatus("Senha redefinida com sucesso.", "ok");
}

function wireAdminEvents() {
  adminEl.loginBtn.addEventListener("click", async () => {
    try {
      await doLogin();
    } catch (error) {
      setStatus(error.message || "Falha no login admin", "error");
    }
  });

  adminEl.backBtn.addEventListener("click", () => {
    window.location.href = "/";
  });

  adminEl.refreshBtn.addEventListener("click", async () => {
    try {
      await loadOverview();
    } catch (error) {
      setStatus(error.message || "Erro ao atualizar dados", "error");
    }
  });

  adminEl.logoutBtn.addEventListener("click", () => {
    setToken("");
    showDashboard(false);
    setStatus("Sessao encerrada.", "ok");
  });

  adminEl.createUserBtn.addEventListener("click", async () => {
    try {
      await createUser();
    } catch (error) {
      setStatus(error.message || "Erro ao criar usuario", "error");
    }
  });

  adminEl.usersBody.addEventListener("click", async (event) => {
    const actionButton = event.target.closest("button[data-action]");
    if (!actionButton) {
      return;
    }

    const wrapper = actionButton.closest("[data-player-id]");
    const playerId = wrapper?.getAttribute("data-player-id") || "";
    const input = wrapper?.querySelector(".admin-delta-input");
    const baseValue = Math.abs(Number(input?.value || 0));

    try {
      if (actionButton.dataset.action === "delete") {
        const confirmed = window.confirm("Excluir este usuario e seus dados? Esta acao nao pode ser desfeita.");
        if (!confirmed) {
          return;
        }

        await removeUser(playerId);
        return;
      }

      if (actionButton.dataset.action === "reset-password") {
        const newPassword = window.prompt("Digite a nova senha (6 a 72 caracteres):", "");
        if (!newPassword) {
          return;
        }

        await resetUserPassword(playerId, newPassword);
        return;
      }

      if (!baseValue) {
        setStatus("Informe um valor de pontos maior que zero.", "error");
        return;
      }

      const delta = actionButton.dataset.action === "remove" ? -baseValue : baseValue;
      await adjustUserScore(playerId, delta);
    } catch (error) {
      setStatus(error.message || "Erro ao executar acao", "error");
    }
  });
}

async function bootstrapAdmin() {
  wireAdminEvents();

  const existingToken = getToken();
  if (!existingToken) {
    showDashboard(false);
    return;
  }

  showDashboard(true);
  try {
    await loadOverview();
  } catch (error) {
    setToken("");
    showDashboard(false);
    setStatus(error.message || "Sessao admin invalida.", "error");
  }
}

bootstrapAdmin();
