"""
Centralized configuration for BHOOMIVISION backend.

Splits persistence layer:
    - MySQL (Flask-SQLAlchemy): users, credentials, RBAC
    - MongoDB (PyMongo): land records, research docs, policies, districts
"""
import os
from datetime import timedelta
from dotenv import load_dotenv

# Load .env from backend/ regardless of CWD
BASE_DIR = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
load_dotenv(os.path.join(BASE_DIR, ".env"))


class Config:
    # ---------- Flask core ----------
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-key-change-me")
    JSON_SORT_KEYS = False
    PROPAGATE_EXCEPTIONS = True

    # ---------- MySQL (SQLAlchemy) ----------
    MYSQL_HOST = os.getenv("MYSQL_HOST", "localhost")
    MYSQL_PORT = int(os.getenv("MYSQL_PORT", "3306"))
    MYSQL_USER = os.getenv("MYSQL_USER", "root")
    MYSQL_PASSWORD = os.getenv("MYSQL_PASSWORD", "root")
    MYSQL_DB = os.getenv("MYSQL_DB", "bhoomivision")

    SQLALCHEMY_DATABASE_URI = (
        f"mysql+pymysql://{MYSQL_USER}:{MYSQL_PASSWORD}"
        f"@{MYSQL_HOST}:{MYSQL_PORT}/{MYSQL_DB}?charset=utf8mb4"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ENGINE_OPTIONS = {
        "pool_pre_ping": True,
        "pool_recycle": 280,
        "pool_size": 10,
        "max_overflow": 20,
    }

    # ---------- MongoDB (PyMongo) ----------
    MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
    MONGO_DB = os.getenv("MONGO_DB", "bhoomivision")

    # ---------- JWT ----------
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", SECRET_KEY)
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(
        hours=int(os.getenv("JWT_ACCESS_TOKEN_EXPIRES_HOURS", "12"))
    )
    JWT_TOKEN_LOCATION = ["headers"]
    JWT_HEADER_NAME = "Authorization"
    JWT_HEADER_TYPE = "Bearer"

    # ---------- CORS ----------
    CORS_ORIGINS = [
        o.strip()
        for o in os.getenv(
            "CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173"
        ).split(",")
        if o.strip()
    ]

    # ---------- AI ----------
    AI_API_KEY = os.getenv("AI_API_KEY", "")
    AI_MODEL = os.getenv("AI_MODEL", "llama-3.1-8b-instant")
    AI_API_URL = os.getenv(
        "AI_API_URL", "https://api.groq.com/openai/v1/chat/completions"
    )

    # ---------- Data folder ----------
    DATA_DIR = os.path.join(BASE_DIR, "data")


class DevelopmentConfig(Config):
    DEBUG = True


class ProductionConfig(Config):
    DEBUG = False


def get_config():
    env = os.getenv("FLASK_ENV", "development").lower()
    return ProductionConfig if env == "production" else DevelopmentConfig