from flask_mysqldb import MySQL
import utils


def insert(mysql, id, name, countryid):
    query = f"insert into manufacturer values({id},{name},{countryid})"
    utils.execute_action(mysql, query)


def update(mysql, id, name, countryid):
    query = f"update employees " \
            f"set" \
            f"id={id}," \
            f"name={name}, " \
            f"countryid={countryid}, " \
            f"where id={id}"
    utils.execute_action(mysql, query)