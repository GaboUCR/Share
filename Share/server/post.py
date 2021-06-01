from server.database.db_post_api import add_community, get_all_communities, save_post, get_posts_preview_by_community, get_post_by_name
from flask import jsonify, Blueprint, request, render_template, g, flash
from server.msg import SignFormMsg, PostMsg
from server.auth import login_required
import time
post_bp = Blueprint("post", __name__)


@post_bp.route('/create-community', methods=('POST','GET'))
@login_required
def start_community():
    if (request.method == 'POST'):
        comm = {"comm_name":request.form["comm_name"], 'comm_description':request.form['comm_description'] ,\
                "user_id":g.user['id']}
        print(g.user['id'])
        msg = add_community(comm)

        if (msg == SignFormMsg.ok):
            flash("Community added successfully")

        elif(msg == SignFormMsg.repeated_name):
            flash("That community already exists")

    return render_template('post/create_community.html')


@post_bp.route('/add-post', methods=('POST','GET'))
@login_required
def add_post():
    if (request.method == 'POST'):
        comm = {"title":request.form["title"], "body":request.form["body"], \
                "user_id":g.user['id'], "comm_name":request.form["comm_name"]}

        msg = save_post(comm)

        if (msg == PostMsg.ok):
            flash("added post successfully")

        elif(msg == PostMsg.community_not_found):
            flash("Community "+request.form["comm_name"]+" not found")

    return render_template('post/add_post.html')


@post_bp.route('/get-post-by-name',  methods=('POST',))
def serve_post():
    post = get_post_by_name(request.json['post_name'])
    if (post == {}):
        return jsonify({"success":False, 'error':'empty'})

    else:
        return jsonify({'success':True, 'post':post})


@post_bp.route('/get-posts-preview-by-community',  methods=('POST',))
def serve_community_posts_info():
    posts = get_posts_preview_by_community(request.json['comm_name'])

    if (posts == []):
        return jsonify({"success":False, 'error':'empty'})

    else:
        return jsonify({'success':True, 'posts':posts})


@post_bp.route('/get-communities-names')
def get_comm_names():
    comms = get_all_communities()
    return jsonify({'success':True, 'comms':comms})


@post_bp.route('/check')
def just():
    return str(get_all_communities())
