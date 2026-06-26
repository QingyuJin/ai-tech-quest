from app.models.mission import MissionRecord


MISSIONS = [
    MissionRecord(
        id="rag",
        title="RAG 文件調查員",
        summary="文件問答、引用來源、可信任回答。",
        route="/missions/rag",
        stack=["Chunking", "Embedding", "Vector Search", "Citation"],
    ),
    MissionRecord(
        id="ml",
        title="ML 分類挑戰",
        summary="資料點分類、模型結果、accuracy 與 confusion matrix。",
        route="/missions/ml",
        stack=["Dataset", "Classifier", "Evaluation", "Visualization"],
    ),
    MissionRecord(
        id="business",
        title="AI 店家助手",
        summary="FAQ 後台、顧客問答與可接案商業應用。",
        route="/missions/business",
        stack=["FastAPI", "FAQ Matching", "Database-ready", "AI-ready"],
    ),
]


def list_missions() -> list[MissionRecord]:
    return MISSIONS
