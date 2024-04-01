FROM node:20.11-alpine

RUN mkdir /app

WORKDIR /app

COPY package.json /app/

RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

COPY . /app/
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]