#!/usr/bin/env node

/**
 * ✨ QUICK START - Gerador de Perguntas com IA
 * 
 * Este script demonstra como usar o gerador de perguntas automaticamente.
 * 
 * SETUP NECESSÁRIO:
 * 1. Obtenha uma chave OpenAI: https://platform.openai.com/api-keys
 * 2. Adicione ao .env: OPENAI_API_KEY=sk-...
 * 3. execute: npm install openai
 */

console.log(`
╔═══════════════════════════════════════════════════════════════╗
║         🎵 MUSIVERSO - QUESTION GENERATOR SETUP              ║
╚═══════════════════════════════════════════════════════════════╝

📌 PASSO 1: Obter Chave OpenAI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Acesse: https://platform.openai.com/api-keys
2. Clique "Create new secret key"
3. Copie a chave gerada (ex: sk-...)

📌 PASSO 2: Configurar Arquivo .env
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Abra o arquivo .env e adicione:
OPENAI_API_KEY=sk-sua-chave-aqui

📌 PASSO 3: Instalar Dependências
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Execute no terminal:
$ npm install openai

✅ PRONTO! Agora você pode:

🔹 USAR VIA CLI (Terminal)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Gerar 3 perguntas sobre Harmonia Funcional (fácil)
$ node generate-questions.js harmonia-funcional facil

# Gerar 5 perguntas sobre Teoria Musical (médio)
$ node generate-questions.js teoria-musical medio 5

# Gerar 2 perguntas sobre História da Música (difícil)
$ node generate-questions.js historia-da-musica dificil 2

Resultado: Arquivo generated-questions-[timestamp].json é criado

🔹 USAR VIA HTTP (API)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
$ curl -X POST http://localhost:3000/api/generate-questions \\
  -H "Content-Type: application/json" \\
  -d '{
    "topic": "harmonia-funcional",
    "level": "facil",
    "count": 3
  }'

Resultado: JSON com as perguntas geradas


📚 TÓPICOS DISPONÍVEIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• harmonia-funcional
  → Funções harmônicas, acordes, progressões
  
• teoria-musical
  → Escalas, intervalos, ritmo, notação
  
• historia-da-musica
  → Períodos, compositores, obras

⚡ NÍVEIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• facil     → Iniciantes (conceitos básicos)
• medio     → Intermediários (moderado)
• dificil   → Avançados (análise complexa)

🔄 WORKFLOW COMPLETO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1️⃣  Gerar perguntas:
    $ node generate-questions.js harmonia-funcional facil 5

2️⃣  Revisar em generated-questions-[timestamp].json
    (Abra em um editor e verifique qualidade)

3️⃣  Copiar para question-bank.js
    (Se estiver satisfeito, copie as perguntas)

4️⃣  Versionar e fazer deploy:
    $ git add question-bank.js
    $ git commit -m "feat: adicionar perguntas de harmonia"
    $ git push origin main

📝 EXEMPLO DE PERGUNTA GERADA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{
  "nivel": "facil",
  "topico": "harmonia-funcional",
  "pergunta": "O que é função harmônica?",
  "opcoes": [
    "Função que define a intensidade",
    "Função que define o papel do acorde na tonalidade",
    "Função que define a velocidade",
    "Função que define o timbre"
  ],
  "resposta": 1,
  "explicacoes": [
    "Incorreto. Intensidade está ligada à dinâmica.",
    "Correto. Define o papel do acorde na tonalidade.",
    "Incorreto. Velocidade está ligada ao andamento.",
    "Incorreto. Timbre é a característica do som."
  ],
  "ia_generated": true,
  "created_at": "2026-04-15T..."
}

💡 DICAS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Gere em pequenos lotes (3-5) para revisar com qualidade
✓ As explicações são cruciais para aprendizado
✓ Verifique se as perguntas não se repetem com as existentes
✓ Customize as perguntas se necessário após geração

🚀 PRÓXIMOS PASSOS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Após configurar:
1. Gere perguntas de teste
2. Revise-as cuidadosamente
3. Integre ao question-bank.js
4. Faça deploy
5. Monitore a qualidade das perguntas no app

📖 Veja GENERATOR_README.md para documentação completa!

═══════════════════════════════════════════════════════════════════
Desenvolvido com ❤️ para Musiverso Quiz
═══════════════════════════════════════════════════════════════════
`);
