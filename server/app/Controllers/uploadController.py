import re
from flask import jsonify, request
from config import *
import requests
from Controllers.baseController import *  
from urllib.parse import urlparse, parse_qs
from PyPDF2  import PdfReader
import os
from pdftitle import get_title_from_file
from Models.models import * 

    
def extract_text_from_pdf(pdf_path):
    text = ''
    with open(pdf_path, 'rb') as file:
        pdf_reader = PdfReader(file)
        num_pages = len(pdf_reader.pages)
        for page_num in range(num_pages):
            page = pdf_reader.pages[page_num]
            text += page.extract_text()
        return text
    #here the extraction is finish --------------

def resume_processing(body):
    # treatment of resume ----
    end_reusme_index = body.find(".  \n")
    if end_reusme_index == -1 :
        end_reusme_index = body.find(". \n")
    if end_reusme_index == -1 :
        end_reusme_index = body.find(".\n")
    resume = body[:end_reusme_index]
    #delete the first and last line
    resume_lines = resume.split('\n')
    resume = ' '.join(resume_lines)
    return resume , end_reusme_index

def institutions_authors_processing(header):
    authors = []
    institutions = []
    headerLines = header.split('\n')
    authors.append(headerLines[0].strip())
    institution = ""
    for i in range(1 , len(headerLines)) : 
        line = headerLines[i]
        if '@' in line:
            institutions.append(institution)
            institution = ""
            for j in range(len(line)):
                if line[j].isupper():
                    authors.append(line[j:])
                    break
        else :
            institution += " "+line

    return institutions, authors    
            
def keywords_processing(body):
    keywords_pattern = re.compile(r'Keywords\s*', re.IGNORECASE)
    keywords_match = keywords_pattern.search(body)
    if keywords_match:
        keywords_index = keywords_match.end()
    else:
        return ""
    keywords_section = body[keywords_index:].strip()
    end_keywords_index = keywords_section.find("\n")
    keywords_section = keywords_section[:end_keywords_index].strip()
    return keywords_section

def devideText(extracted_text , filePath , url):
    title = get_title_from_file(filePath)

    abstract_pattern = re.compile(re.escape("Abstract").replace(" ", "\\s*"), re.IGNORECASE)
    abstract_match = abstract_pattern.search(extracted_text)
    abstract_index = 0
    if abstract_match:
        abstract_index = abstract_match.end()   

    references_pattern = re.compile(r'References\s*', re.IGNORECASE)
    references_match = references_pattern.search(extracted_text)
    references_index = 0
    if references_match:
        references_index = references_match.end()

    header = extracted_text[:abstract_index].strip()
    body = extracted_text[abstract_index:references_index].strip()
    references = extracted_text[references_index:].strip()

    header_lines = header.split('\n')
    # detection of title
    for i in range(len(header_lines)):
        line = header_lines[i].strip()
        if line == title:
            header = '\n'.join(header_lines[i+1:]).strip()
        if i < len(header_lines) - 1:
            header_lines[i + 1] = line + ' ' + header_lines[i + 1]
    
    institutions , authors = institutions_authors_processing(header)

    resume , end_resume_index = resume_processing(body=body) 
    body = body[end_resume_index : ]   

    keywords_section = keywords_processing(body)
    body = body.replace(keywords_section , "")
    
    # return Sections(header=header, body=body , title=title , references=references  , authors=authors , institutions=institutions , keywords=keywords_section.split(','))
    return Article(summary=resume , title= title , authors=authors , institutions=institutions, keywords=keywords_section.split(',') , references=references, content=body , url =url )
            

    

def uploadFileFromUrl(request) :
    in_url = request.json['url']
    if (not in_url):
        return empty_url
    local_file_path = UPLOADS_FOLDER+"file.pdf"
    response = requests.get(in_url)
    if response.status_code == 200:
        with open(local_file_path, "wb") as fichier_local:
            fichier_local.write(response.content)
        try:
            link = UPLOADS_FOLDER+"file.pdf"
            extracted_text = extract_text_from_pdf(link)
            article = devideText (extracted_text , link , in_url )
            return article.toJSON()
        except Exception as e:
            return (str(e))
    else:
        return "Échec du téléchargement du fichier PDF depuis le serveur", 500
    
