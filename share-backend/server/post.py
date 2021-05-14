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


@post_bp.route('/get-communities-names')
def get_comm_names():
    comms = [{'comm_name':comm["comm_name"], 'comm_id':comm["comm_id"]} for comm in get_all_communities()]
    return jsonify({'success':True, 'comm_names':comms})


@post_bp.route('/check')
def just():
    return str(get_all_communities())
