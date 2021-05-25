from flask_mysqldb import MySQL
import utils


def insert(mysql: MySQL, id, town, revenue, manager_id, address, area):
    query = f"insert into branchs values({id},{town},{revenue},{manager_id},{address},{area})"
    utils.execute_action(mysql, query)


def update(mysql: MySQL, id, town, revenue, manager_id, address, area):
    query = f"update branchs " \
            f"set" \
            f"id={id}," \
            f"town={town}, " \
            f"revenue={revenue}, " \
            f"manager_id={manager_id}, " \
            f"address={address}, " \
            f"area={area}, " \
            f"where id={id}"
    utils.execute_action(mysql, query)
