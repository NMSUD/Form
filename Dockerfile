ARG BUILD_VERSION=???
FROM node:20.0.0-bullseye-slim as builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY index.html ./
COPY src ./src
COPY scripts ./scripts
RUN npm ci
RUN npm run build
RUN npm prune --production

FROM gcr.io/distroless/nodejs20-debian12

COPY --from=builder /usr/src/app/build .
COPY --from=builder /usr/src/app/package*.json .
COPY --from=builder /usr/src/app/node_modules ./node_modules

EXPOSE 55555
ARG BUILD_VERSION
ENV NODE_ENV=production
ENV BUILD_VERSION=$BUILD_VERSION
CMD ["./src/api.js" ]