from Models.models import Favorit, db, User
from Utils import *
from baseController import *

def getFavorits(request):

    try:

        token = decode_token( extract_token(request) )

        if (not verify_user(token) ):
            return user_inexistant
        
        id = token['user']['id']
        favorits = db.session.query(Favorit).filter_by(user_id=id).all()

        return sendResponse(
            data= {
                "id": id,
                "favorits": favorits
            },
            message="favorits fetched successfully"
        )
    
    except Exception as e :
        return sendErrorMessage(
            message=str(e)
        )

def addFavorit(request):
    try:

        article_id = request.json['article_id']

        if not article_id:
            pass

        token = decode_token( extract_token(request) )
        user = db.session.query(User).filter_by(id=token['user']['id'])

        if not user:
            pass

        new_fav = Favorit(
            user_id=user.id,
            article_id=article_id
        )

        db.session.add(new_fav)
        db.session.commit()

        return sendResponse(
            data={
                "user_id": user.id,
                "article_id":  article_id
            },
            message="Article added to fav list"
        )

    
    except Exception as e :
        return sendErrorMessage(
            message=str(e)
        )

def removeFavorit(request):
    pass