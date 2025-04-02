#!/bin/sh

BASE_DIR=/Users/bean/Development/bboobboo/client
SERVER_PATH=ubuntu@158.180.92.33
APP_PATH=/app/todo/client

cd BASE_DIR
npm run build:dev
rsync -avh $BASE_DIR/dist/* $SERVER_PATH:$APP_PATH -e "ssh -i ~/Development/key/ssh-key-2024-11-26.key"
