from functools import wraps

from Controllers.baseController import *
from flask import jsonify, request
import jwt
from datetime import datetime, timedelta
from validate_email_address import validate_email

from Utils import *
from Models.models import *

from config import *
import os

SECRET_KEY = os.getenv('SECRET_KEY')


# tokens_blacklist = set()

#check if the email exist
def is_valid_email(email):
    
    is_valid_domain = validate_email(email, verify=True)
    
    return is_valid_domain
    
def registerFunction (request):
    try: 
        in_email = request.json['email']
        in_passwd = request.json['password']
        if (not in_email or not in_passwd):
            return empty
        if (not is_valid_email(in_email)):
           return invalid_email

        user = db.session.query(User).filter_by(email=in_email).first()
        if (user == None):
            new_user = User(
                email=in_email,
                role_id = 1,
            )
            new_user.set_password(in_passwd)
            db.session.add(new_user)
            db.session.commit()
                
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


def loginFunction (request):
    try: 
        in_email = request.json['email']
        in_passwd = request.json['password']
        if (not in_email or not in_passwd):
            return sendErrorMessage(
                message="Empty email or password"
            )
        user =  db.session.query(User).filter_by(email=in_email).first()
        if (user and user.check_password(in_passwd)):
            token = jwt.encode({
                'user': user.toJSON(),
                'exp': datetime.utcnow() + timedelta(hours=TOKEN_EXPIRATION_TIME)  # Expiration en une heure, ajustez selon vos besoins
            }, SECRET_KEY, algorithm='HS256')
            
            return sendResponse(
                data={
                    "token": token
                },
                message='Logged in successfully'
            )
        else :
            return failed_auth
    except Exception as e:
        return sendErrorMessage(
            message=str(e)
        )
    
def logoutFunction(request):
    token = request.headers.get('Authorization').split('Bearer ')[1]

    blacklistToken(token)

    return {
        "result": True,
        "message": "Logged Out successfully" 
    }

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')

        if not token:
            return jsonify({'Alert!': 'Token is missing!'}), 401

        # Check if the token starts with 'Bearer ' and extract the token
        if 'Bearer ' in token:
            token = token.split('Bearer ')[1]
        
        if isBlacklisted(token):
            return jsonify({'Message': 'Token has expired (blacklist)'}), 403

        try:
            data = jwt.decode(token, SECRET_KEY , algorithms="HS256")
        except jwt.ExpiredSignatureError:
            return jsonify({'Message': 'Token has expired'}), 403
        except jwt.InvalidTokenError:
            return jsonify({'Message': 'Invalid token'}), 403

        return f(*args, **kwargs)

    return decorated