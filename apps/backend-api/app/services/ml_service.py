from app.models.ml import DataPointRecord
from app.schemas.ml import ConfusionMatrixRow, MlPredictRequest, MlPredictResponse, MlPredictionRow


DATASET = [
    DataPointRecord(id="p1", name="A-01", x=18, y=72, model_label="A", description="高互動、低流失風險"),
    DataPointRecord(id="p2", name="A-02", x=26, y=67, model_label="A", description="觀看穩定、偏好明確"),
    DataPointRecord(id="p3", name="B-01", x=58, y=40, model_label="B", description="中度互動、轉換待觀察"),
    DataPointRecord(id="p4", name="B-02", x=64, y=47, model_label="B", description="行為混合、需要更多特徵"),
    DataPointRecord(id="p5", name="C-01", x=80, y=22, model_label="C", description="低互動、可能需要喚回"),
    DataPointRecord(id="p6", name="C-02", x=74, y=30, model_label="C", description="偏離主群、模型信心較低"),
]

LABELS = ["A", "B", "C"]


def predict_labels(request: MlPredictRequest) -> MlPredictResponse:
    rows = [
        MlPredictionRow(
            id=point.id,
            name=point.name,
            selected_label=request.selected_labels.get(point.id, "未選"),
            model_label=point.model_label,
            is_correct=request.selected_labels.get(point.id) == point.model_label,
        )
        for point in DATASET
    ]
    correct_count = sum(1 for row in rows if row.is_correct)
    accuracy = round(correct_count / len(rows) * 100)
    matrix = _build_confusion_matrix(rows)
    insight = (
        "分類完全命中，代表玩家判斷與 mock model 一致。"
        if correct_count == len(rows)
        else "玩家與模型出現差異，可用來展示 feature quality、decision boundary 與 error analysis。"
    )

    return MlPredictResponse(
        rows=rows,
        accuracy=accuracy,
        confusion_matrix=matrix,
        insight=insight,
    )


def _build_confusion_matrix(rows: list[MlPredictionRow]) -> list[ConfusionMatrixRow]:
    return [
        ConfusionMatrixRow(
            actual=actual,
            predicted={
                predicted: sum(
                    1
                    for row in rows
                    if row.model_label == actual and row.selected_label == predicted
                )
                for predicted in LABELS
            },
        )
        for actual in LABELS
    ]
