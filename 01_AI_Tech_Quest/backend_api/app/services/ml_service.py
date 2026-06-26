from app.data.mock_data import EVALUATION_SUMMARY
from app.schemas.ml import (
    MlEvaluationResponse,
    MlFeaturesResponse,
    MlPredictRequest,
    MlPredictResponse,
)


def _predict_cluster(activity_score: float, consistency_score: float) -> str:
    if activity_score >= 65 and consistency_score >= 50:
        return "B"
    if consistency_score >= 60 and activity_score >= 35:
        return "A"
    return "C"


def _confidence_for(activity_score: float, consistency_score: float, prediction: str) -> float:
    if prediction == "B":
        return 0.9 if activity_score >= 74 and consistency_score >= 58 else 0.76
    if prediction == "A":
        return 0.86 if consistency_score >= 74 else 0.72
    return 0.84 if activity_score <= 35 and consistency_score <= 46 else 0.7


def _explain_prediction(activity_score: float, consistency_score: float, prediction: str) -> str:
    if prediction == "B":
        return (
            f"mock 模型預測為 B，因為活躍分數為 {activity_score}，屬於偏高區間；"
            f"穩定分數 {consistency_score} 也足以讓它遠離低活躍族群。"
        )
    if prediction == "A":
        return (
            f"mock 模型預測為 A，因為穩定分數 {consistency_score} 偏高，"
            f"而活躍分數 {activity_score} 屬於中等，不是極端高活躍。"
        )
    return (
        f"mock 模型預測為 C，因為活躍分數 {activity_score} 和穩定分數 "
        f"{consistency_score} 都更接近低活躍族群。"
    )


def predict_sample(request: MlPredictRequest) -> MlPredictResponse:
    prediction = _predict_cluster(request.activity_score, request.consistency_score)
    correct_label = request.correct_label or prediction
    confidence = _confidence_for(request.activity_score, request.consistency_score, prediction)

    return MlPredictResponse(
        sample_id=request.sample_id or "api-sample",
        model_prediction=prediction,
        correct_label=correct_label,
        confidence=confidence,
        explanation=_explain_prediction(request.activity_score, request.consistency_score, prediction),
        features=MlFeaturesResponse(
            activity_score=request.activity_score,
            consistency_score=request.consistency_score,
        ),
        evaluation=MlEvaluationResponse(**EVALUATION_SUMMARY),
    )
