"""
Land record & district model layer (MongoDB).
"""
from datetime import datetime
from typing import Any, Dict, List, Optional

from bson import ObjectId
from app.extensions import mongo_client

LAND_COLLECTION = "land_records"
DISTRICT_COLLECTION = "districts"


class LandRecord:
    @staticmethod
    def collection():
        return mongo_client.collection(LAND_COLLECTION)

    @staticmethod
    def validate(doc: Dict[str, Any]) -> List[str]:
        errors: List[str] = []
        if not doc.get("survey_number") and not doc.get("parcel_id"):
            errors.append("survey_number or parcel_id is required")
        if not doc.get("district"):
            errors.append("district is required")
        if "area" in doc and doc["area"] is not None:
            try:
                float(doc["area"])
            except (TypeError, ValueError):
                errors.append("area must be numeric")
        return errors

    @classmethod
    def insert(cls, doc: Dict[str, Any]) -> str:
        doc = dict(doc)
        now = datetime.utcnow()
        doc.setdefault("created_at", now)
        doc.setdefault("updated_at", now)
        return str(cls.collection().insert_one(doc).inserted_id)

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
    def find_by_id(cls, rec_id: str) -> Optional[Dict[str, Any]]:
        try:
            return cls.collection().find_one({"_id": ObjectId(rec_id)})
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
    def update(cls, rec_id: str, updates: Dict[str, Any]) -> bool:
        updates = dict(updates)
        updates["updated_at"] = datetime.utcnow()
        try:
            res = cls.collection().update_one(
                {"_id": ObjectId(rec_id)}, {"$set": updates}
            )
            return res.modified_count > 0
        except Exception:
            return False

    @classmethod
    def delete(cls, rec_id: str) -> bool:
        try:
            res = cls.collection().delete_one({"_id": ObjectId(rec_id)})
            return res.deleted_count > 0
        except Exception:
            return False


class District:
    @staticmethod
    def collection():
        return mongo_client.collection(DISTRICT_COLLECTION)

    @classmethod
    def list(cls, state: Optional[str] = None) -> List[Dict[str, Any]]:
        query = {"state": state} if state else {}
        return list(cls.collection().find(query).sort("name", 1))

    @classmethod
    def find_by_name(cls, name: str) -> Optional[Dict[str, Any]]:
        return cls.collection().find_one({"name": name})

    @classmethod
    def upsert_many(cls, docs: List[Dict[str, Any]]) -> int:
        count = 0
        for d in docs:
            if not d.get("name"):
                continue
            cls.collection().update_one(
                {"name": d["name"]}, {"$set": d}, upsert=True
            )
            count += 1
        return count