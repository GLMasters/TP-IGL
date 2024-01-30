#!/bin/bash

if [ "$(id -u)" -eq 0 ]; then

    # creating dirs for volumes
    [ -d certs ] || mkdir certs 
    [ -d data/esdata01 ] || mkdir data/esdata01 && [ -d data/kibanadata ] || mkdir data/kibanadata
    [ -d data/db/mysql_data ] || mkdir -p data/db/mysql_data
    
    rm -rf data/esdata01/*
    rm -rf data/db/mysql_data/*

    chown -R f100w:f100w .

    echo "All data cleaned"

else
    echo "You need to run this script using sudo."
fi