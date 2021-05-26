from flask_mysqldb import MySQL
import utils


def insert(mysql, id, manufacturer_id, expenses, date_of_expenses):
    query = f"insert into manufacturer_expenses values({id},{manufacturer_id},{expenses},{date_of_expenses})"
    utils.execute_action(mysql, query)


def update(mysql, id, manufacturer_id, expenses, date_of_expenses):
    query = f"update manufacturer_expenses " \
            f"set " \
            f"manufacturer_id={manufacturer_id}, " \
            f"expenses={expenses}, " \
            f"date_of_expenses='{date_of_expenses}' " \
            f"where id={id}"
    utils.execute_action(mysql, query)