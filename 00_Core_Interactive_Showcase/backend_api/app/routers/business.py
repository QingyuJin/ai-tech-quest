from fastapi import APIRouter, status

from app.schemas.business import BusinessAskRequest, BusinessAskResponse, FaqCreate, FaqResponse
from app.services.business_service import answer_business_question, create_faq, list_faqs

router = APIRouter(prefix="/business", tags=["business"])


@router.get("/faqs", response_model=list[FaqResponse])
def get_faqs() -> list[FaqResponse]:
    return [FaqResponse(**faq.__dict__) for faq in list_faqs()]


@router.post("/faqs", response_model=FaqResponse, status_code=status.HTTP_201_CREATED)
def post_faq(payload: FaqCreate) -> FaqResponse:
    faq = create_faq(payload)
    return FaqResponse(**faq.__dict__)


@router.post("/ask", response_model=BusinessAskResponse)
def ask_business(payload: BusinessAskRequest) -> BusinessAskResponse:
    return answer_business_question(payload)
