export const qingyuCafeDocument = {
  id: "qingyu-cafe-info",
  title: "晴宇咖啡店家資訊",
  owner: "Qingyu Cafe Demo",
  updatedAt: "2026-06-22",
  summary: "店家營業、交通、預約、座位設備與低消規則的示範文件。",
  chunks: [
    {
      id: "chunk-hours",
      sourceId: "Source 1",
      heading: "營業時間",
      content: "晴宇咖啡週一到週五 10:00-20:00 營業，週末與國定假日 09:00-21:00 營業。",
      keywords: ["營業", "時間", "幾點", "週末", "假日", "hours"],
    },
    {
      id: "chunk-location",
      sourceId: "Source 2",
      heading: "地址",
      content: "店址位於嘉義市範例路 100 號，靠近中正大學，從公車站步行約 5 分鐘可抵達。",
      keywords: ["地址", "在哪", "地點", "交通", "嘉義", "中正大學", "location"],
    },
    {
      id: "chunk-booking",
      sourceId: "Source 3",
      heading: "預約方式",
      content: "顧客可以透過 LINE 官方帳號預約座位。六人以上建議提前一天預約。",
      keywords: ["預約", "訂位", "座位", "LINE", "六人", "booking"],
    },
    {
      id: "chunk-power",
      sourceId: "Source 4",
      heading: "插座資訊",
      content: "靠窗座位與工作區提供插座，尖峰時段每組顧客最多使用 3 小時。",
      keywords: ["插座", "充電", "工作", "座位", "用電", "power"],
    },
    {
      id: "chunk-minimum",
      sourceId: "Source 5",
      heading: "低消規則",
      content: "每位顧客低消為一杯飲品，12 歲以下兒童不受低消限制。",
      keywords: ["低消", "飲品", "兒童", "規則", "minimum"],
    },
  ],
};

export const suggestedQuestions = [
  "營業時間是什麼？",
  "可以預約嗎？",
  "有插座嗎？",
  "地址在哪？",
  "低消規則是什麼？",
];

export const ragTechPoints = [
  {
    title: "Document Chunking",
    description: "把長文件切成較小片段，讓檢索可以精準定位到營業時間、地址或預約方式。",
  },
  {
    title: "Embedding",
    description: "正式版本會把問題與文件片段轉成向量，用語意相似度找出最相關內容。",
  },
  {
    title: "Vector Search",
    description: "向量搜尋會回傳 top-k 相關片段。這裡先用 keyword scoring 模擬 retrieval。",
  },
  {
    title: "RAG",
    description: "先 retrieval，再 generation。回答會根據找到的文件片段整理，不直接憑空生成。",
  },
  {
    title: "Source Citation",
    description: "每個回答都附來源與引用片段，讓使用者可以回頭檢查答案依據。",
  },
  {
    title: "Hallucination Control",
    description: "當文件沒有足夠資訊時，系統應該降低信心或回答不知道，而不是編造答案。",
  },
];
