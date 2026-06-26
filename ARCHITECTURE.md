# Architecture

這個 repo 採產品型 monorepo。每個資料夾代表一條產品路線或支撐能力，主作品不是單一頁面，而是一個可以逐步擴充成真產品的互動式 AI 展示系統。

## Product-Line Architecture

```text
01_AI_Tech_Quest
  -> AI 技術任務，互動式 AI 產品展示遊戲

04_BuildFlow
  -> 工程行接案與派工管理系統

02_AI_Business_Assistant
  -> 店家 AI 助手，小型店家 FAQ 與自動回覆產品

03_TW_Civic_RAG
  -> 繁體中文文件問答系統，支援來源引用與文件查詢

05_Unity_AI_Tutor
  -> Unity AI 學習關卡，用 Unity 做互動式學習任務

06_ML_Experiment_Lab
  -> 機器學習實驗與模型評測支撐

07_Portfolio_Website
  -> 對外作品集與 case study hub

99_Background_Skills
  -> 舊練習 repo 與背景能力封存區
```

## Active Implementation

目前可執行的主產品前端：

```text
01_AI_Tech_Quest/frontend_web/
|-- src/app/
|-- src/pages/
|-- src/components/
|-- src/features/
|-- src/data/
|-- src/store/
|-- src/hooks/
|-- src/services/
|-- src/styles/
`-- src/utils/
```

目前可執行的主產品後端：

```text
01_AI_Tech_Quest/backend_api/
|-- app/main.py
|-- app/routers/
|-- app/services/
|-- app/schemas/
|-- app/models/
|-- app/data/
`-- tests/
```

## Frontend Architecture

- `pages/`：首頁、任務選擇、產品展示室。
- `components/`：共用 UI，例如任務卡、產品卡、進度條、晴宇 AI 導覽員。
- `features/`：三個互動關卡，每個關卡都有自己的資料、元件與 service。
- `store/`：Zustand + localStorage 任務進度。
- `services/`：保留未來切換 API mode 的邊界。

## Backend Architecture

- `routers/`：FastAPI route contract。
- `schemas/`：Pydantic request / response。
- `services/`：目前是 mock service，未來替換真實實作。
- `data/`：in-memory mock data。
- `models/`：domain model。

## API Contracts

- `GET /health`
- `GET /missions`
- `POST /rag/ask`
- `POST /ml/predict`
- `GET /business/faqs`
- `POST /business/faqs`
- `POST /business/ask`

## Future Replacement Strategy

- 文件問答調查員：替換成文件上傳、文件切分、語意向量（Embedding）、向量搜尋（Vector Search）與來源引用。
- 模型分類挑戰：替換成 sklearn / FastAPI model serving。
- 店家 AI 助手：替換成 SQLite / Supabase、LLM fallback 與 LINE Bot。
- BuildFlow：強化 Supabase 資料流程與 LINE Messaging API。
- Unity AI 學習關卡：加入 Unity WebGL 與 AI Hint API。
