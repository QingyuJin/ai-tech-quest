# AI Tech Quest Architecture

## Goal

AI Tech Quest is the interactive entry point for Qingyu AI Lab. It should feel like a polished technical portfolio and a lightweight game, while the codebase remains ready to grow into real RAG, ML, AI business assistant, Unity WebGL, and portfolio website integrations.

## Monorepo Overview

```text
ai-tech-quest/
├── apps/
│   ├── frontend-web/
│   │   ├── React route-level pages
│   │   ├── reusable mission components
│   │   ├── mock service boundary
│   │   └── Zustand progress store
│   └── backend-api/
│       ├── FastAPI routers
│       ├── Pydantic schemas
│       ├── mock services
│       └── future DB / RAG / ML adapters
├── unity/
│   └── webgl/
│       └── future Unity 2D WebGL mission
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

## Frontend Layers

```text
pages -> features/components -> services -> data/store
```

- `pages` own route-level composition and local UI state.
- `components` provide shared UI primitives and mission presentation.
- `features` hold domain-specific UI as each mission grows.
- `services` simulate API behavior now and become backend clients later.
- `stores` keep mission completion, portfolio unlock, and local FAQ state.
- `data` keeps mock data separate from UI.

## Backend Layers

```text
routers -> schemas -> services -> models/db
```

- `routers` define HTTP endpoints.
- `schemas` define public request and response shapes.
- `services` hold domain logic and integration boundaries.
- `models` are internal records for service behavior.
- `db` currently contains an in-memory mock store and later becomes SQLite, hosted database, or vector store adapters.

## Future RAG Architecture

Target pipeline:

```text
document source
-> parsing
-> chunking
-> embedding
-> vector store
-> retrieval
-> answer generation
-> citation verification
-> evaluation logs
```

Replacement point:

- Replace `apps/backend-api/app/services/rag_service.py`.
- Add `apps/backend-api/app/db/vector_store.py` when a vector database is chosen.
- Keep `POST /rag/ask` response compatible with citations.

## Future ML Demo Architecture

Target pipeline:

```text
Colab / experiment output
-> saved metrics or model artifact
-> FastAPI inference or result reader
-> frontend visualization
```

Replacement point:

- Replace `apps/backend-api/app/services/ml_service.py`.
- Add model artifacts outside source control when needed.
- Add experiment metadata endpoints after the first real ML demo is selected.
- Use `portfolio-modules/ml-experiment-lab` for reports and experiment context.

## Future AI Business Assistant Architecture

Target pipeline:

```text
FAQ admin
-> database
-> FAQ retrieval
-> AI fallback
-> customer answer
-> logs and analytics
```

Replacement point:

- Replace `apps/backend-api/app/db/mock_store.py` with SQLite first.
- Add audit logs after the FAQ flow is stable.
- Add OpenAI integration only after deterministic FAQ matching works.
- Use `portfolio-modules/ai-business-assistant` for product packaging and case study material.

## Future Unity WebGL Architecture

Unity should not duplicate backend logic. It should call FastAPI endpoints for AI hints, mission status, and answer evaluation.

```text
unity/webgl
-> REST API client
-> FastAPI unity router
-> shared services
-> AI hint / checking logic
```

First Unity mission should be Digital Logic Gate Lab because it demonstrates C# interaction, state management, drag and drop, truth-table checking, and AI tutoring without requiring a large game world.
