import sqlite3
from flask import g
from os import path

def createDatabase():

    conn = sqlite3.connect("share.sqlite3")
    cur = conn.cursor()

    cur.executescript("""

    create table user(
        username TEXT,
        email TEXT,
        password TEXT,
        id INTEGER PRIMARY KEY
    );

    create table post(
        title TEXT,
        body TEXT,
        community_id INTEGER,
        user_id INTEGER,
        id INTEGER PRIMARY KEY
    );

    create table community(
        name TEXT,
        user_id INTEGER,
        id INTEGER PRIMARY KEY

    );
    """)

    conn.commit()
    cur.close()
    conn.close()


def print_database():

    conn = sqlite3.connect("share.sqlite3")
    cur = conn.cursor()

    cur.execute("select * from folders")
    print("Folders: \n"+str(cur.fetchall()))
    cur.execute("select * from file")
    print("Files: \n"+str(cur.fetchall()))
    cur.execute("select * from paths")
    print("paths: \n"+str(cur.fetchall()))
    cur.close()
    conn.close()


def get_db():

    if "db" not in g:
        if (not path.exists("share.sqlite3")):
            createDatabase()

        g.db = sqlite3.connect("share.sqlite3")

    return g.db


def close_db():

    db = g.pop("db", None)

    if db is not None:
        db.close()


# def main():

    # createDatabase()
    # saveCodeFromFile("wl.py", "<@", "/@",2)
    # addFolder("perro",2)
    # print_database()
    # print(__name__)


# if __name__ == "__main__":
#     main()
