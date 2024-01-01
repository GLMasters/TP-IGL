#!/bin/bash

if [ "$(id -u)" -eq 0 ]; then

    ./init_db.sh
    ./docker_start.sh
    
    [ -d esdata ] || mkdir esdata && chmod -R 755 esdata 

    docker cp es01:/usr/share/elasticsearch/config/certs/ca/ca.crt esdata/http_ca.crt

    
else
    echo "You need to run this script using sudo."
fi