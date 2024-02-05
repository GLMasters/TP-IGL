from Models.models import *
import sys
from Controllers.baseController import *

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
        print(e,file=sys.stderr)
    