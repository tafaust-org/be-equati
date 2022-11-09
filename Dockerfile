#ARG BUILD_IMAGE=node:18.9-alpine
ARG PROD_IMAGE=node:18.9-alpine
#FROM $BUILD_IMAGE AS builder
#ENV YARN_CACHE_FOLDER ".yarn/cache"
#WORKDIR /build
#COPY . .
#RUN --mount=type=bind,source=/.yarn/cache,target=/build/.yarn/cache,rw yarn ci && yarn build

FROM $PROD_IMAGE AS prod

ENV NODE_ENV="production"
ENV APP_PORT="${APP_PORT:-8080}"
ENV USER="node"
ENV GROUP="node"

RUN apk add --no-cache --update tini

WORKDIR /app

# copy .yarn/ from builder to prod target
#COPY --chown="$USER:$GROUP" ./.yarn             ./.yarn/
#COPY --chown="$USER:$GROUP" ./.yarn/cache       ./.yarn/cache
#COPY --chown="$USER:$GROUP" ./.yarn/plugins     ./.yarn/plugins
#COPY --chown="$USER:$GROUP" ./.yarn/releases    ./.yarn/releases
#COPY --chown="$USER:$GROUP" ./.yarn/unplugged   ./.yarn/unplugged

# copy dist/ from builder to prod target
#COPY --chown="$USER:$GROUP" --from=builder /build/dist              ./dist

# copy package.json, src and entrypoint script from builder to prod target
#COPY --chown="$USER:$GROUP" ./package.json                          ./package.json
#COPY --chown="$USER:$GROUP" ./.pnp.cjs                              ./.pnp.cjs
#COPY --chown="$USER:$GROUP" ./.pnp.loader.mjs                       ./.pnp.loader.mjs
#COPY --chown="$USER:$GROUP" ./.yarnrc.yml                           ./.yarnrc.yaml
#COPY --chown="$USER:$GROUP" ./yarn.lock                             ./yarn.lock
#COPY --chown="$USER:$GROUP" ./src                                   ./src
#COPY --chown="$USER:$GROUP" ./docker-entrypoint.sh                  /sbin/docker-entrypoint.sh

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn

RUN yarn workspaces focus --all --production
RUN yarn ci

COPY . .

RUN yarn build
RUN chmod +x ./docker-entrypoint.sh


EXPOSE $APP_PORT

ENTRYPOINT [ "/sbin/tini", "--", "./docker-entrypoint.sh" ]

USER $USER
CMD [ "node", "./dist/main" ]
#CMD [ "node", "-r", "./.pnp.cjs", "./dist/main" ]
