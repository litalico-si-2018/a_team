#!/usr/bin/python3
import os
from flask import Flask, render_template, request


app = Flask(__name__, static_folder='assets')

APP_ROOT = os.path.dirname(os.path.abspath(__file__))

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/admin")
def admin():

    # データベースから取得した情報をここから渡す．配列もしくはjson
    data1 = [2,2,2,1,2,0,2,1,1,2]
    return render_template("admin.html",data1=data1)

@app.route("/regist")
def regist():
    return render_template("regist.html")

if __name__ == "__main__":
    app.run(port=4555, debug=True)
