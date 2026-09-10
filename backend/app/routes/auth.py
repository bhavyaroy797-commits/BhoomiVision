"""
Auth routes: register, login, me, refresh, admin user listing.
JWT-protected where required.
"""
import logging
from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    create_access_token, jwt_required, get_jwt_identity,
    get_jwt, verify_jwt_in_request
)

from app.services.user_service import UserService, UserServiceError
from app.models.user import User

logger = logging.getLogger(__name__)

auth_bp = Blueprint("auth", __name__)


# ------------------------------------------------------------------ helpers
def _current_user() -> User | None:
    try:
        identity = get_jwt_identity()
        if identity is None:
            return None
        return UserService.get_by_id(int(identity))
    except Exception:
        return None


def _issue_token(user: User) -> str:
    return create_access_token(
        identity=str(user.id),
        additional_claims={
            "username": user.username,
            "email": user.email,
            "roles": user.role_names(),
        },
    )


# ------------------------------------------------------------------ routes
@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json(silent=True) or {}
    required = ("email", "username", "password")
    missing = [f for f in required if not data.get(f)]
    if missing:
        return jsonify(error=f"Missing fields: {', '.join(missing)}"), 400

    try:
        UserService.seed_roles()
        user = UserService.register_user(
            email=data["email"],
            username=data["username"],
            password=data["password"],
            full_name=data.get("full_name"),
            organization=data.get("organization"),
            role=data.get("role", "viewer"),
        )
    except UserServiceError as exc:
        return jsonify(error=str(exc)), 400
    except Exception:
        logger.exception("Register failure")
        return jsonify(error="Registration failed"), 500

    return jsonify(
        message="User registered successfully",
        user=user.to_dict(),
        access_token=_issue_token(user),
    ), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json(silent=True) or {}
    identifier = data.get("email") or data.get("username")
    password = data.get("password")

    if not identifier or not password:
        return jsonify(error="Email/username and password required"), 400

    try:
        user = UserService.authenticate(identifier, password)
    except UserServiceError as exc:
        return jsonify(error=str(exc)), 401
    except Exception:
        logger.exception("Login failure")
        return jsonify(error="Login failed"), 500

    return jsonify(
        message="Login successful",
        user=user.to_dict(),
        access_token=_issue_token(user),
    ), 200


@auth_bp.route("/me", methods=["GET"])
@jwt_required()
def me():
    user = _current_user()
    if not user:
        return jsonify(error="User not found"), 404
    return jsonify(user=user.to_dict()), 200


@auth_bp.route("/refresh", methods=["POST"])
@jwt_required()
def refresh():
    user = _current_user()
    if not user:
        return jsonify(error="User not found"), 404
    return jsonify(access_token=_issue_token(user)), 200


@auth_bp.route("/change-password", methods=["POST"])
@jwt_required()
def change_password():
    data = request.get_json(silent=True) or {}
    user = _current_user()
    if not user:
        return jsonify(error="User not found"), 404
    try:
        UserService.change_password(
            user, data.get("old_password", ""), data.get("new_password", "")
        )
    except UserServiceError as exc:
        return jsonify(error=str(exc)), 400
    return jsonify(message="Password updated"), 200


# -------------------------------------------------------------- admin-only
def _require_admin():
    verify_jwt_in_request()
    claims = get_jwt()
    roles = claims.get("roles", [])
    if "admin" not in roles:
        return False
    return True


@auth_bp.route("/users", methods=["GET"])
def list_users():
    if not _require_admin():
        return jsonify(error="Admin access required"), 403
    limit = min(int(request.args.get("limit", 100)), 500)
    offset = int(request.args.get("offset", 0))
    users = UserService.list_users(limit=limit, offset=offset)
    return jsonify(users=[u.to_dict() for u in users]), 200


@auth_bp.route("/users/<int:user_id>/roles", methods=["POST"])
def assign_role(user_id: int):
    if not _require_admin():
        return jsonify(error="Admin access required"), 403
    data = request.get_json(silent=True) or {}
    role_name = data.get("role")
    if not role_name:
        return jsonify(error="role is required"), 400
    user = UserService.get_by_id(user_id)
    if not user:
        return jsonify(error="User not found"), 404
    try:
        UserService.assign_role(user, role_name)
    except UserServiceError as exc:
        return jsonify(error=str(exc)), 400
    return jsonify(message="Role assigned", user=user.to_dict()), 200


@auth_bp.route("/users/<int:user_id>/roles/<role_name>", methods=["DELETE"])
def revoke_role(user_id: int, role_name: str):
    if not _require_admin():
        return jsonify(error="Admin access required"), 403
    user = UserService.get_by_id(user_id)
    if not user:
        return jsonify(error="User not found"), 404
    try:
        UserService.revoke_role(user, role_name)
    except UserServiceError as exc:
        return jsonify(error=str(exc)), 400
    return jsonify(message="Role revoked", user=user.to_dict()), 200