#!/usr/bin/env bash
#
#   Start the production environment.  Builds and runs two containers:
#   1) a node server running under pm2 supervisor with nginx reverse-proxy
#   2) a mongodb instance
#
#   The mongodb instance uses a volume so changes are persisted after you stop
#   the containers.
#
#   Use Ctrl-C to stop the containers.
#
#   If something happens and the containers aren't starting properly,
#   Try running using the ``--force-recreate`` option, i.e. do
#       ``docker-compose -f docker-compose-production.yml up --force-recreate``
#   As a last resort, try killing, removing all containers, volumes, and images,
#   and then run this script.
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
# need to set some environment variables, including secrets.
if [ "$ENV_MODE" = "dev" ]; then
    source .env.dev
	source .keys.dev
else
	if [ "$ENV_MODE" = "stage" ]; then
		source .env.dev
		source .keys.dev
		export HOST=$STAGE_HOST
	else
		source <(gpg -d .env.prod.gpg)
		source <(gpg -d .keys.prod.gpg)
		export HOST=$PROD_HOST
	fi
fi

# Based on what environment we're in (production, staging, development), we
# need to set the mapping for the app's code and we need to fill in a variable
# in the nginx configuration.  We also want to export the environment to an
# environment variable that node and node-based libraries are looking for.
if [ "$ENV_MODE" = "prod" ]; then
   export NODE_ENV=production
   export APP_VOLUME_MAPPING=../dummy:/dummy
else
   if [ "$ENV_MODE" = "stage" ]; then
	   export NODE_ENV=staging
	   export APP_VOLUME_MAPPING=..:/app
   else
	   export NODE_ENV=development
	   export APP_VOLUME_MAPPING=..:/app
   fi
fi

# Fill the hostname (domain) into the nginx config so internal redirects work
if [ "$ENV_MODE" = "dev" ]; then
	export CERT_PATH=/app/cert/
else
	export CERT_PATH=/etc/letsencrypt/live/$HOST/;
fi
$SCRIPTPATH/bin/fill_template.py $SCRIPTPATH/config/nginx-config-template cert_path=$CERT_PATH server_name=$HOST > $SCRIPTPATH/config/nginx-config 

# Verify that environment varibles, needed by app services, are set.
MISSED=0
#if [ -z "$PROJ_NAME" ]; then echo "Need to set PROJ_NAME." && MISSED=1; fi
if [ -z "$USE_SSL" ]; then echo "Need to set USE_SSL." && MISSED=1; fi
#if [ -z "$CERT_PATH" ]; then echo "Need to set CERT_PATH." && MISSED=1; fi
if [ -z "$APP_DB_USER" ]; then echo "Need to set APP_DB_USER." && MISSED=1; fi
if [ -z "$APP_DB_PASS" ]; then echo "Need to set APP_DB_PASS." && MISSED=1; fi
if [ -z "$HOST" ]; then echo "Need to set HOST." && MISSED=1; fi
if [ -z "$MONGO_INITDB_ROOT_USERNAME" ]; then 
	echo "Need to set MONGO_INITDB_ROOT_USERNAME." && MISSED=1;
fi
if [ -z "$MONGO_INITDB_ROOT_PASSWORD" ]; then 
	echo "Need to set MONGO_INITDB_ROOT_PASSWORD." && MISSED=1;
fi
if [ $MISSED -eq 1 ]; then exit 1; fi

# Notify whether SSL being used; if yes, ensure certificate-related files exist.
#if [ -z $USE_SSL ] || [ $USE_SSL -eq 0 ]; then
#    echo "NO SSL"
#else
#    echo "Using SSL"
#    CERT_PATH=$SCRIPTPATH/cert
#    if [ ! -f $CERT_PATH/dhparam.pem ]; then
#         echo "SSL: expected $CERT_PATH/dhparam.pem"; exit 1; fi
#    if [ ! -f $CERT_PATH/fullchain.pem ]; then
#        echo "SSL: expected $CERT_PATH/fullchain.pem"; exit 1; fi
#    if [ ! -f $CERT_PATH/privkey.pem ]; then
#        echo "SSL: expected $CERT_PATH/privkey.pem"; exit 1; fi
#fi

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
docker-compose -p mern -f docker/docker-compose.yml up $ARGS 2> .build-err
