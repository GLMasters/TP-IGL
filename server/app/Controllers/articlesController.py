
from config import *
import requests
from Controllers.baseController import *
from Controllers.elasticController import *
import os
from Models.models import * 
from Utils import *
import sys
import subprocess
import time

def test():
    pass

def uploadFileFromUser(request):
    if 'file' not in request.files:
        return error(EMPTY_FIELD)
    
    file = request.files['file']
    
    if file.filename == '':
        return error(EMPTY_FIELD)
    
    if not file:
        return error(EMPTY_FIELD)
    
    tmp_file_path = TEMP_FOLDER+ gen_random_file_name(20) +".pdf"
    
    try:
        
        file.save(tmp_file_path)
        extracted_text = extract_text_from_pdf(tmp_file_path)
        
        article = organize(extracted_text)            
        
        res = addDoc(article.toJSON(), "articles")
        
        # add check
        final_file_path = UPLOADS_FOLDER + res['_id'] + ".pdf"
        
        article.set_id(res['_id'])
        article.set_url(final_file_path)
        
        command = ['mv', tmp_file_path, final_file_path]
        
        result = subprocess.run(command)
        
        if result.returncode == 0:
            return response(
                OK,
                data={
                    "article_id": res['_id']
                }
            )
        else:
            raise Exception("couldn't copy file to dest")
        
    except Exception as e:
        print(e)
        return error(INTERNAL_ERROR)
    
def uploadFileFromUrl(request) :
    in_url = request.json['url']
    if (not in_url):
        return error(EMPTY_FIELD)
    tmp_file_path = TEMP_FOLDER+ gen_random_file_name(20) +".pdf"
    res = requests.get(in_url)
    
    if res.status_code == 200:
        
        save_file(tmp_file_path,res.content)
                
        try:
            extracted_text = extract_text_from_pdf(tmp_file_path)
            
            article = organize(extracted_text)
            
            
            res = addDoc(article.toJSON(), "articles")
            
            # add check
            final_file_path = UPLOADS_FOLDER + res['_id'] + ".pdf"
            
            article.set_id(res['_id'])
            article.set_url(final_file_path)
            
            command = ['mv', tmp_file_path, final_file_path]
            
            result = subprocess.run(command)
            
            if result.returncode == 0:
                return response(
                    OK,
                    data={
                        "article_id": res['_id']
                    }
                )
            else:
                raise Exception("couldn't copy file to dest")
            
        except Exception as e:
            print(e,file=sys.stderr)
            return error(INTERNAL_ERROR)
    else:
        return error(INVALID_URL)

def getAllArticles(approved):
    
    body = {
        "query": {
            "bool": {
                "must": {
                    "match": {      
                        "approved": approved
                    }
                }
            }
        }
    }
    
    try :
        res = searchDocs("articles", body=body)
    
        return response(
            OK,
            data={
                "articles": fitArticles(res['hits']['hits'])
            }
        ) 
    
    except Exception as e:
        print(e, file=sys.stderr)
        return error(INTERNAL_ERROR)

def approveArticle(article_id):
    
    try:
        res = getDoc(article_id,"articles")
        
        if not res['found']:
            return error(RESSOURCE_DOESNT_EXIST)
        
        document = res["_source"]
        document['approved'] = True
        
        res = updateDoc(res['_id'],'articles',document)
        
        if (res['result']!= "updated"):
            raise Exception("update failed")
        
        
        return res['_id']
            
    except Exception as e:
        print(e, file=sys.stderr)
        return -1
    
def approveArticles(request):
    articles = request.json['articles']
    
    
    if not articles :
        return error(EMPTY_FIELD)
    
    try:
        for article_id in articles:
            approveArticle(article_id)
        
    except Exception as e:
        return error(INTERNAL_ERROR)

    # result = articles
    
    # while (len(result)==len(articles)):
        
    time.sleep(3)
    result = getAllArticles(False)['data']['articles']
    
    
    return response(
        OK,
        data={
            "articles": result
        }
    )
 
def deleteArticle(id):
    try:
        res = deleteDoc(id,"articles")
        
        
    except Exception as e:
        print(e,file=sys.stderr)
        
def deleteArticles(request):
    articles = request.json['articles']
    
    
    if not articles :
        return error(EMPTY_FIELD)
    
    try:
        for article_id in articles:
            deleteArticle(article_id)
        
    except Exception as e:
        return error(INTERNAL_ERROR)
    
    time.sleep(3)

    result = getAllArticles(False)['data']['articles']
    
    
    return response(
        OK,
        data={
            "articles": result
        }
    )
    
def getArticleById(id):
    
    if not id :
        return error(EMPTY_FIELD)
    
    try: 
        res = getDoc(id,index="articles")
        
        if (not res['found']):
            return error(RESSOURCE_DOESNT_EXIST)
        
        if (not res['_source']['approved']):
            return error(RESSOURCE_DOESNT_EXIST)
        
        article = Article(
            res['_source']['title'],
            res['_source']['summary'],
            res['_source']['authors'],
            res['_source']['institutions'],
            res['_source']['keywords'],
            "empty",
            res['_source']['references']
        )
        
        article.set_id(res['_id'])
        article.set_url(APP_URL+"/api/pdf/"+res['_id'])
        article.set_approved(True)
        
        
        return response(
            OK,
            data=article.toJSON()
            
        )
        
        
    except Exception as e:
        print(e, file=sys.stderr)
        return error(INTERNAL_ERROR)