# Technical Design

## Engine

- Unity 2D
- C#
- WebGL export target

## Core Systems

### 1. Drag and Drop

Responsibilities:

- Drag gate prefab from toolbox.
- Instantiate gate on board.
- Move placed gate.
- Snap to board grid if needed.

Suggested scripts:

```text
DraggableGate
GatePalette
BoardDropZone
```

### 2. Gate Model

Gate types:

- AND
- OR
- NOT

Suggested data model:

```text
GateNode
GateType
InputPort
OutputPort
WireConnection
```

### 3. Connection System

Responsibilities:

- Select an output port.
- Connect to an input port.
- Validate legal wire direction.
- Prevent impossible loops in MVP.

MVP simplification:

- Use click-to-connect or simple drag line.
- Allow only small circuits.
- No free-form complex graph solving at first.

### 4. Truth Table Checker

Responsibilities:

- Run all input combinations.
- Evaluate gate graph.
- Produce output values.
- Compare against target truth table.
- Return detailed mismatch info.

Suggested checker output:

```text
isCorrect
matchedRows
totalRows
firstMismatch
diagnosticMessage
```

### 5. AI Hint API

MVP phase:

- Deterministic local hints inside Unity.

Future API phase:

```text
POST /unity-ai-tutor/hint
```

Input:

```json
{
  "level_id": "logic-gate-lab-1",
  "target_truth_table": [],
  "current_circuit": {},
  "last_error": "row_2_mismatch"
}
```

Output:

```json
{
  "hint_level": 2,
  "message": "Your output is false when A=true and B=false. Check whether OR should be used before NOT."
}
```

### 6. WebGL Build

Build target:

- Unity WebGL.

Portfolio integration:

- Link from AI Tech Quest.
- Later embed in a React page or host as a separate WebGL route.

### 7. Self-Drawn Character UI

Art requirements:

- Qingyu AI Guide portrait.
- Neutral expression.
- Thinking expression.
- Encouraging expression.
- Success expression.

UI placement:

- Right-side guide panel on desktop.
- Bottom collapsible guide panel on mobile/narrow embed.

## Suggested Unity Scene Structure

```text
Scene: LogicGateLab
|-- Canvas
|   |-- Header
|   |-- GateToolbox
|   |-- TruthTablePanel
|   |-- AIHintPanel
|   `-- ResultPanel
|-- BoardRoot
|-- WireRoot
|-- EventSystem
`-- GameManager
```

## Script Boundaries

- `LogicGateLabManager`: level state and win condition.
- `TruthTableChecker`: deterministic validation.
- `GateController`: gate behavior.
- `WireController`: connection rendering.
- `HintController`: deterministic hints now, API hints later.
- `UIStateController`: panels, feedback, buttons.

## Non-Goals For MVP

- Full electronics simulation.
- Arbitrary circuit cycles.
- Save/load circuit editor.
- Real AI hint generation before deterministic hints are proven.
