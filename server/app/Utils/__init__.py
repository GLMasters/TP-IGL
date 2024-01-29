import ssl
import smtplib
import jwt
import json
from flask import jsonify,request
from functools import wraps
from Models.models import Token, db, TempUser, User
from time import time
from datetime import timedelta, datetime
from config import *
import re
from PyPDF2  import PdfReader
from Models.models import *
from openai import OpenAI
from string import ascii_letters, digits
import random


client = OpenAI(api_key="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")

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

#misc

def save_file(path, content):
    with open(path, "wb") as fichier_local:
        fichier_local.write(content)

def gen_random_file_name(length):
    return "".join([random.choice(ascii_letters+digits) for i in range(length)])

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

def organize(text):
    part1 = get_first_infos(text[:4000])
    references = get_references(text)
    
    dict = json.loads(part1)
    
    result = Article(title=dict['title'], summary=dict['abstract'], authors=dict['authors'], institutions=dict["institutions"], keywords=dict['keywords'], content=text, references=references,url="")

    return result
def get_first_infos(text):
    
    response = client.chat.completions.create(
    model="gpt-3.5-turbo",
        messages= [   
            {"role": "system", "content": '''\
Extract these information from this text in json format: title as a string, authors names in a list, institutions names in a list, Abstract, keywords as a list. here is the format: {"title": "","authors": [], "institutions": [], "abstract": "", "keywords":[]}
''' + text
            }
        ]
        
    )
    
    return response.choices[0].message.content

def get_references(text):
    
    references_pattern = re.compile(r'References\s*', re.IGNORECASE)
    references_match = references_pattern.search(text)
    references_index = 0
    if references_match:
        references_index = references_match.end()
    
    references = text[references_index:]
    
    return references  