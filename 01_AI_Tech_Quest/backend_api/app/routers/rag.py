from fastapi import APIRouter

from app.schemas.rag import RagAskRequest, RagAskResponse
from app.services.rag_service import ask_rag

router = APIRouter(prefix="/rag", tags=["Document QA"])


@router.post("/ask", response_model=RagAskResponse)
def ask_document(request: RagAskRequest) -> RagAskResponse:
    return ask_rag(question=request.question, top_k=request.top_k)
