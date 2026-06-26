from pydantic import BaseModel


class MissionResponse(BaseModel):
    id: str
    title: str
    subtitle: str
    category: str
    level: str
    status_label: str
    summary: str
    demonstrates: list[str]
    stack: list[str]
    route: str | None = None
    link: str | None = None
