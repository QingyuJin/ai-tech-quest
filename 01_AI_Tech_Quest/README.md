# AI 技術任務

## Product Name

AI 技術任務（AI Tech Quest）

## Problem

一般作品集只能展示結果，無法讓面試官或客戶感受到 AI 產品是如何被設計、拆解與落地的。AI 技術任務把作品集改造成互動式任務，讓使用者用操作理解文件問答、模型分類與店家自動化。

## Target Users

- 技術面試官。
- 想確認 AI 產品能力的接案客戶。
- 需要快速理解作品定位的招募方。
- 想看架構品質與開發流程的工程師。

## Core Features

- 首頁與任務選擇。
- 文件問答調查員：文件檢索增強生成（RAG）mock 流程。
- 模型分類挑戰：資料點分類與模型評估（Model Evaluation）。
- 店家 AI 助手：FAQ 後台、顧客提問與問答紀錄。
- BuildFlow 產品展示。
- Unity AI 學習關卡預告。
- localStorage 任務進度。
- 產品展示室解鎖。

## Tech Stack

- React、Vite、Tailwind CSS、Framer Motion、React Router、Zustand。
- FastAPI、Pydantic、Uvicorn。
- 未來：語意向量（Embedding）、向量搜尋（Vector Search）、SQLite / Supabase、真實 ML model、Unity WebGL。

## MVP Scope

```text
01_AI_Tech_Quest/frontend_web
01_AI_Tech_Quest/backend_api
```

目前所有 AI 行為採 mock-first。目標是先完成完整產品體驗與清楚架構，再逐步替換成真 AI、真 RAG、真 ML 與真資料庫。

## Public Demo

- Demo: <https://ai-tech-quest.vercel.app>
- 3 分鐘展示模式: <https://ai-tech-quest.vercel.app/demo>
- Case study: [docs/case_study_ai_tech_quest.md](docs/case_study_ai_tech_quest.md)
- 展示話術: [docs/showcase_script.md](docs/showcase_script.md)
- 最終 QA: [docs/final_qa_checklist.md](docs/final_qa_checklist.md)

## Monetization

AI 技術任務本身是主作品入口，主要價值是提升履歷、面試與接案說服力。它會把使用者導向更能變現的產品：店家 AI 助手與 BuildFlow。

## Roadmap

1. 保持前端與後端 MVP 可部署。
2. 將店家 AI 助手切到 API mode，接 SQLite 或 Supabase。
3. 將文件問答調查員升級為真實文件上傳、語意向量（Embedding）與向量搜尋（Vector Search）。
4. 將模型分類挑戰接上 sklearn / FastAPI 模型服務。
5. 補 BuildFlow case study。
6. 建立 Unity AI 學習關卡 WebGL prototype。
