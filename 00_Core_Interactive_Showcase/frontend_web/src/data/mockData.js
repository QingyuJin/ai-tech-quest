export const missions = [
  {
    id: "rag",
    title: "RAG 文件調查員",
    subtitle: "Document Investigator",
    route: "/missions/rag",
    summary: "從文件中找答案，顯示引用來源，展示可信任 AI 回答的核心概念。",
    tech: ["RAG", "Embedding", "Vector Search", "Citation"],
    accent: "cyan",
  },
  {
    id: "ml",
    title: "ML 分類挑戰",
    subtitle: "Classification Challenge",
    route: "/missions/ml",
    summary: "用資料點分類遊戲展示 feature、模型預測、accuracy 與 confusion matrix。",
    tech: ["Dataset", "Classification", "Evaluation", "Visualization"],
    accent: "amber",
  },
  {
    id: "business",
    title: "AI 店家助手",
    subtitle: "Business Assistant",
    route: "/missions/business",
    summary: "模擬店家 FAQ 後台與顧客問答，展示 full-stack AI 接案應用。",
    tech: ["FastAPI", "FAQ Matching", "SQLite-ready", "AI Assistant"],
    accent: "green",
  },
];

export const missionOrder = missions.map((mission) => mission.id);

export const projects = [
  {
    id: "ai-business-assistant",
    title: "AI Business Assistant",
    summary: "Small-business FAQ admin, customer Q&A, and AI assistant workflow.",
    demonstrates: "Full-stack product thinking, FAQ matching, API contracts, business automation, and LLM fallback readiness.",
    stack: ["React", "FastAPI", "SQLite-ready", "FAQ Matching", "OpenAI-ready"],
    githubUrl: "https://github.com/QingyuJin/ai-business-assistant",
    demoUrl: "https://demo-placeholder.qingyu.ai/ai-business-assistant",
    caseStudyUrl: "https://case-study-placeholder.qingyu.ai/ai-business-assistant",
  },
  {
    id: "tw-civic-rag",
    title: "TW Civic RAG",
    summary: "Traditional Chinese civic document Q&A with citations and retrieval evaluation.",
    demonstrates: "Document chunking, embeddings, vector search, answer grounding, source citation, and hallucination control.",
    stack: ["Python", "FastAPI", "RAG", "Vector DB", "Evaluation"],
    githubUrl: "https://github.com/QingyuJin/tw-civic-rag",
    demoUrl: "https://demo-placeholder.qingyu.ai/tw-civic-rag",
    caseStudyUrl: "https://case-study-placeholder.qingyu.ai/tw-civic-rag",
  },
  {
    id: "unity-ai-tutor",
    title: "Unity AI Tutor",
    summary: "Unity WebGL technical learning mission with AI-guided hints.",
    demonstrates: "Interactive technical education, Unity WebGL integration, game-style onboarding, and API-driven tutoring.",
    stack: ["Unity", "C#", "WebGL", "React Embed", "REST API"],
    githubUrl: "https://github.com/QingyuJin/unity-ai-tutor",
    demoUrl: "https://demo-placeholder.qingyu.ai/unity-ai-tutor",
    caseStudyUrl: "https://case-study-placeholder.qingyu.ai/unity-ai-tutor",
  },
  {
    id: "ml-experiment-lab",
    title: "ML Experiment Lab",
    summary: "Machine learning experiments, model evaluation, baselines, and error analysis.",
    demonstrates: "Feature engineering, classification, metrics, confusion matrix interpretation, and reproducible ML reporting.",
    stack: ["Python", "Colab", "sklearn", "Pandas", "Reports"],
    githubUrl: "https://github.com/QingyuJin/ml-experiment-lab",
    demoUrl: "https://demo-placeholder.qingyu.ai/ml-experiment-lab",
    caseStudyUrl: "https://case-study-placeholder.qingyu.ai/ml-experiment-lab",
  },
];

export const portfolioLinks = {
  mainRepo: "https://github.com/QingyuJin/ai-tech-quest",
  webStudio: "https://github.com/QingyuJin/qingyu-web-studio",
  contact: "https://github.com/QingyuJin",
};

export const techExplanations = {
  rag: {
    title: "RAG Pipeline",
    body: "RAG 會先檢索相關文件片段，再根據來源回答問題。這能讓答案更可追溯，也更適合文件問答系統。",
    bullets: ["Document chunking", "Embedding search", "Source citation"],
  },
  ml: {
    title: "ML Evaluation",
    body: "分類模型不只看預測結果，也要看 accuracy、混淆矩陣與錯誤分析，才能知道模型真正強弱。",
    bullets: ["Feature design", "Prediction", "Confusion matrix"],
  },
  business: {
    title: "AI Business Workflow",
    body: "店家 AI 助手從 FAQ matching 開始，之後可以加資料庫、客服紀錄、LINE Bot 與 OpenAI fallback。",
    bullets: ["FAQ admin", "API layer", "Client-ready product"],
  },
};

export const guideMessages = {
  home: "歡迎進入 Qingyu AI Lab。這裡不是普通作品集，而是一個用任務展示 AI 技術力的互動入口。",
  missions: "先完成三個核心任務。每完成一關，進度條都會更新；三關完成後就能解鎖作品集房間。",
  rag: "這是 Level 1：RAG 文件調查員。先問文件問題，再檢查 answer、confidence 與 source citation。",
  ml: "這是 Level 2：ML 分類挑戰。點擊未知資料點，選分類，再觀察模型預測與 evaluation。",
  business: "這是 Level 3：AI 店家助手。新增 FAQ、測試顧客提問，觀察它如何變成可接案產品。",
  portfolioLocked: "作品集房間還沒完全解鎖。回到任務選單，把三個任務都完成。",
  portfolioUnlocked: "任務完成。現在可以展示 Qingyu 的 AI、RAG、ML、Full-stack 與 Unity 作品路線。",
};
