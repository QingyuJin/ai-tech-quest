from fastapi import APIRouter

from app.schemas.mission import MissionSummary
from app.services.mission_service import list_missions

router = APIRouter(tags=["missions"])


@router.get("/missions", response_model=list[MissionSummary])
def get_missions() -> list[MissionSummary]:
    return [MissionSummary(**mission.__dict__) for mission in list_missions()]
