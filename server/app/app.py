from flask import Flask, request
from dotenv import load_dotenv
from os import getenv
from flask_cors import CORS, cross_origin
from sqlalchemy.orm import DeclarativeBase

from Models.models import *
from Controllers.connectionController import *
from Utils import *
from flask_apscheduler import APScheduler
from config import *


app = Flask(__name__)


CORS(app, support_credentials=True)

#environment setup
load_dotenv()
MYSQL_USER = getenv("MYSQL_USER")
MYSQL_PASSWORD= getenv("MYSQL_PASSWORD")
MYSQL_DATABASE= getenv("MYSQL_DATABASE")
MYSQL_PORT= getenv("MYSQL_PORT")
SECRET_KEY = getenv("SECRET_KEY")
MYSQL_CONTAINER_NAME = getenv("MYSQL_CONTAINER_NAME")
MYSQL_PORT=getenv("MYSQL_PORT")


# db initialisation and config
class Base(DeclarativeBase):
    pass

app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_CONTAINER_NAME}:3306/{MYSQL_DATABASE}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key =SECRET_KEY

#db init
db.init_app(app)


# Set up Flask-APScheduler
scheduler = APScheduler()
scheduler.init_app(app)
scheduler.start()

#remove expired tokens from Blacklist each 10mns
scheduler.add_job('remove_expired_tokens',removeExpiredTokens,minutes=10)

#Routes and api
@app.after_request
def after_request(response):
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  response.headers.add('Access-Control-Allow-Credentials', 'true')
  return response



@app.route("/test",methods=['GET'])
def test():
    tks = isBlacklisted("a")

    return tks

   
@app.route('/api/auth/register', methods=['POST'])
@cross_origin(supports_credentials=True)
def register():
    return registerFunction(request)


@app.route('/api/auth/login', methods=['POST'])
@cross_origin(supports_credentials=True)
def login():
    return loginFunction(request)

@app.route('/api/auth/logout',methods=['POST'])
@token_required
def logout():
    return logoutFunction(request)

@app.route('/home' )
@token_required
def home():
    return 'JWT is verified. Welcome to your dashboard !  '


   
if (__name__=="__main__"):
    app.run(debug=True, host="0.0.0.0", port=8000)


