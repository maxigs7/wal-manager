## Stage 1 (base)
# This gets our dependencies installed and out of the way
FROM node:14.16.0-alpine as base

ENV NODE_ENV=production
ENV PATH=/usr/node_modules/.bin:$PATH

WORKDIR /usr

COPY ./backend/package*.json ./

# we use npm ci here so only the package-lock.json file is used
RUN npm ci \
    && npm cache clean --force

#### DEVELOPMENT

## Stage 2 (development)
# we don't COPY in this stage because for dev you'll bind-mount anyway
# this saves time when building locally for dev via docker-compose
FROM base as dev

RUN npm install --only=development

ENV NODE_ENV=development
ENV PATH=/usr/node_modules/.bin:$PATH

WORKDIR /usr/app

EXPOSE 2500

CMD ["nodemon", "--config", "nodemon-debug.json"]

#### PRODUCTION

FROM base as prod

ENV NODE_ENV=production
ENV PATH=/usr/app/node_modules/.bin:$PATH

WORKDIR /usr/app

COPY ./backend .

EXPOSE 3000

CMD ["node", "dist/main"]

