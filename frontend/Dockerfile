FROM node:lts-alpine

WORKDIR /src

COPY package*.json .

RUN npm cache clean -f

RUN npm install --save

COPY . .

CMD [ "npm", "start" ]

EXPOSE 3000
