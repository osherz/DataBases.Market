from flask import Flask, jsonify, request
from flask_mysqldb import MySQL

import country
import employees
import utils
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


################################# Branchs
# Select @app.route('/employees/delete')
# @app.route('/employees/delete')


# Update @app.route('/employees/delete')
# Insert @app.route('/employees/delete')

################################# Employee
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
    utils.delete_from_table(mysql, 'employees', id)
    return 'success'


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
    return 'success'


# Insert
@app.route('/employees/insert')
def employees_insert():
    name = request.args.get('name')
    email = request.args.get('email')
    salary = request.args.get('salary')
    seniority = request.args.get('seniority')
    branch_id = request.args.get('branch_id')
    job = request.args.get('job')
    employees.insert(mysql, name, email, salary, seniority, branch_id, job)
    return 'success'


################################# Country
@app.route('/country/insert')
def country_insert():
    name = request.args.get('name')
    country.insert(mysql, name)
    return 'success'


# Select @app.route('/employees/delete')
# @app.route('/employees/delete')


# Update @app.route('/employees/delete')
# Insert @app.route('/employees/delete')


################################# manufac
# Select @app.route('/employees/delete')
# @app.route('/employees/delete')


# Update @app.route('/employees/delete')
# Insert @app.route('/employees/delete')


################################# manufac_ex
# Select @app.route('/employees/delete')
# @app.route('/employees/delete')


# Update @app.route('/employees/delete')
# Insert @app.route('/employees/delete')

################################# product
# Select @app.route('/employees/delete')
# @app.route('/employees/delete')


# Update @app.route('/employees/delete')
# Insert @app.route('/employees/delete')


app.run('localhost', 5000)
