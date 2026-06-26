# Features

這個資料夾放 AI 技術任務的互動關卡。每個 feature 都保留自己的頁面、元件、資料與 service，避免把所有邏輯塞進 `App.jsx`。

## 關卡

- `rag-mission`：文件問答調查員，示範文件檢索增強生成（RAG）、來源引用與 mock 檢索流程。
- `ml-mission`：模型分類挑戰，示範 2D 資料點、玩家分類、模型預測與模型評估（Model Evaluation）。
- `business-mission`：店家 AI 助手，示範 FAQ 後台、顧客提問、問答紀錄與店家自動化（Business Automation）。

## Mock 邊界

目前三個關卡都使用前端 mock service。未來可以將 service 層替換成 FastAPI API mode，不需要重寫 UI。
