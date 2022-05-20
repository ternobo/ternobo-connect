FROM node:18-alpine
COPY ../ /app

RUN mv /app/.env-build .env

WORKDIR /app

RUN npm install

RUN npm run production

RUN rm -rf node_modules

# #########################################################

FROM php:8.1-fpm

ARG COMPOSER_AUTH

ENV COMPOSER_AUTH ${COMPOSER_AUTH}

RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    curl \
    libonig-dev \
    libzip-dev \
    libwebp-dev \
    libxpm-dev 

RUN docker-php-ext-configure gd \
    --enable-gd \
    --with-webp \
    --with-jpeg \
    --with-xpm \
    --with-freetype

RUN apt-get clean && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install pdo_mysql mbstring zip exif pcntl gd

WORKDIR /app

RUN chown -R www-data:www-data /app

USER www-data

COPY ./composer.json /app

COPY --chown=www-data:www-data --from=0 /app/ /app

USER root

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

ENV COMPOSER_AUTH ${COMPOSER_AUTH}

RUN chown -R www-data:www-data /var/www 

USER www-data

RUN composer install

EXPOSE 9000

CMD ["php-fpm"]
