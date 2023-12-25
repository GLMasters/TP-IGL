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

empty = sendErrorMessage("Email or password empty")
user_exists = sendErrorMessage ("Email already exists")
failed_auth = sendErrorMessage ("Wrong crendentials")
# token_missing = jsonify({'Alert!': 'Token is missing!'})
invalid_email = sendErrorMessage(message= "Invalid email")
