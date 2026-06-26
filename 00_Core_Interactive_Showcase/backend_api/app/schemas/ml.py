from pydantic import BaseModel, Field


class MlPredictRequest(BaseModel):
    sample_id: str = Field(default="u-17")
    activity_score: int = Field(ge=0, le=100)
    consistency_score: int = Field(ge=0, le=100)
    player_choice: str | None = None


class MlPredictResponse(BaseModel):
    model_prediction: str
    confidence: float
    explanation: str
    accuracy: int
    confusion_matrix: list[dict]
