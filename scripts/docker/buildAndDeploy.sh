#!/bin/bash

echo -n "Supply .env suffix e.g. '.prod'. If left empty, .env will be loaded: "
read envSuffix

ENV_FILE="./.env${envSuffix}"
if [ -f "$ENV_FILE" ]; then
    # export $(grep -v '^#' $ENV_FILE | xargs)
    export $(grep -v '^#' $ENV_FILE | xargs -d '\r')
else
    echo ".env file does not exist"
    exit
fi

version=$(cat package.json | grep \"version\" | cut -d'"' -f 4)

echo "env: $ENV_FILE"
echo "version: $version"
echo "api port: $API_PORT"
echo "registry: $DOCKER_REGISTRY"
echo "tag name: $DOCKER_TAG_NAME"

# ----------------------------------------------------------------------

docker build \
    -t $DOCKER_TAG_NAME -f ./scripts/docker/api.Dockerfile \
    --build-arg BUILD_VERSION=$version \
    --build-arg API_PORT=$API_PORT \
    --build-arg ENV_FILE=$ENV_FILE \
    --no-cache .

# ----------------------- Tag and push to remote -----------------------
echo -n "Tag and push to registry? [y/n]: "
read shouldTagAndPush

if [ $shouldTagAndPush != "y" ]; then
    echo "Nothing has been tagged or pushed"
    exit;
fi

echo -n "Log into registry with username and password? [y/n]: "
read shouldLogIntoDocker
if [ $shouldLogIntoDocker != "y" ]; then
    docker login $DOCKER_REGISTRY -u $DOCKER_USERNAME -p $DOCKER_PASSWORD
fi

docker tag $DOCKER_TAG_NAME $DOCKER_REGISTRY/$DOCKER_TAG_NAME:$version
docker tag $DOCKER_TAG_NAME $DOCKER_REGISTRY/$DOCKER_TAG_NAME:latest

docker push $DOCKER_REGISTRY/$DOCKER_TAG_NAME:$version
docker push $DOCKER_REGISTRY/$DOCKER_TAG_NAME:latest
