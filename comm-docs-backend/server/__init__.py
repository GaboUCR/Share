from flask import Flask
from server.DatabaseApi import data


app = Flask(__name__)
app.register_blueprint(data)
