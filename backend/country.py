from flask_mysqldb import MySQL
import utils


def insert(mysql: MySQL, name):
    query = f"insert into country values({name})"
    utils.execute_action(mysql, query)


def update(mysql: MySQL, id, name):
    query = f"update country " \
            f"set " \
            f"country_name='{name}' " \
            f"where id={id}"
    utils.execute_action(mysql, query)
