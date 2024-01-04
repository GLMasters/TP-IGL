def response(status,data=None):
    if not data:
        return {
            'result': True ,
            'status': status
        }
    else:
        return {
            'result': True,
            'status': status,
            'data': data
        }

def error(status):
    return {
        'result': False,
        'status': status
    }

OK=1
EMPTY_FIELD=100
RESSOURCE_EXISTS=101
RESSOURCE_DOESNT_EXIST=102
INVALID_INPUT=103
INVALID_CREDS=104

INVALID_TOKEN=200
EXPIRED_TOKEN=201

INTERNAL_ERROR=500