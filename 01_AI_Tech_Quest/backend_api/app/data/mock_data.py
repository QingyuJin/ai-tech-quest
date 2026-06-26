from app.models.domain import DocumentChunkModel, FaqModel, MissionModel


MISSIONS = [
    MissionModel(
        id="rag",
        title="文件問答調查員",
        subtitle="從文件找到答案，並追蹤引用來源。",
        category="文件 AI",
        level="第 1 關",
        status_label="可體驗 MVP",
        summary="閱讀晴宇咖啡店家資訊，提出問題，檢查系統如何找出可信答案與引用片段。",
        demonstrates=["文件切分（Document Chunking）", "向量搜尋（Vector Search）", "來源引用（Source Citation）"],
        stack=["文件檢索增強生成（RAG）", "語意向量（Embedding）", "FastAPI 可串接"],
        route="/missions/rag",
    ),
    MissionModel(
        id="ml",
        title="模型分類挑戰",
        subtitle="用資料點理解模型如何判斷使用者類型。",
        category="機器學習",
        level="第 2 關",
        status_label="可體驗 MVP",
        summary="在 2D 資料圖上選擇未知使用者類型，對照模型預測、信心分數與評估結果。",
        demonstrates=["特徵設計（Feature Engineering）", "分類模型（Classification）", "模型評估（Model Evaluation）"],
        stack=["Python", "sklearn 可串接", "混淆矩陣（Confusion Matrix）"],
        route="/missions/ml",
    ),
    MissionModel(
        id="business",
        title="店家 AI 助手",
        subtitle="把常見問題整理成可自動回覆的店家服務產品。",
        category="商業 AI",
        level="第 3 關",
        status_label="接案產品雛形",
        summary="用 FAQ 後台、顧客提問與回答紀錄，展示小型店家如何導入自動客服。",
        demonstrates=["FAQ 後台", "API 工作流程", "店家自動化（Business Automation）"],
        stack=["React", "FastAPI", "SQLite 可升級"],
        route="/missions/business",
    ),
    MissionModel(
        id="buildflow",
        title="BuildFlow 產品展示",
        subtitle="工程行接案與派工管理系統。",
        category="商業流程產品",
        level="第 4 關",
        status_label="既有產品",
        summary="連結既有 BuildFlow demo，展示接案表單、後台管理、派工流程與 LINE Bot 整合方向。",
        demonstrates=["全端流程設計（Full-stack Workflow）", "工程行業務流程", "LINE Bot 整合"],
        stack=[
            "React",
            "Vite",
            "Tailwind CSS",
            "React Router",
            "Supabase",
            "Vercel Serverless Functions",
            "LINE Messaging API",
        ],
        link="https://github.com/QingyuJin/qingyu-web-studio",
    ),
    MissionModel(
        id="unity",
        title="Unity AI 學習關卡預告",
        subtitle="用 Unity 做互動式學習任務。",
        category="Unity WebGL",
        level="預告",
        status_label="未來關卡",
        summary="規劃 Unity WebGL 學習場景，讓使用者用拖拉和 AI 提示理解技術概念。",
        demonstrates=["Unity WebGL", "互動學習設計", "AI 提示"],
        stack=["Unity", "C#", "WebGL"],
    ),
]


RAG_DOCUMENT_TITLE = "晴宇咖啡店家資訊"

RAG_CHUNKS = [
    DocumentChunkModel(
        id="chunk-hours",
        heading="營業時間",
        body="晴宇咖啡平日營業時間為 10:00 到 20:00，週末與國定假日營業時間為 09:00 到 21:00。",
        tags=["營業時間", "時間", "幾點", "平日", "週末", "假日", "business hours", "open"],
    ),
    DocumentChunkModel(
        id="chunk-location",
        heading="地址",
        body="晴宇咖啡地址為台北市晴宇路 100 號，距離最近捷運站步行約 5 分鐘。",
        tags=["地址", "在哪", "地點", "交通", "捷運", "location", "address"],
    ),
    DocumentChunkModel(
        id="chunk-booking",
        heading="預約方式",
        body="顧客可以透過 LINE 預約座位。若當日仍有空位，可以接受當日預約；多人同行建議提前預約。",
        tags=["預約", "訂位", "LINE", "當日", "多人", "reservation", "booking"],
    ),
    DocumentChunkModel(
        id="chunk-power",
        heading="插座資訊",
        body="窗邊座位與共用工作桌大多提供插座。若需要長時間使用筆電，建議預約時備註需要插座座位。",
        tags=["插座", "充電", "筆電", "工作", "座位", "outlet", "power"],
    ),
    DocumentChunkModel(
        id="chunk-minimum",
        heading="低消規則",
        body="每位顧客低消為一杯飲品或一份甜點。停留超過兩小時時，建議追加一份餐點或飲品。",
        tags=["低消", "最低消費", "飲品", "甜點", "兩小時", "minimum", "order"],
    ),
]


DEFAULT_FAQS = [
    FaqModel(
        id="faq-hours",
        question="營業時間是什麼？",
        answer="我們平日營業時間為 10:00 到 20:00，週末營業時間為 09:00 到 21:00。",
        tags=["營業時間", "時間", "平日", "週末"],
    ),
    FaqModel(
        id="faq-booking",
        question="可以預約座位嗎？",
        answer="可以。顧客可以透過 LINE 預約座位，當日若仍有空位也可以接受預約。",
        tags=["預約", "訂位", "LINE"],
    ),
    FaqModel(
        id="faq-power",
        question="店內有插座嗎？",
        answer="窗邊座位與共用工作桌大多提供插座，建議預約時備註需要插座座位。",
        tags=["插座", "充電", "筆電", "工作"],
    ),
    FaqModel(
        id="faq-minimum",
        question="有低消規則嗎？",
        answer="每位顧客低消為一杯飲品或一份甜點，停留超過兩小時建議追加點餐。",
        tags=["低消", "最低消費", "飲品", "甜點"],
    ),
]


EVALUATION_SUMMARY = {
    "accuracy": 87,
    "confusion_matrix": [
        {"actual": "A", "predicted": {"A": 24, "B": 3, "C": 1}},
        {"actual": "B", "predicted": {"A": 2, "B": 31, "C": 2}},
        {"actual": "C", "predicted": {"A": 1, "B": 4, "C": 26}},
    ],
    "error_analysis": "大多數錯誤發生在 A/B 與 B/C 邊界附近，代表使用者行為有時會介於兩種族群之間。",
}
