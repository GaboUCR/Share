from flask import Flask, render_template
from server.auth import auth_bp
from server.post import post_bp
from flask_cors import CORS


app = Flask(__name__)
app.config.from_mapping(SECRET_KEY="pepino")
app.register_blueprint(auth_bp)
app.register_blueprint(post_bp)

@app.route("/")
def home():
    return render_template('home.html')
