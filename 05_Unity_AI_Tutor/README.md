# Unity AI Tutor

Unity AI Tutor is an interactive AI learning product. It is not positioned as a normal Unity mini-game; it is a playable learning mission where the player learns a technical concept through action, validation, and AI-style guidance.

The first planned level is:

```text
Digital Logic Gate Lab
```

## Product Name

Unity AI Tutor.

## Problem

Many technical learning experiences are passive. Students watch videos, read slides, or answer multiple-choice questions, but they rarely get to manipulate the concept directly.

Unity AI Tutor solves this by turning abstract technical ideas into interactive missions. The learner experiments, receives feedback, and gets hints from a Qingyu AI Guide.

## Target Users

- Students learning computer science basics.
- Beginners learning digital logic.
- Tutors who want interactive teaching aids.
- Interviewers evaluating Unity, C#, interaction design, and product thinking.
- Portfolio visitors who want to see AI + Unity integration.

## Core Gameplay

Level 1: Digital Logic Gate Lab.

The player drags AND / OR / NOT logic gates onto a 2D circuit board, connects inputs, and tries to make the output match a given truth table.

Core loop:

1. Read the target truth table.
2. Drag logic gates onto the board.
3. Connect input/output nodes.
4. Run the circuit.
5. Compare output with the truth table.
6. Receive pass/fail feedback.
7. Ask AI Guide for a hint.
8. Iterate until the circuit passes.

## Tech Stack

- Unity 2D.
- C#.
- Drag and Drop interaction.
- Truth Table Checker.
- AI Hint API.
- WebGL Build.
- Self-drawn character UI.
- Future: FastAPI hint service.
- Future: AI Tech Quest embed or link-out.

## MVP Scope

The first MVP should include:

- One Unity 2D scene.
- AND / OR / NOT gate pieces.
- Drag-and-drop placement.
- Simple connection system.
- One target truth table.
- Run/check button.
- Truth table checker.
- Deterministic AI Guide hints first.
- WebGL export plan.
- Placeholder self-drawn character UI.

Out of scope for first MVP:

- Full circuit simulator.
- Many logic components.
- User account system.
- Real-time multiplayer.
- Complex AI tutoring before gameplay is stable.

## Future Upgrade

- Add more logic gates: NAND, NOR, XOR.
- Add multiple levels with increasing difficulty.
- Add AI Hint API backed by FastAPI.
- Add progress sync with AI Tech Quest.
- Add WebGL embed in portfolio.
- Add custom self-drawn tutor character expressions.
- Add analytics for common student mistakes.
- Add classroom/tutor mode.

## Monetization

Unity AI Tutor is primarily a portfolio differentiator, but it can support paid work:

- Interactive learning demos for tutors.
- Custom educational WebGL mini-products.
- Technical course companion tools.
- Unity WebGL showcase commissions.

## Roadmap

1. Create a Unity 2D placeholder scene.
2. Add AND / OR / NOT gate prefabs.
3. Implement drag and drop.
4. Implement truth table checker.
5. Add deterministic AI Guide hints.
6. Export WebGL demo.
7. Connect the demo to AI Tech Quest.
8. Add backend-powered AI hints after gameplay is stable.

## Folder Structure

```text
05_Unity_AI_Tutor/
|-- README.md
|-- docs/
|   |-- game_design.md
|   |-- technical_design.md
|   |-- level_1_logic_gate_lab.md
|   `-- unity_webgl_plan.md
|-- UnityProject/
|-- art/
|   |-- characters/
|   `-- ui/
`-- videos/
```

## Current Status

- Product planning created.
- First level concept defined.
- Unity implementation intentionally not started yet.
- Next step: create a Unity 2D prototype scene with placeholder sprites.

## GitHub Placeholder

Future standalone repo:

```text
https://github.com/QingyuJin/unity-ai-tutor
```
