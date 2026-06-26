from app.models.document import DocumentRecord, DocumentSection
from app.schemas.rag import Citation, RagAskRequest, RagAskResponse


DOCUMENTS = [
    DocumentRecord(
        id="qingyu-cafe",
        title="晴宇咖啡店家資訊",
        kind="店家 FAQ",
        owner="AI Business Assistant demo",
        sections=[
            DocumentSection(
                source_id="Source 1",
                title="營業時間",
                content="晴宇咖啡週一到週五 10:00-20:00 營業，週末 09:00-21:00 營業。",
            ),
            DocumentSection(
                source_id="Source 2",
                title="地址與交通",
                content="店址位於嘉義市範例路 100 號，靠近中正大學，可由公車站步行抵達。",
            ),
            DocumentSection(
                source_id="Source 3",
                title="預約與座位",
                content="顧客可以透過 LINE 預約座位，部分座位提供插座與安靜工作區。",
            ),
        ],
    ),
    DocumentRecord(
        id="civic-rag",
        title="TW Civic RAG 評測計畫",
        kind="技術文件",
        owner="TW Civic RAG",
        sections=[
            DocumentSection(
                source_id="Source 1",
                title="評測指標",
                content="系統會追蹤 retrieval recall、citation correctness、answer accuracy 與 faithfulness。",
            ),
            DocumentSection(
                source_id="Source 2",
                title="測試資料",
                content="評測集預計建立 30 到 50 題繁體中文問題，每題包含 expected answer 與 supporting document。",
            ),
            DocumentSection(
                source_id="Source 3",
                title="實驗變因",
                content="可比較 chunk size、top-k、embedding model 與 hallucination cases 對回答品質的影響。",
            ),
        ],
    ),
]


def answer_rag_question(request: RagAskRequest) -> RagAskResponse:
    document = next((item for item in DOCUMENTS if item.id == request.document_id), DOCUMENTS[0])
    matches = _match_sections(document, request.question)
    citations = matches if matches else document.sections[:2]
    answer = _build_answer(document, request.question, citations)

    return RagAskResponse(
        document_title=document.title,
        answer=answer,
        citations=[
            Citation(source_id=section.source_id, title=section.title, excerpt=section.content)
            for section in citations
        ],
        confidence="high" if len(citations) >= 2 else "medium",
    )


def _match_sections(document: DocumentRecord, question: str) -> list[DocumentSection]:
    tokens = [token for token in _tokenize(question) if len(token) > 1]
    return [
        section
        for section in document.sections
        if any(token in f"{section.title} {section.content}".lower() for token in tokens)
    ]


def _tokenize(text: str) -> list[str]:
    normalized = text.lower()
    for separator in ["，", "。", "？", "?", "、", ","]:
        normalized = normalized.replace(separator, " ")
    return normalized.split()


def _build_answer(
    document: DocumentRecord,
    question: str,
    citations: list[DocumentSection],
) -> str:
    topics = "、".join(section.title for section in citations)
    return f"根據「{document.title}」，針對「{question}」最相關的來源是 {topics}。目前回覆由 mock RAG service 產生，下一版可替換成真正檢索與生成流程。"
