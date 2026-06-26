from pydantic import BaseModel, Field


class RagAskRequest(BaseModel):
    question: str = Field(min_length=1, max_length=500)
    document_id: str = "qingyu-cafe-info"


class RagSource(BaseModel):
    source_id: str
    heading: str
    snippet: str


class RagAskResponse(BaseModel):
    answer: str
    confidence: str
    sources: list[RagSource]
    cited_snippets: list[str]
