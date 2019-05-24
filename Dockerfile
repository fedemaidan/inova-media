FROM node:8.9.1
WORKDIR /usr/src/app
COPY ./package.json ./
RUN npm install
RUN npm install body-parser
RUN npm install cors
RUN npm i connect-multiparty
RUN npm i csvtojson
RUN npm i convert-array-to-csv


COPY . .
EXPOSE 8080
CMD [ "node", "index.js" ]