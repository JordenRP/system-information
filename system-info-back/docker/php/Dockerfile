FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libicu-dev \
    libonig-dev \
    libzip-dev \
    zlib1g-dev \
    libpng-dev \
    libjpeg-dev \
    libpq-dev \
    libfreetype6-dev \
    && docker-php-ext-configure intl \
    && docker-php-ext-install intl pdo pdo_pgsql mbstring zip opcache gd

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/symfony
COPY .. /var/www/symfony

RUN composer install --no-scripts --no-autoloader

RUN chown -R www-data:www-data /var/www/symfony/var
RUN chmod -R 775 /var/www/symfony/var

RUN composer dump-autoload --optimize

EXPOSE 9000

CMD ["/bin/sh", "-c" ,"php bin/console doctrine:database:create --if-not-exists && php bin/console doctrine:migrations:migrate --no-interaction && php-fpm"]