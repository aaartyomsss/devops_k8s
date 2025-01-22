#!/bin/bash

# Check if a variable is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <tag>"
    exit 1
fi

TAG=$1

# Define the Docker repository name
DOCKER_REPO="aaartyoms"

echo "Building Docker images... with tag $TAG"
docker build -f ./ping-pong/Dockerfile ./ping-pong -t "$DOCKER_REPO/ping-pong:$TAG"
docker build -f ./logger/writer/Dockerfile ./logger/writer -t "$DOCKER_REPO/logger-writer:$TAG"
docker build -f ./logger/reader/Dockerfile ./logger/reader -t "$DOCKER_REPO/logger-reader:$TAG"

echo "Pushing Docker images..."
docker push "$DOCKER_REPO/ping-pong:$TAG"
docker push "$DOCKER_REPO/logger-writer:$TAG"
docker push "$DOCKER_REPO/logger-reader:$TAG"