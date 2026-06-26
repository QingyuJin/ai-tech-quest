from fastapi import APIRouter

from app.schemas.health import ApiInfoResponse, HealthResponse


router = APIRouter(tags=["Health"])


@router.get("/", response_model=ApiInfoResponse)
def get_api_info() -> ApiInfoResponse:
    return ApiInfoResponse(
        service="ai-tech-quest-api",
        version="0.1.0",
        status="ok",
        docs_url="/docs",
        health_url="/health",
        frontend_url="https://ai-tech-quest.vercel.app",
    )


@router.get("/health", response_model=HealthResponse)
def get_health() -> HealthResponse:
    return HealthResponse(
        status="ok",
        service="ai-tech-quest-api",
        version="0.1.0",
    )
