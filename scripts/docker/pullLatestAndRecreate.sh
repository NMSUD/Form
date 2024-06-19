#!/bin/bash

ENV_FILE="./.env"
if [ -f "$ENV_FILE" ]; then
    export $(grep -v '^#' $ENV_FILE | xargs -d '\r')
else
    echo ".env file does not exist"
    exit
fi

echo "registry: $DOCKER_REGISTRY"
echo "tag name: $DOCKER_TAG_NAME"

# ----------------------------------------------------------------------

docker pull $DOCKER_REGISTRY/$DOCKER_TAG_NAME:latest

docker compose up -d --force-recreate
