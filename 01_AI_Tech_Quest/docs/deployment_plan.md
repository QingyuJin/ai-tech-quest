# AI Tech Quest Deployment Plan

This plan documents the current frontend and backend deployment path.

## Frontend

- Platform: Vercel
- Project URL: `https://ai-tech-quest.vercel.app`
- Root Directory: `01_AI_Tech_Quest/frontend_web`
- Build Command: `npm run build`
- Output Directory: `dist`

## Backend

- Recommended platform: Render Web Service
- Root Directory: `01_AI_Tech_Quest/backend_api`
- Build Command: `pip install -r requirements.txt`
- Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- Health Check Path: `/health`

Required environment variables:

```text
PYTHON_VERSION=3.12.5
CORS_ORIGINS=https://ai-tech-quest.vercel.app,https://www.qingyuweb.com
```

## Render Blueprint

The repo root includes:

```text
render.yaml
```

Use Render Blueprint if available. Otherwise create a manual Web Service using the same settings above.

## Frontend API Mode

After the backend is deployed, set this Vercel environment variable on the AI Tech Quest frontend:

```text
VITE_API_BASE_URL=https://YOUR_RENDER_URL
```

Then redeploy the frontend.

## Smoke Tests

```powershell
$API="https://YOUR_RENDER_URL"
Invoke-WebRequest -UseBasicParsing "$API/"
Invoke-WebRequest -UseBasicParsing "$API/health"
Invoke-WebRequest -UseBasicParsing "$API/docs"
Invoke-WebRequest -UseBasicParsing "$API/rag/ask" -Method Post -ContentType "application/json" -Body '{"question":"營業時間是什麼？","top_k":2}'
Invoke-WebRequest -UseBasicParsing "$API/rag/ask" -Method Post -ContentType "application/json" -Body '{"question":"老闆帥嗎？","top_k":2}'
```

Expected result:

- `/` returns API metadata.
- `/health` returns `status: ok`.
- `/docs` opens FastAPI docs.
- `/rag/ask` returns Chinese mock RAG answers with confidence and sources.

## Current Mock Boundaries

- RAG is keyword/tag matching, not a real vector search pipeline yet.
- ML prediction is a rule-based mock model.
- Business FAQ data is in-memory and resets on backend restart.
- No OpenAI key, vector database, or Supabase backend is required for this deployment step.
