from server.database.db import get_db

def save_post(post):
    """
    post is a dictionary with keys: title, body, user_id, community_id
    returns the id of the saved post or -1 if there was an error
    """
    db = get_db()
    db.execute("INSERT INTO post(title, body, community_id, user_id) VALUES(?, ?, ?, ?)",\
                post['title'], post['body'], post['community_id'], post['user_id'])

    return db.last_insert_rowid()


def get_post_by_users(user_id):
    """
    returns every post from one user on a dictionary
    """
    db = get_db()
    posts = [{"title":title, 'body':body, 'community_id':comm_id} db.execute("SELECT * FROM post WHERE id=?",(user_id,)).fetchall()]
