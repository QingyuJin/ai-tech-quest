# Level 1: Digital Logic Gate Lab

## Level Name

Digital Logic Gate Lab.

## Player Fantasy

The player is inside a small AI learning lab. The lab asks them to build a logic circuit that matches a target truth table.

## Learning Objective

Understand how AND, OR, and NOT gates combine to produce boolean logic.

## Available Tools

- AND gate
- OR gate
- NOT gate
- Input A
- Input B
- Output Y
- Wire tool
- Run checker
- Hint button
- Reset button

## Example Target

First MVP target:

```text
Y = A AND NOT B
```

Truth table:

| A | B | Target Y |
| --- | --- | --- |
| false | false | false |
| false | true | false |
| true | false | true |
| true | true | false |

## Expected Solution

1. Send B into NOT.
2. Send A and NOT B into AND.
3. Send AND output into Y.

## Validation Rules

The checker should:

- Run all four input rows.
- Evaluate the player's circuit.
- Compare generated Y with target Y.
- Mark each row as pass/fail.
- Show a final success state only when all rows match.

## Hint Examples

Hint 1:

```text
Look at the only row where Y should be true. Which input is true there, and which input must be flipped?
```

Hint 2:

```text
The target is true when A is true and B is false. Try using NOT on B before combining it with A.
```

Hint 3:

```text
Use NOT B as one input of an AND gate, and A as the other input.
```

## Success Feedback

Message:

```text
Circuit matched the truth table. You built A AND NOT B.
```

AI Guide:

```text
Nice. You used NOT to transform the input before combining it with AND. That is the core idea of composing logic gates.
```

## Failure Feedback

Examples:

- Missing output connection.
- NOT gate is not connected.
- Output is true for too many rows.
- Output is always false.
- Circuit has invalid wire direction.

## MVP Art Needs

- AND gate sprite.
- OR gate sprite.
- NOT gate sprite.
- Input node sprite.
- Output node sprite.
- Wire line style.
- Qingyu AI Guide portrait.
- Panel background and buttons.

## Level Completion

The level is complete when:

- all truth table rows match
- success message is shown
- completion event can later be sent to AI Tech Quest
