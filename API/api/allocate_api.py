from flask import Flask, jsonify, request, Blueprint
from psycopg2.extras import RealDictCursor
from connect_db import connectToDb
import psycopg2

allocate_api = Blueprint('allocate_api', 'allocate_api', url_prefix="/api/allocate")

@allocate_api.route('/', methods=['GET', 'POST', 'PUT'])
def api_verbs():
    if request.method == 'GET':
        conn = connectToDb()
        cur = conn.cursor(cursor_factory=RealDictCursor)

        try:
            cur.execute('select * from alocacao')
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
                        insert into alocacao (usuario, livro, data_locacao, data_devolucao)
                        values (%s, %s, %s, %s);
                        ''',
                        (dados['usuario'],
                         dados['livro'],
                         dados['data_locacao'],
                         dados['data_devolucao']))
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
                        update alocacao 
                        set usuario = %s, livro = %s, data_locacao = %s, data_devolucao = %s 
                        where id = %s
                        ''',
                        (dados['usuario'],
                         dados['livro'],
                         dados['data_locacao'],
                         dados['data_devolucao'],
                         dados['id']))
            conn.commit()
            cur.close()
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)
        finally:
            if conn is not None:
                conn.close()

        return("Cadastro atualizado com sucesso")


@allocate_api.route('/<string:id>', methods=['GET'])
def get_login_by_id(id):
    conn = connectToDb()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    try:
        cur.execute('select * from alocacao where id = %s', (id,))
        result = cur.fetchone()
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

    return jsonify(result)


@allocate_api.route('/<string:id>', methods=['DELETE'])
def delete(id):
    conn = connectToDb()
    cur = conn.cursor()

    try:
        cur.execute('delete from alocacao where id = %s', (id,))
        conn.commit()
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

    return "Cadastro deletado com sucesso"
