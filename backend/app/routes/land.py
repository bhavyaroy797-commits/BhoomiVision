"""Land record routes — MongoDB backed."""
import logging
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt

from app.models.land import LandRecord
from app.services import search_service

logger = logging.getLogger(__name__)
land_bp = Blueprint("land", __name__)


def _serialize(doc):
    if not doc:
        return doc
    doc["_id"] = str(doc["_id"])
    for k, v in list(doc.items()):
        if hasattr(v, "isoformat"):
            doc[k] = v.isoformat()
    return doc


@land_bp.route("", methods=["GET"])
@jwt_required(optional=True)
def list_records():
    limit = min(int(request.args.get("limit", 50)), 500)
    skip = int(request.args.get("skip", 0))

    query = {}
    for field in ("district", "state", "land_type", "survey_number", "parcel_id"):
        val = request.args.get(field)
        if val:
            query[field] = val

    docs = LandRecord.list(filters=query, limit=limit, skip=skip)
    return jsonify(
        count=len(docs),
        total=LandRecord.count(query),
        results=[_serialize(d) for d in docs],
    ), 200


@land_bp.route("/search", methods=["GET"])
@jwt_required(optional=True)
def search_land():
    q = request.args.get("q", "").strip()
    if not q:
        return jsonify(error="Query parameter 'q' is required"), 400
    limit = min(int(request.args.get("limit", 25)), 100)
    return jsonify(query=q, results=search_service.text_search("land_records", q, limit)), 200


@land_bp.route("/<record_id>", methods=["GET"])
@jwt_required(optional=True)
def get_record(record_id: str):
    doc = LandRecord.find_by_id(record_id)
    if not doc:
        return jsonify(error="Land record not found"), 404
    return jsonify(record=_serialize(doc)), 200


@land_bp.route("", methods=["POST"])
@jwt_required()
def create_record():
    claims = get_jwt()
    if not (set(claims.get("roles", [])) & {"admin", "analyst", "researcher"}):
        return jsonify(error="Insufficient privileges"), 403

    data = request.get_json(silent=True) or {}
    errors = LandRecord.validate(data)
    if errors:
        return jsonify(error="Validation failed", details=errors), 400

    new_id = LandRecord.insert(data)
    return jsonify(message="Created", id=new_id), 201


@land_bp.route("/<record_id>", methods=["PUT", "PATCH"])
@jwt_required()
def update_record(record_id: str):
    claims = get_jwt()
    if not (set(claims.get("roles", [])) & {"admin", "analyst"}):
        return jsonify(error="Insufficient privileges"), 403
    data = request.get_json(silent=True) or {}
    ok = LandRecord.update(record_id, data)
    if not ok:
        return jsonify(error="Not found or nothing to update"), 404
    return jsonify(message="Updated"), 200


@land_bp.route("/<record_id>", methods=["DELETE"])
@jwt_required()
def delete_record(record_id: str):
    claims = get_jwt()
    if "admin" not in claims.get("roles", []):
        return jsonify(error="Admin only"), 403
    ok = LandRecord.delete(record_id)
    if not ok:
        return jsonify(error="Not found"), 404
    return jsonify(message="Deleted"), 200


@land_bp.route("/stats/by-district", methods=["GET"])
@jwt_required(optional=True)
def by_district():
    return jsonify(matrix=search_service.aggregate_by_district()), 200