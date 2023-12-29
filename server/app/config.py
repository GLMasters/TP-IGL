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

TOKEN_EXPIRATION_TIME=10
REMOVE_TOKENS_INTERVAL=10

CODE_EXPIRATION_TIME=60
CODE_REMOVAL_INTERVAL=15

EMAIL="ls_djerrai@esi.dz"
EMAIL_PASSWORD="D586A938495BF"

EMAIL_TEMPLATE="""\
Subject: Doclib - Code de Verification

Le code d'activation de votre email est: {}

Merci
"""