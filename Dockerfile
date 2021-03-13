## Stage 1 (production base)
# This gets our prod dependencies installed and out of the way
FROM node:14.16.0-alpine as base

ARG DATABASE_COLLECTION_NAME
ENV DATABASE_COLLECTION_NAME=$DATABASE_COLLECTION_NAME

ARG DATABASE_NAME
ENV DATABASE_NAME=$DATABASE_NAME

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

ARG PORT
ENV PORT=$PORT

WORKDIR /app

COPY package*.json ./

# we use npm ci here so only the package-lock.json file is used
RUN npm ci \
    && npm cache clean --force

## Stage 2 (development)
# we don't COPY in this stage because for dev you'll bind-mount anyway
# this saves time when building locally for dev via docker-compose
FROM base as dev

ENV NODE_ENV=development

WORKDIR /app

RUN npm install --only=development

EXPOSE 3000

CMD ["./node_modules/.bin/next", "dev"]

## Stage 3 (copy in source for prod)
# This gets our source code into builder
# this stage starts from the first one and skips dev
FROM base as prod

WORKDIR /app

COPY . .

CMD ["./node_modules/.bin/next", "build"]
