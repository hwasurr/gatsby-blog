# build
FROM node:11-alpine AS build

RUN apk add --no-cache --virtual .gyp python make g++

WORKDIR /app
ENV NODE_ENV=production

COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile --non-interactive

COPY . .
RUN yarn build

EXPOSE 9000
CMD ["yarn", "serve", "-H", "0.0.0.0"]