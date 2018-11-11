import psycopg2.extras
import psycopg2 as pg

def connectToDb():
    try:
        return pg.connect(
            database='biblioteca_online',
            user='postgres',
            password='123',
            host='localhost',
            port='5432'
        )
    except Exception as erro:
        print(erro)