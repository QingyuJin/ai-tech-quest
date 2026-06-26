from fastapi import APIRouter, status

from app.schemas.business import BusinessAskRequest, BusinessAskResponse, FaqCreate, FaqRead
from app.services.business_service import answer_business_question, create_faq, list_faqs

router = APIRouter(prefix="/business", tags=["business"])


@router.get("/faqs", response_model=list[FaqRead])
def get_business_faqs() -> list[FaqRead]:
    return [FaqRead(**faq.__dict__) for faq in list_faqs()]


@router.post("/faqs", response_model=FaqRead, status_code=status.HTTP_201_CREATED)
def post_business_faq(payload: FaqCreate) -> FaqRead:
    faq = create_faq(payload)
    return FaqRead(**faq.__dict__)


@router.post("/ask", response_model=BusinessAskResponse)
def ask_business(payload: BusinessAskRequest) -> BusinessAskResponse:
    return answer_business_question(payload)
