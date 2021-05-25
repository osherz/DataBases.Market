from flask_mysqldb import MySQL
import utils


def insert(mysql: MySQL, id, name):
    query = f"insert into country values({id},{name})"
    utils.execute_action(mysql, query)


def update(mysql: MySQL, id, name):
    query = f"update branchs " \
            f"set" \
            f"id={id}," \
            f"name={name}, " \
            f"where id={id}"
    utils.execute_action(mysql, query)
