from flask_mysqldb import MySQL
import utils


def insert(mysql: MySQL, name, email, salary, seniority, branch_id, job, is_manager):
    query = f"insert into employees(name,email,salary,seniority,barnch_id,job,is_manager) " \
            f"values('{name}','{email}',{salary},{seniority},{branch_id},'{job}',{is_manager})"
    utils.execute_action(mysql, query)


def update(mysql: MySQL, id, name, email, salary, seniority, branch_id, job, is_manager):
    query = f"update employees " \
            f"set " \
            f"name='{name}', " \
            f"email='{email}', " \
            f"salary={salary}, " \
            f"seniority={seniority}, " \
            f"barnch_id={branch_id}, " \
            f"job='{job}', " \
            f"is_manager={is_manager} " \
            f"where id={id}"
    utils.execute_action(mysql, query)
