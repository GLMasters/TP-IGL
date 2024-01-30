
from config import *
import requests
from Controllers.baseController import *
from Controllers.elasticController import *
import os
from Models.models import * 
from Utils import *
import sys
import subprocess

def test():
    pass

def uploadFileFromUser(request):
    pass

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
            print(e)
            return error(INTERNAL_ERROR)
    else:
        return error(INVALID_URL)