from flask_mysqldb import MySQL
import utils


def insert(mysql: MySQL, name, email, salary, seniority, branch_id, job):
    query = f"insert into employees values({name},{email},{salary},{seniority},{branch_id},{job})"
    utils.execute_action(mysql, query)


def update(mysql: MySQL, id, name, email, salary, seniority, branch_id, job):
    query = f"update employees " \
            f"set " \
            f"name='{name}', " \
            f"email='{email}', " \
            f"salary={salary}, " \
            f"seniority={seniority}, " \
            f"branch_id={branch_id}, " \
            f"job='{job}' " \
            f"where id={id}"
    utils.execute_action(mysql, query)
