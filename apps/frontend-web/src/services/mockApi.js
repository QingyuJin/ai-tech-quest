import { mlDataset, ragDocuments } from "../data/missions.js";

const wait = (ms = 450) => new Promise((resolve) => setTimeout(resolve, ms));

const normalize = (text) => text.trim().toLowerCase();

export async function askRagQuestion({ documentId, question }) {
  await wait();

  const document = ragDocuments.find((item) => item.id === documentId) ?? ragDocuments[0];
  const normalizedQuestion = normalize(question);
  const matchedSections = document.sections.filter((section) => {
    const haystack = normalize(`${section.title} ${section.content}`);
    return normalizedQuestion
      .split(/\s+|，|。|\?|？/)
      .filter((token) => token.length > 1)
      .some((token) => haystack.includes(token));
  });

  const citations = matchedSections.length > 0 ? matchedSections : document.sections.slice(0, 2);
  const answer = buildRagAnswer(document, question, citations);

  return {
    documentTitle: document.title,
    answer,
    citations: citations.map((section) => ({
      sourceId: section.sourceId,
      title: section.title,
      excerpt: section.content,
    })),
    confidence: citations.length >= 2 ? "high" : "medium",
  };
}

function buildRagAnswer(document, question, citations) {
  if (document.id === "qingyu-cafe") {
    return `根據「${document.title}」，這份資料可回答店家營業時間、地址、預約方式與座位資訊。針對「${question}」，目前最相關的是 ${citations
      .map((section) => section.title)
      .join("、")}。`;
  }

  return `根據「${document.title}」，這份技術文件重點在評測 RAG 回答是否可信。針對「${question}」，建議先檢查 ${citations
    .map((section) => section.title)
    .join("、")}。`;
}

export async function predictMlLabels({ selections }) {
  await wait();

  const rows = mlDataset.map((point) => {
    const selectedLabel = selections[point.id] ?? "未選";
    return {
      ...point,
      selectedLabel,
      isCorrect: selectedLabel === point.modelLabel,
    };
  });

  const correctCount = rows.filter((row) => row.isCorrect).length;
  const labels = ["A", "B", "C"];
  const confusionMatrix = labels.map((actual) => ({
    actual,
    predicted: labels.reduce((cells, predicted) => {
      cells[predicted] = rows.filter(
        (row) => row.modelLabel === actual && row.selectedLabel === predicted,
      ).length;
      return cells;
    }, {}),
  }));

  return {
    rows,
    accuracy: Math.round((correctCount / rows.length) * 100),
    confusionMatrix,
    insight:
      correctCount === rows.length
        ? "分類完全命中，代表你已經掌握這組 feature 的分群規律。"
        : "模型與玩家判斷出現差異，這正是觀察 feature quality 與 decision boundary 的好材料。",
  };
}

export async function askBusinessAssistant({ question, faqs }) {
  await wait();

  const normalizedQuestion = normalize(question);
  const scoredFaqs = faqs.map((faq) => {
    const score = faq.tags.reduce(
      (total, tag) => total + (normalizedQuestion.includes(normalize(tag)) ? 1 : 0),
      0,
    );
    return { ...faq, score };
  });

  const bestMatch = scoredFaqs.sort((a, b) => b.score - a.score)[0];
  if (!bestMatch || bestMatch.score === 0) {
    return {
      answer: "目前 FAQ 還沒有明確資料，我會建議店家新增這個問題，避免顧客重複詢問。",
      matchedQuestion: null,
      confidence: "low",
      action: "新增 FAQ 或交給 AI assistant fallback。",
    };
  }

  return {
    answer: bestMatch.answer,
    matchedQuestion: bestMatch.question,
    confidence: bestMatch.score >= 2 ? "high" : "medium",
    action: "命中 FAQ，可直接回覆顧客並記錄詢問主題。",
  };
}
