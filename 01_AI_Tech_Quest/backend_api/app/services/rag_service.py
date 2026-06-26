from typing import Any

from app.data.mock_data import RAG_CHUNKS, RAG_DOCUMENT_TITLE
from app.schemas.rag import RagAskResponse, RagSourceResponse


FALLBACK_SOURCE = RagSourceResponse(
    source_id="Source 1",
    heading="未命中明確來源",
    chunk_id="fallback",
    snippet="目前 mock 文件沒有找到足夠相關的片段，正式 RAG 系統應該回答不知道或請使用者補充問題。",
    relevance=0.32,
)


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


def ask_document(question: str, top_k: int = 2) -> RagAskResponse:
    trimmed_question = question.strip()

    ranked_chunks = sorted(
        ((_score_chunk(trimmed_question, chunk), chunk) for chunk in RAG_CHUNKS),
        key=lambda item: item[0],
        reverse=True,
    )
    matched_chunks = [(score, chunk) for score, chunk in ranked_chunks if score > 0]

    if not matched_chunks:
        return RagAskResponse(
            answer="目前文件中找不到足夠可靠的答案。正式的文件檢索增強生成（RAG）系統應該回答不知道，或請使用者提供更明確的問題。",
            confidence="low",
            sources=[FALLBACK_SOURCE],
            cited_snippets=[FALLBACK_SOURCE.snippet],
            retrieval_trace=f"mock 檢索未在「{RAG_DOCUMENT_TITLE}」找到高相關片段。",
        )

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
