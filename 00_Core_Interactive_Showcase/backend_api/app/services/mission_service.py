from app.data.mock_store import mock_store
from app.models.mission import Mission


def list_missions() -> list[Mission]:
    return mock_store.list_missions()
