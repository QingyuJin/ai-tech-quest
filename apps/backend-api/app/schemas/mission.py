from pydantic import BaseModel


class MissionSummary(BaseModel):
    id: str
    title: str
    summary: str
    route: str
    stack: list[str]
    status: str
