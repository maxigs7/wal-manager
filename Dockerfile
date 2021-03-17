## Stage 1 (base)
# This gets our dependencies installed and out of the way
FROM node:14.16.0-alpine as base

WORKDIR /usr

COPY package*.json ./

# we use npm ci here so only the package-lock.json file is used
RUN npm ci \
    && npm cache clean --force

#### DEVELOPMENT

## Stage 2 (development)
# we don't COPY in this stage because for dev you'll bind-mount anyway
# this saves time when building locally for dev via docker-compose
FROM base as dev

WORKDIR /usr

RUN npm install --only=development

ENV NODE_ENV=development
ENV PATH=/usr/node_modules/.bin:$PATH

WORKDIR /usr/app

EXPOSE 3000

CMD ["next", "dev"]

#### PRODUCTION

## Stage 3 (Build)
FROM base as build

RUN npm install --only=development

# Copy in the rest of the project
# (include node_modules in a .dockerignore file)
WORKDIR /usr/app

ENV PATH=/usr/node_modules/.bin:$PATH

COPY . .

RUN ["next", "build"]

## Stage 4 (Production)
FROM base as prod

ENV NODE_ENV=production
ENV PATH=/usr/node_modules/.bin:$PATH

WORKDIR /usr/app

# Get the built application from the first stage
COPY --from=build /usr/app/.next .next

EXPOSE 3000

CMD ["next", "start"]

