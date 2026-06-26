from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import business, health, missions, ml, rag


app = FastAPI(
    title="AI 技術任務 API",
    description="AI 技術任務的 mock-first 後端 API，支援文件問答、模型分類與店家 AI 助手。",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(missions.router)
app.include_router(rag.router)
app.include_router(ml.router)
app.include_router(business.router)
