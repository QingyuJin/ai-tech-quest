from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_health_endpoint() -> None:
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_missions_endpoint() -> None:
    response = client.get("/missions")

    assert response.status_code == 200
    mission_ids = {mission["id"] for mission in response.json()}
    assert {"rag", "ml", "business"}.issubset(mission_ids)


def test_rag_mock_endpoint() -> None:
    response = client.post(
        "/rag/ask",
        json={"question": "Can I book a seat?", "document_id": "qingyu-cafe-info"},
    )

    assert response.status_code == 200
    body = response.json()
    assert body["answer"]
    assert body["sources"]


def test_ml_mock_endpoint() -> None:
    response = client.post(
        "/ml/predict",
        json={"sample_id": "unknown-01", "activity_score": 72, "consistency_score": 64},
    )

    assert response.status_code == 200
    body = response.json()
    assert body["model_prediction"] in {"A", "B", "C"}
    assert body["confusion_matrix"]


def test_business_faq_create_and_ask_flow() -> None:
    create_response = client.post(
        "/business/faqs",
        json={
            "question": "Do you have Wi-Fi?",
            "answer": "Yes, free Wi-Fi is available for customers.",
            "tags": ["wifi", "internet"],
        },
    )

    assert create_response.status_code == 201

    ask_response = client.post("/business/ask", json={"question": "Is wifi available?"})

    assert ask_response.status_code == 200
    body = ask_response.json()
    assert body["matched_faq"]["question"] == "Do you have Wi-Fi?"
    assert "wifi" in body["matched_tags"]
