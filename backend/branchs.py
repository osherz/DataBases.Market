from flask_mysqldb import MySQL
import utils


def insert(mysql: MySQL, town, revenue, address, area):
    query = f"insert into branchs(town,revenue,address,area) " \
            f"values('{town}',{revenue},'{address}',{area})"
    utils.execute_action(mysql, query)


def update(mysql: MySQL, id, town, revenue, address, area):
    query = f"update branchs " \
            f"set " \
            f"town='{town}', " \
            f"revenue='{revenue}', " \
            f"address='{address}', " \
            f"area={area} " \
            f"where id={id}"
    utils.execute_action(mysql, query)
