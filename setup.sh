#!/bin/bash

if [ "$(id -u)" -eq 0 ]; then

    # creating dirs for volumes
    [ -d certs ] || mkdir certs 
    [ -d data/esdata01 ] || mkdir data/esdata01 && [ -d data/kibanadata ] || mkdir data/kibanadata
    [ -d data/db/mysql_data ] || mkdir -p data/db/mysql_data

    # ajust max vm size of the system
    sysctl -w vm.max_map_count=262144

    # creating mysql network
    docker network create mysql_network
    docker network create es


    # changing permissions (use your actual username)
    chown -R f100w:f100w .
    
    echo "Setup finished, you may want to run docker_start.sh"



else
    echo "You need to run this script using sudo."
fi