from fastapi import APIRouter

from app.schemas.business import (
    BusinessAskRequest,
    BusinessAskResponse,
    FaqCreateRequest,
    FaqResponse,
)
from app.services.business_service import ask_business, create_faq, list_faqs


router = APIRouter(prefix="/business", tags=["Business Assistant"])


@router.get("/faqs", response_model=list[FaqResponse])
def get_faqs() -> list[FaqResponse]:
    return list_faqs()


@router.post("/faqs", response_model=FaqResponse, status_code=201)
def add_faq(request: FaqCreateRequest) -> FaqResponse:
    return create_faq(request)


@router.post("/ask", response_model=BusinessAskResponse)
def ask_customer_question(request: BusinessAskRequest) -> BusinessAskResponse:
    return ask_business(request)
