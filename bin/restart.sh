#!/bin/sh
#
#   Restarts node in the node container (by asking pm2 to restart node).
#
docker exec -it my_node_1 bash -c 'bash --init-file <(\
	echo "pm2 kill; pm2 start config/ecosystem.config.json; echo Restarted. Ctrl-D to exit to host"\
)'

