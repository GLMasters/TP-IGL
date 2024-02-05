from Controllers.elasticController import *
from Controllers.baseController import *
from Utils import *

def general_search(request):
    
    keywords = request.json['keywords']
    
    arr = [ {"multi_match":{"query": k, "fields":["*"]}} for k in keywords]
    
    body = {
        
        "query": {
            "bool": {
                "should": arr
            }
        }
    }

    res = searchDocs("articles",body)
    
    return response(
        OK,
        data={
            "articles": fitArticles(res['hits']['hits'])
        }
    )