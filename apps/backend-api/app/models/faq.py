from dataclasses import dataclass


@dataclass(frozen=True)
class FaqRecord:
    id: str
    question: str
    answer: str
    tags: list[str]
