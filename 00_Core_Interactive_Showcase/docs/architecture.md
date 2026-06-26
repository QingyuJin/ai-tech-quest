# Core Showcase Architecture

`00_Core_Interactive_Showcase` is the active implementation of AI Tech Quest.

It contains the playable React mission experience, the mock-first FastAPI backend, and the product/technical documentation needed to grow the project into a full portfolio platform.

## Product Shape

```text
Visitor enters AI Tech Quest
  -> completes RAG mission
  -> completes ML mission
  -> completes Business Assistant mission
  -> unlocks portfolio projects
```

## Runtime Parts

```text
frontend_web/   React interactive showcase
backend_api/    FastAPI API contracts and mock services
docs/           Architecture, API, deployment, and Unity planning
```

## Frontend Responsibilities

- Present the mission-based game flow.
- Store mission progress in localStorage.
- Keep each mission isolated in its own feature folder.
- Use mock services first, with API-ready service boundaries.
- Present the final portfolio unlock page.

## Backend Responsibilities

- Expose stable API contracts.
- Keep route handlers thin.
- Centralize logic in service modules.
- Return realistic mock data that can later be replaced by real services.

## Extension Points

- RAG: replace mock answer with document ingestion, embeddings, vector search, and citation generation.
- ML: replace threshold model with a trained classifier or model-serving endpoint.
- Business: replace in-memory FAQ data with a database, logs, semantic matching, and LLM fallback.
- Unity: add a WebGL learning mission and connect it to the same progress/portfolio flow.
