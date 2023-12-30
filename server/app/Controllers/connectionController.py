from Controllers.baseController import *
from flask import jsonify, request
import jwt
from datetime import datetime, timedelta
from validate_email_address import validate_email

from Utils import *
from Models.models import *

from config import *
import os

from random import randint

SECRET_KEY = os.getenv('SECRET_KEY')



#check if the email exist
def is_valid_email(email):
    
    is_valid_domain = validate_email(email, verify=True)
    
    return is_valid_domain

def registerFunction(request):
    try: 
        in_email = request.json['email']
        in_passwd = request.json['password']
        if (not in_email or not in_passwd):
            return empty_creds
        if (not is_valid_email(in_email)):
           return invalid_email

        user = db.session.query(User).filter_by(email=in_email).first()
        if (not user == None):
            return user_exists
        
        code = randint(10000,99999)
        
        user = db.session.query(TempUser).filter_by(email=in_email).first()
        
        if user:
            user.code = code
            user.set_password(in_passwd)
            user.creation_timestamp = datetime.timestamp()
            db.session.commit()
        else:        
            tmp_user = TempUser(
                email=in_email,
                code=code
            )
            tmp_user.set_password(in_passwd)
            db.session.add(tmp_user)
            db.session.commit()
            user = tmp_user

        send_verif_code(in_email,code)

            
        return sendResponse(
            data=user.toJSON(),
            message='Code sent to email'
        )
    except Exception as e:
        return sendErrorMessage(
            message=str(e)
        )

def confirmEmail(request):
    try:
        id = request.json['id']
        code = request.json['code']

        if (not id or not code):
            return empty_code_id
        

        tmp_user = db.session.query(TempUser).filter_by(id=id).one()

        if (not tmp_user):
            return wrong_id
        
        if (tmp_user.code != code):
            return invalid_code
        
        new_user = User(
            email=tmp_user.email,
            role_id = 1
        )

        new_user.set_password(tmp_user.password)

        db.session.add(new_user)
        db.session.commit()

        db.session.delete(tmp_user)
        db.session.commit()

        return sendResponse(
            data=new_user.toJSON(),
            message='Account created successfull, you can login now'
        )
    
    except Exception as e:
        return sendErrorMessage(
            message=str(e)
        )

def loginFunction (request):
    try: 
        in_email = request.json['email']
        in_passwd = request.json['password']
        if (not in_email or not in_passwd):
            return empty_creds
        user =  db.session.query(User).filter_by(email=in_email).first()
        if (user and user.check_password(in_passwd)):
            token = generate_normal_token(user)
            
            return sendResponse(
                data={
                    "token": token,
                    "role_id": user.role_id
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

def resetToken(request):
    try:
        in_email= request.json['email']

        if (not validate_email(in_email)):
            return invalid_email
        
        user = db.session.query(User).filter_by(email=in_email).first()

        if (not user):
            return user_inexistant
        
        token = generate_reset_token(user)
        send_reset_token(user.email,token)

        return sendResponse(data=None,message="Token sent to email")
    except Exception as e:
        return sendErrorMessage(
            message=str(e)
        )

def verifyResetToken(token):

    if isBlacklisted(token):
        return jsonify({'Message': 'Token has expired (blacklist)'}), 403

    try:
        data = decode_token(token)
    except jwt.ExpiredSignatureError:
        return jsonify({'Message': 'Token has expired'}), 403
    except jwt.InvalidTokenError:
        return jsonify({'Message': 'Invalid token'}), 403
    
    if (not data['reset']):
        return jsonify({'Message': 'Invalid Reset token'}), 403
    
    return sendResponse(
        
        data={
            "token": token,
            "role_id": data['user']['role_id']
        },
        message='Token Verified Successfully'
    )
    
def reset_password(request):
    #needs to be decorated with token_required
    
    try:
        password = request.json['password']
        token = extract_token(request)
        user_id = decode_token(token)['user']['id']

        if (not password or not user_id):
            return empty_password_id

        user = db.session.query(User).filter_by(id=user_id).first()

        if (not user):
            return user_inexistant
        
        user.set_hashed_password(password)

        db.session.commit()

        return sendResponse(
            data={
                "token": token,
                "role_id": user.role_id
            },
            message='Password Changed successfully'
        )

    except Exception as e:
        return sendErrorMessage(
            message=str(e)
        )


