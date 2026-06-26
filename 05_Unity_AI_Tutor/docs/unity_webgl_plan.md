# Unity WebGL Plan

## Goal

Export Digital Logic Gate Lab as a WebGL demo that can be linked from AI Tech Quest and portfolio pages.

## Build Target

- Unity WebGL
- Desktop browser first
- Mobile browser as secondary target

## Hosting Options

Recommended early options:

- Vercel static hosting if build size is manageable.
- itch.io for quick Unity WebGL hosting.
- GitHub Pages for static prototype.
- Separate subdomain later.

## Integration With AI Tech Quest

Phase 1:

- Add portfolio card link to hosted WebGL build.

Phase 2:

- Add AI Tech Quest route that embeds WebGL.

Phase 3:

- Add message bridge between Unity and React:

```text
Unity -> React: level completed
React -> Unity: player profile / mission state
```

## WebGL Constraints

- Keep first build small.
- Avoid heavy textures.
- Avoid unnecessary 3D assets.
- Use compressed assets.
- Test load time on average browser.

## UI Responsiveness

Desktop:

- Board center.
- Toolbox left.
- Truth table and AI Guide right.

Narrow embed:

- Board top.
- Toolbox horizontal.
- Truth table collapsible.
- AI Guide bottom panel.

## AI Hint API Integration

MVP:

- deterministic local hints in Unity.

Future:

- Unity sends circuit state to backend.
- Backend returns controlled hint.
- Hint prompt must avoid solving the level immediately.

Potential endpoint:

```text
POST /unity-ai-tutor/hint
```

## Build Checklist

Before publishing:

- Scene loads in browser.
- Drag and drop works.
- Truth table checker works.
- Reset works.
- Hint panel works.
- Success state works.
- Audio is optional and muted by default if added.
- WebGL page has clear loading message.

## Demo Recording

Create a short video for portfolio use:

1. Show target truth table.
2. Drag gates.
3. Connect circuit.
4. Run checker and fail once.
5. Ask AI Guide for hint.
6. Fix circuit.
7. Show success.

Store future videos in:

```text
05_Unity_AI_Tutor/videos/
```
