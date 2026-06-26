# Frontend Architecture

The frontend is a React + Vite interactive showcase built as a mission-based portfolio game.

## Stack

- React
- Vite
- Tailwind CSS
- Framer Motion
- Zustand
- React Router
- Lucide React

## Folder Responsibilities

```text
src/
|-- app/          App shell and route definitions
|-- pages/        Route-level pages
|-- components/   Shared reusable UI
|-- features/     Mission-specific modules
|-- data/         Mock missions, projects, explanations, and guide copy
|-- hooks/        Shared React hooks
|-- store/        Zustand state and localStorage persistence
|-- styles/       Tailwind base styles and design tokens
`-- utils/        Small shared helpers
```

## Feature Modules

### RAG Mission

Location:

```text
src/features/rag-mission
```

Demonstrates document cards, question input, answer confidence, source citations, cited snippets, and RAG concepts.

### ML Mission

Location:

```text
src/features/ml-mission
```

Demonstrates a scatter plot, player classification, model prediction, accuracy, confusion matrix, confidence, and error analysis.

### Business Mission

Location:

```text
src/features/business-mission
```

Demonstrates FAQ admin, customer question matching, AI-style answer output, recent question logs, and business automation use cases.

## State Management

`src/store/useMissionStore.js` stores:

- Completed mission IDs.
- Portfolio unlock status.
- Progress percentage.

State is persisted through localStorage using Zustand middleware.

## API Switch Strategy

Feature services should hide whether the source is mock or API.

Example:

```text
businessService.ask(question, faqs)
```

Current mode:

```text
VITE_BUSINESS_SERVICE_MODE=mock
```

Future API mode:

```text
VITE_BUSINESS_SERVICE_MODE=api
VITE_API_BASE_URL=http://127.0.0.1:8000
```

## Mobile/RWD Strategy

- Main layouts use grid and flex with responsive breakpoints.
- Mission cards collapse to one column on mobile.
- Project card actions use responsive grid tracks.
- Buttons have stable minimum heights.
- Panels use simple borders and restrained spacing for readability.
