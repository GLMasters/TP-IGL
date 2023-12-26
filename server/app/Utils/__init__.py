import jwt

from datetime import datetime
from Models.models import Token, db

from config import SECRET_KEY


def delete_expired_tokens():
    pass

def isBlacklisted(token):
    tokens = [str(i) for i in db.session.query(Token).all()]

    return (token in tokens)

def removeExpiredTokens():
    tokens = db.session.query(Token).all()

    for token in tokens:
        try:
            jwt.decode(str(token), SECRET_KEY , algorithms="HS256")
        
        except jwt.ExpiredSignatureError:
            db.session.delete(token)
            db.session.commit()
            

def blacklistToken(token):
    if (not isBlacklisted(token)):
        token = Token( token=token )
        db.session.add(token)
        db.session.commit()