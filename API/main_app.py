from flask import Flask, jsonify, request
#Blueprints
from api.books_api import books_api

app = Flask(__name__)    

if __name__ == '__main__':
    app.register_blueprint(books_api)
    app.run(debug=True, port=8080)