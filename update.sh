#! /bin/bash

export NODE_OPTIONS=--max_old_space_size=4096
systemctl stop docker httpd mongod
ng build --configuration=production
cp ./dist/merkas-web /var/www/html
systemctl start docker httpd mongod
