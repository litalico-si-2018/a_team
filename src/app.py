#!/usr/bin/python3
import os
from flask import Flask, render_template, request
import json
import datetime


app = Flask(__name__, static_folder='assets')
APP_ROOT = os.path.dirname(os.path.abspath(__file__))


@app.route("/")
def index():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(port=4555, debug=True)
