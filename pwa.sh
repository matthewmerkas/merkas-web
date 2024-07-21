#! /bin/bash

cd "$(dirname "$0")" || exit
ng build --configuration=production --optimization
npx http-server -p 4300 -c-1 dist/merkas-web/browser
