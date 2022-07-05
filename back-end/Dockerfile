FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run tsc

RUN npm start

# CMD ["node", "dist", "src", "index.js"]