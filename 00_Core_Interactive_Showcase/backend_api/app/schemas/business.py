from pydantic import BaseModel, Field


class FaqCreate(BaseModel):
    question: str = Field(min_length=1, max_length=300)
    answer: str = Field(min_length=1, max_length=1000)
    tags: list[str] = Field(default_factory=list)


class FaqResponse(BaseModel):
    id: str
    question: str
    answer: str
    tags: list[str]


class BusinessAskRequest(BaseModel):
    question: str = Field(min_length=1, max_length=500)


class MatchedFaq(BaseModel):
    id: str
    question: str
    answer: str


class BusinessAskResponse(BaseModel):
    answer: str
    confidence: str
    matched_faq: MatchedFaq | None
    matched_tags: list[str]
    action: str
