from flask import Flask, jsonify, request, Blueprint
from psycopg2.extras import RealDictCursor
from connect_db import connectToDb

books_api = Blueprint('books_api', 'books_api', url_prefix="/api/books")

@books_api.route('/', methods=['GET', 'POST', 'PUT'])
def api_verbs():
    if request.method == 'GET':
        conn = connectToDb()
        cur = conn.cursor(cursor_factory=RealDictCursor)

        try:
            cur.execute('select * from livros')
        except:
            print("erro")

        result = cur.fetchall()

        cur.close()
        conn.close()

        return jsonify(result)

    elif request.method == 'POST':
        dados = request.json

        conn = connectToDb()
        cur = conn.cursor()

        try:
            cur.execute('''
                        insert into livros (titulo, autor, editora, descricao, datapublicacao)
                        values (%s, %s, %s, %s, %s);
                        ''',
                        (dados['titulo'],
                         dados['autor'],
                         dados['editora'],
                         dados['descricao'],
                         dados['datapublicacao']))
        except:
            print('erro')

        conn.commit()

        cur.close()
        conn.close()

        return "Livro inserido com sucesso"

    else:
        dados = request.json

        conn = connectToDb()
        cur = conn.cursor()

        try:
            cur.execute('''
                        update livros
                        set titulo = %s, autor = %s, editora = %s, descricao = %s, datapublicacao = %s
                        where id = %s
                        ''',
                        (dados['titulo'],
                         dados['autor'],
                         dados['editora'],
                         dados['descricao'],
                         dados['datapublicacao'],
                         dados['id']))
        except:
            print("erro")

        conn.commit()

        conn.close()
        cur.close()

        return("Livro atualizado com sucesso")


@books_api.route('/<string:id>', methods=['GET'])
def get_books_by_id(id):
    conn = connectToDb()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    try:
        cur.execute('select * from livros where id = %s', (id))
    except:
        print('erro')

    result = cur.fetchall()

    cur.close()
    conn.close()

    return jsonify({'book': result})


@books_api.route('/<string:id>', methods=['DELETE'])
def delete(id):
    conn = connectToDb()
    cur = conn.cursor()

    try:
        cur.execute('delete from livros where id = %s', (id))
    except:
        print("erro")

    conn.commit()

    cur.close()
    conn.close()
