#!/bin/bash
npm run build
DEPLOY_PATH='../osa4_blogiserveri/build'
rm -rf "$DEPLOY_PATH"
cp -R build "$DEPLOY_PATH"


