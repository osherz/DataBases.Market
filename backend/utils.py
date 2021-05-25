from flask_mysqldb import MySQL


def cursor_result_to_json(cursor):
    return [
        dict(
            (cursor.description[i][0], value)
            for i, value in enumerate(row)
        )
        for row in cursor.fetchall()
    ]


def get_table(mysql: MySQL, table_name):
    query = "select * from %s"
    with mysql.connection.cursor() as cursor:
        cursor.execute(query % (table_name,))
        result = cursor_result_to_json(cursor)
    return result


def delete_from_table(mysql: MySQL, table_name, id):
    pass
