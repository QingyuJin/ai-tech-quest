from app.schemas.ml import MlPredictRequest, MlPredictResponse


def predict(payload: MlPredictRequest) -> MlPredictResponse:
    prediction = "B" if payload.activity_score >= 65 else "A" if payload.consistency_score >= 60 else "C"
    return MlPredictResponse(
        model_prediction=prediction,
        confidence=0.88,
        explanation=(
            "Mock model uses activity_score and consistency_score thresholds. "
            f"activity={payload.activity_score}, consistency={payload.consistency_score}."
        ),
        accuracy=87,
        confusion_matrix=[
            {"actual": "A", "predicted": {"A": 24, "B": 3, "C": 1}},
            {"actual": "B", "predicted": {"A": 2, "B": 31, "C": 2}},
            {"actual": "C", "predicted": {"A": 1, "B": 4, "C": 26}},
        ],
    )
