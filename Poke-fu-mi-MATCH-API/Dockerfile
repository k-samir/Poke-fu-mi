FROM node:17.1.0

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm install nodemon
RUN npm run build

CMD ["npm", "start"]

EXPOSE 5001
