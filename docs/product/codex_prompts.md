# Codex Prompts

## Prompt 1：建立 Web 互動 MVP

請閱讀 ai-tech-quest monorepo 的文件，尤其是 `docs/product` 與根目錄 `README.md`。  
我要建立 AI Tech Quest：互動式 AI 技術展示遊戲。

請先在 `apps/frontend-web` 建立或更新 React + Vite + Tailwind 前端。

需求：
1. 首頁名稱：AI Tech Quest
2. 副標：Explore Qingyu AI Lab through interactive AI missions.
3. 有 Start Mission 按鈕
4. 點擊後進入 Mission Select 頁
5. 顯示三個任務卡：
   - RAG 文件調查員
   - ML 分類挑戰
   - AI 店家助手
6. 有一個 Qingyu AI Guide 對話框
7. 版面要像科技實驗室，但乾淨專業
8. 手機版 RWD
9. 不要串後端，先用前端假資料完成

請完成可執行版本，並更新 README 啟動方式。

---

## Prompt 2：完成 RAG 文件調查員

請在 AI Tech Quest 裡新增 Level 1：RAG 文件調查員。

需求：
1. 顯示一份範例文件：「晴宇咖啡店家資訊」
2. 使用者可以輸入問題
3. 系統用前端假資料回答
4. 回答要包含引用來源，例如 Source 1 / Source 2
5. 顯示技術解說卡，說明 RAG、embedding、vector search、citation
6. 完成後標記 Level 1 completed

---

## Prompt 3：完成 ML 分類挑戰

請新增 Level 2：ML 分類挑戰。

需求：
1. 顯示 2D scatter plot 或資料點卡片
2. 玩家選擇資料點屬於 A/B/C 哪一群
3. 點擊 Submit 後顯示模型預測結果
4. 顯示 accuracy、confusion matrix 的簡化版
5. 顯示技術解說卡，說明 feature、model、evaluation
6. 完成後標記 Level 2 completed

---

## Prompt 4：完成 AI 店家助手

請新增 Level 3：AI 店家助手。

需求：
1. 顯示店家 FAQ 後台
2. 玩家可以新增一筆 FAQ
3. 顧客可以輸入問題
4. 系統根據 FAQ 做簡單關鍵字 matching
5. 顯示這個功能如何變成接案服務
6. 完成後標記 Level 3 completed

---

## Prompt 5：作品解鎖頁

請新增 Portfolio Unlock 頁。

需求：
1. 當三個 Level 完成後顯示解鎖動畫
2. 顯示作品卡：
   - AI Business Assistant
   - TW Civic RAG
   - Unity AI Tutor
   - ML Experiment Lab
3. 每張卡包含：
   - 技術棧
   - Demo link placeholder
   - GitHub links，統一使用：
     - https://github.com/QingyuJin/ai-tech-quest
     - https://github.com/QingyuJin/tw-civic-rag
     - https://github.com/QingyuJin/ai-business-assistant
     - https://github.com/QingyuJin/unity-ai-tutor
     - https://github.com/QingyuJin/ml-experiment-lab
   - Case study link placeholder
4. 加入 Contact / Hire Me 區塊
