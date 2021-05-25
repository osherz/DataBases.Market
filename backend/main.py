from flask import Flask, jsonify, request
from flask_mysqldb import MySQL

import country
import employees
import utils
from backend import branchs
from utils import cursor_result_to_json

app = Flask(__name__)
app.config['MYSQL_HOST'] = 'freedb.tech'
app.config['MYSQL_DB'] = 'freedbtech_market'
app.config['MYSQL_USER'] = 'freedbtech_osher'
app.config['MYSQL_PASSWORD'] = '123456'
mysql = MySQL(app)


@app.route('/')
def index():
    query = "select * from country"
    with mysql.connection.cursor() as cursor:
        cursor.execute(query)
        result = cursor_result_to_json(cursor)
    return jsonify({'data': result})


@app.route('/tables')
def get_table():
    table_name = request.args.get('table')
    return jsonify(utils.get_table(table_name))


# -------------------------------------- branchs --------------------------------------
# Select
@app.route('branchs/select')
def branchs_select():
    query = "select * from branchs "
    with mysql.connection.cursor() as cursor:
        cursor.execute(query)
        result = cursor_result_to_json(cursor)
    return jsonify({'data': result})


# delete
@app.route('/branchs/delete')
def delete_row():
    id = request.args.get('id')
    utils.delete_from_table(mysql, "branchs", id)
    return "success"


# Update
@app.route('/branchs/update')
def branchs_update():
    id = request.args.get('id')
    town = request.args.get('town')
    revenue = request.args.get('revenue')
    manager_id = request.args.get('manager_id')
    address = request.args.get('address')
    area = request.args.get('area')
    branchs.update(mysql, id, town, revenue, manager_id, address, area)
    return "success"


# Insert
@app.route('/branchs/delete')
def branchs_insert():
    id = request.args.get('id')
    town = request.args.get('town')
    revenue = request.args.get('revenue')
    manager_id = request.args.get('manager_id')
    address = request.args.get('address')
    area = request.args.get('area')
    branchs.insert(mysql, id, town, revenue, manager_id, address, area)
    return "success"


# -------------------------------------- Employee --------------------------------------
# Select
@app.route('/employees/select')
def employees_select():
    query = "select * from employees"
    with mysql.connection.cursor() as cursor:
        cursor.execute(query)
        result = cursor_result_to_json(cursor)
    return jsonify({'data': result})


# delete
@app.route('/employees/delete')
def delete_row():
    id = request.args.get('id')
    utils.delete_from_table(mysql, "employees", id)
    return "success"


# Update
@app.route('/employees/update')
def employees_update():
    id = request.args.get('id')
    name = request.args.get('name')
    email = request.args.get('email')
    salary = request.args.get('salary')
    seniority = request.args.get('seniority')
    branch_id = request.args.get('branch_id')
    job = request.args.get('job')
    employees.update(mysql, id, name, email, salary, seniority, branch_id, job)
    return "success"


# Insert
@app.route('/employees/insert')
def employees_insert():
    id = request.args.get('id')
    name = request.args.get('name')
    email = request.args.get('email')
    salary = request.args.get('salary')
    seniority = request.args.get('seniority')
    branch_id = request.args.get('branch_id')
    job = request.args.get('job')
    employees.insert(mysql, id, name, email, salary, seniority, branch_id, job)
    return "success"


# -------------------------------------- Country --------------------------------------

# Select
@app.route('/country/select')
def country_select():
    query = "select * from country"
    with mysql.connection.cursor() as cursor:
        cursor.execute(query)
        result = cursor_result_to_json(cursor)
    return jsonify({'data': result})


# delete
@app.route('/country/delete')
def delete_row():
    id = request.args.get('id')
    utils.delete_from_table(mysql, "country", id)
    return "success"


# insert
@app.route('/country/insert')
def country_insert():
    id = request.args.get('id')
    name = request.args.get('country_name')
    country.insert(mysql, id, name)
    return 'success'


# Update
@app.route('/country/update')
def country_insert():
    id = request.args.get('id')
    name = request.args.get('country_name')
    country.update(mysql, id, name)
    return 'success'


# -------------------------------------- manufac --------------------------------------
# Select @app.route('/employees/delete')
# @app.route('/employees/delete')


# Update @app.route('/employees/delete')
# Insert @app.route('/employees/delete')


# -------------------------------------- manufac_ex --------------------------------------
# Select @app.route('/employees/delete')
# @app.route('/employees/delete')


# Update @app.route('/employees/delete')
# Insert @app.route('/employees/delete')

# -------------------------------------- product --------------------------------------
# Select @app.route('/employees/delete')
# @app.route('/employees/delete')


# Update @app.route('/employees/delete')
# Insert @app.route('/employees/delete')


app.run('localhost', 5000)
