from flask import Flask, jsonify, request
from flask_mysqldb import MySQL

import country
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
    return jsonify({'data': utils.get_table(mysql, 'employees')})


@app.route('/tables')
def get_table():
    table_name = request.args.get('table')
    return jsonify(utils.get_table(table_name))


################################# Employee
# Select @app.route('/employees/delete')
@app.route('/employees/delete')
def delete_row():
    id = request.args.get('id')
    utils.delete_from_table()

# Update @app.route('/employees/delete')
# Insert @app.route('/employees/delete')


################################# Country
@app.route('/country/insert')
def employees_insert():
    name = request.args.get('name')
    country.insert(name, mysql)
    return 'success'


################################# Country

app.run('localhost', 5000)
