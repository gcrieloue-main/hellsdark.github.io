#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cp -r dist/** ..

cd ../
git add -A
git commit -m 'deploy'
git push origin master

cd src