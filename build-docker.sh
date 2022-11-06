#!/usr/bin/env sh
IMAGE_NAME=${1:-be-game}
IMAGE_VERSION=$(jq -r '.version' package.json)
docker build -t "${IMAGE_NAME}:latest" .
docker tag "${IMAGE_NAME}:latest" "${IMAGE_NAME}:${IMAGE_VERSION}"
