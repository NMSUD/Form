# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.8.0
FROM node:${NODE_VERSION}-bullseye-slim as builder

WORKDIR /usr/src/app

ARG ENV_FILE=.env
COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY index.html ./
COPY src ./src
COPY public ./public
COPY $ENV_FILE ./.env
RUN npm ci
RUN npm run build
# RUN npm prune --production

FROM gcr.io/distroless/nodejs20-debian12

COPY --from=builder /usr/src/app/build ./nmsudForm
COPY --from=builder /usr/src/app/dist ./nmsudForm/public
COPY --from=builder /usr/src/app/*.json ./nmsudForm
COPY --from=builder /usr/src/app/node_modules ./nmsudForm/node_modules

ARG BUILD_VERSION=???
ARG API_PORT=3001
EXPOSE ${API_PORT}
ENV NODE_ENV=production
ENV BUILD_VERSION=$BUILD_VERSION
CMD ["./nmsudForm/src/api/api.js" ]