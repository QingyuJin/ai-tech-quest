export const ragDocument = {
  id: "qingyu-cafe-info",
  title: "晴宇咖啡店家資訊",
  description: "這是一份用來示範文件問答調查員的 mock 文件，內容包含營業時間、地址、預約、插座與低消規則。",
  chunks: [
    {
      id: "chunk-hours",
      heading: "營業時間",
      body: "晴宇咖啡平日營業時間為 10:00 到 20:00，週末與國定假日營業時間為 09:00 到 21:00。",
      tags: ["營業時間", "時間", "幾點", "平日", "週末", "假日", "business hours", "open"],
    },
    {
      id: "chunk-location",
      heading: "地址",
      body: "晴宇咖啡地址為台北市晴宇路 100 號，距離最近捷運站步行約 5 分鐘。",
      tags: ["地址", "在哪", "地點", "交通", "捷運", "location", "address"],
    },
    {
      id: "chunk-booking",
      heading: "預約方式",
      body: "顧客可以透過 LINE 預約座位。若當日仍有空位，可以接受當日預約；多人同行建議提前預約。",
      tags: ["預約", "訂位", "LINE", "當日", "多人", "reservation", "booking"],
    },
    {
      id: "chunk-power",
      heading: "插座資訊",
      body: "窗邊座位與共用工作桌大多提供插座。若需要長時間使用筆電，建議預約時備註需要插座座位。",
      tags: ["插座", "充電", "筆電", "工作", "座位", "outlet", "power"],
    },
    {
      id: "chunk-minimum",
      heading: "低消規則",
      body: "每位顧客低消為一杯飲品或一份甜點。停留超過兩小時時，建議追加一份餐點或飲品。",
      tags: ["低消", "最低消費", "飲品", "甜點", "兩小時", "minimum", "order"],
    },
  ],
};

export const suggestedQuestions = [
  "營業時間是什麼？",
  "可以預約嗎？",
  "有插座嗎？",
  "地址在哪？",
  "老闆帥嗎？",
];

export const ragTechPoints = [
  {
    title: "文件切分（Document Chunking）",
    body: "先把長文件切成營業時間、地址、預約方式等小片段，讓系統能精準找到和問題最相關的內容。",
  },
  {
    title: "語意向量（Embedding）",
    body: "正式版本會把文件片段和使用者問題轉成語意向量，讓系統能理解意思相近但用詞不同的問題。",
  },
  {
    title: "向量搜尋（Vector Search）",
    body: "系統會先搜尋最接近問題的文件片段，再把這些片段交給 AI 產生回答。",
  },
  {
    title: "文件檢索增強生成（RAG）",
    body: "RAG 是先檢索文件、再生成答案的流程，適合店家資訊、公司文件、課程資料與政策查詢。",
  },
  {
    title: "來源引用（Source Citation）",
    body: "回答會附上引用片段，使用者可以回頭檢查答案是否真的來自文件。",
  },
  {
    title: "防止幻覺（Hallucination Control）",
    body: "如果找不到可靠文件，系統應該降低信心或回答不知道，而不是硬編一個看似合理的答案。",
  },
];
