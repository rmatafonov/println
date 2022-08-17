# Ztype

Проект разработан в рамках курса Яндекс.Практикум - "Мидл фронтенд разработчик".

Реплика игры [Ztype](https://zty.pe/) созданной для весёлой тренировки печати.

## [Играть!](https://chokurdah-ztype-14.ya-praktikum.tech)

## Основные инструменты
* Typescript
* Webpack
* React
* Redux tool kit
* PostCSS
* Axios
* ServiceWorker
## Основные команды
* npm run start - режим разработки, запуск проекта на порту 8080
* npm run server - cборка и запуск проекта на порту 3000
* npm run build - сборка проекта

## Сборка Docker image
* docker build . -t cr.yandex/crp2li7e97dklupgilf5/chokurdah/ztype-web-app:1.0.0

## Загрузка Docker image в реестр в Яндекс.Облако:
* https://cloud.yandex.ru/docs/container-registry/operations/docker-image/docker-image-push

## Запуск приложения на сервере
* Сервер живет в Янедекс.Облако
* На сервере в домашней директории созадана папочка "ztype". Обязательное содержимое
    * Файл docker-compose.yml из корня этого репозитория
    * Файл .env - конфигурируется для енвайронмента. Пример лежит в корне этого репозитория
    * Папка ./nginx/conf/, содержащая файл nginx.conf - лежит в папке ./nginx в корне этого репозитория
    * Следующие папки для работы HTTPS (подробности ниже):
        * ./data/certbot/www/
        * ./data/certbot/letsencrypt/

* Запуск приложения и всего необходимого осущствляется командой:
> docker compose up -d

### Сертификаты для корректной работы https
* Криптостойкие сертификаты - платные. Купить можно, например, на reg.ru
* Бесплатные сертификаты можно получить, например, с помощью официального контейнера certbot (*важно совпадение папок с указанными в разделе "Запуск приложения на сервере"*):
> chokurdah@chokurdah-ztype:~/infrastructure/nginx$ docker run --rm --name temp_certbot -v /home/chokurdah/infrastructure/nginx/data/certbot/letsencrypt:/etc/letsencrypt -v /home/chokurdah/infrastructure/nginx/data/certbot/www:/tmp/letsencrypt/.well-known/acme-challenge -v /home/chokurdah/infrastructure/nginx/data/servers-data/certbot/log:/var/log certbot/certbot:v1.8.0 certonly --webroot --agree-tos --renew-by-default --preferred-challenges http-01 --server https://acme-v02.api.letsencrypt.org/directory --text --email roman.matafonov@yandex.ru -w /tmp/letsencrypt -d chokurdah-ztype-14.ya-praktikum.tech

* Пример вывода команды
> Saving debug log to /var/log/letsencrypt/letsencrypt.log
> Plugins selected: Authenticator webroot, Installer None
> Obtaining a new certificate
> Performing the following challenges:
> http-01 challenge for chokurdah-ztype-14.ya-praktikum.tech
> Using the webroot path /tmp/letsencrypt for all unmatched domains.
> Waiting for verification...
> Cleaning up challenges
> IMPORTANT NOTES:
>  - Congratulations! Your certificate and chain have been saved at:
>    /etc/letsencrypt/live/chokurdah-ztype-14.ya-praktikum.tech/fullchain.pem
>    Your key file has been saved at:
>    /etc/letsencrypt/live/chokurdah-ztype-14.ya-praktikum.tech/privkey.pem
>    Your cert will expire on 2022-11-12. To obtain a new or tweaked
>    version of this certificate in the future, simply run certbot
>    again. To non-interactively renew *all* of your certificates, run
>    "certbot renew"
>  - If you like Certbot, please consider supporting our work by:
> 
>    Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
>    Donating to EFF:                    https://eff.org/donate-le

