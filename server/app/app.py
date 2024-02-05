from flask import Flask, request , send_file , send_from_directory, Blueprint
from flask_cors import CORS, cross_origin

from Models.models import *
from Controllers.connectionController import *
from Controllers.profileController import *
from Controllers.favoritsController import *
from Controllers.articlesController import *
from Controllers.moderatorsController import *

from Utils import *
from config import *
from apscheduler.schedulers.background import BackgroundScheduler
from flask_swagger_ui import get_swaggerui_blueprint


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

# swagger ui
REQUEST_API = Blueprint('request_api', __name__)

def get_blueprint():
    """Return the blueprint for the main app module"""
    return REQUEST_API

### swagger specific ###
SWAGGER_URL = '/swagger'
API_URL = '/static/swagger.json'
SWAGGERUI_BLUEPRINT = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': "Seans-Python-Flask-REST-Boilerplate"
    }
)
app.register_blueprint(SWAGGERUI_BLUEPRINT, url_prefix=SWAGGER_URL)
### end swagger specific ###


app.register_blueprint(get_blueprint())


#Routes and api
@app.after_request
def after_request(response):
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  response.headers.add('Access-Control-Allow-Credentials', 'true')
  return response

   
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

@app.route("/api/auth/forgot",methods=['POST'])
def forgot():
    return resetToken(request)

@app.route("/api/auth/reset/<token>", methods=['GET'])
def reset(token):
    return verifyResetToken(token)

@app.route("/api/auth/reset",methods=['POST'])
@token_required
def resetPassword():
    return reset_password(request)

@app.route("/api/profile", methods=['GET'])
@token_required
def profile():
    return getProfileInfo(request)

@app.route("/api/profile/changepassword", methods=['PUT'])
@token_required
def changePassword():
    return changePasswordFunction(request)

@app.route("/api/favorits", methods=['GET', 'POST'])
@token_required
def favorits():
    if request.method=="GET":
        return getFavorits(request)
    else request.method=="POST":
        return addFavorit(request)
    
@app.route("/api/favorits/delete", methods=['POST'])
@token_required
def favorits():
    return removeFavorit(request)

@app.route("/api/auth/addmoderator",methods=['POST'])
@token_required
@token_admin
def addMod():
    return addmoderator(request)

@app.route("/api/admin/moderators",methods=['GET'])
# @token_required
# @token_admin
def getMod():
    return getmoderators()


@app.route("/api/article/uploadurl" , methods = ['POST'] )
@token_required
@token_admin
def uploadUrl(): 
   return uploadFileFromUrl(request)

@app.route("/api/article/uploadfile" , methods = ['POST'] )
@token_required
@token_admin
def uploadFile(): 
   return uploadFileFromUser(request)


@app.route("/api/article/<id>" , methods = ['GET'] )
# @token_required
# @token_admin
def getArticle(id): 
   return getArticleById(id)

@app.route("/api/articles/delete" , methods = ['POST'] )
@token_required
@token_moderator
def delete(): 
   return deleteArticles(request)

@app.route("/api/articles/confirm", methods = ['POST'])
@token_required
@token_moderator
def confirmUplaod():
    return approveArticles(request)

@app.route("/api/articles/approved", methods=['GET'])
# @token_required
def getGoodArticles():
    return getAllArticles(approved=True)

@app.route("/api/articles/pending", methods=['GET'])
# @token_required
# @token_moderator
def getPendingArticles():
    return getAllArticles(approved=False)


#repeating tasks
def removeExpiredTokens():
    with app.app_context():
        delete_blacklist_tokens()

def removeVerifCodes():
    with app.app_context():
        delete_old_verif_codes()

# Create the background scheduler
scheduler = BackgroundScheduler()
# Create the job
scheduler.add_job(func=removeExpiredTokens, trigger="interval", minutes=REMOVE_TOKENS_INTERVAL)
scheduler.add_job(func=removeVerifCodes, trigger="interval", minutes=CODE_REMOVAL_INTERVAL)

# Start the scheduler

if (__name__=="__main__"):
    scheduler.start()
    app.run(debug=True, host="0.0.0.0", port=8000)


