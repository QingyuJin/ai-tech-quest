# Future Unity Plan

Unity AI Tutor is planned as the fourth major technical showcase track after the web MVP is stable.

## Goal

Create a Unity WebGL learning mission that demonstrates interactive technical education with AI-guided hints.

The first recommended theme is a Digital Logic Gate Lab because it is visual, technical, and easy to evaluate.

## Experience Concept

```text
User enters Unity mission
  -> drags logic gates into a small circuit
  -> runs a truth-table check
  -> receives feedback and AI-style hints
  -> completes the mission
  -> unlocks Unity AI Tutor project card
```

## Unity Scope

MVP:

- WebGL scene.
- Drag-and-drop gates.
- AND / OR / NOT gates.
- Simple truth-table validation.
- Win state.
- Exportable WebGL build.

Future:

- More gates.
- Level progression.
- Hint request button.
- Backend API integration.
- Save completion state back to the React shell.

## Integration Options

### Option 1: Link Out

The portfolio card links to a deployed Unity WebGL page.

Pros:

- Simple deployment.
- Lower risk.

### Option 2: Embed in React

The React app embeds the Unity WebGL build inside a mission page.

Pros:

- Stronger interactive portfolio experience.
- Better mission continuity.

Tradeoff:

- More asset and loading complexity.

## Backend Integration

Future API endpoints may include:

```text
POST /unity/hint
POST /unity/validate
POST /unity/progress
```

The first version can keep Unity self-contained and only connect to the backend after the WebGL build is stable.

## Portfolio Value

Unity AI Tutor demonstrates:

- Unity engineering.
- Interactive learning design.
- WebGL deployment.
- API-connected technical education.
- Product thinking beyond static portfolio pages.
