from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_health_endpoint():
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_missions_endpoint():
    response = client.get("/missions")

    assert response.status_code == 200
    assert len(response.json()) >= 3


def test_rag_ask_endpoint():
    response = client.post("/rag/ask", json={"question": "營業時間是什麼？", "top_k": 2})

    assert response.status_code == 200
    payload = response.json()
    assert payload["confidence"] in {"high", "medium", "low"}
    assert "晴宇咖啡" in payload["answer"]
    assert payload["sources"]


def test_ml_predict_endpoint():
    response = client.post(
        "/ml/predict",
        json={"activity_score": 76, "consistency_score": 64, "correct_label": "B"},
    )

    assert response.status_code == 200
    assert response.json()["model_prediction"] == "B"


def test_business_faq_and_ask_endpoints():
    create_response = client.post(
        "/business/faqs",
        json={
            "question": "Can customers book workshops?",
            "answer": "Yes. Workshop booking is available through LINE.",
            "tags": ["workshop", "booking", "line"],
        },
    )

    assert create_response.status_code == 201

    ask_response = client.post(
        "/business/ask",
        json={"question": "Can I book a workshop through LINE?"},
    )

    assert ask_response.status_code == 200
    assert ask_response.json()["confidence"] == "high"
