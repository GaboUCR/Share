from functools import wraps
from server.msg import SignFormMsg
from flask import g, session, jsonify, Blueprint, request, make_response, render_template, url_for
from flask import flash, redirect
from werkzeug.security import generate_password_hash
from server.database.db import print_database
from server.database.db_users_api import add_user, log_user, get_user
auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/sign-up", methods=("POST","GET"))
def sign_up():

    if request.method == "POST":

        new_user = {"username":request.form["name"],"email":request.form["email"], \
                    "password":generate_password_hash(request.form["password"])}

        msg = add_user(new_user)

        if (msg == SignFormMsg.ok):
            flash("account created successfully, please log in")
            return redirect("/log-in")

        elif(msg == SignFormMsg.repeated_name):
            flash("That name is already taken")

    return render_template("auth/register.html")


@auth_bp.route('/log-in',methods=('POST','GET'))
def log_in():
    """
    user can be the email or the username
    password gets checked in the DatabaseApi.
    It returns the user id
    """
    if (request.method =='POST'):
        user = {"user":request.form["user"], "password":request.form["password"]}
        user_id = log_user(user)

        if user_id == -1:
            flash("Incorrect user or password, please try again")
            return redirect("/log-in")

        else:
            session.clear()
            session["user_id"] = user_id
            return redirect("/")

    return render_template("auth/login.html")

@auth_bp.route('/user/<username>')
def user_tab (username):
    return render_template("auth/user.html")


@auth_bp.route('/user',methods=('POST','GET'))
def req_username():
    """
    returns the username given the id
    """
    return jsonify({'success':True, 'username':get_username(request.json["id"])})

@auth_bp.route('/guest')
def guest():
    session['user_id'] = 7
    return redirect('/')

@auth_bp.route('/logout')
def log_out():
    session.clear()
    return redirect('/')

@auth_bp.route("/database")
def ts():
    return str(print_database())


@auth_bp.before_app_request
def load_logged_in_user():

    user_id = session.get("user_id")

    if user_id is None:
        g.user = None
    else:
        g.user = get_user(user_id)



def login_required(call):

    @wraps(call)
    def check_credential(**arguments):
        user_id = session.get("user_id")

        if (user_id is None):
            flash("Log in to continue")
            return redirect('/log-in')

        return call(**arguments)

    return check_credential
