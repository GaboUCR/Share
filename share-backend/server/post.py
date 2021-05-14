from server.database.db_post_api import add_community, get_all_communities
from flask import jsonify, Blueprint, request
from server.msg import SignFormMsg
post_bp = Blueprint("post", __name__)

@post_bp.route('/create-community', methods=('POST',))
def start_community():
    comm = {"comm_name":request.json["comm_name"], "user_id":request.json["user_id"]}
    msg = add_community(comm)

    if (msg == SignFormMsg.ok):
        return jsonify({"success":True })

    elif(msg == SignFormMsg.repeated_name):
        return jsonify({"success":False, 'error':'repeated_name'})


@post_bp.route('/check')
def just():
    return str(get_all_communities())
