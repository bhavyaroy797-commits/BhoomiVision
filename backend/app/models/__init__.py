"""Import all SQLAlchemy models so create_all() sees them."""
from app.models.user import User, Role, UserRole  # noqa: F401

__all__ = ["User", "Role", "UserRole"]