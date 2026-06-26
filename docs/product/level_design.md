# Level Design

## Level 1：RAG 文件調查員

### 玩法

玩家看到一份文件，輸入問題。  
AI 回答，並標示引用來源。

### 展示技術

- PDF / 文本切分
- Embedding
- Vector Search
- RAG
- Source Citation
- Hallucination Control

### MVP 做法

第一版可以先用假資料，不一定要真的接完整 RAG。

資料範例：
- 課程規定
- 店家 FAQ
- 校園公告
- 專案說明文件

### 互動流程

1. 玩家選一份文件
2. 玩家問：「這份文件的重點是什麼？」
3. 系統回答
4. 顯示引用片段
5. 顯示技術解說卡

---

## Level 2：ML 分類挑戰

### 玩法

玩家看到幾個資料點，需要猜它們屬於哪一類。  
之後模型揭曉分類結果，並用視覺化解釋。

### 展示技術

- Dataset
- Feature Engineering
- Classification
- Clustering
- Decision Boundary
- Model Evaluation

### MVP 做法

用 2D scatter plot 做假資料即可。

### 互動流程

1. 顯示資料點
2. 玩家選分類
3. 模型顯示結果
4. 顯示 accuracy / confusion matrix
5. 顯示技術解說卡

---

## Level 3：AI 店家助手

### 玩法

玩家扮演店家，新增 FAQ。  
顧客問問題，AI 自動回答。

### 展示技術

- Full-stack
- FAQ Matching
- API
- Database
- AI Assistant
- 商業應用

### MVP 做法

先用本地 FAQ matching，不必一開始串 OpenAI。

### 互動流程

1. 玩家新增 FAQ
2. 顧客輸入問題
3. AI 回答
4. 玩家看到後台紀錄
5. 顯示這能怎麼接案

---

## Level 4：作品集解鎖房間

### 玩法

玩家完成任務後，解鎖你的作品卡。

### 展示內容

- AI Business Assistant
- TW Civic RAG
- Unity AI Tutor
- ML Experiment Lab
- Portfolio Website

### 目的

把遊戲導回履歷與接案。
