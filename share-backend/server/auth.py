from functools import wraps
from server.msg import SignFormMsg
from flask import g, session, jsonify, Blueprint, request
from werkzeug.security import check_password_hash
from werkzeug.security import generate_password_hash
from server.database.db import print_database
from server.database.DatabaseApi import add_user
auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/sign-up", methods=("POST","GET"))
def sign_up():

    new_user = {"username":request.json["name"],"email":request.json["email"], \
                "password":generate_password_hash(request.json["password"])}

    msg = add_user(new_user)

    if (msg == SignFormMsg.ok):
        #format
        return jsonify({"success":"true" })
    elif(msg == SignFormMsg.repeated_name):
        return jsonify({"success":"false", 'error':'repeated name'})


def is_logged(call):

    @wraps(call)
    def check_credential(**arguments):
        if (g.user is None):
            #!!!!consider enum , think of format
            return jsonify({"success":"false", "error":"not logged"})

        return call(**arguments)

    return check_credential


@auth_bp.route("/database")
def ts():
    return str(print_database())

@auth_bp.before_app_request
def load_logged_in_user():

    user_id = session.get("user_id")

    if user_id is None:
        g.user = None
    else:
        g.user = (
            get_db().execute("SELECT (username) FROM user WHERE id = ?", (user_id,)).fetchone()
        )
