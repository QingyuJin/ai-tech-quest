from copy import deepcopy
from uuid import uuid4

from app.data.mock_data import DEFAULT_FAQS
from app.models.domain import FaqModel
from app.schemas.business import (
    BusinessAskRequest,
    BusinessAskResponse,
    FaqCreateRequest,
    FaqResponse,
)


_faqs: list[FaqModel] = deepcopy(DEFAULT_FAQS)


def _normalize_tags(tags: list[str]) -> list[str]:
    return [tag.strip().lower() for tag in tags if tag.strip()]


def _tokenize(text: str) -> list[str]:
    cleaned = "".join(char.lower() if char.isalnum() else " " for char in text)
    return [token for token in cleaned.split() if len(token) > 2]


def _faq_to_response(faq: FaqModel) -> FaqResponse:
    return FaqResponse(id=faq.id, question=faq.question, answer=faq.answer, tags=faq.tags)


def _score_faq(question: str, faq: FaqModel) -> int:
    normalized = question.lower()
    tag_score = sum(4 for tag in faq.tags if tag.lower() in normalized)
    text_score = sum(1 for token in _tokenize(faq.question) if token in normalized)
    return tag_score + text_score


def _playful_fallback(question: str) -> tuple[str, list[str], str] | None:
    normalized = question.lower()
    asks_about_boss = any(keyword in normalized for keyword in ["老闆", "店長", "闆娘"])
    asks_about_looks = any(keyword in normalized for keyword in ["帥", "漂亮", "可愛", "顏值", "好看"])

    if asks_about_boss and asks_about_looks:
        return (
            "這題目前沒有命中正式 FAQ，所以不能當成店家承諾。不過展示版可以幽默回一下："
            "老闆最帥的地方，大概是願意把重複問題交給 AI，讓店員少回一百次營業時間。",
            ["品牌語氣", "玩笑題"],
            "這類問題適合設計成品牌語氣彩蛋；正式上線前仍要由店家確認可用回覆。",
        )

    if any(keyword in normalized for keyword in ["恐龍", "外星人", "飛碟", "魔法"]):
        return (
            "這題沒有命中 FAQ。正式版會建立待回覆任務；展示版先開個玩笑："
            "如果外星人要預約，請先確認他們用不用 LINE，還是只收宇宙頻道通知。",
            ["品牌語氣", "待確認"],
            "把問題加入待回覆清單，店家確認後可新增成 FAQ 或品牌彩蛋。",
        )

    return None


def _no_match_response(question: str) -> BusinessAskResponse:
    playful_fallback = _playful_fallback(question)

    if playful_fallback:
        answer, matched_tags, action = playful_fallback
        return BusinessAskResponse(
            answer=answer,
            confidence="low",
            matched_faq=None,
            matched_tags=matched_tags,
            action=action,
        )

    return BusinessAskResponse(
        answer=(
            "目前找不到足夠可靠的 FAQ 配對。正式版應該建立待回覆任務，"
            "或在商業規則限制下交給 AI 助手處理。"
        ),
        confidence="low",
        matched_faq=None,
        matched_tags=[],
        action="新增一筆 FAQ，或將問題交給店員確認後再回覆。",
    )


def list_faqs() -> list[FaqResponse]:
    return [_faq_to_response(faq) for faq in _faqs]


def create_faq(request: FaqCreateRequest) -> FaqResponse:
    faq = FaqModel(
        id=f"faq-{uuid4().hex[:8]}",
        question=request.question.strip(),
        answer=request.answer.strip(),
        tags=_normalize_tags(request.tags),
    )
    _faqs.insert(0, faq)
    return _faq_to_response(faq)


def ask_business(request: BusinessAskRequest) -> BusinessAskResponse:
    question = request.question.strip()
    ranked = sorted(
        ((faq, _score_faq(question, faq)) for faq in _faqs),
        key=lambda item: item[1],
        reverse=True,
    )
    best_faq, best_score = ranked[0] if ranked else (None, 0)

    if best_faq is None or best_score == 0:
        return _no_match_response(question)

    matched_tags = [tag for tag in best_faq.tags if tag.lower() in question.lower()]
    return BusinessAskResponse(
        answer=best_faq.answer,
        confidence="high" if best_score >= 4 else "medium",
        matched_faq=_faq_to_response(best_faq),
        matched_tags=matched_tags,
        action="使用命中的 FAQ 自動回覆，並保存問題紀錄供店家分析。",
    )
