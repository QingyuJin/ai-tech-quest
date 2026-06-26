# Services

Services own the mission logic and integration boundaries.

Current services are mock-first:

- `rag_service.py` returns source-grounded mock RAG answers.
- `ml_service.py` returns mock classifier predictions and metrics.
- `business_service.py` performs FAQ matching for customer questions.
- `mission_service.py` exposes mission metadata.

Future real implementations should replace these internals while keeping router contracts stable.
