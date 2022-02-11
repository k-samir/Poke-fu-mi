FROM node:16.13.2

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm install nodemon
RUN npm run build


CMD ["npm", "start"]

EXPOSE 5003
