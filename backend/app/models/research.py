"""
Research document model layer (MongoDB).
"""
from datetime import datetime
from typing import Any, Dict, List, Optional

from bson import ObjectId
from app.extensions import mongo_client

COLLECTION = "research"


class Research:
    @staticmethod
    def collection():
        return mongo_client.collection(COLLECTION)

    # ---------- Validation ----------
    @staticmethod
    def validate(doc: Dict[str, Any]) -> List[str]:
        errors: List[str] = []
        if not doc.get("title"):
            errors.append("title is required")
        if not doc.get("abstract") and not doc.get("content"):
            errors.append("abstract or content is required")
        return errors

    # ---------- CRUD ----------
    @classmethod
    def insert(cls, doc: Dict[str, Any]) -> str:
        doc = dict(doc)
        now = datetime.utcnow()
        doc.setdefault("created_at", now)
        doc.setdefault("updated_at", now)
        result = cls.collection().insert_one(doc)
        return str(result.inserted_id)

    @classmethod
    def bulk_insert(cls, docs: List[Dict[str, Any]]) -> int:
        if not docs:
            return 0
        now = datetime.utcnow()
        for d in docs:
            d.setdefault("created_at", now)
            d.setdefault("updated_at", now)
        result = cls.collection().insert_many(docs, ordered=False)
        return len(result.inserted_ids)

    @classmethod
    def find_by_id(cls, doc_id: str) -> Optional[Dict[str, Any]]:
        try:
            return cls.collection().find_one({"_id": ObjectId(doc_id)})
        except Exception:
            return None

    @classmethod
    def list(cls, filters: Dict[str, Any] | None = None,
             limit: int = 100, skip: int = 0) -> List[Dict[str, Any]]:
        return list(
            cls.collection()
            .find(filters or {})
            .sort("created_at", -1)
            .skip(skip)
            .limit(limit)
        )

    @classmethod
    def count(cls, filters: Dict[str, Any] | None = None) -> int:
        return cls.collection().count_documents(filters or {})

    @classmethod
    def update(cls, doc_id: str, updates: Dict[str, Any]) -> bool:
        updates = dict(updates)
        updates["updated_at"] = datetime.utcnow()
        try:
            res = cls.collection().update_one(
                {"_id": ObjectId(doc_id)}, {"$set": updates}
            )
            return res.modified_count > 0
        except Exception:
            return False

    @classmethod
    def delete(cls, doc_id: str) -> bool:
        try:
            res = cls.collection().delete_one({"_id": ObjectId(doc_id)})
            return res.deleted_count > 0
        except Exception:
            return False
        