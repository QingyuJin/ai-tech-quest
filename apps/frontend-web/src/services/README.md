# Services

Service boundary for mock and future backend calls.

Current implementation:

- `mockApi.js` simulates RAG, ML, and business assistant responses.

Future implementation:

- Add a shared `apiClient`.
- Replace mock functions with FastAPI calls.
- Keep page components focused on UI state and presentation.
