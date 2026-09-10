"""Reports routes — aggregations, dashboards, exports."""
import io
import csv
import logging
from datetime import datetime

from flask import Blueprint, request, jsonify, send_file
from flask_jwt_extended import jwt_required

from app.services import search_service, ai_service
from app.models.land import LandRecord
from app.models.policy import Policy
from app.models.research import Research

logger = logging.getLogger(__name__)
reports_bp = Blueprint("reports", __name__)


@reports_bp.route("/dashboard", methods=["GET"])
@jwt_required(optional=True)
def dashboard():
    """Aggregate summary for the frontend dashboard."""
    stats = search_service.collection_stats()
    matrix = search_service.aggregate_by_district()[:10]

    recent_policies = [
        _serialize(d) for d in Policy.list(limit=5)
    ]
    recent_research = [
        _serialize(d) for d in Research.list(limit=5)
    ]

    return jsonify(
        stats=stats,
        top_districts=matrix,
        recent_policies=recent_policies,
        recent_research=recent_research,
    ), 200


@reports_bp.route("/land-summary", methods=["GET"])
@jwt_required(optional=True)
def land_summary():
    district = request.args.get("district")
    query = {"district": district} if district else {}
    total = LandRecord.count(query)
    matrix = search_service.aggregate_by_district()
    if district:
        matrix = [m for m in matrix if m["_id"] == district]
    return jsonify(total_records=total, by_district=matrix), 200


@reports_bp.route("/land-trends", methods=["POST"])
@jwt_required(optional=True)
def land_trends():
    """Use AI to analyze recent land records."""
    body = request.get_json(silent=True) or {}
    district = body.get("district")
    limit = min(int(body.get("limit", 200)), 1000)

    query = {"district": district} if district else {}
    records = [_serialize(d) for d in LandRecord.list(filters=query, limit=limit)]
    result = ai_service.analyze_land_trends(records)
    return jsonify(district=district, records_analyzed=len(records), **result), 200


@reports_bp.route("/export/land.csv", methods=["GET"])
@jwt_required()
def export_land_csv():
    """Stream land records as CSV."""
    district = request.args.get("district")
    limit = min(int(request.args.get("limit", 5000)), 50000)
    query = {"district": district} if district else {}
    docs = list(LandRecord.collection().find(query).limit(limit))

    buf = io.StringIO()
    writer = csv.writer(buf)
    writer.writerow([
        "id", "parcel_id", "survey_number", "district", "state",
        "area", "owner_name", "land_type", "created_at",
    ])
    for d in docs:
        writer.writerow([
            str(d.get("_id", "")),
            d.get("parcel_id", ""),
            d.get("survey_number", ""),
            d.get("district", ""),
            d.get("state", ""),
            d.get("area", ""),
            d.get("owner_name", ""),
            d.get("land_type", ""),
            d.get("created_at", ""),
        ])

    buf.seek(0)
    return send_file(
        io.BytesIO(buf.getvalue().encode("utf-8")),
        mimetype="text/csv",
        as_attachment=True,
        download_name=f"land_records_{datetime.utcnow().strftime('%Y%m%d_%H%M%S')}.csv",
    )


@reports_bp.route("/export/summary.json", methods=["GET"])
@jwt_required()
def export_summary_json():
    return jsonify(
        generated_at=datetime.utcnow().isoformat(),
        stats=search_service.collection_stats(),
        by_district=search_service.aggregate_by_district(),
    ), 200


# ------------------------------------------------------------------ helper
def _serialize(doc):
    if not doc:
        return doc
    doc["_id"] = str(doc["_id"])
    for k, v in list(doc.items()):
        if hasattr(v, "isoformat"):
            doc[k] = v.isoformat()
    return doc