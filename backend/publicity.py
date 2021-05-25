from flask_mysqldb import MySQL
import utils


def insert(mysql: MySQL, id, price, location, goal):
    query = f"insert into publicity values({id},{price},{location},{goal})"
    utils.execute_action(mysql, query)


def update(mysql: MySQL, id, price, location, goal):
    query = f"update product_in_branch " \
            f"set" \
            f"id{id}" \
            f"branch_id{price}" \
            f"product_barcode{location}" \
            f"amount_in_stock{goal}"
    utils.execute_action(mysql, query)