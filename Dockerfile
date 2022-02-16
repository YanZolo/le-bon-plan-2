FROM node:16.13.2

WORKDIR /src



COPY package-lock.json .
COPY package.json .

RUN npm ci 

COPY Models ./Models
COPY Routes ./Routes
COPY Views ./Views
COPY index.js .
COPY controllerAuth.js .
COPY .env .

CMD npm start