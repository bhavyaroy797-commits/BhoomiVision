"""
Application factory for BHOOMIVISION backend.

Wires together:
    - Flask-SQLAlchemy  -> MySQL  (users, RBAC)
    - PyMongo           -> MongoDB (land, research, policy, districts)
    - JWT Extended      -> auth guards
    - CORS              -> frontend access
    - Blueprints        -> API routes
    - Data loader       -> hydrates MongoDB from /data/*.json
"""
import logging
from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt

from app.config import get_config

# --- Singletons ---
from app.extensions import db, bcrypt, jwt, mongo_client  # see extensions.py below

logger = logging.getLogger(__name__)


def create_app(config_override=None):
    app = Flask(__name__)
    app.config.from_object(config_override or get_config())

    _configure_logging(app)
    _init_extensions(app)
    _register_blueprints(app)
    _register_error_handlers(app)

    # Ensure tables exist (idempotent). Prefer Alembic in production, but this
    # is safe on cold start for dev/staging.
    with app.app_context():
        from app import models  # noqa: F401  (register models)
        db.create_all()
        _bootstrap_mongo(app)

    logger.info("BHOOMIVISION backend initialized")
    return app


# --------------------------------------------------------------------------
def _configure_logging(app: Flask) -> None:
    level = logging.DEBUG if app.config.get("DEBUG") else logging.INFO
    logging.basicConfig(
        level=level,
        format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    )


def _init_extensions(app: Flask) -> None:
    # MySQL
    db.init_app(app)

    # Bcrypt
    bcrypt.init_app(app)

    # JWT
    jwt.init_app(app)

    # Mongo
    uri = app.config["MONGO_URI"]
    mongo_client.init_app(uri, app.config["MONGO_DB"])

    # CORS
    CORS(
        app,
        resources={r"/api/*": {"origins": app.config["CORS_ORIGINS"]}},
        supports_credentials=True,
        allow_headers=["Content-Type", "Authorization"],
        methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    )


def _register_blueprints(app: Flask) -> None:
    from app.routes.auth import auth_bp
    from app.routes.research import research_bp
    from app.routes.policy import policy_bp
    from app.routes.gis import gis_bp
    from app.routes.reports import reports_bp
    from app.routes.land import land_bp

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(research_bp, url_prefix="/api/research")
    app.register_blueprint(policy_bp, url_prefix="/api/policies")
    app.register_blueprint(gis_bp, url_prefix="/api/gis")
    app.register_blueprint(reports_bp, url_prefix="/api/reports")
    app.register_blueprint(land_bp, url_prefix="/api/land")

    @app.route("/api/health", methods=["GET"])
    def health():
        return jsonify(
            status="ok",
            service="bhoomivision-backend",
            mysql="connected",
            mongodb="connected" if mongo_client.is_connected() else "unavailable",
        ), 200


def _register_error_handlers(app: Flask) -> None:
    @app.errorhandler(400)
    def bad_request(e):
        return jsonify(error="Bad Request", message=str(e)), 400

    @app.errorhandler(401)
    def unauthorized(e):
        return jsonify(error="Unauthorized", message=str(e)), 401

    @app.errorhandler(403)
    def forbidden(e):
        return jsonify(error="Forbidden", message=str(e)), 403

    @app.errorhandler(404)
    def not_found(e):
        return jsonify(error="Not Found", message=str(e)), 404

    @app.errorhandler(500)
    def server_error(e):
        logger.exception("Unhandled server error")
        return jsonify(error="Internal Server Error", message=str(e)), 500

    @app.errorhandler(Exception)
    def unhandled(e):
        from werkzeug.exceptions import HTTPException

        if isinstance(e, HTTPException):
            return jsonify(error=e.name, message=e.description), e.code
        logger.exception("Unhandled exception")
        return jsonify(error="Internal Server Error", message=str(e)), 500


# --------------------------------------------------------------------------
def _bootstrap_mongo(app: Flask) -> None:
    """Ensure indexes + seed collections from /data on first boot."""
    try:
        from app.services.search_service import ensure_indexes
        from app.services.search_service import load_government_data

        ensure_indexes()
        load_government_data(app.config["DATA_DIR"])
    except Exception as exc:
        logger.warning("Mongo bootstrap skipped: %s", exc)