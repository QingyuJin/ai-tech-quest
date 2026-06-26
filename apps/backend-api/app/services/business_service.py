from uuid import uuid4

from app.db.mock_store import mock_store
from app.models.faq import FaqRecord
from app.schemas.business import BusinessAskRequest, BusinessAskResponse, FaqCreate


def list_faqs() -> list[FaqRecord]:
    return mock_store.list_faqs()


def create_faq(payload: FaqCreate) -> FaqRecord:
    tags = payload.tags if payload.tags else _derive_tags(payload.question)
    faq = FaqRecord(
        id=f"faq-{uuid4().hex[:8]}",
        question=payload.question.strip(),
        answer=payload.answer.strip(),
        tags=[tag.strip() for tag in tags if tag.strip()],
    )
    return mock_store.add_faq(faq)


def answer_business_question(payload: BusinessAskRequest) -> BusinessAskResponse:
    question = payload.question.strip()
    scored = sorted(
        ((_score_faq(question, faq), faq) for faq in mock_store.list_faqs()),
        key=lambda item: item[0],
        reverse=True,
    )

    score, faq = scored[0] if scored else (0, None)
    if faq is None or score == 0:
        return BusinessAskResponse(
            answer="目前 FAQ 還沒有明確資料，建議店家新增這個問題，或交給 AI assistant fallback。",
            matched_question=None,
            confidence="low",
            action="新增 FAQ 或交給 AI fallback。",
        )

    return BusinessAskResponse(
        answer=faq.answer,
        matched_question=faq.question,
        confidence="high" if score >= 2 else "medium",
        action="命中 FAQ，可直接回覆顧客並記錄詢問主題。",
    )


def _score_faq(question: str, faq: FaqRecord) -> int:
    normalized = question.lower()
    return sum(1 for tag in faq.tags if tag.lower() in normalized)


def _derive_tags(question: str) -> list[str]:
    return [token for token in question.replace("？", " ").replace("?", " ").split() if token]
