import { apiClient } from "../../../services/apiClient.js";
import { defaultFaqs } from "../data/businessData.js";

const FAQ_STORAGE_KEY = "ai-business-assistant-faqs";
const LOG_STORAGE_KEY = "ai-business-assistant-question-logs";

function readJson(key, fallback) {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

function normalizeTags(tags) {
  if (Array.isArray(tags)) {
    return tags.map((tag) => tag.trim()).filter(Boolean);
  }

  return String(tags)
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 1);
}

function scoreFaq(question, faq) {
  const normalized = question.toLowerCase();
  const tagScore = faq.tags.reduce((score, tag) => {
    return normalized.includes(tag.toLowerCase()) ? score + 4 : score;
  }, 0);
  const questionTokens = tokenize(faq.question);
  const textScore = questionTokens.reduce((score, token) => {
    return normalized.includes(token) ? score + 1 : score;
  }, 0);

  return tagScore + textScore;
}

function getPlayfulFallback(question) {
  const normalized = question.toLowerCase();
  const asksAboutBoss = ["老闆", "店長", "闆娘"].some((keyword) => normalized.includes(keyword));
  const asksAboutLooks = ["帥", "漂亮", "可愛", "顏值", "好看"].some((keyword) =>
    normalized.includes(keyword),
  );

  if (asksAboutBoss && asksAboutLooks) {
    return {
      answer:
        "這題目前沒有命中正式 FAQ，所以不能當成店家承諾。不過展示版可以幽默回一下：老闆最帥的地方，大概是願意把重複問題交給 AI，讓店員少回一百次營業時間。",
      matchedTags: ["品牌語氣", "玩笑題"],
      action: "這類問題適合設計成品牌語氣彩蛋；正式上線前仍要由店家確認可用回覆。",
    };
  }

  if (["恐龍", "外星人", "飛碟", "魔法"].some((keyword) => normalized.includes(keyword))) {
    return {
      answer:
        "這題沒有命中 FAQ。正式版會建立待回覆任務；展示版先開個玩笑：如果外星人要預約，請先確認他們用不用 LINE，還是只收宇宙頻道通知。",
      matchedTags: ["品牌語氣", "待確認"],
      action: "把問題加入待回覆清單，店家確認後可新增成 FAQ 或品牌彩蛋。",
    };
  }

  return null;
}

function buildNoMatchResponse(question) {
  const playfulFallback = getPlayfulFallback(question);

  if (playfulFallback) {
    return {
      answer: playfulFallback.answer,
      confidence: "low",
      matchedFaq: null,
      matchedTags: playfulFallback.matchedTags,
      action: playfulFallback.action,
    };
  }

  return {
    answer: "目前找不到足夠可靠的 FAQ 配對。正式版應該建立待回覆任務，或在商業規則限制下交給 AI 助手處理。",
    confidence: "low",
    matchedFaq: null,
    matchedTags: [],
    action: "新增一筆 FAQ，或將問題交給店員確認後再回覆。",
  };
}

function createLogEntry(question, response) {
  return {
    id: `log-${Date.now()}`,
    question,
    answer: response.answer,
    confidence: response.confidence,
    matchedFaq: response.matchedFaq,
    createdAt: new Date().toISOString(),
  };
}

function wait(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function mapFaqFromApi(faq) {
  if (!faq) {
    return null;
  }

  return {
    id: faq.id,
    question: faq.question,
    answer: faq.answer,
    tags: faq.tags,
  };
}

function mapAskFromApi(payload) {
  return {
    answer: payload.answer,
    confidence: payload.confidence,
    matchedFaq: mapFaqFromApi(payload.matched_faq),
    matchedTags: payload.matched_tags,
    action: payload.action,
  };
}

function saveQuestionLog(question, response) {
  const logs = readJson(LOG_STORAGE_KEY, []);
  const nextLogs = [createLogEntry(question, response), ...logs].slice(0, 6);
  writeJson(LOG_STORAGE_KEY, nextLogs);
  return nextLogs;
}

async function getFaqsMock() {
  await wait(160);
  const faqs = readJson(FAQ_STORAGE_KEY, null);

  if (!faqs) {
    writeJson(FAQ_STORAGE_KEY, defaultFaqs);
    return defaultFaqs;
  }

  return faqs;
}

async function addFaqMock(payload) {
  await wait(220);

  if (!payload.question?.trim() || !payload.answer?.trim()) {
    throw new Error("請填寫問題與答案。");
  }

  const faqs = readJson(FAQ_STORAGE_KEY, defaultFaqs);
  const newFaq = {
    id: `faq-${Date.now()}`,
    question: payload.question.trim(),
    answer: payload.answer.trim(),
    tags: normalizeTags(payload.tags ?? ""),
  };
  const nextFaqs = [newFaq, ...faqs];
  writeJson(FAQ_STORAGE_KEY, nextFaqs);

  return newFaq;
}

async function askMock(question) {
  const trimmedQuestion = question.trim();

  if (!trimmedQuestion) {
    throw new Error("請輸入顧客問題。");
  }

  await wait(520);

  const faqs = readJson(FAQ_STORAGE_KEY, defaultFaqs);
  const ranked = faqs
    .map((faq) => ({ faq, score: scoreFaq(trimmedQuestion, faq) }))
    .sort((a, b) => b.score - a.score);
  const bestMatch = ranked[0];

  let response;

  if (!bestMatch || bestMatch.score === 0) {
    response = buildNoMatchResponse(trimmedQuestion);
  } else {
    response = {
      answer: bestMatch.faq.answer,
      confidence: bestMatch.score >= 4 ? "high" : "medium",
      matchedFaq: bestMatch.faq,
      matchedTags: bestMatch.faq.tags.filter((tag) =>
        trimmedQuestion.toLowerCase().includes(tag.toLowerCase()),
      ),
      action: "使用命中的 FAQ 自動回覆，並保存問題紀錄供店家分析。",
    };
  }

  saveQuestionLog(trimmedQuestion, response);
  return response;
}

export const businessService = {
  async getFaqs() {
    if (apiClient.enabled) {
      const faqs = await apiClient.get("/business/faqs");
      return faqs.map(mapFaqFromApi);
    }

    return getFaqsMock();
  },

  async addFaq(payload) {
    const normalizedPayload = {
      question: payload.question?.trim() ?? "",
      answer: payload.answer?.trim() ?? "",
      tags: normalizeTags(payload.tags ?? ""),
    };

    if (!normalizedPayload.question || !normalizedPayload.answer) {
      throw new Error("請填寫問題與答案。");
    }

    if (apiClient.enabled) {
      const faq = await apiClient.post("/business/faqs", normalizedPayload);
      return mapFaqFromApi(faq);
    }

    return addFaqMock(normalizedPayload);
  },

  async ask(question) {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion) {
      throw new Error("請輸入顧客問題。");
    }

    if (apiClient.enabled) {
      const payload = await apiClient.post("/business/ask", { question: trimmedQuestion });
      const response = mapAskFromApi(payload);
      saveQuestionLog(trimmedQuestion, response);
      return response;
    }

    return askMock(trimmedQuestion);
  },

  async getLogs() {
    await wait(120);
    return readJson(LOG_STORAGE_KEY, []);
  },
};
