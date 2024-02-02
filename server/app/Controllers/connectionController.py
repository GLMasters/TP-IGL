from Controllers.baseController import *
import jwt
from datetime import datetime
from validate_email_address import validate_email

from Utils import *
from Models.models import *

from config import *
from random import randint

def is_valid_email(email):
    
    is_valid_domain = validate_email(email, verify=True)
    
    return is_valid_domain

def registerFunction(request):
    try: 
        in_email = request.json['email']
        in_passwd = request.json['password']
        if (not in_email or not in_passwd):
            return error(EMPTY_FIELD)
        
        if (not is_valid_email(in_email)):
           return error(INVALID_INPUT)

        user = db.session.query(User).filter_by(email=in_email).first()
        if (not user == None):
            return error(RESSOURCE_EXISTS)
        
        code = randint(10000,99999)
        
        user = db.session.query(TempUser).filter_by(email=in_email).first()
        
        if user:
            user.code = code
            user.set_password(in_passwd)
            user.creation_timestamp = datetime.now()
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

            
        return response(OK, data=user.toJSON())
    
    except Exception as e :
        print(e, file=sys.stderr)
        return error(INTERNAL_ERROR)

def confirmEmail(request):
    try:
        id = request.json['id']
        code = request.json['code']
        print(f"id={id} & code={code}",file=sys.stderr)

        if ((not id) or (not code)):
            print(f"id={id} & code={code}",file=sys.stderr)
            return error(EMPTY_FIELD)
        

        tmp_user = db.session.query(TempUser).filter_by(id=id).one()

        if (not tmp_user):
            return error(RESSOURCE_DOESNT_EXIST)
        
        if (tmp_user.code != code):
            return error(INVALID_INPUT)
        
        new_user = User(
            email=tmp_user.email,
            role_id = 1
        )

        new_user.set_password(tmp_user.password)

        db.session.add(new_user)
        db.session.commit()

        db.session.delete(tmp_user)
        db.session.commit()

        return response(OK,data=new_user.toJSON())
    
    except :
        return error(INTERNAL_ERROR)

def loginFunction (request):
    try: 
        in_email = request.json['email']
        in_passwd = request.json['password']
        if (not in_email or not in_passwd):
            return error(EMPTY_FIELD)
        
        user =  db.session.query(User).filter_by(email=in_email).first()
        if (user and user.check_password(in_passwd)):
            token = generate_normal_token(user)
            
            return response(
                OK ,
                data={
                    "token": token,
                    "role_id": user.role_id
                } 
            )

        else :
            return error(INVALID_CREDS)
    
    except :
        return error(INTERNAL_ERROR)
    
def logoutFunction(request):
    try:
        token = request.headers.get('Authorization').split('Bearer ')[1]

        blacklistToken(token)

        return response(OK)
    
    except :
        return error(INTERNAL_ERROR)

def resetToken(request):
    try:
        in_email= request.json['email']

        if (not validate_email(in_email)):
            return error(EMPTY_FIELD)
        
        user = db.session.query(User).filter_by(email=in_email).first()

        if (not user):
            return error(RESSOURCE_DOESNT_EXIST)
        
        token = generate_reset_token(user)
        send_reset_token(user.email,token)

        return response(OK)
    
    except :
        return error(INTERNAL_ERROR)

def verifyResetToken(token):

    if isBlacklisted(token):
        return error(EXPIRED_TOKEN)

    try:
        data = decode_token(token)
    except jwt.ExpiredSignatureError:
        return error(EXPIRED_TOKEN)
    except jwt.InvalidTokenError:
        return error(INVALID_TOKEN)
    
    if (not data['reset']):
        return error(INVALID_TOKEN)
    
    return response(
        OK,
        data={
            "token": token,
            "role_id": data['user']['role_id']
        }
    )
    
def reset_password(request):
    #needs to be decorated with token_required
    
    try:
        password = request.json['password']
        token = extract_token(request)
        user_id = decode_token(token)['user']['id']
        
        if (not password or not user_id):
            return error(EMPTY_FIELD)

        if (not token['reset']):
            return error(INVALID_TOKEN)
        

        user = db.session.query(User).filter_by(id=user_id).first()

        if (not user):
            return error(RESSOURCE_DOESNT_EXIST)
        
        user.set_hashed_password(password)

        
        db.session.commit()

        token = generate_normal_token(user)
        
        return response(
            OK,
            data={
                "token": token,
                "role_id": user.role_id
            }
        )

    except :
        return error(INTERNAL_ERROR)
    
def addmoderator(request):
    try: 
        in_email = request.json['email']
        in_passwd = request.json['password']
        if (not in_email or not in_passwd):
            return error(EMPTY_FIELD)
        if (not is_valid_email(in_email)):
           return error(INVALID_INPUT)

        user = db.session.query(User).filter_by(email=in_email).first()
        if (not user == None):
            return error(RESSOURCE_EXISTS)
        
        new_user = User(
            email=in_email,
            role_id = 2 #the third role is for a moderator
        )
        new_user.set_hashed_password(in_passwd)

        db.session.add(new_user)
        db.session.commit()

        return response(
            OK,
            data=new_user.toJSON()
        )
            
    except :
        return error(INTERNAL_ERROR)
