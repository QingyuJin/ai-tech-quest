from fastapi import APIRouter

from app.schemas.rag import RagAskRequest, RagAskResponse
from app.services.rag_service import answer_rag_question

router = APIRouter(prefix="/rag", tags=["rag"])


@router.post("/ask", response_model=RagAskResponse)
def ask_rag(request: RagAskRequest) -> RagAskResponse:
    return answer_rag_question(request)
