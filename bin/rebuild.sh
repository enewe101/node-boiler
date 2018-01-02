#!/bin/sh
#
#   Goes into the node docker container and runs the npm command to trigger
#	rebuilding of the client code (html, js bundle, and css bundle).
#
docker exec -it ${DOCKER_NAME}_node_1 bash -c 'bash --init-file <(\
	echo "npm run dev-build; echo End of rebuild script. Ctrl-D to exit to host"\
)'

