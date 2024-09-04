#! /bin/bash

cd "$(dirname "$0")" || exit
export NODE_OPTIONS=--max_old_space_size=4096
echo Updating source...
git submodule update --init --recursive
git pull --recurse-submodules  && git submodule update --recursive
echo Stopping services... \(docker\)
sudo systemctl stop docker
echo Installing npm packages...
sudo npm install
echo Building Angular application...
ng build --configuration=production
echo \(Re\)starting services...
sudo systemctl restart docker merkas merkas-web
