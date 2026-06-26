import { apiClient } from "../../../services/apiClient.js";
import { ragDocument } from "../data/ragDocument.js";

const fallbackSource = {
  sourceId: "Source 1",
  heading: "未命中明確來源",
  chunkId: "fallback",
  snippet: "目前文件沒有找到足夠相關的片段，系統會降低信心並避免把沒有來源的內容說成事實。",
  relevance: 0.32,
};

const playfulFallbackSnippet =
  "文件沒有記載這類主觀或玩笑題；系統以低信心幽默回覆，並提醒使用者回到可查證資訊。";

function getPlayfulFallback(question) {
  const normalized = question.toLowerCase();
  const asksAboutBoss = ["老闆", "店長", "闆娘"].some((keyword) => normalized.includes(keyword));
  const asksAboutLooks = ["帥", "漂亮", "可愛", "顏值", "好看"].some((keyword) =>
    normalized.includes(keyword),
  );

  if (asksAboutBoss && asksAboutLooks) {
    return {
      answer:
        "文件沒有記載老闆顏值，所以我不能把玩笑當成資料來源。不過如果以產品精神來看，願意把店家 FAQ 做成 AI 助手的人，帥點大概是加在解決問題的能力上。",
      snippet: playfulFallbackSnippet,
      trace: "mock 檢索沒有找到來源；偵測到展示型玩笑問題，因此以低信心幽默回覆並保留資料邊界。",
    };
  }

  if (["恐龍", "外星人", "飛碟", "魔法"].some((keyword) => normalized.includes(keyword))) {
    return {
      answer:
        "這題超出晴宇咖啡文件範圍。正式系統會回答不知道；展示版補一句：如果恐龍真的要訂位，可能要先確認門口高度和低消是不是一整片森林。",
      snippet: playfulFallbackSnippet,
      trace: "mock 檢索沒有找到來源；偵測到幻想型問題，因此用低信心幽默回覆示範防止幻覺。",
    };
  }

  return null;
}

function buildFallbackResponse(question) {
  const playfulFallback = getPlayfulFallback(question);
  const source = {
    ...fallbackSource,
    snippet: playfulFallback?.snippet ?? fallbackSource.snippet,
  };

  return {
    answer:
      playfulFallback?.answer ??
      "目前文件中找不到足夠可靠的答案。正式的文件檢索增強生成（RAG）系統應該請使用者補充問題，或回答不知道。",
    confidence: "low",
    sources: [source],
    citedSnippets: [source.snippet],
    retrievalTrace: playfulFallback?.trace ?? "mock 檢索沒有找到高相關文件片段。",
  };
}

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
    "chunk-location": "根據文件「地址」，晴宇咖啡位於台北市晴宇路 100 號，距離最近捷運站步行約 5 分鐘。",
    "chunk-booking": "根據文件「預約方式」，顧客可以透過 LINE 預約座位；若當日仍有空位，也可以接受當日預約。",
    "chunk-power": "根據文件「插座資訊」，窗邊座位與共用工作桌大多提供插座，需要長時間使用筆電時建議預約插座座位。",
    "chunk-minimum": "根據文件「低消規則」，每位顧客低消為一杯飲品或一份甜點，停留超過兩小時建議追加點餐。",
  };

  return (
    answerByChunk[primaryChunk.id] ??
    `文件中有和「${question}」相關的內容，但 mock 檢索只找到部分相符片段。`
  );
}

function mapApiResponse(payload) {
  return {
    answer: payload.answer,
    confidence: payload.confidence,
    sources: payload.sources.map((source) => ({
      sourceId: source.source_id,
      heading: source.heading,
      chunkId: source.chunk_id,
      snippet: source.snippet,
      relevance: source.relevance,
    })),
    citedSnippets: payload.cited_snippets,
    retrievalTrace: payload.retrieval_trace,
  };
}

async function askMock(question) {
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
    return buildFallbackResponse(trimmedQuestion);
  }

  const sources = rankedChunks.slice(0, 2).map((item, index) => ({
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
}

export const ragService = {
  async ask(question) {
    if (apiClient.enabled) {
      const payload = await apiClient.post("/rag/ask", {
        question,
        top_k: 2,
      });
      return mapApiResponse(payload);
    }

    return askMock(question);
  },
};
