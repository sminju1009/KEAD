FROM node:20.11-alpine

WORKDIR /src

COPY package*.json .

RUN npm install -g npm@latest

RUN npm install react-scripts

COPY . .

CMD [ "npm", "start" ]

EXPOSE 3000
