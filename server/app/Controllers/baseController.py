from flask import jsonify


def sendResponse(data, message):
    return {
        'result': True,
        'data': data,
        'message': message
    }
    

def sendErrorMessage(message): #add error status
    return {
        'result': False,
        'message': message
    }

empty_creds = sendErrorMessage("Email ou Mot de passe Vide")
user_exists = sendErrorMessage ("Compte déja existant")
failed_auth = sendErrorMessage ("Email ou Mot de Passe Incorrect")
invalid_email = sendErrorMessage(message= "Email invalid")
empty_code_id=sendErrorMessage("id or code not set")
wrong_id=sendErrorMessage("id doesn't exist")
invalid_code=sendErrorMessage("Invalid code")

