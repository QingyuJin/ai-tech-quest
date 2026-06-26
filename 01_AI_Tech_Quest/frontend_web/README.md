# AI 技術任務 Frontend

這是 AI 技術任務的 React + Vite 前端。使用者會完成互動任務，最後解鎖產品展示室。

## Tech Stack

- React
- Vite
- Tailwind CSS
- Framer Motion
- React Router
- Zustand
- localStorage persistence

## 頁面

- `HomePage`：AI 技術任務首頁與開始任務 CTA。
- `MissionSelectPage`：五張任務卡與完成狀態。
- `RagMissionPage`：文件問答調查員，示範文件檢索增強生成（RAG）與來源引用。
- `MlMissionPage`：模型分類挑戰，示範分類模型與模型評估（Model Evaluation）。
- `BusinessMissionPage`：店家 AI 助手，示範 FAQ 後台與顧客自動回覆。
- `PortfolioUnlockPage`：完成任務後解鎖產品展示室。

## 任務

- 文件問答調查員：mock RAG、引用來源、信心分數。
- 模型分類挑戰：2D 資料點、玩家分類、模型預測、混淆矩陣。
- 店家 AI 助手：FAQ 新增、顧客提問、命中紀錄、接案應用。
- BuildFlow 產品展示：工程行接案與派工管理系統。
- Unity AI 學習關卡預告：Unity WebGL 互動學習產品方向。

## 產品卡

產品展示室依固定順序呈現：

1. AI 技術任務。
2. BuildFlow。
3. 店家 AI 助手。
4. 繁體中文文件問答系統。
5. Unity AI 學習關卡。
6. ML Experiment Lab。

每張產品卡包含線上展示、GitHub 原始碼與案例說明 placeholder。

## 啟動

```powershell
cd 01_AI_Tech_Quest/frontend_web
npm install
npm run dev
```

指定 port：

```powershell
npm run dev -- --host 127.0.0.1 --port 5174
```

## 品質檢查

```powershell
npm run lint
npm run build
```

## Mock 邊界

- 任務完成狀態存在 localStorage。
- 三個互動關卡目前使用 `src/features/*/services` 內的 mock service。
- `ragService.ask(question)` 未來可改接 `POST /rag/ask`。
- `mlService.predict(sample)` 未來可改接 `POST /ml/predict`。
- `businessService.getFaqs()`、`businessService.addFaq()`、`businessService.ask()` 未來可改接 FastAPI + SQLite / Supabase。
