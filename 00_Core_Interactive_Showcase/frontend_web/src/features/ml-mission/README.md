# ML Mission

Level 2: ML 分類挑戰.

This feature turns a notebook-style classification task into an interactive ML technology demo.

## Current Flow

1. Display a 2D scatter plot with known clusters:
   - A: 穩定型使用者
   - B: 高活躍使用者
   - C: 低活躍使用者
2. User clicks the unknown sample.
3. User chooses A / B / C.
4. `mlService.predict(sample)` runs a mock nearest-centroid classifier.
5. The UI reveals:
   - player choice
   - model prediction
   - correct label
   - correctness
   - model explanation
   - accuracy
   - confusion matrix
   - model confidence
   - error analysis
6. After one completed prediction, the user can complete the mission.

## Service Boundary

The page imports:

```js
mlService.predict(sample)
```

Current implementation:

```text
services/mlService.js
```

It uses a mock nearest-centroid classifier.

## Future Colab / sklearn / FastAPI Integration

Recommended path:

1. Train or evaluate a model in Colab / sklearn.
2. Export one of these:
   - model artifact with `joblib`
   - prediction results as JSON
   - metrics and confusion matrix as JSON
3. Add a FastAPI endpoint:

```text
POST /ml/predict
```

4. Replace the mock `mlService.predict(sample)` with:

```js
async function predict(sample) {
  const response = await fetch("/ml/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sample),
  });
  return response.json();
}
```

Expected response shape:

```json
{
  "playerChoice": "B",
  "modelPrediction": "B",
  "correctLabel": "B",
  "isCorrect": true,
  "confidence": 0.91,
  "explanation": "...",
  "evaluation": {
    "accuracy": 87,
    "confusionMatrix": [],
    "errorAnalysis": "..."
  }
}
```
