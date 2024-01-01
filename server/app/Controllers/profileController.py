from Utils import extract_token, decode_token
from Controllers.baseController import *
from Models.models import User, db

def getProfileInfo(request):
    try:
        token = decode_token(extract_token(request))

        id = token['user']['id']
        
        user = db.session.query(User).filter_by(id=id).first()

        if (not user):
            pass

        return sendResponse(
            data= {
                "id": user.id,
                "role_id": user.role_id,
                "email": user.email
            },

            message="User info fetched succesfully"
        )
    except Exception as e:

        return sendErrorMessage(
            message=str(e)
        )

def changePasswordFunction(request):

    try:
    
        id = request.json['id']
        oldPassword = request.json['old_password']
        newPassword = request.json['new_password']
        
        if (not id or not oldPassword or not newPassword):
            pass

        user = db.session.query(User).filter_by(id=id).first()

        if (not user):
            return user_inexistant

        tmp = User()
        tmp.set_hashed_password(newPassword)

        if (tmp.password != user.password):
            return wrong_pw
            

        user.set_hashed_password(newPassword)

        db.session.commit()

        return sendResponse(
            data=user.toJSON(),
            message="Password changed succesfuly"
        )
    
    except Exception as e:

        return sendErrorMessage(
            message=str(e)
        )





    