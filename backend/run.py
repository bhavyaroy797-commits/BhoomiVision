"""
Development server launcher.
Usage: python run.py
"""
import os
import logging
from app import create_app

logging.basicConfig(level=logging.INFO)

app = create_app()

if __name__ == "__main__":
    port = int(os.getenv("PORT", "5000"))
    app.run(host="0.0.0.0", port=port, debug=app.config.get("DEBUG", True))