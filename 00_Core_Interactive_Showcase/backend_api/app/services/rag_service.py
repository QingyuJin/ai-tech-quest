from app.schemas.rag import RagAskRequest, RagAskResponse, RagSource


MOCK_SOURCES = [
    RagSource(
        source_id="Source 1",
        heading="營業時間",
        snippet="晴宇咖啡週一到週五 10:00-20:00 營業，週末與國定假日 09:00-21:00。",
    ),
    RagSource(
        source_id="Source 2",
        heading="預約方式",
        snippet="顧客可以透過 LINE 官方帳號預約座位。六人以上建議提前一天預約。",
    ),
]


def ask_rag(payload: RagAskRequest) -> RagAskResponse:
    answer = (
        f"根據文件 `{payload.document_id}` 的 mock retrieval 結果，"
        f"針對「{payload.question}」最相關的來源是營業時間與預約方式。"
    )
    return RagAskResponse(
        answer=answer,
        confidence="medium",
        sources=MOCK_SOURCES,
        cited_snippets=[source.snippet for source in MOCK_SOURCES],
    )
