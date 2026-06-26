# Backend Architecture

The backend exists to give AI Tech Quest a stable API boundary before connecting real AI systems.

The goal is not to hide everything behind one controller. Each mission has a dedicated service boundary so mock logic can be replaced with production logic without changing the frontend page structure.

## Current Layers

```text
HTTP request
  -> router
  -> Pydantic schema validation
  -> service function
  -> mock data store
  -> Pydantic response
```

## Directory Responsibilities

```text
backend_api/app/
|-- main.py        FastAPI app factory, middleware, router registration.
|-- routers/       HTTP routes grouped by product domain.
|-- schemas/       Pydantic request and response contracts.
|-- services/      Business logic and integration boundaries.
|-- models/        Internal domain objects.
`-- data/          Temporary in-memory mock store.
```

## Mission Boundaries

### RAG

Current:

- Accepts a question and `document_id`.
- Returns a mock answer, confidence, sources, and cited snippets.

Future:

- Document ingestion pipeline.
- Chunking and metadata extraction.
- Embedding generation.
- Vector search.
- Optional reranking.
- Source-grounded answer synthesis.

### ML

Current:

- Accepts numeric features.
- Returns a threshold-based mock prediction, confidence, explanation, accuracy, and confusion matrix.

Future:

- Load a trained model artifact.
- Validate feature schema.
- Track model and dataset versions.
- Return model explanations and evaluation metrics.

### Business Assistant

Current:

- Stores FAQ entries in memory.
- Scores customer questions against FAQ tags and question text.
- Returns answer, confidence, matched FAQ, matched tags, and recommended action.

Future:

- Persist FAQs and customer question logs.
- Add semantic search with embeddings.
- Add LLM fallback for low-confidence questions.
- Add integrations such as LINE Bot, website chat, and email/form automation.

## Replacement Strategy

Keep router contracts stable. Replace the implementation behind services.

Examples:

- `rag_service.ask_rag()` can call a vector database without changing `/rag/ask`.
- `ml_service.predict()` can load a sklearn model without changing `/ml/predict`.
- `business_service.answer_business_question()` can combine FAQ database lookup, vector search, and LLM fallback without changing `/business/ask`.

## Testing Plan

Short term:

- Smoke test every route.
- Validate schema errors for missing required fields.
- Test FAQ creation and matching behavior.

Medium term:

- Add service-level tests for RAG retrieval ranking and citation traceability.
- Add ML prediction contract tests with fixed fixtures.
- Add database integration tests after replacing the in-memory store.

Long term:

- Add end-to-end tests from frontend mission actions to backend responses.
- Add observability for latency, confidence, and fallback rate.
