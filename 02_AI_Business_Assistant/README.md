# AI Business Assistant

## Product Name

AI Business Assistant.

## Problem

Small shops, studios, tutors, and local service providers repeatedly answer the same customer questions across LINE, websites, forms, and social messages. Many cannot justify a complex custom system, but they still need faster and more consistent replies.

AI Business Assistant turns reusable business knowledge into a lightweight assistant that can answer common questions, keep logs, and identify which new FAQs should be added.

## Target Users

- Small local businesses.
- Coffee shops and restaurants.
- Tutoring centers.
- Personal studios and creators.
- Freelancers who need automated FAQ replies.
- Service providers who want a lightweight customer support backend.

## Current Demo

The first interactive demo is implemented inside AI Tech Quest Level 3:

```text
01_AI_Tech_Quest/frontend_web/src/features/business-mission
```

The demo currently provides:

- SaaS-style FAQ admin panel.
- Add FAQ form with `question`, `answer`, and comma-separated `tags`.
- Customer question input.
- Mock FAQ matching through `businessService.ask()`.
- AI answer panel with confidence, matched FAQ, matched tags, and recommended action.
- Recent question log stored in localStorage.
- Mission completion after one successful customer question.
- Use-case cards for LINE Bot, tutoring center assistant, studio auto reply, and document support.

## Core Features

- FAQ admin dashboard.
- Add and manage question / answer / tag entries.
- Customer question input.
- FAQ matching and answer generation.
- Recent question logs.
- Confidence display.
- Future LLM fallback for low-confidence questions.
- Future LINE Bot and website chat integration.
- Future analytics for repeated unanswered questions.

## Tech Stack

Current MVP:

- React.
- Vite.
- Tailwind CSS.
- Framer Motion.
- Zustand.
- localStorage.

Planned backend and AI stack:

- FastAPI.
- Pydantic.
- SQLite or PostgreSQL.
- Embeddings and semantic search.
- OpenAI or another LLM provider for grounded fallback answers.
- LINE Messaging API.

## Service Boundary

The frontend is intentionally built behind a service abstraction:

```js
businessService.getFaqs()
businessService.addFaq(payload)
businessService.ask(question)
```

Current implementation:

- Uses localStorage for FAQ persistence.
- Uses localStorage for recent question logs.
- Uses tag and keyword scoring for matching.

Future implementation:

- `getFaqs()` calls `GET /business/faqs`.
- `addFaq()` calls `POST /business/faqs`.
- `ask()` calls `POST /business/ask`.
- The matching layer can move from keyword rules to embeddings.
- Low-confidence questions can trigger LLM fallback or staff review.

## MVP Scope

- Show a real-feeling small SaaS backend instead of a static portfolio card.
- Let users add FAQ records.
- Let users ask customer questions.
- Return matched FAQ, confidence, tags, and suggested action.
- Persist demo data locally.
- Keep the service layer replaceable with FastAPI.

## Monetization

This is the main freelance monetization product.

Potential offers:

- Starter FAQ Assistant: setup a web-based FAQ admin and embeddable customer assistant.
- LINE Bot FAQ Automation: connect FAQ matching to LINE customer messages.
- Tutoring Center Assistant: answer course, pricing, schedule, and trial lesson questions.
- Studio Auto Reply: automate booking, lead time, pricing, and revision-policy replies.
- Document Support System: convert internal docs or policies into searchable customer support.
- Monthly Maintenance: FAQ updates, analytics review, prompt tuning, and deployment support.

## Roadmap

1. Connect the AI Tech Quest demo to FastAPI API mode.
2. Add SQLite persistence for FAQs and question logs.
3. Add FAQ edit/delete and tag management.
4. Add unanswered-question analytics.
5. Add semantic matching with embeddings.
6. Add LLM fallback with strict grounding and refusal rules.
7. Add LINE Messaging API integration.
8. Package as a reusable client template with deployment docs.

## GitHub Placeholder

- Main repo: https://github.com/QingyuJin/ai-tech-quest
- Future product repo: https://github.com/QingyuJin/ai-business-assistant
