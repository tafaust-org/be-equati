#!/bin/sh

docker run -d \
  --name postgres-contract \
	-p 7777:5432 \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=contract \
  postgres:14
