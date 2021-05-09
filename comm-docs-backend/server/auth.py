from functools import wraps
from flask import g, session, jsonify, Blueprint
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

@auth_bp.route("/")
@is_logged
def thisTest():
    return "no"
