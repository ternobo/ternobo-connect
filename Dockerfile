FROM node:17-alpine
COPY ./ /app

RUN mv /app/.env-build .env

WORKDIR /app

RUN npm install

RUN npm run production

RUN rm -rf node_modules

#########################################################
FROM php:8.1-fpm

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
    libzip-dev 


RUN apt-get update && apt-get install -y libpng-dev 
RUN apt-get install -y \
    libwebp-dev \
    libjpeg62-turbo-dev \
    libpng-dev libxpm-dev \
    libfreetype6-dev

RUN docker-php-ext-configure gd \
    --enable-gd \
    --with-webp \
    --with-jpeg \
    --with-xpm \
    --with-freetype

RUN apt-get clean && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install pdo_mysql mbstring zip exif pcntl gd

WORKDIR /app

COPY ./composer.json /app

RUN groupadd -g 1000 www
RUN useradd -u 1000 -ms /bin/bash -g www www

COPY --chown=www-data:www-data --from=0 /app/ /app

RUN chown -R www /app

USER root

EXPOSE 9000

CMD ["php-fpm"]
