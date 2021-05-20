from flask import Flask, jsonify, request
from flask_mysqldb import MySQL

app = Flask(__name__)
app.config['MYSQL_HOST'] = 'freedb.tech'
app.config['MYSQL_DB'] = 'freedbtech_market'
app.config['MYSQL_USER'] = 'freedbtech_osher'
app.config['MYSQL_PASSWORD'] = '123456'
mysql = MySQL(app)


@app.route('/')
def index():
    query = "select * from employees"
    with mysql.connection.cursor() as cursor:
        cursor.execute(query)
        result = [
            dict(
                (cursor.description[i][0], value)
                for i, value in enumerate(row)
            )
            for row in cursor.fetchall()
        ]
    return jsonify({'data': result})


@app.route('/tables')
def get_table():
    table_name = request.args.get('table')
    query = f"select * from %s"
    with mysql.connection.cursor() as cursor:
        cursor.execute(query % (table_name,))
        result = [
            dict(
                (cursor.description[i][0], value)
                for i, value in enumerate(row)
            )
            for row in cursor.fetchall()
        ]
    return jsonify({'data': result})


app.run('localhost', 5000)
