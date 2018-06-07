#!/bin/bash
cd /repo/build/configs/generate
./generate.sh generate_api
./generate.sh generate_mage2nosql
sed -i "s/'/\"/g" /repo/api/config/local.json
# set xterm, nano
export TERM=xterm
export EDITOR=nano
# start all the services
/usr/bin/supervisord  -n -c /etc/supervisord.conf
