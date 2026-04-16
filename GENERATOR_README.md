# 🎵 Musiverso Quiz - Question Generator

## IA Question Generator

Sistema para gerar perguntas de múltipla escolha automaticamente com feedback detalhado usando **OpenAI API**.

### Setup

1. **Obtenha uma chave OpenAI:**
   - Acesse https://platform.openai.com/api-keys
   - Crie uma chave de API
   - Copie para seu `.env`:
     ```env
     OPENAI_API_KEY=sk-...
     ```

2. **Instale as dependências:**
   ```bash
   npm install openai
   ```

### Uso

#### Opção 1: CLI (Script Local)

Gerar perguntas via terminal:

```bash
# Gerar 3 perguntas sobre Harmonia Funcional (fácil)
node generate-questions.js harmonia-funcional facil

# Gerar 5 perguntas sobre Teoria Musical (médio)
node generate-questions.js teoria-musical medio 5

# Gerar 2 perguntas sobre História da Música (difícil)
node generate-questions.js historia-da-musica dificil 2
```

**Tópicos disponíveis:**
- `harmonia-funcional` - Funções harmônicas, acordes, progressões
- `teoria-musical` - Escalas, intervalos, ritmo, notação
- `historia-da-musica` - Períodos, compositores, obras

**Níveis:**
- `facil` - Iniciantes (conceitos básicos)
- `medio` - Intermediários (conhecimento moderado)
- `dificil` - Avançados (análise complexa)

**Output:** Perguntas são salvas em `generated-questions.json` para revisar antes de adicionar ao banco.

#### Opção 2: HTTP API

Enviar requisição POST:

```bash
curl -X POST http://localhost:3000/api/generate-questions \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "harmonia-funcional",
    "level": "facil",
    "count": 3
  }'
```

**Parâmetros:**
- `topic` (string, obrigatório) - Um dos tópicos acima
- `level` (string, obrigatório) - Um dos níveis acima
- `count` (number, opcional) - Quantidade de perguntas (padrão: 3, máx: 10)

**Response:**
```json
{
  "success": true,
  "count": 3,
  "questions": [
    {
      "nivel": "facil",
      "topico": "harmonia-funcional",
      "pergunta": "O que é função harmônica?",
      "opcoes": ["...", "...", "...", "..."],
      "resposta": 1,
      "explicacoes": ["...", "...", "...", "..."],
      "ia_generated": true,
      "created_at": "2026-04-15T..."
    }
  ]
}
```

### Workflow Recomendado

1. **Gerar perguntas:**
   ```bash
   node generate-questions.js harmonia-funcional facil 5
   ```

2. **Revisar em `generated-questions.json`:**
   - Verificar qualidade das perguntas
   - Corrigir erros ou imprecisões

3. **Adicionar ao question-bank.js:**
   - Copiar as perguntas revisadas para `question-bank.js`
   - Ou use o script para adicionar automaticamente

4. **Versionar:**
   ```bash
   git add question-bank.js
   git commit -m "feat: adicionar perguntas geradas por IA sobre harmonia-funcional"
   git push origin main
   ```

### Formato das Perguntas

Cada pergunta gerada segue este formato:

```javascript
{
  nivel: "facil",              // facil, medio ou dificil
  topico: "harmonia-funcional", // topico do assunto
  pergunta: "Texto da pergunta?",
  opcoes: ["Opção A", "Opção B", "Opção C", "Opção D"],
  resposta: 1,                 // índice (0-3) da resposta correta
  explicacoes: [               // feedback para cada opção
    "Por que A está errada...",
    "Por que B está correta...",
    "Por que C está errada...",
    "Por que D está errada..."
  ],
  ia_generated: true,          // marca como gerada por IA
  created_at: "ISO timestamp"
}
```

### Dicas

- **Qualidade:** Quanto mais específico for o tópico, melhor a qualidade
- **Quantidade:** Gere em pequenos lotes (3-5) para revisar com calma
- **Feedback:** As explicações educacionais são importantes para aprendizado
- **Custo:** Cada geração usa tokens da OpenAI (modelo: gpt-4o-mini é econômico)

### Troubleshooting

**❌ "OPENAI_API_KEY não configurada"**
- Adicione a chave ao `.env`
- Restart o servidor

**❌ "Não foi possível extrair JSON"**
- A IA não respondeu com JSON válido
- Tente novamente (resposta aleatória)

**❌ "Tópico inválido"**
- Use um dos tópicos listados acima
- Verifique a digitação

### Próximos Passos

- [ ] Integração com UI (botão "Gerar Perguntas" no painel admin)
- [ ] Sistema de revisão em tempo real
- [ ] Salvar histórico de gerações
- [ ] Suportar tópicos customizados via naturl language

---

**Desenvolvido com ❤️ para Musiverso Quiz**
