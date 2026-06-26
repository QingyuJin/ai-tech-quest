# API Design

Base URL for local development:

```text
http://127.0.0.1:8000
```

## Endpoints

| Method | Path | Purpose |
|---|---|---|
| GET | `/health` | Service health check |
| GET | `/missions` | List available missions |
| POST | `/rag/ask` | Ask a question against a mock RAG document |
| POST | `/ml/predict` | Submit player classifications and receive model comparison |
| GET | `/business/faqs` | List FAQ entries |
| POST | `/business/faqs` | Create a new FAQ entry |
| POST | `/business/ask` | Ask the business assistant a customer question |

## GET /health

Response:

```json
{
  "status": "ok",
  "service": "AI Tech Quest API",
  "version": "0.1.0",
  "environment": "development"
}
```

## GET /missions

Response:

```json
[
  {
    "id": "rag",
    "title": "RAG 文件調查員",
    "summary": "文件問答、引用來源、可信任回答。",
    "route": "/missions/rag",
    "stack": ["Chunking", "Embedding", "Vector Search", "Citation"],
    "status": "available"
  }
]
```

## POST /rag/ask

Request:

```json
{
  "document_id": "qingyu-cafe",
  "question": "這份文件的營業時間和預約方式是什麼？"
}
```

Response:

```json
{
  "document_title": "晴宇咖啡店家資訊",
  "answer": "根據「晴宇咖啡店家資訊」...",
  "citations": [
    {
      "source_id": "Source 1",
      "title": "營業時間",
      "excerpt": "晴宇咖啡週一到週五 10:00-20:00 營業..."
    }
  ],
  "confidence": "high"
}
```

## POST /ml/predict

Request:

```json
{
  "selected_labels": {
    "p1": "A",
    "p2": "A",
    "p3": "B",
    "p4": "B",
    "p5": "C",
    "p6": "C"
  }
}
```

Response:

```json
{
  "rows": [
    {
      "id": "p1",
      "name": "A-01",
      "selected_label": "A",
      "model_label": "A",
      "is_correct": true
    }
  ],
  "accuracy": 100,
  "confusion_matrix": [
    {
      "actual": "A",
      "predicted": {
        "A": 2,
        "B": 0,
        "C": 0
      }
    }
  ],
  "insight": "分類完全命中，代表玩家判斷與 mock model 一致。"
}
```

## GET /business/faqs

Response:

```json
[
  {
    "id": "faq-hours",
    "question": "營業時間是什麼？",
    "answer": "週一到週五 10:00-20:00，週末 09:00-21:00。",
    "tags": ["營業", "時間", "幾點"]
  }
]
```

## POST /business/faqs

Request:

```json
{
  "question": "有提供插座嗎？",
  "answer": "有，靠窗座位與工作區提供插座。",
  "tags": ["插座", "工作", "座位"]
}
```

Response:

```json
{
  "id": "faq-1234abcd",
  "question": "有提供插座嗎？",
  "answer": "有，靠窗座位與工作區提供插座。",
  "tags": ["插座", "工作", "座位"]
}
```

## POST /business/ask

Request:

```json
{
  "question": "請問可以預約座位嗎？"
}
```

Response:

```json
{
  "answer": "可以，請透過 LINE 預約座位。",
  "matched_question": "可以預約嗎？",
  "confidence": "medium",
  "action": "命中 FAQ，可直接回覆顧客並記錄詢問主題。"
}
```
