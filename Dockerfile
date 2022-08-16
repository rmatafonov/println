FROM node

WORKDIR /var/www
COPY ./index.js index.js
COPY ./dist dist

EXPOSE 3000

CMD node index.js --watch dist/server.js
