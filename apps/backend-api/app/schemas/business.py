from pydantic import BaseModel, Field


class FaqCreate(BaseModel):
    question: str = Field(min_length=1, max_length=300)
    answer: str = Field(min_length=1, max_length=800)
    tags: list[str] = Field(default_factory=list)


class FaqRead(BaseModel):
    id: str
    question: str
    answer: str
    tags: list[str]


class BusinessAskRequest(BaseModel):
    question: str = Field(min_length=1, max_length=500)


class BusinessAskResponse(BaseModel):
    answer: str
    matched_question: str | None
    confidence: str
    action: str
