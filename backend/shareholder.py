from flask_mysqldb import MySQL
import utils


def insert(mysql: MySQL, ID, STOCK, EMAIL, NAME):
    query = f"insert into shareholder values({ID},{STOCK},{EMAIL},{NAME})"
    utils.execute_action(mysql, query)


def update(mysql: MySQL,ID, STOCK, EMAIL, NAME):
    query = f"update product_in_branch " \
            f"set" \
            f"id={ID}"\
            f"STOCK={STOCK}" \
            f"EMAIL={EMAIL}" \
            f"NAME={NAME}"
    utils.execute_action(mysql, query)