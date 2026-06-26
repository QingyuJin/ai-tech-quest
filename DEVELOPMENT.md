# Development

This repo now has two layers:

1. Product-line documentation folders from `00_` to `99_`.
2. The current AI Tech Quest product frontend in `01_AI_Tech_Quest/frontend_web`, with the legacy full-stack reference in `00_Core_Interactive_Showcase`.

Do not move the legacy full-stack reference until a deliberate migration is planned.

## Active MVP Setup

AI Tech Quest product frontend:

```powershell
cd 01_AI_Tech_Quest/frontend_web
npm install
npm run dev
```

Legacy full-stack showcase frontend:

Frontend:

```powershell
cd 00_Core_Interactive_Showcase/frontend_web
npm install
npm run dev
```

Backend:

```powershell
cd 00_Core_Interactive_Showcase/backend_api
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Quality checks:

```powershell
cd 00_Core_Interactive_Showcase/frontend_web
npm run lint
npm run build

cd ../backend_api
.\.venv\Scripts\python.exe -m pytest
```

## Product Folder Rules

Each product folder must keep a README with:

- Product Name
- Problem
- Target Users
- Core Features
- Tech Stack
- MVP Scope
- Monetization
- Roadmap

## Product Priority Rules

- `01_AI_Tech_Quest` is the main product.
- `02_AI_Business_Assistant` is the first monetizable client product.
- `03_TW_Civic_RAG` is the high-technical-depth AI product.
- `04_BuildFlow` connects to `qingyu-web-studio`.
- `05_Unity_AI_Tutor` is the interactive learning product.
- `06_ML_Experiment_Lab` supports research and evidence only.
- `07_Portfolio_Website` is the public case study and contact layer.
- `99_Background_Skills` stores older programming fundamentals only.

## Implementation Rules

- Keep frontend feature logic inside feature folders.
- Keep backend route handlers thin.
- Use service boundaries for future real RAG, ML, database, and LLM integrations.
- Keep mock behavior explicit.
- Do not present research notebooks or old coursework as flagship products.
- Prefer product case studies over raw code dumps when preparing GitHub presentation.

## Migration Notes

Future code can move into product folders when each product becomes independently deployable.

Recommended order:

1. Keep the AI Tech Quest product frontend in `01_AI_Tech_Quest/frontend_web`.
2. Build AI Business Assistant backend persistence.
3. Split AI Business Assistant into its own repo only after it has a complete demo.
4. Build TW Civic RAG as a technical case study.
5. Add Unity AI Tutor after the web product is stable.
