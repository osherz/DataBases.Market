from flask_mysqldb import MySQL


def execute_action(mysql, query):
    try:
        #
        con = mysql.connection
        cursor = con.cursor()
        cursor.execute(query)
        con.commit()
        cursor.close()
        con.close()
        return True
    except Exception as e:
        print("Problem inserting into db: " + str(e))
        return False


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


def select_from_table(mysql: MySQL, table_name):
    query = f"select * FROM {table_name}"
    with mysql.connection.cursor() as cursor:
        cursor.execute_action(mysql, query)
        result = cursor_result_to_json(cursor)
    return result


def delete_from_table(mysql: MySQL, table_name, id):
    query = f"DELETE FROM {table_name} WHERE id={id}"
    execute_action(mysql, query)
