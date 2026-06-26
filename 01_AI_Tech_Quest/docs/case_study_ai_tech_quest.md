# AI 技術任務 Case Study

## 一句話

AI 技術任務是一個互動式 AI 產品展示遊戲，讓使用者透過任務體驗文件問答、模型分類、店家 AI 助手與產品展示室。

Demo: <https://ai-tech-quest.vercel.app>  
展示模式: <https://ai-tech-quest.vercel.app/demo>  
GitHub: <https://github.com/QingyuJin/ai-tech-quest>

## 為什麼做

AI / ML / RAG 作品常停留在 notebook、截圖或技術清單。這對工程師可能足夠，但對面試官、接案客戶或非技術使用者來說，很難快速理解：

- 這個 AI 功能可以解決什麼問題。
- 使用者會怎麼操作。
- 系統如何避免 AI 亂答。
- 這個作品能不能延伸成真產品或接案服務。

AI 技術任務把作品集改成任務式體驗，讓使用者直接操作、看到結果、理解技術背後的產品價值。

## 目標使用者

- 技術面試官：快速理解 Qingyu Jin 的產品工程能力。
- 接案客戶：看到 AI 自動化、FAQ 助手、文件問答可以怎麼落地。
- 工程師：檢查前端、後端、文件與未來擴充架構。
- 非工程背景訪客：用互動方式理解 RAG、ML 與店家 AI 助手。

## 核心體驗

### 1. 文件問答調查員

使用者閱讀「晴宇咖啡店家資訊」，可以詢問營業時間、地址、預約、插座、低消等問題。

系統會回傳：

- answer
- confidence
- sources
- cited snippets
- retrieval trace

展示重點：

- 文件檢索增強生成（RAG）
- 來源引用
- 信心分數
- 防止幻覺
- 幽默但有資料邊界的 fallback

### 2. 模型分類挑戰

使用者在 2D scatter plot 上點選未知資料點，選擇它屬於 A / B / C 哪一類，再看模型預測、正確答案與評估結果。

展示重點：

- 特徵設計（Feature Engineering）
- 分類模型（Classification）
- 模型評估（Model Evaluation）
- Confusion Matrix
- Error Analysis

### 3. 店家 AI 助手

使用者可以新增 FAQ、模擬顧客提問，系統會根據 FAQ matching 顯示回答與問答紀錄。

展示重點：

- FAQ 後台
- 顧客提問
- 店家自動化
- 品牌語氣 fallback
- 未來可接 LINE Bot、Supabase、網站客服

### 4. 產品展示室

任務完成後，使用者可以看到完整產品路線：

- AI 技術任務
- BuildFlow
- 店家 AI 助手
- 繁體中文文件問答系統
- Unity AI 學習關卡
- ML Experiment Lab

## 技術架構

Frontend:

- React
- Vite
- Tailwind CSS
- Framer Motion
- React Router
- Zustand
- localStorage

Backend:

- FastAPI
- Pydantic
- Uvicorn
- routers / services / schemas 分層
- in-memory mock data

Deployment:

- Frontend: Vercel
- Backend: Render-ready FastAPI service
- Main site integration: qingyuweb.com

## Mock 邊界

目前這個專案以 mock-first 方式展示產品流程。

- RAG 目前是 keyword/tag matching，不是真向量資料庫。
- ML 目前是 rule-based mock model，不是真訓練模型。
- 店家 FAQ 目前存在 localStorage 或 in-memory data，不是真資料庫。
- 沒有串 OpenAI API，避免展示階段產生成本與不穩定回覆。

這些 mock 都有對應 service abstraction，未來可以逐步替換成真 API、資料庫、向量搜尋與模型服務。

## 可接案延伸

這個作品可以轉成下列服務：

- 店家 FAQ / LINE Bot 自動回覆
- 補習班課程 FAQ 助手
- 公司內部文件查詢系統
- 工程行案件與報價後台
- AI 技術展示頁
- 教育訓練互動關卡

## 下一步升級

1. 將後端部署到 Render，讓 `/docs`、`/health`、`/rag/ask` 在線上可測。
2. 將前端設定 `VITE_API_BASE_URL`，切換成 API mode。
3. 為 RAG 加入文件上傳、chunking、embedding、vector search。
4. 為店家 AI 助手加入 Supabase FAQ database 與 question logs。
5. 將店家 AI 助手接 LINE Messaging API。
6. 補 Unity WebGL 關卡 prototype。

