from pydantic import BaseModel, Field


class MlPredictRequest(BaseModel):
    selected_labels: dict[str, str] = Field(
        description="Map of data point id to player-selected label, such as {'p1': 'A'}."
    )


class MlPredictionRow(BaseModel):
    id: str
    name: str
    selected_label: str
    model_label: str
    is_correct: bool


class ConfusionMatrixRow(BaseModel):
    actual: str
    predicted: dict[str, int]


class MlPredictResponse(BaseModel):
    rows: list[MlPredictionRow]
    accuracy: int
    confusion_matrix: list[ConfusionMatrixRow]
    insight: str
