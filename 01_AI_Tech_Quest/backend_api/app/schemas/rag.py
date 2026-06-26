from pydantic import BaseModel, Field


class RagAskRequest(BaseModel):
    question: str = Field(..., min_length=1, examples=["營業時間是什麼？"])
    top_k: int = Field(default=2, ge=1, le=5)


class RagSourceResponse(BaseModel):
    source_id: str
    heading: str
    chunk_id: str
    snippet: str
    relevance: float


class RagAskResponse(BaseModel):
    answer: str
    confidence: str
    sources: list[RagSourceResponse]
    cited_snippets: list[str]
    retrieval_trace: str
