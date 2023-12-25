from flask import jsonify


def sendResponse(data, message):
    return {
        'result': True,
        'data': data,
        'message': message
    }
    

def sendErrorMessage(message):
    return {
        'result': False,
        'message': message
    }

empty = sendErrorMessage("Email or password empty")
user_exists = sendErrorMessage ("Email has already exists")
failed_auth = sendErrorMessage ("Unable to verify user, verify your crendentials")
token_missing = jsonify({'Alert!': 'Token is missing!'}), 401
invalid_email = sendErrorMessage(message= "invalid email, please verify your email")
