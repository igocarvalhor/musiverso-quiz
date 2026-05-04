# MUSIVERSO - INSTRUÇÕES DE SETUP DO BANCO

## 1. Executar o Schema no Supabase

1. Acesse: https://app.supabase.com
2. Abra seu projeto **musiverso-quiz**
3. Vá para **SQL Editor** (painel esquerdo)
4. Clique em **New Query**
5. **Cole o conteúdo completo** de `musiverso-schema.sql`
6. Clique em **Run**

Isso criará:
- 9 mundos (tabela `worlds`)
- Lições por mundo (tabela `lessons`)
- Sistema de progresso (tabela `player_progression`)
- Conquistas (tabelas `achievements`, `player_achievements`)
- Log de adaptabilidade (tabela `adaptivity_log`)
- Feedback da IA (tabela `ai_feedback`)

## 2. Configurar Variáveis de Ambiente

No Vercel:

1. Acesse seu projeto: https://vercel.com/igor-carvalhos-projects/musiverso-quiz
2. Vá para **Settings > Environment Variables**
3. Adicione (se não existir):
   ```
   SUPABASE_URL=https://seu-url.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=sua-chave-secreta
   OPENAI_API_KEY=sua-chave-openai (opcional, para IA)
   USE_AI_FEEDBACK=true (opcional)
   ```

## 3. Arquitetura Implementada

### 🌍 9 MUNDOS PROGRESSIVOS
1. **Fundamentos** - O que é música, som, pentagrama (0 XP para desbloquear)
2. **Leitura e Ritmo** - Compassos, síncope, claves (100 XP)
3. **Intervalos e Escalas** - Tons, escalas maior/menor (300 XP)
4. **Acordes** - Tríades, campo harmônico, tétrades (600 XP)
5. **Harmonia Funcional** - Tônica, subdominante, dominante (1000 XP)
6. **Progressões** - II–V–I, I–IV–V–I, ciclo de quintas (1500 XP)
7. **Cadências** - Perfeita, plagal, deceptiva, imperfeita (2000 XP)
8. **Análise Real** - Análise funcional, identificação, harmonia (2500 XP)
9. **Avançado** - Modulação, dominantes secundárias, modos (3000 XP)

### 🎮 SISTEMA DE JOGO

**XP e Tiers:**
- Acerto: +10 XP
- Erro: +3 XP
- **Iniciante**: 0-999 XP 🎵
- **Explorador**: 1000-1999 XP 🎶
- **Harmonicista**: 2000-2999 XP 🎼
- **Maestro**: 3000+ XP 👑

**Motor Adaptativo:**
- Rastreia acertos/erros por lição
- Aumenta dificuldade se: 90%+ acertos
- Diminui dificuldade se: <50% acertos
- Log completo em `adaptivity_log`

**IA Professor:**
- Feedback automático do OpenAI
- Explica conceitos quando erra
- Aprofunda quando acerta
- Conecta com prática musical real

## 4. ROTAS DA API

### GET /api/musiverso/worlds?player_id=UUID
Retorna 9 mundos com status de desbloqueio

### GET /api/musiverso/worlds/:worldId/lessons?player_id=UUID
Retorna lições de um mundo com progresso

### GET /api/musiverso/questions
Params:
- `lesson_id` - lição para carregar
- `player_id` - jogador para adaptação
- `count` - quantas perguntas (padrão: 5)

### POST /api/musiverso/answer
Body:
```json
{
  "player_id": "uuid",
  "lesson_id": "uuid",
  "question_id": 123,
  "user_answer": "1"
}
```

Retorna:
```json
{
  "correct": true,
  "xp_earned": 10,
  "total_xp": 150,
  "tier": "explorador",
  "ai_feedback": "excelente explicação..."
}
```

### GET /api/musiverso/player/:playerId/progress
Retorna progresso completo, conquistas, ranking

### GET /api/musiverso/leaderboard
Top 100 jogadores por XP

## 5. FLUXO DO USUÁRIO

```
1. Login (auth.html)
2. Tela de mundos (visão de grid com 9 mundos)
3. Tela de lições (dentro de um mundo)
4. Quiz com feedback IA
5. Ganho de XP e desbloqueio de próximo mundo
6. Progresso visível no ranking
```

## 6. DADOS NO LOCALSTORAGE

- `playerId` - UUID do jogador
- Resto sincronizado via API do Supabase

## 7. PRÓXIMOS PASSOS (Opcional)

### Conquistar com mais realismo:
- [ ] Adicionar som de acerto/erro
- [ ] Animações de desbloqueio de mundo
- [ ] Notificações push para streak
- [ ] Compartilhamento social
- [ ] Sistema de amigos/duelos

### IA Avançada:
- [ ] Gerar perguntas dinamicamente
- [ ] Análise de padrões de erro
- [ ] Recomendações de estudo

### Análise:
- [ ] Dashboard de estatísticas
- [ ] Heatmap de dificuldade
- [ ] Curva de aprendizado por tópico

## 8. TESTE RÁPIDO

```bash
# Verifique se as rotas estão funcionando:
curl https://musiverso-quiz.vercel.app/api/musiverso/worlds

# Deve retornar erro de permissão (pois sem player_id),
# mas a rota deve estar respondendo
```

## 💡 OBSERVAÇÕES

- O schema mantém compatibilidade com quiz antigo (tabelas antigas continuam)
- Você pode migrar as 267 perguntas existentes para os 9 mundos
- Sistema está pronto para escalar: adicione perguntas por topico/dificuldade

Qualquer dúvida, estou aqui! 🚀
