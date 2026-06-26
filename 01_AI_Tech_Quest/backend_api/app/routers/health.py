from fastapi import APIRouter

from app.schemas.health import HealthResponse


router = APIRouter(tags=["Health"])


@router.get("/health", response_model=HealthResponse)
def get_health() -> HealthResponse:
    return HealthResponse(
        status="ok",
        service="ai-tech-quest-api",
        version="0.1.0",
    )
