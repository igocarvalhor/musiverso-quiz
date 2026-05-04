#!/usr/bin/env node
"use strict";

// Test the correction logic directly
function normalizarTexto(valor) {
  return String(valor || "").trim().toLowerCase();
}

function classificarErro(resposta) {
  const respostaUsuario = normalizarTexto(resposta.resposta_usuario);
  const respostaCorreta = normalizarTexto(resposta.resposta_correta);

  if (respostaUsuario === respostaCorreta) {
    return "acerto";
  }

  if (resposta.subtema === "funcao") {
    return "erro_funcao_harmonica";
  }

  if (resposta.subtema === "campo_harmonico") {
    return "erro_grau";
  }

  return "erro_geral";
}

function detectarPadraoErro(respostaUsuario, respostaCorreta) {
  const u = normalizarTexto(respostaUsuario);
  const c = normalizarTexto(respostaCorreta);

  // II vs V - Subdominante vs Dominante
  if (
    (u.includes("dominante") && (c.includes("subdominante") || c.includes("supertonica") || c === "ii" || c === "iv")) ||
    ((u === "v" || u === "dom") && (c === "ii" || c === "iv" || c.includes("subdominante"))) ||
    (c.includes("subdominante") && (u.includes("dominante") || u === "v"))
  ) {
    return "II_vs_V";
  }

  // VI vs I - Tonica relativa vs Tonica principal
  if (
    (u.includes("relativa") && c.includes("tonica") && !c.includes("relativa")) ||
    ((u === "vi" || u === "vi-") && (c === "i" || c.includes("tonica principal"))) ||
    ((u.includes("tonica") && !u.includes("relativa")) && (c === "vi" || c.includes("relativa")))
  ) {
    return "VI_vs_I";
  }

  // IV vs II - Subdominantes diferentes
  if (
    ((u.includes("iv") || u === "iv" || u.includes("subdominante"))) && 
    ((c.includes("ii") || c === "ii" || c.includes("supertonica")))
  ) {
    return "IV_vs_II";
  }

  // Tambem capaz de detectar o inverso
  if (
    ((c.includes("iv") || c === "iv" || c.includes("subdominante"))) && 
    ((u.includes("ii") || u === "ii" || u.includes("supertonica")))
  ) {
    return "IV_vs_II";
  }

  return null;
}

const errosComuns = {
  II_vs_V: {
    facil: "Subdominante (II) prepara a dominante. Dominante (V) cria tensao e quer resolver. Sao papeis muito diferentes!",
    medio: "O grau II (Supertonica) exerce funcao de predominante/subdominante. O grau V (Dominante) cria tensao que resolve na tonica.",
    dificil: "Subdominante (II em modo maior) apresenta um polo direcional para a dominante. Dominante (V) mantem a hierarquia tonal atraves da triton resolvendo para a tonica.",
  },
  VI_vs_I: {
    facil: "I e a tonica real. VI e a tonica relativa (seu parente proximo mas nao igual). I repousa, VI tem uma sensacao diferente.",
    medio: "Ambas sao tonicos em relacao menor/maior paralela, mas apenas I e a verdadeira tonica da tonalidade. VI pertence ao campo harmonico relativo.",
    dificil: "A tonica principal (I) e o ponto de repouso final na harmonia funcional. VI (relativa) pode agir como uma substituicao modal mas nao estabiliza o mesmo sistema tonal.",
  },
  IV_vs_II: {
    facil: "Tanto IV quanto II preparam a dominante, mas tem personalidades diferentes na musica.",
    medio: "Grade IV (Subdominante) e mais comum e estavel. Grau II (Supertonica) e uma alternativa de predominante com caracter diferente.",
    dificil: "IV oferece uma base subominante classica com qualidade maior. II fornece qualidade menor (em modo maior) criando uma cor harmonica alternativa na mesmo funcao.",
  },
};

function gerarExplicacao(resposta) {
  const erro = classificarErro(resposta);

  if (erro === "acerto") {
    return "Excelente! Sua resposta esta correta. Continue assim.";
  }

  const usuario = resposta.resposta_usuario || "";
  const correta = resposta.resposta_correta || "";
  const comparativa = [
    `Voce escolheu \"${usuario}\", mas o correto e \"${correta}\".`,
    "",
    "Por que esta diferenca importa:",
  ].join("\n");

  if (erro === "erro_funcao_harmonica") {
    return [
      comparativa,
      `- ${usuario}: funcao ou papel diferente no contexto da tonalidade`,
      `- ${correta}: o papel esperado nesta situacao harmonica`,
      "",
      "Dica: Lembre que cada grau da escala tem uma funcao tonal especifica (tonica, subdominante ou dominante). Conta os graus a partir da tonica!",
    ].join("\n");
  }

  if (erro === "erro_grau") {
    return [
      comparativa,
      `- ${usuario}: grau incorreto ou campo harmonico errado`,
      `- ${correta}: o grau ou campo harmonico correto`,
      "",
      "Reconte os graus a partir da tonica e verifique em qual tonalidade voce esta!",
    ].join("\n");
  }

  return [
    comparativa,
    `- Voce respondeu: ${usuario}`,
    `- Resposta correta: ${correta}`,
    "",
    "Revise o conceito e a explicacao da pergunta anterior.",
  ].join("\n");
}

function adaptarExplicacao(texto, nivel, padraoErro = null) {
  const safeNivel = normalizarTexto(nivel);
  
  let textoAdaptado = texto;

  if (safeNivel === "facil") {
    // Remover jargao tecnico e simplificar
    textoAdaptado = texto
      .replace(/funcao tonal especifica/gi, "papel na musica")
      .replace(/campo harmonico/gi, "grupo de acordes")
      .replace(/triton/gi, "intervalo especial")
      .replace(/hierarquia/gi, "ordem")
      .replace(/modal/gi, "de escala")
      .replace(/subdominante/gi, "que prepara")
      .replace(/dominante/gi, "que cria tensao");
  }

  if (safeNivel === "dificil") {
    // Adicionar contexto teorico avancado
    const finais = [
      "\n\nDetalhes avancados:",
      "- Analises funcionais dependem da hierarquia tonal (tonica → subdominante → dominante)",
      "- A conducao de vozes e a inversao do acorde tambem influenciam a percepcao funcional",
      "- Compare a sua resposta com a teoria de Riemann e Schoenberg",
    ];
    textoAdaptado = texto + "\n" + finais.join("\n");
  }

  return textoAdaptado;
}

function processarCorrectao(payload) {
  const resposta_correta = String(payload.resposta_correta || "").trim();
  const resposta_usuario = String(payload.resposta_usuario || "").trim();

  const tipoErro = classificarErro(payload);
  const acertou = tipoErro === "acerto";
  const padraoErro = acertou ? null : detectarPadraoErro(resposta_usuario, resposta_correta);
  const nivel = normalizarTexto(payload.nivel || "medio");

  let explicacaoBase = gerarExplicacao(payload);
  
  // Se detectou um padrao comum, usar explicacao especializada
  if (padraoErro && errosComuns[padraoErro]) {
    const explicacaoEspecializada = errosComuns[padraoErro][nivel] || errosComuns[padraoErro]["medio"];
    explicacaoBase = [
      `Voce escolheu \"${resposta_usuario}\", mas o correto e \"${resposta_correta}\".`,
      "",
      explicacaoEspecializada,
      "",
      "Dica: Estude a diferenca entre esses dois conceitos importantes em harmonia.",
    ].join("\n");
  }

  const explicacao = adaptarExplicacao(explicacaoBase, nivel, padraoErro);

  return {
    acertou,
    tipo_erro: tipoErro,
    explicacao,
    padrao: padraoErro,
  };
}

// Run tests
const tests = [
  {
    nome: "Dominante vs Subdominante (Facil)",
    data: {
      resposta_usuario: "Dominante",
      resposta_correta: "Subdominante",
      subtema: "funcao",
      nivel: "facil"
    }
  },
  {
    nome: "Dominante vs Subdominante (Dificil)",
    data: {
      resposta_usuario: "Dominante",
      resposta_correta: "Subdominante",
      subtema: "funcao",
      nivel: "dificil"
    }
  },
  {
    nome: "Tonica Relativa vs Tonica (Medio)",
    data: {
      resposta_usuario: "Tonica relativa",
      resposta_correta: "Tonica",
      subtema: "funcao",
      nivel: "medio"
    }
  },
  {
    nome: "Grau II vs Grau IV (Facil)",
    data: {
      resposta_usuario: "IV",
      resposta_correta: "II",
      subtema: "campo_harmonico",
      nivel: "facil"
    }
  }
];

console.log("\n========== TESTES DE CORRECAO ==========\n");

tests.forEach(test => {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`TESTE: ${test.nome}`);
  console.log('='.repeat(60));
  
  const resultado = processarCorrectao(test.data);
  
  console.log(`Pagrao Detectado: ${resultado.padrao || "Nenhum"}`);
  console.log(`Tipo de Erro: ${resultado.tipo_erro}`);
  console.log(`Acertou: ${resultado.acertou}`);
  console.log("\nExplicacao:\n");
  console.log(resultado.explicacao);
});

console.log("\n========== FIM TESTES ==========\n");
