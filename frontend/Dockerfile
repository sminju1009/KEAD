FROM node:20.11-alpine

WORKDIR /src

COPY package*.json .

RUN npm install

COPY . .

CMD [ "npm", "start" ]

EXPOSE 3000
