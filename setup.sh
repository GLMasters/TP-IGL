#!/bin/bash

if [ "$(id -u)" -eq 0 ]; then

    ./init_db.sh
    ./docker_start.sh -d
    
    # [ -d esdata ] || mkdir esdata

    chmod -R 755 certs  
else
    echo "You need to run this script using sudo."
fi