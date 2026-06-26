export const missions = [
  {
    id: "rag",
    route: "/missions/rag",
    title: "RAG 文件調查員",
    shortTitle: "RAG Investigator",
    summary: "用文件來源回答問題，展示 chunking、retrieval、citation 與可信任回答。",
    stack: ["FastAPI-ready", "Embedding", "Vector Search", "Citation"],
    accent: "cyan",
  },
  {
    id: "ml",
    route: "/missions/ml",
    title: "ML 分類挑戰",
    shortTitle: "ML Classification",
    summary: "用資料點與模型預測展示 feature、classification、accuracy 與 confusion matrix。",
    stack: ["Dataset", "Model", "Evaluation", "Visualization"],
    accent: "amber",
  },
  {
    id: "business",
    route: "/missions/business",
    title: "AI 店家助手",
    shortTitle: "Business Assistant",
    summary: "建立 FAQ 後台與顧客問答，展示可接案的 full-stack AI 應用雛形。",
    stack: ["FAQ Admin", "API", "Database-ready", "AI Assistant"],
    accent: "green",
  },
];

export const missionOrder = missions.map((mission) => mission.id);

export const techExplanations = {
  rag: {
    title: "RAG Pipeline",
    headline: "把回答綁回可查證的文件來源",
    points: [
      "Chunking 將長文件切成可檢索片段。",
      "Embedding 讓問題與文件片段能用語意相似度比對。",
      "Vector Search 找出最相關的片段，再交給回答層整理。",
      "Citation 讓使用者知道答案來自哪一段內容，降低幻覺風險。",
    ],
    futureUpgrade: "可替換成 LangChain / LlamaIndex + Chroma / FAISS / Supabase Vector。",
  },
  ml: {
    title: "ML Evaluation Loop",
    headline: "讓使用者看見模型如何分類，也看見它哪裡可能錯",
    points: [
      "Feature 讓資料點變成模型可以判斷的訊號。",
      "Classifier 根據已知樣本推測新資料類別。",
      "Accuracy 提供整體表現，但不能單獨代表品質。",
      "Confusion Matrix 顯示哪些類別最容易混淆，是後續改良模型的入口。",
    ],
    futureUpgrade: "可接 sklearn / PyTorch 模型，或讀取 Colab 實驗輸出的評測結果。",
  },
  business: {
    title: "AI Business Assistant",
    headline: "把常見問答、後台管理與 AI 回覆整理成可交付服務",
    points: [
      "FAQ Matching 是最低成本 MVP，可快速展示價值。",
      "API Layer 讓前端、LINE Bot、Unity 或其他入口共用同一套能力。",
      "Database 後續可替換成 SQLite、Supabase 或正式多店家資料庫。",
      "AI Assistant 層未來可接 OpenAI API，加入語氣、推薦與客服紀錄分析。",
    ],
    futureUpgrade: "可擴充成 LINE Bot、預約流程、店家 dashboard 與月費維護方案。",
  },
};

export const ragDocuments = [
  {
    id: "qingyu-cafe",
    title: "晴宇咖啡店家資訊",
    type: "店家 FAQ",
    owner: "AI Business Assistant demo",
    sections: [
      {
        sourceId: "Source 1",
        title: "營業時間",
        content: "晴宇咖啡週一到週五 10:00-20:00 營業，週末 09:00-21:00 營業。",
      },
      {
        sourceId: "Source 2",
        title: "地址與交通",
        content: "店址位於嘉義市範例路 100 號，靠近中正大學，可由公車站步行抵達。",
      },
      {
        sourceId: "Source 3",
        title: "預約與座位",
        content: "顧客可以透過 LINE 預約座位，部分座位提供插座與安靜工作區。",
      },
    ],
  },
  {
    id: "civic-rag",
    title: "TW Civic RAG 評測計畫",
    type: "技術文件",
    owner: "TW Civic RAG",
    sections: [
      {
        sourceId: "Source 1",
        title: "評測指標",
        content: "系統會追蹤 retrieval recall、citation correctness、answer accuracy 與 faithfulness。",
      },
      {
        sourceId: "Source 2",
        title: "測試資料",
        content: "評測集預計建立 30 到 50 題繁體中文問題，每題包含 expected answer 與 supporting document。",
      },
      {
        sourceId: "Source 3",
        title: "實驗變因",
        content: "可比較 chunk size、top-k、embedding model 與 hallucination cases 對回答品質的影響。",
      },
    ],
  },
];

export const mlDataset = [
  { id: "p1", name: "A-01", x: 18, y: 72, modelLabel: "A", description: "高互動、低流失風險" },
  { id: "p2", name: "A-02", x: 26, y: 67, modelLabel: "A", description: "觀看穩定、偏好明確" },
  { id: "p3", name: "B-01", x: 58, y: 40, modelLabel: "B", description: "中度互動、轉換待觀察" },
  { id: "p4", name: "B-02", x: 64, y: 47, modelLabel: "B", description: "行為混合、需要更多特徵" },
  { id: "p5", name: "C-01", x: 80, y: 22, modelLabel: "C", description: "低互動、可能需要喚回" },
  { id: "p6", name: "C-02", x: 74, y: 30, modelLabel: "C", description: "偏離主群、模型信心較低" },
];

export const defaultFaqs = [
  {
    id: "faq-hours",
    question: "營業時間是什麼？",
    answer: "週一到週五 10:00-20:00，週末 09:00-21:00。",
    tags: ["營業", "時間", "幾點"],
  },
  {
    id: "faq-address",
    question: "店家地址在哪裡？",
    answer: "嘉義市範例路 100 號，靠近中正大學。",
    tags: ["地址", "地點", "交通"],
  },
  {
    id: "faq-booking",
    question: "可以預約嗎？",
    answer: "可以，請透過 LINE 預約座位。",
    tags: ["預約", "訂位", "LINE"],
  },
];

export const githubProfileUrl = "https://github.com/QingyuJin";

export const repositoryUrls = {
  aiTechQuest: "https://github.com/QingyuJin/ai-tech-quest",
  twCivicRag: "https://github.com/QingyuJin/tw-civic-rag",
  aiBusinessAssistant: "https://github.com/QingyuJin/ai-business-assistant",
  unityAiTutor: "https://github.com/QingyuJin/unity-ai-tutor",
  mlExperimentLab: "https://github.com/QingyuJin/ml-experiment-lab",
};

export const portfolioProjects = [
  {
    id: "ai-tech-quest",
    title: "AI Tech Quest",
    summary: "Main interactive showcase repo for the RAG, ML, business assistant, portfolio unlock, and future Unity WebGL mission flow.",
    stack: ["React", "Vite", "Tailwind", "FastAPI", "Architecture"],
    demoUrl: "#demo-placeholder",
    githubUrl: repositoryUrls.aiTechQuest,
    caseStudyUrl: "#case-study-placeholder",
  },
  {
    id: "ai-business-assistant",
    title: "AI Business Assistant",
    summary: "Small business FAQ admin and AI Q&A service designed for freelance and monthly maintenance scenarios.",
    stack: ["React", "FastAPI", "SQLite", "FAQ Matching", "OpenAI-ready"],
    demoUrl: "#demo-placeholder",
    githubUrl: repositoryUrls.aiBusinessAssistant,
    caseStudyUrl: "#case-study-placeholder",
  },
  {
    id: "tw-civic-rag",
    title: "TW Civic RAG",
    summary: "Trustworthy Traditional Chinese document QA system focused on citation, faithfulness, and retrieval evaluation.",
    stack: ["Python", "FastAPI", "Vector DB", "Embedding", "RAG Evaluation"],
    demoUrl: "#demo-placeholder",
    githubUrl: repositoryUrls.twCivicRag,
    caseStudyUrl: "#case-study-placeholder",
  },
  {
    id: "unity-ai-tutor",
    title: "Unity AI Tutor",
    summary: "Unity 2D interactive learning mission with REST API integration and future AI hint support.",
    stack: ["Unity", "C#", "WebGL", "REST API", "AI Hint"],
    demoUrl: "#demo-placeholder",
    githubUrl: repositoryUrls.unityAiTutor,
    caseStudyUrl: "#case-study-placeholder",
  },
  {
    id: "ml-experiment-lab",
    title: "ML Experiment Lab",
    summary: "Colab and ML experiment portfolio for baselines, improved methods, evaluation, and error analysis.",
    stack: ["Python", "Colab", "sklearn", "Pandas", "Experiment Report"],
    demoUrl: "#demo-placeholder",
    githubUrl: repositoryUrls.mlExperimentLab,
    caseStudyUrl: "#case-study-placeholder",
  },
];
