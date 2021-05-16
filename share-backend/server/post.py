from server.database.db_post_api import add_community, get_all_communities, save_post, get_posts_preview_by_community
from flask import jsonify, Blueprint, request
from server.msg import SignFormMsg, PostMsg
import time
post_bp = Blueprint("post", __name__)

@post_bp.route('/create-community', methods=('POST',))
def start_community():
    comm = {"comm_name":request.json["comm_name"], "user_id":request.json["user_id"]}
    msg = add_community(comm)

    if (msg == SignFormMsg.ok):
        return jsonify({"success":True })

    elif(msg == SignFormMsg.repeated_name):
        return jsonify({"success":False, 'error':'repeated_name'})


@post_bp.route('/add-post', methods=('POST',))
def add_post():
    comm = {"title":request.json["title"], "body":request.json["body"], \
            "user_id":request.json["user_id"], "comm_name":request.json["comm_name"]}

    msg = save_post(comm)

    if (msg == PostMsg.ok):
        return jsonify({"success":True })

    elif(msg == PostMsg.community_not_found):
        return jsonify({"success":False, 'error':'community_not_found'})


@post_bp.route('/get-posts-preview-by-community',  methods=('POST',))
def serve_community_posts_info():
    posts = get_posts_preview_by_community(request.json['comm_name'])

    if (posts == []):
        return jsonify({"success":False, 'error':'empty'})

    else:
        return jsonify({'success':True, 'posts':posts})


@post_bp.route('/get-communities-names')
def get_comm_names():
    comms = [{'comm_name':comm["comm_name"], 'comm_id':comm["comm_id"]} for comm in get_all_communities()]
    return jsonify({'success':True, 'comms':comms})


@post_bp.route('/check')
def just():
    return str(get_posts())
