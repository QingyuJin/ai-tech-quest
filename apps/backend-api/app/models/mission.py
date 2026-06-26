from dataclasses import dataclass


@dataclass(frozen=True)
class MissionRecord:
    id: str
    title: str
    summary: str
    route: str
    stack: list[str]
    status: str = "available"
