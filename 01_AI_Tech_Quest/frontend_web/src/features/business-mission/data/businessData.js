export const defaultFaqs = [
  {
    id: "faq-hours",
    question: "營業時間是什麼？",
    answer: "我們平日營業時間為 10:00 到 20:00，週末營業時間為 09:00 到 21:00。",
    tags: ["營業時間", "時間", "平日", "週末"],
  },
  {
    id: "faq-booking",
    question: "可以預約座位嗎？",
    answer: "可以。顧客可以透過 LINE 預約座位，當日若仍有空位也可以接受預約。",
    tags: ["預約", "訂位", "LINE"],
  },
  {
    id: "faq-power",
    question: "店內有插座嗎？",
    answer: "窗邊座位與共用工作桌大多提供插座，建議預約時備註需要插座座位。",
    tags: ["插座", "充電", "筆電", "工作"],
  },
  {
    id: "faq-minimum",
    question: "有低消規則嗎？",
    answer: "每位顧客低消為一杯飲品或一份甜點，停留超過兩小時建議追加點餐。",
    tags: ["低消", "最低消費", "飲品", "甜點"],
  },
];

export const sampleCustomerQuestions = [
  "可以用 LINE 預約嗎？",
  "有可以充電的座位嗎？",
  "週末幾點營業？",
  "低消是一杯飲料就可以嗎？",
];

export const businessUseCases = [
  {
    title: "小店 LINE Bot",
    body: "把營業時間、預約方式、地址、低消等重複問題變成 LINE 自動回覆，減少店員手動回訊。",
  },
  {
    title: "補習班 FAQ 助手",
    body: "回答課程時間、試聽預約、收費規則與家長常見問題，讓行政人員少做重複回答。",
  },
  {
    title: "工作室自動回覆",
    body: "協助設計、攝影、工程或顧問工作室回答報價、預約、交期與修改規則。",
  },
  {
    title: "文件客服系統",
    body: "把公司規範、服務手冊或內部文件整理成可查詢的客服助手，並保留問題紀錄。",
  },
];

export const businessTechPoints = [
  {
    title: "全端開發（Full-stack）",
    body: "這一關把 UI、資料、服務邏輯和未來 API 介面分開，方便從 mock demo 升級成正式產品。",
  },
  {
    title: "API 介面（API）",
    body: "前端透過 getFaqs、addFaq、ask 這些服務方法溝通，未來可以改接 FastAPI 路由。",
  },
  {
    title: "資料庫（Database）",
    body: "目前用 localStorage 模擬資料保存，正式版可改成 SQLite、PostgreSQL 或 Supabase。",
  },
  {
    title: "FAQ 配對（FAQ Matching）",
    body: "第一版用關鍵字與標籤計分，未來可升級成語意向量（Embedding）與向量搜尋（Vector Search）。",
  },
  {
    title: "AI 助手（AI Assistant）",
    body: "命中的 FAQ 可以交給大型語言模型重新整理語氣，但仍要遵守資料來源與商業規則。",
  },
  {
    title: "店家自動化（Business Automation）",
    body: "這個產品可以包裝成 LINE Bot、網站客服、補習班 FAQ 助手或工作室自動回覆服務。",
  },
];
