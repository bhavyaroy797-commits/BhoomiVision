"""GIS routes — district matrices + spatial aggregation."""
import logging
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required

from app.models.land import District, LandRecord
from app.services import search_service

logger = logging.getLogger(__name__)
gis_bp = Blueprint("gis", __name__)


def _serialize(doc):
    if not doc:
        return doc
    doc["_id"] = str(doc["_id"])
    for k, v in list(doc.items()):
        if hasattr(v, "isoformat"):
            doc[k] = v.isoformat()
    return doc


@gis_bp.route("/districts", methods=["GET"])
@jwt_required(optional=True)
def list_districts():
    state = request.args.get("state")
    docs = District.list(state=state)
    return jsonify(count=len(docs), districts=[_serialize(d) for d in docs]), 200


@gis_bp.route("/districts/<name>", methods=["GET"])
@jwt_required(optional=True)
def get_district(name: str):
    doc = District.find_by_name(name)
    if not doc:
        return jsonify(error="District not found"), 404

    # Attach aggregate stats
    stats = search_service.aggregate_by_district()
    dist_stats = next((s for s in stats if s["_id"] == name), None)
    return jsonify(district=_serialize(doc), stats=dist_stats), 200


@gis_bp.route("/district-matrix", methods=["GET"])
@jwt_required(optional=True)
def district_matrix():
    """District-level land matrix for choropleth / heatmaps."""
    matrix = search_service.aggregate_by_district()
    return jsonify(count=len(matrix), matrix=matrix), 200


@gis_bp.route("/heatmap", methods=["GET"])
@jwt_required(optional=True)
def heatmap():
    """Return [lat, lng, weight] points for heatmap layers."""
    limit = min(int(request.args.get("limit", 5000)), 20000)
    query = {"geometry": {"$exists": True}}
    cursor = LandRecord.collection().find(query, {"geometry": 1, "area": 1}).limit(limit)
    points = []
    for doc in cursor:
        geom = doc.get("geometry") or {}
        coords = geom.get("coordinates")
        if not coords:
            continue
        # Support Point only for heatmap; ignore polygons
        if geom.get("type") == "Point" and isinstance(coords, list) and len(coords) == 2:
            lng, lat = coords
            try:
                weight = float(doc.get("area") or 1)
            except (TypeError, ValueError):
                weight = 1.0
            points.append([lat, lng, weight])
    return jsonify(count=len(points), points=points), 200


@gis_bp.route("/bounds", methods=["GET"])
@jwt_required(optional=True)
def bounds():
    """Return bounding box for a district's records."""
    district = request.args.get("district")
    if not district:
        return jsonify(error="district query param required"), 400

    cursor = LandRecord.collection().find(
        {"district": district, "geometry": {"$exists": True}},
        {"geometry": 1},
    ).limit(5000)

    lats, lngs = [], []
    for doc in cursor:
        geom = doc.get("geometry") or {}
        if geom.get("type") == "Point":
            c = geom.get("coordinates", [])
            if len(c) == 2:
                lngs.append(c[0]); lats.append(c[1])
        elif geom.get("type") == "Polygon":
            for ring in geom.get("coordinates", []):
                for pt in ring:
                    if len(pt) == 2:
                        lngs.append(pt[0]); lats.append(pt[1])

    if not lats:
        return jsonify(error="No geospatial data for district"), 404

    return jsonify(
        district=district,
        bounds={
            "min_lat": min(lats), "max_lat": max(lats),
            "min_lng": min(lngs), "max_lng": max(lngs),
        },
    ), 200