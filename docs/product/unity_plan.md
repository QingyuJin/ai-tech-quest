# Unity Version Plan

## 不建議第一天就做完整 Unity

Unity 很吸睛，但 WebGL 部署、UI、API 串接、檔案大小都會拖時間。  
所以順序是：

1. 先做 Web 互動 MVP
2. 確認關卡內容好玩
3. 再用 Unity 重做最吸睛的一關

## Unity 第一版只做一個關卡

建議先做：

**Digital Logic Gate Lab**

原因：
- 跟資工課程有關
- 視覺化很直觀
- Unity 拖拉很適合
- 可以展示 C# 邏輯
- 可以加入 AI 提示

## Unity 關卡玩法

玩家把 AND / OR / NOT 拖到電路板上，讓輸出符合 truth table。

## 展示技術

- Unity 2D
- C# 狀態管理
- Drag and Drop
- Truth Table Checking
- AI Hint API
- 自繪角色 UI

## Unity MVP

- 一個 2D 場景
- 三個邏輯閘元件
- 一個目標 truth table
- 拖拉元件
- Check Answer 按鈕
- AI Hint 按鈕
- 結果提示

## Codex Prompt：Unity 版

請建立 Unity 2D 專案的程式架構，用於 Digital Logic Gate Lab。

需求：
1. 建立 Gate 元件類別，支援 AND / OR / NOT
2. 建立拖拉邏輯
3. 建立 TruthTableChecker
4. 建立 GameManager 控制目前關卡
5. 建立 AIHintClient，之後可串 REST API
6. 先不用美術素材，用 placeholder sprite
7. 程式碼要乾淨、有註解、容易擴充
