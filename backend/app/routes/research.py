"""Research routes — MongoDB backed."""
import logging
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt

from app.models.research import Research
from app.services import search_service, ai_service

logger = logging.getLogger(__name__)
research_bp = Blueprint("research", __name__)


def _serialize(doc):
    if not doc:
        return doc
    doc["_id"] = str(doc["_id"])
    for k, v in list(doc.items()):
        if hasattr(v, "isoformat"):
            doc[k] = v.isoformat()
    return doc


@research_bp.route("", methods=["GET"])
@jwt_required(optional=True)
def list_research():
    limit = min(int(request.args.get("limit", 50)), 200)
    skip = int(request.args.get("skip", 0))
    query = {}
    if request.args.get("district"):
        query["district"] = request.args["district"]
    if request.args.get("topic"):
        query["topic"] = request.args["topic"]

    docs = Research.list(filters=query, limit=limit, skip=skip)
    return jsonify(
        count=len(docs),
        total=Research.count(query),
        results=[_serialize(d) for d in docs],
    ), 200


@research_bp.route("/search", methods=["GET"])
@jwt_required(optional=True)
def search_research():
    q = request.args.get("q", "").strip()
    if not q:
        return jsonify(error="Query parameter 'q' is required"), 400
    limit = min(int(request.args.get("limit", 25)), 100)
    results = search_service.text_search("research", q, limit)
    return jsonify(query=q, count=len(results), results=results), 200


@research_bp.route("/<research_id>", methods=["GET"])
@jwt_required(optional=True)
def get_research(research_id: str):
    doc = Research.find_by_id(research_id)
    if not doc:
        return jsonify(error="Research document not found"), 404
    return jsonify(research=_serialize(doc)), 200


@research_bp.route("", methods=["POST"])
@jwt_required()
def create_research():
    claims = get_jwt()
    if not (set(claims.get("roles", [])) & {"admin", "researcher"}):
        return jsonify(error="Insufficient privileges"), 403

    data = request.get_json(silent=True) or {}
    errors = Research.validate(data)
    if errors:
        return jsonify(error="Validation failed", details=errors), 400

    try:
        new_id = Research.insert(data)
    except Exception:
        logger.exception("Research insert failed")
        return jsonify(error="Failed to create research"), 500

    return jsonify(message="Created", id=new_id), 201


@research_bp.route("/<research_id>", methods=["PUT", "PATCH"])
@jwt_required()
def update_research(research_id: str):
    claims = get_jwt()
    if not (set(claims.get("roles", [])) & {"admin", "researcher"}):
        return jsonify(error="Insufficient privileges"), 403
    data = request.get_json(silent=True) or {}
    ok = Research.update(research_id, data)
    if not ok:
        return jsonify(error="Not found or nothing to update"), 404
    return jsonify(message="Updated", research=_serialize(Research.find_by_id(research_id))), 200


@research_bp.route("/<research_id>", methods=["DELETE"])
@jwt_required()
def delete_research(research_id: str):
    claims = get_jwt()
    if "admin" not in claims.get("roles", []):
        return jsonify(error="Admin only"), 403
    ok = Research.delete(research_id)
    if not ok:
        return jsonify(error="Not found"), 404
    return jsonify(message="Deleted"), 200


@research_bp.route("/<research_id>/summarize", methods=["POST"])
@jwt_required(optional=True)
def summarize(research_id: str):
    doc = Research.find_by_id(research_id)
    if not doc:
        return jsonify(error="Research document not found"), 404
    text = doc.get("abstract") or doc.get("content") or ""
    result = ai_service.summarize_research(doc.get("title", ""), text)
    return jsonify(research_id=research_id, **result), 200