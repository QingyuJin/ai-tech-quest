from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import business, health, missions, ml, rag


def create_app() -> FastAPI:
    app = FastAPI(
        title="AI Tech Quest API",
        version="0.1.0",
        description="Mock-first backend for AI Tech Quest interactive missions.",
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            "http://127.0.0.1:5173",
            "http://localhost:5173",
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
    return app


app = create_app()
