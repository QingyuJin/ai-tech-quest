# Models

Models are internal domain objects used by services and mock storage.

They are intentionally separate from Pydantic schemas so the API contract can stay stable even if the internal storage model changes.
