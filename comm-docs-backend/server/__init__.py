from flask import Flask
from server.auth import auth_bp
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.register_blueprint(auth_bp)
