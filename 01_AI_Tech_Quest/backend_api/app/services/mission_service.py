from dataclasses import asdict

from app.data.mock_data import MISSIONS
from app.schemas.mission import MissionResponse


def list_missions() -> list[MissionResponse]:
    return [MissionResponse(**asdict(mission)) for mission in MISSIONS]
