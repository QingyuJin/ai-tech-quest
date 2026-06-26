export const initialFaqs = [
  {
    id: "faq-hours",
    question: "營業時間是什麼？",
    answer: "週一到週五 10:00-20:00，週末與國定假日 09:00-21:00。",
    tags: ["營業", "時間", "幾點", "週末", "假日"],
  },
  {
    id: "faq-location",
    question: "地址在哪裡？",
    answer: "嘉義市範例路 100 號，靠近中正大學，從公車站步行約 5 分鐘。",
    tags: ["地址", "地點", "交通", "嘉義", "中正大學"],
  },
  {
    id: "faq-booking",
    question: "可以預約嗎？",
    answer: "可以，請透過 LINE 官方帳號預約座位。六人以上建議提前一天預約。",
    tags: ["預約", "訂位", "LINE", "座位"],
  },
  {
    id: "faq-power",
    question: "店內有插座嗎？",
    answer: "靠窗座位與工作區提供插座，尖峰時段每組顧客最多使用 3 小時。",
    tags: ["插座", "充電", "工作", "座位"],
  },
];

export const sampleCustomerQuestions = [
  "請問今天幾點營業？",
  "可以用 LINE 預約嗎？",
  "有適合讀書工作的插座座位嗎？",
  "店在哪裡？",
];

export const businessUseCases = [
  {
    title: "小店 LINE Bot",
    description: "把 FAQ matching 接到 LINE Bot，讓顧客直接詢問營業時間、地址與預約方式。",
  },
  {
    title: "補習班 FAQ 助手",
    description: "整理課程、費用、試聽與上課地點，減少櫃台重複回答。",
  },
  {
    title: "工作室自動回覆",
    description: "把服務項目、報價範圍與合作流程做成自動問答入口。",
  },
  {
    title: "文件客服系統",
    description: "未來可接 RAG，讓客服回答依據 SOP、合約或產品文件。",
  },
];

export const businessTechPoints = [
  {
    title: "Full-stack",
    description: "前端後台、顧客提問、API service 與資料層一起構成完整應用流程。",
  },
  {
    title: "API",
    description: "前端 service 已保留 mock/api 模式，未來可切換 FastAPI endpoint。",
  },
  {
    title: "Database",
    description: "目前用 local state 與 mock data，之後可替換 SQLite、Supabase 或 Postgres。",
  },
  {
    title: "FAQ Matching",
    description: "先用 tags 和文字命中做 deterministic matching，適合 MVP 與 demo。",
  },
  {
    title: "AI Assistant",
    description: "FAQ 找不到答案時，未來可接 LLM fallback 產生更自然的客服回答。",
  },
  {
    title: "Business Automation",
    description: "把重複問題自動化，能直接包裝成小型接案服務或月費維護方案。",
  },
];
