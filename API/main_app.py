from flask import Flask, jsonify, request
from flask_cors import CORS
#Blueprints
from api.books_api import books_api
from api.login_api import login_api

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

if __name__ == '__main__':
    app.register_blueprint(books_api)
    app.register_blueprint(login_api)
    app.run(debug=True, port=8080)