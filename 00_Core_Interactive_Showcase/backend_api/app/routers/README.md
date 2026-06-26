# Routers

Routers define the public HTTP API.

Keep route handlers thin:

- Validate input through Pydantic schemas.
- Call a service function.
- Return a response model.

Avoid placing RAG, ML, matching, or database logic directly in route handlers.
