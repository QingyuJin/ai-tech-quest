const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";
const SERVICE_MODE = import.meta.env.VITE_BUSINESS_SERVICE_MODE ?? "mock";

const delay = (ms = 520) => new Promise((resolve) => setTimeout(resolve, ms));

function normalize(text) {
  return text.trim().toLowerCase();
}

function scoreFaq(question, faq) {
  const normalizedQuestion = normalize(question);
  const tagScore = faq.tags.reduce((score, tag) => {
    return normalizedQuestion.includes(normalize(tag)) ? score + 3 : score;
  }, 0);
  const questionTokens = normalize(faq.question)
    .replace(/[？?，,。.!！、]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  const textScore = questionTokens.reduce((score, token) => {
    return normalizedQuestion.includes(token) ? score + 1 : score;
  }, 0);
  return tagScore + textScore;
}

function buildMockAnswer(question, faqs) {
  const ranked = faqs
    .map((faq) => ({ ...faq, score: scoreFaq(question, faq) }))
    .sort((a, b) => b.score - a.score);
  const matched = ranked[0];

  if (!matched || matched.score === 0) {
    return {
      answer: "目前 FAQ 沒有明確答案。建議店家新增這題，或未來交給 AI assistant fallback。",
      confidence: "low",
      matchedFaq: null,
      matchedTags: [],
      action: "新增 FAQ 或轉人工確認。",
    };
  }

  return {
    answer: matched.answer,
    confidence: matched.score >= 4 ? "high" : "medium",
    matchedFaq: {
      id: matched.id,
      question: matched.question,
      answer: matched.answer,
    },
    matchedTags: matched.tags.filter((tag) => normalize(question).includes(normalize(tag))),
    action: "命中 FAQ，可直接回覆顧客並記錄詢問主題。",
  };
}

async function mockAsk(question, faqs) {
  await delay();
  return buildMockAnswer(question, faqs);
}

async function apiAsk(question) {
  const response = await fetch(`${API_BASE_URL}/business/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });
  if (!response.ok) {
    throw new Error("Business ask API request failed.");
  }
  const data = await response.json();
  return {
    answer: data.answer,
    confidence: data.confidence,
    matchedFaq: data.matched_faq ?? data.matchedFaq ?? null,
    matchedTags: data.matched_tags ?? data.matchedTags ?? [],
    action: data.action,
  };
}

async function mockCreateFaq(payload) {
  await delay(220);
  return {
    id: `faq-${Date.now()}`,
    question: payload.question.trim(),
    answer: payload.answer.trim(),
    tags: payload.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
  };
}

async function apiCreateFaq(payload) {
  const response = await fetch(`${API_BASE_URL}/business/faqs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      question: payload.question,
      answer: payload.answer,
      tags: payload.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    }),
  });
  if (!response.ok) {
    throw new Error("Create FAQ API request failed.");
  }
  return response.json();
}

async function ask(question, faqs) {
  if (SERVICE_MODE === "api") {
    return apiAsk(question);
  }
  return mockAsk(question, faqs);
}

async function createFaq(payload) {
  if (SERVICE_MODE === "api") {
    return apiCreateFaq(payload);
  }
  return mockCreateFaq(payload);
}

export const businessService = {
  ask,
  createFaq,
  mode: SERVICE_MODE,
};
