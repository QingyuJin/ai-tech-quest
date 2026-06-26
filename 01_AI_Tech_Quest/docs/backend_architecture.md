# AI Tech Quest Backend Architecture

The backend is designed as a mock-first FastAPI service with clean replacement points. The goal is to make the API usable today while preserving a path to real AI infrastructure.

## Layering

```text
HTTP request
  -> router
  -> schema validation
  -> service
  -> in-memory data
  -> schema response
```

## Folders

```text
app/main.py
```

Creates the FastAPI app, configures CORS, and includes routers.

```text
app/routers/
```

HTTP boundary. Routers should stay thin and delegate business logic to services.

```text
app/schemas/
```

Pydantic request and response contracts. These are the API surface area used by the frontend.

```text
app/services/
```

Application logic. The current services are mock implementations, but this is where real RAG, ML, and assistant adapters will be swapped in.

```text
app/models/
```

Domain models. These are intentionally lightweight now and can evolve into ORM models or persistence entities later.

```text
app/data/
```

In-memory seed data for the mock services.

```text
tests/
```

API contract tests using FastAPI TestClient.

## Current Services

### Mission Service

Returns mission metadata used by AI Tech Quest frontend cards.

Future path:

- Store mission config in a CMS, database, or static config file.
- Add published/draft status.

### RAG Service

Uses tag and heading scoring against in-memory document chunks.

Future path:

- Add document ingestion.
- Add chunk metadata.
- Generate embeddings.
- Query vector database.
- Use LLM answer generation with citations.
- Add evaluation and source coverage metrics.

### ML Service

Uses threshold rules to classify activity and consistency scores.

Future path:

- Load sklearn model artifact.
- Serve predictions through a model adapter.
- Track model version.
- Add feature validation.
- Add explainability output.

### Business Service

Uses in-memory FAQ data and keyword/tag matching.

Future path:

- Replace memory with SQLite, PostgreSQL, or Supabase.
- Add FAQ edit/delete.
- Add question logs and analytics.
- Add semantic search.
- Add LLM fallback with strict grounding.
- Add LINE Bot integration.

## Data Persistence Strategy

The current API intentionally does not persist data after restart. This keeps the MVP simple and safe.

Recommended upgrade order:

1. SQLite for local persistence and demos.
2. PostgreSQL or Supabase for deployed product demos.
3. Vector database for RAG and semantic FAQ matching.
4. Object storage for documents and model artifacts.

## Frontend Integration Strategy

The frontend should keep its existing service abstractions:

- `ragService.ask(question)`
- `mlService.predict(sample)`
- `businessService.getFaqs()`
- `businessService.addFaq(payload)`
- `businessService.ask(question)`

Each frontend service can later switch between mock mode and API mode without rewriting page components.

## Deployment Notes

Early deployment can use:

- Render
- Railway
- Fly.io
- Azure App Service
- Any container host that supports FastAPI + Uvicorn

The repo root includes `render.yaml` for Render Blueprint deployment:

```text
rootDir: 01_AI_Tech_Quest/backend_api
buildCommand: pip install -r requirements.txt
startCommand: uvicorn app.main:app --host 0.0.0.0 --port $PORT
healthCheckPath: /health
```

The API exposes `/` for quick service metadata, `/health` for uptime checks, and `/docs` for FastAPI interactive API docs.

Production should add:

- Environment-based CORS.
- Structured logging.
- Error monitoring.
- Database migrations.
- Authentication for admin-only endpoints.
