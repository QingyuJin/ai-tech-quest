from fastapi import APIRouter

from app.schemas.ml import MlPredictRequest, MlPredictResponse
from app.services.ml_service import predict

router = APIRouter(prefix="/ml", tags=["ml"])


@router.post("/predict", response_model=MlPredictResponse)
def predict_ml(payload: MlPredictRequest) -> MlPredictResponse:
    return predict(payload)
