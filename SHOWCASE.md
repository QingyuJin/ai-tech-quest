# AI Tech Quest Showcase Guide

## Public Demo

- AI 技術任務: <https://ai-tech-quest.vercel.app>
- 3 分鐘展示模式: <https://ai-tech-quest.vercel.app/demo>
- 接案服務頁: <https://www.qingyuweb.com/services>
- GitHub: <https://github.com/QingyuJin/ai-tech-quest>

## Best Demo Route

1. Open `https://ai-tech-quest.vercel.app/demo`.
2. Explain this is an interactive AI product showcase, not a static portfolio.
3. Open the RAG mission.
4. Ask `營業時間是什麼？`.
5. Ask `老闆帥嗎？` to show humorous fallback with data boundaries.
6. Open the ML mission and complete one classification.
7. Open the Business mission and ask one FAQ question.
8. Use quick unlock and show the Portfolio room.
9. End at `https://www.qingyuweb.com/services`.

## Client Pitch

I build interactive AI applications, RAG document QA systems, full-stack demos, LINE Bot workflows, and business automation dashboards for small teams and service businesses.

## Current Status

The public frontend and main site are deployed. The backend API is complete locally and Render-ready. The demo is mock-first by design, so it can be shown without API keys, OpenAI costs, or unstable model output.

## Next Upgrade

Deploy the FastAPI backend to Render, set `VITE_API_BASE_URL` in Vercel, then replace mock RAG / ML / FAQ services with real implementations step by step.
