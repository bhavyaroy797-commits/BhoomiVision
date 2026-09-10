"""Policy routes — MongoDB backed + AI Q&A."""
import logging
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt

from app.models.policy import Policy
from app.services import search_service, ai_service

logger = logging.getLogger(__name__)
policy_bp = Blueprint("policy", __name__)


def _serialize(doc):
    if not doc:
        return doc
    doc["_id"] = str(doc["_id"])
    for k, v in list(doc.items()):
        if hasattr(v, "isoformat"):
            doc[k] = v.isoformat()
    return doc


@policy_bp.route("", methods=["GET"])
@jwt_required(optional=True)
def list_policies():
    limit = min(int(request.args.get("limit", 50)), 200)
    skip = int(request.args.get("skip", 0))
    query = {}
    if request.args.get("year"):
        try:
            query["year"] = int(request.args["year"])
        except ValueError:
            return jsonify(error="year must be an integer"), 400
    if request.args.get("category"):
        query["category"] = request.args["category"]
    if request.args.get("state"):
        query["state"] = request.args["state"]

    docs = Policy.list(filters=query, limit=limit, skip=skip)
    return jsonify(
        count=len(docs),
        total=Policy.count(query),
        results=[_serialize(d) for d in docs],
    ), 200


@policy_bp.route("/search", methods=["GET"])
@jwt_required(optional=True)
def search_policies():
    q = request.args.get("q", "").strip()
    if not q:
        return jsonify(error="Query parameter 'q' is required"), 400
    limit = min(int(request.args.get("limit", 25)), 100)
    return jsonify(query=q, results=search_service.text_search("policies", q, limit)), 200


@policy_bp.route("/<policy_id>", methods=["GET"])
@jwt_required(optional=True)
def get_policy(policy_id: str):
    doc = Policy.find_by_id(policy_id)
    if not doc:
        return jsonify(error="Policy not found"), 404
    return jsonify(policy=_serialize(doc)), 200


@policy_bp.route("", methods=["POST"])
@jwt_required()
def create_policy():
    claims = get_jwt()
    if not (set(claims.get("roles", [])) & {"admin", "policy_maker"}):
        return jsonify(error="Insufficient privileges"), 403
    data = request.get_json(silent=True) or {}
    errors = Policy.validate(data)
    if errors:
        return jsonify(error="Validation failed", details=errors), 400
    new_id = Policy.insert(data)
    return jsonify(message="Created", id=new_id), 201


@policy_bp.route("/<policy_id>", methods=["PUT", "PATCH"])
@jwt_required()
def update_policy(policy_id: str):
    claims = get_jwt()
    if not (set(claims.get("roles", [])) & {"admin", "policy_maker"}):
        return jsonify(error="Insufficient privileges"), 403
    data = request.get_json(silent=True) or {}
    ok = Policy.update(policy_id, data)
    if not ok:
        return jsonify(error="Not found or nothing to update"), 404
    return jsonify(message="Updated"), 200


@policy_bp.route("/<policy_id>", methods=["DELETE"])
@jwt_required()
def delete_policy(policy_id: str):
    claims = get_jwt()
    if "admin" not in claims.get("roles", []):
        return jsonify(error="Admin only"), 403
    ok = Policy.delete(policy_id)
    if not ok:
        return jsonify(error="Not found"), 404
    return jsonify(message="Deleted"), 200


@policy_bp.route("/ask", methods=["POST"])
@jwt_required(optional=True)
def ask_policy_question():
    data = request.get_json(silent=True) or {}
    question = data.get("question", "").strip()
    if not question:
        return jsonify(error="question is required"), 400

    context_docs = search_service.text_search("policies", question, limit=5)
    result = ai_service.answer_policy_question(question, context_docs)
    return jsonify(question=question, **result), 200