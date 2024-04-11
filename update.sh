#! /bin/bash

export NODE_OPTIONS=--max_old_space_size=4096
systemctl stop docker httpd mongod
ng build --configuration=production
systemctl start docker httpd mongod
