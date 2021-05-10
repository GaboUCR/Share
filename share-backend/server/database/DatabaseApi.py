from server.msg import SignFormMsg
from server.database.db import get_db

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


# def get_user(db,)
