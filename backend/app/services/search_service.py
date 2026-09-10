"""
Search service: MongoDB querying, index management, and data loading
from the government-provided JSON files in data/.
"""
import os
import json
import logging
from typing import Any, Dict, List

from pymongo import TEXT, ASCENDING
from pymongo.errors import BulkWriteError, PyMongoError

from app.extensions import mongo_client
from app.models.policy import Policy
from app.models.research import Research
from app.models.land import LandRecord, District

logger = logging.getLogger(__name__)

# --------------------------------------------------------------------------
# Index management
# --------------------------------------------------------------------------
def ensure_indexes() -> None:
    """Create text + compound indexes if not present."""
    try:
        # policies: text search + year
        mongo_client.collection("policies").create_index(
            [("title", TEXT), ("description", TEXT), ("tags", TEXT)],
            name="policy_text_idx",
        )
        mongo_client.collection("policies").create_index(
            [("year", ASCENDING)], name="policy_year_idx"
        )

        # research: text search
        mongo_client.collection("research").create_index(
            [("title", TEXT), ("abstract", TEXT), ("keywords", TEXT), ("authors", TEXT)],
            name="research_text_idx",
        )

        # land_records: geospatial-ish + district/survey
        mongo_client.collection("land_records").create_index(
            [("district", ASCENDING), ("survey_number", ASCENDING)],
            name="land_district_survey_idx",
        )
        mongo_client.collection("land_records").create_index(
            [("parcel_id", ASCENDING)], name="land_parcel_idx"
        )
        # 2dsphere if geometry present (safe if not)
        try:
            mongo_client.collection("land_records").create_index(
                [("geometry", "2dsphere")], name="land_geo_idx", sparse=True
            )
        except PyMongoError:
            pass

        # districts: unique name
        mongo_client.collection("districts").create_index(
            [("name", ASCENDING)], name="district_name_idx", unique=True
        )

        logger.info("MongoDB indexes ensured")
    except PyMongoError as exc:
        logger.warning("Could not ensure indexes: %s", exc)


# --------------------------------------------------------------------------
# Government data loader
# --------------------------------------------------------------------------
_DATA_FILES = {
    "policies.json": ("policies", Policy),
    "research.json": ("research", Research),
    "land_records.json": ("land_records", LandRecord),
    "districts.json": ("districts", None),  # handled specially
}


def _load_json(path: str) -> List[Dict[str, Any]]:
    with open(path, "r", encoding="utf-8") as fh:
        data = json.load(fh)
    if isinstance(data, dict) and "data" in data:
        data = data["data"]
    if not isinstance(data, list):
        raise ValueError(f"{path} must contain a JSON array")
    return data


def load_government_data(data_dir: str, force: bool = False) -> Dict[str, int]:
    """
    Load government JSON files into MongoDB. Idempotent:
    skips a collection if it already has documents unless force=True.
    """
    summary: Dict[str, int] = {}

    if not os.path.isdir(data_dir):
        logger.warning("data dir not found: %s", data_dir)
        return summary

    for filename, (coll_name, model) in _DATA_FILES.items():
        path = os.path.join(data_dir, filename)
        if not os.path.exists(path):
            logger.info("Skipping missing file: %s", filename)
            summary[coll_name] = 0
            continue

        coll = mongo_client.collection(coll_name)
        existing = coll.count_documents({})
        if existing > 0 and not force:
            logger.info("Collection '%s' already has %d docs — skipping", coll_name, existing)
            summary[coll_name] = existing
            continue

        try:
            docs = _load_json(path)
        except (OSError, ValueError, json.JSONDecodeError) as exc:
            logger.error("Failed to parse %s: %s", filename, exc)
            summary[coll_name] = 0
            continue

        if not docs:
            summary[coll_name] = 0
            continue

        if force:
            coll.delete_many({})

        try:
            if coll_name == "districts":
                inserted = District.upsert_many(docs)
            elif coll_name == "policies":
                inserted = _safe_bulk(coll, docs)
            elif coll_name == "research":
                inserted = _safe_bulk(coll, docs)
            elif coll_name == "land_records":
                inserted = _safe_bulk(coll, docs)
            else:
                inserted = _safe_bulk(coll, docs)
            summary[coll_name] = inserted
            logger.info("Loaded %d docs into '%s'", inserted, coll_name)
        except PyMongoError as exc:
            logger.error("Bulk insert failed for %s: %s", coll_name, exc)
            summary[coll_name] = 0

    return summary


def _safe_bulk(coll, docs: List[Dict[str, Any]]) -> int:
    """Insert many, tolerating duplicate-key errors."""
    try:
        result = coll.insert_many(docs, ordered=False)
        return len(result.inserted_ids)
    except BulkWriteError as bwe:
        return bwe.details.get("nInserted", 0)


# --------------------------------------------------------------------------
# Query helpers
# --------------------------------------------------------------------------
def _serialize(doc: Dict[str, Any]) -> Dict[str, Any]:
    if not doc:
        return doc
    doc["_id"] = str(doc["_id"])
    for k, v in list(doc.items()):
        if hasattr(v, "isoformat"):
            doc[k] = v.isoformat()
    return doc


def text_search(collection: str, query: str, limit: int = 25) -> List[Dict[str, Any]]:
    """Full-text search across a collection."""
    if not query:
        return []
    coll = mongo_client.collection(collection)
    try:
        cursor = coll.find(
            {"$text": {"$search": query}},
            {"score": {"$meta": "textScore"}},
        ).sort([("score", {"$meta": "textScore"})]).limit(limit)
        return [_serialize(d) for d in cursor]
    except PyMongoError as exc:
        logger.warning("Text search failed on %s: %s", collection, exc)
        # Fallback: regex search on common fields
        regex = {"$regex": query, "$options": "i"}
        cursor = coll.find(
            {"$or": [{"title": regex}, {"name": regex}, {"abstract": regex}]}
        ).limit(limit)
        return [_serialize(d) for d in cursor]


def global_search(query: str, limit_per_coll: int = 10) -> Dict[str, List[Dict[str, Any]]]:
    """Search across all four collections."""
    return {
        "policies": text_search("policies", query, limit_per_coll),
        "research": text_search("research", query, limit_per_coll),
        "land_records": text_search("land_records", query, limit_per_coll),
    }


def aggregate_by_district() -> List[Dict[str, Any]]:
    """Return per-district land record counts + total area."""
    pipeline = [
        {
            "$group": {
                "_id": "$district",
                "count": {"$sum": 1},
                "total_area": {"$sum": {"$toDouble": {"$ifNull": ["$area", 0]}}},
            }
        },
        {"$sort": {"count": -1}},
        {"$limit": 100},
    ]
    try:
        return list(mongo_client.collection("land_records").aggregate(pipeline))
    except PyMongoError as exc:
        logger.warning("Aggregation failed: %s", exc)
        return []


def collection_stats() -> Dict[str, int]:
    stats = {}
    for name in ("policies", "research", "land_records", "districts"):
        try:
            stats[name] = mongo_client.collection(name).count_documents({})
        except PyMongoError:
            stats[name] = 0
    return stats