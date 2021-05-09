
def add_user(db, new_user):
    """
    receives a hash table with the new user information.
    Returns the appropiate error message if something goes wrong, otherwise
    it returns ok
    """
    users = get_users(db)

    for user in users:
        if user['username'] == new_user['username'] or user['email'] == new_user['email']:
            return "username or email already in use"

    db.execute("INSERT INTO user (username, email, password) VALUES (?, ?, ?)",\
                (new_user['username'], new_user['email'], new_user['password']))

    db.commit()
    return "ok"

def get_users(db):
    users = [{'username':username, 'email':email} for (username,email) \
            in db.execute('SELECT username, email FROM user').fetchall()]

    return users
