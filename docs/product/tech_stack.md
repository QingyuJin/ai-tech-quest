# Tech Stack

## Recommended Route

### Phase 1: Web Interactive MVP

Frontend:

- React
- Vite
- Tailwind CSS
- Framer Motion
- Zustand
- React Router

Backend:

- FastAPI
- Pydantic
- In-memory mock store first
- SQLite planned
- Optional AI API later

Deploy:

- Vercel for frontend
- Render / Railway / Fly.io for backend

Why this route:

- Fastest path to a shareable demo.
- Strongest fit for a technical portfolio.
- Easy to iterate with Codex.
- Good bridge into freelance demos and case studies.

### Phase 2: Unity WebGL Mission

Unity:

- Unity 2D
- C#
- WebGL Build
- UI Toolkit or Canvas
- REST API integration

Why Unity comes later:

- WebGL deployment and UI polish take more time.
- The web MVP should prove the mission content first.
- Unity can then rebuild the most visually memorable mission.

## Monorepo Architecture

```text
ai-tech-quest/
├── apps/
│   ├── frontend-web/
│   │   ├── React interactive game
│   │   ├── levels
│   │   ├── portfolio unlock
│   │   └── UI animations
│   └── backend-api/
│       ├── health API
│       ├── mission API
│       ├── RAG mock API
│       ├── ML demo API
│       └── business assistant API
├── unity/
│   └── webgl/
│       ├── Unity 2D scene
│       ├── AI guide
│       └── API connector
├── docs/
│   ├── product/
│   └── strategy/
├── assets/
│   ├── interactive-showcase/
│   └── shared/
└── portfolio-modules/
    ├── ai-business-assistant/
    ├── tw-civic-rag/
    ├── unity-ai-tutor/
    ├── ml-experiment-lab/
    └── portfolio-website/
```
