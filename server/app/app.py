from flask import Flask, request, session
from dotenv import load_dotenv
from os import getenv
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase

from Models.models import *
from Controllers.connexionController import *

#app configuration 
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
app.secret_key =SECRET_KEY.encode()

db = SQLAlchemy(model_class=Base)
db.init_app(app)


#Routes and api

@app.route('/api/auth/register', methods=['GET', 'POST'])
@cross_origin(supports_credentials=True)
def register():
    return registerFunction(db , request , User)
    

@app.route("/test",methods=['GET'])
def test():
    pass
   
   
if (__name__=="__main__"):
    app.run(debug=True, host="0.0.0.0", port=8000)