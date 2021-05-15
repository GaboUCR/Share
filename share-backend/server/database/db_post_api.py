from server.database.db import get_db
from server.msg import SignFormMsg, PostMsg

def save_post(post):
    """
    post is a dictionary with keys: title, body, user_id, comm_name
    returns the id of the saved post or -1 if there was an error
    """
    db = get_db()
    comm_id = get_community_id(post['comm_name'])

    if comm_id == -1:
        return PostMsg.community_not_found

    db.execute("INSERT INTO post(title, body, community_id, user_id) VALUES(?, ?, ?, ?)",\
                (post['title'], post['body'], comm_id, post['user_id']))
    db.commit()
    return PostMsg.ok


def get_posts():
    return get_db().execute("SELECT * FROM post").fetchall()
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
    comms = get_db().execute("SELECT username, name, community.id FROM user INNER JOIN community ON user.id = community.user_id")\
            .fetchall()

    return [{"comm_name":comm_name, "username":username, "comm_id":comm_id} for (username,comm_name,comm_id) in comms]


def get_community_id(comm_name):
    id = get_db().execute("SELECT id FROM community WHERE name=?",(comm_name,)).fetchone()

    if id != None:
        return id[0]
    else:
        return -1



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
