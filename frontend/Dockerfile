FROM node:20.11-alpine

RUN mkdir /app

WORKDIR /app

COPY package.json /app/

RUN npm install -g npm@latest
RUN npm install react-scripts@3.4.1

COPY . /app/
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]