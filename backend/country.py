from flask_mysqldb import MySQL
import utils


def insert(mysql: MySQL, name):
    query = f"insert into country values({name})"
    with mysql.connection.cursor() as cursor:
        cursor.execute(query)
        result = utils.cursor_result_to_json(cursor.fetchall())
    return result
