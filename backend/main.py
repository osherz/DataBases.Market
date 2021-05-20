from flask import Flask, jsonify
from flask_mysqldb import MySQL

app = Flask(__name__)
app.config['MYSQL_HOST'] = ''
app.config['MYSQL_DB'] = ''
app.config['MYSQL_USERNAME'] = ''
app.config['MYSQL_PASSWORD'] = ''
mysql = MySQL(app)


@app.route('/')
def index():
    return 'Success'


if __name__ == '__main__':
    app.run('localhost', 5000)
