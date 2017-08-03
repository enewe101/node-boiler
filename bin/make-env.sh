#!/bin/sh
passgen () {
	date +%s | sha256sum | base64 | head -c 32 ; echo
}

# Get the path to this script (regardless of current working dir).
SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"

# Source .env in the root of the app, based on relative location to this script
source $SCRIPTPATH/../.env.dev

# Create all the environment varialbes, using values from .env for non-secret 
# stuff and generating random strings for passwords.
my_env='export PROJ_NAME='$PROJ_NAME'
export USE_SSL=1
export APP_DB_USER='$APP_DB_USER'
export APP_DB_PASS='`passgen`'
export HOST='$HOST'
export HOST_USER='$HOST_USER'
export HOST_USER_PASS='`passgen`'
export MONGO_INITDB_ROOT_USERNAME='$MONGO_INITDB_ROOT_USERNAME'
export MONGO_INITDB_ROOT_PASSWORD='`passgen`

# Encrypt using gpg.
echo "$my_env" | gpg -co .env.prod.gpg
