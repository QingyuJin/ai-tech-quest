# Game Design

## Product Direction

Unity AI Tutor is a playable learning product. The game should teach by interaction, not by long explanations.

The player should feel:

- "I can experiment."
- "I can see why my answer is wrong."
- "The hint helps me think, but does not solve everything for me."

## First Mission

```text
Digital Logic Gate Lab
```

## Core Learning Goal

Teach the relationship between logic gates and truth tables.

The player should learn:

- AND outputs true only when both inputs are true.
- OR outputs true when at least one input is true.
- NOT flips a boolean input.
- Complex outputs can be built by composing simple gates.
- A truth table is a precise target specification.

## Core Gameplay Loop

1. Observe target truth table.
2. Place logic gates.
3. Connect inputs and outputs.
4. Run simulation.
5. Compare produced truth table with target truth table.
6. Receive feedback.
7. Use AI Guide hint if stuck.
8. Fix circuit and retry.

## Player Actions

- Drag gate from toolbox.
- Drop gate onto board.
- Select output node.
- Connect to input node.
- Delete gate or wire.
- Press Run.
- Ask for hint.
- Reset board.

## Feedback States

- Valid circuit.
- Missing connection.
- Invalid connection.
- Output mismatch.
- Partial match.
- Complete success.

## AI Guide Behavior

The AI Guide should provide progressive hints:

1. Concept hint: explain the logic principle.
2. Diagnostic hint: identify likely mismatch.
3. Action hint: suggest a next step.

The guide should not immediately reveal the final circuit.

## Visual Style

- Clean 2D lab interface.
- Circuit board workspace.
- Toolbox panel for gates.
- Truth table panel.
- Friendly self-drawn tutor character UI.
- Clear pass/fail colors.

## MVP Level Win Condition

The player wins when the generated output column matches the target truth table for all input rows.

## Design Constraints

- Keep the first level small.
- Avoid complex physics.
- Prioritize readable UI and deterministic validation.
- Make the player understand why the circuit passed or failed.
