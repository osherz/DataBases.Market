from flask_mysqldb import MySQL
import utils


def insert(mysql, name, countryid):
    query = f"insert into Manufacturer(name, countryid) values('{name}',{countryid})"
    utils.execute_action(mysql, query)


def update(mysql, id, name, countryid):
    query = f"update Manufacturer " \
            f"set " \
            f"name='{name}', " \
            f"countryid={countryid} " \
            f"where id={id}"
    utils.execute_action(mysql, query)