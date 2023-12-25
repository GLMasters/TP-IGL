from functools import wraps

from app import session
from Controllers.baseController import *
from flask import jsonify, request
import jwt
from datetime import datetime, timedelta
from app import app
from validate_email_address import validate_email
import re

def is_valid_email(email):
    # Validation du format de l'adresse e-mail
    if re.match(r"[^@]+@[^@]+\.[^@]+", email):
        # Validation du domaine via la bibliothèque validate_email_address
        is_valid_domain = validate_email(email, verify=True)
        return is_valid_domain
    return False


def registerFunction (db, request, User):
    try: 
        in_email = request.json['email']
        in_passwd = request.json['password']
        if (not in_email or not in_passwd):
            return empty
        #if (not is_valid_email(in_email)):
         #   return invalid_email
           # )
        user = db.session.query(User).filter_by(email=in_email).first()
        if (user == None):
            new_user = User(
                email=in_email,
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
        else :
            return user_exists
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
        user =  db.session.query(User).filter_by(email=in_email).first()
        if (user and user.check_password(in_passwd)):
            token = jwt.encode({
                'user': user.toJSON(),
                'exp': datetime.utcnow() + timedelta(days=7)  # Expiration en une heure, ajustez selon vos besoins
            }, app.config['SECRET_KEY'], algorithm='HS256')
            session['logged_in'] = True
            return sendResponse(
                data=token,
                message='Login successfully'
            )
        else :
            return failed_auth
    except Exception as e:
        return sendErrorMessage(
            message=str(e)
        )
    


# Login decorator

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')

        if not token:
            return token_missing

        # Check if the token starts with 'Bearer ' and extract the token
        if 'Bearer ' in token:
            token = token.split('Bearer ')[1]

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'] , algorithms="HS256")
        except jwt.ExpiredSignatureError:
            return jsonify({'Message': 'Token has expired'}), 403
        except jwt.InvalidTokenError:
            return jsonify({'Message': 'Invalid token'}), 403

        return f(*args, **kwargs)

    return decorated