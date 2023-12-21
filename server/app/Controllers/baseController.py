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