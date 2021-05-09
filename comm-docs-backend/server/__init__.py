from flask import Flask
from server.auth import auth_bp


app = Flask(__name__)
app.register_blueprint(auth_bp)
