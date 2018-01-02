#!/usr/bin/env bash
#
#   Builds and runs a docker container, whithin which it starts up a node
#   server under pm2 supervisor.
#
#   Use Ctrl-C to stop the containers.
#
#   After the first build, the docker image is retained, so subsequent runs
#   will not rebuild the docker, but just start a new container from the image.
#	If you need to rebuild the docker use the `--force-recreate`. 
#	
#	To remove all containers, images, volumes without rebuilding do
#	`bin/docker-rm`
#

# Get the path to this script (regardless of current working dir).
SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"

# Was the --prod flag set? (remove it from the args if so.)
ARGS=""; ENV_MODE=dev
for var in "$@"; do test "$var" != '--prod' && ARGS="$ARGS $var" || ENV_MODE=prod; done
ARGS=$(echo "$ARGS" | xargs)    # Trim whatespace around variables

# Was the --stage flag set? (remove it from the args if so.)
OLD_ARGS=$ARGS; ARGS=""
for var in $OLD_ARGS; do test "$var" != '--stage' && ARGS="$ARGS $var" || ENV_MODE=stage; done
ARGS=$(echo "$ARGS" | xargs)    # Trim whatespace around variables

# Was the --dev flag set? (remove it from the args if so.)
OLD_ARGS=$ARGS; ARGS=""
for var in $OLD_ARGS; do test "$var" != '--dev' && ARGS="$ARGS $var" || ENV_MODE=dev; done
ARGS=$(echo "$ARGS" | xargs)    # Trim whatespace around variables

# Based on what environment we're in (production, staging, development), we
# need to set some environment variables, including secrets, as well as the
# mapping for the app's code.  In production we don't map the code, so that the
# running app can't be tampered with from outside the docker (hence mapping a
# dummy directory instead).
case "$ENV_MODE" in
	dev)
		source .env
		source .keys
		export NODE_ENV=development
		export APP_VOLUME_MAPPING=..:/app
		;;
	stage)
		source <(gpg -d .env.gpg)
		source <(gpg -d .keys.gpg)
		export HOST=$STAGE_HOST
		export NODE_ENV=staging
		export APP_VOLUME_MAPPING=..:/app
		;;
	prod)
		source <(gpg -d .env.gpg)
		source <(gpg -d .keys.gpg)
		export HOST=$PROD_HOST
		export NODE_ENV=production
		export APP_VOLUME_MAPPING=../dummy:/dummy
		;;
esac


# Verify that environment varibles, needed by app services, are set.
MISSED=0
#if [ -z "$PROJ_NAME" ]; then echo "Need to set PROJ_NAME." && MISSED=1; fi
#if [ -z "$CERT_PATH" ]; then echo "Need to set CERT_PATH." && MISSED=1; fi
if [ -z "$APP_DB_USER" ]; then echo "Need to set APP_DB_USER." && MISSED=1; fi
if [ -z "$APP_DB_PASS" ]; then echo "Need to set APP_DB_PASS." && MISSED=1; fi
if [ -z "$HOST" ]; then echo "Need to set HOST." && MISSED=1; fi
if [ $MISSED -eq 1 ]; then exit 1; fi


# Figure out if --force-recreate was included as an arg.  If so, remove all
# images, volumes, and containers
for var in "$ARGS"; do 
    if [ "$var" = "--force-recreate" ]; then
        echo "removing images, volumes, and containers"
        bin/docker-rm &> /dev/null
    fi
done


# Now call docker-compose, and pass through all the arguments
echo 'starting dockers...'
docker-compose -p $DOCKER_NAME -f docker/docker-compose.yml up $ARGS 2> .build-err
