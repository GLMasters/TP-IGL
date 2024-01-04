import ssl
import smtplib
import jwt
from flask import jsonify,request
from functools import wraps

from Models.models import Token, db, TempUser, User
from time import time
from datetime import timedelta, datetime
from config import *

# token functions
def generate_normal_token(user):
    token = jwt.encode(
        {
            'user': user.toJSON(),
            'reset': False,
            'exp': datetime.utcnow() + timedelta(hours=TOKEN_EXPIRATION_TIME)
        }, SECRET_KEY, 
        
        algorithm='HS256'
    )
    
    return token

def generate_reset_token(user):
    token = jwt.encode(
        {
            'user': user.toJSON(),
            'reset': True,
            'exp': datetime.utcnow() + timedelta(hours=TOKEN_EXPIRATION_TIME)
        }, SECRET_KEY, 
        
        algorithm='HS256'
    )
    
    return token

def decode_token(token):
    return jwt.decode(token, SECRET_KEY , algorithms="HS256")

def extract_token(request):
    token = request.headers.get('Authorization')

    if not token:
        return None

    # Check if the token starts with 'Bearer ' and extract the token
    if 'Bearer ' in token:
        token = token.split('Bearer ')[1]
        return token
    
    return None

def verify_user(token):
    user = db.session.query(User).filter_by(id=token['user']['id'])
    
    if not user:
        blacklistToken(token)
    
    return user

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = extract_token(request)

        if not token:
            return jsonify({'Alert!': 'Token is missing!'}), 401
        
        if isBlacklisted(token):
            return jsonify({'Message': 'Token has expired (blacklist)'}), 403

        try:
            data = decode_token(token)
        except jwt.ExpiredSignatureError:
            return jsonify({'Message': 'Token has expired'}), 403
        except jwt.InvalidTokenError:
            return jsonify({'Message': 'Invalid token'}), 403

        return f(*args, **kwargs)

    return decorated

def isBlacklisted(token):
    tokens = [str(i) for i in db.session.query(Token).all()]

    return (token in tokens)

def blacklistToken(token):
    if (not isBlacklisted(token)):
        token = Token( token=token )
        db.session.add(token)
        db.session.commit()

def delete_blacklist_tokens():
    tokens = db.session.query(Token).all()
    for token in tokens:
        db.session.delete(token)
        db.session.commit()


# verif codes functions

def delete_old_verif_codes():
    tmp_users = db.session.query(TempUser).all()
    for tmp_user in tmp_users:
        if (time() - tmp_user.creation_timestamp.timestamp() > timedelta(minutes=CODE_EXPIRATION_TIME).total_seconds()):
            db.session.delete(tmp_user)
            db.session.commit()

def send_mail(mail,message):
    port = 587  # For starttls
    smtp_server = "smtp.gmail.com"
    sender_email = EMAIL
    receiver_email = mail
    email_password = EMAIL_PASSWORD

    context = ssl.create_default_context()
    with smtplib.SMTP(smtp_server, port) as server:
        server.ehlo()  # Can be omitted
        server.starttls(context=context)
        server.ehlo()  # Can be omitted
        server.login(sender_email, email_password)
        server.sendmail(sender_email, receiver_email, message)

def send_verif_code(mail,code):
    message = CODE_EMAIL_TEMPLATE.format(code)
    send_mail(mail,message)

def send_reset_token(mail,token):
    print(APP_URL)
    print(SECRET_KEY)
    message = TOKEN_EMAIL_TEMPLATE.format(APP_URL+"/api/auth/reset/"+token)
    send_mail(mail,message)