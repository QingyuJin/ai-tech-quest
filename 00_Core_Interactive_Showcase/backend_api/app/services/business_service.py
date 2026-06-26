from uuid import uuid4

from app.data.mock_store import mock_store
from app.models.faq import Faq
from app.schemas.business import BusinessAskRequest, BusinessAskResponse, FaqCreate, MatchedFaq


def list_faqs() -> list[Faq]:
    return mock_store.list_faqs()


def create_faq(payload: FaqCreate) -> Faq:
    faq = Faq(
        id=f"faq-{uuid4().hex[:8]}",
        question=payload.question.strip(),
        answer=payload.answer.strip(),
        tags=[tag.strip() for tag in payload.tags if tag.strip()],
    )
    return mock_store.add_faq(faq)


def answer_business_question(payload: BusinessAskRequest) -> BusinessAskResponse:
    question = payload.question.strip()
    ranked = sorted(
        ((_score_faq(question, faq), faq) for faq in mock_store.list_faqs()),
        key=lambda item: item[0],
        reverse=True,
    )
    score, faq = ranked[0] if ranked else (0, None)

    if faq is None or score == 0:
        return BusinessAskResponse(
            answer="目前 FAQ 沒有明確答案。建議店家新增這題，或未來交給 AI assistant fallback。",
            confidence="low",
            matched_faq=None,
            matched_tags=[],
            action="新增 FAQ 或轉人工確認。",
        )

    matched_tags = [tag for tag in faq.tags if tag.lower() in question.lower()]
    return BusinessAskResponse(
        answer=faq.answer,
        confidence="high" if score >= 4 else "medium",
        matched_faq=MatchedFaq(id=faq.id, question=faq.question, answer=faq.answer),
        matched_tags=matched_tags,
        action="命中 FAQ，可直接回覆顧客並記錄詢問主題。",
    )


def _score_faq(question: str, faq: Faq) -> int:
    normalized = question.lower()
    tag_score = sum(3 for tag in faq.tags if tag.lower() in normalized)
    text_score = sum(1 for token in faq.question.lower().replace("？", " ").split() if token in normalized)
    return tag_score + text_score
