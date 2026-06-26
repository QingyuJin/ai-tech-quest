# Reserved Backend App Workspace

This folder is reserved for a future migration to a conventional `apps/backend-api` monorepo layout.

The current active FastAPI backend lives in:

```text
00_Core_Interactive_Showcase/backend_api
```

Use the active path for development, API docs, and tests:

```powershell
cd 00_Core_Interactive_Showcase/backend_api
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

This reserved folder should not be treated as the source of truth until the migration is intentionally completed.
