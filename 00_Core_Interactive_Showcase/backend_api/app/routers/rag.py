from fastapi import APIRouter

from app.schemas.rag import RagAskRequest, RagAskResponse
from app.services.rag_service import ask_rag

router = APIRouter(prefix="/rag", tags=["rag"])


@router.post("/ask", response_model=RagAskResponse)
def ask(payload: RagAskRequest) -> RagAskResponse:
    return ask_rag(payload)
