# AI 技術任務 Backend API

這是 AI 技術任務的 FastAPI 後端。後端採 mock-first 設計，先提供穩定 API contract，未來再替換成真 RAG、真 ML、資料庫與 LLM assistant。

## Tech Stack

- FastAPI
- Pydantic
- Uvicorn
- in-memory mock data
- 未來：SQLite、Supabase、向量資料庫（Vector DB）、ML model serving、LLM assistant

## API Endpoints

- `GET /health`
- `GET /missions`
- `POST /rag/ask`
- `POST /ml/predict`
- `GET /business/faqs`
- `POST /business/faqs`
- `POST /business/ask`

## Local Development

```powershell
cd 01_AI_Tech_Quest/backend_api
.\.venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8010 --reload
```

API docs:

```text
http://127.0.0.1:8010/docs
```

如果需要重新建立環境：

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

## Render Deployment

建議使用 Render 作為第三步後端部署平台。

### Option A: Blueprint

repo 根目錄已提供：

```text
render.yaml
```

Render 匯入 GitHub repo 後，可以用 Blueprint 建立服務。

### Option B: Manual Web Service

如果手動建立 Render Web Service，請使用：

```text
Root Directory: 01_AI_Tech_Quest/backend_api
Runtime: Python
Build Command: pip install -r requirements.txt
Start Command: uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

Environment variables:

```text
PYTHON_VERSION=3.12.5
CORS_ORIGINS=https://ai-tech-quest.vercel.app
```

部署完成後測：

```text
https://YOUR_RENDER_URL/health
https://YOUR_RENDER_URL/docs
```

## RAG 測試範例

```json
{
  "question": "營業時間是什麼？",
  "top_k": 2
}
```

預期會回傳中文答案、信心分數、來源列表與引用片段。

## Mock Boundaries

- RAG 目前用關鍵字與標籤配對文件片段。
- RAG 與店家 AI 助手支援展示用幽默 fallback，例如「老闆帥嗎？」會回低信心玩笑答案，並保留「沒有正式來源」的資料邊界。
- ML 目前用簡化規則，不是真實訓練模型。
- 店家 AI 助手 FAQ 目前存在 process memory。
- server restart 後 in-memory 資料會重置。
- 目前不需要外部 LLM、Embedding model、Vector DB 或 Supabase。

## Future Replacement Points

- `app/services/rag_service.py`：替換成文件上傳、語意向量（Embedding）、向量搜尋（Vector Search）與來源引用。
- `app/services/ml_service.py`：替換成 sklearn / PyTorch / model serving adapter。
- `app/services/business_service.py`：替換成 SQLite、PostgreSQL 或 Supabase。
- `app/routers/*`：維持 route contract 穩定，讓 service 可以逐步升級。
