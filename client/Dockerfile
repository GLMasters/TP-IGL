FROM node:lts

RUN apt update -y && apt upgrade -y

COPY . /client

WORKDIR /client

ENTRYPOINT [ "./entrypoint.sh" ]