from flask import Flask, request, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin


#app configuration 
app = Flask(__name__)
CORS(app, support_credentials=True)
app.config["CORS_EXPOSE_HEADERS"] = "*"


db = SQLAlchemy(app)

app.config['SQLALCHEMY_DATABASE_URI'] = "mysql://user:password@localhost/doclib"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'


from Models.models import *
from Controllers.connexionController import *


@app.route('/api/user/register', methods=['GET', 'POST'])
@cross_origin(supports_credentials=True)
def register():
    return registerFunction(db , request , Utilisateur)

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)