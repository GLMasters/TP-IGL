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

