from fastapi import APIRouter

from app.schemas.ml import MlPredictRequest, MlPredictResponse
from app.services.ml_service import predict_sample


router = APIRouter(prefix="/ml", tags=["Machine Learning"])


@router.post("/predict", response_model=MlPredictResponse)
def predict(request: MlPredictRequest) -> MlPredictResponse:
    return predict_sample(request)
