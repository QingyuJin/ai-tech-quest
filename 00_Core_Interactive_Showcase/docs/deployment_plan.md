# Deployment Plan

AI Tech Quest should be deployable in stages. The MVP can ship as a static frontend first, then add a hosted API when real services are connected.

## Stage 1: Static Frontend Demo

Recommended targets:

- Vercel
- Netlify
- GitHub Pages with a Vite adapter

Build command:

```powershell
cd 00_Core_Interactive_Showcase/frontend_web
npm install
npm run build
```

Output:

```text
dist/
```

This stage can keep all mission behavior in mock mode.

## Stage 2: Backend API Demo

Recommended targets:

- Render
- Railway
- Fly.io
- Cloud Run

Start command:

```powershell
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

Backend path:

```text
00_Core_Interactive_Showcase/backend_api
```

Frontend environment:

```env
VITE_BUSINESS_SERVICE_MODE=api
VITE_API_BASE_URL=https://your-api-host.example.com
```

## Stage 3: Real Data and AI Services

Add managed services when replacing mocks:

- Database for FAQ and question logs.
- Vector database for RAG retrieval.
- Object storage for documents and demo assets.
- LLM provider key management.
- Basic observability for latency and error rates.

## Stage 4: Public Portfolio Release

Before public release:

- Replace demo placeholders.
- Replace GitHub placeholders with real repos once created.
- Add screenshots and video walkthrough.
- Add case studies for the four project cards.
- Confirm mobile layout on common viewport widths.
- Add privacy notes if user questions or documents are stored.
