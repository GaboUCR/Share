from flask import Blueprint

data = Blueprint("DatabaseApi", __name__)

class selfDoc(object):

    def __init__(self, title, code):

        self.title = title
        self.code = code

    def __repr__(self):
        return "title: \n"+ self.title+"\n"+"code: \n"+self.code

    def dictCast(self):
        return {"title": self.title, "code": self.code}



def getMarkedCode(filepath, startTag, endTag):

    file = open(filepath)
    #codeObjects holds the finished code, queue holds the code that is being written.
    codeObjects = list()
    queue = list()

    for line in file.read().split("\n"):

        if startTag in line:

            title, code  = line[line.find(startTag)+len(startTag): len(line)], ""
            queue =  [selfDoc(title, code)] + queue
            continue

        elif endTag in line:

            codeObjects.append(queue.pop(0))
            continue

        for docs in queue:

            docs.code += line+"\n"


    return codeObjects


def saveCodeFromFile(filepath, startTag, endTag, currentFolderId):

    data = getMarkedCode(filepath, startTag, endTag)

    for doc in data:

        id = addFile(doc,currentFolderId)

        if id == -1:
            print("error handling for sqlite")


def addFile(doc, currentFolderId):

    conn = sqlite3.connect("MyCode.db")
    cur = conn.cursor()
    data = (doc.title, doc.code, currentFolderId)

    try:

        cur.execute("insert into file(title, code, folder_id) values(?, ?, ?)",data)
        id = cur.execute("select last_insert_rowid()").fetchone()[0]

        conn.commit()
        cur.close()
        conn.close()
        return id
    except: #I will add better error handling
        return -1


def addFolder(folderName, currentFolderId):

    conn = sqlite3.connect("MyCode.db")
    cur = conn.cursor()

    try:
        cur.execute("insert into folders(folderName) values(?)",(folderName,))
        to_id = cur.execute("select last_insert_rowid()").fetchone()[0]

        cur.execute("insert into paths(to_folder, from_folder) values (?,?)", (to_id, currentFolderId))
        conn.commit()
        cur.close()
        conn.close()

        return to_id

    except: #I will add better error handling
        return -1
