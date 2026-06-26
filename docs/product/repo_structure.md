# Repo Structure

AI Tech Quest is organized as a monorepo because the product is more than a single web page. It includes a playable React frontend, a FastAPI backend, future Unity WebGL work, product documentation, visual assets, and portfolio modules.

## Top-Level Folders

```text
ai-tech-quest/
├── apps/
├── unity/
├── docs/
├── assets/
├── portfolio-modules/
├── templates/
├── project_manifest.json
└── README.md
```

## Folder Ownership

### `apps/frontend-web`

Owns the React interactive mission experience.

Use it for:

- Home, mission select, mission pages, and portfolio unlock.
- Shared UI components.
- Mock frontend service boundaries.
- Future API clients.

### `apps/backend-api`

Owns the FastAPI service layer.

Use it for:

- API routes.
- Pydantic schemas.
- Mock services.
- Future RAG, ML, FAQ database, and AI assistant logic.

### `unity/webgl`

Owns future Unity WebGL implementation.

Use it for:

- Unity scene files.
- C# mission logic.
- WebGL build notes.
- Unity-to-FastAPI integration notes.

### `docs/product`

Owns product and engineering documentation.

Use it for:

- Architecture.
- API design.
- Level design.
- Roadmap.
- Build prompts.

### `docs/strategy`

Owns positioning and portfolio strategy.

Use it for:

- Master roadmap.
- Skill matrix.
- Pricing strategy.
- Portfolio copy.

### `assets`

Owns visual material.

Use it for:

- Screenshots.
- Diagrams.
- Logos.
- AI Guide art.
- README media.

### `portfolio-modules`

Owns related project modules that can later become standalone repos.

Use it for:

- AI Business Assistant.
- TW Civic RAG.
- Unity AI Tutor.
- ML Experiment Lab.
- Portfolio Website.

### `templates`

Owns reusable documentation templates.

Use it for:

- Project README templates.
- Experiment reports.
- Case study templates.

## Naming Rule

External-facing names should use clear kebab-case:

```text
ai-tech-quest
frontend-web
backend-api
tw-civic-rag
ai-business-assistant
unity-ai-tutor
ml-experiment-lab
portfolio-website
```

Avoid numbered folder names in the public repo because they look like coursework or a local planning workspace.
