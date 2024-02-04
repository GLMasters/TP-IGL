from Utils import extract_token, decode_token
from Controllers.baseController import *
from Models.models import db
from Utils import verify_user

def getProfileInfo(request):
    try:
        token = decode_token(extract_token(request))

        user= verify_user(token)
        if (not user):
            return error(RESSOURCE_DOESNT_EXIST)
        
        return response(
            OK,
            data= {
                "id": user.id,
                "role_id": user.role_id,
                "email": user.email
            },
        )

    except :
        error(INTERNAL_ERROR)

def changePasswordFunction(request):

    try:
        
        token = decode_token(extract_token(request))
        import sys
        print(token,file=sys.stderr)

        oldPassword = request.json['old_password']
        newPassword = request.json['new_password']
        
        if (not oldPassword or not newPassword):
            return error(EMPTY_FIELD)

        user = verify_user(token)
        
        if (not user):
            return error(RESSOURCE_DOESNT_EXIST)


        if ( not user.check_password(oldPassword)):
            return error(INVALID_CREDS)

        user.set_hashed_password(newPassword)

        db.session.commit()

        return response(
            OK,
            data=user.toJSON()
        )
    
    except Exception as e:
        import sys
        print(e,file=sys.stderr)
        return error(INTERNAL_ERROR)