from app import session
from Controllers.baseController import *
from flask import request

def registerFunction (db, request, Utilisateur):
    try: 
        in_email = request.json['email']
        #user = Utilisateur.query.filter_by(email=in_email).first()
        print("connexion done to db")
        #if (user"" == None):
        new_user = Utilisateur(
            email=in_email,
            password = "1234", 
            role_id = 1,
        )
        db.session.add(new_user)
        db.session.commit()
        session['user'] = new_user.id #use cookies
        session.permanent = True
        return sendResponse(
            data=new_user.toJSON(),
                essage='Account created successfully'
        )
        #else :
            #return sendErrorMessage(
            # message="Email has already exist")
    except Exception as e:
        return sendErrorMessage(
            message=str(e)
        )


def loginFunction (db, request, Utilisateur):
    try: 
        in_email = request.json['email']
        in_passwd = request.json['password']
        user = Utilisateur.query.filter_by(email=in_email).first()
        print("connexion done to db")
        if (user == None):
            new_user = Utilisateur(
                email=in_email,
                password = in_passwd,
                role_id = 1,
            )
            db.session.add(new_user)
            db.session.commit()
            session['user'] = user.id
            session.permanent = True
            return sendResponse(
                data="login done",
                message='Account created successfully'
            )
        else :
            return sendErrorMessage(
             message="Email has already exist")
    except Exception as e:
        return sendErrorMessage(
            message=str(e)
        )