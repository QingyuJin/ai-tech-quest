# Roadmap

這份路線圖以「可以展示、可以部署、可以變現」為排序原則。AI 技術任務是主入口，BuildFlow 與店家 AI 助手是最接近接案變現的產品，繁體中文文件問答系統與 Unity AI 學習關卡負責展示高技術力。

## Phase 1: 產品型 Monorepo Foundation

Status: current.

- 建立產品型 monorepo。
- 定義每個產品的 Problem、Target Users、Core Features、Tech Stack、MVP Scope、Monetization、Roadmap。
- 舊練習 repo 只保留在 `99_Background_Skills`。
- 主作品區避免過度強調背景技能，聚焦產品能力。

## Phase 2: AI 技術任務 Stabilization

Goal: 讓主產品可以放 GitHub、部署、示範與面試使用。

- 穩定 React + FastAPI MVP。
- 完成繁中 UI。
- 保持任務進度與產品展示室流程。
- 修正 `/rag/ask` API contract。
- 加入 screenshots 與 walkthrough video。

## Phase 3: BuildFlow 產品化

Goal: 把既有 repo 包裝成商業流程產品。

- Existing repo: <https://github.com/QingyuJin/qingyu-web-studio>
- Demo: <https://qingyu-web-studio.vercel.app>
- 強化工程行接案、後台管理、派工狀態與 LINE Bot 流程敘事。
- 補 BuildFlow case study。

## Phase 4: 店家 AI 助手 Monetization MVP

Goal: 從 mock demo 升級成可接案的小型 AI 產品。

- 前端 service 切換 API mode。
- FAQ 改接 SQLite 或 Supabase。
- 新增 FAQ 編輯 / 刪除。
- 保留顧客問答紀錄。
- 升級 FAQ 配對為語意向量（Embedding）與向量搜尋（Vector Search）。
- 加入低信心時的 LLM fallback。
- 包裝 LINE Bot 或網站客服方案。

## Phase 5: 繁體中文文件問答系統

Goal: 建立高技術力文件問答產品。

- 文件上傳與解析。
- 文件切分（Document Chunking）。
- 語意向量（Embedding）。
- 向量搜尋（Vector Search）。
- 文件檢索增強生成（RAG）。
- 來源引用（Source Citation）。
- 不知道就回答不知道。
- 評測 retrieval quality 與 citation quality。

## Phase 6: Unity AI 學習關卡

Goal: 用 Unity 做互動式學習產品。

- 建立 Digital Logic Gate Lab。
- 玩家拖拉 AND / OR / NOT 邏輯閘。
- Truth Table Checker。
- AI Guide 提示。
- WebGL build。
- 串接未來 AI Hint API。

## Phase 7: ML Experiment Lab

Goal: 支撐主產品中的模型展示，而不是搶走主作品定位。

- 整理資料集與 notebook。
- 輸出模型評估（Model Evaluation）結果。
- 支撐 AI 技術任務 Level 2。
- 提供 case study 技術證據。
