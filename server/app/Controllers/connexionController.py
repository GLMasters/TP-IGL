from functools import wraps
from app import session
from Controllers.baseController import *
from flask import jsonify, request
from flask_login import login_user, login_required, current_user, logout_user
import jwt
from datetime import datetime, timedelta
from app import app


def registerFunction (db, request, User):
    try: 
        in_email = request.json['email']
        in_passwd = request.json['password']
        if (not in_email or not in_passwd):
            return sendErrorMessage(
                message="Email or password is empty"
            )
        #user = User.query.filter_by(email=in_email).first()
        #if (user == None):
        new_user = User(
            email=in_email,
            password=in_passwd,
            role_id = 1,
        )
        new_user.set_password(in_passwd)
        db.session.add(new_user)
        db.session.commit()
            #session['user'] = new_user.id #use cookies
            #session['logged_in'] = True
        return sendResponse(
            data=new_user.toJSON(),
            message='Account created successfull, you can login now'
        )
        #else :
            #return sendErrorMessage(
            #message="Email has already exist")
    except Exception as e:
        return sendErrorMessage(
            message=str(e)
        )


def loginFunction (db, request, User):
    try: 
        in_email = request.json['email']
        in_passwd = request.json['password']
        if (not in_email or not in_passwd):
            return sendErrorMessage(
                message="Email or password is empty"
            )
        user = User.query.filter_by(email=in_email).first()
        if (user and user.check_password(in_passwd)):
            token = str(jwt.encode({
            'user': request.form['username'],
            # don't foget to wrap it in str function, otherwise it won't work [ i struggled with this one! ]
            'expiration': str(datetime.utcnow() + timedelta(seconds=60))
             },
            app.config['SECRET_KEY']))
            session['logged_in'] = True
            return sendResponse(
                data=token.decode('utf-8'),
                message='Login successfully'
            )
        else :
            return sendErrorMessage(
             message="Unable to verify, WWW-Authenticate: Basic realm: Authentication Failed"
             )
    except Exception as e:
        return sendErrorMessage(
            message=str(e)
        )
    


# Login decorator
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            if (request.headers['Authorization']):
                return f(*args, **kwargs)
        except Exception as e:
            return sendErrorMessage(
                message=str(e)
            )
    return decorated_function


def token_required(f):
    # decorator factory which invoks update_wrapper() method and passes decorated function as an argument
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.args.get('token')
        if not token:
            return jsonify({'Alert!': 'Token is missing!'}), 401
        try:

            data = jwt.decode(token, app.config['SECRET_KEY'])
        # except jwt.InvalidTokenError:
        #     return 'Invalid token. Please log in again.'
        except:
            return jsonify({'Message': 'Invalid token'}), 403
        return f(*args, **kwargs)
    return decorated
