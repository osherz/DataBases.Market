from flask_mysqldb import MySQL
import utils


def insert(mysql: MySQL, ID, STOCK, EMAIL, NAME):
    query = f"insert into shareholder values({ID},{STOCK},{EMAIL},{NAME})"
    utils.execute_action(mysql, query)


def update(mysql: MySQL,id, stock, email, name):
    query = f"update shareholder " \
            f"set " \
            f"stock={stock}," \
            f"email='{email}'," \
            f"name='{name}' " \
            f"where id={id}"
    utils.execute_action(mysql, query)