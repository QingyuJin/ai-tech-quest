from pydantic import BaseModel


class MissionResponse(BaseModel):
    id: str
    title: str
    route: str
    summary: str
    stack: list[str]
