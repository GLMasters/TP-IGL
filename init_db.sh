#!/bin/bash

if [ "$(id -u)" -eq 0 ]; then
    rm -rf db/mysql_data
    mkdir db/mysql_data

else
    echo "You need to run this script using sudo."
fi