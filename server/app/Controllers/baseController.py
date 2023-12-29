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

empty_creds = sendErrorMessage("Email or password empty")
user_exists = sendErrorMessage ("Email already exists")
failed_auth = sendErrorMessage ("Wrong crendentials")
invalid_email = sendErrorMessage(message= "Invalid email")
empty_code_id=sendErrorMessage("id or code not set")
wrong_id=sendErrorMessage("id doesn't exist")
invalid_code=sendErrorMessage("Invalid code")

