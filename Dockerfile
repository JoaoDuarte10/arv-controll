FROM node:16-alpine

WORKDIR /usr/app/arv

RUN apk add bash && \
    apk add curl && \
    apk add nano

COPY package*.json ./
COPY scripts/ ./

ENV NODE_ENV=production
ENV PORT=5000

RUN npm install && \
    npm install typescript

COPY . .

CMD ["./scripts/start-app.sh"]

EXPOSE "5000"