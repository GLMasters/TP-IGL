from Models.models import Favorite, db, User
from Utils import *
from Controllers.baseController import *

def getFavorits(request):

    try:

        token = decode_token( extract_token(request) )

        if (not verify_user(token) ):
            return error(RESSOURCE_DOESNT_EXIST)
        
        id = token['user']['id']
        favorits = db.session.query(Favorite).filter_by(user_id=id).all()

        return response(
            OK,
            data={
                "id": id,
                "favorits": favorits
            },
        )
    
    except:
        return error(INTERNAL_ERROR)

def addFavorit(request):
    try:

        article_id = request.json['article_id']

        if not article_id:
            return error(EMPTY_FIELD)

        token = decode_token( extract_token(request) )
        user = verify_user(token)

        if (not user):
            return error(RESSOURCE_DOESNT_EXIST)

        new_fav = Favorite(
            user_id=user.id,
            article_id=article_id
        )

        db.session.add(new_fav)
        db.session.commit()

        return response(
            OK,
            data={
                "user_id": user.id,
                "article_id":  article_id
            }
        )

    
    except:
        return error(INTERNAL_ERROR)

def removeFavorit(request):
    try:

        article_id = request.json['article_id']

        if not article_id:
            return error(EMPTY_FIELD)

        token = decode_token( extract_token(request) )
        user = verify_user(token)

        if (not user):
            return error(RESSOURCE_DOESNT_EXIST)
        
        fav = db.session.query(Favorite).filter_by(id=article_id).first()

        if (not fav):
            return error(RESSOURCE_DOESNT_EXIST)
        
        db.session.delete(fav)
        db.session.commit()
    
    except:
        return error(INTERNAL_ERROR)