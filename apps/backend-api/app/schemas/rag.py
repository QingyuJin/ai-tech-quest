from pydantic import BaseModel, Field


class RagAskRequest(BaseModel):
    document_id: str = Field(default="qingyu-cafe")
    question: str = Field(min_length=1, max_length=500)


class Citation(BaseModel):
    source_id: str
    title: str
    excerpt: str


class RagAskResponse(BaseModel):
    document_title: str
    answer: str
    citations: list[Citation]
    confidence: str
