from typing import Literal

from pydantic import BaseModel, Field


ClassLabel = Literal["A", "B", "C"]


class MlPredictRequest(BaseModel):
    sample_id: str | None = Field(default=None, examples=["unknown-user-01"])
    activity_score: float = Field(..., ge=0, le=100, examples=[76])
    consistency_score: float = Field(..., ge=0, le=100, examples=[64])
    correct_label: ClassLabel | None = None


class MlFeaturesResponse(BaseModel):
    activity_score: float
    consistency_score: float


class ConfusionMatrixRowResponse(BaseModel):
    actual: ClassLabel
    predicted: dict[ClassLabel, int]


class MlEvaluationResponse(BaseModel):
    accuracy: int
    confusion_matrix: list[ConfusionMatrixRowResponse]
    error_analysis: str


class MlPredictResponse(BaseModel):
    sample_id: str
    model_prediction: ClassLabel
    correct_label: ClassLabel
    confidence: float
    explanation: str
    features: MlFeaturesResponse
    evaluation: MlEvaluationResponse
