FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY ./back-end .

RUN npm run tsc

CMD ["node", "back-end", "dist", "src", "index.js"]