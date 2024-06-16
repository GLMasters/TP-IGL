#!/bin/bash
if [ "$(id -u)" -eq 0 ]; then
    /bin/bash docker_stop.sh && /bin/bash docker_start.sh
else
    echo "You need to run this script using sudo."
fi