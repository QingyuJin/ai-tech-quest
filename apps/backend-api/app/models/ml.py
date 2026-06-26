from dataclasses import dataclass


@dataclass(frozen=True)
class DataPointRecord:
    id: str
    name: str
    x: int
    y: int
    model_label: str
    description: str
