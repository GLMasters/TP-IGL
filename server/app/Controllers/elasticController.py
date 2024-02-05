from elasticsearch import Elasticsearch
from config import *
from Models.models import *


# Create the client instance
client = Elasticsearch(
    "https://es01:9200",
    ca_certs="/certs/ca/ca.crt",
    basic_auth=("elastic", "password")
) 


def addDoc(doc,index):
    res = client.index(index=index,document=doc)
    
    return res

def getDoc(id, index):
    res = client.get(id=id, index=index)
    return res

def deleteDoc(id, index):
    res = client.delete(id=id, index=index)
    return res

def updateDoc(id, index,document):
    res = client.update(id=id, index=index,doc=document)
    return res

def searchDocs(index,body):
    res = client.search(index=index, body=body)
    return res


def getById(id):
    
    res = getDoc(id,index="articles")
            
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
    
    
    return article.toJSON()
