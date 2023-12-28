#!/bin/bash

if [ "$(id -u)" -eq 0 ]; then

    ./init_db.sh
    ./docker_start.sh
    
else
    echo "You need to run this script using sudo."
fi