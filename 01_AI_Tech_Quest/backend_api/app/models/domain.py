from dataclasses import dataclass, field


@dataclass(frozen=True)
class MissionModel:
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


@dataclass(frozen=True)
class DocumentChunkModel:
    id: str
    heading: str
    body: str
    tags: list[str]


@dataclass
class FaqModel:
    id: str
    question: str
    answer: str
    tags: list[str] = field(default_factory=list)
