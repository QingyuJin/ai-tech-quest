# AI 技術任務 Monorepo

AI 技術任務是一個互動式 AI 產品展示遊戲。使用者不是被動閱讀作品集，而是透過文件問答、模型分類、店家自動化、BuildFlow 與 Unity 學習關卡，逐步理解 Qingyu Jin 的產品設計與工程能力。

GitHub profile: <https://github.com/QingyuJin>

## 為什麼做這個專案

傳統作品集常常只是專案清單，無法讓面試官、客戶或工程師快速感受到產品思維。這個 monorepo 把作品整理成產品路線：哪些可以接案變現、哪些展示高技術力、哪些支撐履歷可信度。

## 產品順序

1. `01_AI_Tech_Quest`：AI 技術任務，互動式 AI 產品展示遊戲。
2. `04_BuildFlow`：工程行接案與派工管理系統。
3. `02_AI_Business_Assistant`：店家 AI 助手，小型店家 FAQ 與自動回覆產品。
4. `03_TW_Civic_RAG`：繁體中文文件問答系統，支援來源引用與文件查詢。
5. `05_Unity_AI_Tutor`：Unity AI 學習關卡，用 Unity 做互動式學習任務。
6. `06_ML_Experiment_Lab`：機器學習實驗與模型評測支撐。

`99_Background_Skills` 只保留舊練習 repo 與背景能力，不放進主作品敘事。

## 主要功能

- 任務式 AI 產品展示。
- 文件檢索增強生成（RAG）mock 問答。
- 模型分類與模型評估（Model Evaluation）互動關卡。
- 店家 AI 助手 FAQ 後台與顧客問答。
- BuildFlow 既有產品連結與商業流程定位。
- 產品展示室解鎖流程。
- 前端 localStorage 任務進度。
- FastAPI mock-first 後端 API。

## 技術棧

- 前端：React、Vite、Tailwind CSS、Framer Motion、React Router、Zustand。
- 後端：FastAPI、Pydantic、Uvicorn、in-memory mock data。
- 未來升級：語意向量（Embedding）、向量搜尋（Vector Search）、SQLite / Supabase、LINE Messaging API、Unity WebGL、真實 ML model serving。

## Monorepo 架構

```text
ai-tech-quest/
|-- 00_Product_Strategy/
|-- 01_AI_Tech_Quest/
|-- 02_AI_Business_Assistant/
|-- 03_TW_Civic_RAG/
|-- 04_BuildFlow/
|-- 05_Unity_AI_Tutor/
|-- 06_ML_Experiment_Lab/
|-- 07_Portfolio_Website/
`-- 99_Background_Skills/
```

## 啟動前端

```powershell
cd 01_AI_Tech_Quest/frontend_web
npm install
npm run dev
```

## 啟動後端

```powershell
cd 01_AI_Tech_Quest/backend_api
.\.venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8010 --reload
```

API 文件：

```text
http://127.0.0.1:8010/docs
```

## Demo / GitHub

- 主作品 repo: <https://github.com/QingyuJin/ai-tech-quest>
- BuildFlow repo: <https://github.com/QingyuJin/qingyu-web-studio>
- BuildFlow demo: <https://qingyu-web-studio.vercel.app>
- 店家 AI 助手 placeholder: <https://github.com/QingyuJin/ai-business-assistant>
- 繁體中文文件問答系統 placeholder: <https://github.com/QingyuJin/tw-civic-rag>
- Unity AI 學習關卡 placeholder: <https://github.com/QingyuJin/unity-ai-tutor>
- ML Experiment Lab placeholder: <https://github.com/QingyuJin/ml-experiment-lab>

## Mock 邊界

目前 AI 回答、RAG 檢索、ML 預測與 FAQ 配對都使用 mock service。架構已保留 service layer，未來可以替換成真實後端、資料庫、向量資料庫與模型服務。
