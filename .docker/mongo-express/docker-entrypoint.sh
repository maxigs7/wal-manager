#!/bin/bash
set -eo pipefail

# This is a very small modification of the original docker script taken from
# https://github.com/mongo-express/mongo-express-docker/blob/master/docker-entrypoint.sh
# with only change being the modified value of max_tries=20 instead of original 5,
# to give the main mongodb container enough time to start and be connectable to.
# Also, see https://docs.docker.com/compose/startup-order/

# if command does not start with mongo-express, run the command instead of the entrypoint
if [ "${1}" != "mongo-express" ]; then
    exec "$@"
fi

function wait_tcp_port {
    local host="$1" port="$2"
    local max_tries=20 tries=1

    # see http://tldp.org/LDP/abs/html/devref1.html for description of this syntax.
    while ! exec 6<>/dev/tcp/$host/$port && [[ $tries -lt $max_tries ]]; do
        sleep 10s
        tries=$(( tries + 1 ))
        echo "$(date) retrying to connect to $host:$port ($tries/$max_tries)"
    done
    exec 6>&-
}

# if ME_CONFIG_MONGODB_SERVER has a comma in it, we're pointing to a replica set (https://github.com/mongo-express/mongo-express-docker/issues/21)
if [[ "$ME_CONFIG_MONGODB_SERVER" != *,* ]]; then
    # wait for the mongo server to be available
    echo Waiting for ${ME_CONFIG_MONGODB_SERVER}:${ME_CONFIG_MONGODB_PORT:-27017}...
    wait_tcp_port "${ME_CONFIG_MONGODB_SERVER}" "${ME_CONFIG_MONGODB_PORT:-27017}"
fi

# run mongo-express
exec node app