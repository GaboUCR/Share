from flask import Flask
from server.auth import auth_bp
from flask_cors import CORS

def create_app(test_config=None):
    app = Flask(__name__)
    app.config.from_mapping(SECRET_KEY="pepino")
    CORS(app)
    app.register_blueprint(auth_bp)

    return app
