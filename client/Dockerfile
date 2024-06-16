FROM node:latest

RUN apt update -y && apt upgrade -y

RUN apt install -y curl

COPY . /app

WORKDIR /app

RUN chmod +x ./entrypoint.sh

ENTRYPOINT [ "./entrypoint.sh" ]