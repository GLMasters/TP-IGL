#!/bin/bash

if [ "$(id -u)" -eq 0 ]; then

    # changing the max container size of the system
    sysctl -w vm.max_map_count=262144

    # creating the elastic network
    docker network create elastic

    docker network create mysql_network

    # building the image
    docker-compose up --build #-d

    echo "You can connect to kibana using your credentials here: http://0.0.0.0:5601/"
    echo "You might need to wait a little bit for the containers to start .."

else
    echo "You need to run this script using sudo."
fi
