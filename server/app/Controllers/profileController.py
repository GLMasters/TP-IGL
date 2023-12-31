from Utils import extract_token, decode_token
from Controllers.baseController import sendErrorMessage, sendResponse
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



    