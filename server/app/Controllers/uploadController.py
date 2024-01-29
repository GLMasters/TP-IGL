
from config import *
import requests
from Controllers.baseController import *  
import os
from Models.models import * 
from Utils import *

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

            return response(
                OK,
                data=article.toJSON()
            ) 
        except:
            return error(INTERNAL_ERROR)
    else:
        return error(INVALID_URL)