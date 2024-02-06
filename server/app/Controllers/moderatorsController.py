from Models.models import *
import sys
from Controllers.baseController import *
from Utils import *

def getmoderators():
    try:
        mods = db.session.query(Moderator).all()
        
        
        
        result = [mod.toJSON() for mod in mods]
        
        return response(
            OK,
            data={
                "mods": result
            }
        )
    
    except Exception as e:
        return error(INTERNAL_ERROR)

def deleteModerators(request):
    mods = request.json['mods']
    
    if not mods:
        return error(EMPTY_FIELD)
    
    try:
        
        results = db.session.query(Moderator).filter(Moderator.user_id in mods).all()
        
        for mod in results:
            db.session.delete(mod)
        
        return getmoderators()
        
    except Exception as e:
        return error(INTERNAL_ERROR)

def modifyMod(request):
    name = request.json['name']
    phone = request.json['phone']
    address = request.json['address']
    
    id = decode_token(extract_token(request))['user']['id']
    
    
    if (not name ) and (not phone) and (not address):
        return error(EMPTY_FIELD)
    
    try:
        mod = db.session.query(Moderator).filter_by(user_id=id).first()
        
        if (not mod):
            return error(RESSOURCE_DOESNT_EXIST)
        
        mod.name = name
        mod.phone = phone
        mod.address = address
        
        db.session.commit()
        
        return response(
            OK,
            data=mod.toJSON()
        )
    except Exception as e:
        return error(INTERNAL_ERROR)