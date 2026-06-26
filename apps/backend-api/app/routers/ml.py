from fastapi import APIRouter

from app.schemas.ml import MlPredictRequest, MlPredictResponse
from app.services.ml_service import predict_labels

router = APIRouter(prefix="/ml", tags=["ml"])


@router.post("/predict", response_model=MlPredictResponse)
def predict_ml(request: MlPredictRequest) -> MlPredictResponse:
    return predict_labels(request)
