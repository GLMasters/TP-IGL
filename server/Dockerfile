FROM python:latest

RUN apt update -y && apt upgrade -y

COPY app/requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip install -r requirements.txt

COPY app /app

RUN chmod +x launch.sh


# TODO: create www-data user and run the app with it


CMD [ "./launch.sh" ]