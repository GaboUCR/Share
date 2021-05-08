import sqlite3
from flask import g
from os import path

def createDatabase():

    conn = sqlite3.connect("comm-docs.sqlite3")
    cur = conn.cursor()

    cur.executescript("""

    create table folders(
        folderName TEXT,
        id INTEGER PRIMARY KEY
    );

    create table file(
        title TEXT,
        code TEXT,
        folder_id INTEGER,
        id INTEGER PRIMARY KEY
    );

    create table paths(
        to_folder INTEGER,
        from_folder INTEGER,
        id INTEGER PRIMARY KEY

    );
    """)

    cur.execute("insert into folders(folderName) values(?)",("root",))
    conn.commit()
    cur.close()
    conn.close()


def print_database():

    conn = sqlite3.connect("MyCode.db")
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
        if (not path.exists("comm-docs.sqlite3")):
            createDatabase()

        g.db = sqlite3.connect("comm-docs.sqlite3")
        g.db.row_factory = sqlite3.Row

    return g.db


def close_db():

    db = g.pop("db", None)

    if db is not None:
        db.close()


def main():

    # createDatabase()
    # saveCodeFromFile("wl.py", "<@", "/@",2)
    # addFolder("perro",2)
    # print_database()
    print(__name__)

    
# if __name__ == "__main__":
#     # main()
#     print(__name__)
