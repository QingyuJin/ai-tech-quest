from app.models.faq import Faq
from app.models.mission import Mission


class MockStore:
    def __init__(self) -> None:
        self.faqs: list[Faq] = [
            Faq(
                id="faq-hours",
                question="營業時間是什麼？",
                answer="週一到週五 10:00-20:00，週末與國定假日 09:00-21:00。",
                tags=["營業", "時間", "幾點", "週末", "假日"],
            ),
            Faq(
                id="faq-location",
                question="地址在哪裡？",
                answer="嘉義市範例路 100 號，靠近中正大學，從公車站步行約 5 分鐘。",
                tags=["地址", "地點", "交通", "嘉義", "中正大學"],
            ),
            Faq(
                id="faq-booking",
                question="可以預約嗎？",
                answer="可以，請透過 LINE 官方帳號預約座位。六人以上建議提前一天預約。",
                tags=["預約", "訂位", "LINE", "座位"],
            ),
            Faq(
                id="faq-power",
                question="店內有插座嗎？",
                answer="靠窗座位與工作區提供插座，尖峰時段每組顧客最多使用 3 小時。",
                tags=["插座", "充電", "工作", "座位"],
            ),
        ]
        self.missions: list[Mission] = [
            Mission(
                id="rag",
                title="RAG 文件調查員",
                route="/missions/rag",
                summary="Document QA with source citations.",
                stack=["RAG", "Embedding", "Vector Search", "Citation"],
            ),
            Mission(
                id="ml",
                title="ML 分類挑戰",
                route="/missions/ml",
                summary="Classification challenge with evaluation.",
                stack=["Feature Engineering", "Classification", "Evaluation"],
            ),
            Mission(
                id="business",
                title="AI 店家助手",
                route="/missions/business",
                summary="FAQ admin and customer assistant demo.",
                stack=["FastAPI", "FAQ Matching", "Database-ready", "AI Assistant"],
            ),
        ]

    def list_faqs(self) -> list[Faq]:
        return list(self.faqs)

    def add_faq(self, faq: Faq) -> Faq:
        self.faqs.insert(0, faq)
        return faq

    def list_missions(self) -> list[Mission]:
        return list(self.missions)


mock_store = MockStore()
