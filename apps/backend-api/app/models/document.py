from dataclasses import dataclass


@dataclass(frozen=True)
class DocumentSection:
    source_id: str
    title: str
    content: str


@dataclass(frozen=True)
class DocumentRecord:
    id: str
    title: str
    kind: str
    owner: str
    sections: list[DocumentSection]
