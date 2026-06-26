# Unity WebGL Mission

Future Unity WebGL workspace for AI Tech Quest.

Unity is intentionally planned after the Web MVP. The goal is to first prove the mission flow in React, then rebuild the most visually memorable mission as a Unity WebGL experience.

## Recommended First Mission

Digital Logic Gate Lab:

- Unity 2D scene.
- C# state management.
- Drag-and-drop AND / OR / NOT gates.
- Truth table checking.
- AI hint API through FastAPI.
- Placeholder sprites first, custom Qingyu AI Guide art later.

## Future API Boundary

Unity should call the same backend API style as the React app.

Suggested endpoints:

- `POST /unity/hint`
- `POST /unity/check-logic-gate`
- `GET /unity/levels`

Keep Unity-specific code in this folder and keep shared AI/business logic in `apps/backend-api`.
