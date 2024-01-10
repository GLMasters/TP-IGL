
from config import *
import requests
from Controllers.baseController import *  
import os
from Models.models import * 
from Utils import *

def test():
    pass


def uploadFileFromUrl(request) :
    in_url = request.json['url']
    if (not in_url):
        return error(EMPTY_FIELD)
    local_file_path = UPLOADS_FOLDER+"file.pdf"
    res = requests.get(in_url)
    if res.status_code == 200:
        with open(local_file_path, "wb") as fichier_local:
            fichier_local.write(res.content)
        try:
            link = UPLOADS_FOLDER+"file.pdf"
            extracted_text = extract_text_from_pdf(link)
            article = devideText (extracted_text , link , in_url )
            return response(
                OK,
                data=article.toJSON()
            ) 
        except:
            return error(INTERNAL_ERROR)
    else:
        return error(INVALID_URL)