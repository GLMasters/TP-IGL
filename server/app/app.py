from flask import Flask, request
from dotenv import load_dotenv
from os import getenv
from flask_cors import CORS, cross_origin

from Models.models import *
from Controllers.connectionController import *
from Utils import *
from flask_apscheduler import APScheduler
from config import *

from apscheduler.schedulers.background import BackgroundScheduler



#init flask app
app = Flask(__name__)

#cross origin policy
CORS(app, support_credentials=True)


# db initialisation and app config

app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_CONTAINER_NAME}:3306/{MYSQL_DATABASE}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key =SECRET_KEY

#db init
db.init_app(app)



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

    return str(type(tks[0]))

   
@app.route('/api/auth/register', methods=['POST'])
@cross_origin(supports_credentials=True)
def register():
    return registerFunction(request)

@app.route('/api/auth/confirm', methods=['POST'])
@cross_origin(supports_credentials=True)
def confirm():
    return confirmEmail(request)


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



def removeExpiredTokens():
    with app.app_context():
        tokens = db.session.query(Token).all()
        for token in tokens:
            try:
                jwt.decode(str(token), SECRET_KEY , algorithms="HS256")
            except jwt.ExpiredSignatureError:
                    db.session.delete(token)
                    db.session.commit()

# Create the background scheduler
scheduler = BackgroundScheduler()
# Create the job
scheduler.add_job(func=removeExpiredTokens, trigger="interval", minutes=REMOVE_TOKENS_INTERVAL)
# Start the scheduler

if (__name__=="__main__"):
    scheduler.start()
    app.run(debug=True, host="0.0.0.0", port=8000)


