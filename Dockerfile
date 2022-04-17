FROM node:16-alpine

WORKDIR /usr/app/arv

COPY package*.json ./

RUN npm install

COPY . .
