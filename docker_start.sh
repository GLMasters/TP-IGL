#!/bin/bash

if [ "$(id -u)" -eq 0 ]; then

    # making this file executable
    chmod 755 server/app/launch.sh

    # container start
    docker-compose up --build -d

    chown -R oussama:oussama certs/

else
    echo "You need to run this script using sudo."
fi