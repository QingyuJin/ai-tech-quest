# AI 技術任務展示話術

這份腳本適合用在面試、接案簡報、朋友試用或作品集導覽。建議全程 3 到 5 分鐘。

## 開場 20 秒

> 這不是一般作品集，而是一個互動式 AI 產品展示遊戲。  
> 我把 RAG 文件問答、ML 分類、店家 AI 助手、BuildFlow 與未來 Unity 關卡包成任務，讓使用者可以直接操作，而不是只看技術清單。

開啟：

```text
https://ai-tech-quest.vercel.app/demo
```

## 第一步：產品定位 30 秒

說明重點：

- AI 技術任務展示的是產品工程能力，不只是寫程式。
- 每一關都代表一個可延伸成接案或產品的方向。
- 主站 `qingyuweb.com/services` 已整理成可委託服務入口。

可以說：

> 我先用任務式方式展示技術，讓非工程背景的人也能看懂 AI 可以怎麼落地。

## 第二步：RAG 文件問答 60 秒

開啟：

```text
https://ai-tech-quest.vercel.app/missions/rag
```

操作：

1. 點「營業時間是什麼？」
2. 看 answer、confidence、sources、cited snippets
3. 點「老闆帥嗎？」

可以說：

> 正常問題會根據文件回答，並附上引用來源。  
> 如果問「老闆帥嗎？」這種文件沒有寫的問題，系統會低信心幽默回覆，但不會把玩笑說成事實。這是在展示防止幻覺與品牌語氣 fallback。

## 第三步：ML 分類挑戰 45 秒

開啟：

```text
https://ai-tech-quest.vercel.app/missions/ml
```

操作：

1. 點未知資料點
2. 選 A / B / C
3. 送出後看模型預測、正確答案、accuracy、confusion matrix

可以說：

> 這一關把 notebook 裡的模型分類變成互動介面。重點不是炫數學，而是讓使用者看懂模型怎麼判斷，以及怎麼評估模型表現。

## 第四步：店家 AI 助手 60 秒

開啟：

```text
https://ai-tech-quest.vercel.app/missions/business
```

操作：

1. 看 FAQ 後台
2. 問「可以用 LINE 預約嗎？」
3. 問「老闆帥嗎？」
4. 看問答紀錄

可以說：

> 這是最容易轉成接案服務的一關。小店、補習班、工作室常常重複回答問題，這個 demo 展示了 FAQ 後台、自動回覆、品牌語氣與問答紀錄。未來可以接 LINE Bot、Supabase 和真 AI。

## 第五步：產品展示室 30 秒

開啟：

```text
https://ai-tech-quest.vercel.app/portfolio
```

如果沒有解鎖，先回 `/demo` 點「展示用快速解鎖」。

可以說：

> 最後的產品展示室不是單純作品列表，而是完整產品路線。AI 技術任務是主展示，BuildFlow 是既有商業流程產品，店家 AI 助手與繁體中文文件問答系統是下一步可以接案深化的產品。

## 收尾 20 秒

> 如果是接案，我會先從最小可用版本開始：整理 FAQ 或文件、做出可試用 demo，再依需求接 Supabase、LINE Bot、API 或真 RAG。  
> 所以這個作品不只是展示我會做 AI，而是展示我能把 AI 做成能被使用、能被理解、能逐步上線的產品。

導向：

```text
https://www.qingyuweb.com/services
https://www.qingyuweb.com/contact
```

