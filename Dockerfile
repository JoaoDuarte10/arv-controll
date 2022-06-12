FROM node:16-alpine

WORKDIR /usr/app/arv

RUN apk add bash && \
    apk add curl && \
    apk add nano

COPY package*.json ./
COPY scripts/ ./

RUN npm install && \
    npm install typescript

COPY . .

EXPOSE "5000"

CMD ["./scripts/start-app.sh"]