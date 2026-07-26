import os

class Settings:
    PROJECT_NAME = "Vyapar Mandap"
    API_V1_STR = "/api/v1"
    DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./vyapar_mandap.db")
    SECRET_KEY = "vyapar-mandap-super-secret-key-2026-codex"
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24

settings = Settings()
