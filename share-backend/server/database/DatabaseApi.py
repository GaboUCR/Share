from server.msg import SignFormMsg
from server.database.db import get_db
from werkzeug.security import check_password_hash

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
    returns id of the logged user or -1 if it doesn't found a match
    """
    db = get_db()

    users = [{'username':username, 'email':email, "hash":hash, 'id':id} for (username, email, hash, id) \
            in db.execute('SELECT username, email, password, id FROM user').fetchall()]

    for reg_user in users:

        if (user['user'] == reg_user['username'] or user['user'] == reg_user['email']):
            if (check_password_hash(reg_user['hash'],user['password'])):
                return reg_user['id']

    return -1
