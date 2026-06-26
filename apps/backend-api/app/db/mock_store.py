from app.models.faq import FaqRecord


class MockStore:
    """Temporary in-memory store until SQLite or a hosted database is added."""

    def __init__(self) -> None:
        self._faqs: list[FaqRecord] = [
            FaqRecord(
                id="faq-hours",
                question="營業時間是什麼？",
                answer="週一到週五 10:00-20:00，週末 09:00-21:00。",
                tags=["營業", "時間", "幾點"],
            ),
            FaqRecord(
                id="faq-address",
                question="店家地址在哪裡？",
                answer="嘉義市範例路 100 號，靠近中正大學。",
                tags=["地址", "地點", "交通"],
            ),
            FaqRecord(
                id="faq-booking",
                question="可以預約嗎？",
                answer="可以，請透過 LINE 預約座位。",
                tags=["預約", "訂位", "LINE"],
            ),
        ]

    def list_faqs(self) -> list[FaqRecord]:
        return list(self._faqs)

    def add_faq(self, faq: FaqRecord) -> FaqRecord:
        self._faqs.insert(0, faq)
        return faq


mock_store = MockStore()
