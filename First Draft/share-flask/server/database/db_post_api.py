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


def get_post_by_name(post_name):
    query = """SELECT user.username, post.body FROM post INNER JOIN user ON user.id = post.user_id
               WHERE post.title = ?"""

    post = get_db().execute(query,(post_name,)).fetchone()

    if (post == None):
        return {}

    return {"body":post[1], "username":post[0]}


def get_posts_preview_by_community(comm_name):
    query = """SELECT post.title, user.username, post.body FROM post INNER JOIN user ON user.id = post.user_id
               INNER JOIN community ON community.id = post.community_id WHERE community.name = ?"""

    posts = get_db().execute(query,(comm_name,)).fetchall()

    if (len(posts) == 0):
        return []

    posts = [posts[i] for i in range(len(posts)-1,-1,-1)]

    return [{"title":title, "username":username, "body":body[0:len(body)//4]+"..."} for (title, username, body) in posts]


def get_all_communities():
    """
    Returns hash table with the community name and username of the founder.
    """
    comms = get_db().execute("SELECT username, name, community.description, community.id FROM user "+\
                             "INNER JOIN community ON user.id = community.user_id").fetchall()

    comms = [comms[i] for i in range(len(comms)-1,-1,-1)]
    return [{"comm_name":comm_name, "username":username, 'comm_description':comm_description, "comm_id":comm_id}\
            for (username, comm_name, comm_description, comm_id) in comms]


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

    db.execute("INSERT INTO community(name, description, user_id) VALUES(?, ?, ?)",\
                (comm['comm_name'], comm['comm_description'], comm['user_id']))

    get_db().commit()
    db.close()
    return SignFormMsg.ok
