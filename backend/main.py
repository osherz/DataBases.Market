from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
import json
from utils import cursor_result_to_json
import branchs, shareholder, country, employees, utils, product, product_in_branch, publicity, \
    manufacturer, manufacturer_expenses

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
@app.route('/branchs/select')
def branchs_select():
    result = utils.get_table(mysql, 'branchs')
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
@app.route('/branchs/insert')
def branchs_insert():
    id = request.args.get('id')
    town = request.args.get('town')
    revenue = request.args.get('revenue')
    manager_id = request.args.get('manager_id')
    address = request.args.get('address')
    area = request.args.get('area')
    branchs.insert(mysql, town, revenue, manager_id, address, area)
    return "success"


# -------------------------------------- Employee --------------------------------------
# Select
@app.route('/employees/select')
def employees_select():
    result = utils.get_table(mysql, 'employees')
    return jsonify({'data': result})


# delete
@app.route('/employees/delete')
def employees_delete_row():
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
    name = request.args.get('name')
    email = request.args.get('email')
    salary = request.args.get('salary')
    seniority = request.args.get('seniority')
    branch_id = request.args.get('branch_id')
    job = request.args.get('job')
    employees.insert(mysql, name, email, salary, seniority, branch_id, job)
    return "success"


# -------------------------------------- Country --------------------------------------

# Select
@app.route('/country/select')
def country_select():
    result = utils.get_table(mysql, 'country')
    return jsonify({'data': result})


# delete
@app.route('/country/delete')
def country_delete_row():
    id = request.args.get('id')
    utils.delete_from_table(mysql, "country", id)
    return "success"


# insert
@app.route('/country/insert')
def country_insert():
    name = request.args.get('country_name')
    country.insert(mysql, name)
    return 'success'


# Update
@app.route('/country/update')
def country_update():
    id = request.args.get('id')
    name = request.args.get('country_name')
    country.update(mysql, id, name)
    return 'success'


# -------------------------------------- manufacturer --------------------------------------

# Select
@app.route('/manufacturer/select')
def manufacturer_select():
    result = utils.get_table(mysql, 'Manufacturer')
    return jsonify({'data': result})


# delete
@app.route('/manufacturer/delete')
def manufacturer_delete_row():
    id = request.args.get('id')
    utils.delete_from_table(mysql, "Manufacturer", id)
    return "success"


# insert
@app.route('/manufacturer/insert')
def manufacturer_insert():
    countryid = request.args.get('countryid')
    name = request.args.get('name')
    manufacturer.insert(mysql, name, countryid)
    return 'success'


# Update
@app.route('/manufacturer/update')
def manufacturer_update():
    id = request.args.get('id')
    countryid = request.args.get('countryid')
    name = request.args.get('name')
    manufacturer.update(mysql, id, name, countryid)
    return 'success'


# -------------------------------------- manufacturer_expenses --------------------------------------

# Select
@app.route('/manufacturer_expenses/select')
def manufacturer_expenses_select():
    result = utils.get_table(mysql, 'manufacturer_expenses')
    return jsonify({'data': result})


# delete
@app.route('/manufacturer_expenses/delete')
def manufacturer_expenses_delete_row():
    id = request.args.get('id')
    utils.delete_from_table(mysql, "manufacturer_expenses", id)
    return "success"


# insert
@app.route('/manufacturer_expenses/insert')
def manufacturer_expenses_insert():
    manufacturer_id = request.args.get('manufacturer_id')
    expenses = request.args.get('expenses')
    date_of_expenses = request.args.get('date_of_expenses')
    manufacturer_expenses.insert(mysql, manufacturer_id, expenses, date_of_expenses)
    return 'success'


# Update
@app.route('/manufacturer_expenses/update')
def manufacturer_expenses_update():
    id = request.args.get('id')
    manufacturer_id = request.args.get('manufacturer_id')
    expenses = request.args.get('expenses')
    date_of_expenses = request.args.get('date_of_expenses')
    manufacturer_expenses.update(mysql, id, manufacturer_id, expenses, date_of_expenses)
    return 'success'


# -------------------------------------- product --------------------------------------

# Select
@app.route('/product/select')
def product_select():
    result = utils.get_table(mysql, 'product')
    return jsonify({'data': result})


# delete
@app.route('/product/delete')
def product_delete_row():
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
    product.update(mysql, barcode, name, manufacturld, description, unitQty, Quantity, bIsWeighted, QtyInPackage,
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
    Quantity = request.args.get('quantity')
    bIsWeighted = request.args.get('bIsWeighted')
    QtyInPackage = request.args.get('qtyInPackage')
    ItemPrice = request.args.get('itemPrice')
    product.insert(mysql, barcode, name, manufacturld, description, unitQty, Quantity, bIsWeighted, QtyInPackage,
                   ItemPrice)
    return "success"


# -------------------------------------- product_in_branch --------------------------------------

# Select
@app.route('/product_in_branch/select')
def product_in_branch_select():
    result = utils.get_table(mysql, 'product_in_branch')
    return jsonify({'data': result})


# delete
@app.route('/product_in_branch/delete')
def product_in_branch_delete_row():
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
    product_in_branch.update(mysql, id, branch_id, product_barcode, amount_in_stock)
    return "success"


# Insert
@app.route('/product_in_branch/insert')
def product_in_branch_insert():
    branch_id = request.args.get('branch_id')
    product_barcode = request.args.get('product_barcode')
    amount_in_stock = request.args.get('amount_in_stock')
    product_in_branch.insert(mysql, branch_id, product_barcode, amount_in_stock)
    return "success"


# -------------------------------------- publicity--------------------------------------

# Select
@app.route('/publicity/select')
def publicity_select():
    result = utils.get_table(mysql, 'publicity')
    return jsonify({'data': result})


# delete
@app.route('/publicity/delete')
def publicity_delete_row():
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
    publicity.update(mysql, id, price, location, goal)
    return "success"


# Insert
@app.route('/publicity/insert')
def publicity_insert():
    price = request.args.get('price')
    location = request.args.get('location')
    goal = request.args.get('goal')
    publicity.insert(mysql, price, location, goal)
    return "success"


# -------------------------------------- shareholder--------------------------------------

# Select
@app.route('/shareholder/select')
def shareholder_select():
    result = utils.get_table(mysql, 'shareholder')
    return jsonify({'data': result})


# delete
@app.route('/shareholder/delete')
def shareholder_delete_row():
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
    shareholder.update(mysql, ID, STOCK, EMAIL, NAME)
    return "success"


# Insert
@app.route('/shareholder/insert')
def shareholder_insert():
    STOCK = request.args.get('stock')
    EMAIL = request.args.get('email')
    NAME = request.args.get('name')
    shareholder.insert(mysql, STOCK, EMAIL, NAME)
    return "success"


# ************************************************************************************************
# --------------------------------------------------querys----------------------------------------
# ************************************************************************************************
@app.route('/query/avg_country_price')  #
def avg_country_price():
    result = utils.execute_select(mysql, 'querys/avg_country_price.sql')
    return jsonify({'data': result})


@app.route('/query/avg_manu_price')  #
def avg_manu_price():
    result = utils.execute_select(mysql, 'querys/avg_manu_price.sql')
    return jsonify({'data': result})


@app.route('/query/best_manufaturer_of_each_branch')  #
def best_manufaturer_of_each_branch():
    result = utils.execute_select(mysql, 'querys/best_manufaturer_of_each_branch.sql')
    return jsonify({'data': result})


@app.route('/query/big_seniority')  #
def big_seniority():
    result = utils.execute_select(mysql, 'querys/big_seniority.sql')
    return jsonify({'data': result})


@app.route('/query/biggest_shareholders')  #
def biggest_shareholders():
    result = utils.execute_select(mysql, 'querys/biggest_shareholders.sql')
    return jsonify({'data': result})


@app.route('/query/count_of_employees_in_each_branch')  #
def count_of_employees_in_each_branch():
    result = utils.execute_select(mysql, 'querys/count_of_employees_in_each_branch.sql')
    return jsonify({'data': result})


@app.route('/query/expenses')  #
def expenses():
    result = utils.execute_select(mysql, 'querys/expenses.sql')
    return jsonify({'data': result})


@app.route('/query/list_of_brenchs_in_specific_jerusalem')  #
def list_of_brenchs_in_specific_jerusalem():
    result = utils.execute_select(mysql, 'querys/list_of_brenchs_in_specific_jerusalem.sql')
    return jsonify({'data': result})


@app.route('/query/maneger_manege_branch_by_bigest_revenue')  #
def maneger_manege_branch_by_bigest_revenue():
    result = utils.execute_select(mysql, 'querys/maneger_manege_branch_by_bigest_revenue.sql')
    return jsonify({'data': result})

@app.route('/query/max_manu_cuntry')  #
def max_manu_cuntry():
    result = utils.execute_select(mysql, 'querys/max_manu_cuntry.sql')
    return jsonify({'data': result})


@app.route('/query/max_manu_product')  #
def max_manu_product():
    result = utils.execute_select(mysql, 'querys/max_manu_product.sql')
    return jsonify({'data': result})


@app.route('/query/min_salary')  #
def min_salary():
    result = utils.execute_select(mysql, 'querys/min_salary.sql')
    return jsonify({'data': result})


@app.route('/query/num_of_town')  #
def num_of_town():
    result = utils.execute_select(mysql, 'querys/num_of_town.sql')
    return jsonify({'data': result})


#######################################
@app.route('/query/number_of_employs')
def number_of_employs():
    result = utils.execute_select(mysql, 'querys/number_of_employs.sql')
    return jsonify({'data': str(result)})
######################################


######################################
@app.route('/query/number_of_manager')
def number_of_manager():
    result = utils.execute_select(mysql, 'querys/number_of_manager.sql')
    return jsonify({'data': result})
#######################################

#######################################
@app.route('/query/nums_emploeeys+sum_of_salary')
def nums_emploeeys_sum_of_salary():
    result = utils.execute_select(mysql, 'querys/nums_emploeeys+sum_of_salary.sql')
    return jsonify({'data': str(result)})
#######################################

@app.route('/query/our_biggest_manufaturer')  #
def our_biggest_manufaturer():
    result = utils.execute_select(mysql, 'querys/our_biggest_manufaturer.sql')
    return jsonify({'data': result})


########################################
@app.route('/query/over_ten_thousand')
def over_ten_thousand():
    result = utils.execute_select(mysql, 'querys/over_ten_thousand.sql')
    return jsonify({'data': str(result)})
#######################################


@app.route('/query/product_of_min_manu')  #
def product_of_min_manu():
    result = utils.execute_select(mysql, 'querys/product_of_min_manu.sql')
    return jsonify({'data': result})


##########################################
@app.route('/query/publicity_price_of_specific_goal')
def publicity_price_of_specific_goal():
    result = utils.execute_select(mysql, 'querys/publicity_price_of_specific_goal.sql')
    return jsonify({'data': str(result)})
###########################################

@app.route('/query/salary_of_employee')  #
def salary_of_employee():
    result = utils.execute_select(mysql, 'querys/salary_of_employee.sql')
    return jsonify({'data': result})


@app.route('/query/The_branch_with_the_most_products')  #
def The_branch_with_the_most_products():
    result = utils.execute_select(mysql, 'querys/The_branch_with_the_most_products.sql')
    return jsonify({'data': result})


##########################################
@app.route('/query/sum_of_meters_in_all_sopers')
def sum_of_meters_in_all_sopers():
    result = utils.execute_select(mysql, 'querys/sum_of_meters_in_all_sopers.sql')
    return jsonify({'data': str(result)})


####################################

@app.route('/query/the_number_os_branchs')  #
def the_number_os_branchs():
    result = utils.execute_select(mysql, 'querys/the_number_os_branchs.sql')
    return jsonify({'data': result})


################################################
@app.route('/query/total_profit_all_branchs')
def total_profit_all_branchs():
    result = utils.execute_select(mysql, 'querys/total_profit_all_branchs.sql')
    return jsonify({'data': str(result)})


########################################

##############################################
@app.route('/query/total_publicity_cost')
def total_publicity_cost():
    result = utils.execute_select(mysql, 'querys/total_publicity_cost.sql')
    return jsonify({'data': result})


##############################################

# ************************************************************************************************
# --------------------------------------------------querys with param----------------------------------------
# ************************************************************************************************


@app.route('/query/employees_earn_more_than_x')  #
def employees_earn_more_than_x():
    min_salary = request.args.get('min_salary')
    with open(r"param/employees_earn_more_than_x.sql") as query:
        with mysql.connection.cursor() as cursor:
            temp = query.read().replace(":min_salary", min_salary)
            cursor.execute(temp)
            result = cursor_result_to_json(cursor)
    return jsonify({'data': result})


@app.route('/query/almost_out_of_stock')  #
def almost_out_of_stock():
    min_amount = request.args.get('min_amount')
    with open(r"param/almost_out_of_stock.sql") as query:
        with mysql.connection.cursor() as cursor:
            temp = query.read().replace(":min_amount", min_amount)
            cursor.execute(temp)
            result = cursor_result_to_json(cursor)
    return jsonify({'data': result})


@app.route('/query/almost_out_of_stock_in_country')  #
def almost_out_of_stock_in_country():
    country_name = '"' + str(request.args.get('country_name')) + '"'
    min_amount = request.args.get('min_amount')
    with open(r"param/almost_out_of_stock_in_country.sql") as query:
        with mysql.connection.cursor() as cursor:
            temp = query.read().replace(":min_amount", min_amount).replace(":country_name", country_name)
            cursor.execute(temp)
            result = cursor_result_to_json(cursor)
    return jsonify({'data': result})


@app.route('/query/products_of_specific_manu') #
def products_of_specific_manu():
    manu = '"' + str(request.args.get('manu')) + '"'
    with open(r"param/products_of_specific_manu.sql") as query:
        with mysql.connection.cursor() as cursor:
            temp = query.read().replace(":manu_name", manu)
            cursor.execute(temp)
            result = cursor_result_to_json(cursor)
    return jsonify({'data': result})


@app.route('/query/prosucts_of_specific_country')  #
def prosucts_of_specific_country():
    country_name = '"'+str(request.args.get('country_name'))+'"'
    with open(r"param/prosucts_of_specific_country.sql") as query:
        with mysql.connection.cursor() as cursor:
            temp = query.read().replace(":country_name",country_name)
            cursor.execute(temp)
            result = cursor_result_to_json(cursor)
    return jsonify({'data': result})


app.run('localhost', 5000)
