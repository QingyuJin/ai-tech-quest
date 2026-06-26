# AI Tech Quest Backend API

FastAPI backend for AI Tech Quest.

This API is mock-first by design. It gives the frontend stable contracts now, while keeping the service layer ready for a real database, RAG pipeline, ML model, and AI assistant later.

## Structure

```text
backend_api/
|-- app/
|   |-- main.py
|   |-- routers/
|   |-- services/
|   |-- schemas/
|   |-- models/
|   `-- data/
|-- tests/
|-- requirements.txt
`-- README.md
```

## Setup

```powershell
cd 00_Core_Interactive_Showcase/backend_api
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

API docs:

```text
http://127.0.0.1:8000/docs
```

Run tests:

```powershell
.\.venv\Scripts\python.exe -m pytest
```

## Endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/health` | Runtime health check. |
| GET | `/missions` | Mission metadata for the frontend. |
| POST | `/rag/ask` | Mock RAG answer with citations. |
| POST | `/ml/predict` | Mock ML classification result. |
| GET | `/business/faqs` | List business FAQ entries. |
| POST | `/business/faqs` | Create a new FAQ entry. |
| POST | `/business/ask` | Answer a customer question from FAQ matching. |

## Design

- `routers/` owns HTTP paths and response models.
- `schemas/` owns Pydantic request and response contracts.
- `services/` owns mission logic and future integration points.
- `models/` owns internal domain objects.
- `data/` currently owns in-memory mock storage.

## Future Replacement Points

- Replace `app/data/mock_store.py` with SQLite, PostgreSQL, or another data layer.
- Replace `app/services/rag_service.py` with document chunking, embedding, vector search, reranking, and citation logic.
- Replace `app/services/ml_service.py` with a trained sklearn model artifact, Colab-exported model, or model-serving endpoint.
- Extend `app/services/business_service.py` with persistent customer question logs, LLM fallback, and LINE Bot integration.
