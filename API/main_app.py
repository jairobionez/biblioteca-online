from flask import Flask, jsonify, request
from flask_cors import CORS
#Blueprints
from api.books_api import books_api
from api.login_api import login_api
from api.allocate_api import allocate_api
from api.book_publish_api import book_publish_api

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

if __name__ == '__main__':
    app.register_blueprint(books_api)
    app.register_blueprint(login_api)
    app.register_blueprint(allocate_api)
    app.register_blueprint(book_publish_api)
    app.run(debug=True, port=8080)