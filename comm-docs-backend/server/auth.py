from functools import wraps
from flask import g, session, jsonify, Blueprint, request
from werkzeug.security import check_password_hash
from werkzeug.security import generate_password_hash
from server.database.db import get_db, print_database
from server.database.DatabaseApi import add_user


auth_bp = Blueprint("auth", __name__)

def is_logged(call):

    @wraps(call)
    def check_credential(**arguments):
        if (g.user is None):
            return jsonify({"logged":"false"})

        return call(**arguments)

    return check_credential

@auth_bp.route("/database")
def ts():
    return str(print_database())

@auth_bp.route("/sign-up", methods=("POST","GET"))
def sign_up():

    new_user = {"username":request.json["name"],"email":request.json["email"], \
                "password":generate_password_hash(request.json["password"])}

    msg = add_user(get_db(), new_user)

    if (msg == "ok"):
        return jsonify({"success":"ok" })
    else:
        return jsonify({"success":"fail", 'error':msg})



@auth_bp.before_app_request
def load_logged_in_user():

    user_id = session.get("user_id")

    if user_id is None:
        g.user = None
    else:
        g.user = (
            get_db().execute("SELECT (username) FROM user WHERE id = ?", (user_id,)).fetchone()
        )
