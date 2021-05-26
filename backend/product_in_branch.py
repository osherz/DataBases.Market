from flask_mysqldb import MySQL
import utils


def insert(mysql: MySQL, id, branch_id, product_barcode, amount_in_stock):
    query = f"insert into product_in_branch values({id},{branch_id},{product_barcode},{amount_in_stock})"
    utils.execute_action(mysql, query)


def update(mysql: MySQL, id, branch_id, product_barcode, amount_in_stock):
    query = f"update product_in_branch " \
            f"set " \
            f"branch_id={branch_id}" \
            f"product_barcode='{product_barcode}', " \
            f"amount_in_stock={amount_in_stock}" \
            f"where id={id}"
    utils.execute_action(mysql, query)
