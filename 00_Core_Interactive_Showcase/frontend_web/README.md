# AI Tech Quest Frontend MVP

Interactive React MVP for AI Tech Quest.

This frontend is a deployable mission-based showcase for Qingyu AI Lab. Visitors enter the lab, complete three AI technology missions, and unlock a portfolio room.

## Features

- Home page with AI Tech Quest hero.
- Mission selection page with three mission cards.
- Level 1 RAG mission with document cards, mock retrieval, citations, and completion flow.
- Level 2 ML mission with scatter plot, player classification, mock model prediction, and evaluation.
- Level 3 Business mission with FAQ admin, customer Q&A, matching logs, and business automation use cases.
- Clear completed / pending visual states.
- Global layout with header, footer, progress indicator, AI Guide, and back-to-missions button.
- Portfolio unlock page controlled by mission completion state.
- Zustand store persisted to localStorage.
- Mock data for missions, projects, tech explanations, and guide messages.

## Portfolio Unlock Flow

The portfolio page is unlocked when all three mission IDs are completed in Zustand/localStorage.

Unlocked project cards:

- AI Business Assistant
- TW Civic RAG
- Unity AI Tutor
- ML Experiment Lab

Each card includes project name, one-line description, tech stack, what it demonstrates, demo link placeholder, GitHub link placeholder, and case study link placeholder.

Portfolio links currently point to QingyuJin placeholders:

```text
https://github.com/QingyuJin/ai-tech-quest
https://github.com/QingyuJin/ai-business-assistant
https://github.com/QingyuJin/tw-civic-rag
https://github.com/QingyuJin/unity-ai-tutor
https://github.com/QingyuJin/ml-experiment-lab
https://github.com/QingyuJin/qingyu-web-studio
```

## Tech Stack

- React
- Vite
- Tailwind CSS
- Framer Motion
- Zustand
- React Router
- Lucide React icons

## Setup

```powershell
cd 00_Core_Interactive_Showcase/frontend_web
npm install
npm run dev
```

Default local URL:

```text
http://127.0.0.1:5173
```

## Build

```powershell
npm run build
npm run preview
```

## Source Structure

```text
src/
├── app/          App root and routes
├── pages/        Home, mission select, and portfolio unlock pages
├── components/   Shared UI components
├── features/     Mission-specific feature modules
├── data/         Mock data
├── hooks/        Shared React hooks
├── store/        Zustand localStorage state
├── styles/       Tailwind and global styles
└── utils/        Small shared utilities
```

## Future Upgrade Path

- Connect RAG mission service abstraction to FastAPI `/rag/ask`.
- Connect ML mission service abstraction to FastAPI `/ml/predict`.
- Connect AI Business mission service abstraction to FastAPI `/business/*` APIs.
- Add Unity WebGL entry point when the Unity mission is ready.

## Level 1: RAG 文件調查員

Location:

```text
src/features/rag-mission
```

The first RAG mission currently uses mock data for `晴宇咖啡店家資訊`.

Current flow:

1. The user reads a document card containing business hours, address, booking method, power outlet information, and minimum order rules.
2. The user asks a question.
3. `ragService.ask(question)` simulates retrieval.
4. The answer panel shows `answer`, `confidence`, retrieval trace, and cited snippets.
5. The source panel shows expandable source cards.
6. After one successful answer, the user can click `Complete Mission`, which updates Zustand and localStorage.

Future backend integration:

```js
ragService.ask(question)
```

is the only service boundary the page depends on. Replace the mock implementation in:

```text
src/features/rag-mission/services/ragService.js
```

with a real API call to a backend endpoint such as:

```text
POST /rag/ask
```

Expected response shape:

```json
{
  "answer": "...",
  "confidence": "high",
  "sources": [],
  "citedSnippets": []
}
```

## Level 2: ML 分類挑戰

Location:

```text
src/features/ml-mission
```

The ML mission currently uses mock user behavior data with two features:

- `activity score`
- `consistency score`

Current flow:

1. The user views a 2D scatter plot with A/B/C clusters.
2. The user clicks an unknown sample.
3. The user selects A / B / C.
4. `mlService.predict(sample)` runs a mock nearest-centroid classifier.
5. The UI reveals player choice, model prediction, correct answer, confidence, accuracy, confusion matrix, and error analysis.
6. After one completed prediction, the user can click `Complete Mission`, which updates Zustand and localStorage.

Future Colab / sklearn / FastAPI integration:

```js
mlService.predict(sample)
```

is the only service boundary the page depends on. Replace the mock implementation in:

```text
src/features/ml-mission/services/mlService.js
```

with a real API call to a backend endpoint such as:

```text
POST /ml/predict
```

Recommended backend path:

1. Train or evaluate a model in Colab / sklearn.
2. Export model metrics, confusion matrix, and prediction logic.
3. Serve prediction through FastAPI.
4. Keep the frontend response shape stable: `modelPrediction`, `correctLabel`, `confidence`, `explanation`, and `evaluation`.

## Level 3: AI 店家助手

Location:

```text
src/features/business-mission
```

The Business mission currently uses local FAQ mock data and an API-switchable service layer.

Current flow:

1. The user reviews the FAQ admin panel.
2. The user adds FAQ entries with `question`, `answer`, and `tags`.
3. The customer question panel sends a question to `businessService.ask(question, faqs)`.
4. The assistant returns an answer, confidence, matched FAQ, matched tags, and action note.
5. Recent question logs show customer questions and matched FAQs.
6. After one successful answer, the user can click `Complete Mission`.

Future backend integration:

Copy `.env.example` to `.env.local` when you want the frontend to call the FastAPI service:

```text
VITE_BUSINESS_SERVICE_MODE=api
VITE_API_BASE_URL=http://127.0.0.1:8000
```

The service boundary lives here:

```text
src/features/business-mission/services/businessService.js
```

Target backend endpoints:

```text
GET /business/faqs
POST /business/faqs
POST /business/ask
```
