# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.8.0
ARG API_PORT=3001

FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV development
ENV BUILD_VERSION docker

WORKDIR /usr/src/app

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

COPY . .

EXPOSE ${API_PORT}

CMD npm run start:api
