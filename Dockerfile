FROM node

WORKDIR /var/www

COPY . /var/www/

RUN npm install && npm run build

EXPOSE 9001

CMD node index.js --watch dist/server.js
