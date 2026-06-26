from fastapi import APIRouter

from app.schemas.mission import MissionResponse
from app.services.mission_service import list_missions


router = APIRouter(tags=["Missions"])


@router.get("/missions", response_model=list[MissionResponse])
def get_missions() -> list[MissionResponse]:
    return list_missions()
