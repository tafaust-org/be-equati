#!/bin/sh

docker run -d \
  --name postgres-game \
	-p 5454:5432 \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=game \
  postgres:14
