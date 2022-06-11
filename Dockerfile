FROM node:16-alpine

WORKDIR /usr/app/arv

COPY package*.json ./
COPY scripts/ ./

RUN apk add bash && \
    apk add curl && \
    npm install && \
    npm install typescript

COPY . .
