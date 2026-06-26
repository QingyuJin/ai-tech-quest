# AI Tech Quest API Design

This document defines the backend API contract for AI Tech Quest. The current implementation is mock-first, but endpoint shapes are designed to survive future upgrades to real RAG, ML, database, and assistant systems.

## Base URL

Local development:

```text
http://127.0.0.1:8000
```

Interactive docs:

```text
http://127.0.0.1:8000/docs
```

## Endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/health` | Check API status. |
| GET | `/missions` | Return mission metadata for the frontend. |
| POST | `/rag/ask` | Ask a document-grounded RAG question. |
| POST | `/ml/predict` | Predict a class for a user behavior sample. |
| GET | `/business/faqs` | Return FAQ records for AI Business Assistant. |
| POST | `/business/faqs` | Create a new FAQ record. |
| POST | `/business/ask` | Ask a customer question against FAQ knowledge. |

## RAG Contract

Request:

```json
{
  "question": "Do you have power outlets?",
  "top_k": 2
}
```

Response:

```json
{
  "answer": "According to the outlet-information chunk...",
  "confidence": "high",
  "sources": [
    {
      "source_id": "Source 1",
      "heading": "Outlet Information",
      "chunk_id": "chunk-power",
      "snippet": "Most window seats...",
      "relevance": 0.86
    }
  ],
  "cited_snippets": ["Most window seats..."],
  "retrieval_trace": "1 relevant chunk(s) retrieved from Qingyu Cafe Business Info."
}
```

Future upgrade path:

- Document ingestion.
- Chunking pipeline.
- Embedding model.
- Vector database.
- LLM answer generation.
- Citation validation.
- Hallucination control and fallback routing.

## ML Contract

Request:

```json
{
  "sample_id": "unknown-user-01",
  "activity_score": 76,
  "consistency_score": 64,
  "correct_label": "B"
}
```

Response:

```json
{
  "sample_id": "unknown-user-01",
  "model_prediction": "B",
  "correct_label": "B",
  "confidence": 0.9,
  "explanation": "The mock model predicts B...",
  "features": {
    "activity_score": 76,
    "consistency_score": 64
  },
  "evaluation": {
    "accuracy": 87,
    "confusion_matrix": [],
    "error_analysis": "Most errors happen near boundaries..."
  }
}
```

Future upgrade path:

- Replace threshold logic with sklearn or another trained model.
- Load model artifacts from `models/` or object storage.
- Add model versioning.
- Add evaluation snapshots.
- Add explainability metadata.

## Business Assistant Contract

Create FAQ request:

```json
{
  "question": "Can customers book workshops?",
  "answer": "Yes. Workshop booking is available through LINE.",
  "tags": ["workshop", "booking", "line"]
}
```

Ask request:

```json
{
  "question": "Can I book a workshop through LINE?"
}
```

Ask response:

```json
{
  "answer": "Yes. Workshop booking is available through LINE.",
  "confidence": "high",
  "matched_faq": {
    "id": "faq-1234abcd",
    "question": "Can customers book workshops?",
    "answer": "Yes. Workshop booking is available through LINE.",
    "tags": ["workshop", "booking", "line"]
  },
  "matched_tags": ["workshop", "line"],
  "action": "Auto-reply with the matched FAQ and store the question for analytics."
}
```

Future upgrade path:

- SQLite or Supabase FAQ persistence.
- FAQ edit/delete endpoints.
- Question log table.
- Semantic FAQ matching.
- LLM fallback with grounding.
- LINE Bot and website chat integrations.

## Compatibility Notes

The frontend currently uses local mock services. When switching to API mode, keep frontend adapters responsible for mapping UI-specific camelCase state to backend snake_case contracts.
