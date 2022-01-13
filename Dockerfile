FROM node:alpine

WORKDIR /usr/app/arv

COPY package*.json ./

RUN npm install && npm install

COPY . .

CMD ["npm", "run", "start" ]