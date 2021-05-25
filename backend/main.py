from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from utils import cursor_result_to_json
from backend import branchs, shareholder, country, employees, utils, product, product_in_branch, publicity

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


# delete
@app.route('/product/delete')
def delete_row():
    barcode = request.args.get('id')
    utils.delete_from_table(mysql, "employees", barcode)
    return "success"


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

# Select
# @app.route('/product/select')
def product_select():
    query = "select * from product"
    with mysql.connection.cursor() as cursor:
        cursor.execute(query)
        result = cursor_result_to_json(cursor)
    return jsonify({'data': result})


# delete
@app.route('/product/delete')
def delete_row():
    barcode = request.args.get('barcode')
    utils.delete_from_table(mysql, "product", barcode)
    return "success"


# Update
@app.route('/product/update')
def product_update():
    barcode = request.args.get('barcode')
    name = request.args.get('name')
    manufacturld = request.args.get('manufacturld')
    description = request.args.get('description')
    unitQty = request.args.get('unitQty')
    Quantity = request.args.get('Quantity')
    bIsWeighted = request.args.get('bIsWeighted')
    QtyInPackage = request.args.get('QtyInPackage')
    ItemPrice = request.args.get('ItemPrice')
    product.update(MySQL, barcode, name, manufacturld, description, unitQty, Quantity, bIsWeighted, QtyInPackage,
                   ItemPrice)
    return "success"


# Insert
@app.route('/product/insert')
def product_insert():
    barcode = request.args.get('barcode')
    name = request.args.get('name')
    manufacturld = request.args.get('manufacturld')
    description = request.args.get('description')
    unitQty = request.args.get('unitQty')
    Quantity = request.args.get('Quantity')
    bIsWeighted = request.args.get('bIsWeighted')
    QtyInPackage = request.args.get('QtyInPackage')
    ItemPrice = request.args.get('ItemPrice')
    product.insert(MySQL, barcode, name, manufacturld, description, unitQty, Quantity, bIsWeighted, QtyInPackage,
                   ItemPrice)
    return "success"


# -------------------------------------- product_in_branch --------------------------------------

# Select
# @app.route('/product_in_branch/select')
def product_in_branch_select():
    query = "select * from product_in_branch"
    with mysql.connection.cursor() as cursor:
        cursor.execute(query)
        result = cursor_result_to_json(cursor)
    return jsonify({'data': result})


# delete
@app.route('/product_in_branch/delete')
def delete_row():
    id = request.args.get('id')
    utils.delete_from_table(mysql, "product_in_branch", id)
    return "success"


# Update
@app.route('/product_in_branch/update')
def product_in_branch_update():
    id = request.args.get('id')
    branch_id = request.args.get('branch_id')
    product_barcode = request.args.get('product_barcode')
    amount_in_stock = request.args.get('amount_in_stock')
    product_in_branch.update(MySQL, id, branch_id, product_barcode, amount_in_stock)
    return "success"


# Insert
@app.route('/product_in_branch/insert')
def product_insert():
    id = request.args.get('id')
    branch_id = request.args.get('branch_id')
    product_barcode = request.args.get('product_barcode')
    amount_in_stock = request.args.get('amount_in_stock')
    product_in_branch.update(MySQL, id, branch_id, product_barcode, amount_in_stock)
    return "success"


# -------------------------------------- publicity--------------------------------------

# Select
# @app.route('/publicity/select')
def publicity_select():
    query = "select * from publicity"
    with mysql.connection.cursor() as cursor:
        cursor.execute(query)
        result = cursor_result_to_json(cursor)
    return jsonify({'data': result})


# delete
@app.route('/publicity/delete')
def delete_row():
    id = request.args.get('id')
    utils.delete_from_table(mysql, "publicity", id)
    return "success"


# Update
@app.route('/publicity/update')
def publicity_update():
    id = request.args.get('id')
    price = request.args.get('price')
    location = request.args.get('location')
    goal = request.args.get('goal')
    publicity.update(MySQL, id, price, location, goal)
    return "success"


# Insert
@app.route('/publicity/insert')
def publicity_insert():
    id = request.args.get('id')
    price = request.args.get('price')
    location = request.args.get('location')
    goal = request.args.get('goal')
    publicity.update(MySQL, id, price, location, goal)
    return "success"


# -------------------------------------- shareholder--------------------------------------

# Select
# @app.route('/shareholder/select')
def shareholder_select():
    query = "select * from shareholder"
    with mysql.connection.cursor() as cursor:
        cursor.execute(query)
        result = cursor_result_to_json(cursor)
    return jsonify({'data': result})


# delete
@app.route('/shareholder/delete')
def delete_row():
    ID = request.args.get('ID')
    utils.delete_from_table(mysql, "shareholder", ID)
    return "success"


# Update
@app.route('/shareholder/update')
def shareholder_update():
    ID = request.args.get('ID')
    STOCK = request.args.get('STOCK')
    EMAIL = request.args.get('EMAIL')
    NAME = request.args.get('NAME')
    shareholder.update(MySQL, ID, STOCK, EMAIL, NAME)
    return "success"


# Insert
@app.route('/shareholder/insert')
def shareholder_insert():
    ID = request.args.get('ID')
    STOCK = request.args.get('STOCK')
    EMAIL = request.args.get('EMAIL')
    NAME = request.args.get('NAME')
    shareholder.update(MySQL, ID, STOCK, EMAIL, NAME)
    return "success"


app.run('localhost', 5000)
