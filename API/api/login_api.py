from flask import Flask, jsonify, request, Blueprint
from psycopg2.extras import RealDictCursor
from connect_db import connectToDb
import psycopg2

login_api = Blueprint('login_api', 'login_api', url_prefix="/api/login")

@login_api.route('/', methods=['GET', 'POST', 'PUT'])
def api_verbs():
    if request.method == 'GET':
        conn = connectToDb()
        cur = conn.cursor(cursor_factory=RealDictCursor)

        try:
            cur.execute('select * from autenticacao')
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
                        insert into autenticacao (username, email, nome, sobrenome, senha)
                        values (%s, %s, %s, %s, %s);
                        ''',
                        (dados['username'],
                         dados['email'],
                         dados['nome'],
                         dados['sobrenome'],
                         dados['senha']))
            conn.commit()
            cur.close()
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)
        finally:
            if conn is not None:
                conn.close()

        return "Cadastro efetuado com sucesso"

    else:
        dados = request.json

        conn = connectToDb()
        cur = conn.cursor()

        try:
            cur.execute('''
                        update autenticacao 
                        set email = %s, nome = %s, sobrenome = %s, senha = %s 
                        where username = %s
                        ''',
                        (dados['email'],
                         dados['nome'],
                         dados['sobrenome'],
                         dados['senha'],
                         dados['username'],))
            conn.commit()
            cur.close()
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)
        finally:
            if conn is not None:
                conn.close()

        return("Cadastro atualizado com sucesso")


@login_api.route('/<string:username>', methods=['GET'])
def get_login_by_id(username):
    conn = connectToDb()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    try:
        cur.execute('select * from autenticacao where username = %s', (username,))
        result = cur.fetchone()
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

    return jsonify(result)


@login_api.route('/<string:username>', methods=['DELETE'])
def delete(username):
    conn = connectToDb()
    cur = conn.cursor()

    try:
        cur.execute('delete from autenticacao where username = %s', (username,))
        conn.commit()
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

    return "Cadastro deletado com sucesso"
