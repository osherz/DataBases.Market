from flask_mysqldb import MySQL
import utils


def insert(mysql: MySQL, id, price, location, goal):
    query = f"insert into publicity values({id},{price},{location},{goal})"
    utils.execute_action(mysql, query)


def update(mysql: MySQL, id, price, location, goal):
    query = f"update publicity " \
            f"set " \
            f"branch_id={price}, " \
            f"product_barcode='{location}', " \
            f"amount_in_stock='{goal}'" \
            f"where id={id}"
    utils.execute_action(mysql, query)