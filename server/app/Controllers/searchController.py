from Controllers.elasticController import *

def general_search(request):
    
    keywords = request.json['keywords']
    
    obj = {
        
    }
    
    
    arr = [ {"multi_match":{"query": k, "fields":["*"]}} for k in keywords]
    
    body = {
        "query": {
            "bool": {
                "should": arr
            }
        }
    }

    searchDocs("articles",body)

def search_title():
    
    pass