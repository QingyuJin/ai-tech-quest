from pydantic import BaseModel


class HealthResponse(BaseModel):
    status: str
    service: str
    version: str


class ApiInfoResponse(BaseModel):
    service: str
    version: str
    status: str
    docs_url: str
    health_url: str
    frontend_url: str
