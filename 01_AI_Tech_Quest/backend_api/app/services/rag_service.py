from typing import Any

from app.data.mock_data import RAG_CHUNKS, RAG_DOCUMENT_TITLE
from app.schemas.rag import RagAskResponse, RagSourceResponse


FALLBACK_SOURCE = RagSourceResponse(
    source_id="Source 1",
    heading="未命中明確來源",
    chunk_id="fallback",
    snippet="目前 mock 文件沒有找到足夠相關的片段，系統會降低信心並避免把沒有來源的內容說成事實。",
    relevance=0.32,
)

PLAYFUL_FALLBACK_SNIPPET = "文件沒有記載這類主觀或玩笑題；系統以低信心幽默回覆，並提醒使用者回到可查證資訊。"


def _normalize(text: str) -> str:
    return text.lower().strip()


def _score_chunk(question: str, chunk: Any) -> float:
    normalized_question = _normalize(question)
    score = 0.0

    for keyword in chunk.tags:
        if _normalize(keyword) in normalized_question:
            score += 2.5

    for token in _normalize(chunk.heading).split():
        if token and token in normalized_question:
            score += 1.0

    if chunk.heading in question:
        score += 1.5

    return score


def _build_answer(primary_heading: str, primary_body: str) -> str:
    return f"根據文件「{primary_heading}」，{primary_body}"


def _playful_fallback(question: str) -> tuple[str, str] | None:
    normalized = _normalize(question)
    asks_about_boss = any(keyword in normalized for keyword in ["老闆", "店長", "闆娘"])
    asks_about_looks = any(keyword in normalized for keyword in ["帥", "漂亮", "可愛", "顏值", "好看"])

    if asks_about_boss and asks_about_looks:
        return (
            "文件沒有記載老闆顏值，所以我不能把玩笑當成資料來源。不過如果以產品精神來看，"
            "願意把店家 FAQ 做成 AI 助手的人，帥點大概是加在解決問題的能力上。",
            "mock 檢索沒有找到來源；偵測到展示型玩笑問題，因此以低信心幽默回覆並保留資料邊界。",
        )

    if any(keyword in normalized for keyword in ["恐龍", "外星人", "飛碟", "魔法"]):
        return (
            "這題超出晴宇咖啡文件範圍。正式系統會回答不知道；展示版補一句："
            "如果恐龍真的要訂位，可能要先確認門口高度和低消是不是一整片森林。",
            "mock 檢索沒有找到來源；偵測到幻想型問題，因此用低信心幽默回覆示範防止幻覺。",
        )

    return None


def _fallback_response(question: str) -> RagAskResponse:
    playful_fallback = _playful_fallback(question)
    source = (
        RagSourceResponse(
            source_id=FALLBACK_SOURCE.source_id,
            heading=FALLBACK_SOURCE.heading,
            chunk_id=FALLBACK_SOURCE.chunk_id,
            snippet=PLAYFUL_FALLBACK_SNIPPET,
            relevance=FALLBACK_SOURCE.relevance,
        )
        if playful_fallback
        else FALLBACK_SOURCE
    )

    return RagAskResponse(
        answer=playful_fallback[0]
        if playful_fallback
        else "目前文件中找不到足夠可靠的答案。正式的文件檢索增強生成（RAG）系統應該回答不知道，或請使用者提供更明確的問題。",
        confidence="low",
        sources=[source],
        cited_snippets=[source.snippet],
        retrieval_trace=playful_fallback[1] if playful_fallback else f"mock 檢索未在「{RAG_DOCUMENT_TITLE}」找到高相關片段。",
    )


def ask_document(question: str, top_k: int = 2) -> RagAskResponse:
    trimmed_question = question.strip()

    ranked_chunks = sorted(
        ((_score_chunk(trimmed_question, chunk), chunk) for chunk in RAG_CHUNKS),
        key=lambda item: item[0],
        reverse=True,
    )
    matched_chunks = [(score, chunk) for score, chunk in ranked_chunks if score > 0]

    if not matched_chunks:
        return _fallback_response(trimmed_question)

    selected_chunks = ranked_chunks[:top_k]
    best_chunk = selected_chunks[0][1]

    sources = [
        RagSourceResponse(
            source_id=f"Source {index + 1}",
            heading=chunk.heading,
            chunk_id=chunk.id,
            snippet=chunk.body,
            relevance=round(min(0.99, 0.42 + score * 0.1), 2),
        )
        for index, (score, chunk) in enumerate(selected_chunks)
    ]

    return RagAskResponse(
        answer=_build_answer(best_chunk.heading, best_chunk.body),
        confidence="high" if selected_chunks[0][0] >= 2.5 else "medium",
        sources=sources,
        cited_snippets=[source.snippet for source in sources],
        retrieval_trace=f"從「{RAG_DOCUMENT_TITLE}」取回 {len(sources)} 個相關文件片段，並用引用來源產生回答。",
    )


def ask_rag(question: str, top_k: int = 2) -> RagAskResponse:
    return ask_document(question=question, top_k=top_k)
