# AI Tech Quest API Design

This document defines the first backend contract for AI Tech Quest.

The current implementation is mock-first, but the request and response shapes are intentionally close to the future production design. Frontend services should call these endpoints through feature-level service abstractions instead of importing backend-specific code.

## Base URL

Local development:

```text
http://127.0.0.1:8000
```

Frontend API mode:

```env
VITE_BUSINESS_SERVICE_MODE=api
VITE_API_BASE_URL=http://127.0.0.1:8000
```

## Health

### GET `/health`

Checks whether the API process is alive.

Response:

```json
{
  "status": "ok",
  "service": "ai-tech-quest-api"
}
```

## Missions

### GET `/missions`

Returns mission metadata for the mission select screen.

Response:

```json
[
  {
    "id": "rag",
    "title": "RAG Document Investigator",
    "route": "/missions/rag",
    "summary": "Document QA with source citations.",
    "stack": ["RAG", "Embedding", "Vector Search", "Citation"]
  }
]
```

## RAG Mission

### POST `/rag/ask`

Mock endpoint for a future RAG pipeline.

Request:

```json
{
  "question": "Can I book a seat?",
  "document_id": "qingyu-cafe-info"
}
```

Response:

```json
{
  "answer": "Mock retrieval answer.",
  "confidence": "medium",
  "sources": [
    {
      "source_id": "Source 1",
      "heading": "Business hours",
      "snippet": "Relevant retrieved snippet."
    }
  ],
  "cited_snippets": ["Relevant retrieved snippet."]
}
```

Future implementation:

- `document_id` maps to an indexed document collection.
- Service layer chunks documents, embeds chunks, retrieves relevant candidates, and returns cited snippets.
- Response should include retrieval confidence and traceable source IDs.

## ML Mission

### POST `/ml/predict`

Mock endpoint for a future model prediction service.

Request:

```json
{
  "sample_id": "unknown-01",
  "activity_score": 72,
  "consistency_score": 64
}
```

Response:

```json
{
  "model_prediction": "B",
  "confidence": 0.88,
  "explanation": "Threshold-based mock model explanation.",
  "accuracy": 87,
  "confusion_matrix": [
    {
      "actual": "A",
      "predicted": {
        "A": 24,
        "B": 3,
        "C": 1
      }
    }
  ]
}
```

Future implementation:

- Load a trained sklearn model artifact from `services/ml_service.py`.
- Keep preprocessing and feature validation in the service layer.
- Add model version, dataset version, and evaluation metadata when the demo matures.

## Business Mission

### GET `/business/faqs`

Returns the current FAQ knowledge base.

Response:

```json
[
  {
    "id": "faq-hours",
    "question": "What are the business hours?",
    "answer": "Weekdays 10:00-20:00, weekends 09:00-21:00.",
    "tags": ["hours", "weekend"]
  }
]
```

### POST `/business/faqs`

Creates a FAQ entry.

Request:

```json
{
  "question": "Do you have power outlets?",
  "answer": "Window seats and the work area have outlets.",
  "tags": ["power", "seat", "work"]
}
```

Response:

```json
{
  "id": "faq-generated-id",
  "question": "Do you have power outlets?",
  "answer": "Window seats and the work area have outlets.",
  "tags": ["power", "seat", "work"]
}
```

### POST `/business/ask`

Answers a customer question by matching against FAQs.

Request:

```json
{
  "question": "Can I charge my laptop?"
}
```

Response:

```json
{
  "answer": "Window seats and the work area have outlets.",
  "confidence": "high",
  "matched_faq": {
    "id": "faq-power",
    "question": "Do you have power outlets?",
    "answer": "Window seats and the work area have outlets."
  },
  "matched_tags": ["power"],
  "action": "Matched FAQ. Reply to customer and log topic."
}
```

Future implementation:

- Store FAQs and question logs in a real database.
- Add semantic matching with embeddings.
- Add LLM fallback only when FAQ confidence is low.
- Add business channels such as LINE Bot, website chat, or form inbox automation.
