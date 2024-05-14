#! /bin/bash

git pull
export NODE_OPTIONS=--max_old_space_size=4096
sudo systemctl stop docker httpd mongod
npm install
ng build --configuration=production
sudo rm -rf /var/www/html
sudo cp -r ./dist/merkas-web /var/www/html
sudo systemctl start docker httpd mongod
