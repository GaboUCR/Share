from functools import wraps
from flask import g, session, jsonify, Blueprint, request
from werkzeug.security import check_password_hash
from werkzeug.security import generate_password_hash
from server.db import get_db

auth_bp = Blueprint("auth", __name__)

def is_logged(call):

    @wraps(call)
    def check_credential(**arguments):
        if (g.user is None):
            return jsonify({"logged":"false"})

        return call(**arguments)

    return check_credential

@auth_bp.route("/sign-up", methods=("POST","GET"))
def sign_up():

    username = request.json["name"]
    email = request.json["email"]
    password = request.json["password"]

    # db = get_db().execute("INSERT INTO user")

    return jsonify({"success":"ok" })#username +email+ password

@auth_bp.before_app_request
def load_logged_in_user():

    user_id = session.get("user_id")

    if user_id is None:
        g.user = None
    else:
        g.user = (
            get_db().execute("SELECT (username) FROM user WHERE id = ?", (user_id,)).fetchone()
        )
