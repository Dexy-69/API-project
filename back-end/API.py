from flask import Flask, jsonify, request
import requests
from flask_cors import CORS
import os
import json

app = Flask(__name__)
data = {
    "name": "ali",
    "age": 20
}

@app.route("/")
def  home():
    return data
    

if __name__ == "__main__":
    app.run(debug=True)

