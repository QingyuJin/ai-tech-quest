import { ragDocument } from "../data/ragDocument.js";

const fallbackSource = {
  sourceId: "Source 1",
  heading: "未命中明確來源",
  chunkId: "fallback",
  snippet: "目前文件沒有找到足夠相關的片段，正式 RAG 系統應該回答不知道或請使用者補充問題。",
  relevance: 0.32,
};

function scoreChunk(question, chunk) {
  const normalized = question.toLowerCase();
  const tagScore = chunk.tags.reduce((score, tag) => {
    return normalized.includes(tag.toLowerCase()) ? score + 3 : score;
  }, 0);
  const headingTokens = chunk.heading.toLowerCase().split(/\s+/);
  const headingScore = headingTokens.reduce((score, token) => {
    return normalized.includes(token) ? score + 1 : score;
  }, 0);
  return tagScore + headingScore;
}

function buildAnswer(question, primaryChunk) {
  const answerByChunk = {
    "chunk-hours":
      "根據文件「營業時間」，晴宇咖啡平日營業時間為 10:00 到 20:00，週末與國定假日營業時間為 09:00 到 21:00。",
    "chunk-location":
      "根據文件「地址」，晴宇咖啡位於台北市晴宇路 100 號，距離最近捷運站步行約 5 分鐘。",
    "chunk-booking":
      "根據文件「預約方式」，顧客可以透過 LINE 預約座位；若當日仍有空位，也可以接受當日預約。",
    "chunk-power":
      "根據文件「插座資訊」，窗邊座位與共用工作桌大多提供插座，需要長時間使用筆電時建議預約插座座位。",
    "chunk-minimum":
      "根據文件「低消規則」，每位顧客低消為一杯飲品或一份甜點，停留超過兩小時建議追加點餐。",
  };

  return (
    answerByChunk[primaryChunk.id] ??
    `文件中有和「${question}」相關的內容，但 mock 檢索只找到部分相符片段。`
  );
}

export const ragService = {
  async ask(question) {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion) {
      throw new Error("請先輸入想詢問文件的問題。");
    }

    await new Promise((resolve) => {
      window.setTimeout(resolve, 650);
    });

    const rankedChunks = ragDocument.chunks
      .map((chunk) => ({
        chunk,
        score: scoreChunk(trimmedQuestion, chunk),
      }))
      .sort((a, b) => b.score - a.score);

    const matches = rankedChunks.filter((item) => item.score > 0);

    if (matches.length === 0) {
      return {
        answer:
          "目前文件中找不到足夠可靠的答案。正式的文件檢索增強生成（RAG）系統應該請使用者補充問題，或回答不知道。",
        confidence: "low",
        sources: [fallbackSource],
        citedSnippets: [fallbackSource.snippet],
        retrievalTrace: "mock 檢索沒有找到高相關文件片段。",
      };
    }

    const selectedSources = rankedChunks.slice(0, 2);
    const sources = selectedSources.map((item, index) => ({
      sourceId: `Source ${index + 1}`,
      heading: item.chunk.heading,
      chunkId: item.chunk.id,
      snippet: item.chunk.body,
      relevance: Math.min(0.97, 0.42 + item.score * 0.08),
    }));

    return {
      answer: buildAnswer(trimmedQuestion, matches[0].chunk),
      confidence: matches[0].score >= 3 ? "high" : "medium",
      sources,
      citedSnippets: sources.map((source) => source.snippet),
      retrievalTrace: `從「${ragDocument.title}」取回 ${sources.length} 個排序後的文件片段，主要回答依據最高相關來源。`,
    };
  },
};
