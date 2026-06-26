# AI 技術任務 Backend API

這是 AI 技術任務的 FastAPI 後端。後端採 mock-first 設計，先提供穩定 API contract，未來再替換成真 RAG、真 ML、資料庫與 LLM assistant。

## Tech Stack

- FastAPI
- Pydantic
- Uvicorn
- in-memory mock data
- 未來：SQLite、Supabase、向量資料庫（Vector DB）、ML model serving、LLM assistant

## Project Structure

```text
backend_api/
|-- app/
|   |-- main.py
|   |-- routers/
|   |-- services/
|   |-- schemas/
|   |-- models/
|   `-- data/
|-- tests/
|-- requirements.txt
`-- README.md
```

## API Endpoints

- `GET /health`
- `GET /missions`
- `POST /rag/ask`
- `POST /ml/predict`
- `GET /business/faqs`
- `POST /business/faqs`
- `POST /business/ask`

Swagger API 文件：

```text
http://127.0.0.1:8010/docs
```

## 啟動

```powershell
cd 01_AI_Tech_Quest/backend_api
.\.venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8010 --reload
```

如果需要重新建立環境：

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

## RAG 測試範例

```json
{
  "question": "營業時間是什麼？",
  "top_k": 2
}
```

預期會回傳中文答案、信心分數、來源列表與引用片段。

## Mock 邊界

- RAG 目前用關鍵字與標籤配對文件片段。
- ML 目前用簡化規則，不是真實訓練模型。
- 店家 AI 助手 FAQ 目前存在 process memory。
- server restart 後 in-memory 資料會重置。
- 目前不需要外部 LLM、Embedding model、Vector DB 或 Supabase。

## Future Replacement Points

- `app/services/rag_service.py`：替換成文件上傳、語意向量（Embedding）、向量搜尋（Vector Search）與來源引用。
- `app/services/ml_service.py`：替換成 sklearn / PyTorch / model serving adapter。
- `app/services/business_service.py`：替換成 SQLite、PostgreSQL 或 Supabase。
- `app/routers/*`：維持 route contract 穩定，讓 service 可以逐步升級。
