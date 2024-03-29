from os import getenv
from dotenv import load_dotenv

load_dotenv()
MYSQL_USER = getenv("MYSQL_USER")
MYSQL_PASSWORD= getenv("MYSQL_PASSWORD")
MYSQL_DATABASE= getenv("MYSQL_DATABASE")
MYSQL_PORT= getenv("MYSQL_PORT")
SECRET_KEY = getenv("SECRET_KEY")
MYSQL_CONTAINER_NAME = getenv("MYSQL_CONTAINER_NAME")
MYSQL_PORT=getenv("MYSQL_PORT")
ELASTIC_PASSWORD=getenv("ELASTIC_PASSWORD")


APP_URL=getenv("APP_URL")
UPLOADS_FOLDER = getenv("UPLOADS_FOLDER")
TEMP_FOLDER = getenv("TEMP_FOLDER")

OPENAI_API_KEY= getenv("OPENAI_API_KEY")


TOKEN_EXPIRATION_TIME=10
REMOVE_TOKENS_INTERVAL=10

CODE_EXPIRATION_TIME=60
CODE_REMOVAL_INTERVAL=15

EMAIL=getenv("EMAIL")
EMAIL_PASSWORD=getenv("EMAIL_PASSWORD")

CODE_EMAIL_TEMPLATE="""\
Subject: Doclib - Code de Verification

Le code d'activation de votre email est: {}

Merci
"""

TOKEN_EMAIL_TEMPLATE="""\
Subject: Doclib - Lien de reinitialisation de mot de passe

Veuillez suivre le lien ci dessous pour reinitialiser votre mote de passe.

Lien: {}

Merci
"""