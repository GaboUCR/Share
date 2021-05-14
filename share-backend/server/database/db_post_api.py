from server.database.db import get_db
from server.msg import SignFormMsg

def save_post(post):
    """
    post is a dictionary with keys: title, body, user_id, community_id
    returns the id of the saved post or -1 if there was an error
    """
    db = get_db()
    db.execute("INSERT INTO post(title, body, community_id, user_id) VALUES(?, ?, ?, ?)",\
                post['title'], post['body'], post['community_id'], post['user_id'])

    return db.last_insert_rowid()


# def get_post_by_users(user_id):
#     """
#     returns every post from one user on a dictionary
#     """
#     db = get_db()
#     posts = [{"title":title, 'body':body, 'community_id':comm_id} db.execute("SELECT * FROM post WHERE id=?",(user_id,)).fetchall()]

def get_all_communities():
    """
    Returns hash table with the community name and username of the founder.
    """
    comms = get_db().execute("SELECT username, name FROM user INNER JOIN community ON user.id = community.user_id")\
            .fetchall()

    return [{"comm_name":comm_name, "username":username} for (username,comm_name) in comms]



def add_community(comm):
    """
    comm is a dictionary with the Community name and the user id who post it.
    """
    db = get_db().cursor()
    reg_comms = [name[0] for name in db.execute("SELECT name FROM community").fetchall()]

    if comm["comm_name"] in reg_comms:
        return SignFormMsg.repeated_name

    db.execute("INSERT INTO community(name, user_id) VALUES(?, ?)", (comm['comm_name'], comm['user_id']))
    id = db.lastrowid
    get_db().commit()
    db.close()
    return SignFormMsg.ok
