import { qingyuCafeDocument } from "../data/ragDocument.js";

const delay = (ms = 720) => new Promise((resolve) => setTimeout(resolve, ms));

const tokenize = (text) =>
  text
    .toLowerCase()
    .replace(/[？?，,。.!！、]/g, " ")
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean);

function scoreChunk(question, chunk) {
  const normalizedQuestion = question.toLowerCase();
  const questionTokens = tokenize(question);
  const keywordScore = chunk.keywords.reduce((score, keyword) => {
    return normalizedQuestion.includes(keyword.toLowerCase()) ? score + 3 : score;
  }, 0);
  const contentScore = questionTokens.reduce((score, token) => {
    return `${chunk.heading} ${chunk.content}`.toLowerCase().includes(token) ? score + 1 : score;
  }, 0);
  return keywordScore + contentScore;
}

function retrieveRelevantChunks(question) {
  const scored = qingyuCafeDocument.chunks
    .map((chunk) => ({
      ...chunk,
      score: scoreChunk(question, chunk),
    }))
    .sort((a, b) => b.score - a.score);

  const matched = scored.filter((chunk) => chunk.score > 0);
  const fallback = scored.filter((chunk) => chunk.score === 0);
  return [...matched, ...fallback].slice(0, 2);
}

function buildAnswer(question, chunks) {
  const topics = chunks.map((chunk) => chunk.heading).join("、");
  const hasStrongMatch = chunks[0]?.score >= 3;

  if (!hasStrongMatch) {
    return {
      answer:
        `我在「${qingyuCafeDocument.title}」中沒有找到完全對應「${question}」的明確片段。` +
        `目前最接近的來源是 ${topics}，建議補充文件或新增 FAQ 後再回答。`,
      confidence: "low",
    };
  }

  return {
    answer:
      `根據「${qingyuCafeDocument.title}」的 ${topics} 片段，` +
      chunks.map((chunk) => chunk.content).join(" "),
    confidence: chunks.length >= 2 ? "high" : "medium",
  };
}

async function ask(question) {
  await delay();
  const retrievedChunks = retrieveRelevantChunks(question);
  const answerPayload = buildAnswer(question, retrievedChunks);

  return {
    question,
    answer: answerPayload.answer,
    confidence: answerPayload.confidence,
    document: {
      id: qingyuCafeDocument.id,
      title: qingyuCafeDocument.title,
    },
    sources: retrievedChunks.map((chunk) => ({
      id: chunk.id,
      sourceId: chunk.sourceId,
      heading: chunk.heading,
      snippet: chunk.content,
      score: chunk.score,
      fullText: `${chunk.heading}\n${chunk.content}`,
    })),
    citedSnippets: retrievedChunks.map((chunk) => ({
      sourceId: chunk.sourceId,
      text: chunk.content,
    })),
    retrievalTrace: {
      method: "mock keyword scoring",
      topK: retrievedChunks.length,
      note: "Replace this mock service with a FastAPI RAG endpoint later.",
    },
  };
}

export const ragService = {
  ask,
};
