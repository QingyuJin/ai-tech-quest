# Development Plan

## Current Baseline

The repo now has a formal `ai-tech-quest` monorepo structure:

- `apps/frontend-web`: React + Vite + Tailwind interactive mission UI.
- `apps/backend-api`: FastAPI mock-first API architecture.
- `unity/webgl`: planned Unity WebGL mission.
- `docs/product`: architecture, API, level design, prompts, and development plan.
- `docs/strategy`: roadmap, skill matrix, pricing, and portfolio positioning.
- `assets`: shared and AI Tech Quest-specific visual assets.
- `portfolio-modules`: future standalone portfolio projects that AI Tech Quest can unlock.

Repository owner:

```text
https://github.com/QingyuJin
```

Planned repo names:

```text
ai-tech-quest
tw-civic-rag
ai-business-assistant
unity-ai-tutor
ml-experiment-lab
```

## Phase 1: Web MVP Polish

Focus:

- Verify responsive layout on desktop and mobile.
- Add screenshots for README.
- Add basic frontend tests or Playwright smoke tests.
- Decide whether the demo frontend should use mock services or real FastAPI endpoints.

Recommended output:

- Deployable Vercel frontend.
- Hosted backend health endpoint.
- README with screenshots and demo GIF.

## Phase 2: RAG Mission Upgrade

Focus:

- Add document upload or fixed sample documents.
- Implement chunking.
- Add embedding and vector store.
- Return answers with citations.
- Track citation correctness and unknown handling.

Recommended stack:

- FastAPI
- Chroma or FAISS for local demo
- OpenAI embeddings or another embedding provider
- Evaluation table based on `portfolio-modules/tw-civic-rag/docs/evaluation_plan.md`

## Phase 3: Business Assistant Upgrade

Focus:

- Replace in-memory FAQ with SQLite.
- Add edit/delete FAQ.
- Add customer question log.
- Add OpenAI fallback after FAQ matching.
- Prepare a fake Qingyu Cafe demo flow and pricing story.

Recommended output:

- Case study page.
- Demo video.
- Basic / Standard / Pro package mapping.

## Phase 4: ML Mission Upgrade

Focus:

- Choose one real ML experiment from `portfolio-modules/ml-experiment-lab`.
- Export metrics and model predictions.
- Visualize baseline vs improved method.
- Add error analysis view.

Recommended output:

- One high-quality notebook.
- One interactive frontend summary.
- One case-study style report.

## Phase 5: Unity WebGL Mission

Focus:

- Build Digital Logic Gate Lab in Unity 2D.
- Add drag-and-drop gates.
- Add truth table checker.
- Add AI hint API.
- Embed WebGL demo in portfolio.

Recommended output:

- One playable WebGL mission.
- Short video demo.
- C# architecture notes.

## Phase 6: Portfolio Website Integration

Focus:

- Connect AI Tech Quest to the portfolio website.
- Replace placeholders with real links.
- Add case studies, screenshots, and contact CTA.
- Prepare deployment and GitHub cleanup.
