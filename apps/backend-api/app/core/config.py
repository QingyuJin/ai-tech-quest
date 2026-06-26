import os
from dataclasses import dataclass


def _split_csv(value: str) -> tuple[str, ...]:
    return tuple(item.strip() for item in value.split(",") if item.strip())


@dataclass(frozen=True)
class Settings:
    app_name: str = "AI Tech Quest API"
    api_version: str = "0.1.0"
    environment: str = os.getenv("APP_ENV", "development")
    cors_origins: tuple[str, ...] = _split_csv(
        os.getenv("CORS_ORIGINS", "http://127.0.0.1:5173,http://localhost:5173")
    )


settings = Settings()
