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
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 2);
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

export const businessService = {
  async getFaqs() {
    await wait(160);
    const faqs = readJson(FAQ_STORAGE_KEY, null);

    if (!faqs) {
      writeJson(FAQ_STORAGE_KEY, defaultFaqs);
      return defaultFaqs;
    }

    return faqs;
  },

  async addFaq(payload) {
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
  },

  async ask(question) {
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
      response = {
        answer:
          "目前找不到足夠可靠的 FAQ 配對。正式版應該建立待回覆任務，或在商業規則限制下交給 AI 助手處理。",
        confidence: "low",
        matchedFaq: null,
        matchedTags: [],
        action: "新增一筆 FAQ，或將問題交給店員確認後再回覆。",
      };
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

    const logs = readJson(LOG_STORAGE_KEY, []);
    writeJson(LOG_STORAGE_KEY, [createLogEntry(trimmedQuestion, response), ...logs].slice(0, 6));

    return response;
  },

  async getLogs() {
    await wait(120);
    return readJson(LOG_STORAGE_KEY, []);
  },
};
