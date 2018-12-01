from flask import Flask, jsonify, request, Blueprint
from psycopg2.extras import RealDictCursor
from connect_db import connectToDb
import psycopg2

book_publish_api = Blueprint('book_publish_api', 'book_publish_api', url_prefix="/api/bookpublish")

@book_publish_api.route('/', methods=['GET', 'POST', 'PUT'])
def api_verbs():
    if request.method == 'GET':
        conn = connectToDb()
        cur = conn.cursor(cursor_factory=RealDictCursor)

        try:
            cur.execute('select * from editora')
            result = cur.fetchall()
            cur.close()
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)
        finally:
            if conn is not None:
                conn.close()

        return jsonify(result)

    elif request.method == 'POST':
        dados = request.json

        conn = connectToDb()
        cur = conn.cursor()

        try:
            cur.execute('''
                        insert into editora (nome, email, telefone)
                        values (%s, %s, %s);
                        ''',
                        (dados['nome'],
                         dados['email'],
                         dados['telefone']))
            conn.commit()
            cur.close()
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)
        finally:
            if conn is not None:
                conn.close()

        return "Editora inserido com sucesso"

    else:
        dados = request.json

        conn = connectToDb()
        cur = conn.cursor()

        try:
            cur.execute('''
                        update editora
                        set nome = %s, email = %s, telefone = %s
                        where id = %s
                        ''',
                        (dados['nome'],
                         dados['email'],
                         dados['telefone'],
                         dados['id']))
            conn.commit()
            cur.close()
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)
        finally:
            if conn is not None:
                conn.close()

        return("Editora atualizado com sucesso")


@book_publish_api.route('/<string:id>', methods=['GET'])
def get_books_by_id(id):
    conn = connectToDb()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    print(id)

    try:
        cur.execute('''select * from editora where id = %s''', (id,))
        result = cur.fetchone()
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

    return jsonify(result)

@book_publish_api.route('/<string:id>', methods=['DELETE'])
def delete(id):
    conn = connectToDb()
    cur = conn.cursor()

    try:
        cur.execute('''delete from editora where id = %s ''', (id,))
        conn.commit()
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

    return "Editora deletado com sucesso"
