from Models.models import Token, db
from config import SECRET_KEY

def isBlacklisted(token):
    tokens = [str(i) for i in db.session.query(Token).all()]

    return (token in tokens)

def blacklistToken(token):
    if (not isBlacklisted(token)):
        token = Token( token=token )
        db.session.add(token)
        db.session.commit()