#! /bin/sh

ENV_FILE=./.env
if [ -f "$ENV_FILE" ]; then
    export $(grep -v '^#' $ENV_FILE | xargs)
else
    echo ".env file does not exist"
    exit
fi

version=$(cat package.json | grep \"version\" | cut -d'"' -f 4)

echo "version: $version"
echo "api port: $API_PORT"
echo "registry: $DOCKER_REGISTRY/$DOCKER_TAG_NAME"

# ----------------------------------------------------------------------

docker build \
    -t $DOCKER_TAG_NAME \
    -f ./docker/api.Dockerfile \
    --build-arg BUILD_VERSION=$version \
    --build-arg API_PORT=$API_PORT \
    --no-cache .

# ----------------------- Tag and push to remote -----------------------
echo -n "Tag and push to registry? [y/n] "
read shouldTagAndPush

if [ $shouldTagAndPush != "y" ]; then
    echo "Nothing has been tagged or pushed"
    exit;
fi

docker tag $DOCKER_TAG_NAME $DOCKER_REGISTRY/$DOCKER_TAG_NAME:$version
docker tag $DOCKER_TAG_NAME $DOCKER_REGISTRY/$DOCKER_TAG_NAME:latest

docker push $DOCKER_REGISTRY/$DOCKER_TAG_NAME:$version
docker push $DOCKER_REGISTRY/$DOCKER_TAG_NAME:latest
