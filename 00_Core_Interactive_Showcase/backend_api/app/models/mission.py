from dataclasses import dataclass


@dataclass(frozen=True)
class Mission:
    id: str
    title: str
    route: str
    summary: str
    stack: list[str]
