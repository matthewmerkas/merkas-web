#! /bin/bash

cd "$(dirname "$0")" || exit
export NODE_OPTIONS=--max_old_space_size=4096
echo Updating source...
git pull
echo Stopping services... \(docker, apache, mongo\)
sudo systemctl stop docker httpd mongod
echo Installing npm packages...
npm install
echo Building Angular application...
ng build --configuration=production
echo Copying static files...
sudo rm -rf /var/www/html
sudo cp -r ./dist/merkas-web /var/www/html
echo Starting services...
sudo systemctl restart merkas
sudo systemctl start docker httpd mongod
