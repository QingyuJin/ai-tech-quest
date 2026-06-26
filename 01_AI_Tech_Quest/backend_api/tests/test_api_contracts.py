from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_health_endpoint():
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_cors_allows_production_frontend():
    response = client.options(
        "/health",
        headers={
            "Origin": "https://ai-tech-quest.vercel.app",
            "Access-Control-Request-Method": "GET",
        },
    )

    assert response.status_code == 200
    assert response.headers["access-control-allow-origin"] == "https://ai-tech-quest.vercel.app"


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
    assert len(payload["sources"]) == 2


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
            "question": "可以預約工作坊嗎？",
            "answer": "可以。工作坊預約可以透過 LINE 聯絡。",
            "tags": ["工作坊", "預約", "LINE"],
        },
    )

    assert create_response.status_code == 201

    ask_response = client.post(
        "/business/ask",
        json={"question": "可以用 LINE 預約工作坊嗎？"},
    )

    assert ask_response.status_code == 200
    assert ask_response.json()["confidence"] == "high"
