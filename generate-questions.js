#!/usr/bin/env node

const OpenAI = require("openai");
const fs = require("fs");
const path = require("path");

// Configurar cliente OpenAI
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error("❌ OPENAI_API_KEY não configurada em .env");
  process.exit(1);
}

const client = new OpenAI({ apiKey });

// Tópicos disponíveis
const TOPICS = {
  "harmonia-funcional": "Harmonia Funcional (Funções harmônicas, acordes, progressões)",
  "teoria-musical": "Teoria Musical (Escalas, intervalos, ritmo, notação)",
  "historia-da-musica": "História da Música (Períodos, compositores, obras)",
};

// Níveis de dificuldade
const LEVELS = ["facil", "medio", "dificil"];

// Prompt base para gerar perguntas
const generatePrompt = (topic, level, count = 3) => {
  const topicDesc = TOPICS[topic] || topic;
  const levelDesc =
    level === "facil"
      ? "iniciantes (conceitos básicos, sem termos muito complexos)"
      : level === "medio"
        ? "intermediários (conhecimento moderado, alguns termos técnicos)"
        : "avançados (conceitos complexos, análise detalhada)";

  return `Você é um professor de música especializado. Gere exatamente ${count} perguntas de múltipla escolha sobre "${topicDesc}" para alunos ${levelDesc}.

IMPORTANTE: Responda APENAS com um JSON válido, sem texto adicional. Use exatamente este formato:

\`\`\`json
{
  "questions": [
    {
      "pergunta": "Pergunta em português (clara e objetiva)",
      "opcoes": ["Opção A", "Opção B", "Opção C", "Opção D"],
      "resposta": 0,
      "explicacoes": [
        "Por que A está incorreta (ou correta se for)",
        "Por que B está incorreta (ou correta se for)",
        "Por que C está incorreta (ou correta se for)",  
        "Por que D está incorreta (ou correta se for)"
      ]
    }
  ]
}
\`\`\`

Requisitos:
- Sempre 4 opções por pergunta
- Resposta é índice (0-3) da opção correta
- Explicações educacionais em português
- As perguntas devem ser variadas (não repetir conteúdo)
- Incluir exemplos práticos quando apropriado
- Nível ${level}: ${level === "facil" ? "foco em definições e conceitos básicos" : level === "medio" ? "foco em aplicação e relação entre conceitos" : "foco em análise crítica e síntese"}`;
};

// Função para gerar perguntas com OpenAI
async function generateQuestions(topic, level, count = 3) {
  if (!TOPICS[topic]) {
    throw new Error(
      `Tópico inválido: ${topic}. Use: ${Object.keys(TOPICS).join(", ")}`
    );
  }

  if (!LEVELS.includes(level)) {
    throw new Error(`Nível inválido: ${level}. Use: ${LEVELS.join(", ")}`);
  }

  console.log(
    `\n🎵 Gerando ${count} perguntas de ${TOPICS[topic]} (nível: ${level})...\n`
  );

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 4000,
      messages: [
        {
          role: "user",
          content: generatePrompt(topic, level, count),
        },
      ],
    });

    const content = response.choices[0].message.content;
    
    // Extrair JSON da resposta
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Não foi possível extrair JSON da resposta da IA");
    }

    const data = JSON.parse(jsonMatch[0]);
    
    // Validar estrutura
    if (!data.questions || !Array.isArray(data.questions)) {
      throw new Error("Resposta inválida: 'questions' não é um array");
    }

    // Adicionar campos de tópico e nível
    const enrichedQuestions = data.questions.map((q) => ({
      nivel: level,
      topico: topic,
      pergunta: q.pergunta,
      opcoes: q.opcoes,
      resposta: q.resposta,
      explicacoes: q.explicacoes,
      ia_generated: true,
      created_at: new Date().toISOString(),
    }));

    return enrichedQuestions;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error(`Erro ao fazer parse do JSON: ${error.message}`);
    }
    throw error;
  }
}

// Função para salvar perguntas em JSON
function saveQuestionsToJSON(questions) {
  const filename = `generated-questions-${Date.now()}.json`;
  const filePath = path.join(__dirname, filename);
  
  fs.writeFileSync(filePath, JSON.stringify(questions, null, 2), "utf-8");
  return filename;
}

// Função principal (CLI)
async function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log(`
📚 Gerador de Perguntas com IA - CLI

Uso: node generate-questions.js <topico> <nivel> [quantidade]

Tópicos disponíveis:
${Object.entries(TOPICS)
  .map(([key, desc]) => `  - ${key}: ${desc}`)
  .join("\n")}

Níveis: ${LEVELS.join(", ")}

Exemplos:
  node generate-questions.js harmonia-funcional facil 5
  node generate-questions.js teoria-musical medio 3
`);
    process.exit(0);
  }

  const topic = args[0];
  const level = args[1];
  const count = parseInt(args[2]) || 3;

  try {
    const questions = await generateQuestions(topic, level, count);

    console.log(`✅ ${questions.length} perguntas geradas com sucesso!\n`);
    console.log("Amostra da primeira pergunta:");
    console.log(JSON.stringify(questions[0], null, 2));

    // Salvar em JSON para revisão
    const filename = saveQuestionsToJSON(questions);
    console.log(`\n✨ Perguntas salvas em: ${filename}`);
    console.log(`\nProximes passos:`);
    console.log(`  1. Revisar as perguntas em ${filename}`);
    console.log(`  2. Copiar as perguntas validadas para question-bank.js`);
    console.log(`  3. git add question-bank.js`);
    console.log(`  4. git commit -m "feat: adicionar perguntas geradas por IA"`);
    console.log(`  5. git push origin main`);
  } catch (error) {
    console.error(`❌ Erro: ${error.message}`);
    process.exit(1);
  }
}

main();
