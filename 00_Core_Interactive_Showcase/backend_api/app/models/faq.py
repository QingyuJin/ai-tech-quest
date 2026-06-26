from dataclasses import dataclass


@dataclass
class Faq:
    id: str
    question: str
    answer: str
    tags: list[str]
