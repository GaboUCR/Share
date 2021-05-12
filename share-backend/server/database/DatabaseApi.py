import random
import string
from server.msg import SignFormMsg
from server.database.db import get_db
from werkzeug.security import check_password_hash, generate_password_hash
from datetime import datetime

def get_random_cookie(length=40):
    symbols = string.printable[0:len(string.printable)-5]
    cookie = ''.join(random.choice(symbols) for i in range(length))

    return cookie


def add_user(new_user):
    """
    receives a hash table with the new user information.
    Returns the appropiate error message if something goes wrong, otherwise
    it returns ok
    """
    users = get_users()
    db = get_db()

    for user in users:
        if user['username'] == new_user['username'] or user['email'] == new_user['email']:
            return SignFormMsg.repeated_name

    db.execute("INSERT INTO user (username, email, password) VALUES (?, ?, ?)",\
                (new_user['username'], new_user['email'], new_user['password']))

    db.commit()
    return SignFormMsg.ok


def get_users():
    users = [{'username':username, 'email':email} for (username,email) \
            in get_db().execute('SELECT username, email FROM user').fetchall()]

    return users


def log_user(user):
    """
    receives hash table with the username or email and the password without hash
    returns cookie of the logged user or -1 if it doesn't found a match
    """
    db = get_db()

    users = [{'username':username, 'email':email, "hash":hash, 'id':id} for (username, email, hash, id) \
            in db.execute('SELECT username, email, password, id FROM user').fetchall()]

    for reg_user in users:

        if (user['user'] == reg_user['username'] or user['user'] == reg_user['email']):

            if (check_password_hash(reg_user['hash'],user['password'])):
                cookie = get_random_cookie()
                db.execute('INSERT OR REPLACE INTO cookie(cookie_hash, date) VALUES (?, ?) WHERE user_id = ?'\
                            , (generate_password_hash(cookie), datetime.now().strftime("%m/%d/%Y, %H:%M:%S"), reg_user['id']))

                return cookie

    return ""


def get_username(user_id):
    return get_db().execute('SELECT username FROM user WHERE id=?',(user_id,)).fetchone()[0]
