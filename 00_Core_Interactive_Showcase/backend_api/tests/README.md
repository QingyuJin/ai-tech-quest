# Backend Tests

Run tests from `backend_api/`:

```powershell
.\.venv\Scripts\python.exe -m pytest
```

Current smoke coverage:

- `GET /health` returns `ok`.
- `GET /missions` returns the three mission IDs.
- `POST /rag/ask` returns an answer with sources.
- `POST /ml/predict` returns prediction and evaluation fields.
- `POST /business/faqs` creates a new FAQ in memory.
- `POST /business/ask` returns a matched FAQ when possible.
