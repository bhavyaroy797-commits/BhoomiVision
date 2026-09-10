"""
Shared extension instances. Kept separate from app/__init__.py
to avoid circular imports across models/routes/services.
"""
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from pymongo import MongoClient
from pymongo.errors import PyMongoError


class MongoManager:
    """Small wrapper around PyMongo client with lazy init."""

    def __init__(self):
        self.client: MongoClient | None = None
        self.db = None
        self._uri: str | None = None
        self._dbname: str | None = None

    def init_app(self, uri: str, dbname: str) -> None:
        self._uri = uri
        self._dbname = dbname
        try:
            # serverSelectionTimeoutMS keeps boot fast if Mongo is down
            self.client = MongoClient(uri, serverSelectionTimeoutMS=3000)
            self.db = self.client[dbname]
            self.client.admin.command("ping")
        except PyMongoError:
            # Defer hard failure to request time
            self.client = MongoClient(uri, serverSelectionTimeoutMS=3000)
            self.db = self.client[dbname]

    def is_connected(self) -> bool:
        if self.client is None:
            return False
        try:
            self.client.admin.command("ping")
            return True
        except PyMongoError:
            return False

    def collection(self, name: str):
        if self.db is None:
            raise RuntimeError("MongoDB is not initialized")
        return self.db[name]


db = SQLAlchemy()
bcrypt = Bcrypt()
jwt = JWTManager()
mongo_client = MongoManager()