/**
 * DEBUG CONSOLE PARA MUSIVERSO
 * Adicione este script ao index.html temporariamente para diagnosticar o problema
 * 
 * Abra: F12 → Console para ver o diagnóstico
 */

console.log("=== MUSIVERSO DEBUG ===");

// 1. Verificar se DOM está carregado
console.log("Document ready state:", document.readyState);
console.log("DOM carregado:", !!document.getElementById("gamePanel"));

// 2. Verificar localStorage
console.log("PlayerID no localStorage:", localStorage.getItem("playerId"));

// 3. Verificar se musiverso-app.js foi carregado
console.log("MusiversoApp definida:", typeof MusiversoApp);
console.log("window.musiversoApp existe:", !!window.musiversoApp);

// 4. Testar API
async function testAPI() {
  console.log("\n=== TESTE DE API ===");
  
  try {
    // Teste 1: Mundos
    const worldsResponse = await fetch("/api/musiverso/worlds");
    console.log("GET /api/musiverso/worlds:", worldsResponse.status);
    const worlds = await worldsResponse.json();
    console.log("Mundos retornados:", worlds.length);
    
    // Teste 2: Verificar Supabase
    const playerId = localStorage.getItem("playerId");
    if (playerId) {
      const progressResponse = await fetch(`/api/musiverso/player/${playerId}/progress`);
      console.log(`GET /api/musiverso/player/${playerId}/progress:`, progressResponse.status);
      const progress = await progressResponse.json();
      console.log("Progresso do jogador:", progress);
    } else {
      console.warn("Nenhum playerId encontrado - usuário não autenticado");
    }
  } catch (error) {
    console.error("Erro na API:", error);
  }
}

// 5. Verificar renderização
console.log("\n=== VERIFICAÇÃO DE RENDERIZAÇÃO ===");
console.log("Container #gamePanel existe:", !!document.getElementById("gamePanel"));
if (window.musiversoApp) {
  console.log("App currentView:", window.musiversoApp.currentView);
  console.log("App worlds:", window.musiversoApp.worlds.length);
  console.log("App playerData:", window.musiversoApp.playerData);
}

// Executar testes quando clicar no console
document.addEventListener("click", () => {
  console.log("testAPI() ejecutando...");
  testAPI();
});

console.log("\n💡 Clique em qualquer lugar da página para executar testAPI()");
console.log("=== FIM DO DEBUG ===\n");
