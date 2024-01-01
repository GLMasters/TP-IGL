#!/bin/bash

if [ "$(id -u)" -eq 0 ]; then

    ./init_db.sh
    ./docker_start.sh -d
    
    [ -d esdata ] || mkdir esdata

    docker cp es01:/usr/share/elasticsearch/config/certs/ca/ca.crt esdata/http_ca.crt && \
        docker cp esdata/http_ca.crt server:/http_ca.crt

    chmod -R 755 esdata
else
    echo "You need to run this script using sudo."
fi