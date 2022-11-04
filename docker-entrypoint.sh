#!/usr/bin/env sh
set -e

# NOTE:
# 1) In case the database is not up, we hard fail here and rely on the docker restart policy.
# 2) Never do automatic calls with destructive actions. These should virtually never be invoked. There are cases
#    where manual intervention is needed but only if all the data has been backed up before.

# run typeorm migrations
yarn run migration:up
# show migrations (will return non-zero exit code if a migration was not run)
yarn run typeorm migration:show

#rm -rf .yarn

exec "$@"
