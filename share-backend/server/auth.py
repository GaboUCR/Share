from functools import wraps
from server.msg import SignFormMsg
from flask import g, session, jsonify, Blueprint, request, make_response
from werkzeug.security import generate_password_hash
from server.database.db import print_database
from server.database.DatabaseApi import add_user, log_user, get_username
auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/sign-up", methods=("POST","GET"))
def sign_up():

    new_user = {"username":request.json["name"],"email":request.json["email"], \
                "password":generate_password_hash(request.json["password"])}

    msg = add_user(new_user)

    if (msg == SignFormMsg.ok):
        return jsonify({"success":True })

    elif(msg == SignFormMsg.repeated_name):
        return jsonify({"success":False, 'error':'repeated name'})


def login_required(call):

    @wraps(call)
    def check_credential(**arguments):
        user_id = session.get("user_id")

        if (user_id is None):
            return jsonify({"success":False, "error":"not logged"})

        return call(**arguments)

    return check_credential


@auth_bp.route('/log-in',methods=('POST','GET'))
def log_in():
    """
    user can be the email or the username
    password gets checked in the DatabaseApi
    """
    user = {"user":request.json["user"], "password":request.json["password"]}
    user_cookie = log_user(user)

    if user_cookie == "":
        return jsonify({"success":False, "error":"wrong credential"})

    else:

        return jsonify({"success":True})


@auth_bp.route("/database")
def ts():
    test = make_response({'age':24})
    test.headers["age"]=28
    test.set_cookie('perrito', "1234567890")
    return test


@auth_bp.route('/user')
@login_required
def req_username():
    """
    checks if the user is logged, if it is, returns the username
    """
    return jsonify({'success':True, 'user':get_username(session['user_id'])})
