import ssl
import smtplib
import jwt
from flask import jsonify,request
from functools import wraps
from pdftitle import get_title_from_file
from Models.models import Token, db, TempUser, User
from time import time
from datetime import timedelta, datetime
from config import *
import re
from PyPDF2  import PdfReader
from Models.models import *

# token functions
def generate_normal_token(user):
    token = jwt.encode(
        {
            'user': user.toJSON(),
            'reset': False,
            'exp': datetime.utcnow() + timedelta(hours=TOKEN_EXPIRATION_TIME)
        }, SECRET_KEY, 
        
        algorithm='HS256'
    )
    
    return token

def generate_reset_token(user):
    token = jwt.encode(
        {
            'user': user.toJSON(),
            'reset': True,
            'exp': datetime.utcnow() + timedelta(hours=TOKEN_EXPIRATION_TIME)
        }, SECRET_KEY, 
        
        algorithm='HS256'
    )
    
    return token

def decode_token(token):
    return jwt.decode(token, SECRET_KEY , algorithms="HS256")

def extract_token(request):
    token = request.headers.get('Authorization')

    if not token:
        return None

    # Check if the token starts with 'Bearer ' and extract the token
    if 'Bearer ' in token:
        token = token.split('Bearer ')[1]
        return token
    
    return None

def verify_user(token):
    user = db.session.query(User).filter_by(id=token['user']['id'])
    
    if not user:
        blacklistToken(token)
    
    return user

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = extract_token(request)

        if not token:
            return jsonify({'Alert!': 'Token is missing!'}), 401
        
        if isBlacklisted(token):
            return jsonify({'Message': 'Token has expired (blacklist)'}), 403

        try:
            data = decode_token(token)
        except jwt.ExpiredSignatureError:
            return jsonify({'Message': 'Token has expired'}), 403
        except jwt.InvalidTokenError:
            return jsonify({'Message': 'Invalid token'}), 403

        return f(*args, **kwargs)

    return decorated


def token_required_forAdmin(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = extract_token(request)

        if not token:
            return jsonify({'Alert!': 'Token is missing!'}), 401
        
        if isBlacklisted(token):
            return jsonify({'Message': 'Token has expired (blacklist)'}), 403

        try:
            data = decode_token(token)
            role_id = data.get('user', {}).get('role_id')  
        except jwt.ExpiredSignatureError:
            return jsonify({'Message': 'Token has expired'}), 403
        except jwt.InvalidTokenError:
            return jsonify({'Message': 'Invalid token'}), 403

        if role_id != 2:
            return jsonify({'Message': 'Insufficient privileges (admin required)'  }), 403  

        return f(*args, **kwargs)

    return decorated

def isBlacklisted(token):
    tokens = [str(i) for i in db.session.query(Token).all()]

    return (token in tokens)

def blacklistToken(token):
    if (not isBlacklisted(token)):
        token = Token( token=token )
        db.session.add(token)
        db.session.commit()

def delete_blacklist_tokens():
    tokens = db.session.query(Token).all()
    for token in tokens:
        db.session.delete(token)
        db.session.commit()


# verif codes functions

def delete_old_verif_codes():
    tmp_users = db.session.query(TempUser).all()
    for tmp_user in tmp_users:
        if (time() - tmp_user.creation_timestamp.timestamp() > timedelta(minutes=CODE_EXPIRATION_TIME).total_seconds()):
            db.session.delete(tmp_user)
            db.session.commit()

def send_mail(mail,message):
    port = 587  # For starttls
    smtp_server = "smtp.gmail.com"
    sender_email = EMAIL
    receiver_email = mail
    email_password = EMAIL_PASSWORD

    context = ssl.create_default_context()
    with smtplib.SMTP(smtp_server, port) as server:
        server.ehlo()  # Can be omitted
        server.starttls(context=context)
        server.ehlo()  # Can be omitted
        server.login(sender_email, email_password)
        server.sendmail(sender_email, receiver_email, message)

def send_verif_code(mail,code):
    message = CODE_EMAIL_TEMPLATE.format(code)
    send_mail(mail,message)

def send_reset_token(mail,token):
    print(APP_URL)
    print(SECRET_KEY)
    message = TOKEN_EMAIL_TEMPLATE.format(APP_URL+"/api/auth/reset/"+token)
    send_mail(mail,message)

# extraction functions
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
  