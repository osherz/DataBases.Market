from flask import Flask, jsonify
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
        result = cursor.fetchall()
    return jsonify(result)



app.run('localhost', 5000)
