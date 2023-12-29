import ssl
import smtplib
import jwt
from Models.models import Token, db, TempUser
from time import time
from datetime import timedelta
from config import *

def isBlacklisted(token):
    tokens = [str(i) for i in db.session.query(Token).all()]

    return (token in tokens)

def blacklistToken(token):
    if (not isBlacklisted(token)):
        token = Token( token=token )
        db.session.add(token)
        db.session.commit()

def delete_expired_tokens():
    tokens = db.session.query(Token).all()
    for token in tokens:
        try:
            jwt.decode(str(token), SECRET_KEY , algorithms="HS256")
        except jwt.ExpiredSignatureError:
                db.session.delete(token)
                db.session.commit()

def delete_old_verif_codes():
    tmp_users = db.session.query(TempUser).all()
    for tmp_user in tmp_users:
        if (time() - tmp_user.creation_timestamp.timestamp() > timedelta(minutes=CODE_EXPIRATION_TIME).total_seconds()):
            db.session.delete(tmp_user)
            db.session.commit()

def send_verif_code(mail,code):
    port = 587  # For starttls
    smtp_server = "smtp.gmail.com"
    sender_email = EMAIL
    receiver_email = mail
    email_password = EMAIL_PASSWORD

    message = EMAIL_TEMPLATE.format(code)

    context = ssl.create_default_context()
    with smtplib.SMTP(smtp_server, port) as server:
        server.ehlo()  # Can be omitted
        server.starttls(context=context)
        server.ehlo()  # Can be omitted
        server.login(sender_email, email_password)
        server.sendmail(sender_email, receiver_email, message)