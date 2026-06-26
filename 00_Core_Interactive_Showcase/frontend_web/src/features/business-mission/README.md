# Business Mission

Level 3: AI 店家助手.

This feature demonstrates a practical full-stack AI product flow for small businesses.

## Current Flow

1. The store admin reviews FAQ entries.
2. The admin can add FAQ entries with:
   - `question`
   - `answer`
   - `tags`
3. A customer asks a question.
4. `businessService.ask(question, faqs)` performs mock FAQ matching.
5. The UI shows:
   - AI answer
   - confidence
   - matched FAQ
   - matched tags
   - recent question history
6. After one successful answer, the user can complete the mission.

## Service Boundary

The page calls:

```js
businessService.ask(question, faqs)
businessService.createFaq(payload)
```

Default mode is mock.

To switch to API mode later:

```text
VITE_BUSINESS_SERVICE_MODE=api
VITE_API_BASE_URL=http://127.0.0.1:8000
```

The service can then call:

```text
GET /business/faqs
POST /business/faqs
POST /business/ask
```

## Future Upgrade Path

- Replace local state with backend FAQ API.
- Persist FAQ entries in SQLite or Supabase.
- Add customer question logs.
- Add OpenAI fallback when FAQ matching is low-confidence.
- Connect to LINE Bot, website widget, or document-based customer support.
