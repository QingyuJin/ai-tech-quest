# RAG Mission

Level 1: RAG 文件調查員.

This feature simulates a simplified Retrieval-Augmented Generation flow using mock data.

## Current Flow

1. Display the `晴宇咖啡店家資訊` document.
2. User asks a question.
3. `ragService.ask(question)` retrieves relevant mock chunks.
4. The UI shows:
   - `answer`
   - `confidence`
   - `sources`
   - `cited snippets`
5. User can expand source cards to inspect the original document text.
6. After one successful answer, the user can complete the mission.

## Service Boundary

The page imports:

```js
ragService.ask(question)
```

Current implementation:

```text
services/ragService.js
```

It uses mock keyword scoring to simulate vector search.

Future backend replacement:

```js
async function ask(question) {
  const response = await fetch("/rag/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, document_id: "qingyu-cafe-info" }),
  });
  return response.json();
}
```

As long as the backend returns `answer`, `confidence`, `sources`, and `citedSnippets`, the UI can stay mostly unchanged.
