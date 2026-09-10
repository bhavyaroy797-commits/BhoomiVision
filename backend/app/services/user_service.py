"""
User service: all MySQL business logic for auth + RBAC.
"""
import re
import logging
from datetime import datetime
from typing import Optional, Tuple

from sqlalchemy.exc import IntegrityError

from app.extensions import db
from app.models.user import User, Role, UserRole

logger = logging.getLogger(__name__)

EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")

DEFAULT_ROLES = [
    ("admin", "Full system administrator"),
    ("researcher", "Can access research & GIS modules"),
    ("policy_maker", "Can access policy module"),
    ("analyst", "Read-only access to land records"),
    ("viewer", "Baseline read-only access"),
]


class UserServiceError(Exception):
    """Raised for user-service level failures."""


class UserService:

    # ------------------------------------------------------------------ Roles
    @staticmethod
    def seed_roles() -> None:
        for name, desc in DEFAULT_ROLES:
            if not Role.query.filter_by(name=name).first():
                db.session.add(Role(name=name, description=desc))
        try:
            db.session.commit()
        except IntegrityError:
            db.session.rollback()

    @staticmethod
    def get_role(name: str) -> Optional[Role]:
        return Role.query.filter_by(name=name).first()

    # ------------------------------------------------------------- Validation
    @staticmethod
    def _validate_registration(email: str, username: str, password: str) -> None:
        if not email or not EMAIL_RE.match(email):
            raise UserServiceError("A valid email is required")
        if not username or len(username) < 3:
            raise UserServiceError("Username must be at least 3 characters")
        if not password or len(password) < 8:
            raise UserServiceError("Password must be at least 8 characters")

    # --------------------------------------------------------------- Register
    @staticmethod
    def register_user(email: str, username: str, password: str,
                      full_name: str = None, organization: str = None,
                      role: str = "viewer") -> User:
        email = (email or "").strip().lower()
        username = (username or "").strip()
        UserService._validate_registration(email, username, password)

        if User.query.filter_by(email=email).first():
            raise UserServiceError("Email already registered")
        if User.query.filter_by(username=username).first():
            raise UserServiceError("Username already taken")

        user = User(
            email=email,
            username=username,
            full_name=full_name,
            organization=organization,
            is_active=True,
            is_verified=False,
        )
        user.set_password(password)
        db.session.add(user)
        db.session.flush()  # get user.id

        # Attach role (default: viewer)
        role_obj = UserService.get_role(role) or UserService.get_role("viewer")
        if role_obj is None:
            role_obj = Role(name="viewer", description="Baseline read-only access")
            db.session.add(role_obj)
            db.session.flush()
        db.session.add(UserRole(user_id=user.id, role_id=role_obj.id))

        try:
            db.session.commit()
        except IntegrityError as exc:
            db.session.rollback()
            logger.exception("Registration failed")
            raise UserServiceError("Registration failed due to a conflict") from exc

        logger.info("Registered user %s with role %s", user.email, role_obj.name)
        return user

    # --------------------------------------------------------------- Login
    @staticmethod
    def authenticate(identifier: str, password: str) -> User:
        """
        Login by email OR username.
        Raises UserServiceError on failure.
        """
        if not identifier or not password:
            raise UserServiceError("Credentials required")

        identifier = identifier.strip()
        user = (
            User.query.filter(
                (User.email == identifier.lower()) | (User.username == identifier)
            ).first()
        )
        if not user or not user.check_password(password):
            raise UserServiceError("Invalid credentials")
        if not user.is_active:
            raise UserServiceError("Account is disabled")

        user.last_login = datetime.utcnow()
        db.session.commit()
        return user

    # -------------------------------------------------------------- Read
    @staticmethod
    def get_by_id(user_id: int) -> Optional[User]:
        return db.session.get(User, user_id)

    @staticmethod
    def get_by_email(email: str) -> Optional[User]:
        return User.query.filter_by(email=(email or "").lower()).first()

    @staticmethod
    def list_users(limit: int = 100, offset: int = 0):
        return (
            User.query.order_by(User.created_at.desc())
            .offset(offset)
            .limit(limit)
            .all()
        )

    # -------------------------------------------------------------- Update
    @staticmethod
    def update_user(user: User, **fields) -> User:
        allowed = {"full_name", "organization", "is_active", "is_verified"}
        for k, v in fields.items():
            if k in allowed and v is not None:
                setattr(user, k, v)
        db.session.commit()
        return user

    @staticmethod
    def change_password(user: User, old_password: str, new_password: str) -> None:
        if not user.check_password(old_password):
            raise UserServiceError("Current password is incorrect")
        if not new_password or len(new_password) < 8:
            raise UserServiceError("New password must be at least 8 characters")
        user.set_password(new_password)
        db.session.commit()

    # -------------------------------------------------------------- Roles
    @staticmethod
    def assign_role(user: User, role_name: str) -> None:
        role = UserService.get_role(role_name)
        if not role:
            raise UserServiceError(f"Role '{role_name}' does not exist")
        if any(ur.role_id == role.id for ur in user.roles):
            return
        db.session.add(UserRole(user_id=user.id, role_id=role.id))
        db.session.commit()

    @staticmethod
    def revoke_role(user: User, role_name: str) -> None:
        role = UserService.get_role(role_name)
        if not role:
            raise UserServiceError(f"Role '{role_name}' does not exist")
        for ur in list(user.roles):
            if ur.role_id == role.id:
                db.session.delete(ur)
        db.session.commit()

    # -------------------------------------------------------------- Stats
    @staticmethod
    def stats() -> Tuple[int, int]:
        return User.query.count(), User.query.filter_by(is_active=True).count()