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
        
        # mods = db.session.query(Moderator).filter(Moderator.id in mods).all()
        moderators = db.session.query(Moderator).all()
        
        print(mods,file=sys.stderr)
        for md in mods:
            if (md.id in moderators):
                user = db.session.query(User).filter_by(id=md.user_id).first()
                
                db.session.delete(md)
                db.session.commit()
                
                db.session.delete(user)
                db.session.commit()

        
        
        return getmoderators()
        
    except Exception as e:
        print(e,file=sys.stderr)
        return error(INTERNAL_ERROR)

def modifyMod(request):
    
    
    try:
        name = request.json['name']
        id = request.json['id']
        
        phone = request.json['phone']
        address = request.json['address']
    
        if ((not name ) and (not phone) and (not address)):
            return error(EMPTY_FIELD)
        
        mod = db.session.query(Moderator).filter_by(id=id).first()
        
        print(mod.toJSON(),file=sys.stderr)
        
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
        print(e,file=sys.stderr)
        return error(INTERNAL_ERROR)