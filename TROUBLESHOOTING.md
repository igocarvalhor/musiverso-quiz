# DIAGNÓSTICO MUSIVERSO - GUIA DE TROUBLESHOOTING

## Se a página não acessa corretamente, siga estes passos:

### PASSO 1: Abra o Console (F12)
1. Acesse: https://musiverso-quiz.vercel.app
2. Pressione **F12** para abrir Developer Tools
3. Vá para a aba **Console**

### PASSO 2: Verifique os logs
Você deve ver mensagens como:
```
[MusiversoApp] Inicializando... playerId: xxxxx
[MusiversoApp] Carregando dados do jogador...
[MusiversoApp] Mundos carregados: 9
[MusiversoApp] Renderizando visão de mundos...
[MusiversoApp] Inicialização concluída!
```

### PASSO 3: Identifique o problema

**Se vir:** `Nenhum jogador logado, redirecionando para auth.html`
- ✅ Normal se você não está logado
- Faça login primeiro em auth.html

**Se vir:** "Erro: Carregando dados do jogador... 404"
- ⚠️ Tabela de dados não existe
- **SOLUÇÃO:** Execute o musiverso-schema.sql no Supabase

**Se vir:** `#gamePanel não encontrado no DOM`
- ⚠️ HTML não tem a estrutura correta
- **SOLUÇÃO:** Verifique index.html tem `<div id="gamePanel">`

**Se vir:** `TypeError: Cannot read property 'forEach' of undefined`
- ⚠️ Worlds não carregou
- **SOLUÇÃO:** Verifique se a API GET /api/musiverso/worlds retorna dados

**Se não vir nada no console:**
- ⚠️ musiverso-app.js não foi carregado
- **SOLUÇÃO:** Limpe cache do navegador (Ctrl+Shift+Del)

---

## TESTE RÁPIDO DE API

No console do navegador, execute:

```javascript
// Teste 1: Mundos
fetch('/api/musiverso/worlds')
  .then(r => r.json())
  .then(data => console.log("Mundos:", data))
  .catch(e => console.error("Erro:", e))

// Teste 2: Sua conta
const playerId = localStorage.getItem('playerId');
if (playerId) {
  fetch(`/api/musiverso/player/${playerId}/progress`)
    .then(r => r.json())
    .then(data => console.log("Seu progresso:", data))
    .catch(e => console.error("Erro:", e))
} else {
  console.log("Não há playerID no localStorage")
}

// Teste 3: Lições do Mundo 1
const worldId = 'd1d3255a-aaa4-42f0-86da-4f012185c367'; // ID do mundo Fundamentos
fetch(`/api/musiverso/worlds/${worldId}/lessons?player_id=${playerId}`)
  .then(r => r.json())
  .then(data => console.log("Lições:", data))
  .catch(e => console.error("Erro:", e))
```

---

## SE AINDA NÃO FUNCIONAR

Possíveis causas:

### 1️⃣ Schema Supabase não foi executado
```sql
-- Verifique no SQL editor do Supabase:
SELECT * FROM public.worlds;
SELECT * FROM public.lessons;
```
Se retornar vazio ou erro 404, execute: `musiverso-schema.sql`

### 2️⃣ Questionários vazios
A tabela `lessons` pode ter lições mas sem questões na tabela `quiz_questions`:
```sql
-- Verifique quantas perguntas há:
SELECT COUNT(*) FROM public.quiz_questions;
```
Se retornar 0, você precisa popular as questões (ainda não implementado)

### 3️⃣ Problema de CORS
Se ver erro de CORS no console, o backend pode estar rejeitando a requisição:
```javascript
// Cheque headers no Network tab (F12):
console.log(document.location.origin) // deve ser https://musiverso-quiz.vercel.app
```

### 4️⃣ Conflito com app.js antigo
Se o app antigo ainda está carregado:
```javascript
// No console, verifique:
typeof GameApp // não deve existir
typeof MusiversoApp // deve ser 'function'
```

---

## SOLUÇÃO RÁPIDA

Se nada funcionar, faça isto:

1. **Limpar cache completo:**
   - Chrome/Edge: Ctrl+Shift+Del → Limpar tudo
   - Safari: Desenvolho → Empty Caches

2. **Feche e reabra a página**

3. **Desinstale a PWA** (se instalada):
   - Chrome: Menu → Apps → Musiverso → Desinstalar
   
4. **Reinstale o PWA** do zero

---

## QUANDO TUDO FUNCIONAR, VOCÊ VERÁ:

1. Login na página auth.html
2. Tela com 9 mundos em grid (🎵🎶🎼🎹🔗🔄⚡🔍👑)
3. Cada mundo mostra progresso (ex: 2/4 lições completadas)
4. Clique em "Entrar 🎯" para ver lições
5. Clique em "Iniciar" para fazer quiz

---

## RELATÓRIO PARA DEBUG

Se ainda tiver problema, copie e cole aqui o que aparece no console:

```
1. PlayerID: _______________
2. Mundos carregados: ______
3. Mensagem de erro: ________
4. Estado do gamePanel: _____
5. URLs testadas: __________
```

Pronto! Com este diagnóstico conseguiremos encontrar o problema!
