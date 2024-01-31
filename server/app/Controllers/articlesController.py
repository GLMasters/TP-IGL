from Controllers.baseController import *
from Controllers.elasticController import *
from config import *

def getArticlebyId(request):
    id = request.json['id']
    
    if not id:
        return error(EMPTY_FIELD)
    
    try:
        res = getDoc(id, "articles")
        
        if not res['found']:
            return error(RESSOURCE_DOESNT_EXIST)
        
        return response(
            OK,
            data=res['_source']
        )
    
    except:
        return error(INTERNAL_ERROR)

def searchArticle(request):
    keywords = request.json['keywords']
    
    if not keywords:
        return error(EMPTY_FIELD)
    try:
        query = {
            "bool": {
                "must": [
                    {
                        "multi_match": {
                            "query": " ".join(keywords),
                            "fields": ["_all"]
                        }
                    },
                    {
                        "term": {
                            "approved": True
                        }
                    }
                ]
            }
        }
        
        res = search("articles",query)
    
        return response(
            OK,
            data=res
        )
    except:
        return error(INTERNAL_ERROR)

