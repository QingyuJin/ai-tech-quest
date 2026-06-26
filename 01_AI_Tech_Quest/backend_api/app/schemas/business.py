from pydantic import BaseModel, Field


class FaqCreateRequest(BaseModel):
    question: str = Field(..., min_length=1)
    answer: str = Field(..., min_length=1)
    tags: list[str] = Field(default_factory=list)


class FaqResponse(BaseModel):
    id: str
    question: str
    answer: str
    tags: list[str]


class BusinessAskRequest(BaseModel):
    question: str = Field(..., min_length=1, examples=["可以用 LINE 預約嗎？"])


class BusinessAskResponse(BaseModel):
    answer: str
    confidence: str
    matched_faq: FaqResponse | None
    matched_tags: list[str]
    action: str
