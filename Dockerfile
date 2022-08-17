FROM node:18

RUN apt update && apt install -y netcat

WORKDIR /var/www
COPY . .

RUN chmod +x ./utils/wait-for.sh

RUN npm ci
RUN npm run build
RUN npm prune --production

EXPOSE 5000
