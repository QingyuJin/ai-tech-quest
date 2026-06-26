# Final QA Checklist

最後更新日期：2026-06-27

## Public Links

- AI Tech Quest Demo: <https://ai-tech-quest.vercel.app>
- AI Tech Quest Demo Mode: <https://ai-tech-quest.vercel.app/demo>
- Main Site: <https://www.qingyuweb.com>
- Services Page: <https://www.qingyuweb.com/services>
- AI Tech Quest GitHub: <https://github.com/QingyuJin/ai-tech-quest>
- Qingyu Web Studio GitHub: <https://github.com/QingyuJin/qingyu-web-studio>

## Local Checks

Frontend:

```powershell
cd 01_AI_Tech_Quest/frontend_web
npm run lint
npm run build
```

Backend:

```powershell
cd 01_AI_Tech_Quest/backend_api
.\.venv\Scripts\python.exe -m pytest
.\.venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8010
```

Main site:

```powershell
cd C:\Users\USER\Desktop\qingyu-web-studio
npm run lint
npm run build
```

## Demo Flow

1. Open `/demo`.
2. Explain product positioning.
3. Open RAG mission and ask:
   - `營業時間是什麼？`
   - `老闆帥嗎？`
4. Open ML mission and complete one classification.
5. Open Business mission and ask:
   - `可以用 LINE 預約嗎？`
   - `老闆帥嗎？`
6. Use demo quick unlock if needed.
7. Open Portfolio room.
8. End at `qingyuweb.com/services`.

## Current Completion Status

- Frontend MVP: complete and deployed.
- Guided demo mode: complete and deployed.
- RAG mission: mock complete.
- ML mission: mock complete.
- Business assistant mission: mock complete.
- Portfolio room: complete.
- Main site service entry: complete and deployed.
- Backend API: local complete and Render-ready.
- Real Render backend URL: external account step, not required for mock-first frontend demo.

## Final Verification Run

Ran on 2026-06-27:

- AI Tech Quest frontend `npm run lint`: passed.
- AI Tech Quest frontend `npm run build`: passed.
- AI Tech Quest backend `pytest`: 8 passed.
- Qingyu Web Studio `npm run lint`: passed.
- Qingyu Web Studio `npm run build`: passed.
- `https://ai-tech-quest.vercel.app/`: HTTP 200.
- `https://ai-tech-quest.vercel.app/demo`: HTTP 200.
- `https://www.qingyuweb.com/`: HTTP 200.
- `https://www.qingyuweb.com/services`: HTTP 200.

## Known Mock Boundaries

- RAG uses mock chunk scoring, not real embeddings yet.
- ML uses mock rule-based prediction, not a trained model yet.
- Business FAQ uses localStorage / in-memory data, not Supabase yet.
- OpenAI API is intentionally not connected yet.
- LINE Bot production integration is not enabled in AI Tech Quest yet.

## Ready For

- GitHub portfolio.
- Resume link.
- Interview walkthrough.
- First client conversations.
- Service page traffic from `qingyuweb.com`.
- Next-stage backend deployment on Render.
