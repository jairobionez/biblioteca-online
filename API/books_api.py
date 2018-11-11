from flask import Flask, jsonify, request, Blueprint

books_api = Blueprint('books_api', 'books_api', url_prefix="/books")

books = [{"id": 1, 'name': 'teste1'}, {"id": 2, 'name': 'teste2'}, {"id": 3, 'name': 'teste3'}]

@books_api.route('/', methods=['GET', 'POST', 'PUT'])
def api_verbs():
    if request.method == 'GET':
        return jsonify({'books': books})

    elif request.method == 'POST':
        books.append(request.json['book'])
        return jsonify({'books': books})

    else:
        requestBook = request.json['book']
    
        updatedBook = get_by_id(requestBook['id'])

        updatedBook['name'] = requestBook['name']
        return jsonify({'book': updatedBook})

@books_api.route('/<int:id>', methods=['GET'])
def get_books_by_id(id):
    book = [book for book in books if book['id'] == id][0]

    return jsonify({'book': book})
        
@books_api.route('/<int:id>', methods=['DELETE'])
def delete(id):
    deletedBook = get_by_id(id)

    books.remove(deletedBook)    
    return "Livro deletado com sucesso"

def get_by_id(id):
    return [book for book in books if book['id'] == id][0]